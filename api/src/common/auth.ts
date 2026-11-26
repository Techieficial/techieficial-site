import { CanActivate, createParamDecorator, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import { jwtVerify } from "jose";
import { APP_CONFIG, type AppConfig } from "../config/env.js";
import type { AuthUser } from "../data/types.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
  }
}

/**
 * Checks the Supabase access token in "Authorization: Bearer <token>".
 * Verified with SUPABASE_JWT_SECRET (HS256), audience "authenticated", and expiry.
 * B4: projects that use the newer asymmetric signing keys switch to the project's JWKS URL.
 */
@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private readonly secret?: Uint8Array;

  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.secret = config.SUPABASE_JWT_SECRET ? new TextEncoder().encode(config.SUPABASE_JWT_SECRET) : undefined;
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const match = /^Bearer ([A-Za-z0-9._-]+)$/.exec(req.header("authorization") ?? "");
    if (!match || !this.secret) throw new UnauthorizedException("Sign in to use the client portal.");
    try {
      const { payload } = await jwtVerify(match[1], this.secret, { algorithms: ["HS256"], audience: "authenticated" });
      if (typeof payload.sub !== "string" || !payload.sub) throw new Error("no subject");
      req.user = { id: payload.sub, email: typeof payload.email === "string" ? payload.email : undefined, token: match[1] };
      return true;
    } catch {
      throw new UnauthorizedException("Your session is not valid. Please sign in again.");
    }
  }
}

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => context.switchToHttp().getRequest<Request>().user as AuthUser);
