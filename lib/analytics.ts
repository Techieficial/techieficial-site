import { siteConfig } from "@/site.config";
import { validIds } from "./consent";

/** Conversion events sent to analytics once the visitor has accepted cookies. */
export type ConversionEvent =
  | "book_call"
  | "demo_call_started"
  | "callme_submit"
  | "form_submit"
  | "newsletter_signup"
  | "engine_builder_complete"
  | "test_build_booked"
  // v3 events (BUILD_PLAN_V3 Phase 13).
  | "assessment_complete"
  | "chat_started"
  | "chat_qualified"
  | "purchase";

/** Meta standard events for the conversions that have one; the rest are sent as custom events. */
export const metaStandardEvent: Partial<Record<ConversionEvent, string>> = {
  book_call: "Schedule",
  test_build_booked: "Schedule",
  form_submit: "Lead",
  callme_submit: "Lead",
  newsletter_signup: "Subscribe",
  purchase: "Purchase",
};

const usesGtm = Boolean(validIds(siteConfig.analytics).gtm);

type Win = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
};

export function track(event: ConversionEvent, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  // With a GTM container, GA4 runs inside GTM and reads dataLayer events; otherwise the direct GA4 tag
  // gets gtag events. Never both, so each action is counted once.
  if (usesGtm) w.dataLayer?.push({ event, ...params });
  else w.gtag?.("event", event, params);
  const standard = metaStandardEvent[event];
  if (standard) w.fbq?.("track", standard, params);
  else w.fbq?.("trackCustom", event, params);
  w.clarity?.("event", event);
}
