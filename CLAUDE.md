# Techieficial Website v2: Build Brief for Claude Code

@AGENTS.md

---

## 1. Who you are working for

- **Owner:** Abdulmujeeb, founder of Techieficial (techieficial.com). He does not write code. Explain decisions in plain language, keep steps short, and never assume he can debug code himself.
- **Business:** Techieficial is an AI growth agency. It plans and runs 5 services as one system:
  1. Marketing Automation (CRM builds, speed-to-lead, nurture, reactivation, reviews). Always say "CRM" in site copy. Never name the underlying platform.
  2. Paid Social Ads (Meta, Google, TikTok, LinkedIn) with AI ad creatives
  3. AI Video Content (ad creatives, UGC-style ads, product launch, reviews, training, explainers, infographics)
  4. AI Agents ("AI employees": voice receptionist, chat agent, lead qualifier, back-office agents, custom projects)
  5. Training (corporate AI workshops, mentorship, courses via the Academy)
- **Audience, in priority order:** service business owners (home services, dental/med spa, legal, real estate) who lose leads to missed calls and slow follow-up; marketing agencies wanting white-label fulfillment; e-commerce/product brands needing ads and creatives; companies (20 to 500 staff) needing AI training; VAs and career switchers (Academy).
- **Goal of the site:** 1) booked strategy calls (high ticket, $3,000+), 2) live demo tests, 3) low-ticket purchases / Academy waitlist, 4) newsletter signups.

## 2. Non-negotiable rules

1. **Production quality. Zero placeholders ship.** Any missing fact goes in `content/_missing.md` and the page section is hidden in production (`draft: true`). A build check (section 12) fails if placeholder words reach production.
2. **Never invent facts:** no fake stats, client names, testimonials, reviews, logos, certifications or awards. Use only data in `content/` or data the owner gives you. Ask when unsure.
3. **No em-dashes (—) in any site copy.** Use commas, periods or colons.
4. **Say "CRM", never the CRM vendor name**, in all visible copy, metadata and alt text.
5. **All copy lives in `content/` and `site.config.ts`.** No marketing text hardcoded in components. Changing a price, phone number or CTA must mean editing one file.
6. **Secrets only in environment variables** (`.env.local`, Cloudflare secrets). Never commit keys, never put them in client code.
7. **Work in small steps.** After each step: run `npm run check` (section 12), commit with a clear message, and tell the owner in 2 to 4 plain sentences what changed and what he should look at.
8. **Ask before** deleting files, changing the domain or DNS, changing hosting, or anything that cannot be undone.
9. Keep the existing site live until day 7. Build on a branch (`v2`) and deploy previews.

## 3. Starting point

