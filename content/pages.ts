/** Copy for every page other than home, services, industries, blog and legal. Status: needs-review. */

/**
 * Navigation (docs/SITE_CONTENT_V3.md 1.3). Each link names its v3 page in `href`. While that page is
 * not built yet, `fallback` is used instead; with no fallback the link is hidden (see lib/nav.ts).
 */
export type NavLinkDef = { label: string; href: string; fallback?: string };

export const nav = {
  team: {
    label: "AI Team",
    href: "/ai-team",
    menuToggle: "Show the AI team menu",
    cards: [
      { name: "AI Receptionist", line: "Answers every call, books jobs, transfers emergencies.", icon: "Phone", href: "/ai-team/receptionist" },
      { name: "AI Lead Responder", line: "Replies to web, ad and social leads in under a minute.", icon: "ChatCircle", href: "/ai-team/lead-responder" },
      { name: "AI Follow-up Agent", line: "Chases unbooked leads, open quotes and no-shows.", icon: "ArrowsClockwise", href: "/ai-team/follow-up-agent" },
      { name: "AI Reviews Agent", line: "Asks for reviews after every job.", icon: "Star", href: "/ai-team/reviews-agent" },
    ],
    wholeTeam: { title: "Hire the whole team", body: "AI Front Office: all 4 AI employees, built and managed for you.", href: "/offers/ai-front-office" },
    allLabel: "Meet the AI team",
  },
  byIndustry: "By industry",
  industries: [
    { label: "Home services and trades", href: "/industries/home-services" },
    { label: "Dental and med spa", href: "/industries/dental-medspa" },
    { label: "Legal", href: "/industries/legal" },
    { label: "Agencies (white label)", href: "/agencies" },
  ] as NavLinkDef[],
  moreServices: "More services",
  services: [
    { label: "Paid ads", href: "/services/paid-ads" },
    { label: "AI video", href: "/services/ai-video" },
    { label: "CRM automation", href: "/services/marketing-automation" },
    { label: "Team training", href: "/services/training" },
  ] as NavLinkDef[],
  links: [
    { label: "Demo Lab", href: "/demo" },
    { label: "Offers", href: "/offers" },
    { label: "Inside", href: "/inside" },
    { label: "Academy", href: "/academy" },
  ] as NavLinkDef[],
  themeToggle: "Switch between light and dark mode",
  skipLink: "Skip to content",
};

