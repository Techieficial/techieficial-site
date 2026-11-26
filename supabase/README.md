# Supabase (B3)

Database schema for the leads log, client portal and audit log, in the standard Supabase CLI
layout. **Local first**: no Supabase project exists yet, and nothing here has been pushed anywhere.

| File | What it is |
| --- | --- |
| `config.toml` | Local stack settings (`npx supabase start`, needs Docker). Sign-up is off: staff create portal accounts |
| `migrations/20261126000000_init.sql` | Tables, row-level security, triggers |
| `seed.sql` | Fictional test records only ("Test Client A", "Test Lead"), for local runs |
| `tests/auth_stub.sql` | Test-only stand-in for Supabase's auth schema and roles, used by `api/test/rls.spec.ts` |

## Tables and who can see what

| Table | Holds | Clients | Staff and admin | Notes |
| --- | --- | --- | --- | --- |
| `clients` | The businesses we build for | Read their own | Read and write all (admins delete) | |
| `profiles` | One per portal user: role `client`, `staff` or `admin`, linked client | Read and rename themselves | Staff read all, admins edit all | Created automatically for each new auth user. Only admins change a role or client |
| `client_projects` | Builds, status `kickoff`, `build`, `review`, `live`, `operate` | Read their business's | Read and write all | |
| `project_files` | Storage path, name, type, size (no file data) | Read their business's | Read and write all | Files go in the private `project-files` bucket (B4) |
| `support_tickets` | Portal tickets | Read and open for their business | Read and write all | |
| `leads` | Every website lead: the CRM payload keys plus `crm_sync_status` | None | Read | Inserted only by the API with the service role |
| `audit_logs` | Actor, action, table, record id, before and after | None | Admins read | Written by triggers. Nobody can update, delete or truncate it, including the service role |

Anonymous visitors can read nothing. Every table has `updated_at` kept by a trigger (except the
audit log) and an audit trigger on every change.

## Checked without Docker

`cd api && npm test` runs `test/rls.spec.ts`: it applies the migration and seed to PGlite and
checks that client A cannot read client B's projects, files or tickets, a client cannot open a
ticket for another business or promote themselves, anon cannot read or insert leads, and the audit
log rejects updates and deletes from everyone.

PGlite is Postgres compiled to WebAssembly, so it runs the same SQL, but it is not the Supabase
stack. B4 must still run `npx supabase db reset` locally or `npx supabase db push` to the real
project and repeat the checks there.

## B4 steps

1. Owner creates the Supabase project (admin@techieficial.com, two-factor on) and sends the project ref.
2. `npx supabase link --project-ref <ref>`, then `npx supabase db push`.
3. Create the private `project-files` storage bucket with policies that mirror `project_files` (clients read their own business's folder; staff write).
4. Put the URL and keys in the API host's secrets (see `api/.env.example`).
5. Create the first admin user in the dashboard and set `profiles.role = 'admin'` with the SQL editor.
