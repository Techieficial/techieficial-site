/** Copy for every page other than home, services, industries, blog and legal. Status: needs-review. */

export const nav = {
  servicesLabel: "Services",
  links: [
    { label: "Demo Lab", href: "/demo" },
    { label: "Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "Academy", href: "/academy" },
  ],
  byIndustry: "By industry",
  agencies: "Agencies",
  featured: {
    title: "See the growth engine in action",
    body: "Test our AI receptionist and see what happens in the CRM.",
    href: "/demo",
  },
  skipLink: "Skip to content",
};

export const footer = {
  ctaTitle: "Ready to build your growth engine?",
  newsletter: {
    title: "1 automation idea every week",
    inputLabel: "Your email",
    button: "Subscribe",
    success: "You are subscribed. Look out for the first email.",
  },
  columns: {
    services: "Services",
    industries: "Industries",
    resources: "Resources",
    academy: "Academy",
    company: "Company",
  },
  academyLinks: [
    { label: "Academy", href: "/academy" },
    { label: "Corporate training", href: "/services/training" },
    { label: "Mentorship", href: "/services/training#deliverables" },
  ],
  companyLinks: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Agencies and white label", href: "/agencies" },
  ],
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
  seo: {
    title: "Services | Techieficial",
    description: "Marketing automation, paid ads, AI video, AI agents and training, planned and run as one growth engine.",
  },
  title: "Five services, one growth engine.",
  intro: "Each service works on its own. Together, they turn attention into booked work without leads falling through the cracks.",
  connectTitle: "How the services connect",
  connect: [
    { from: "ai-video", to: "paid-ads", label: "Video feeds your ads with fresh creative." },
    { from: "paid-ads", to: "marketing-automation", label: "Ads send every lead straight into the CRM." },
    { from: "ai-agents", to: "marketing-automation", label: "AI agents answer, qualify and book, then log it in the CRM." },
    { from: "training", to: "marketing-automation", label: "Training hands the system over to your team." },
  ],
  packagesTitle: "Compare packages",
};

export const demoPage = {
  seo: {
    title: "Demo Lab | Techieficial",
    description: "Test our AI receptionist live, watch the system at work and see AI video samples. Or book a test build for your business.",
  },
  title: "Don't take our word for it. Test it.",
  intro: "Call our AI receptionist, see what happens in the CRM, and book a test build for your own business.",
  tabs: {
    live: "Try it live",
    watch: "Watch it work",
    gallery: "AI content gallery",
    build: "Book a test build",
  },
  live: {
    callTitle: "Call the AI receptionist",
    callBody: "Ask about prices, opening hours or booking a time. It answers like a real front desk.",
    callMeTitle: "Or have it call you",
    callMeBody: "Enter your details and the AI receptionist will call you in a moment.",
    callMeSubmit: "Call me now",
    chatButton: "Chat with the AI agent",
    chatLoaded: "Chat is open, see the bottom corner",
    whatHappened: "What happens after the call",
    steps: [
      "The call is logged in the CRM with a summary",
      "Your details are tagged by interest",
      "A follow-up text is sent to you",
      "A task is created for the team",
    ],
  },
  build: {
    title: "Book a test build",
    intro: "Tell us about your business and we will scope a test build of an AI agent or marketing automation for you.",
  },
  galleryAll: "All",
};