export const footer = {
  ctaTitle: "Ready to hire your AI team?",
  newsletter: {
    title: "The AI Front Desk: one automation idea every week. Free.",
    inputLabel: "Your email",
    button: "Send me ideas",
    success: "You are subscribed. Look out for the first email.",
  },
  columns: [
    {
      title: "AI Team",
      links: [
        { label: "Receptionist", href: "/ai-team/receptionist" },
        { label: "Lead Responder", href: "/ai-team/lead-responder" },
        { label: "Follow-up Agent", href: "/ai-team/follow-up-agent" },
        { label: "Reviews Agent", href: "/ai-team/reviews-agent" },
      ],
    },
    {
      title: "Offers",
      links: [
        { label: "AI Front Office", href: "/offers/ai-front-office" },
        { label: "AI Growth Team", href: "/offers/ai-growth-team" },
        { label: "AI Receptionist Starter", href: "/offers/ai-receptionist-starter" },
        { label: "CRM Workspace", href: "/offers/crm-workspace" },
        { label: "Missed-Call Text-Back", href: "/offers/missed-call-text-back" },
        { label: "Playbook", href: "/offers/ai-receptionist-playbook" },
        { label: "All offers and pricing", href: "/offers" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Demo Lab", href: "/demo" },
        { label: "Missed-call calculator", href: "/tools/missed-call-calculator" },
        { label: "Free audit", href: "/audit" },
        { label: "Work", href: "/work" },
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Inside Techieficial", href: "/inside" },
        { label: "Academy", href: "/academy" },
        { label: "Agencies", href: "/agencies" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ] as { title: string; links: NavLinkDef[] }[],
  emailLabel: "General",
  supportLabel: "Client support",
  bottomLine: "AI teams for service businesses.",
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
    { label: "SMS terms", href: "/sms-terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
  cookiePrefs: "Cookie preferences",
};

export const servicesHub = {
  feeds: "feeds",
  seo: {
    title: "Services | Techieficial",
    description: "Paid ads, AI video, CRM automation and team training. Add them to your AI team, or hire them on their own.",
  },
  title: "More ways we grow your business.",
  intro: "Add these to your AI team, or hire them on their own.",
  pairsTitle: "Pairs with your AI team",
  pairsBody: "Every lead these services bring in is answered, followed up and booked by your AI team, and logged in your CRM.",
  pairsLink: "Meet the AI team",
  connectTitle: "How the services connect",
  connect: [
    { from: "ai-video", to: "paid-ads", label: "Video feeds your ads with fresh creative." },
    { from: "paid-ads", to: "marketing-automation", label: "Ads send every lead straight into the CRM." },
    { from: "ai-agents", to: "marketing-automation", label: "AI agents answer, qualify and book, then log it in the CRM." },
    { from: "training", to: "marketing-automation", label: "Training hands the system over to your team." },
  ],
  packagesTitle: "Start where you are.",
};

/** Demo Lab, "Interview your AI team" (docs/SITE_CONTENT_V3.md 2.6). Status: needs-review. */
export const demoPage = {
  seo: {
    title: "Demo Lab: Interview Your AI Team | Techieficial",
    description: "Call the AI Receptionist, test the Lead Responder and see what the system does after every call. Or book a test build for your business.",
  },
  title: "Interview your AI team before you hire it.",
  intro: "Call the AI Receptionist, test the Lead Responder and see what the system does after every call.",
  noPhoneButton: "Book a live demo",
  tabsLabel: "Demo Lab",
  tabs: {
    live: "Call the AI Receptionist",
    chat: "Test the Lead Responder",
    watch: "Watch it work",
    build: "Book a test build",
  },
  live: {
    callTitle: "Call the AI Receptionist",
    tipsTitle: "Interview tips",
    tips: ["Ask for a booking tomorrow morning.", "Say it's an emergency.", "Ask a price question.", "Ask if it's a robot."],
    callMeTitle: "Have it call me",
    callMeBody: "Enter your details and the AI Receptionist will call you in a moment.",
    callMeSubmit: "Call me now",
    whatHappened: "What just happened",
    steps: ["The call was logged in the CRM.", "The caller was tagged.", "A confirmation text was sent.", "The owner got a summary."],
  },
  chat: {
    title: "Test the Lead Responder",
    tip: "Pretend you filled in a quote form. See how fast it replies and what it asks.",
    button: "Start the chat",
    loaded: "Chat is open, see the bottom corner",
  },
  watchTitle: "Watch it work",
  build: {
    title: "Book a test build",
    intro: "Want to hear it with your business name and your services? We'll set up a test version for your business.",
    submit: "Send and pick a time",
    calendarTitle: "Test Build Session calendar",
  },
  galleryTitle: "AI video samples",
  galleryAll: "All",
};

/** Labels used on offer cards and price boxes. Page copy for /offers lives in content/offers.ts. */
export const pricingPage = {
  popular: "Most popular",
  draftNote: "Draft pricing",
  checkoutSoon: "Checkout opens soon",
  oneTimeLabel: "One-time",
  includes: "What is included",
  minimumLabel: "Minimum term",
  setup: "Setup from",
  monthly: "Monthly from",
};

export const workPage = {
  seo: {
    title: "Work | Techieficial",
    description: "Case studies of CRM automation, AI agents, ads and video built by Techieficial, with the real results they delivered.",
  },
  title: "Our work",
  intro: "Real projects, real numbers.",
  filterAll: "All services",
};

export const agenciesPage = {
  seo: {
    title: "White-Label Fulfillment for Agencies | Techieficial",
    description: "CRM builds, AI agents and AI video delivered under your agency's brand. Sell more services without hiring a build team.",
  },
  title: "Sell AI teams under your brand. We build them.",
  intro: "We deliver AI Receptionists, AI Front Offices, CRM builds and AI video under your brand, with full white-label and NDA. You own the relationship, we do the fulfillment.",
  offerTitle: "What we build for you",
  offer: [
    { title: "CRM builds", body: "Pipelines, automations, booking and reporting for your clients." },
    { title: "AI Receptionists and AI Front Offices", body: "AI teams that answer, follow up and book for each of your clients." },
    { title: "AI video", body: "Ad creatives, UGC-style ads and explainers in your clients' brand." },
  ],
  howTitle: "How it works",
  how: [
    { title: "Partner call", body: "We learn about your agency, your clients and the services you want to offer." },
    { title: "Client brief", body: "You send us a brief for each client project using a simple template." },
    { title: "We build", body: "We build and test the system under your brand, with updates along the way." },
    { title: "You deliver", body: "You present the work to your client. We stay in the background for support." },
  ],
  promiseTitle: "White-label promise",
  promise: [
    "Everything is delivered under your agency's brand.",
    "We never contact your clients unless you ask us to.",
    "We sign an NDA before we see any client details.",
    "Your clients and pricing stay yours.",
  ],
  partnerIntro: "Tell us about your agency and the services you want to offer. We will reply within one business day.",
};

export const academyPage = {
  seo: {
    title: "Academy: Train Your Humans | Techieficial",
    description: "Courses, mentorship and corporate training on running a business with AI employees, from the people who build them. Join the waitlist.",
  },
  title: "Your AI team is ready. Is your human team?",
  intro: "Courses, mentorship and corporate training on running a business with AI employees, from the people who build them.",
  comingTitle: "Coming soon",
  coming: [
    { title: "Self-paced course", body: "Step-by-step lessons on CRM automation, AI agents and AI video." },
    { title: "Community", body: "A place to ask questions and share builds with other learners." },
    { title: "1:1 mentorship", body: "Personal guidance while you build your first real projects." },
    { title: "Corporate training", body: "Workshops for teams that want to use AI well at work." },
  ],
  forWho: "For virtual assistants, career switchers, freelancers and teams.",
  waitlistTitle: "Join the waitlist",
  waitlistBody: "Be first to hear when the Academy opens.",
  waitlistSuccess: "You are on the list. We will email you when the Academy opens.",
};

export const aboutPage = {
  seo: {
    title: "About | Techieficial",
    description: "Techieficial builds, trains and manages AI teams for service businesses in the US, UK, Canada, Australia and New Zealand.",
  },
  title: "Built by a builder.",
  intro: "Techieficial builds, trains and manages AI teams for service businesses.",
  /** Founder story (docs/SITE_CONTENT_V3.md 2.13). DRAFT: hidden until the owner approves it and supplies a photo. */
  founderApproved: false,
  founderTitle: "The founder",
  founder: [
    "Techieficial was founded by Abdulmujeeb Iyanda. He started in IT, troubleshooting systems and hardware, then moved into web and funnel design, and for the last 4+ years has specialized in CRM builds and automation.",
    "He has built CRM and automation systems for more than 13 clients across the US, UK, Canada, Australia and New Zealand, each one designed and delivered personally. The same problem came up again and again: good businesses losing leads to missed calls, slow replies and follow-up nobody had time for.",
    "Techieficial packages the fix as an AI team you can hire, built and managed by someone who has done the work by hand.",
  ],
  howTitle: "How we work",
  how: ["We build it ourselves.", "We test before anything goes live.", "We tell you what the AI can't do.", "We report every month."],
  countriesTitle: "Where we work",
  countriesBody: "We have delivered CRM and automation systems for 13+ clients across these countries:",
};

export const contactPage = {
  seo: {
    title: "Book a Strategy Call | Techieficial",
    description: "Book a strategy call with Techieficial. We look at how leads reach you today and show you what we would build first.",
  },
  title: "Let's map your AI team.",
  intro: "Book a 30-minute strategy call. You'll leave with a clear plan for where your leads are slipping, whether or not we work together.",
  supportLabel: "Existing clients",
  formTitle: "Tell us about your business",
  calendarTitle: "Pick a time",
  otherWays: "Other ways to reach us",
  selectionTitle: "Your choices",
  submit: "Book my strategy call",
};

export const faqPage = {
  seo: {
    title: "FAQ | Techieficial",
    description: "Answers about Techieficial's services, pricing, process, AI and data, and contracts.",
  },
  title: "Frequently asked questions",
  intro: "Cannot find your answer? Book a strategy call and ask us directly.",
};

export const blogPage = {
  seo: {
    title: "Blog | Techieficial",
    description: "Practical guides on CRM automation, AI agents, ads and AI video for service businesses.",
  },
  title: "Blog",
  intro: "Practical guides on answering every lead, automating follow-up and using AI well.",
  toc: "On this page",
  related: "Related articles",
  minRead: "min read",
};

/** After a payment link purchase (docs/SITE_CONTENT_V3.md 2.16). Point the CRM payment links' success URL here. */
export const purchaseThanks = {
  seo: { title: "Payment Received | Techieficial", description: "Payment received. Welcome to Techieficial. Here is what happens next." },
  title: "Payment received. Welcome to Techieficial.",
  intro: "Here is what happens next.",
  steps: [
    { title: "Onboarding email", body: "Within 1 business day from support@techieficial.com." },
    { title: "Playbook buyers", body: "Check your email for the download link." },
  ],
};

export const thankYouPage = {
  seo: {
    title: "Thank You | Techieficial",
    description: "Thanks for getting in touch with Techieficial. Here is what happens next.",
  },
  title: "You're booked.",
  intro: "Here is what happens next.",
  steps: [
    { title: "Check your email", body: "Your meeting link is on its way." },
    { title: "Have your numbers in mind", body: "Your website and a recent busy week, so we can see where leads slip." },
  ],
  /** Shown only once the demo number exists. */
  callStep: { title: "Call the AI before we meet", body: "Hear what your customers would hear." },
  explore: "Before we meet",
  demoLink: "Interview the AI team in the Demo Lab",
  workLink: "See our work",
  blogLink: "Read the blog",
};

export const notFoundPage = {
  seoTitle: "Page not found | Techieficial",
  title: "This page does not exist.",
  body: "It may have moved, or the link may be wrong. These pages are a good place to start:",
  links: [
    { label: "Services", href: "/services" },
    { label: "Demo Lab", href: "/demo" },
    { label: "Offers", href: "/offers" },
    { label: "Book a strategy call", href: "/contact" },
  ],
};

export const forms = {
  name: "Your name",
  email: "Work email",
  phone: "Mobile number",
  businessType: "Type of business",
  businessTypes: ["Home services", "Dental or med spa", "Legal", "Real estate", "Agency", "E-commerce", "Other"],
  goal: "Main goal",
  goals: ["Stop missing leads", "Get more leads", "Make more content", "Train my team", "White-label for my agency"],
  budget: "Monthly budget",
  budgets: ["Under $1,000", "$1,000 to $3,000", "$3,000 to $10,000", "$10,000+"],
  message: "Anything else we should know?",
  smsConsent:
    "I agree to receive text messages from Techieficial about my enquiry. Message frequency varies. Message and data rates may apply. Reply STOP to cancel, HELP for help.",
  smsLink: "SMS terms",
  optional: "optional",
  submit: "Send",
  sending: "Sending...",
  errorGeneric: "Your message was not sent. Please try again in a moment.",
  errorRequired: "This field is required.",
  errorEmail: "Enter a valid email address, like you@company.com.",
  errorPhone: "Enter a valid phone number, including country code.",
  success: "Thanks, we have your details.",
  company: "Business name",
  siteUrl: "Website",
  city: "Main city",
  problem: "Biggest problem",
  role: "I'm a...",
  roles: ["Business owner", "Employee", "VA or freelancer", "Agency"],
  chooseOne: "Choose one",
};

export const cookieBanner = {
  title: "Cookies",
  body: "We use necessary cookies to run the site. With your permission we also use analytics and marketing cookies to improve the site and measure our ads.",
  accept: "Accept all",
  reject: "Reject optional",
  prefs: "Preferences",
  save: "Save choices",
  analytics: "Analytics",
  analyticsBody: "Google Analytics and Microsoft Clarity help us understand how the site is used.",
  marketing: "Marketing",
  marketingBody: "The Meta Pixel measures the results of our ads.",
  necessary: "Necessary",
  necessaryBody: "Required for the site to work. Always on.",
  policy: "Cookie policy",
};

/** Small interface labels used across pages. */
export const ui = {
  allServices: "All services",
  source: "Source",
  opensNewTab: "(opens in a new tab)",
  explore: "Explore",
  readCaseStudy: "Read the case study",
  chooseOne: "Choose one",
  seeDemo: "See the demo",
  painsTitle: "Sound familiar?",
  buildTitle: "What we build",
  demoTitle: "See it working",
  processTitle: "From kickoff to launch",
  resultsTitle: "Results",
  pricingTitle: "Pricing",
  pricingFrom: "Included in the {package}, from {setup} setup and {monthly} a month. Phone, SMS and email usage billed at cost.",
  pricingLink: "See all offers",
  startSmaller: "Want to start smaller? Begin with the AI Receptionist Starter and add the rest of the team later.",
  faqTitle: "Questions about",
  relatedServices: "Related services",
  relatedIndustries: "Industries we build this for",
  workflowTitle: "How the system works",
  recommendedTitle: "Recommended package",
  servicesForTitle: "Services for",
  published: "Published",
  updated: "Updated",
  lastUpdated: "Last updated",
  platforms: "Platforms",
  comingSoon: "coming soon",
  newTab: "(opens in a new tab)",
  sourceLabel: "Source",
  results: "Results",
  whatWeBuilt: "What we built",
  problem: "The problem",
  servicesUsed: "Services used",
  demoCallBody: "Call our AI receptionist and hear it answer, qualify and book.",
  demoLabBody: "Visit the Demo Lab to test the system and book a test build for your business.",
  demoLab: "Demo Lab",
  serviceCtaTitle: "Ready to see {name} working for your business?",
  serviceCtaBody: "Book a strategy call and we will show you what we would build first.",
  industryCtaTitle: "Ready to build this for your business?",
};
