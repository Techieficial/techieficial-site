import { describe, expect, it } from "vitest";
import {
  copyProblem,
  findCopyIssues,
  loomUrlRule,
  maxLength,
  messages,
  mustBeTrue,
  offerPathRule,
  placesLeftRule,
  siteCopyRule,
  textRule,
} from "../lib/rules";

describe("copy rules", () => {
  it("rejects an em dash", () => {
    expect(copyProblem("Fast \u2014 and friendly")).toBe(messages.emDash);
  });

  it("allows commas, colons, hyphens and en dashes", () => {
    expect(copyProblem("Fast, friendly: 24/7 follow-up, 9–5")).toBeUndefined();
  });

  it.each(["GoHighLevel", "gohighlevel", "Go HighLevel", "Go High Level", "HighLevel", "highlevel", "GHL", "ghl", "Built on GHL."])("rejects the CRM vendor name: %s", (text) => {
    expect(copyProblem(text)).toBe(messages.vendor);
  });

  it.each(["A high level view of your pipeline", "Your CRM", "highlights", "ghlobal"])("allows ordinary words: %s", (text) => {
    expect(copyProblem(text)).toBeUndefined();
  });

  it("finds issues deep in a document, with Studio paths, and skips system keys", () => {
    const doc = {
      _id: "drafts.x",
      _type: "page",
      _note: "GHL in a system key is ignored",
      title: "Fine",
      seo: { title: "Built on HighLevel", description: "ok" },
      sections: [
        { _key: "a1", _type: "textSection", body: [{ _key: "b1", _type: "block", children: [{ _key: "s1", _type: "span", text: "One \u2014 two" }] }] },
      ],
      list: ["ok", "GHL"],
    };
    expect(findCopyIssues(doc)).toEqual([
      { path: ["seo", "title"], message: messages.vendor },
      { path: ["sections", { _key: "a1" }, "body", { _key: "b1" }, "children", { _key: "s1" }, "text"], message: messages.emDash },
      { path: ["list", 1], message: messages.vendor },
    ]);
  });

  it("document rule returns true for clean documents and paths for bad ones", () => {
    expect(siteCopyRule({ title: "Clean copy" })).toBe(true);
    expect(siteCopyRule({ title: "Bad \u2014 copy" })).toEqual([{ path: ["title"], message: messages.emDash }]);
    expect(siteCopyRule(undefined)).toBe(true);
  });

  it("field rule ignores non-strings", () => {
    expect(textRule(undefined)).toBe(true);
    expect(textRule(42)).toBe(true);
    expect(textRule("GHL")).toBe(messages.vendor);
  });
});

describe("length limits", () => {
  it("allows exactly the limit and rejects one more", () => {
    expect(maxLength(60)("a".repeat(60))).toBe(true);
    expect(maxLength(60)("a".repeat(61))).toBe(messages.tooLong(60, 61));
    expect(maxLength(155)("a".repeat(156))).toContain("155 characters");
  });

  it("also applies the copy rules", () => {
    expect(maxLength(60)("Short \u2014 title")).toBe(messages.emDash);
  });

  it("ignores empty values (required() handles those)", () => {
    expect(maxLength(60)(undefined)).toBe(true);
  });
});

describe("publishing gates", () => {
  it("mustBeTrue only passes for true", () => {
    const rule = mustBeTrue("needed");
    expect(rule(true)).toBe(true);
    expect(rule(false)).toBe("needed");
    expect(rule(undefined)).toBe("needed");
  });

  it("offers of $3,000 or more cannot use checkout", () => {
    expect(offerPathRule({ path: "checkout", setup: 1497 })).toBe(true);
    expect(offerPathRule({ path: "checkout", oneTime: 297 })).toBe(true);
    expect(offerPathRule({ path: "checkout", setup: 3500 })).toMatch(/call path/);
    expect(offerPathRule({ path: "checkout", oneTime: 3000 })).toMatch(/call path/);
    expect(offerPathRule({ path: "call", setup: 7500 })).toBe(true);
    expect(offerPathRule(undefined)).toBe(true);
  });

  it("places left stays between 0 and places in total", () => {
    expect(placesLeftRule(2, 3)).toBe(true);
    expect(placesLeftRule(3, 3)).toBe(true);
    expect(placesLeftRule(4, 3)).toMatch(/more than/);
    expect(placesLeftRule(-1, 3)).toMatch(/below 0/);
    expect(placesLeftRule(undefined, 3)).toBe(true);
  });

  it("video links must be Loom links", () => {
    expect(loomUrlRule("https://www.loom.com/share/1e1b3774f4374dc1b16544fbdeff0771")).toBe(true);
    expect(loomUrlRule("https://loom.com/embed/abc123")).toBe(true);
    expect(loomUrlRule("https://youtube.com/watch?v=1")).toMatch(/Loom/);
    expect(loomUrlRule(undefined)).toBe(true);
  });
});
