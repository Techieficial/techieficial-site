# Techieficial Website v3: Full 17-Phase Build Plan

Nov 25, 2026 · Iyanda Abdulmujeeb

## Fast-track execution plan

Running 5 workers in parallel cuts the build from 7 weeks to 3 sprints, with launch on **Wednesday, December 16, 2026**. The phases and quality bar below stay the same; only the order and the workers change.

**Who does what:**

| Worker | Best at | Limits |
| --- | --- | --- |
| **Claude Code** (2 sessions in parallel) | All code, tests, CI, schemas, docs in the repo | Runs only when you start it; cannot sign up for accounts |
| **Claude chat** (this project) | Research, strategy docs, copy, case studies, prompts, reviews; CRM and account setup in your browser with your OK | Cannot touch the repo or run Claude Code |
| **Claude desktop agent** | Files and apps on your computer: gathering screenshots, exports, organizing assets | Websites go through the browser, not this agent |
| **ChatGPT Plus** | Logo and image generation, second-opinion reviews | Do not give it secrets or webhook URLs |
| **You** | Decisions, approvals, purchases, sign-ins, client asks, recordings | The critical path: your tasks set the launch date |

**Two Claude Code sessions at once:** open a second terminal and run `git worktree add ../techieficial-b v3/session-b`, then start Claude Code in that folder. Session A owns site code; session B owns new tools, CMS and backend. They never edit the same files.

### Start today (no prerequisites)

- [ ] **You:** buy the US phone number and start A2P 10DLC (longest wait, outside our control)
- [ ] **You:** paste the kickoff prompt into Claude Code session A
- [ ] **ChatGPT:** generate logo concepts from the logo prompt
- [ ] **Claude chat:** start Phase 1 strategy docs
- [ ] **Desktop agent:** gather case study evidence into one folder

### Sprint 1: Foundations (Nov 25 to Dec 1)

| ID | Task | Worker | Needs first |
| --- | --- | --- | --- |
| A1 | Repo audit against all 17 phases | Claude Code A | Nothing |
| A2 | Design tokens + Storybook with current components (logo swapped in later) | Claude Code A | A1 |
| A3 | Quality gates + GitHub Actions: Vitest, Playwright, axe, Lighthouse CI, link check, secret scan | Claude Code A | A1 |
| A4 | Cookie consent + GTM, GA4, Clarity, Meta Pixel code, switched off until IDs arrive | Claude Code A | A3 |
| A5 | SEO pass: Service, Breadcrumb, Article schema, llms.txt, alt text and internal links | Claude Code A | A3 |
| A6 | Performance budget, image pipeline, CSP review, rate limits | Claude Code A | A3 |
| B1 | Assessment page and ROI calculator | Claude Code B | T2 |
| B2 | Sanity schemas and Studio, local first | Claude Code B | A1 |
| B3 | Supabase schema and NestJS API skeleton, local first | Claude Code B | A1 |
| T1 | Phase 1 docs: BRD, personas, competitor research, journeys, PRD (done: docs/STRATEGY_PACK.md) | Claude chat | Nothing |
| T2 | Phase 2: sitemap, keyword map, new page copy, assessment questions, ROI logic | Claude chat | T1 approved |
| T3 | Project stories from Loom walkthroughs and stated facts (no client quotes) (done: docs/PROOF_PACK.md) | Claude chat | Nothing |
| T4 | Founding-client offer: 3 discounted builds in exchange for a testimonial and case study (done: docs/PROOF_PACK.md) | Claude chat | Nothing |
| T5 | Check prices for Supabase, Upstash, API host, Figma (done: cost table below) | Claude chat | Nothing |
| G1 | Logo concepts | ChatGPT | Nothing |
| G2 | Critique of T1 and T2 as a skeptical buyer | ChatGPT | T1 |
| D1 | Collect screenshots, Loom links, before and after numbers per client into one folder | Desktop agent | Nothing |
| M1 | Pick the final logo | You | G1 |
| M2 | Buy US number, start voice AI demo agent and A2P 10DLC | You | Nothing |
| M3 | Create accounts: Sanity, Supabase, Upstash, Sentry, Turnstile, GTM/GA4, Clarity, Meta pixel | You | Nothing |
| M4 | Connect PayPal Business in the CRM, run a test payment | You | Nothing |
| M5 | Approve the founding-client offer (optional: ask 1 or 2 past clients) | You | T4 |
| M6 | Approve T1 and T2 | You | T1, T2 |