export const pricingPage = {
  seo: {
    title: "Pricing | Techieficial",
    description: "Starting prices for the Capture, Convert and Dominate packages, plus the Engine Builder to find the right fit for your business.",
  },
  title: "Simple packages. A fixed quote before we start.",
  intro: "Every package has a one-time setup fee and a monthly fee. Use the Engine Builder to find your fit.",
  builder: {
    title: "Engine Builder",
    step1: "Which services do you need?",
    step2: "How big is your team?",
    step3: "What is your main goal?",
    resultTitle: "Recommended for you",
    setup: "Setup from",
    monthly: "Monthly from",
    next: "Next",
    back: "Back",
    restart: "Start again",
    stepOf: "Step {n} of 3",
    pickHint: "Pick one or more.",
    includes: "What is included",
    selectionNote: "Your choices are added to the booking form.",
  },
  packagesTitle: "Packages",
  coversTitle: "What your monthly fee covers",
  faqTitle: "Pricing questions",
  popular: "Most popular",
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
  title: "Your brand. Our build team.",
  intro: "We build CRM systems, AI agents and AI video for your clients, under your agency's name. You own the relationship, we do the fulfillment.",
  offerTitle: "What we build for you",
  offer: [
    { title: "CRM builds", body: "Pipelines, automations, booking and reporting for your clients." },
    { title: "AI agents", body: "Voice receptionists, chat agents and lead qualifiers, set up for each client." },
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
    title: "Academy | Techieficial",
    description: "Learn to build CRM automations, AI agents and AI video from the team that builds them for clients. Join the Academy waitlist.",
  },
  title: "Learn the systems we build for clients.",
  intro: "The Techieficial Academy is coming soon. Join the waitlist to hear first when courses, mentorship and the community open.",
  comingTitle: "What is coming",
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
    description: "Techieficial is an AI growth agency that plans and runs marketing automation, ads, AI video, AI agents and training as one system.",
  },
  title: "We build growth engines, not one-off projects.",
  intro: "Techieficial is an AI growth agency. We plan and run marketing automation, paid ads, AI video, AI agents and training as one connected system.",
  valuesTitle: "What we believe",
  values: [
    { title: "Systems over tactics", body: "A single campaign fades. A connected system keeps working." },
    { title: "Speed wins", body: "The first business to reply often wins the customer. We build for speed." },
    { title: "Plain language", body: "No jargon, no hype. You always know what we are building and why." },
    { title: "Prove it", body: "We show you the system working before we ask you to trust it." },
  ],
  howTitle: "How we work",
  how: [
    "One team plans every service together, so nothing is built in isolation.",
    "We test every path end to end before anything goes live.",
    "We keep improving the system after launch and report on it every month.",
  ],
  countriesTitle: "Where we work",
  countriesBody: "We have delivered CRM and automation systems for 13+ clients across these countries:",
};

export const contactPage = {
  seo: {
    title: "Book a Demo | Techieficial",
    description: "Book a demo with Techieficial. We look at how leads reach you today and show you what we would build first.",
  },
  title: "Book a demo.",
  intro: "Tell us about your business. We will look at how leads reach you today and show you what we would build first.",
  formTitle: "Tell us about your business",
  calendarTitle: "Pick a time",
  otherWays: "Other ways to reach us",
  selectionTitle: "Your Engine Builder choices",
  submit: "Book my demo",
};

export const faqPage = {
  seo: {
    title: "FAQ | Techieficial",
    description: "Answers about Techieficial's services, pricing, process, AI and data, and contracts.",
  },
  title: "Frequently asked questions",
  intro: "Cannot find your answer? Book a demo and ask us directly.",
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

export const thankYouPage = {
  seo: {
    title: "Thank You | Techieficial",
    description: "Thanks for getting in touch with Techieficial. Here is what happens next.",
  },
  title: "Thanks, we have your details.",
  intro: "Here is what happens next.",
  steps: [
    { title: "We review your details", body: "We look at your business and how leads reach you today." },
    { title: "You get a confirmation", body: "If you booked a time, a confirmation and reminder are on their way." },
    { title: "We meet", body: "On the call we show you what we would build first and answer your questions." },
  ],
  prepTitle: "To get the most from the call",
  prep: [
    "Know roughly how many calls, forms and messages you get each month",
    "List the tools you use today, such as your CRM, calendar and ad accounts",
    "Think about the one problem you most want fixed",
  ],
  explore: "While you wait",
  demoLink: "Try the Demo Lab",
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
    { label: "Pricing", href: "/pricing" },
    { label: "Book a demo", href: "/contact" },
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
  testBuild: {
    type: "What should we build?",
    types: ["AI agent", "Marketing automation"],
    questions: [
      { name: "leads", label: "How do most leads reach you today?" },
      { name: "volume", label: "Roughly how many enquiries do you get each month?" },
      { name: "tools", label: "Which tools do you use today?" },
      { name: "problem", label: "What is the biggest problem you want fixed?" },
      { name: "success", label: "What would success look like in 90 days?" },
    ],
  },
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
  pricingFrom: "Included in the {package} package, from {setup} setup and {monthly} a month.",
  pricingLink: "See all packages",
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
  results: "Results",
  whatWeBuilt: "What we built",
  problem: "The problem",
  servicesUsed: "Services used",
  demoCallBody: "Call our AI receptionist and hear it answer, qualify and book.",
  demoLabBody: "Visit the Demo Lab to test the system and book a test build for your business.",
  demoLab: "Demo Lab",
  serviceCtaTitle: "Ready to see {name} working for your business?",
  serviceCtaBody: "Book a demo and we will show you what we would build first.",
  industryCtaTitle: "Ready to build this for your business?",
};
