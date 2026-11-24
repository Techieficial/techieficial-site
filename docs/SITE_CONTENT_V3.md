# Techieficial Website v3: Structure, Content and Build Prompt

**Prepared:** Nov 25, 2026. **Status:** draft for owner review.

**How to use this doc:** Part 1 is the plan. Part 2 is the copy for every page, ready to paste into the site. Part 3 is what only you can supply. Part 4 is the build prompt for your coding assistant. Anything in \[BRACKETS\] is a fact you must confirm or supply; the site must hide that section until it is filled.

**Assumptions (change them and the copy follows):**

- Launch niche: **home services and trades** (HVAC, plumbing, electrical, roofing, cleaning). Dental/med spa and legal pages stay as secondary industries.
- Prices are the drafts we agreed on and are marked DRAFT. Change them in one place: the pricing file.
- All site copy says "CRM", never the platform name.

# Part 1. The plan

## 1.1 What we agreed

- **Concept:** a blend of three ideas. "Hire Your AI Team" is the brand (AI employees shown as staff with roles and skills). "We Run On It" is the proof (Techieficial runs on the same systems it sells). "Follow One Lead" is the homepage story (one lead's journey from call to booked job to review).
- **Main offer:** the AI Front Office, a high-ticket done-for-you package of 4 AI employees. Everything else is a lower-priced entry point, add-on or downsell.
- **Buying path:** products of \$3,000 and up go to the Demo Lab, then "Book a strategy call". Products under \$3,000 have direct checkout through CRM payment links. No countdown timers.
- **Every product gets its own page:** what it is, how it works, how it helps, what is included, price, FAQ. Optional discount price and limited-time offer slots (no timers).
- **Hero wheel:** keep it and upgrade it. Its segments become the AI team.
- **Usage:** phone, SMS and email usage is billed at cost and says so next to every monthly price.

## 1.2 Sitemap

|                                                                                            |                                             |                                             |
|--------------------------------------------------------------------------------------------|---------------------------------------------|---------------------------------------------|
| **URL**                                                                                    | **Page**                                    | **Notes**                                   |
| /                                                                                          | Home                                        | Follow One Lead story                       |
| /ai-team                                                                                   | Meet the AI Team                            | Replaces /services/ai-agents (301 redirect) |
| /ai-team/receptionist                                                                      | AI Receptionist profile                     |                                             |
| /ai-team/lead-responder                                                                    | AI Lead Responder profile                   |                                             |
| /ai-team/follow-up-agent                                                                   | AI Follow-up and Reactivation Agent profile |                                             |
| /ai-team/reviews-agent                                                                     | AI Reviews Agent profile                    |                                             |
| /offers                                                                                    | Offers and pricing ("Build your team")      | Replaces /pricing (301 redirect)            |
| /offers/ai-front-office                                                                    | AI Front Office (core)                      | Demo, then call                             |
| /offers/ai-growth-team                                                                     | AI Growth Team (premium)                    | Demo, then call                             |
| /offers/ai-receptionist-starter                                                            | AI Receptionist Starter                     | Direct checkout                             |
| /offers/crm-workspace                                                                      | CRM Workspace                               | Direct checkout                             |
| /offers/missed-call-text-back                                                              | Missed-Call Text-Back Setup                 | Direct checkout                             |
| /offers/ai-receptionist-playbook                                                           | AI Receptionist Playbook                    | Direct checkout                             |
| /demo                                                                                      | Demo Lab ("Interview your AI team")         |                                             |
| /inside                                                                                    | Inside Techieficial ("We run on it")        | New                                         |
| /tools/missed-call-calculator                                                              | Missed-call revenue calculator              | Free lead magnet                            |
| /audit                                                                                     | Free 15-minute lead-leak audit              | Free lead magnet                            |
| /services                                                                                  | More services (add-ons)                     | Ads, AI video, CRM automation, training     |
| /services/paid-ads, /services/ai-video, /services/marketing-automation, /services/training | Service pages                               | Keep, reframed as add-ons                   |
| /industries/home-services                                                                  | Home services and trades                    | Lead industry                               |
| /industries/dental-medspa, /industries/legal                                               | Secondary industries                        | Keep                                        |
| /agencies                                                                                  | White-label for agencies                    | Keep                                        |
| /academy                                                                                   | Academy ("Train your humans")               | Waitlist                                    |
| /work, /work/\[slug\]                                                                      | Case studies                                | Hidden until 1 real case study              |
| /about, /contact, /faq, /blog, /blog/\[slug\]                                              | Company pages                               |                                             |
| /privacy, /terms, /cookies, /sms-terms, /accessibility                                     | Legal                                       | Existing drafts                             |
| /thank-you, /thank-you/purchase, /thank-you/audit                                          | Confirmation pages                          | noindex                                     |

## 1.3 Global elements

### Navigation

- Logo (left).
- Center: **AI Team** (mega-menu: 4 AI employee cards plus "Hire the whole team: AI Front Office"), **Demo Lab**, **Offers**, **Inside**, **Academy**.
- Right: text link **"Call the AI"** (hidden until the demo number exists) and button **"Book a strategy call"**.
- Mega-menu second column, "By industry": Home services and trades, Dental and med spa, Legal, Agencies (white label). Third column, "More services": Paid ads, AI video, CRM automation, Team training.

### Footer

- CTA band: "Ready to hire your AI team?" with "Book a strategy call" and "Interview the AI team".
- Newsletter row: "The AI Front Desk: one automation idea every week. Free." Email field, button "Send me ideas". Tag: newsletter.
- Columns: **AI Team** (Receptionist, Lead Responder, Follow-up Agent, Reviews Agent), **Offers** (AI Front Office, AI Growth Team, AI Receptionist Starter, CRM Workspace, Missed-Call Text-Back, Playbook), **Resources** (Demo Lab, Missed-call calculator, Free audit, Blog, FAQ), **Company** (About, Inside Techieficial, Academy, Agencies, Contact).
- Contact: hello@techieficial.com (general), support@techieficial.com (client support).
- Social icons (all live):
  - YouTube: [youtube.com/@techieficial](https://www.youtube.com/@techieficial)
  - Facebook: [facebook.com/techieficial](https://www.facebook.com/techieficial/)
  - TikTok: [tiktok.com/@techieficial](https://www.tiktok.com/@techieficial)
  - Instagram: [instagram.com/techieficial](https://www.instagram.com/techieficial)
  - LinkedIn: \[LINKEDIN URL, once set to linkedin.com/company/techieficial\]
  - X: \[ADD LATER\]
- Bottom line: "© \[current year\] Techieficial. AI teams for service businesses." Links: Privacy, Terms, Cookies, SMS terms, Accessibility.

### Voice

- Plain, confident, short sentences. Talk to the business owner as "you".
- Name AI employees by role, like staff: "your AI Receptionist", not "our voice bot".
- No invented numbers, clients or reviews. No em dashes. No hype words (revolutionary, game-changing, cutting-edge).

# Part 2. Page content

## 2.1 Home (/)

**SEO title:** AI Team for Service Businesses \| Techieficial  
**Meta description:** Hire an AI team that answers every call, replies to every lead, follows up and books jobs 24/7. Built, trained and managed for you.

### Section 1: Hero

**Tag:** AI teams for service businesses

**H1:** Hire an AI team that answers every lead.

**Subheadline:** Your AI Receptionist, Lead Responder, Follow-up Agent and Reviews Agent work 24/7 inside your CRM. Calls get answered, leads get booked and reviews keep coming in. We build, train and manage the team for you.

**Buttons:** "Interview the AI team" (to /demo), "Book a strategy call" (secondary).

**Under buttons:** Trusted by service businesses in the US, UK, Canada, Australia and New Zealand.

**Hero wheel (upgraded):** the 4 AI employees are segments around a center hub labeled "Your business". A fifth segment is "Growth add-ons" (ads and AI video). Hover or tap a segment to see the role, one line on what it does and a link to its profile. Idle: slow rotation and a pulse that travels Receptionist, Lead Responder, Follow-up, Reviews, the same order as the lead story below.

### Section 2: Follow one lead (scroll story)

**Heading:** Follow one lead through your AI team.

**Intro:** Here is what happens when a homeowner calls your business after hours.

1.  **7:42 PM. The call.** A homeowner's AC stops working. They call three companies. Yours is the only one that answers. *Your AI Receptionist picks up on the first ring, asks what's wrong and checks if it's an emergency.*
2.  **7:45 PM. The booking.** The caller picks a slot for 8 AM. *The booking goes straight into your calendar, and the caller gets a text confirmation.*
3.  **7:46 PM. You are in the loop.** *You get a short summary: name, address, problem, booked time. The contact is logged and tagged in your pipeline.*
4.  **Meanwhile, a web lead.** Someone fills in your website form and never books. *Your AI Lead Responder texts them within a minute and the Follow-up Agent keeps the conversation going until they book or say no.*
5.  **Next day. The review.** The job is done. *Your AI Reviews Agent asks for a review, sends happy customers to Google and routes unhappy ones to you privately.*

**Closing line:** One lead. Four AI employees. No one on your team had to stop working. **Button:** "See the AI team"

### Section 3: The problem

**Heading:** Most service businesses don't lose leads to competitors. They lose them to voicemail.

- **Missed calls.** You are on a job, the phone rings, and the caller books whoever answers first.
- **Slow replies.** Website and ad leads wait hours for a reply. By then they've moved on.
- **No follow-up.** Quotes go out and nobody chases them. Old customers never hear from you again.

**Sourced stat slot (optional):** "62% of home service customers book with the first business that picks up." Source: Nextiva, "AI Receptionist for Home Services" (vendor blog). \[OWNER: approve or replace with a non-vendor source. If not approved, hide the stat.\]

### Section 4: Meet the team (4 profile cards)

**Heading:** Meet your AI team.

Card format: role, "Works: 24/7", 3 skills, "Replaces:", link "View profile".

- **AI Receptionist.** Skills: answers every call, books into your calendar, transfers urgent calls to you. Replaces: voicemail and missed calls.
- **AI Lead Responder.** Skills: replies in under a minute on SMS, web chat, Facebook and Instagram, qualifies leads, books them. Replaces: leads waiting hours for a reply.
- **AI Follow-up Agent.** Skills: chases unbooked leads and open quotes, recovers no-shows, wakes up old customers. Replaces: the follow-up nobody has time for.
- **AI Reviews Agent.** Skills: asks for reviews after every job, drafts replies, catches unhappy customers before they post. Replaces: "we should really ask for reviews".

**Button:** "Hire the whole team" (to /offers/ai-front-office)

### Section 5: We run on it (proof)

**Heading:** We run Techieficial on the same AI team we sell.

**Body:** Every form on this site goes straight into our CRM, gets tagged and lands in front of a person. Our booking calendar is the one you will use. And our demo line is answered by the same AI Receptionist we build for clients. If it's good enough to run our business, it's ready to run yours.

**Button:** "Look inside Techieficial" (to /inside). \[Show the demo-line sentence only once the number is live.\]

### Section 6: Offers preview

**Heading:** Start where you are.

3 cards (prices from the pricing file, marked "from"):

- **AI Receptionist Starter:** never miss a call again. From \$1,497 setup + \$497/mo. \[DRAFT\]
- **AI Front Office (most popular):** the full 4-person AI team. From \$3,500 setup + \$1,297/mo. \[DRAFT\]
- **AI Growth Team:** the AI team plus ads and AI video to fill it with leads. From \$7,500 setup + \$2,500/mo plus ad spend. \[DRAFT\]

Small line: Phone, SMS and email usage billed at cost. **Button:** "See all offers"

### Section 7: How it works

**Heading:** Live in weeks, not months.

1.  **Audit (day 1).** We map how leads reach you today and where they slip through.
2.  **Build (week 1 to 2).** We set up your CRM, train each AI employee on your services, prices, hours and service area, and connect your calendar.
3.  **Test (week 2).** We run every call and message scenario before anything goes live.
4.  **Launch and tune (ongoing).** We monitor every conversation, fix what needs fixing and send you a monthly report.

### Section 8: Demo teaser

**Heading:** Don't take our word for it. Call it.

**Body:** Call our AI Receptionist right now. Ask it anything a customer would ask. Try to trip it up.

**Big number:** \[DEMO PHONE NUMBER\]. **Buttons:** "Call the AI", "Have it call me". \[Hide section until the number is live; show "Book a live demo" instead.\]

### Section 9: Comparison

**Heading:** AI team vs the usual options.

|                                 |                          |                       |                           |
|---------------------------------|--------------------------|-----------------------|---------------------------|
|                                 | **Techieficial AI team** | **Answering service** | **Extra front-desk hire** |
| Answers at 2 AM                 | Yes                      | Usually               | No                        |
| Books into your calendar        | Yes                      | Sometimes             | Yes, in office hours      |
| Replies to web and social leads | Yes, in under a minute   | No                    | When they have time       |
| Follows up and requests reviews | Yes, automatically       | No                    | If someone remembers      |
| Logs every lead in your CRM     | Yes                      | Rarely                | Manually                  |
| Sick days, training, turnover   | None                     | Varies                | Yes                       |

### Section 10: Academy strip

**Heading:** Want your people to work with AI too?

**Body:** We train your team to use the systems we build. Join the Academy waitlist. **Button:** "Join the waitlist"

### Section 11: FAQ (6)

- **Will callers know they're talking to AI?** The AI Receptionist sounds natural, and it can introduce itself as your virtual assistant. We recommend being upfront; most callers care more about getting booked than who answers.
- **What if a call is an emergency or too complex?** It transfers the call to you or your on-call number, following rules you set.
- **Do I need a new CRM?** No. If you already use our CRM, we build inside it. If not, we host one for you.
- **How long until it's live?** The AI Receptionist Starter goes live in 7 to 10 business days. The full AI Front Office takes 14 to 21 days.
- **What does the monthly fee cover?** The CRM platform and AI plan, monitoring of every AI employee, ongoing tuning, workflow fixes, support and a monthly report. Phone, SMS and email usage is billed at cost.
- **Am I locked in?** The AI Front Office has a 3-month minimum so the team has time to learn your business. After that it's month to month.

### Section 12: Final CTA

**Heading:** Your next lead is calling. Who's answering?

**Buttons:** "Book a strategy call", "Interview the AI team"

## 2.2 Meet the AI Team (/ai-team)

**SEO title:** Meet Your AI Team \| Techieficial  
**Meta:** AI Receptionist, Lead Responder, Follow-up Agent and Reviews Agent. Hire one or the whole team, built and managed for you.

**H1:** Four AI employees. One front office that never closes.

**Sub:** Hire one to fix your biggest leak, or hire the whole team and let every lead get answered, followed up and booked.

**Section: profile cards** (same 4 cards as the homepage, larger, each with a "Hire" line: "Included in AI Front Office" plus the standalone option where one exists: the AI Receptionist is also sold alone as the AI Receptionist Starter).

**Section: how they work together** (diagram): Call or lead comes in, then Receptionist or Lead Responder answers, then the booking lands in your calendar, then the Follow-up Agent chases anyone who didn't book, then the Reviews Agent asks for a review after the job. Everything is logged in your CRM.

**Section: what every AI employee comes with**

- Trained on your business: services, prices policy, hours, service area, FAQs.
- Your rules: what to book, what to escalate, what never to say.
- A manager: we review conversations every week and keep improving them.
- Everything logged in your CRM, so nothing is lost.

**CTA:** "Hire the whole team" / "Interview the AI team"

## 2.3 AI employee profiles (template plus 4 profiles)

**Template sections:** profile header (role, "Works: 24/7", "Reports to: you", "Lives in: your CRM"), job description, skills, a day in the life, what it never does, how to hire, FAQ (3), CTA.

### AI Receptionist (/ai-team/receptionist)

**SEO title:** AI Receptionist for Service Businesses \| Techieficial

**H1:** Your AI Receptionist answers every call. Even at 2 AM.

**Job description:** Answers your business line on the first ring, day and night. Finds out what the caller needs, books them into your calendar and sends you a summary. Urgent calls get transferred to you.

**Skills:**

- Answers inbound calls 24/7, including weekends and holidays
- Qualifies callers: what they need, where they are, how urgent it is
- Books appointments into your calendar, with text and email confirmations
- Transfers emergencies to you or your on-call number
- Takes messages and answers common questions from your knowledge base
- Sends you an instant summary of every call

**A day in the life:** 6:58 AM, books a leak repair before you've had coffee. 12:30 PM, answers three calls while your team is on jobs. 9:15 PM, spots "burst pipe" and transfers the caller to your on-call tech.

**What it never does:** quote prices you haven't approved, promise times you can't keep, or argue with a customer.

**How to hire:** On its own as the **AI Receptionist Starter** (from \$1,497 + \$497/mo, DRAFT), or as part of the **AI Front Office**.

**FAQ:**

- **Does it use my existing number?** Yes. We can forward your current number to it or set up a new one.
- **What languages?** English and Spanish.
- **Can I listen to calls?** Yes. Every call is recorded and transcribed in your CRM.

### AI Lead Responder (/ai-team/lead-responder)

**H1:** Every web, ad and social lead gets a reply in under a minute.

**Job description:** Watches every place leads come in: website forms, chat, Facebook and Instagram messages, ad lead forms. Replies in under a minute, asks the right questions and books qualified leads into your calendar.

**Skills:**

- Replies by SMS, web chat, Facebook Messenger and Instagram DMs
- Qualifies with your questions: service, location, timing, budget
- Books straight into your calendar
- Hands the conversation to you whenever you want to step in
- Tracks which source each lead came from

**What it never does:** spam people who didn't ask to hear from you. It only messages leads who contacted you or opted in.

**How to hire:** Part of the AI Front Office.

### AI Follow-up and Reactivation Agent (/ai-team/follow-up-agent)

**H1:** The follow-up you never have time for, done every day.

**Job description:** Chases every lead that didn't book, every quote that went quiet and every no-show. Once a quarter it reaches out to past customers so they come back to you instead of searching again.

**Skills:**

- 14-day follow-up for leads who didn't book (SMS and email)
- Quote follow-up until the customer says yes or no
- No-show recovery and rebooking
- Reactivation campaigns to your past customers and old leads
- Stops the moment someone replies, books or opts out

**How to hire:** Part of the AI Front Office. One-time database reactivation also available as an add-on.

### AI Reviews Agent (/ai-team/reviews-agent)

**H1:** More 5-star reviews, without asking awkwardly.

**Job description:** After every completed job, it asks your customer how it went. Happy customers get a one-tap link to leave a Google review. Unhappy ones are routed to you privately so you can fix it first.

**Skills:**

- Sends review requests after every job, automatically
- Routes unhappy feedback to you before it goes public
- Drafts replies to new reviews for you to approve
- Reminds customers who didn't respond, once

**How to hire:** Part of the AI Front Office.

## 2.4 Offers (/offers): "Build your team"

**SEO title:** Offers and Pricing \| Techieficial  
**Meta:** From a \$97 playbook to a fully managed AI team. Clear setup and monthly prices. Usage billed at cost.

**H1:** Build your AI team.

**Sub:** Start with one hire or bring on the whole team. Every plan is built for you, trained on your business and managed every month.

**Engine Builder (renamed "Team Builder"):** Step 1: what's costing you most? (Missed calls / Slow replies to leads / No follow-up / Not enough reviews / Not enough leads). Step 2: business size (Just me / 2 to 10 / 11 to 50 / 50+). Step 3: do you already use our CRM? (Yes / No / Not sure). Result: recommended offer with price and a button. Rules: "Not enough leads" points to AI Growth Team; 2 or more problems point to AI Front Office; only missed calls points to AI Receptionist Starter.

**Offer ladder (cards, all prices DRAFT):**

|                                |                                               |                                                           |                        |
|--------------------------------|-----------------------------------------------|-----------------------------------------------------------|------------------------|
| **Offer**                      | **Price**                                     | **Best for**                                              | **Button**             |
| AI Growth Team                 | From \$7,500 setup + \$2,500/mo plus ad spend | Businesses that need more leads, not just better handling | Book a strategy call   |
| AI Front Office (most popular) | \$3,500 setup + \$1,297/mo, 3-month minimum   | Every lead answered, followed up and booked               | Book a strategy call   |
| AI Receptionist Starter        | \$1,497 setup + \$497/mo                      | Owners who miss calls but aren't ready for the full team  | Get started (checkout) |
| CRM Workspace                  | \$197/mo                                      | A hosted, supported CRM without AI                        | Get started (checkout) |
| Missed-Call Text-Back Setup    | \$297 one-time                                | A quick fix for missed calls                              | Buy now (checkout)     |
| AI Receptionist Playbook       | \$97 one-time                                 | Do-it-yourselfers                                         | Buy now (checkout)     |

**Free:** Missed-call calculator, 15-minute lead-leak audit, call the AI.

**What your monthly fee covers:** CRM platform and AI plan; monitoring of every AI employee and automation; ongoing tuning of scripts and knowledge base; workflow fixes and improvements; support; a monthly report showing calls answered, leads booked and revenue recovered.

**Usage line:** Phone, SMS and email usage is billed at cost, straight to your card on file. No markup on usage.

**Add-ons:**

|                                                    |                                    |
|----------------------------------------------------|------------------------------------|
| **Add-on**                                         | **Price (DRAFT)**                  |
| Extra AI employee (for example an outbound caller) | \$750 setup + \$197/mo, plus usage |
| Extra location or calendar                         | \$497 setup + \$197/mo             |
| Spanish-language line                              | \$497 setup                        |
| Database reactivation campaign (one-time)          | \$997                              |
| AI video pack (5 videos)                           | \$497                              |
| Team AI workshop (90 minutes)                      | \$497                              |
| Field-service software connection                  | From \$750                         |

**Guarantee block:** "Live in 14 days or your setup fee back." \[OWNER TO CONFIRM wording and terms before this shows.\]

**Pricing FAQ (5):**

- **Why a setup fee?** It covers the build: your CRM, training each AI employee on your business, connecting your calendar and testing every scenario.
- **What does "usage at cost" mean?** Calls, texts and emails have small per-use charges from the phone and email networks. We pass them to you at cost, with no markup.
- **Is there a contract?** The AI Front Office and AI Growth Team have a 3-month minimum. The others are month to month.
- **Can I upgrade later?** Yes. Your setup fee is credited toward a bigger plan if you upgrade within 60 days. \[OWNER TO CONFIRM\]
- **Do you work with businesses outside the US?** Yes. We work with clients in the US, UK, Canada, Australia and New Zealand.

## 2.5 Product pages

**Template:** hero (H1, sub, price box, primary button), who it's for, what you get, how it works, timeline, what the monthly covers, guarantee (if confirmed), FAQ, final CTA. Optional fields per product: compare-at price, limited-time offer line (no timer).

### AI Front Office (/offers/ai-front-office)

**SEO title:** AI Front Office: Your 4-Person AI Team \| Techieficial

**H1:** Hire a full front office that never misses a lead.

**Sub:** Four AI employees answer every call, reply to every lead in under a minute, follow up until they book and collect reviews after every job. Built on your CRM, trained on your business, managed every month.

**Price box:** \$3,500 setup + \$1,297/mo \[DRAFT\]. 3-month minimum. Usage billed at cost. **Buttons:** "Interview the AI team" (to /demo), then "Book a strategy call".

**Who it's for:** service businesses that get leads every day and lose some to missed calls, slow replies or no follow-up. Especially home services and trades.

**What you get:**

- **AI Receptionist:** 24/7 call answering, triage (emergency, quote, existing customer), booking for up to 2 staff calendars, call summaries, transfers.
- **AI Lead Responder:** under-a-minute replies on SMS, web chat, Facebook and Instagram, covering website forms and ad lead forms.
- **AI Follow-up Agent:** 14-day nurture for unbooked leads, quote follow-up, no-show recovery and a one-time reactivation campaign to your old leads.
- **AI Reviews Agent:** review requests after every job, drafted replies, private routing of unhappy customers.
- **Your CRM, set up:** full pipeline (new lead to won or lost), owner dashboard, website chat widget, lead-source tracking, calendar and social page connections.
- **Team onboarding:** 60-minute training, mobile app setup, recorded guides.

**Timeline:** live in 14 to 21 days. Week 1: audit and build. Week 2: training and testing. Week 3: launch.

**Monthly covers:** weekly review of AI conversations, ongoing tuning, workflow optimization plus 1 small new automation each month, a quarterly reactivation campaign (texts billed at cost), a monthly 30-minute strategy call, a monthly report, and same-business-day support.

**FAQ:**

- **I already use the CRM. Is it cheaper?** Yes. If you already have your own account, the monthly fee is \$997 \[DRAFT\], because you pay the platform directly.
- **What do you need from me?** About 2 hours: a kickoff call, your services and pricing rules, and approval of scripts within 3 business days.
- **Can I change what the AI says?** Yes, anytime. Send the change to support and it's live within one business day.

### AI Growth Team (/offers/ai-growth-team)

**H1:** More leads in, every lead handled.

**Sub:** Everything in the AI Front Office, plus paid ads, AI video creatives and a custom AI agent for your back office.

**Price box:** from \$7,500 setup + \$2,500/mo plus ad spend \[DRAFT\]. Ad spend is paid directly by you. **Buttons:** "Interview the AI team", "Book a strategy call".

**What you get on top of the AI Front Office:**

- Paid ads setup: Meta (Google optional), tracking, lead forms connected straight to your CRM, one landing page
- Launch creatives: 8 AI video ads and 6 static ads
- 1 custom back-office AI agent, scoped with you (for example quote drafting, scheduling or weekly reporting)
- 2 team training workshops

**Monthly covers:** ads management up to an agreed spend, 8 new AI video creatives a month, creative testing, fortnightly strategy calls, and a full-funnel report from ad spend to booked revenue.

**Timeline:** live in about 30 days.

### AI Receptionist Starter (/offers/ai-receptionist-starter)

**H1:** Never miss another call.

**Sub:** An AI Receptionist that answers every call 24/7, books callers into your calendar and texts back anyone who hangs up. Live in 7 to 10 business days.

**Price box:** \$1,497 setup + \$497/mo \[DRAFT\]. Usage billed at cost. **Button:** "Get started" (payment link). Secondary: "Call the AI first".

**What you get:** CRM workspace setup; 1 AI Receptionist trained on your business (services, hours, service area, pricing policy, up to 30 FAQs); call handling (answer, qualify, book, take a message, transfer urgent calls, after-hours mode); missed-call text-back; booking confirmations and reminders; instant call summaries; US texting registration support; a 20-scenario test before go-live; a 30-minute handover plus recorded guide.

**Monthly covers:** CRM hosting and AI plan, weekly review of call transcripts, up to 5 script or knowledge-base updates a month, a monthly report, support within 1 business day.

**Upgrade line:** Ready for the full team later? Your setup fee counts toward the AI Front Office within 60 days. \[OWNER TO CONFIRM\]

### CRM Workspace (/offers/crm-workspace)

**H1:** Your own CRM, hosted and supported.

**Sub:** Contacts, pipeline, calendars, one inbox for SMS, email and social, forms, website builder, review tools and a mobile app. Without the enterprise price tag.

**Price box:** \$197/mo \[DRAFT\]. Optional quick-start setup \$297. Usage billed at cost. **Button:** "Get started" (payment link).

**Quick-start includes:** 1 pipeline, 1 calendar, a contact form, 1 phone number and your email sending domain.

**Support:** by email or ticket, reply within 48 business hours.

**Not included:** AI employees and custom automations. Add them anytime.

### Missed-Call Text-Back Setup (/offers/missed-call-text-back)

**H1:** Turn missed calls into conversations.

**Sub:** Every missed call gets an instant text, so the caller talks to you instead of calling the next business on the list. Live in 3 business days.

**Price box:** \$297 one-time \[DRAFT\]. Requires our CRM (your own account or a CRM Workspace). Usage billed at cost. **Button:** "Buy now" (payment link).

**What you get:** instant auto-text to every missed call, a short reply flow, owner alerts and a test before launch.

### AI Receptionist Playbook (/offers/ai-receptionist-playbook)

**H1:** Build your own AI receptionist the way we build ours.

**Sub:** The call script, knowledge-base template, FAQ list, call-flow map and prompt pack we use for client builds, for your niche.

**Price box:** \$97 one-time \[DRAFT\]. Instant download. **Button:** "Buy now" (payment link).

**Niches available:** \[OWNER: list the niche knowledge bases that are ready\].

## 2.6 Demo Lab (/demo): "Interview your AI team"

**SEO title:** Demo Lab: Interview Your AI Team \| Techieficial

**H1:** Interview your AI team before you hire it.

**Sub:** Call the AI Receptionist, test the Lead Responder and see what the system does after every call.

**Tab 1: Call the AI Receptionist.** Big number \[DEMO NUMBER\]. "Have it call me" form (first name, email, phone, SMS consent checkbox). Interview tips: "Ask for a booking tomorrow morning. Say it's an emergency. Ask a price question. Ask if it's a robot." After-call panel, "What just happened": the call was logged in the CRM, the caller was tagged, a confirmation text was sent, the owner got a summary. \[Hide tab until the number is live; show "Book a live demo" instead.\]

**Tab 2: Test the Lead Responder.** Chat widget \[CHAT WIDGET SCRIPT\]. Tip: "Pretend you filled in a quote form. See how fast it replies and what it asks." \[Hide until the widget exists.\]

**Tab 3: Watch it work.** 3 walkthrough videos: a missed call becoming a booking, a web lead booked by text, a review request after a job. \[VIDEOS NEEDED\]

**Tab 4: Book a test build.** "Want to hear it with your business name and your services? We'll set up a test version for your business." Short form (business name, website, type of business, biggest problem, phone), then the Test Build Session calendar.

**Gallery strip (optional):** AI video samples with filters (Ad creative, Product launch, Review, Training, Infographic). \[SAMPLES NEEDED\]

## 2.7 Inside Techieficial (/inside): "We run on it"

**SEO title:** Inside Techieficial: We Run on Our Own AI Team

**H1:** We run Techieficial on the same AI team we sell.

**Sub:** No slides, no promises. Here's what's actually running our business today.

**Live now (show these):**

- **Lead intake:** every form on this site goes into our CRM in seconds, tagged by source, with every answer saved on the contact.
- **Booking:** our strategy calls and test builds are booked through the same CRM calendar you'll get.
- **Email:** our emails go out from our own verified sending domain, the same setup we do for clients.

**Coming online (show each only when live):** our AI Receptionist answering our demo line; our AI Lead Responder on website chat; our Reviews Agent asking our clients for reviews; our monthly numbers (calls answered, leads booked).

**Closing:** "Want to see it run? Call it, test it, then decide." Buttons: "Interview the AI team", "Book a strategy call".

## 2.8 Free tools

### Missed-call calculator (/tools/missed-call-calculator)

**H1:** How much are missed calls costing you?

**Inputs:** calls per week; % of calls you miss (your best guess); % of answered callers who book; average job value.

**Formula:** monthly lost revenue = calls per week x 4.3 x missed % x booking % x average job value. Show "per month" and "per year".

**Result copy:** "You could be losing about \$\[X\] a month to missed calls. An AI Receptionist answers every one." Buttons: "Call the AI", "See the AI Receptionist Starter". Optional: "Email me this result" (email field, tag: calculator).

**Note under result:** This is an estimate from your numbers, not a promise.

### Free lead-leak audit (/audit)

**H1:** Find out where your leads are slipping away. Free.

**Sub:** We'll call your business, submit your website form and message your social pages like a real customer would. Then we send you a 15-minute video showing what happened and what to fix.

**Form:** name, email, phone, business name, website, main city, SMS consent. Tag: audit. Thank-you page: /thank-you/audit ("Your audit video arrives within 3 business days." \[OWNER TO CONFIRM turnaround\]).

## 2.9 More services (/services and 4 service pages)

**H1:** More ways we grow your business.

**Sub:** Add these to your AI team, or hire them on their own.

- **Paid ads (/services/paid-ads):** "Ads that feed your AI team, not a spreadsheet." Meta, Google, TikTok and LinkedIn campaigns with tracking and lead forms connected straight to your CRM, so every ad lead gets an instant reply. Price: included in AI Growth Team; standalone \[OWNER: price or "quote"\].
- **AI video (/services/ai-video):** "Studio-quality video without the studio." Ad creatives, UGC-style ads, product launch, review, training and explainer videos. Add-on: 5-video pack \$497 \[DRAFT\].
- **CRM automation (/services/marketing-automation):** "Never lose a lead to slow follow-up." Custom CRM builds, pipelines, nurture sequences and integrations. Support for HubSpot, Zoho and Salesforce coming. Price: quote.
- **Team training (/services/training):** "Your team, AI-ready in weeks." Workshops on working alongside AI employees and using the CRM. 90-minute workshop \$497 \[DRAFT\]; corporate programs by quote.

Keep the existing service page copy where it fits; update headlines and the price block to the above, and add "Pairs with your AI team" sections linking to /ai-team.

## 2.10 Industry: Home services and trades (/industries/home-services)

**SEO title:** AI Receptionist and AI Team for Home Services \| Techieficial

**H1:** You're on the job. Your AI team is on the phone.

**Sub:** For HVAC, plumbing, electrical, roofing, cleaning and other trades. Every call answered, every quote followed up, every finished job turned into a review.

**Pains:** calls missed while you're on a roof or under a sink; emergency calls at night going to voicemail; quotes that go quiet; reviews you never get around to asking for.

**The workflow:** call comes in, AI Receptionist triages (emergency or routine), books or transfers, sends confirmation, you get a summary, the Follow-up Agent chases open quotes, the Reviews Agent asks for a review after the job.

**Built for trades:** emergency keyword escalation (burst pipe, no heat, gas smell, sparking outlet), service-area checks by zip or postcode, after-hours pricing rules, on-call rotation transfers.

**Recommended:** AI Front Office. Start smaller: AI Receptionist Starter.

**Experience line:** We've built CRM and lead systems for builders and HVAC businesses. \[OWNER: confirm you're happy to reference this, and add a case study when permission is given.\]

**Niche FAQ:**

- **Can it handle emergency calls?** Yes. You set the trigger words and it transfers to your on-call number straight away.
- **Can it work with my field-service software?** It works natively in our CRM. Connections to software like Jobber or ServiceTitan are available as an add-on.
- **What about seasonal rushes?** It answers 1 call or 50 at the same time. No overtime.

## 2.11 Agencies (/agencies)

Keep the existing page. Update the headline to: **"Sell AI teams under your brand. We build them."** Add a line: "We deliver AI Receptionists, AI Front Offices, CRM builds and AI video under your brand, with full white-label and NDA." CTA: "Book a partner call" (tag: agency-partner).

## 2.12 Academy (/academy): "Train your humans"

**H1:** Your AI team is ready. Is your human team?

**Sub:** Courses, mentorship and corporate training on running a business with AI employees, from the people who build them.

**Coming soon:** self-paced course, community, 1:1 mentorship, corporate training.

**Founding member offer:** \[OWNER: what, price, deadline\].

**Form:** name, email, "I'm a..." (Business owner / Employee / VA or freelancer / Agency). Tag: academy-waitlist.

## 2.13 About (/about)

**H1:** Built by a builder.

**Founder story (DRAFT, owner to approve and edit):**

Techieficial was founded by Abdulmujeeb Iyanda. He started in IT, troubleshooting systems and hardware, then moved into web and funnel design, and for the last 4+ years has specialized in CRM builds and automation.

He has built CRM and automation systems for more than 13 clients across the US, UK, Canada, Australia and New Zealand, each one designed and delivered personally. The same problem came up again and again: good businesses losing leads to missed calls, slow replies and follow-up nobody had time for.

Techieficial packages the fix as an AI team you can hire, built and managed by someone who has done the work by hand.

\[OWNER: add photo; decide whether to mention you're Nigerian and based in the Philippines. A global, remote team story can be a strength for international clients.\]

**How we work:** we build it ourselves; we test before anything goes live; we tell you what the AI can't do; we report every month.

**Countries served:** US, UK, Canada, Australia, New Zealand.

## 2.14 Contact (/contact)

**H1:** Let's map your AI team.

**Sub:** Book a 30-minute strategy call. You'll leave with a clear plan for where your leads are slipping, whether or not we work together.

**Calendar:** Strategy Call. **Short form** (if they don't want to book): name, email, phone, business type, main goal, monthly budget range, message, SMS consent. Tag: booked-call (calendar) or contact-form.

**Other ways:** hello@techieficial.com. Existing clients: support@techieficial.com.

## 2.15 FAQ (/faq)

Keep the existing grouped FAQ and add these:

- **AI and data: Is my customer data safe?** Your data stays in your CRM account. We don't sell or share it. \[OWNER: confirm against your privacy policy.\]
- **AI: Can the AI make mistakes?** Yes, occasionally, like any new employee. That's why we review conversations every week and tune it, and why it transfers anything it isn't sure about.
- **Services: Do I have to hire the whole team?** No. Start with the AI Receptionist Starter and add the rest later.
- **Process: What happens on the strategy call?** We look at how leads reach you, where they slip, and which AI employees would make the biggest difference. No pressure to buy.
- **Contracts: Can I cancel?** Month-to-month plans cancel anytime. The AI Front Office and AI Growth Team have a 3-month minimum.

## 2.16 Thank-you pages

- **/thank-you (booked call):** "You're booked." Next steps: check your email for the meeting link; have your website and a recent busy week in mind; call the AI before we meet. Buttons: Demo Lab.
- **/thank-you/purchase:** "Payment received. Welcome to Techieficial." Next: onboarding email within 1 business day from support@techieficial.com; book your kickoff call \[CALENDAR LINK\]. Playbook buyers: "Check your email for the download link."
- **/thank-you/audit:** "Your audit is on its way." Turnaround \[OWNER TO CONFIRM\].

## 2.17 Blog

Keep the 3 existing drafts (owner to approve): "What missed calls really cost a service business", "AI receptionist vs answering service", "What a CRM automation build includes". Next 3 topics:

- "How an AI receptionist handles an emergency call (step by step)"
- "Speed to lead: why replying in 1 minute beats replying in 1 hour"
- "How to get more Google reviews without asking awkwardly"

## 2.18 Newsletter: "The AI Front Desk"

**Signup line:** One automation idea every week. Free. Unsubscribe anytime.

**Welcome email 1 (immediately)**  
Subject: Welcome to The AI Front Desk  
Body: Thanks for signing up. Every week you'll get one idea you can use to answer, book or follow up with more leads, usually in under 10 minutes. Start here: call our AI Receptionist at \[DEMO NUMBER\] and hear what your customers would hear. Talk soon, Abdulmujeeb, Techieficial.

**Email 2 (day 3)**  
Subject: The 60-second rule  
Body: Leads that hear back within a minute are far more likely to book than leads that wait an hour. Quick win this week: set up an instant text reply to every form on your website. Here's how we do it: \[LINK TO BLOG POST\].

**Email 3 (day 7)**  
Subject: How much are missed calls costing you?  
Body: We built a free calculator. Put in your calls per week and average job value and see what voicemail costs you a month. \[LINK TO CALCULATOR\] If the number hurts, book a strategy call and we'll show you how to get it back.

## 2.19 Legal pages

Keep the existing drafts. Before launch: add the legal business name \[OWNER: EYANDA IT SOLUTIONS trading as Techieficial, or another entity\], a business address \[OWNER: consider a business or virtual office address instead of your home address\], contact email hello@techieficial.com, and a lawyer review or your own sign-off. SMS terms must keep opt-in wording, message frequency, "Reply STOP to cancel, HELP for help" and "Message and data rates may apply".

# Part 3. What only you can supply

|                                                                                     |                                                        |                                                 |
|-------------------------------------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------|
| **Item**                                                                            | **Unlocks**                                            | **Status**                                      |
| Final logo files (full logo, icon, favicon)                                         | Header, footer, social previews                        | In progress (ChatGPT concept, then SVG rebuild) |
| Demo phone number with the AI Receptionist live                                     | Home demo section, Demo Lab tab 1, "Call the AI" links | To buy                                          |
| PayPal Business connected in the CRM and one test payment                           | All "Buy now" and "Get started" buttons                | To do                                           |
| Google Calendar or Zoom connected; booking hours widened                            | Strategy calls with meeting links                      | To do                                           |
| Price approval (all DRAFT prices)                                                   | Offers page, product pages, schema                     | To confirm                                      |
| Guarantee wording and upgrade-credit terms                                          | Guarantee blocks                                       | To confirm                                      |
| Founder photo and approval of the founder story                                     | About page                                             | Needed                                          |
| Hero video                                                                          | Homepage hero                                          | You're making it                                |
| 3 walkthrough videos and AI video samples                                           | Demo Lab tabs 3 and gallery                            | Needed                                          |
| Chat widget script                                                                  | Demo Lab tab 2                                         | After the Lead Responder is built               |
| 1 case study with client permission                                                 | Work pages, results sections                           | Needed                                          |
| LinkedIn custom URL                                                                 | Footer, schema                                         | To set                                          |
| Spam-check keys (Cloudflare Turnstile) and analytics IDs (GA4, Meta Pixel, Clarity) | Form protection, tracking                              | Needed                                          |
| Legal business name, business address, legal sign-off                               | Legal pages, footer                                    | To decide                                       |
| Academy founding-member offer                                                       | Academy page                                           | To decide                                       |
| Playbook download files and niche list                                              | Playbook product                                       | Needed                                          |
| Approval of the stat source on the homepage                                         | Problem section stat                                   | To confirm                                      |

# Part 4. Build prompt for your coding assistant

Before pasting: export this doc as Markdown (File, Download, Markdown) and save it in the website project as **docs/SITE_CONTENT_V3.md**. Make sure **docs/CRM_SETUP.md** (from the project doc TECHIEFICIAL_CRM_SETUP) is also there. Then paste the prompt below.

-- PROMPT START --

Read CLAUDE.md, docs/CRM_SETUP.md and docs/SITE_CONTENT_V3.md in full before doing anything. We are moving the site from the current preview (branch design/w4-refresh) to version 3. SITE_CONTENT_V3.md is the source of truth for structure and copy. Where it conflicts with CLAUDE.md, it wins. CRM_SETUP.md is the source of truth for webhooks, calendars, payment links, emails and products.

Goal: rebuild the site around "Hire your AI team". Main offer is the AI Front Office. Offers of \$3,000 and up send visitors to the Demo Lab and then "Book a strategy call". Offers under \$3,000 use the CRM payment links.

Rules that do not change: production quality, no placeholders in production (any \[BRACKETED\] item goes in content/\_missing.md and its section is hidden), never invent facts, stats, clients or reviews, no em dashes in copy, always say "CRM" and never the vendor name, all copy in content/ and site.config.ts, secrets only in environment variables, never expose webhook URLs to the browser, run npm run check before every commit, ask before deleting files or changing DNS, domain or hosting.

Work in these phases. After each phase: npm run check, commit, deploy a preview, and report to me in plain words (Done, Check, Need from you, Next). Wait for my OK before starting the next phase.

Phase 1: Foundations. Create a branch v3 from design/w4-refresh. Update site.config.ts: business emails (hello@techieficial.com, support@techieficial.com), social links (YouTube, Facebook, TikTok, Instagram from the content doc; LinkedIn and X empty and hidden), a checkoutLive flag set to false, a demoPhone value left empty (hide every demo-phone element while empty). Create content/pricing.ts with every offer and add-on from section 2.4, each with name, slug, setup price, monthly price, one-time price, minimum term, buying path (checkout or call), payment link from CRM_SETUP.md, compareAtPrice and limitedOffer fields (optional), and a draft: true flag that shows a small "Draft pricing" note in previews only. Add 301 redirects: /pricing to /offers, /services/ai-agents to /ai-team. Update the navigation, mega-menu and footer to section 1.3. Add the env vars from CRM_SETUP.md to .env.example (names only) and wire /api/lead to send the exact payload fields listed there, plus /api/callme to the call-me webhook.

Phase 2: Homepage. Rebuild / to section 2.1, all 12 sections in order. Upgrade the hero wheel: segments are the 4 AI employees plus "Growth add-ons", center hub "Your business", same accessibility and reduced-motion rules as before. Build the Follow One Lead section as a scroll story with 5 steps; it must work with reduced motion (static list) and on mobile.

Phase 3: AI Team. Build /ai-team and the 4 profile pages from sections 2.2 and 2.3 with one shared profile template.

Phase 4: Offers. Build /offers (with the Team Builder replacing the Engine Builder, rules in section 2.4) and the 6 product pages from section 2.5 with one shared product template. Checkout buttons use the payment links but stay disabled with "Checkout opens soon" while checkoutLive is false. \$3,000+ products show "Interview the AI team" and "Book a strategy call" only.

Phase 5: Demo Lab, Inside and free tools. Rebuild /demo to section 2.6 (4 tabs, hide tabs whose assets are missing), build /inside (section 2.7, only "Live now" items visible), /tools/missed-call-calculator (formula in 2.8, client-side, accessible inputs, result announced with aria-live) and /audit with its thank-you page.

Phase 6: Everything else. Update /services and the 4 service pages (2.9), /industries/home-services (2.10), /agencies (2.11), /academy (2.12), /about (2.13, founder section hidden until approved), /contact (2.14), /faq (2.15), thank-you pages (2.16), blog topics (2.17, new posts as drafts), newsletter form and welcome-email copy saved in content/emails/ for me to paste into the CRM (2.18), legal pages (2.19). Update sitemap, JSON-LD (Organization sameAs uses only the live social links), metadata and llms.txt for every new route.

Phase 7: QA. Run the full check suite, fix everything, test every form against the real webhooks with test data tagged "website-test", list what's still in content/\_missing.md, and give me the manual checklist. Do not merge to main or deploy to techieficial.com without my go-ahead.

Start with Phase 1 step 1 only: inspect the repo and branch, tell me what you found and propose the exact Phase 1 task list. Wait for my OK before writing code.

-- PROMPT END --
