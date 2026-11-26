# Performance, images, CSP and rate limits (A6)

## Performance budget

- Limits: `perf-budget.json`. Checked on every built page by `scripts/check-budget.mjs` (step 4b of `npm run check`)
  and on 4 key pages by Lighthouse CI (`lighthouserc.json`: script ≤ 280 KB, total ≤ 470 KB, TBT ≤ 300 ms, 0 third-party requests, CLS ≤ 0.1).
- Nov 26, 2026 baseline (gzip JS): home 260 KB, other pages 217 to 227 KB. Lighthouse mobile: Performance 94 to 96, the rest 100.
- LCP: real (observed) LCP is about 0.1 s and equals first paint. Lighthouse's simulated slow-phone LCP is 2.7 to 3.1 s,
  driven by JavaScript size, not by images or fonts. It stays a warning.
- Ways to cut JS further (not done, need design sign-off): load the footer newsletter form (Turnstile + validation, ~28 KB)
  only when it scrolls into view; load the cookie banner code only when an analytics ID is set; replace the
  animation library on the home wheel (~41 KB) with CSS.

## Image pipeline

- Originals go in `media-src/`; `npm run images` writes AVIF + WebP at 480 to 2400 px to `public/media/` and `content/images.json`.
- Show with `<Img name alt sizes />` (`components/Img.tsx`): real width/height (no layout shift), lazy by default, `alt` required.
- Outputs are committed, so Cloudflare builds never need sharp. `npm run check` fails if a source changed without a rebuild.
- Alternative (needs owner approval, may cost money): Cloudflare Images binding (`"images": { "binding": "IMAGES" }` in
  wrangler.jsonc) so `next/image` resizes on the fly. Not enabled: it is a hosting change.

## Content-Security-Policy review (next.config.ts)

| Item | Finding | Action |
|---|---|---|
| `script-src 'unsafe-inline'` | Needed: pages are static, and nonces would force every page to render per request | Kept, documented |
| Third-party hosts | Only Turnstile, Google tags, Clarity, Meta, chat widget origin | Kept |
| GTM custom HTML tags | Any tag inside GTM that loads a new domain will be blocked until that domain is added | Note for whoever edits GTM |
| `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'` | Good | Kept |
| `manifest-src`, `worker-src` | Fell back to `default-src` | Added explicitly |
| Cross-Origin-Opener-Policy | Missing | Added `same-origin-allow-popups` |
| HSTS `preload` | Already live. Only submit to the preload list if every subdomain serves HTTPS | Flag for owner |
| Chat widget | Its script may load more domains than its own origin | Check when the widget URL arrives |

Tests: `tests/security.spec.ts` checks the headers and that key pages load with zero CSP violations.

## Rate limits and form hardening (lib/leadHandler.ts)

- Before: in-memory counters per Worker instance (8 per IP / 10 min, 3 per phone / 10 min). They reset when an instance restarts and are not shared.
- Added: Cloudflare rate limiting bindings in `wrangler.jsonc`, shared by all instances: 5 form posts per IP per minute,
  2 "call me" requests per phone per minute. The in-memory limits stay as a second, longer window.
- Added: JSON-only (415 otherwise), 16 KB body cap (413).
- Recommended in the Cloudflare dashboard (owner, free): a WAF rate-limiting rule on `/api/*` as an outer layer.
- Not verified live: the bindings were accepted by `wrangler deploy --dry-run`; they work only once deployed.
