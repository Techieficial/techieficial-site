/**
 * Content-Security-Policy (CLAUDE.md section 10, BUILD_PLAN_V3 Phase 9), built at build time from what is
 * actually switched on: a third-party domain is allowed only when its ID or URL is configured.
 *
 * script-src keeps 'unsafe-inline': every page is prerendered, and Next.js inlines its bootstrap, the page data
 * and JSON-LD in each page. Nonces need a server render per request (losing static caching); per-page hashes are
 * a Phase 9 option. Everything else is locked to 'self' plus the listed origins.
 */
import type { AnalyticsIds } from "./consent";

export type CspInput = {
  analytics: AnalyticsIds;
  turnstile: boolean;
  /** Origins of the CRM booking calendars (always configured). */
  calendarOrigins: string[];
  chatOrigin?: string;
  /** True when Demo Lab videos (YouTube or Vimeo) exist. */
  videos: boolean;
};

export const origin = (url?: string) => {
  try {
    return url ? new URL(url).origin : "";
  } catch {
    return "";
  }
};

export function buildCsp(i: CspInput): string {
  const { gtm, ga4, clarity, metaPixel } = i.analytics;
  const google = Boolean(gtm || ga4);
  const turnstile = i.turnstile ? ["https://challenges.cloudflare.com"] : [];
  const chat = i.chatOrigin ? [i.chatOrigin] : [];
  const googleScript = google ? ["https://www.googletagmanager.com"] : [];
  const googleData = google ? ["https://*.google-analytics.com", "https://*.analytics.google.com", "https://*.googletagmanager.com"] : [];
  const clarityHosts = clarity ? ["https://www.clarity.ms", "https://*.clarity.ms", "https://c.bing.com"] : [];
  const meta = metaPixel ? ["https://connect.facebook.net"] : [];
  const metaData = metaPixel ? ["https://www.facebook.com"] : [];
  const videoFrames = i.videos ? ["https://www.youtube-nocookie.com", "https://player.vimeo.com"] : [];
  const videoImages = i.videos ? ["https://i.ytimg.com", "https://i.vimeocdn.com"] : [];

  const directives: [string, string[]][] = [
    ["default-src", ["'self'"]],
    ["script-src", ["'self'", "'unsafe-inline'", ...turnstile, ...googleScript, ...clarityHosts.slice(0, 2), ...meta, ...chat]],
    ["style-src", ["'self'", "'unsafe-inline'"]],
    ["img-src", ["'self'", "data:", "blob:", ...googleData, ...clarityHosts, ...metaData, ...videoImages]],
    ["font-src", ["'self'", "data:"]],
    ["connect-src", ["'self'", ...turnstile, ...googleData, ...clarityHosts, ...metaData, ...chat]],
    ["frame-src", [...turnstile, ...videoFrames, ...i.calendarOrigins, ...chat]],
    ["media-src", ["'self'"]],
    ["object-src", ["'none'"]],
    ["base-uri", ["'self'"]],
    ["form-action", ["'self'"]],
    ["frame-ancestors", ["'none'"]],
    ["upgrade-insecure-requests", []],
  ];
  return directives
    .map(([name, values]) => {
      const list = [...new Set(values.filter(Boolean))];
      if (name === "frame-src" && list.length === 0) return "frame-src 'none'";
      return [name, ...list].join(" ");
    })
    .join("; ");
}
