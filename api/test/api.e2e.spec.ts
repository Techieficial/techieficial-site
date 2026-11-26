import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import request from "supertest";
import { afterEach, describe, expect, it } from "vitest";
import { ids, makeApp, seedPortal, signToken } from "./helpers.js";

type Made = Awaited<ReturnType<typeof makeApp>>;
let made: Made | undefined;
const open = async (env?: Record<string, string>) => (made = await makeApp(env));

afterEach(async () => {
  await made?.app.close();
  made = undefined;
});

const validLead = { source: "contact", name: "Test Lead", email: "Test-Lead@Techieficial.test", phone: "+1 415 555 0100", message: "Test message", smsConsent: false };

describe("health", () => {
  it("GET /health returns 200 with status and a request id", async () => {
    const { server } = await open();
    const res = await request(server).get("/health").expect(200);
    expect(res.body).toMatchObject({ status: "ok", dataStore: "memory", crmForwarding: false });
    expect(res.headers["x-request-id"]).toMatch(/^[0-9a-f-]{36}$/);
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
  });

  it("keeps a safe incoming request id", async () => {
    const { server } = await open();
    const res = await request(server).get("/health").set("X-Request-Id", "abc12345-test").expect(200);
    expect(res.headers["x-request-id"]).toBe("abc12345-test");
  });
});

describe("CORS", () => {
  it("allows listed origins only", async () => {
    const { server } = await open();
    const ok = await request(server).options("/v1/leads").set("Origin", "http://localhost:3000").set("Access-Control-Request-Method", "POST");
    expect(ok.headers["access-control-allow-origin"]).toBe("http://localhost:3000");
    const blocked = await request(server).options("/v1/leads").set("Origin", "https://evil.test").set("Access-Control-Request-Method", "POST");
    expect(blocked.headers["access-control-allow-origin"]).toBeUndefined();
  });
});

describe("POST /v1/leads", () => {
  it("stores a valid lead with the CRM payload keys and returns 201", async () => {
    const { server, store } = await open();
    const res = await request(server).post("/v1/leads").send({ ...validLead, utm: { utm_source: "test" }, page: "/contact" }).expect(201);
    expect(res.body).toEqual({ ok: true });
    expect(store.leads).toHaveLength(1);
    expect(store.leads[0]).toMatchObject({
      first_name: "Test",
      last_name: "Lead",
      email: "test-lead@techieficial.test",
      source: "contact-form",
      tag: "contact-form",
      sms_consent: "false",
      page_url: "/contact",
      utm_source: "test",
      crm_sync_status: "skipped",
    });
  });

  it("rejects an invalid lead with 422 and the failing fields", async () => {
    const { server, store } = await open();
    const res = await request(server).post("/v1/leads").send({ source: "contact", email: "not-an-email" }).expect(422);
    expect(res.body).toMatchObject({ statusCode: 422, error: "validation_failed" });
    expect(res.body.fields).toEqual(expect.arrayContaining(["name", "email", "phone"]));
    expect(res.body.requestId).toBeTruthy();
    expect(store.leads).toHaveLength(0);
  });

  it("applies the per-form rules from lib/lead.ts", async () => {
    const { server } = await open();
    await request(server).post("/v1/leads").send({ source: "newsletter", email: "test@techieficial.test" }).expect(201);
    const audit = await request(server).post("/v1/leads").send({ source: "audit", name: "Test", email: "test@techieficial.test", phone: "+14155550100" }).expect(422);
    expect(audit.body.fields).toEqual(["company"]);
    await request(server).post("/v1/leads").send({ source: "not-a-form", email: "test@techieficial.test" }).expect(422);
  });

  it("rejects unknown fields", async () => {
    const { server } = await open();
    const res = await request(server).post("/v1/leads").send({ ...validLead, isAdmin: true }).expect(422);
    expect(res.body.fields).toContain("isAdmin");
  });

  it("answers malformed JSON with 400 in the same error shape", async () => {
    const { server } = await open();
    const res = await request(server).post("/v1/leads").set("Content-Type", "application/json").send("{bad json").expect(400);
    expect(res.body).toMatchObject({ statusCode: 400, error: "bad_request" });
  });

  it("drops honeypot submissions but answers like a success", async () => {
    const { server, store } = await open();
    const res = await request(server).post("/v1/leads").send({ ...validLead, website: "spam.test" }).expect(201);
    expect(res.body).toEqual({ ok: true });
    expect(store.leads).toHaveLength(0);
  });

  it("forwards to CRM_WEBHOOK_URL when set and marks the lead as sent", async () => {
    const received: unknown[] = [];
    const hook: Server = createServer((req, res) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        received.push(JSON.parse(body));
        res.writeHead(200).end("{}");
      });
    });
    await new Promise<void>((resolve) => hook.listen(0, "127.0.0.1", resolve));
    try {
      const { port } = hook.address() as AddressInfo;
      const { server, store } = await open({ CRM_WEBHOOK_URL: `http://127.0.0.1:${port}/hook` });
      await request(server).post("/v1/leads").send({ ...validLead, selection: { size: "2 to 10" } }).expect(201);
      expect(received).toHaveLength(1);
      expect(received[0]).toMatchObject({ email: "test-lead@techieficial.test", tag: "engine-builder", business_size: "2 to 10" });
      expect(Object.keys(received[0] as object)).toHaveLength(21);
      expect(store.leads[0].crm_sync_status).toBe("sent");
    } finally {
      hook.close();
    }
  });

  it("keeps the lead and marks it failed when the CRM is down", async () => {
    const { server, store } = await open({ CRM_WEBHOOK_URL: "http://127.0.0.1:9/unreachable" });
    await request(server).post("/v1/leads").send(validLead).expect(201);
    expect(store.leads[0].crm_sync_status).toBe("failed");
  });

  it("rate limits to 8 leads per 10 minutes per IP, then answers 429", async () => {
    const { server } = await open();
    for (let i = 0; i < 8; i++) await request(server).post("/v1/leads").send(validLead).expect(201);
    const res = await request(server).post("/v1/leads").send(validLead).expect(429);
    expect(res.body).toMatchObject({ statusCode: 429, error: "rate_limited" });
    expect(res.headers["retry-after"]).toBeDefined();
  });
});

