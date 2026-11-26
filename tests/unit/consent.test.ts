import { describe, expect, it } from "vitest";
import { googleConsent, isWithdrawal, tagsToLoad } from "@/lib/consent";

const all = { gtm: "GTM-ABC1234", ga4: "G-ABC123DEF4", metaPixel: "1234567890", clarity: "abcd1234ef" };
const undecided = { analytics: false, marketing: false, decided: false };

describe("consent-gated tags", () => {
  it("loads nothing when no IDs are set, whatever the choice", () => {
    expect(tagsToLoad({ analytics: true, marketing: true, decided: true }, {})).toEqual([]);
  });
  it("loads only the denied-by-default Consent Mode before a decision", () => {
    expect(tagsToLoad(undecided, all)).toEqual(["consent-default"]);
  });
  it("loads nothing but Consent Mode after Reject", () => {
    expect(tagsToLoad({ analytics: false, marketing: false, decided: true }, all)).toEqual(["consent-default"]);
  });
  it("loads analytics tags only with analytics consent", () => {
    expect(tagsToLoad({ analytics: true, marketing: false, decided: true }, all)).toEqual(["consent-default", "gtm", "ga4", "clarity"]);
  });
  it("loads the Meta Pixel only with marketing consent", () => {
    expect(tagsToLoad({ analytics: false, marketing: true, decided: true }, all)).toEqual(["consent-default", "meta-pixel"]);
  });
  it("skips Consent Mode when no Google tag is configured", () => {
    expect(tagsToLoad({ analytics: true, marketing: true, decided: true }, { clarity: "abcd1234ef" })).toEqual(["clarity"]);
  });
  it("maps choices to Consent Mode v2 fields", () => {
    expect(googleConsent({ analytics: true, marketing: false })).toEqual({ analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  });
  it("detects a withdrawal", () => {
    expect(isWithdrawal({ analytics: true, marketing: true }, { analytics: true, marketing: false })).toBe(true);
    expect(isWithdrawal({ analytics: false, marketing: false }, { analytics: true, marketing: true })).toBe(false);
  });
});
