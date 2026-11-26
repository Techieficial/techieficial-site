import { randomUUID } from "node:crypto";
import { ArgumentsHost, Catch, HttpException, HttpStatus, type ExceptionFilter, type ValidationError } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import type { AppConfig } from "../config/env.js";

declare module "express-serve-static-core" {
  interface Request {
    requestId?: string;
  }
}

const SAFE_ID = /^[A-Za-z0-9-]{8,64}$/;

/** Gives every request an id (kept from X-Request-Id when it looks safe) and echoes it back. */
export function requestId(req: Request, res: Response, next: NextFunction) {
  const incoming = req.header("x-request-id");
  req.requestId = incoming && SAFE_ID.test(incoming) ? incoming : randomUUID();
  res.setHeader("X-Request-Id", req.requestId);
  next();
}

/**
 * One JSON line per request: id, method, path (no query string), status, duration.
 * Bodies, headers and query strings are never logged, so no personal data reaches the logs.
 */
export function requestLogger(config: Pick<AppConfig, "LOG_LEVEL">, write: (line: string) => void = (line) => process.stdout.write(line + "\n")) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (config.LOG_LEVEL === "silent") return next();
    const started = process.hrtime.bigint();
    res.on("finish", () => {
      write(
        JSON.stringify({
          level: res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info",
          time: new Date().toISOString(),
          msg: "request",
          requestId: req.requestId,
          method: req.method,
          path: req.originalUrl.split("?")[0],
          status: res.statusCode,
          durationMs: Number((process.hrtime.bigint() - started) / 1_000_000n),
        }),
      );
    });
    next();
  };
}

const codes: Record<number, string> = {
  400: "bad_request",
  401: "unauthorized",
  403: "forbidden",
  404: "not_found",
  405: "method_not_allowed",
  413: "payload_too_large",
  422: "validation_failed",
  429: "rate_limited",
  501: "not_implemented",
  503: "unavailable",
};

/** Thrown by the ValidationPipe; carries the failing field paths. */
export class FieldsException extends HttpException {
  constructor(readonly fields: string[]) {
    super("Some fields are missing or invalid.", HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export function flattenValidationErrors(errors: ValidationError[], parent = ""): string[] {
  return errors.flatMap((error) => {
    const path = parent ? `${parent}.${error.property}` : error.property;
    return error.children?.length ? flattenValidationErrors(error.children, path) : [path];
  });
}

/** Turns every error into { statusCode, error, message, fields?, requestId }. Internal details never leak. */
@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong. Please try again.";
    if (exception instanceof HttpException && status < 500) {
      const body = exception.getResponse();
      const raw = typeof body === "string" ? body : (body as { message?: unknown }).message;
      message = Array.isArray(raw) ? raw.join(", ") : typeof raw === "string" ? raw : exception.message;
      if (status === 400 && (exception as { type?: string }).type === "entity.parse.failed") message = "Body is not valid JSON.";
    } else if (exception instanceof HttpException) {
      message = exception.message;
    }
    if (status >= 500 && !(exception instanceof HttpException)) {
      // Sentry (SENTRY_DSN) hooks in here in B4.
      process.stderr.write(JSON.stringify({ level: "error", time: new Date().toISOString(), msg: "unhandled", requestId: req.requestId, error: exception instanceof Error ? exception.message : String(exception) }) + "\n");
    }
    res.status(status).json({
      statusCode: status,
      error: codes[status] ?? (status >= 500 ? "server_error" : "error"),
      message,
      ...(exception instanceof FieldsException ? { fields: exception.fields } : {}),
      requestId: req.requestId,
    });
  }
}