### Sprint 2: Build (Dec 2 to Dec 8)

| ID | Task | Worker | Needs first |
| --- | --- | --- | --- |
| A7 | Build approved pages, Three.js hero, automation simulator, new pages | Claude Code A | M6, A2 |
| A8 | Plug in analytics IDs, Conversions API, all conversion events | Claude Code A | M3, A4 |
| B4 | Supabase, NestJS API and Redis live; rate limits; API docs | Claude Code B | M3, B3 |
| B5 | Move content into Sanity, roles, workflow, audit log | Claude Code B | M3, B2 |
| B6 | Client portal and AI assistant wiring | Claude Code B | B4, T6 |
| T6 | Build the CRM chat agent and its knowledge base | Claude chat | Owner OK, M6 |
| T7 | 4 blog posts, 3 video scripts, CMS guide draft | Claude chat | T2 |
| T8 | Review each staging preview against "Done when" | Claude chat | Previews |
| G3 | OG images, section illustrations in brand colors | ChatGPT | M1 |
| D2 | Export logo sizes, compress and name video files | Desktop agent | M1, M7 |
| M7 | Record 3 Demo Lab walkthrough videos | You | T7 |
| M8 | Make the voice demo line live | You | M2 |
| M9 | Approve previews | You | A7 |

### Sprint 3: Harden and launch (Dec 9 to Dec 16)

| ID | Task | Worker | Needs first |
| --- | --- | --- | --- |
| A9 | Phases 8 to 11 final pass: performance, security, SEO, CRO and A/B tests | Claude Code A | A7 |
| A10 | Phase 14 full test run: e2e, visual, BrowserStack, k6, OWASP ZAP | Claude Code A | A9, BrowserStack trial |
| A11 | Phase 15: staging, practice release and rollback | Claude Code A | A10 |
| B7 | Phase 16 docs and VA guide | Claude Code B | B5, B6 |
| T9 | Final copy proof, acceptance checklist review, launch-day runbook | Claude chat | A10 |
| M10 | Verify Google Search Console and Bing (DNS records in Cloudflare) | You | Nothing |
| M11 | UAT on phone and laptop, sign the checklist | You | A11 |
| M12 | Launch go-ahead, Dec 16 | You | M11 |

**After launch:** SMS features switch on when A2P 10DLC is approved; Phase 17 cadence starts; publish 2 posts a week.

**Watch out:** if the phone number or A2P approval runs late, the site still launches. The Demo Lab shows the recorded walkthroughs until the live line works.

**Deadline:** decide the CRM paid plan before the trial ends around Dec 24.

## How to use this plan

This plan takes techieficial.com from the current v2 site to the full 17-phase world-class standard in 3 sprints, with launch on **Wednesday, December 16, 2026 (fast track, see above)**. Claude Code does the building; the owner approves, supplies facts and does the account steps it cannot do.

**Where we start (live audit, Nov 25, 2026):** Next.js on Cloudflare Workers, multi-page site, all 6 security headers, robots.txt, sitemap, canonical tags, Open Graph, FAQ/Organization/WebSite schema. Missing: analytics and pixels, live demo phone number, case studies, testimonials, logo, CMS, chat assistant, test suite proof, monitoring.

**How Claude Code runs it:**

1. This file lives at `docs/BUILD_PLAN_V3.md`. Supporting docs: `docs/STRATEGY_PACK.md` (BRD, personas, competitors, journeys, PRD) and `docs/PROOF_PACK.md` (project stories, founding-client offer).
2. Keep `CLAUDE.md` (the v2 build brief) and `docs/CRM_SETUP.md` in place. Follow this plan. Where it conflicts with the brief, the plan wins, except for the CRM values in `docs/CRM_SETUP.md`.
3. Start each phase with the phase prompt in the last section. Claude Code works on a branch `v3/phase-N`, runs the quality gates, deploys a preview and reports back.
4. The owner checks the preview and replies "approved" before it merges. Nothing reaches techieficial.com without the owner's go-ahead.

**Rules that carry over from v2:** no placeholders in production, no invented facts or testimonials, no em-dashes in site copy, say "CRM" never the vendor name, secrets only in environment variables, ask before anything that cannot be undone.

**Stack decisions for v3:**

