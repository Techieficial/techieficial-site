# v3 Repo Audit (Sprint 1, task A1)

Nov 26, 2026 · Claude Code session A · branch `v3-foundations` (from `v3` at `0187235`)

Checked against the 17 phases in `docs/BUILD_PLAN_V3.md`. Status: **Done** (meets the phase "Done when"), **Partial** (some pieces exist), **Missing** (nothing in the repo yet). Evidence is a file path you can open.

## Branch naming note

The plan uses `v3/phase-N`, `v3/foundations` and `v3/session-b`. Git cannot create any branch starting `v3/` while a branch called `v3` exists (locally or on GitHub). This build uses **`v3-foundations`** (session A) and **`v3-session-b`** (session B), and later phases should use `v3-phase-N`. Nothing else changes.

## What exists today

- Next.js 16.3.6, React 19.2.8, TypeScript, Tailwind 4, Motion 13, Velite (Markdown content), Phosphor icons, zod 4
- Cloudflare Workers via OpenNext (`wrangler.jsonc`, `open-next.config.ts`), static prerender with a read-only static-assets cache
- 33 route files under `app/`: home, services, ai-team, offers, industries (3), demo, inside, audit, missed-call calculator, work, blog (6 posts), agencies, academy, about, contact, faq, legal, thank-you pages, 404, sitemap, robots, manifest, llms.txt
- `/api/lead` and `/api/callme` with zod validation, honeypot, Turnstile (switches on when the key exists), in-memory rate limit per IP and per phone (`lib/leadHandler.ts`)
- Security headers incl. CSP in `next.config.ts`; www to apex redirect; v3 redirects (`/pricing` to `/offers`, `/services/ai-agents` to `/ai-team`)
- Cookie banner with Consent Mode v2 default denied, GA4, Clarity, Meta Pixel loading only after consent (`components/consent/Consent.tsx`)
- Quality gates `npm run check` (`scripts/check.mjs`): types, lint, build, placeholder scan, Playwright e2e + axe (8 spec files), linkinator, Lighthouse CI at 0.9; GitHub Action runs it on every push (`.github/workflows/check.yml`)

## Phase by phase

| # | Phase | Status | Evidence | Gap to close |
| --- | --- | --- | --- | --- |
| 1 | Discovery and strategy | Partial | `docs/STRATEGY_PACK.md` (draft) | Owner approval of the pack and its open questions (M6) |
| 2 | Information architecture | Partial | Sitemap in `docs/SITE_CONTENT_V3.md` 1.2, `lib/nav.ts`, redirects in `next.config.ts` | `docs/strategy/SITEMAP.md` with purpose, CTA, keyword, goal per page; new pages `/case-studies`, `/integrations`, `/resources`, `/portal`, `/tools/roi-calculator`, `/assessment`, `/founding`, real estate and gym industry pages (T2) |
| 3 | Brand and design system | Partial | Light and dark tokens in `app/globals.css`, components in `components/` | Tokens as one exported file; `docs/design/BRAND_GUIDE.md`; **Storybook missing**; final logo (M1) (A2) |
| 4 | UI/UX mockups | Missing | None in repo | Mockups for 8 templates at 5 widths, 3D hero concept; owner sign-off |
| 5 | Frontend | Partial | All v2/v3 pages above; SVG wheel `components/GrowthWheel.tsx` | Three.js hero, GSAP story, automation simulator, ROI calculator, new pages from Phase 2 (A7, after M6) |
| 6 | Backend | Missing | Only Next.js API routes | Supabase schema + RLS, NestJS API, OpenAPI, Redis rate limits, `docs/architecture/ARCHITECTURE.md` (B3 local skeleton now, B4 live) |
| 7 | CMS | Missing | Content is in `content/` (Markdown + TS) | Sanity schemas + Studio, roles, workflow, preview, migration, `docs/CMS_GUIDE.md` (B2 local now, B5 live) |
| 8 | Performance | Partial | Lighthouse CI at 0.9 on 4 pages (`lighthouserc.json`); immutable cache on `/_next/static` | Raise to 0.95 and add a case study page; INP check; JS budget per page; image pipeline (only 1 `next/image` use, no images in `public/` beyond OG) (A6) |
| 9 | Security | Partial | 6 headers incl. CSP; Turnstile, honeypot, zod; in-memory rate limit | CSP still allows `'unsafe-inline'` scripts; rate limit is per Worker instance only; no secret scan, no Dependabot, no ZAP, no backups yet (A3, A6, later A9) |
| 10 | SEO and AI search | Partial | Metadata, canonical, OG per page (`lib/seo.ts`); Organization, WebSite, FAQPage, Service, Article, BreadcrumbList JSON-LD; `app/llms.txt/route.ts`; sitemap, robots | Check Service schema covers ai-team and offers; alt-text and internal-link audit; keyword map (T2); Search Console (M10) (A5) |
| 11 | Conversion | Partial | CTAs, missed-call calculator, `/audit` | Sticky mobile CTA review, `/assessment`, exit-intent, A/B tests, founding page (B1, A7, A9) |
| 12 | AI and automation | Partial | Demo Lab call-me flow wired to the CRM webhook; chat widget slot | Chat assistant, recommendation logic, portal, live demo number (M2, T6, B6) |
| 13 | Analytics | Partial | Consent-gated GA4, Clarity, Pixel; 7 conversion events in `lib/analytics.ts` | GTM container, the v3 event list (`assessment_complete`, `chat_started`, `chat_qualified`, `purchase`), Conversions API, Sentry, uptime (A4, A8) |
| 14 | Testing and QA | Partial | Playwright e2e + axe, linkinator, Lighthouse | Vitest unit tests, visual regression, BrowserStack, k6, ZAP (A3, A10) |
| 15 | DevOps | Partial | GitHub Action on push; Cloudflare builds production from `claude/techieficial-marketing-site-exbrsa` | Staging environment, branch protection, rollback drill, release notes (A11) |
| 16 | Documentation | Partial | `CLAUDE.md`, `docs/CRM_SETUP.md`, `content/_missing.md`, `content/_review.md` | Architecture, CMS guide, deployment and env guide, VA guide (B7) |
| 17 | Continuous improvement | Missing | n/a until launch | Cadence starts at launch |

## What I need from you, by when it blocks

| Need | Blocks | When |
| --- | --- | --- |
| Approve `docs/STRATEGY_PACK.md` and answer its open questions (M6) | T2, then all new pages (A7) | Dec 1 |
| Final logo SVG, mark, favicon (M1) | Storybook logo swap, Phase 4 sign-off | Dec 1 |
| Accounts: Sanity, Supabase, Upstash, Sentry, Turnstile, GTM/GA4, Clarity, Meta Pixel, API host (M3), all under admin@techieficial.com | B4, B5, A8 | Dec 2 |
| US phone number + A2P 10DLC (M2) | Demo Lab live call, SMS | Start now, longest wait |
| PayPal Business connected + one test payment (M4) | `checkoutLive: true` | Before launch |
| Client naming confirmations in `docs/PROOF_PACK.md` section 4 | Case studies | Dec 2 |
| Say whether `v3-phase-N` branch names are fine | Nothing (already in use) | Any time |

## Proposed order for the rest of Sprint 1

Following the plan: A2 tokens + Storybook, A3 quality gates, A4 consent + GTM, A5 SEO pass, A6 performance and security. Session B runs B2 (Sanity) and B3 (Supabase + NestJS) in separate folders (`studio/`, `api/`, `supabase/`) so the two sessions never edit the same files.
