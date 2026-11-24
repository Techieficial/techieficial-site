# Techieficial: CRM setup values for the website build

> Set up on Nov 24, 2026. Save this file in the website project as `docs/CRM_SETUP.md`. Where it conflicts with `CLAUDE.md`, this file wins.
> Webhook URLs are server-only secrets and are deliberately NOT written in this file (the repo is public): put them in Cloudflare secrets / `.env.local`, never in client code or the repo.

---

## 1. Environment values

| Variable | Value |
|---|---|
| `CRM_WEBHOOK_URL` (all site forms) | Stored as a Cloudflare secret (not in the repo) |
| `CRM_CALLME_WEBHOOK_URL` (Demo Lab "Call me") | Stored as a Cloudflare secret (not in the repo) |
| `NEXT_PUBLIC_CALENDAR_URL` (Strategy Call, 30 min) | `https://api.leadconnectorhq.com/widget/booking/vanlKYhT08mnXvYIySry` |
| `NEXT_PUBLIC_TESTBUILD_CALENDAR_URL` (Test Build Session, 45 min, Demo Lab tab 4) | `https://api.leadconnectorhq.com/widget/booking/lLQv2kiaIh5gGxwypAky` |
| Business email (site, footer, schema) | hello@techieficial.com |
| Support email | support@techieficial.com |
| `NEXT_PUBLIC_DEMO_PHONE` | Not yet. Owner is buying a US number. Keep demo-phone sections hidden. |
| Turnstile, GA4, Meta Pixel, Clarity, chat widget | Not yet. Keep listed in `content/_missing.md`. |

## 2. Social links

| Network | URL |
|---|---|
| YouTube | https://www.youtube.com/@techieficial |
| Facebook | https://www.facebook.com/techieficial/ |
| TikTok | https://www.tiktok.com/@techieficial |
| Instagram | https://www.instagram.com/techieficial |
| LinkedIn | Not yet (custom URL being set). Hide. |
| X | Not yet. Hide. |

## 3. Webhook payload (both webhooks)

Send flat key/value fields (JSON or form-encoded). The CRM workflow maps these exact keys:

- **Contact:** `first_name`, `last_name`, `email`, `phone`, `company_name`
- **Routing:** `source` (which form, e.g. `contact-form`, `newsletter`, `demo-callme`, `audit`, `calculator`) and `tag` (one of: `booked-call`, `contact-form`, `demo-callme`, `test-build`, `newsletter`, `academy-waitlist`, `agency-partner`, `engine-builder`, `audit`, `calculator`)
- **Answers:** `business_type`, `business_size`, `main_goal`, `budget_range`, `message`, `product_interest`, `selected_services`, `sms_consent` (`true`/`false`)
- **Tracking:** `page_url`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`

What the CRM does with it: creates or updates the contact, sets Contact source to "Website: {source}", adds the `tag` value as a tag, and saves all answers as a note on the contact.

## 4. Payment links (checkout runs in the CRM)

Only products under $3,000 get direct checkout. $3,000+ offers go to the Demo Lab first, then "Book a strategy call" (no payment link).

| Product | Price (draft, owner confirming) | Payment link |
|---|---|---|
| AI Receptionist Playbook | $97 one-time | `https://link.fastpaydirect.com/payment-link/6b05ae96906a8b62055d945e` |
| Missed-Call Text-Back Setup | $297 one-time | `https://link.fastpaydirect.com/payment-link/6b05aec4906a8b62055d9461` |
| CRM Workspace | $197/mo | `https://link.fastpaydirect.com/payment-link/6b05aee6906a8b62055d9462` |
| AI Receptionist Starter | $1,497 setup + $497/mo | `https://link.fastpaydirect.com/payment-link/6b05af0a21a48a3872d28e4b` |
| AI Front Office (core offer) | $3,500 setup + $1,297/mo, 3-month minimum | Book a call (no link) |
| AI Growth Team (premium) | $7,500+ setup + $2,500+/mo plus ad spend | Book a call (no link) |

- Payment links return "No payment provider found" until the owner connects PayPal Business. Keep "Buy" buttons behind a `site.config.ts` flag (`checkoutLive: false`) until he confirms a test payment.
- These products **replace the Capture / Convert / Dominate packages in CLAUDE.md.** Show "Phone, SMS and email usage billed at cost" next to every monthly price.

## 5. Email sending

- CRM sending domain: `mg.techieficial.com` (verified Nov 24, 2026; warm-up stage 1). Default sender: Techieficial <hello@techieficial.com>.
- Mailboxes (admin@, hello@, support@) are hosted at Hostinger. DNS lives in **Cloudflare**, not Hostinger. Do not touch MX, SPF, DKIM or DMARC records for the root domain.

## 6. Owner to-do (blocks parts of the site)

1. Connect PayPal Business in the CRM (Stripe does not accept Philippine businesses), then test the Starter link (setup fee + subscription).
2. Connect Google Calendar or Zoom to the Strategy Call calendar; widen booking hours to overlap US/UK/AU/NZ (currently Mon to Fri, 8am to 5pm Manila).
3. Confirm or change the draft prices above.
4. Buy a US local number, build the voice AI demo line, then register for US texting (A2P 10DLC) before any SMS goes out.
5. Delete the test contact "Setup Test" in the CRM.
