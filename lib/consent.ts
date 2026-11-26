/**
 * Consent rules (CLAUDE.md section 11, BUILD_PLAN_V3 Phase 13). Pure functions so they are unit tested.
 * Nothing optional loads before the visitor chooses; Google Consent Mode v2 defaults to denied.
 */
export type ConsentChoice = { analytics: boolean; marketing: boolean };
export type AnalyticsIds = { gtm?: string; ga4?: string; clarity?: string; metaPixel?: string };
export type Tag = "gtm" | "ga4" | "clarity" | "metaPixel";

/** Consent Mode v2 state for a choice. Before any choice, everything is denied. */
export function consentModeState(c: ConsentChoice | null) {
  const a = c?.analytics ? "granted" : "denied";
  const m = c?.marketing ? "granted" : "denied";
  return { analytics_storage: a, ad_storage: m, ad_user_data: m, ad_personalization: m } as const;
}

/**
 * Which tags may load. Only tags whose ID is set, and only after the matching consent:
 * analytics consent for GA4 and Clarity, marketing consent for the Meta Pixel, either one for GTM
 * (GTM reads the Consent Mode state and gates its own tags).
 * When a GTM container is set, GA4 is expected to be configured inside GTM, so the direct GA4 tag is
 * skipped to avoid counting every visit twice.
 */
export function tagsToLoad(ids: AnalyticsIds, c: ConsentChoice | null): Tag[] {
  if (!c) return [];
  const tags: Tag[] = [];
  if (ids.gtm && (c.analytics || c.marketing)) tags.push("gtm");
  if (ids.ga4 && !ids.gtm && c.analytics) tags.push("ga4");
  if (ids.clarity && c.analytics) tags.push("clarity");
  if (ids.metaPixel && c.marketing) tags.push("metaPixel");
  return tags;
}

/** IDs must look like the vendor's format before they are written into a script. */
export const idPatterns: Record<Tag, RegExp> = {
  gtm: /^GTM-[A-Z0-9]{4,12}$/,
  ga4: /^G-[A-Z0-9]{4,15}$/,
  clarity: /^[a-z0-9]{6,16}$/,
  metaPixel: /^\d{8,20}$/,
};

/** Drops any ID that does not match its format, so a typo in a build variable cannot inject script. */
export function validIds(ids: AnalyticsIds): AnalyticsIds {
  const out: AnalyticsIds = {};
  for (const k of Object.keys(idPatterns) as Tag[]) {
    const v = ids[k]?.trim();
    if (v && idPatterns[k].test(v)) out[k] = v;
  }
  return out;
}
