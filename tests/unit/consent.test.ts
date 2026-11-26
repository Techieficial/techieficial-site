import { afterEach, describe, expect, it, vi } from "vitest";
import { consentModeState, tagsToLoad, validIds } from "@/lib/consent";

const all = { gtm: "GTM-ABC1234", ga4: "G-ABC123XYZ", clarity: "abc123def", metaPixel: "1234567890123" };

describe("tagsToLoad", () => {
  it("loads nothing before the visitor chooses", () => {
    expect(tagsToLoad(all, null)).toEqual([]);
  });
  it("loads nothing after Reject", () => {
    expect(tagsToLoad(all, { analytics: false, marketing: false })).toEqual([]);
  });
  it("analytics consent loads GTM and Clarity but not the Pixel; GA4 runs inside GTM", () => {
    expect(tagsToLoad(all, { analytics: true, marketing: false })).toEqual(["gtm", "clarity"]);
  });
  it("marketing consent alone loads GTM and the Pixel", () => {
    expect(tagsToLoad(all, { analytics: false, marketing: true })).toEqual(["gtm", "metaPixel"]);
  });
  it("without GTM, analytics consent loads GA4 directly", () => {
    expect(tagsToLoad({ ga4: all.ga4 }, { analytics: true, marketing: true })).toEqual(["ga4"]);
  });
  it("loads nothing when no IDs are set (the site today)", () => {
    expect(tagsToLoad({}, { analytics: true, marketing: true })).toEqual([]);
  });
});

describe("consentModeState", () => {
  it("defaults every Consent Mode v2 signal to denied", () => {
    expect(consentModeState(null)).toEqual({ analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  });
  it("maps analytics and marketing separately", () => {
    expect(consentModeState({ analytics: true, marketing: false })).toEqual({ analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  });
});

describe("validIds", () => {
  it("keeps well-formed IDs and drops anything else", () => {
    expect(validIds(all)).toEqual(all);
    expect(validIds({ gtm: "GTM-1');alert(1)//", ga4: "UA-123", clarity: "", metaPixel: "abc" })).toEqual({});
  });
});

describe("track", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.resetModules();
  });
  async function setup(env: Record<string, string>) {
    for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
    vi.resetModules();
    const w = { dataLayer: [] as unknown[], gtag: vi.fn(), fbq: vi.fn(), clarity: vi.fn() };
    vi.stubGlobal("window", w);
    const { track } = await import("@/lib/analytics");
    return { w, track };
  }
  it("with GTM: pushes a dataLayer event and does not also call gtag", async () => {
    const { w, track } = await setup({ NEXT_PUBLIC_GTM_ID: "GTM-ABC1234" });
    track("book_call");
    expect(w.dataLayer).toEqual([{ event: "book_call" }]);
    expect(w.gtag).not.toHaveBeenCalled();
    expect(w.fbq).toHaveBeenCalledWith("track", "Schedule", {});
  });
  it("without GTM: sends a gtag event; custom Meta event for non-standard actions", async () => {
    const { w, track } = await setup({ NEXT_PUBLIC_GTM_ID: "" });
    track("assessment_complete", { score: 7 });
    expect(w.dataLayer).toEqual([]);
    expect(w.gtag).toHaveBeenCalledWith("event", "assessment_complete", { score: 7 });
    expect(w.fbq).toHaveBeenCalledWith("trackCustom", "assessment_complete", { score: 7 });
  });
});
