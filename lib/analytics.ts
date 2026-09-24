/** Conversion events sent to analytics once the visitor has accepted cookies. */
export type ConversionEvent =
  | "book_call"
  | "demo_call_started"
  | "callme_submit"
  | "form_submit"
  | "newsletter_signup"
  | "engine_builder_complete"
  | "test_build_booked";

type Win = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
};

export function track(event: ConversionEvent, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  w.gtag?.("event", event, params);
  w.fbq?.("trackCustom", event, params);
  w.clarity?.("event", event);
}
