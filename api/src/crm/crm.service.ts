import { Inject, Injectable } from "@nestjs/common";
import { APP_CONFIG, type AppConfig } from "../config/env.js";
import type { CrmPayload } from "../data/types.js";

export type CrmResult = { status: "sent" } | { status: "skipped" } | { status: "failed"; error: string };

/** Forwards a lead to the CRM inbound webhook. Does nothing when CRM_WEBHOOK_URL is not set. */
@Injectable()
export class CrmService {
  constructor(@Inject(APP_CONFIG) private readonly config: AppConfig) {}

  get enabled() {
    return Boolean(this.config.CRM_WEBHOOK_URL);
  }

  async forward(payload: CrmPayload): Promise<CrmResult> {
    const url = this.config.CRM_WEBHOOK_URL;
    if (!url) return { status: "skipped" };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });
      return res.ok ? { status: "sent" } : { status: "failed", error: `CRM responded with ${res.status}` };
    } catch (error) {
      return { status: "failed", error: error instanceof Error ? error.message : "CRM request failed" };
    }
  }
}
