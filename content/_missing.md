# Missing facts (owner to supply)

Every item below is something only you can give us. Until it arrives, the part of the site that needs it stays **hidden automatically**. Nothing fake is shown in its place.

Send items in any order. Each one is a small edit once we have it.

## Unlocks the most (send these first)

| # | Item | Where it goes | What is hidden until then |
|---|---|---|---|
| 1 | **Demo phone number** (the live AI receptionist line) | Cloudflare build variable `NEXT_PUBLIC_DEMO_PHONE` | "Call the AI" in the menu, the announcement bar, the mobile call button, the home page demo block, the demo block on each service page, and the "Try it live" tab of the Demo Lab |
| 2 | **CRM inbound webhook URL** | Cloudflare secret `CRM_WEBHOOK_URL` | Forms show "not sent" until this is set. Nothing reaches your CRM |
| 3 | **"Call me" webhook URL** (optional, if the outbound AI call uses a different workflow) | Cloudflare secret `CRM_CALLME_WEBHOOK_URL` | Falls back to the main webhook |
| 4 | **CRM calendar embed URL** | Cloudflare build variable `NEXT_PUBLIC_CALENDAR_URL` | Calendar on the Contact page and Demo Lab (the forms still work) |
| 5 | **Business email** | Cloudflare build variable `NEXT_PUBLIC_CONTACT_EMAIL` | Email in the footer, Contact page and Organization schema |
| 6 | **Cloudflare Turnstile keys** (free, in the Cloudflare dashboard) | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (build) + `TURNSTILE_SECRET_KEY` (secret) | Spam check on forms is off. The honeypot and rate limit still run |

## Brand

- [ ] Final logo as SVG: `public/brand/logo.svg`, `logo-mark.svg`, `favicon.svg`. The current mark is used until then.

## Proof (never invented)

- [ ] **Hero stats**: 3 real numbers with a short label each (for example, leads handled or clients served). Hero stat chips are hidden.
- [ ] **Client logos**, only with each client's permission. The trust strip shows the countries you serve instead.
- [ ] **Testimonials**: quote, name, role, company, and permission to publish.
- [ ] **Case studies** (2 to 3): client or an anonymous description, industry, country, the problem, what we built, screenshots, result numbers, a testimonial if you have one. **The Work pages and every "Results" section are hidden until the first one is added.**

## Media

- [ ] **Recorded AI receptionist call** (audio file) for the home page demo block.
- [ ] **3 walkthrough videos** (YouTube or Vimeo links + a poster image each) for Demo Lab, "Watch it work" tab (hidden).
- [ ] **AI video samples** (links + poster + category: Ad creative, Product launch, Review, Training, Infographic) for the Demo Lab gallery (hidden).

## About and Academy

- [ ] Founder story and photo (About page section hidden).
- [ ] Instructor bio and photo for the Academy page (hidden).
- [ ] Founding-member offer for the Academy waitlist: what it is, the price, and the deadline (hidden).

## Pricing

- [ ] **Confirm or change the package prices** in `content/pricing.ts` (Capture $1,500 + $297/mo, Convert $3,500 + $997/mo, Dominate $7,500 + $2,500/mo plus ad spend). Price schema for Google stays off until you confirm (`pricesFinal`).
- [ ] Individual service price list and add-ons (hidden until supplied).

## Legal

- [ ] Review the drafted Privacy, Terms, Cookies, SMS terms and Accessibility pages with your lawyer, or send your own text. Add your business name and address as registered.

## Accounts and tracking

- [ ] Social profile links (only accounts that exist). Social icons are hidden.
- [ ] GA4 measurement ID, Meta Pixel ID, Microsoft Clarity ID. The cookie banner only appears once at least one is set.
- [ ] Chat agent widget script URL (`NEXT_PUBLIC_CHAT_WIDGET_SRC`) for the Demo Lab (button hidden).

## Later pages

- [ ] Real estate industry page (menu link hidden until the page exists).
