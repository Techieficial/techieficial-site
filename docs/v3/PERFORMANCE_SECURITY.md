# Performance and security foundations (Sprint 1, task A6)

Nov 26, 2026 · branch `v3-foundations`

## Where we are (Lighthouse, simulated mobile, 3 runs per page)

| Page | Performance | Accessibility, Best Practices, SEO | LCP (simulated) | CLS |
| --- | --- | --- | --- | --- |
| Home | 94 to 97 | 100 | 2.4 to 3.0 s | 0.002 |
| Service page | 94 to 95 | 100 | 2.9 to 3.0 s | 0 |
| Demo Lab | 94 to 95 | 100 | 2.9 to 3.1 s | 0 |
| Offers | 94 to 97 | 100 | 2.4 to 3.1 s | 0 |

The real measured LCP in the same runs is about 0.2 s; the simulated number models a slow phone and is driven by JavaScript run time. Phase 8 targets (95+ everywhere, LCP 2.5 s or less) are for A9. Biggest wins found:

1. Footer newsletter form (form, spam check, validation): about 28 KB gzip on every page. Load it when the footer scrolls into view.
2. Hero wheel and its animation library: about 41 KB gzip on the home page. Load it after the headline (plan F1 already asks for this).

## What A6 added

| Area | What | Where |
| --- | --- | --- |
| JS budget | Build fails if a page's up-front JavaScript (gzip) goes over budget: 225 KB default, home 268 KB | `perf-budget.json`, `scripts/check-js-budget.mjs`, `npm run perf:budget` |
| Images | Build-time pipeline: originals in `assets/images/`, AVIF + WebP at up to 4 widths in `public/images/`, real width and height recorded; `<Picture>` serves them lazily with no layout shift. No image server or Cloudflare Images plan needed | `scripts/build-images.mjs`, `components/Picture.tsx`, `npm run images` |
| CSP | Built from what is switched on: a vendor domain (Google, Clarity, Meta, Turnstile, video hosts, chat) is allowed only when its ID or URL is set. Today that is self plus the CRM booking calendar frame | `lib/csp.ts` |
| Rate limits | New first layer: Cloudflare Workers rate-limit bindings, shared across Worker instances (4 form posts per minute per IP, 2 call-me requests per minute per phone). The old per-instance 10-minute limits stay as a second layer | `wrangler.jsonc`, `lib/leadHandler.ts` |

## Decisions and caveats

- **`script-src 'unsafe-inline'` stays for now.** Every page is prerendered and Next.js inlines its bootstrap, page data and JSON-LD. Nonces would need a server render per request and lose static caching. Per-page hashes are the Phase 9 option.
- **Rate limits are per Cloudflare location** and approximate by design. For a hard limit on `/api/*`, add one Cloudflare WAF rate-limiting rule (owner step, below).
- The rate-limit bindings are new in `wrangler.jsonc`. They need no dashboard setup, but they only take effect once this branch is deployed, which needs your approval.
- `next dev` keeps the Cloudflare emulator; `next start` (tests, Lighthouse) no longer loads it, so test runs are not rate-limited.

## Owner step (5 minutes, when you approve the merge)

Cloudflare dashboard, techieficial.com, Security, WAF, Rate limiting rules, Create rule: path starts with `/api/`, method POST, 10 requests per 10 seconds per IP, action Block for 10 seconds. The free plan includes one rule.
