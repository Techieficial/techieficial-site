/**
 * Offers page and product page copy (docs/SITE_CONTENT_V3.md 2.4 and 2.5). Status: needs-review.
 * Prices come from content/pricing.ts. Items marked [OWNER TO CONFIRM] in the doc (guarantee,
 * upgrade credit) are left out until the owner confirms them; they are listed in content/_missing.md.
 */
import type { OfferSlug } from "./pricing";

export type ProductBlock = { title: string; items?: { title?: string; body: string }[]; text?: string };

export type ProductPage = {
  slug: OfferSlug;
  seo: { title: string; description: string };
  h1: string;
  sub: string;
  /** Lines under the price, e.g. "3-month minimum." */
  priceNotes: string[];
  whoFor?: string;
  whatYouGet: { title?: string; body: string }[];
  timeline?: string;
  monthlyCovers?: string;
  /** Extra blocks some products have (quick-start, support, not included, niches). */
  extra?: ProductBlock[];
  faqs?: { q: string; a: string }[];
};

/** Niches with a ready AI Receptionist knowledge base (owner's Drive, Nov 22, 2026). */
export const playbookNiches = [
  "HVAC service companies",
  "Plumbing companies",
  "Electrical contractors",
  "Roofing contractors",
  "Cleaning service companies",
  "Landscaping and lawn care",
  "Automotive repair shops",
  "Property management companies",
  "Real estate agencies",
  "Dental clinics",
  "Med spas and aesthetic clinics",
  "Law firms and legal intake",
  "Fitness centers and martial arts academies",
  "Education and training providers",
];

