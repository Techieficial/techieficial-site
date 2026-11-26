/**
 * Which tags may load for a given consent choice. Pure, so it is unit tested.
 * Nothing loads before the visitor decides, and nothing loads without its ID.
 */
export type ConsentChoice = { analytics: boolean; marketing: boolean };
export type TagIds = { gtm?: string; ga4?: string; metaPixel?: string; clarity?: string };
export type Tag = "consent-default" | "gtm" | "ga4" | "clarity" | "meta-pixel";

export function tagsToLoad(consent: ConsentChoice & { decided: boolean }, ids: TagIds): Tag[] {
  const tags: Tag[] = [];
  // Google Consent Mode v2 defaults go first (all denied) whenever a Google tag is configured.
  if (ids.gtm || ids.ga4) tags.push("consent-default");
  if (!consent.decided) return tags;
  // GTM's own tags follow Consent Mode, but the container itself only loads after analytics consent.
  if (ids.gtm && consent.analytics) tags.push("gtm");
  if (ids.ga4 && consent.analytics) tags.push("ga4");
  if (ids.clarity && consent.analytics) tags.push("clarity");
  if (ids.metaPixel && consent.marketing) tags.push("meta-pixel");
  return tags;
}

/** Consent Mode v2 values for a choice. */
export function googleConsent(c: ConsentChoice) {
  const v = (b: boolean) => (b ? "granted" : "denied");
  return {
    analytics_storage: v(c.analytics),
    ad_storage: v(c.marketing),
    ad_user_data: v(c.marketing),
    ad_personalization: v(c.marketing),
  };
}

/** True when a choice takes back something granted before. Loaded tags cannot be unloaded, so the page reloads. */
export const isWithdrawal = (before: ConsentChoice, after: ConsentChoice) =>
  (before.analytics && !after.analytics) || (before.marketing && !after.marketing);
