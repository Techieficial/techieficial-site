# v3 Foundations audit (A1)

Date: Nov 26, 2026. Branch: `v3-foundations`, cut from `v3` at `c0f1c26` (same commit as the live branch).

Scope note: no "17 phases" document exists in the repo, Google Drive or Notion. This audit covers
the two plans in the repo: the build brief in `CLAUDE.md` (sections 2 to 14) and the v3 build
phases 1 to 7 in `docs/SITE_CONTENT_V3.md` Part 4.

Baseline (`npm run check:fast`): types, lint, build, placeholder scan (45 pages), 40 Playwright
e2e + axe tests, link check: all pass. Lighthouse not run in the baseline (run in A6).

Legend: Done / Partial / Missing / Blocked (needs owner input).

## v3 build phases (SITE_CONTENT_V3.md Part 4)

| Phase | Status | Notes |
|---|---|---|
| 1 Foundations | Done | site.config, pricing.ts, redirects (/pricing, /services/ai-agents), nav, /api/lead, /api/callme |
| 2 Homepage | Done | |
| 3 AI Team | Done | /ai-team + 4 profiles |
| 4 Offers | Done | checkoutLive false, buttons disabled |
| 5 Demo Lab, Inside, tools | Done | tabs with missing assets hidden |
| 6 Everything else | Done | |
| 7 QA | Partial | Real-webhook test with "website-test" leads and owner checklist not recorded in repo |

## Build brief (CLAUDE.md)

| Section | Status | Gap | Fixed in |
|---|---|---|---|
| 2 Rules (no placeholders, no em-dash, CRM wording) | Done | Placeholder scan runs in build | |
| 5 Design system / tokens | Partial | Tokens live only in `globals.css`; no token reference, no component catalogue | A2 |
| 5 Components built once | Partial | Exist in `components/ui.tsx`, `blocks.tsx`; not documented or viewable in isolation | A2 |
| 9 Metadata, canonical, OG, sitemap, robots | Done | | |
| 9 JSON-LD Organization, WebSite, FAQPage | Done | | |
| 9 JSON-LD Service | Partial | On services, offers, AI team profiles. Hubs (/services, /ai-team, /offers) have none | A5 |
| 9 JSON-LD BreadcrumbList | Done | Rendered by `Breadcrumbs` on inner pages | A5 verify |
| 9 JSON-LD Article | Partial | Author is the Organization, no `image`; owner must confirm author name | A5 |
| 9 llms.txt | Done | Generated route `app/llms.txt/route.ts` | A5 verify |
| 9 Alt text | Partial | Only image is the video poster with `alt=""` inside a labelled button (correct). No lint/test guard | A5 |
| 9 Internal links | Partial | Service pages link demo, offers, 2 industries; case-study link hidden (no case studies). Industry pages link services | A5 |
| 10 Performance targets | Partial | Lighthouse CI assertions exist; no resource/bundle budget | A6 |
| 10 Images through next/image | Partial | No `images` config for Cloudflare Workers; optimizer needs a loader or binding | A6 |
| 10 Security headers / CSP | Done, review | `script-src 'unsafe-inline'`; no GTM hosts; no `worker-src`/`manifest-src` | A4, A6 |
| 10 Rate limits | Partial | In-memory per Worker instance only (resets, not shared across instances) | A6 |
| 11 Cookie consent | Done | Accept / Reject / Preferences, Consent Mode v2 default denied | A4 |
| 11 GA4, Meta Pixel, Clarity | Done | Load only after consent and only when an ID is set | A4 |
| 11 GTM | Missing | Not in brief, requested in A4 | A4 |
| 11 Clarity consent signal | Partial | Clarity not told about consent state (`clarity('consent')`) | A4 |
| 12 Gates: types, lint, build, placeholders, e2e, axe, links, Lighthouse | Done | `npm run check`, GitHub Action `check.yml` | |
| 12 Unit tests (Vitest) | Missing | | A3 |
| 12 Secret scan | Missing | | A3 |
| 12 CI split into visible jobs | Partial | One job runs everything; a failure does not say which gate at a glance | A3 |
| 13 `_missing.md`, `_review.md` | Done | 74 lines of open items | |

## Blocked on owner input (unchanged, from content/_missing.md)

- GA4, Meta Pixel, Clarity, GTM IDs (A4 code ships switched off until set)
- Case studies, testimonials, stats (blocks the "case study" internal link on service pages)
- Logo SVGs, hero video, walkthrough videos, gallery items (blocks the image pipeline having real images)
- Final prices (`pricesFinal`, blocks Offer schema)
- Blog author name for Article schema (uses "Techieficial" until supplied)