export const productPages: ProductPage[] = [
  {
    slug: "ai-front-office",
    seo: {
      title: "AI Front Office: Your 4-Person AI Team | Techieficial",
      description: "Four AI employees answer every call, reply to every lead in under a minute, follow up until they book and collect reviews. Managed for you.",
    },
    h1: "Hire a full front office that never misses a lead.",
    sub: "Four AI employees answer every call, reply to every lead in under a minute, follow up until they book and collect reviews after every job. Built on your CRM, trained on your business, managed every month.",
    priceNotes: ["3-month minimum.", "Phone, SMS and email usage billed at cost."],
    whoFor: "Service businesses that get leads every day and lose some to missed calls, slow replies or no follow-up. Especially home services and trades.",
    whatYouGet: [
      { title: "AI Receptionist", body: "24/7 call answering, triage (emergency, quote, existing customer), booking for up to 2 staff calendars, call summaries, transfers." },
      { title: "AI Lead Responder", body: "Under-a-minute replies on SMS, web chat, Facebook and Instagram, covering website forms and ad lead forms." },
      { title: "AI Follow-up Agent", body: "14-day nurture for unbooked leads, quote follow-up, no-show recovery and a one-time reactivation campaign to your old leads." },
      { title: "AI Reviews Agent", body: "Review requests after every job, drafted replies, private routing of unhappy customers." },
      { title: "Your CRM, set up", body: "Full pipeline (new lead to won or lost), owner dashboard, website chat widget, lead-source tracking, calendar and social page connections." },
      { title: "Team onboarding", body: "60-minute training, mobile app setup, recorded guides." },
    ],
    timeline: "Live in 14 to 21 days. Week 1: audit and build. Week 2: training and testing. Week 3: launch.",
    monthlyCovers: "Weekly review of AI conversations, ongoing tuning, workflow optimization plus 1 small new automation each month, a quarterly reactivation campaign (texts billed at cost), a monthly 30-minute strategy call, a monthly report, and same-business-day support.",
    faqs: [
      { q: "I already use the CRM. Is it cheaper?", a: "Yes. If you already have your own account, the monthly fee is {ownCrmMonthly}, because you pay the platform directly." },
      { q: "What do you need from me?", a: "About 2 hours: a kickoff call, your services and pricing rules, and approval of scripts within 3 business days." },
      { q: "Can I change what the AI says?", a: "Yes, anytime. Send the change to support and it's live within one business day." },
    ],
  },
  {
    slug: "ai-growth-team",
    seo: {
      title: "AI Growth Team: More Leads, All Handled | Techieficial",
      description: "Everything in the AI Front Office, plus paid ads, AI video creatives and a custom AI agent for your back office.",
    },
    h1: "More leads in, every lead handled.",
    sub: "Everything in the AI Front Office, plus paid ads, AI video creatives and a custom AI agent for your back office.",
    priceNotes: ["Ad spend is paid directly by you.", "3-month minimum.", "Phone, SMS and email usage billed at cost."],
    whatYouGet: [
      { title: "Everything in the AI Front Office", body: "All 4 AI employees, your CRM set up and team onboarding." },
      { title: "Paid ads setup", body: "Meta (Google optional), tracking, lead forms connected straight to your CRM, one landing page." },
      { title: "Launch creatives", body: "8 AI video ads and 6 static ads." },
      { title: "1 custom back-office AI agent", body: "Scoped with you, for example quote drafting, scheduling or weekly reporting." },
      { title: "2 team training workshops", body: "So your people work well alongside the AI team." },
    ],
    timeline: "Live in about 30 days.",
    monthlyCovers: "Ads management up to an agreed spend, 8 new AI video creatives a month, creative testing, fortnightly strategy calls, and a full-funnel report from ad spend to booked revenue.",
  },
  {
    slug: "ai-receptionist-starter",
    seo: {
      title: "AI Receptionist Starter: Never Miss a Call | Techieficial",
      description: "An AI Receptionist that answers every call 24/7, books callers into your calendar and texts back anyone who hangs up. Live in 7 to 10 days.",
    },
    h1: "Never miss another call.",
    sub: "An AI Receptionist that answers every call 24/7, books callers into your calendar and texts back anyone who hangs up. Live in 7 to 10 business days.",
    priceNotes: ["Phone, SMS and email usage billed at cost."],
    whatYouGet: [
      { body: "CRM workspace setup" },
      { body: "1 AI Receptionist trained on your business: services, hours, service area, pricing policy, up to 30 FAQs" },
      { body: "Call handling: answer, qualify, book, take a message, transfer urgent calls, after-hours mode" },
      { body: "Missed-call text-back" },
      { body: "Booking confirmations and reminders" },
      { body: "Instant call summaries" },
      { body: "US texting registration support" },
      { body: "A 20-scenario test before go-live" },
      { body: "A 30-minute handover plus a recorded guide" },
    ],
    timeline: "Live in 7 to 10 business days.",
    monthlyCovers: "CRM hosting and AI plan, weekly review of call transcripts, up to 5 script or knowledge-base updates a month, a monthly report, support within 1 business day.",
  },
  {
    slug: "crm-workspace",
    seo: {
      title: "CRM Workspace: Your Own CRM, Hosted | Techieficial",
      description: "Contacts, pipeline, calendars, one inbox for SMS, email and social, forms, website builder, review tools and a mobile app. Hosted and supported.",
    },
    h1: "Your own CRM, hosted and supported.",
    sub: "Contacts, pipeline, calendars, one inbox for SMS, email and social, forms, website builder, review tools and a mobile app. Without the enterprise price tag.",
    priceNotes: ["Optional quick-start setup: {quickStart}.", "Phone, SMS and email usage billed at cost."],
    whatYouGet: [
      { body: "Contacts and pipeline" },
      { body: "Calendars" },
      { body: "One inbox for SMS, email and social" },
      { body: "Forms and website builder" },
      { body: "Review tools" },
      { body: "Mobile app" },
    ],
    extra: [
      { title: "Quick-start includes", text: "1 pipeline, 1 calendar, a contact form, 1 phone number and your email sending domain." },
      { title: "Support", text: "By email or ticket, reply within 48 business hours." },
      { title: "Not included", text: "AI employees and custom automations. Add them anytime." },
    ],
  },
  {
    slug: "missed-call-text-back",
    seo: {
      title: "Missed-Call Text-Back Setup | Techieficial",
      description: "Every missed call gets an instant text, so the caller talks to you instead of calling the next business. Live in 3 business days.",
    },
    h1: "Turn missed calls into conversations.",
    sub: "Every missed call gets an instant text, so the caller talks to you instead of calling the next business on the list. Live in 3 business days.",
    priceNotes: ["Requires our CRM (your own account or a CRM Workspace).", "SMS usage billed at cost."],
    whatYouGet: [{ body: "Instant auto-text to every missed call" }, { body: "A short reply flow" }, { body: "Owner alerts" }, { body: "A test before launch" }],
    timeline: "Live in 3 business days.",
  },
  {
    slug: "ai-receptionist-playbook",
    seo: {
      title: "AI Receptionist Playbook: Build Your Own | Techieficial",
      description: "The call script, knowledge-base template, FAQ list, call-flow map and prompt pack we use for client builds, for your niche. Instant download.",
    },
    h1: "Build your own AI receptionist the way we build ours.",
    sub: "The call script, knowledge-base template, FAQ list, call-flow map and prompt pack we use for client builds, for your niche.",
    priceNotes: ["Instant download."],
    whatYouGet: [{ body: "Call script" }, { body: "Knowledge-base template" }, { body: "FAQ list" }, { body: "Call-flow map" }, { body: "Prompt pack" }],
    extra: [{ title: "Niches available", items: playbookNiches.map((n) => ({ body: n })) }],
  },
];