- The current site (techieficial.com) is a **single-page Next.js app deployed on Cloudflare Workers via OpenNext**, styled with Tailwind, fonts Space Grotesk + Inter. It has anchor links only (#services, #process, #academy, #faq, #start), placeholder text in the footer, **no sitemap.xml (404), no Open Graph image, no canonical tags, no JSON-LD**.
- If this folder contains that existing repo: keep the stack, reuse the good pieces (color tokens, hero wheel as a starting point), and rebuild into the multi-page structure below on a `v2` branch.
- If this folder is empty: create a new Next.js (App Router, TypeScript) project with the same stack and deploy config (`@opennextjs/cloudflare`).
- Before writing code, inspect the folder and report back what you found (stack, versions, deploy config, what can be reused).

## 4. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript, static generation for every marketing page |
| Styling | Tailwind CSS with the tokens in section 5 |
| Animation | Framer Motion; every animation respects `prefers-reduced-motion` |
| Content | MDX + typed frontmatter (e.g. Velite or next-mdx-remote + zod) in `content/` |
| Icons | Phosphor or Lucide (one set only) |
| Hosting | Cloudflare Workers via OpenNext (current setup) |
| Forms | Server route that validates (zod) + checks Cloudflare Turnstile, then POSTs to the CRM inbound webhook (`CRM_WEBHOOK_URL`) |
| Booking | CRM calendar embed URL from `site.config.ts` (lazy-loaded) |
| Analytics | GA4, Meta Pixel, Microsoft Clarity, loaded only after cookie consent |
| Tests | Playwright (e2e), axe (accessibility), Lighthouse CI, linkinator (links) |

## 5. Brand and design system

Keep the dark theme already live. Tokens:

| Token | Value | Use |
|---|---|---|
| `bg` | #0A0B14 | Page background |
| `surface` | #12131F | Cards |
| `surface-2` | #191B2B | Raised cards, menus |
| `rule` | #24263A | Borders |
| `ink` | #F4F5FA | Headings and body |
| `muted` | #9CA3B8 | Secondary text (check 4.5:1 contrast on every background) |
| `accent` (violet) | #7C5CFF | Primary buttons, links |
| `accent-hover` | #9B87FF | Hover |
| `accent-text` | #A99BFF | Violet text on dark |
| `accent-2` (cyan) | #22D3EE | Gradient end, data |
| `accent-3` (pink) | #F472B6 | Service accent |
| `accent-4` (lime) | #A3E635 | Service accent |
| `on-accent` | #0A0B14 | Text on bright fills |

- **Signature gradient:** `linear-gradient(100deg, #7C5CFF 0%, #22D3EE 100%)` for primary buttons, key words in headlines and the wheel glow. Use it sparingly.
- **Service colors** (used on cards, mega-menu, page glows, wheel): Marketing Automation = cyan, Paid Ads = pink, AI Video = violet, AI Agents = a 5th accent `#FB923C` (orange) so no two services share a color, Training/Academy = lime. Put these in `site.config.ts` so they can change.
- **Type:** Space Grotesk 600/700 for headings, Inter 400/500 for body, self-hosted via `next/font`. Fluid type scale (clamp) from mobile to desktop.
- **Logo:** the owner will provide the final SVG as `public/brand/logo.svg`, `logo-mark.svg` and `favicon.svg`. Until then use the current mark and wordmark, and list the logo in `content/_missing.md`.
- **Components to build once:** Button (primary gradient, secondary outline, ghost), ServiceCard, StatChip, CaseStudyCard, PricingCard, FAQAccordion, CTABand, VideoTile (poster + lazy player), DemoCallBlock, LogoMarquee, SectionHeader, Breadcrumbs, MegaMenu, Footer, CookieBanner.
- **Motion:** fade-up on scroll, a slow wheel rotation, counters on stats. No autoplay background video, no scroll-jacking, no sound.
- **Imagery:** real screenshots, screen recordings and AI videos made by Techieficial. No stock robots.

## 6. Site map (launch scope)

| URL | Template |
|---|---|
| `/` | Home |
| `/services` | Services hub |
| `/services/marketing-automation` | Service |
| `/services/paid-ads` | Service |
| `/services/ai-video` | Service |
| `/services/ai-agents` | Service |
| `/services/training` | Service |
| `/demo` | Demo Lab |
| `/work` | Work index |
| `/work/[slug]` | Case study (2 to 3 at launch, only with real data) |
| `/pricing` | Pricing + Engine Builder |
| `/industries/home-services`, `/industries/dental-medspa`, `/industries/legal` | Industry |
| `/agencies` | White-label landing page |
| `/academy` | Academy waitlist |
| `/about` | About |
| `/contact` | Contact + booking |
| `/faq` | FAQ |
| `/blog`, `/blog/[slug]` | Blog (3 posts at launch) |
| `/privacy`, `/terms`, `/cookies`, `/sms-terms`, `/accessibility` | Legal |
| `/thank-you` | Post-booking page |
| `not-found` | Custom 404 |

Redirects: `/#services` style anchors from the old site should still land sensibly (keep matching section ids on the homepage).

## 7. Global layout

### Navbar
- Logo left. Center: **Services** (mega-menu), **Demo Lab**, **Work**, **Pricing**, **Academy**. Right: text link **"Call the AI"** (tel: link to the demo number) and gradient button **"Book a strategy call"** (`/contact`).
- Sticky. Transparent over the hero; after 80px of scroll becomes a dark glass bar (`backdrop-blur`, `bg/80`, bottom border `rule`).
- **Mega-menu (Services):** 5 service tiles in their service colors (icon, name, one outcome line); a column "By industry" (Home services, Dental and med spa, Legal, Real estate (hide until page exists), Agencies); a featured card "See the Growth Engine in action" to `/demo`. Opens on hover (with delay) and on click; fully keyboard accessible; closes on Escape.
- **Mobile:** full-screen sheet, Services as accordion, Book button pinned at the bottom. Sticky bottom bar on mobile pages: "Book a call" + "Call the AI".
- Optional closable announcement bar: "New: call our AI receptionist live, no signup." (controlled by `site.config.ts`).

### Footer
- Top: CTA band "Ready to build your growth engine?" + Book button + demo phone number.
- Newsletter row: email field + "1 automation idea every week" (posts to the CRM with tag `newsletter`).
- 5 columns: **Services** (5), **Industries** (live pages only), **Resources** (Demo Lab, Work, Blog, FAQ), **Academy** (Academy, Corporate training, Mentorship), **Company** (About, Contact, Agencies / white label).
- Bottom row: logo + one-line mission, social icons (only accounts that exist in `site.config.ts`), business email, © {current year} Techieficial, Privacy, Terms, Cookies, SMS terms, Accessibility.
- Never render a link to a page that does not exist.

## 8. Page specs

### Home (`/`)
Section order (each section has an id):
1. **Hero** (`#top`). Left: tag "AI growth agency", H1 "One team for your whole growth engine." (gradient on "growth engine"), sub line "AI video, paid ads, CRM automation and AI agents, planned and run as one system. Plus training so your team can run it too.", buttons "Book a strategy call" (primary) and "Try the live demo" (secondary, to `/demo`), then 3 StatChips from `content/home.mdx` (real numbers only; hide if missing). Right: **Growth Engine wheel** (spec below).
2. **Trust marquee:** client logos (only with permission) or "Clients in US, UK, Canada, Australia, New Zealand".
3. **Problem** (`#problem`): "Stop managing three vendors to run one funnel." 3 pain cards (missed calls, slow follow-up, AI tools that never went live), each with a sourced stat + source link.
4. **Services** (`#services`): 5 ServiceCards in service colors.
5. **Live demo teaser:** DemoCallBlock: "Call our AI receptionist now" + big tel number + "Or hear a recorded call" audio player.
6. **How it works** (`#process`): Audit, Build, Launch, Operate (4 steps with timeline).
7. **Results:** 2 to 3 CaseStudyCards (hide section if none).
8. **Packages preview:** 3 PricingCards with "from" prices, link to `/pricing`.
9. **Academy strip** (`#academy`): "Want to run it yourself? Learn from the people who build it." + waitlist CTA.
10. **Comparison table:** "Techieficial vs. hiring separate vendors vs. hiring in-house" (cost, speed, one plan, reporting).
11. **FAQ** (`#faq`): 6 questions + FAQPage schema.
12. **Final CTA** (`#start`): CTABand with booking.

### Growth Engine wheel (hero component)
- Build as **SVG + Framer Motion** (not canvas, not video). 5 segments (one per service, service colors), inner hub with logo mark, outer ring labels "Get Seen", "Capture Leads", "Grow Revenue".
- **States:** idle = very slow rotation (about 60s per turn) + auto-highlight cycling through the segments every 4s; hover/focus on a segment = highlight it and pause; click/Enter = select it and show a **center panel / side card** with the service name, one outcome line, 3 deliverables and "Explore" link to the service page. Once the visitor interacts, auto-cycling stops.
- A light pulse travels along the outer ring (ads to leads to revenue) every few seconds.
- **Accessibility:** segments are real buttons in a `role="group"` with labels; arrow keys move between segments; a visually hidden list of the 5 services with links for screen readers; with `prefers-reduced-motion` there is no rotation, no pulse, no auto-cycle.
- **Mobile (<768px):** swap the wheel for a horizontally swipeable row of 5 service chips above a summary card (same data).
- Data comes from `content/services/*.mdx` so the wheel and service pages never disagree.
- Must not hurt LCP: the H1 is the LCP element; the wheel renders after, with no layout shift (reserve its box).

### Services hub (`/services`)
Hero, 5 large ServiceCards, "How the services connect" diagram (ads feed leads into the CRM, AI agents answer, video feeds ads, training hands it over), packages comparison, CTA.

### Service template (`/services/[slug]`)
From `content/services/<slug>.mdx` frontmatter + body:
1. Hero with breadcrumb, H1 outcome headline, who it is for, buttons Book / See demo, service-color glow
2. 3 pain points
3. "What we build": 6 to 9 deliverable cards
4. Demo embed (video, live demo block or gallery; per service)
5. Process timeline (kickoff to launch, e.g. 2 to 4 weeks)
6. Results: related case study + testimonial (hide if none)
7. Pricing block: "from" price, link to `/pricing`
8. 5 FAQs (FAQPage schema)
9. Related services + related industries (internal links)
10. CTA band
Headline angles: Marketing Automation "Never lose a lead to slow follow-up."; Paid Ads "Ads that feed a system, not a spreadsheet."; AI Video "Studio-quality video without the studio."; AI Agents "An AI employee that never clocks out."; Training "Your team, AI-ready in weeks." Mention on Marketing Automation that support for more CRM platforms (HubSpot, Zoho, Salesforce) is coming.

### Demo Lab (`/demo`)
- Hero: "Don't take our word for it. Test it." + demo phone number in large type.
- 4 tabs (URL hash per tab, keyboard accessible):
  1. **Try it live:** tel link to the demo number; "Call me" form (name, email, phone, SMS consent checkbox) that triggers the CRM/voice AI outbound call via the webhook; optional chat agent widget (script from `site.config.ts`, loaded on tab open only). After a call, a "What just happened" panel lists the CRM steps (logged, tagged, text sent, task created).
  2. **Watch it work:** 3 walkthrough videos (lazy VideoTiles).
  3. **AI content gallery:** video grid with filters (Ad creative, Product launch, Review, Training, Infographic) from `content/gallery.json`.
  4. **Book a test build:** choose AI agent or Marketing automation, 5-question form, then the calendar.
- Rate-limit the Call me form (per IP and per phone number) on the server.

### Pricing (`/pricing`)
- **Engine Builder:** step 1 pick services (multi-select chips), step 2 business size (Solo, 2 to 10, 11 to 50, 50+), step 3 main goal. Output: recommended package, setup "from" price, monthly "from" price, what is included, then "Book a strategy call" (passes the selection into the booking form as hidden fields). Logic lives in `content/pricing.ts`.
- 3 packages (values in `content/pricing.ts`, owner confirms):
  - **Capture:** CRM setup, missed-call text back, speed-to-lead, review requests. Setup from $1,500, monthly from $297.
  - **Convert (Most popular):** Capture + AI voice receptionist, nurture, reactivation, monthly AI video creatives. Setup from $3,500, monthly from $997.
  - **Dominate:** Convert + ads management, 1 custom AI employee, team training. Setup from $7,500, monthly from $2,500 + ad spend.
- "What your monthly fee covers": CRM platform, monitoring of bots and automations, optimization, support, monthly reporting.
- Individual service price list, add-ons, pricing FAQ, CTA.
- Offer schema only if prices are final.

### Work (`/work`, `/work/[slug]`)
Index with filter by service. Case study template: client (or anonymized description), industry, country, problem, what we built (steps + screenshots), results (numbers), testimonial, services used, CTA. Only publish case studies with real data from the owner.

### Industry template (`/industries/[slug]`)
Niche pains, the niche workflow (diagram), recommended package, relevant case study, niche FAQ, CTA. Launch: home services, dental and med spa, legal.

### Agencies (`/agencies`)
White-label fulfillment for agencies: CRM builds, AI agents, AI video under the agency's brand. How it works, what they get, turnaround, NDA/white-label promise, CTA "Book a partner call".

### Academy (`/academy`)
Waitlist page until courses exist: outcome headline, what is coming (self-paced course, community, 1:1 mentorship, corporate training), founding-member offer, instructor section, waitlist form (CRM tag `academy-waitlist`).

### About, Contact, FAQ, Blog, Legal, Thank you, 404
- **About:** founder story (from owner), photo, values, how we work, countries served.
- **Contact:** calendar embed, short form (name, email, phone, business type, main goal, monthly budget range, message, SMS consent), business email, demo number. On submit redirect to `/thank-you`.
- **FAQ:** 15 to 20 questions grouped (Services, Pricing, Process, AI and data, Contracts), FAQPage schema.
- **Blog:** MDX posts with author, date, reading time, table of contents, related posts, Article schema. Seed 3 posts (owner approves topics), e.g. "What missed calls really cost a service business", "AI receptionist vs answering service", "What a CRM automation build includes".
- **Legal:** the owner supplies policy text; render it with a clean long-form layout and "Last updated" date. SMS terms must include opt-in, frequency, "reply STOP to cancel, HELP for help", and data-rates wording for US A2P 10DLC.
- **Thank you:** confirmation, what happens next (3 steps), prep checklist, links to Demo Lab and Work. Fires the `book_call` conversion.
- **404:** friendly message, search-style links to Services, Demo Lab, Pricing, Contact.

## 9. SEO requirements (all mandatory)

- Next.js Metadata API: unique `title` (under 60 chars, pattern "Page | Techieficial") and `description` (under 155 chars) per page from content frontmatter; `metadataBase` = `https://techieficial.com`.
- Canonical URL on every page. Choose one host (non-www recommended) and redirect the other.
- `app/sitemap.ts` (all public routes, lastModified) and `app/robots.ts` (allow all, link sitemap, disallow `/api`). Keep any Cloudflare-managed robots rules compatible.
- Open Graph + Twitter cards on every page; dynamic 1200x630 OG images via `opengraph-image.tsx` using the brand gradient and page title.
- JSON-LD: Organization (name, url, logo, sameAs from real socials, contact email), WebSite, Service (each service page), FAQPage (wherever FAQs render), BreadcrumbList (all inner pages), Article (blog posts). Validate all with Google's Rich Results test format.
- One H1 per page, logical headings, descriptive alt text, descriptive link text (no "click here").
- Internal linking: each service page links to its demo, a case study, pricing and 2 industries; each industry page links to 2 services.
- `public/llms.txt` summarizing the company, services and key pages for AI search engines.
- Favicons and web manifest (`app/icon.svg`, `apple-icon.png`, `manifest.ts`).
- Language `en`, `hreflang` not needed at launch.

## 10. Performance, accessibility, security

- **Targets (mobile):** Lighthouse 90+ on Performance, Accessibility, Best Practices, SEO for Home, one service page, Demo Lab, Pricing. LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Images through `next/image` (AVIF/WebP, sizes set), video only as poster + click-to-play (YouTube/Vimeo lite embed), third-party scripts lazy and after consent.
- **WCAG 2.2 AA:** contrast 4.5:1 (3:1 for large text), visible focus rings, skip link, keyboard access for menu, wheel, tabs, accordions and Engine Builder, labels on all inputs, `aria-live` for form results.
- **Security headers** (via middleware or Cloudflare): Content-Security-Policy (allow only the needed domains: CRM, calendar, analytics, Turnstile, video hosts), Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors 'none'.
- Forms: zod validation on client and server, Turnstile verification on the server, honeypot field, rate limit, never expose the CRM webhook URL to the browser.

## 11. Forms, CRM and analytics

- Every form posts to `/api/lead` with a `source` field. The server adds UTM parameters (captured on first visit and stored in a first-party cookie), page URL and a tag, then POSTs to `CRM_WEBHOOK_URL`.
- Tags: `booked-call`, `demo-callme`, `test-build`, `newsletter`, `academy-waitlist`, `agency-partner`, `engine-builder`.
- Consent: SMS checkbox (unchecked by default) with the SMS terms link on every form that collects a phone number.
- **Cookie consent** banner (Accept / Reject / Preferences). GA4, Meta Pixel and Clarity load only after acceptance (Google Consent Mode v2 defaults to denied).
- Conversion events: `book_call`, `demo_call_started`, `callme_submit`, `form_submit`, `newsletter_signup`, `engine_builder_complete`, `test_build_booked`.
- Environment variables (document them in `.env.example`, never real values): `CRM_WEBHOOK_URL`, `CRM_CALLME_WEBHOOK_URL`, `NEXT_PUBLIC_CALENDAR_URL`, `NEXT_PUBLIC_DEMO_PHONE`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_CHAT_WIDGET_SRC`.

## 12. Quality gates (run before every commit and deploy)

Create `npm run check` that runs, in order, and stops on the first failure:
1. `tsc --noEmit` (zero type errors)
2. ESLint (zero errors)
3. Production build
4. **Placeholder scan:** fail if built pages or `content/` (excluding `_missing.md` and drafts) contain `PLACEHOLDER`, `lorem`, `TODO`, `TBD`, `[YOUR`, `XXX`, `example.com`, or an em-dash in visible copy
5. Playwright e2e: every route returns 200 and has one H1, a title, a description and a canonical; nav and mega-menu work by mouse and keyboard; the wheel responds to hover, click and arrow keys; each form validates and submits against a mocked webhook; 404 works
6. axe accessibility scan on every route: zero serious/critical issues
7. linkinator: zero broken links
8. Lighthouse CI on the 4 key pages with the thresholds in section 10

Set up a GitHub Action that runs the same checks on every push and blocks deploys that fail.

## 13. Content workflow

- `content/` holds: `home.mdx`, `services/*.mdx`, `industries/*.mdx`, `work/*.mdx`, `blog/*.mdx`, `faq.json`, `gallery.json`, `pricing.ts`, `legal/*.mdx`.
- You may **draft** copy for services, industries, FAQ and blog from this brief, in a confident, plain, benefit-first voice (short sentences, no hype words like "revolutionary", no em-dashes). Mark drafted files `status: needs-review` and list them in `content/_review.md` for the owner.
- Facts the owner must supply are tracked in `content/_missing.md` (logo, founder story and photo, stats, client logos/testimonials, case study data, demo number, videos, walkthrough recordings, final prices, policy texts, social links, business email, IDs and webhooks). Sections that depend on a missing fact stay hidden in production.

## 14. Seven-day plan (each day ends with a green `npm run check` and a preview deploy)

| Day | Build |
|---|---|
| 1 | Audit the folder, set up branch `v2`, tokens, fonts, layout, navbar + mega-menu, footer, cookie banner shell, SEO base (metadata, sitemap, robots, OG images, JSON-LD helpers, manifest, llms.txt), `site.config.ts`, content system, quality gates + GitHub Action |
| 2 | Homepage with all 12 sections and the Growth Engine wheel (desktop + mobile + keyboard + reduced motion) |
| 3 | Service template + 5 service pages, Services hub |
| 4 | Demo Lab (4 tabs, call-me flow, gallery), Pricing + Engine Builder |
| 5 | Work index + case study template, 3 industry pages, Agencies, Academy, About, Contact, FAQ |
| 6 | Blog + 3 posts, `/api/lead` with Turnstile + CRM webhook + UTM capture, analytics after consent, conversion events, legal pages, thank-you, 404, redirects, security headers |
| 7 | Full QA: fix everything `npm run check` reports, manual checklist for the owner (below), then, **only with the owner's go-ahead**, merge to main and deploy to techieficial.com, submit sitemap guidance |

**Owner's manual checklist (give him this on day 7):** open every page on phone and laptop; call the demo number from the site; submit every form and confirm the lead in the CRM; book and cancel a test call; share the homepage link in a chat app to check the preview; confirm analytics do not load before accepting cookies.

## 15. How to report progress

At the end of each step send the owner:
- **Done:** what was built (plain words)
- **Check:** the preview link and what to look at
- **Need from you:** items from `content/_missing.md` that block the next day
- **Next:** the next step