| Layer | Choice | Why |
| --- | --- | --- |
| Hosting | Keep Cloudflare Workers (OpenNext) | Already live, already behind Cloudflare security; switching hosts adds risk with no gain |
| Design | Figma (free plan) or the Design canvas for mockups, Storybook for the component library | Owner reviews designs visually before code |
| Frontend | Next.js + TypeScript + Tailwind + Motion + GSAP + Three.js | The full standard stack |
| CMS | Sanity (Free plan to start) | Edit pages, blog, case studies without code |
| Database and auth | Supabase (Postgres + Auth) | Client portal, leads log, audit logs |
| Backend API | NestJS service for the client portal and AI assistant | Phase 6 of the standard |
| Cache and rate limits | Redis (Upstash) | Rate limits, sessions, caching |
| Payments | CRM payment links via PayPal | Stripe does not accept Philippine businesses |
| Testing | Vitest, Playwright, axe, Lighthouse CI, BrowserStack, k6 | Phase 14 of the standard |
| Monitoring | Sentry + uptime monitor | Phase 13 and 15 |

## Timeline

Original one-worker schedule, kept for reference. The fast-track plan above replaces it.

| Week | Starts | Phases |
| --- | --- | --- |
| 1 | Nov 26 | 1 Discovery, 2 Information architecture, 3 Brand and design system |
| 2 | Dec 3 | 3 (finish), 4 UI/UX design, 5 Frontend (start) |
| 3 | Dec 10 | 5 Frontend (finish), 6 Backend |
| 4 | Dec 17 | 7 CMS, 12 AI and automation, 13 Analytics |
| 5 | Dec 24 | 8 Performance, 9 Security, 10 SEO and AI search, 11 Conversion |
| 6 | Dec 31 | 14 Testing and QA, 15 DevOps (start) |
| 7 | Jan 7 | 15 DevOps (finish), 16 Docs and handover; launch Jan 13; 17 starts at launch |

Phases 12 and 13 move ahead of 8 to 11 because tracking and the AI assistant must exist before speed, security and conversion are measured. Each week ends with a staging preview the owner approves. If an owner task slips (logo, phone number, case study data), only the phases that need it slip.

**Watch out:** the holiday weeks cover Christmas and New Year. Plan approvals and the A2P 10DLC and phone number steps before December 20. The CRM trial also ends around December 24.

## Phases 1 to 4: Strategy, structure, design

These four phases produce the documents and designs every later phase builds from. No production code changes here.

### Phase 1: Discovery, research and strategy (Week 1)

**Status:** drafted in `docs/STRATEGY_PACK.md`, awaiting owner approval.

**Deliverables** (in `docs/strategy/` if split out):

- `BRD.md`: business goals, revenue targets, success metrics (booked calls, demo tests, low-ticket sales, signups)
- `PERSONAS.md`: buyer personas, each with pains, objections and buying triggers
- `COMPETITORS.md`: competing AI agencies and AI receptionist sellers in US, UK, AU, NZ, with what they do well and gaps to exploit (sources linked)
- `USER_JOURNEYS.md`: first visit to paying client, per persona
- `PRD.md`: every feature on the site, with acceptance criteria

**Done when:** the owner has read and approved all 5.

**Owner does:** answer the open questions (target revenue, client capacity per month, which niche leads).

### Phase 2: Information architecture (Week 1)

**Claude Code builds:**

- `docs/strategy/SITEMAP.md`: every page with its purpose, audience, primary CTA, SEO keyword and conversion goal
- Navigation and footer map, internal linking map, URL and redirect plan (keep every live URL working)
- New pages to add: `/case-studies` (and `/case-studies/[slug]`), `/integrations`, `/resources`, `/portal`, `/tools/roi-calculator`, `/assessment`, `/founding`, real estate and gym industry pages

**Done when:** the owner approves the sitemap and no page lacks a purpose and CTA.

### Phase 3: Brand identity and design system (Week 1 to 2)

**Claude Code builds:**

- Design tokens file (colors, type scale, spacing, radius, shadows, motion timings) from the v2 tokens, plus light-mode values
- `docs/design/BRAND_GUIDE.md`: voice, photo and video rules, icon set, accessibility contrast table
- Storybook set up with every core component: buttons, forms with validation states, cards, navigation, menus, modals, tabs, accordions, pricing cards, testimonial cards, case study cards
- Each component documented with variants, states and accessibility notes

