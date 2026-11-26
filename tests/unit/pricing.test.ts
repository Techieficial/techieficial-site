import { describe, expect, it } from "vitest";
import { fillPrices, formatUsd, offers, priceParts, recommendOffer } from "@/content/pricing";
import { siteConfig } from "@/site.config";
import tokens from "@/design/tokens.json";

describe("pricing helpers", () => {
  it("formats US dollars", () => {
    expect(formatUsd(3500)).toBe("$3,500");
    expect(priceParts({ setup: 1497, monthly: 497 })).toEqual({ setup: "$1,497", monthly: "$497/mo", oneTime: undefined });
  });
  it("recommends an offer from the problems picked", () => {
    expect(recommendOffer(["missed-calls"]).slug).toBe("ai-receptionist-starter");
    expect(recommendOffer(["missed-calls", "reviews"]).slug).toBe("ai-front-office");
    expect(recommendOffer(["leads"]).slug).toBe("ai-growth-team");
  });
  it("fills price tokens and leaves no braces behind", () => {
    for (const o of offers) expect(fillPrices("{ownCrmMonthly}{quickStart}", o)).not.toMatch(/[{}]/);
  });
  it("never offers direct checkout at $3,000 or more (docs/CRM_SETUP.md section 4)", () => {
    for (const o of offers) {
      if ((o.setup ?? o.oneTime ?? 0) >= 3000) expect(o.path, o.slug).toBe("call");
    }
  });
});

describe("design tokens", () => {
  it("service colours in site.config.ts match design/tokens.json", () => {
    const service = Object.fromEntries(Object.entries(tokens.color.service).filter(([k]) => !k.startsWith("$")));
    expect(siteConfig.serviceColors).toEqual(service);
  });
});
