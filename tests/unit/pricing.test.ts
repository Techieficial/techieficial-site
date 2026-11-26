import { describe, expect, it } from "vitest";
import { formatUsd, offers, priceParts, recommendOffer } from "@/content/pricing";

describe("Team Builder rules", () => {
  it("sends lead problems to the AI Growth Team", () => expect(recommendOffer(["leads", "missed-calls"]).slug).toBe("ai-growth-team"));
  it("sends only missed calls to the Starter", () => expect(recommendOffer(["missed-calls"]).slug).toBe("ai-receptionist-starter"));
  it("sends everything else to the AI Front Office", () => {
    expect(recommendOffer([]).slug).toBe("ai-front-office");
    expect(recommendOffer(["missed-calls", "reviews"]).slug).toBe("ai-front-office");
  });
});

describe("price formatting", () => {
  it("formats dollars", () => expect(formatUsd(3500)).toBe("$3,500"));
  it("builds card price parts", () => expect(priceParts({ setup: 1497, monthly: 497 })).toMatchObject({ setup: "$1,497", monthly: "$497/mo" }));
});

describe("offers data", () => {
  it("has unique slugs", () => expect(new Set(offers.map((o) => o.slug)).size).toBe(offers.length));
  it("sends offers of $3,000+ setup to a call, not checkout", () => {
    for (const o of offers) if ((o.setup ?? 0) >= 3000) expect(o.path).toBe("call");
  });
});
