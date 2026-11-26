/**
 * Applies supabase/migrations to an in-process Postgres (PGlite) with a stub of the Supabase
 * auth schema and roles, then checks the row-level security rules. No Docker, no network.
 */
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const supabaseDir = fileURLToPath(new URL("../../supabase/", import.meta.url));
const read = (path: string) => readFileSync(supabaseDir + path, "utf8");

const ADMIN = "00000000-0000-4000-8000-0000000000a1";
const USER_A = "00000000-0000-4000-8000-0000000000a2";
const USER_B = "00000000-0000-4000-8000-0000000000a3";
const CLIENT_A = "00000000-0000-4000-8000-0000000000c1";
const CLIENT_B = "00000000-0000-4000-8000-0000000000c2";
const PROJECT_A = "00000000-0000-4000-8000-0000000000d1";
const PROJECT_B = "00000000-0000-4000-8000-0000000000d2";

let db: PGlite;

type Who = "anon" | "service_role" | { user: string };

/** Runs a query as a Supabase role, with auth.uid() set for signed-in users. */
async function as<T = Record<string, unknown>>(who: Who, sql: string, params: unknown[] = []) {
  const role = typeof who === "string" ? who : "authenticated";
  const sub = typeof who === "string" ? "" : who.user;
  await db.query("select set_config('request.jwt.claim.sub', $1, false)", [sub]);
  await db.exec(`set role ${role}`);
  try {
    return (await db.query<T>(sql, params)).rows;
  } finally {
    await db.exec("reset role");
  }
}

beforeAll(async () => {
  db = new PGlite();
  await db.exec(read("tests/auth_stub.sql"));
  for (const file of readdirSync(supabaseDir + "migrations").filter((name) => name.endsWith(".sql")).sort()) {
    await db.exec(read(`migrations/${file}`));
  }
  await db.exec(read("seed.sql"));
});

afterAll(async () => {
  await db?.close();
});

describe("migration", () => {
  it("creates every table with row-level security on", async () => {
    const rows = (
      await db.query<{ relname: string; relrowsecurity: boolean }>(
        "select c.relname, c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relkind = 'r' order by 1",
      )
    ).rows;
    expect(rows.map((row) => row.relname)).toEqual(["audit_logs", "client_projects", "clients", "leads", "profiles", "project_files", "support_tickets"]);
    expect(rows.every((row) => row.relrowsecurity)).toBe(true);
  });

  it("creates a profile for each new auth user", async () => {
    const rows = await db.query<{ role: string; client_id: string | null }>("select role, client_id from public.profiles where id = $1", [USER_A]);
    expect(rows.rows[0]).toEqual({ role: "client", client_id: CLIENT_A });
  });

  it("only allows delivery pipeline statuses", async () => {
    await expect(db.query("update public.client_projects set status = 'done' where id = $1", [PROJECT_A])).rejects.toThrow(/check constraint/);
  });
});

describe("client isolation", () => {
  it("client A sees only client A's projects", async () => {
    const rows = await as<{ id: string }>({ user: USER_A }, "select id from public.client_projects");
    expect(rows.map((row) => row.id)).toEqual([PROJECT_A]);
  });

  it("client A cannot read client B's project by id", async () => {
    expect(await as({ user: USER_A }, "select * from public.client_projects where id = $1", [PROJECT_B])).toEqual([]);
  });

  it("client A sees only their own business and profile", async () => {
    expect((await as<{ id: string }>({ user: USER_A }, "select id from public.clients")).map((r) => r.id)).toEqual([CLIENT_A]);
    expect((await as<{ id: string }>({ user: USER_A }, "select id from public.profiles")).map((r) => r.id)).toEqual([USER_A]);
  });

  it("client B cannot see client A's files", async () => {
    expect(await as({ user: USER_B }, "select * from public.project_files")).toEqual([]);
    expect(await as({ user: USER_A }, "select file_name from public.project_files")).toEqual([{ file_name: "test-file.txt" }]);
  });

  it("clients cannot change projects", async () => {
    const updated = await as({ user: USER_A }, "update public.client_projects set status = 'live' where id = $1 returning id", [PROJECT_A]);
    expect(updated).toEqual([]);
  });

  it("a client can open a ticket for their own business but not for another", async () => {
    const ok = await as<{ id: string }>(
      { user: USER_A },
      "insert into public.support_tickets (client_id, project_id, created_by, subject, body) values ($1, $2, $3, 'Test subject', 'Test body') returning id",
      [CLIENT_A, PROJECT_A, USER_A],
    );
    expect(ok).toHaveLength(1);
    await expect(
      as({ user: USER_A }, "insert into public.support_tickets (client_id, created_by, subject, body) values ($1, $2, 'Test subject', 'Test body')", [CLIENT_B, USER_A]),
    ).rejects.toThrow(/row-level security/);
    await expect(
      as({ user: USER_A }, "insert into public.support_tickets (client_id, project_id, created_by, subject, body) values ($1, $2, $3, 'Test', 'Test')", [CLIENT_A, PROJECT_B, USER_A]),
    ).rejects.toThrow(/row-level security/);
    expect(await as({ user: USER_B }, "select * from public.support_tickets")).toEqual([]);
  });

  it("a client cannot make themselves staff or admin", async () => {
    await expect(as({ user: USER_A }, "update public.profiles set role = 'admin' where id = $1", [USER_A])).rejects.toThrow(/only an admin/);
    const renamed = await as<{ full_name: string }>({ user: USER_A }, "update public.profiles set full_name = 'Test Rename' where id = $1 returning full_name", [USER_A]);
    expect(renamed).toEqual([{ full_name: "Test Rename" }]);
  });

  it("admin sees every project", async () => {
    expect(await as({ user: ADMIN }, "select id from public.client_projects")).toHaveLength(2);
  });
});

