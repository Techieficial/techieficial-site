# Techieficial API (B3)

NestJS service for the client portal, the website lead log and the AI assistant. **Local first**:
with no settings it runs fully in memory, so it needs no accounts. Nothing is deployed yet (B4).

## Run it

```bash
cd api
npm ci
npm run check     # typecheck + ESLint, all tests, then writes openapi.json
npm run dev       # builds, then serves http://localhost:3001 (reads api/.env if present)
```

- API docs: http://localhost:3001/docs (OpenAPI JSON at `/docs-json`; a copy is kept in `openapi.json`, refreshed by `npm run openapi`).
- Settings: see `.env.example`. They are checked at startup; a bad value stops the process with a list of problems (values are never printed).

## Endpoints

| Method | Path | Auth | Rate limit (per IP) | What it does |
| --- | --- | --- | --- | --- |
| GET | `/health` | none | 120 a minute | Liveness, data store in use, CRM forwarding on or off |
| POST | `/v1/leads` | none | 8 per 10 minutes | Validates a form (same fields and rules as `lib/lead.ts`), logs it, forwards the CRM payload to `CRM_WEBHOOK_URL` if set |
| GET | `/v1/portal/projects` | Supabase token | 60 a minute | The signed-in client's projects (staff see all) |
| GET | `/v1/portal/projects/:id` | Supabase token | 60 a minute | One project, 404 if not theirs |
| POST | `/v1/portal/tickets` | Supabase token | 60 a minute | Opens a support ticket |
| POST | `/v1/assistant/chat` | none | 20 a minute | 501 until the assistant is wired up in B6 |

Errors always look like `{ statusCode, error, message, fields?, requestId }`. Validation errors are
422 with the failing `fields`; unknown fields are rejected. A filled-in honeypot (`website`) gets
the normal success answer and is dropped, like the site's `/api/lead`.

## How it is built

- `src/app.ts`: helmet, CORS (only `CORS_ORIGINS`), JSON body limit 100 KB, request id and JSON request log, global ValidationPipe, error filter, Swagger.
- `src/data/`: repository interfaces. `MemoryStore` (no `SUPABASE_URL`) applies the same visibility rules as the database. `SupabaseStore` writes leads with the service role and runs portal queries with the user's own token, so row-level security decides what they see.
- `src/rate-limit/`: `@nestjs/throttler` on every route, counted by `CF-Connecting-IP` when present. `createThrottlerStorage()` is the seam for Upstash Redis in B4.
- `src/common/auth.ts`: verifies Supabase access tokens (HS256 with `SUPABASE_JWT_SECRET`, audience `authenticated`).
- `src/crm/crm-payload.ts`: the same payload builder as `lib/crm.ts`; a test fails if the two drift apart.

## Tests

- `test/api.e2e.spec.ts`: Supertest against the real app (health, leads valid, invalid, honeypot, CRM forwarding, 429, portal 401 and 200 with a signed test token, assistant 501, OpenAPI).
- `test/rls.spec.ts`: applies `supabase/migrations` to PGlite (Postgres in process, no Docker) with a stub of Supabase's auth schema and roles (`supabase/tests/auth_stub.sql`), loads `supabase/seed.sql`, then checks the row-level security rules.
- `test/unit.spec.ts`: config validation and CRM payload parity with the site.