export const productBySlug = (slug: string) => productPages.find((p) => p.slug === slug);

export const offersPage = {
  seo: {
    title: "Offers and Pricing | Techieficial",
    description: "From a $97 playbook to a fully managed AI team. Clear setup and monthly prices. Usage billed at cost.",
  },
  title: "Build your AI team.",
  intro: "Start with one hire or bring on the whole team. Every plan is built for you, trained on your business and managed every month.",
  ladderTitle: "Offers",
  bestFor: "Best for",
  details: "See what's included",
  freeTitle: "Free",
  free: [
    { label: "Missed-call calculator", href: "/tools/missed-call-calculator" },
    { label: "15-minute lead-leak audit", href: "/audit" },
    { label: "Interview the AI team", href: "/demo" },
  ],
  coversTitle: "What your monthly fee covers",
  usageTitle: "Usage",
  usage: "Phone, SMS and email usage is billed at cost, straight to your card on file. No markup on usage.",
  addOnsTitle: "Add-ons",
  addOnCol: "Add-on",
  priceCol: "Price",
  faqTitle: "Pricing questions",
  product: {
    priceTitle: "Price",
    whoForTitle: "Who it's for",
    getTitle: "What you get",
    timelineTitle: "Timeline",
    monthlyTitle: "What the monthly fee covers",
    faqTitle: "Questions",
    callFirst: "Call the AI first",
    ctaTitle: "Your next lead is calling. Who's answering?",
  },
};

/** Team Builder (replaces the Engine Builder), docs/SITE_CONTENT_V3.md 2.4. */
export const teamBuilder = {
  title: "Team Builder",
  stepOf: "Step {n} of 3",
  progressLabel: "Team Builder steps",
  stepNames: ["Problems", "Business size", "Your CRM"],
  stepDone: "done",
  step1: "What's costing you most?",
  step1Hint: "Pick one or more.",
  step2: "What size is your business?",
  step3: "Do you already use our CRM?",
  problems: [
    { key: "missed-calls", label: "Missed calls" },
    { key: "slow-replies", label: "Slow replies to leads" },
    { key: "no-follow-up", label: "No follow-up" },
    { key: "reviews", label: "Not enough reviews" },
    { key: "leads", label: "Not enough leads" },
  ],
  sizes: ["Just me", "2 to 10", "11 to 50", "50+"],
  crm: ["Yes", "No", "Not sure"],
  next: "Next",
  back: "Back",
  restart: "Start again",
  resultTitle: "Recommended for you",
  selectionNote: "Your choices are added to the booking form.",
  noScript: "The Team Builder needs JavaScript to run. You can compare every offer below.",
  noScriptLink: "Go to offers",
};
