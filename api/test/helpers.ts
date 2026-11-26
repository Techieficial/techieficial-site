import type { NestExpressApplication } from "@nestjs/platform-express";
import { SignJWT } from "jose";
import { createApp } from "../src/app.js";
import { loadConfig } from "../src/config/env.js";
import { DATA_STORE } from "../src/data/data.module.js";
import { MemoryStore } from "../src/data/memory.repository.js";

/** Test-only signing secret. Not used anywhere else. */
export const TEST_JWT_SECRET = "test-only-secret-for-vitest-at-least-32-characters";

export async function makeApp(env: Record<string, string> = {}) {
  const config = loadConfig({ NODE_ENV: "test", LOG_LEVEL: "silent", SUPABASE_JWT_SECRET: TEST_JWT_SECRET, ...env });
  const app: NestExpressApplication = await createApp(config);
  await app.init();
  const store = app.get<MemoryStore>(DATA_STORE);
  return { app, store, server: app.getHttpServer() };
}

export function signToken(sub: string, opts: { secret?: string; expiresIn?: string; audience?: string } = {}) {
  return new SignJWT({ email: `${sub.slice(-4)}@techieficial.test`, role: "authenticated" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(sub)
    .setAudience(opts.audience ?? "authenticated")
    .setIssuedAt()
    .setExpirationTime(opts.expiresIn ?? "1h")
    .sign(new TextEncoder().encode(opts.secret ?? TEST_JWT_SECRET));
}

/** Fictional portal data for the in-memory store. */
export const ids = {
  userA: "11111111-1111-4111-8111-111111111111",
  userB: "22222222-2222-4222-8222-222222222222",
  staff: "33333333-3333-4333-8333-333333333333",
  clientA: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  clientB: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  projectA: "aaaaaaaa-0000-4000-8000-00000000000a",
  projectB: "bbbbbbbb-0000-4000-8000-00000000000b",
};

export function seedPortal(store: MemoryStore) {
  store.profiles.set(ids.userA, { id: ids.userA, role: "client", clientId: ids.clientA });
  store.profiles.set(ids.userB, { id: ids.userB, role: "client", clientId: ids.clientB });
  store.profiles.set(ids.staff, { id: ids.staff, role: "staff", clientId: null });
  const now = new Date().toISOString();
  store.projects.push(
    { id: ids.projectA, clientId: ids.clientA, name: "Test Project A", status: "build", summary: null, startedOn: null, liveOn: null, updatedAt: now },
    { id: ids.projectB, clientId: ids.clientB, name: "Test Project B", status: "kickoff", summary: null, startedOn: null, liveOn: null, updatedAt: now },
  );
}
