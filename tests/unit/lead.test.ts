import { describe, expect, it } from "vitest";
import { leadSchema, leadSources } from "@/lib/lead";

const ok = (input: object) => leadSchema.safeParse(input).success;

describe("lead form schema", () => {
  it("accepts a valid contact lead and normalises email", () => {
    const r = leadSchema.safeParse({ source: "contact", name: "Ada", email: " Ada@Test.dev ", phone: "+1 415 555 0100" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBe("ada@test.dev");
  });
  it("defaults SMS consent to false", () => {
    const r = leadSchema.safeParse({ source: "newsletter", email: "a@test.dev" });
    expect(r.success && r.data.smsConsent).toBe(false);
  });
  it("lets newsletter and calculator skip the name", () => {
    expect(ok({ source: "newsletter", email: "a@test.dev" })).toBe(true);
    expect(ok({ source: "calculator", email: "a@test.dev" })).toBe(true);
    expect(ok({ source: "academy", email: "a@test.dev" })).toBe(false);
  });
  it("requires a phone for call-me, contact and audit", () => {
    for (const source of ["demo-callme", "contact", "audit"]) expect(ok({ source, name: "A", company: "B", email: "a@test.dev" })).toBe(false);
  });
  it("requires a company for audit and test-build", () => {
    expect(ok({ source: "test-build", name: "A", email: "a@test.dev" })).toBe(false);
  });
  it("rejects a filled honeypot, bad email, bad phone and unknown source", () => {
    expect(ok({ source: "newsletter", email: "a@test.dev", website: "spam" })).toBe(false);
    expect(ok({ source: "newsletter", email: "not-an-email" })).toBe(false);
    expect(ok({ source: "contact", name: "A", email: "a@test.dev", phone: "call me" })).toBe(false);
    expect(ok({ source: "nope", email: "a@test.dev" })).toBe(false);
  });
  it("maps every source to a CRM tag", () => {
    expect(leadSources.contact).toBe("booked-call");
    expect(Object.values(leadSources).every((t) => /^[a-z-]+$/.test(t))).toBe(true);
  });
});
