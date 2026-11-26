import { Body, CallHandler, Controller, ExecutionContext, HttpCode, Inject, Injectable, NestInterceptor, Post, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags, ApiTooManyRequestsResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import type { Request } from "express";
import { of } from "rxjs";
import { ErrorResponseDto } from "../common/error-response.dto.js";
import { CrmService } from "../crm/crm.service.js";
import { toCrmPayload } from "../crm/crm-payload.js";
import { LEADS_REPOSITORY, type LeadsRepository } from "../data/types.js";
import { LeadAcceptedDto, LeadDto } from "./lead.dto.js";
import { RATE_LIMITS } from "../rate-limit/limits.js";

/**
 * Runs before validation: a filled-in honeypot gets the normal success answer and is
 * dropped, so bots learn nothing (same behaviour as the site's /api/lead).
 */
@Injectable()
export class HoneypotInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const body = context.switchToHttp().getRequest<Request>().body as { website?: unknown } | undefined;
    if (body && typeof body === "object" && body.website) return of({ ok: true });
    return next.handle();
  }
}

@ApiTags("leads")
@Controller("v1/leads")
export class LeadsController {
  constructor(
    @Inject(LEADS_REPOSITORY) private readonly leads: LeadsRepository,
    @Inject(CrmService) private readonly crm: CrmService,
  ) {}

  @Post()
  @HttpCode(201)
  @Throttle({ default: RATE_LIMITS.leads })
  @UseInterceptors(HoneypotInterceptor)
  @ApiOperation({
    summary: "Log a website lead and forward it to the CRM",
    description: "Validates the form, stores it in the leads log, then sends the flat CRM payload to the CRM webhook when one is configured.",
  })
  @ApiCreatedResponse({ type: LeadAcceptedDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto, description: "Body is not valid JSON." })
  @ApiUnprocessableEntityResponse({ type: ErrorResponseDto, description: "A field is missing or invalid." })
  @ApiTooManyRequestsResponse({ type: ErrorResponseDto })
  async create(@Body() lead: LeadDto): Promise<LeadAcceptedDto> {
    const payload = toCrmPayload(lead, { pageUrl: lead.page, utm: lead.utm as Record<string, string> | undefined });
    const id = await this.leads.create(payload, this.crm.enabled ? "pending" : "skipped");
    if (this.crm.enabled) {
      const result = await this.crm.forward(payload);
      await this.leads.setSyncStatus(id, result.status, result.status === "failed" ? result.error : undefined);
    }
    // The lead is safe in the log even if the CRM is down; a retry job (B4) resends failed ones.
    return { ok: true };
  }
}