**Done when:** Storybook runs on a preview link and every component passes axe checks.

**Owner does:** deliver the final logo (SVG, mark and favicon). This blocks Phase 4 sign-off.

### Phase 4: World-class UI/UX design (Week 2)

**Claude Code builds:**

- High-fidelity mockups for Home, Service, Industry, Demo Lab, Pricing, Case Study, Portal login and Blog post, at mobile, tablet, laptop, desktop and ultrawide widths
- Interactive prototype of the main journey: Home, Demo Lab, Book a call
- The 3D hero concept: the services wheel rebuilt in Three.js with the SVG wheel as fallback on low-power devices

**Done when:** the owner approves each mockup in writing. Code starts only on approved screens.

## Phases 5 to 7: Frontend, backend, CMS

This is the main build: code across the site, a backend for the portal and AI assistant, and a CMS so the owner never needs a developer to edit content.

### Phase 5: Advanced frontend development (Weeks 2 to 3)

**Claude Code builds:**

- Every approved screen from Phase 4, using only Storybook components
- Three.js hero wheel, loaded after the headline so it never slows the first paint; SVG fallback for reduced motion and slow devices
- GSAP scroll storytelling on the "follow one lead" homepage section; Motion for micro-interactions
- Bento grid for services, interactive automation simulator (a lead moves through Receptionist, Lead Responder, Follow-up, Reviews), ROI calculator, live dashboard preview
- New pages from Phase 2, case study library (shows only real case studies; hidden until data exists)
- Every animation respects `prefers-reduced-motion`

**Done when:** all pages match the approved mockups at 5 screen widths and the quality gates pass.

### Phase 6: Enterprise backend (Week 3)

**Claude Code builds:**

- Supabase project: Postgres tables for leads log, portal users, client projects, audit logs; row-level security on every table
- NestJS API service: client portal endpoints, AI assistant endpoints, lead logging, CRM sync; OpenAPI docs generated automatically
- Redis (Upstash): rate limits on every form and API, session cache
- Input validation (zod on the site, class-validator in NestJS), structured error handling, request logging
- `docs/architecture/ARCHITECTURE.md` with a system diagram, database schema and API reference

**Done when:** API tests pass, every endpoint is documented and rate-limited, and no secret appears in the repo.

**Owner does:** create the Supabase, Upstash and API hosting accounts (Claude Code lists exactly which, with sign-up steps). Use admin@techieficial.com for all of them.

### Phase 7: Content management system (Week 4)

**Claude Code builds:**

- Sanity Studio at `/studio` with content types: pages, services, industries, offers, blog posts, case studies, testimonials, FAQs, media, SEO fields per page
- Roles: Admin (owner), Editor, Contributor (draft only)
- Publishing workflow: draft, review, approve, publish, with scheduled publishing for blog posts
- Live preview, version history, audit log of every change
- Leads view: website leads listed from the Supabase log, linked to the CRM contact
- Move all copy from `content/` files into Sanity without changing any live text
- `docs/CMS_GUIDE.md`: how to edit each page type, with screenshots

**Done when:** the owner edits a blog post, previews it and publishes it without Claude Code.

**Owner does:** turn on two-factor login for Sanity, Supabase, GitHub and Cloudflare.

## Phases 8 to 10: Performance, security, SEO

These phases are measured with hard numbers, so "done" is never a matter of opinion.

### Phase 8: Performance engineering (Week 5)

**Targets (mobile):**

| Metric | Target |
| --- | --- |
| Lighthouse Performance, Accessibility, Best Practices, SEO | 95+ each, on Home, a service page, Demo Lab, Pricing, a case study |
| Largest Contentful Paint | 2.5s or less |
| Interaction to Next Paint | 200ms or less |
| Cumulative Layout Shift | 0.1 or less |
| JavaScript per page | Budget set in Phase 8; the build fails if a page goes over |

**Claude Code builds:** AVIF/WebP images, lazy loading, code splitting, Three.js and GSAP loaded only where used, font subsetting, Cloudflare caching rules, Lighthouse CI with these thresholds in the pipeline.

**Done when:** Lighthouse CI passes on all 5 pages. Real-user Core Web Vitals are checked again 28 days after launch.

### Phase 9: Enterprise-grade security (Week 5)

**Claude Code builds:**

