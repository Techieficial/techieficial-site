# Missing facts (owner to supply)

Every item below is something only you can give us. Until it arrives, the part of the site that needs it stays **hidden automatically**. Nothing fake is shown in its place.

Send items in any order. Each one is a small edit once we have it.

## Unlocks the most (send these first)

| # | Item | Where it goes | What is hidden until then |
|---|---|---|---|
| 1 | **Demo phone number** (US number with the AI Receptionist live) | Cloudflare build variable `NEXT_PUBLIC_DEMO_PHONE` | "Call the AI" in the nav, the announcement bar, the mobile call button, every demo-call block and the Demo Lab "Call the AI" tab |
| 2 | **PayPal Business connected in the CRM, plus one test payment** | Then set `checkoutLive: true` in `site.config.ts` | Every "Buy now" and "Get started" button shows "Checkout opens soon" |
| 3 | **Price approval** (all prices are DRAFT) | `content/pricing.ts` | Prices show with a "Draft pricing" note on previews; Offer schema stays off |
| 4 | **Cloudflare Turnstile keys** (free, in the Cloudflare dashboard) | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (build) + `TURNSTILE_SECRET_KEY` (secret) | Spam check on forms is off. The honeypot and rate limit still run |
| 5 | **Google Calendar or Zoom connected** to the Strategy Call calendar, booking hours widened | In the CRM | Bookings have no meeting link |

Supplied on Nov 24, 2026 (docs/CRM_SETUP.md): business emails (hello@, support@), both CRM booking calendars, both CRM webhooks (stored as Cloudflare secrets), payment links, and the YouTube, Facebook, TikTok and Instagram links.

## Brand

- [ ] Final logo as SVG: `public/brand/logo.svg`, `logo-mark.svg`, `favicon.svg`. The current mark is used until then.

## Proof (never invented)

- [ ] **Hero stats**: 3 real numbers with a short label each (for example, leads handled or clients served). Hero stat chips are hidden.
- [ ] **Client logos**, only with each client's permission. The trust strip shows the countries you serve instead.
- [ ] **Testimonials**: quote, name, role, company, and permission to publish.
- [ ] **Case studies** (2 to 3): client or an anonymous description, industry, country, the problem, what we built, screenshots, result numbers, a testimonial if you have one. **The Work pages and every "Results" section are hidden until the first one is added.**

## Media

- [ ] **Recorded AI receptionist call** (audio file) for the home page demo block.
- [ ] **Homepage hero video** (owner is making it): a short silent loop plus a poster image. It replaces the Growth Engine wheel as the main visual under the hero headline. The wheel stays until then.
- [ ] **3 walkthrough videos** (YouTube or Vimeo links + a poster image each) for Demo Lab, "Watch it work" tab (hidden).
- [ ] **AI video samples** (links + poster + category: Ad creative, Product launch, Review, Training, Infographic) for the Demo Lab gallery (hidden).

## About and Academy

- [ ] Founder photo, and approval of the drafted founder story in `content/pages.ts` (`aboutPage.founder`). Set `founderApproved: true` to show it. Decide whether to mention being Nigerian and based in the Philippines.
- [ ] Instructor bio and photo for the Academy page (hidden).
- [ ] Founding-member offer for the Academy waitlist: what it is, the price, and the deadline (hidden).

## Pricing

- [ ] **Confirm or change the offer prices** in `content/pricing.ts` (AI Front Office $3,500 + $1,297/mo, AI Growth Team from $7,500 + $2,500/mo, AI Receptionist Starter $1,497 + $497/mo, CRM Workspace $197/mo, Missed-Call Text-Back $297, Playbook $97). Price schema stays off until you confirm (`pricesFinal`).
- [x] Add-on prices: supplied in docs/SITE_CONTENT_V3.md (DRAFT). They appear on /offers in Phase 4.

## Legal

- [ ] Review the drafted Privacy, Terms, Cookies, SMS terms and Accessibility pages with your lawyer, or send your own text. Add your business name and address as registered.

## Accounts and tracking

- [ ] LinkedIn company URL and X account (the other socials are live).
- [ ] GA4 measurement ID, Google Tag Manager container ID (optional, use GTM or direct GA4), Meta Pixel ID, Microsoft Clarity ID. Each tag stays off until its ID is set; the cookie banner only appears once at least one is set.
- [ ] Chat agent widget script URL (`NEXT_PUBLIC_CHAT_WIDGET_SRC`) for the Demo Lab (button hidden).

## v3 items to confirm (hidden until confirmed)

- [ ] **Guarantee** wording and terms ("Live in 14 days or your setup fee back"). Not shown.
- [ ] **Upgrade credit** terms (setup fee counts toward a bigger plan within 60 days). Not shown.
- [ ] **Free audit turnaround** (draft: "within 3 business days"). The audit thank-you page leaves it out.
- [ ] **Homepage stat** from Nextiva (vendor blog): approve or replace. Not used; the problem section uses the 411 Locals and Harvard Business Review stats instead.
- [ ] **Experience line** on the home services page ("We've built CRM and lead systems for builders and HVAC businesses"). Not shown.
- [ ] **Customer data FAQ** ("Is my customer data safe?"): confirm against the privacy policy. Not shown.
- [ ] **Paid ads standalone price** (or "quote"). The page says "Included in the AI Growth Team".
- [ ] **Kickoff call calendar link** for the purchase thank-you page.
- [ ] **CRM payment links: success URL.** Point each one at https://techieficial.com/thank-you/purchase.
- [ ] **Playbook download files** for each niche.
- [ ] **Legal business name and address** for the legal pages and footer (for example EYANDA IT SOLUTIONS trading as Techieficial).

## Later pages

- [ ] Real estate industry page (menu link hidden until the page exists).
