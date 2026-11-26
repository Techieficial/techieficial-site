import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadConfig } from "../src/config/env.js";
import { crmTags, leadSources, toCrmPayload } from "../src/crm/crm-payload.js";

// The site's own payload builder. lib/crm.ts only imports types from lib/lead.ts, so it loads
// without the site's packages. Loaded by path so this package's typecheck stays self-contained.
const sitePath = new URL("../../lib/crm.ts", import.meta.url).href;
const { toCrmPayload: sitePayload } = (await import(sitePath)) as { toCrmPayload: typeof toCrmPayload };

describe("config", () => {
  it("uses safe defaults", () => {
    const config = loadConfig({});
    expect(config).toMatchObject({ PORT: 3001, CORS_ORIGINS: ["http://localhost:3000"], NODE_ENV: "development" });
    expect(config.SUPABASE_URL).toBeUndefined();
  });

  it("splits CORS_ORIGINS and treats empty values as unset", () => {
    const config = loadConfig({ CORS_ORIGINS: "http://localhost:3000, https://techieficial.com", CRM_WEBHOOK_URL: "" });
    expect(config.CORS_ORIGINS).toEqual(["http://localhost:3000", "https://techieficial.com"]);
    expect(config.CRM_WEBHOOK_URL).toBeUndefined();
  });

  it("stops on bad or incomplete settings without printing values", () => {
    expect(() => loadConfig({ PORT: "abc" })).toThrow(/PORT/);
    expect(() => loadConfig({ SUPABASE_URL: "https://test.invalid" })).toThrow(/SUPABASE_ANON_KEY/);
    expect(() => loadConfig({ UPSTASH_REDIS_REST_URL: "https://test.invalid" })).toThrow(/UPSTASH_REDIS_REST_TOKEN/);
    expect(() => loadConfig({ SUPABASE_JWT_SECRET: "short-secret-value" })).toThrow(/at least 32/);
    expect(() => loadConfig({ SUPABASE_JWT_SECRET: "short-secret-value" })).not.toThrow(/short-secret-value/);
    expect(() => loadConfig({ NODE_ENV: "production" })).toThrow(/required in production/);
  });
});

describe("CRM payload", () => {
  it("has the same sources and tags as lib/lead.ts", () => {
    const source = readFileSync(new URL("../../lib/lead.ts", import.meta.url), "utf8");
    const block = source.slice(source.indexOf("export const leadSources = {"), source.indexOf("} as const;"));
    const site = Object.fromEntries([...block.matchAll(/^\s+"?([\w-]+)"?: "([\w-]+)",$/gm)].map((m) => [m[1], m[2]]));
    expect(Object.keys(site)).toHaveLength(8);
    expect(leadSources).toEqual(site);
  });

  it("matches lib/crm.ts for every form", () => {
    const base = { name: "Test Lead Person", email: "test@techieficial.test", phone: "+14155550100", company: "Test Co", smsConsent: true, answers: { "Test question": "Test answer" } };
    const ctx = { pageUrl: "/contact", utm: { utm_source: "test", utm_term: "t" } };
    for (const source of Object.keys(leadSources) as (keyof typeof leadSources)[]) {
      for (const selection of [undefined, { size: "2 to 10", goal: "Test", package: "Test pkg", services: "a, b" }]) {
        const lead = { ...base, source, selection };
        expect(toCrmPayload(lead, ctx)).toEqual(sitePayload(lead, ctx));
      }
    }
  });

  it("only produces tags the CRM accepts", () => {
    for (const source of Object.keys(leadSources) as (keyof typeof leadSources)[]) {
      expect(crmTags).toContain(toCrmPayload({ source, email: "t@techieficial.test" }, {}).tag);
    }
  });
});