describe("leads", () => {
  it("anon cannot read leads", async () => {
    await expect(as("anon", "select * from public.leads")).rejects.toThrow(/permission denied/);
  });

  it("anon and signed-in users cannot insert leads", async () => {
    await expect(as("anon", "insert into public.leads (email, source, tag) values ('a@b.test', 'newsletter', 'newsletter')")).rejects.toThrow(/permission denied/);
    await expect(as({ user: USER_A }, "insert into public.leads (email, source, tag) values ('a@b.test', 'newsletter', 'newsletter')")).rejects.toThrow(/permission denied/);
  });

  it("clients see no leads; staff and admins do", async () => {
    expect(await as({ user: USER_A }, "select * from public.leads")).toEqual([]);
    expect(await as({ user: ADMIN }, "select email from public.leads")).toEqual([{ email: "test-lead@techieficial.test" }]);
  });

  it("the service role can insert leads, and only known tags are accepted", async () => {
    expect(await as("service_role", "insert into public.leads (email, source, tag) values ('test-2@techieficial.test', 'newsletter', 'newsletter') returning crm_sync_status")).toEqual([
      { crm_sync_status: "pending" },
    ]);
    await expect(as("service_role", "insert into public.leads (email, source, tag) values ('t@techieficial.test', 'x', 'not-a-tag')")).rejects.toThrow(/check constraint/);
  });
});

describe("audit log", () => {
  it("records inserts and updates with before and after", async () => {
    await as({ user: ADMIN }, "update public.client_projects set status = 'review' where id = $1", [PROJECT_B]);
    const rows = await db.query<{ actor: string; action: string; before: { status: string }; after: { status: string } }>(
      "select actor, action, before, after from public.audit_logs where table_name = 'client_projects' and record_id = $1 order by id",
      [PROJECT_B],
    );
    expect(rows.rows.map((row) => row.action)).toEqual(["insert", "update"]);
    expect(rows.rows[1]).toMatchObject({ actor: ADMIN, before: { status: "kickoff" }, after: { status: "review" } });
  });

  it("nobody can update or delete audit rows, not even the service role or the owner", async () => {
    await expect(as("service_role", "update public.audit_logs set action = 'x'")).rejects.toThrow(/permission denied|append only/);
    await expect(as("service_role", "delete from public.audit_logs")).rejects.toThrow(/permission denied|append only/);
    await expect(as({ user: ADMIN }, "delete from public.audit_logs")).rejects.toThrow(/permission denied|append only/);
    await expect(db.query("update public.audit_logs set action = 'x'")).rejects.toThrow(/append only/);
    await expect(db.query("delete from public.audit_logs")).rejects.toThrow(/append only/);
    await expect(db.query("truncate public.audit_logs")).rejects.toThrow(/append only/);
  });

  it("only admins can read the audit log", async () => {
    expect(await as({ user: USER_A }, "select * from public.audit_logs")).toEqual([]);
    expect((await as({ user: ADMIN }, "select count(*)::int as n from public.audit_logs"))[0]).toMatchObject({ n: expect.any(Number) });
    await expect(as("anon", "select * from public.audit_logs")).rejects.toThrow(/permission denied/);
  });

  it("signed-in users cannot write audit rows directly", async () => {
    await expect(as({ user: ADMIN }, "insert into public.audit_logs (action, table_name) values ('fake', 'x')")).rejects.toThrow(/permission denied/);
  });
});

describe("updated_at", () => {
  it("moves forward on update", async () => {
    const before = (await db.query<{ updated_at: Date }>("select updated_at from public.clients where id = $1", [CLIENT_A])).rows[0].updated_at;
    await new Promise((resolve) => setTimeout(resolve, 5));
    const after = (await db.query<{ updated_at: Date }>("update public.clients set website = 'https://test.invalid' where id = $1 returning updated_at", [CLIENT_A])).rows[0].updated_at;
    expect(new Date(after).getTime()).toBeGreaterThan(new Date(before).getTime());
  });
});
