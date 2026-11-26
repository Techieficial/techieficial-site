# SEO pass (Sprint 1, task A5)

Nov 26, 2026 · branch `v3-foundations`

Scanned all 44 built pages. Structured data and machine-readable files were fixed directly (visitors see no change). Anything that changes visible copy or links is listed under "Needs your approval" and is **not** changed.

## Already in place (checked)

| Check | Result |
| --- | --- |
| Title per page, 60 characters or fewer, unique | 44 of 44 pass |
| Description per page, 155 characters or fewer | 44 of 44 pass |
| Canonical, Open Graph and Twitter tags | Every page (tests/routes.spec.ts) |
| BreadcrumbList | Every indexable inner page |
| Service schema | 4 service pages, 6 offer pages, 4 AI team profiles |
| Article schema | 3 published blog posts |
| FAQPage schema | Home, FAQ, offers, industries, service pages with FAQs |
| Review or rating schema | None (correct: no real reviews yet) |
| Image alt text | No `<img>` without alt (icons are decorative SVG with aria-hidden) |
| Broken links | 0 (linkinator) |
| llms.txt | Lists AI team, offers, services, industries, key pages, blog |

## Changed in this task (no visible change)

- Article schema now includes the post's share image (Google recommends it for article results), language, and the author's URL
- `llms.txt` now also lists the About page and the business email
- New test `tests/seo.spec.ts` keeps these rules from breaking: JSON-LD parses, required types per page type, title and description limits, unique titles and descriptions, alt text, no Review schema, llms.txt key pages

## Needs your approval (copy or link changes, not made)

| # | Finding | Rule | Suggested fix |
| --- | --- | --- | --- |
| 1 | Industry pages link to 0 offer pages and 0 project stories | PRD F12: each industry page links to 2 offers and 1 project story | Add an "Offers for {industry}" block linking AI Front Office and AI Receptionist Starter; add a project story card once stories are approved (PROOF_PACK) |
| 2 | Service and industry pages have no short "answer first" summary for AI search | Phase 10 (AEO/GEO) | A 2 to 3 sentence summary under each H1, written in T2 |
| 3 | `/work` reuses the homepage description | Unique description | Moot while `/work` is hidden (noindex); give it its own when the first case study launches |
| 4 | No real estate or gym industry pages | Phase 2 sitemap, PRD F12 | Copy comes from T2 |
| 5 | No author page; posts are signed "Techieficial team" | Phase 10 E-E-A-T | Needs the founder story approved (`content/_missing.md`), then an author page and Person author on posts |
| 6 | Organization schema only (no ProfessionalService) | Phase 10 | ProfessionalService needs the registered business address; add once supplied |

## Owner steps (Phase 10)

- Verify the site in Google Search Console and Bing Webmaster Tools (M10). Claude Code gives you the DNS TXT record to add in Cloudflare when you are ready.
- Then submit `https://techieficial.com/sitemap.xml` in both.