- Review of the existing headers (HSTS, CSP, frame, content-type, referrer, permissions); CSP tightened to only the domains in use
- Cloudflare WAF rules, bot protection, DDoS settings, rate limiting on `/api/*`
- Turnstile on every form; honeypot fields; server-side validation
- SQL injection, XSS and CSRF protection checks on the NestJS API and Supabase policies
- Role-based access and two-factor login for the CMS and portal
- Secrets in Cloudflare and the API host only; GitHub secret scanning and Dependabot on
- Daily automated backups of Supabase and Sanity, with one test restore
- OWASP Top 10 checklist in `docs/security/SECURITY_REPORT.md`, plus an OWASP ZAP scan of the staging site

**Done when:** the ZAP scan has no high or medium findings, and a backup restore works.

### Phase 10: SEO and AI search optimization (Week 5)

**Claude Code builds:**

- Keyword map per page from Phase 2; titles, descriptions, headings checked against it
- Schema: Service on each service page, Article on posts, BreadcrumbList on inner pages, LocalBusiness or ProfessionalService where it fits, Review only with real reviews
- `llms.txt` updated; every service and industry page gets a short "answer first" summary and FAQ for AI search (AEO/GEO)
- Image alt text audit, internal link audit, broken link check
- Author pages and an About page that shows real experience (13+ client builds, countries served) for E-E-A-T
- Content plan: 2 posts a week for 12 weeks, written as drafts for owner review

**Done when:** every page passes Google's Rich Results test and has a unique title, description and keyword.

**Owner does:** verify the site in Google Search Console and Bing Webmaster Tools, then submit the sitemap. Claude Code gives the DNS record to add in Cloudflare.

**No one can guarantee rankings or citations in AI answers.** These steps give the site its best chance.

## Phases 11 to 13: Conversion, AI and automation, analytics

These phases make the site sell. Tracking goes in first (Phase 13 starts in Week 4) so every later test has data.

### Phase 11: Conversion rate optimization (Week 5)

**Claude Code builds:**

- CTA review per page against the sitemap goals; sticky mobile CTA bar
- Free business automation assessment (`/assessment`): 8 questions, scored result, tailored service recommendation, then booking. Results post to the CRM with tag `engine-builder`
- Proof blocks: project stories, case study cards, client countries, "We run on it" section (only real data; hidden until supplied)
- Exit-intent offer (lead magnet: AI Receptionist Playbook) on desktop only
- A/B testing set up with Cloudflare or GrowthBook (free, open source) on 2 tests: homepage headline and Demo Lab CTA

**Done when:** both A/B tests run on staging and each conversion event fires once per action.

### Phase 12: AI and business automation (Week 4)

**Claude Code builds:**

- AI website assistant: answers from Techieficial's own content (services, pricing, FAQ), qualifies visitors with 3 questions, books a call or hands off to a human. Runs on the CRM chat agent or the NestJS API with an LLM; logs every chat to the CRM
- Smart service recommendation: picks an offer from the assessment answers
- Demo Lab live: "Call the AI Receptionist" number, "Call me" outbound flow, "What just happened" panel showing the CRM steps
- Client portal (`/portal`): login, project status from the TF Client Delivery pipeline, files, support tickets into TF Support Tickets
- Safeguards: AI never quotes prices that are not in the content, always offers a human, never stores card details, shows a privacy notice

**Done when:** a test lead goes from chat to booked call to CRM opportunity with no manual step.

**Owner does:** buy the US phone number, build the voice AI demo agent in the CRM, and finish A2P 10DLC registration before any SMS goes out.

### Phase 13: Analytics and business intelligence (Week 4)

**Claude Code builds:**

- Google Tag Manager with Consent Mode v2 (denied by default until the visitor accepts)
- GA4, Microsoft Clarity, Meta Pixel plus Conversions API (server-side, from the NestJS API)
- Events: `book_call`, `demo_call_started`, `callme_submit`, `form_submit`, `assessment_complete`, `chat_started`, `chat_qualified`, `newsletter_signup`, `purchase`
- Google Search Console linked to GA4
- Sentry error monitoring on the site and API; uptime monitoring every minute with alerts to admin@techieficial.com
- Weekly report dashboard: traffic, leads by source, conversion rate per page, booked calls, revenue from CRM

**Done when:** each event shows in GA4 DebugView and Meta Events Manager, and Clarity records a test session.