describe("portal", () => {
  it("returns 401 without a token", async () => {
    const { server } = await open();
    const res = await request(server).get("/v1/portal/projects").expect(401);
    expect(res.body).toMatchObject({ statusCode: 401, error: "unauthorized" });
    await request(server).get(`/v1/portal/projects/${ids.projectA}`).expect(401);
    await request(server).post("/v1/portal/tickets").send({ subject: "x", body: "y" }).expect(401);
  });

  it("returns 401 for a token signed with another secret, expired, or for another audience", async () => {
    const { server } = await open();
    for (const token of [
      await signToken(ids.userA, { secret: "another-test-secret-that-is-long-enough-123" }),
      await signToken(ids.userA, { expiresIn: "-1m" }),
      await signToken(ids.userA, { audience: "anon" }),
      "not-a-jwt",
    ]) {
      await request(server).get("/v1/portal/projects").set("Authorization", `Bearer ${token}`).expect(401);
    }
  });

  it("returns 401 for every token when no JWT secret is configured", async () => {
    const { server } = await open({ SUPABASE_JWT_SECRET: "" });
    await request(server).get("/v1/portal/projects").set("Authorization", `Bearer ${await signToken(ids.userA)}`).expect(401);
  });

  it("lists only the signed-in client's projects", async () => {
    const { server, store } = await open();
    seedPortal(store);
    const res = await request(server).get("/v1/portal/projects").set("Authorization", `Bearer ${await signToken(ids.userA)}`).expect(200);
    expect(res.body.map((p: { id: string }) => p.id)).toEqual([ids.projectA]);
    const staff = await request(server).get("/v1/portal/projects").set("Authorization", `Bearer ${await signToken(ids.staff)}`).expect(200);
    expect(staff.body).toHaveLength(2);
  });

  it("returns one project, and 404 for another client's project", async () => {
    const { server, store } = await open();
    seedPortal(store);
    const auth = `Bearer ${await signToken(ids.userA)}`;
    const res = await request(server).get(`/v1/portal/projects/${ids.projectA}`).set("Authorization", auth).expect(200);
    expect(res.body).toMatchObject({ id: ids.projectA, status: "build" });
    await request(server).get(`/v1/portal/projects/${ids.projectB}`).set("Authorization", auth).expect(404);
    await request(server).get("/v1/portal/projects/not-a-uuid").set("Authorization", auth).expect(400);
  });

  it("opens a ticket for the client's own project", async () => {
    const { server, store } = await open();
    seedPortal(store);
    const auth = `Bearer ${await signToken(ids.userA)}`;
    const res = await request(server).post("/v1/portal/tickets").set("Authorization", auth).send({ projectId: ids.projectA, subject: "Test subject", body: "Test body" }).expect(201);
    expect(res.body).toMatchObject({ clientId: ids.clientA, projectId: ids.projectA, createdBy: ids.userA, status: "open", priority: "normal" });
    await request(server).post("/v1/portal/tickets").set("Authorization", auth).send({ projectId: ids.projectB, subject: "Test", body: "Test" }).expect(404);
    await request(server).post("/v1/portal/tickets").set("Authorization", auth).send({ subject: "", body: "Test" }).expect(422);
  });
});

describe("assistant", () => {
  it("POST /v1/assistant/chat answers 501 with a clear message", async () => {
    const { server } = await open();
    const res = await request(server).post("/v1/assistant/chat").send({ message: "Hello" }).expect(501);
    expect(res.body).toMatchObject({ statusCode: 501, error: "not_implemented" });
    expect(res.body.message).toMatch(/not switched on yet/);
  });

  it("is rate limited", async () => {
    const { server } = await open();
    for (let i = 0; i < 20; i++) await request(server).post("/v1/assistant/chat").send({ message: "Hello" }).expect(501);
    await request(server).post("/v1/assistant/chat").send({ message: "Hello" }).expect(429);
  });
});

describe("OpenAPI", () => {
  it("serves docs at /docs and the JSON document at /docs-json with every route", async () => {
    const { server } = await open();
    await request(server).get("/docs").expect(200);
    const res = await request(server).get("/docs-json").expect(200);
    expect(Object.keys(res.body.paths).sort()).toEqual(["/health", "/v1/assistant/chat", "/v1/leads", "/v1/portal/projects", "/v1/portal/projects/{id}", "/v1/portal/tickets"]);
  });
});
