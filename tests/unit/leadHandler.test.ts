import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const post = (body: unknown, headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/lead", { method: "POST", headers: { "content-type": "application/json", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });

const LEAD = { source: "contact", name: "Test Person", email: "a@b.org", phone: "+14155550100" };

// Fresh module per test so the in-memory rate limiter starts empty.
async function handler() {
  vi.resetModules();
  return (await import("@/lib/leadHandler")).handleLead;
}

describe("handleLead", () => {
  beforeEach(() => {
    vi.stubEnv("CRM_WEBHOOK_URL", "https://crm.test/hook");
    vi.stubEnv("CRM_CALLME_WEBHOOK_URL", "https://crm.test/callme");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
  });
  afterEach(() => vi.unstubAllEnvs());

  it("forwards a valid lead to the CRM webhook", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok"));
    const res = await (await handler())(post(LEAD), "lead");
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith("https://crm.test/hook", expect.objectContaining({ method: "POST" }));
  });
  it("rejects invalid JSON (400) and invalid fields (422)", async () => {
    const h = await handler();
    expect((await h(post("{"), "lead")).status).toBe(400);
    expect((await h(post({ ...LEAD, email: "x" }), "lead")).status).toBe(422);
  });
  it("pretends success on a filled honeypot and sends nothing", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const res = await (await handler())(post({ ...LEAD, website: "spam" }), "lead");
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("rate-limits per IP after 8 requests in 10 minutes", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok"));
    const h = await handler();
    const statuses = [];
    for (let i = 0; i < 9; i++) statuses.push((await h(post(LEAD, { "cf-connecting-ip": "1.2.3.4" }), "lead")).status);
    expect(statuses.slice(0, 8).every((s) => s === 200)).toBe(true);
    expect(statuses[8]).toBe(429);
  });
  it("rate-limits call-me per phone after 3 requests", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok"));
    const h = await handler();
    const body = { source: "demo-callme", name: "Test Person", email: "a@b.org", phone: "+1 415 555 0100" };
    const statuses = [];
    for (let i = 0; i < 4; i++) statuses.push((await h(post(body, { "cf-connecting-ip": `9.9.9.${i}` }), "callme")).status);
    expect(statuses).toEqual([200, 200, 200, 429]);
  });
  it("sends call-me to its own webhook and refuses the wrong endpoint", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok"));
    const h = await handler();
    expect((await h(post({ source: "demo-callme", name: "Test Person", email: "a@b.org", phone: "+14155550100" }), "callme")).status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith("https://crm.test/callme", expect.anything());
    expect((await h(post(LEAD), "callme")).status).toBe(400);
  });
  it("returns 503 when no webhook is configured and 502 when the CRM fails", async () => {
    vi.stubEnv("CRM_WEBHOOK_URL", "");
    expect((await (await handler())(post(LEAD), "lead")).status).toBe(503);
    vi.stubEnv("CRM_WEBHOOK_URL", "https://crm.test/hook");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("down", { status: 500 }));
    expect((await (await handler())(post(LEAD), "lead")).status).toBe(502);
  });
  it("checks Turnstile when a secret is set", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ success: false }));
    const h = await handler();
    expect((await h(post(LEAD), "lead")).status).toBe(403);
    expect((await h(post({ ...LEAD, turnstileToken: "t" }), "lead")).status).toBe(403);
    expect(fetchMock).toHaveBeenCalledWith("https://challenges.cloudflare.com/turnstile/v0/siteverify", expect.anything());
  });
});
