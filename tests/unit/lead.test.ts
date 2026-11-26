import { describe, expect, it } from "vitest";
import { leadSchema, leadSources } from "@/lib/lead";
import { toCrmPayload } from "@/lib/crm";

const base = { source: "contact", email: "Test@Example.org", name: "Test Person", phone: "+14155550100" };

describe("leadSchema", () => {
  it("accepts a minimal lead and normalises the email", () => {
    const r = leadSchema.safeParse(base);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.email).toBe("test@example.org");
      expect(r.data.smsConsent).toBe(false);
    }
  });
  it("rejects a bad email, an unknown source and a bad phone", () => {
    expect(leadSchema.safeParse({ ...base, email: "nope" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, source: "unknown" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, phone: "call me" }).success).toBe(false);
  });
  it("requires name and phone where the form asks for them", () => {
    expect(leadSchema.safeParse({ ...base, phone: undefined }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, name: undefined }).success).toBe(false);
    expect(leadSchema.safeParse({ source: "newsletter", email: "a@b.org" }).success).toBe(true);
  });
  it("accepts an empty phone where optional, and formatted phones", () => {
    expect(leadSchema.safeParse({ source: "newsletter", email: "a@b.org", phone: "" }).success).toBe(true);
    expect(leadSchema.safeParse({ ...base, phone: "+1 (415) 555-0100" }).success).toBe(true);
  });
  it("rejects a filled honeypot and over-long fields", () => {
    expect(leadSchema.safeParse({ ...base, website: "spam" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, message: "x".repeat(4001) }).success).toBe(false);
  });
});

describe("toCrmPayload", () => {
  const parse = (input: object) => leadSchema.parse({ ...base, ...input });

  it("sends every key from docs/CRM_SETUP.md section 3, empty when unknown", () => {
    const p = toCrmPayload(parse({}), {});
    expect(Object.keys(p).sort()).toEqual(
      [
        "first_name", "last_name", "email", "phone", "company_name", "source", "tag",
        "business_type", "business_size", "main_goal", "budget_range", "message", "product_interest",
        "selected_services", "sms_consent", "page_url", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
      ].sort(),
    );
    expect(p.first_name).toBe("Test");
    expect(p.last_name).toBe("Person");
    expect(p.sms_consent).toBe("false");
  });
  it("uses only tags from the CRM allowed list", () => {
    const allowed = ["booked-call", "contact-form", "demo-callme", "test-build", "newsletter", "academy-waitlist", "agency-partner", "engine-builder", "audit", "calculator"];
    for (const source of Object.keys(leadSources)) {
      const p = toCrmPayload(parse({ source, company: "Test Co" }), {});
      expect(allowed).toContain(p.tag);
    }
    expect(toCrmPayload(parse({ selection: { size: "2 to 10" } }), {}).tag).toBe("engine-builder");
    expect(toCrmPayload(parse({}), {}).tag).toBe("contact-form");
  });
  it("adds answers to the message and copies UTM values", () => {
    const p = toCrmPayload(parse({ message: "Hi", answers: { "Calls a week": "40" } }), { pageUrl: "https://techieficial.com/audit", utm: { utm_source: "meta" } });
    expect(p.message).toBe("Hi\nCalls a week: 40");
    expect(p.utm_source).toBe("meta");
    expect(p.page_url).toBe("https://techieficial.com/audit");
  });
});
