import { describe, expect, it } from "vitest";
import { buildCsp, origin } from "@/lib/csp";

const base = { analytics: {}, turnstile: false, calendarOrigins: ["https://api.leadconnectorhq.com"], videos: false };
const directive = (csp: string, name: string) => csp.split("; ").find((d) => d.startsWith(`${name} `) || d === name) ?? "";

describe("buildCsp", () => {
  it("with nothing switched on, allows only self plus the booking calendar frame", () => {
    const csp = buildCsp(base);
    expect(directive(csp, "script-src")).toBe("script-src 'self' 'unsafe-inline'");
    expect(directive(csp, "connect-src")).toBe("connect-src 'self'");
    expect(directive(csp, "frame-src")).toBe("frame-src https://api.leadconnectorhq.com");
    expect(csp).not.toMatch(/google|clarity|facebook|youtube|vimeo|challenges\.cloudflare/);
  });
  it("keeps the fixed protections", () => {
    const csp = buildCsp(base);
    for (const d of ["default-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'self'", "frame-ancestors 'none'", "upgrade-insecure-requests"]) expect(csp).toContain(d);
  });
  it("adds each vendor only when its ID is set", () => {
    const gtm = buildCsp({ ...base, analytics: { gtm: "GTM-ABC1234" } });
    expect(directive(gtm, "script-src")).toContain("https://www.googletagmanager.com");
    expect(directive(gtm, "connect-src")).toContain("https://*.google-analytics.com");
    expect(gtm).not.toMatch(/clarity|facebook/);
    const meta = buildCsp({ ...base, analytics: { metaPixel: "1234567890" } });
    expect(directive(meta, "script-src")).toContain("https://connect.facebook.net");
    expect(directive(meta, "img-src")).toContain("https://www.facebook.com");
    expect(meta).not.toMatch(/google/);
    const clarity = buildCsp({ ...base, analytics: { clarity: "abc123def" } });
    expect(directive(clarity, "script-src")).toContain("https://www.clarity.ms");
    expect(directive(clarity, "connect-src")).toContain("https://c.bing.com");
  });
  it("adds Turnstile, chat and video hosts only when used", () => {
    const csp = buildCsp({ ...base, turnstile: true, chatOrigin: "https://chat.example.org", videos: true });
    expect(directive(csp, "script-src")).toContain("https://challenges.cloudflare.com");
    expect(directive(csp, "frame-src")).toContain("https://www.youtube-nocookie.com");
    expect(directive(csp, "img-src")).toContain("https://i.ytimg.com");
    expect(directive(csp, "connect-src")).toContain("https://chat.example.org");
  });
  it("uses frame-src 'none' when nothing may be framed, and origin() ignores bad URLs", () => {
    expect(directive(buildCsp({ ...base, calendarOrigins: [""] }), "frame-src")).toBe("frame-src 'none'");
    expect(origin("not a url")).toBe("");
    expect(origin("https://a.test/path?x=1")).toBe("https://a.test");
  });
});