**Owner does:** create the GA4, GTM, Clarity and Meta business assets and send Claude Code the IDs.

## Phases 14 to 17: Testing, DevOps, documentation, continuous improvement

A critical defect found in Phase 14 blocks launch. The launch date moves; the quality bar does not.

### Phase 14: Testing and quality assurance (Week 6)

| Test | Tool | Pass bar |
| --- | --- | --- |
| Unit | Vitest | Every utility, calculator and form validator covered |
| Integration | Vitest + Supertest | Site to API to Supabase to CRM webhook, with mocks |
| End-to-end | Playwright | 10 journeys: book call, call me, assessment, chat to booking, purchase link, newsletter, waitlist, portal login, support ticket, 404 |
| Visual regression | Playwright screenshots (or Percy) | No unapproved change on any page |
| Responsive and cross-browser | BrowserStack | Chrome, Safari, Firefox, Edge; iPhone, Android, iPad |
| Accessibility | axe + manual keyboard and screen reader pass | WCAG 2.2 AA, zero serious issues |
| Performance | Lighthouse CI | Phase 8 targets |
| Load | k6 | 500 visitors at once on the site, 50 at once on forms and API, no errors |
| Security | OWASP ZAP | No high or medium findings |
| SEO | Crawl + Rich Results | No broken links, every page indexable |
| Automation | Real test leads | Every form and tag reaches the right CRM pipeline stage |
| User acceptance | Owner, on phone and laptop | Owner sign-off on the owner checklist |
| Recovery | Backup restore drill | Site and data restored from backup on staging |

**Done when:** every row passes and the owner signs the owner checklist.

### Phase 15: DevOps and deployment (Weeks 6 to 7)

**Claude Code builds:**

- 3 environments: local, staging (`staging.techieficial.com`, password-protected, no-index) and production
- GitHub Actions: on every push run types, lint, unit, e2e, axe, Lighthouse, link check, secret scan; block merge on any failure
- Branch protection on `main`; every change through a pull request the owner approves
- One-click rollback to the previous release on Cloudflare; release notes per deploy
- Launch day plan: deploy at a low-traffic hour for US time zones, watch Sentry and uptime for 2 hours, rollback trigger list

**Done when:** a practice release and a practice rollback both work on staging.

### Phase 16: Documentation and handover (Week 7)

**Claude Code delivers** in `docs/`:

- Architecture, database schema, API reference
- Design system (Storybook link) and brand guide
- CMS guide with screenshots
- Deployment, environment variables and rollback guide
- Integrations guide: CRM webhooks, calendars, payment links, chat agent, analytics IDs
- Security, testing and backup reports
- VA training guide: how a VA edits content, checks leads and reports issues
- Roadmap for the next 6 months

**Done when:** a VA can follow the CMS guide and publish a post without help.

### Phase 17: Continuous improvement (from launch, ongoing)

| When | Who | What |
| --- | --- | --- |
| Daily | Automated | Uptime and error alerts |
| Weekly | Owner (15 min) | Leads, booked calls, conversion rate, errors |
| Monthly | Claude Code session | SEO, content, performance review; 2 new A/B tests |
| Quarterly | Claude Code session | Security, accessibility and UX audit; dependency upgrades |
| Every 6 months | Owner + Claude Code | Strategy and architecture review |
| Yearly | Owner | Tool and hosting cost review |

## Owner tasks and tool costs

The owner's tasks are the real critical path: Claude Code can build everything else, but it cannot buy a phone number, sign up for accounts in the owner's name or supply real client results.

**Owner tasks, in the order they block work:**

- [ ] Approve strategy docs (Phase 1) and sitemap (Phase 2)
- [ ] Deliver final logo SVG, mark and favicon
- [ ] Confirm which past clients can be named in project stories (see docs/PROOF_PACK.md)
- [ ] Approve mockups (Phase 4)
- [ ] Create Supabase, Upstash and API hosting accounts; turn on two-factor everywhere
- [ ] Buy the US phone number, build the voice AI demo agent, start A2P 10DLC
- [ ] Create GA4, GTM, Clarity, Meta business assets; send the IDs
- [ ] Connect PayPal Business in the CRM and run one test payment
- [ ] Record 3 walkthrough videos for the Demo Lab
- [ ] Verify Google Search Console and Bing Webmaster Tools
- [ ] Run the owner checklist on phone and laptop; sign off UAT
- [ ] Give the launch go-ahead

**Monthly tool costs (prices checked Nov 25 to 26, 2026):**

| Tool | Use | Paid price | Free route |
| --- | --- | --- | --- |
| Cloudflare | Hosting, WAF, DNS | Already in use; paid tiers not checked | Current setup |
| [Sanity](https://www.sanity.io/pricing) | CMS | $15 per seat per month (Growth) | Free plan, up to 20 seats |
| [BrowserStack](https://www.browserstack.com/pricing) | Device and browser testing | $29 per month Live Desktop, billed annually | Free trial during testing week |
| [Sentry](https://sentry.io/pricing/) | Error monitoring | $26 per month annual, $29 monthly (Team) | Developer plan, 5,000 errors a month, 1 user |
| [Supabase](https://supabase.com/pricing) | Database and auth | Pro $25/mo per organization (needed for the live portal: no pausing, daily backups) | Free plan for building; free projects pause after 1 week idle, so switch to Pro before launch |
| [Upstash Redis](https://upstash.com/pricing/redis) | Rate limits, cache | Pay-as-you-go $0.20 per 100K commands | Free: 500K commands/month, 256 MB (enough at launch) |
| NestJS API host ([Railway](https://railway.com/pricing), Render or Fly.io) | Backend API | Railway Hobby $5/mo (includes $5 usage); Render Starter $7/mo per always-on service | Render free sleeps after 15 min idle (too slow for the chat assistant); Railway Hobby recommended |
| [Figma](https://www.figma.com/pricing/) | Mockups | Professional $16 per Full seat per month, billed annually | Starter free (3 design files), or the Design canvas |
| GA4, GTM, Search Console, Clarity, Playwright, Vitest, axe, Lighthouse, Storybook, k6, OWASP ZAP, GrowthBook | Analytics and testing | Free | Free |

**Estimate:** about $30 a month at launch on free tiers where possible (Supabase Pro $25 + Railway Hobby $5), about $100 to $140 a month with Sanity Growth, BrowserStack, Sentry Team and Figma Professional added. Cloudflare paid tiers are still unchecked.

## Final acceptance checklist and Claude Code prompts

Launch happens only when all 26 items are ticked.

**Research and strategy**

- [ ] Business and competitor research completed
- [ ] Website requirements approved
- [ ] Information architecture approved

**Design and branding**

- [ ] Brand identity and design system completed
- [ ] High-fidelity UI/UX approved
- [ ] Responsive designs completed
- [ ] Interactive prototypes approved

**Development**

- [ ] Frontend development completed
- [ ] Backend and database implemented
- [ ] CMS and administrative access configured
- [ ] API integrations completed
- [ ] AI features and automation implemented

**Optimization and security**

- [ ] Performance targets validated
- [ ] Technical SEO implemented
- [ ] Security testing passed
- [ ] Accessibility testing passed
- [ ] Conversion tracking verified

**Testing and deployment**

- [ ] Cross-device and browser testing passed
- [ ] End-to-end customer journeys tested
- [ ] Human QA and acceptance testing passed
- [ ] Production deployment completed
- [ ] Backups and rollback tested

**Handover and maintenance**

- [ ] Technical documentation completed
- [ ] Administrative training completed
- [ ] Monitoring configured
- [ ] Maintenance plan established

### Kickoff prompt (paste into Claude Code once)

```
Read CLAUDE.md, docs/CRM_SETUP.md and docs/BUILD_PLAN_V3.md fully.
We are taking techieficial.com to the full 17-phase standard in BUILD_PLAN_V3.md.
Do not write code yet. First: inspect the repo and report what exists for each
of the 17 phases (done, partial, missing), list every account or fact you need
from me with the week it blocks, and propose the Phase 1 task list.
Wait for my OK.
```

### Phase prompt (paste at the start of each phase, change N)

```
Start Phase N from docs/BUILD_PLAN_V3.md on branch v3/phase-N.
Work in small steps. After each step run the quality gates, commit, and tell me
in 2 to 4 plain sentences what changed. At the end of the phase: deploy a
staging preview, check every "Done when" item, and report Done / Check /
Need from you / Next. Do not merge to main until I reply "approved".
```

### Fix prompt (when something is wrong)

```
On the staging preview, [describe what you see, page and device].
Find the cause, fix it, add a test so it cannot come back, run the quality
gates and show me the preview again.
```
