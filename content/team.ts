/**
 * The AI team (docs/SITE_CONTENT_V3.md sections 2.1 to 2.3). Status: needs-review.
 * Used by the homepage wheel and cards, /ai-team and the 4 profile pages.
 */
import type { OfferSlug } from "./pricing";

export type TeamSlug = "receptionist" | "lead-responder" | "follow-up-agent" | "reviews-agent";

export type TeamMember = {
  slug: TeamSlug;
  /** Full role, e.g. "AI Receptionist". */
  name: string;
  /** Short label for the wheel and chips. */
  short: string;
  /** Profile page title when it differs from the name. */
  profileName?: string;
  icon: string;
  /** One line on what it does (wheel, menu). */
  line: string;
  /** 3 skills for cards. */
  cardSkills: string[];
  replaces: string;
  seo: { title: string; description: string };
  h1: string;
  job: string;
  skills: string[];
  /** "A day in the life" moments (optional). */
  day?: { time: string; text: string }[];
  never?: string;
  hire: { text: string; offers: OfferSlug[] };
  faqs?: { q: string; a: string }[];
};

export const team: TeamMember[] = [
  {
    slug: "receptionist",
    name: "AI Receptionist",
    short: "Receptionist",
    icon: "Phone",
    line: "Answers every call, books jobs and transfers emergencies.",
    cardSkills: ["Answers every call", "Books into your calendar", "Transfers urgent calls to you"],
    replaces: "Voicemail and missed calls.",
    seo: {
      title: "AI Receptionist for Service Businesses | Techieficial",
      description: "An AI Receptionist that answers every call 24/7, books callers into your calendar, transfers emergencies and sends you a summary.",
    },
    h1: "Your AI Receptionist answers every call. Even at 2 AM.",
    job: "Answers your business line on the first ring, day and night. Finds out what the caller needs, books them into your calendar and sends you a summary. Urgent calls get transferred to you.",
    skills: [
      "Answers inbound calls 24/7, including weekends and holidays",
      "Qualifies callers: what they need, where they are, how urgent it is",
      "Books appointments into your calendar, with text and email confirmations",
      "Transfers emergencies to you or your on-call number",
      "Takes messages and answers common questions from your knowledge base",
      "Sends you an instant summary of every call",
    ],
    day: [
      { time: "6:58 AM", text: "Books a leak repair before you've had coffee." },
      { time: "12:30 PM", text: "Answers three calls while your team is on jobs." },
      { time: "9:15 PM", text: "Spots \"burst pipe\" and transfers the caller to your on-call tech." },
    ],
    never: "Quote prices you haven't approved, promise times you can't keep, or argue with a customer.",
    hire: { text: "On its own as the AI Receptionist Starter, or as part of the AI Front Office.", offers: ["ai-receptionist-starter", "ai-front-office"] },
    faqs: [
      { q: "Does it use my existing number?", a: "Yes. We can forward your current number to it or set up a new one." },
      { q: "What languages?", a: "English and Spanish." },
      { q: "Can I listen to calls?", a: "Yes. Every call is recorded and transcribed in your CRM." },
    ],
  },
  {
    slug: "lead-responder",
    name: "AI Lead Responder",
    short: "Leads",
    icon: "ChatCircle",
    line: "Replies to web, ad and social leads in under a minute.",
    cardSkills: ["Replies in under a minute on SMS, web chat, Facebook and Instagram", "Qualifies leads", "Books them into your calendar"],
    replaces: "Leads waiting hours for a reply.",
    seo: {
      title: "AI Lead Responder | Techieficial",
      description: "Every web, ad and social lead gets a reply in under a minute. The AI Lead Responder qualifies leads and books them into your calendar.",
    },
    h1: "Every web, ad and social lead gets a reply in under a minute.",
    job: "Watches every place leads come in: website forms, chat, Facebook and Instagram messages, ad lead forms. Replies in under a minute, asks the right questions and books qualified leads into your calendar.",
    skills: [
      "Replies by SMS, web chat, Facebook Messenger and Instagram DMs",
      "Qualifies with your questions: service, location, timing, budget",
      "Books straight into your calendar",
      "Hands the conversation to you whenever you want to step in",
      "Tracks which source each lead came from",
    ],
    never: "Spam people who didn't ask to hear from you. It only messages leads who contacted you or opted in.",
    hire: { text: "Part of the AI Front Office.", offers: ["ai-front-office"] },
  },
  {
    slug: "follow-up-agent",
    name: "AI Follow-up Agent",
    short: "Follow-up",
    profileName: "AI Follow-up and Reactivation Agent",
    icon: "ArrowsClockwise",
    line: "Chases unbooked leads, open quotes and no-shows.",
    cardSkills: ["Chases unbooked leads and open quotes", "Recovers no-shows", "Wakes up old customers"],
    replaces: "The follow-up nobody has time for.",
    seo: {
      title: "AI Follow-up and Reactivation Agent | Techieficial",
      description: "The follow-up you never have time for, done every day: unbooked leads, quiet quotes, no-shows and past customers.",
    },
    h1: "The follow-up you never have time for, done every day.",
    job: "Chases every lead that didn't book, every quote that went quiet and every no-show. Once a quarter it reaches out to past customers so they come back to you instead of searching again.",
    skills: [
      "14-day follow-up for leads who didn't book (SMS and email)",
      "Quote follow-up until the customer says yes or no",
      "No-show recovery and rebooking",
      "Reactivation campaigns to your past customers and old leads",
      "Stops the moment someone replies, books or opts out",
    ],
    hire: { text: "Part of the AI Front Office. One-time database reactivation is also available as an add-on.", offers: ["ai-front-office"] },
  },
  {
    slug: "reviews-agent",
    name: "AI Reviews Agent",
    short: "Reviews",
    icon: "Star",
    line: "Asks for reviews after every job.",
    cardSkills: ["Asks for reviews after every job", "Drafts replies", "Catches unhappy customers before they post"],
    replaces: "\"We should really ask for reviews.\"",
    seo: {
      title: "AI Reviews Agent | Techieficial",
      description: "More 5-star reviews, without asking awkwardly. Review requests after every job, with unhappy customers routed to you privately.",
    },
    h1: "More 5-star reviews, without asking awkwardly.",
    job: "After every completed job, it asks your customer how it went. Happy customers get a one-tap link to leave a Google review. Unhappy ones are routed to you privately so you can fix it first.",
    skills: [
      "Sends review requests after every job, automatically",
      "Routes unhappy feedback to you before it goes public",
      "Drafts replies to new reviews for you to approve",
      "Reminds customers who didn't respond, once",
    ],
    hire: { text: "Part of the AI Front Office.", offers: ["ai-front-office"] },
  },
];

export const teamUrl = (slug: TeamSlug) => `/ai-team/${slug}`;

/** The fifth wheel segment: services that bring more leads to the team. */
export const growthAddOns = {
  name: "Growth add-ons",
  short: "Add-ons",
  icon: "Megaphone",
  line: "Paid ads and AI video that bring more leads to your AI team.",
  skills: ["Paid ads with leads sent straight to your CRM", "AI video ad creatives", "Included in the AI Growth Team"],
  href: "/services",
  linkLabel: "See more services",
};

export const teamCopy = {
  worksLabel: "Works",
  works: "24/7",
  replacesLabel: "Replaces",
  viewProfile: "View profile",
  wheelLabel: "Your AI team",
  hub: "Your business",
};

/** /ai-team page (docs/SITE_CONTENT_V3.md 2.2) and profile template labels (2.3). */
export const teamPage = {
  seo: {
    title: "Meet Your AI Team | Techieficial",
    description: "AI Receptionist, Lead Responder, Follow-up Agent and Reviews Agent. Hire one or the whole team, built and managed for you.",
  },
  title: "Four AI employees. One front office that never closes.",
  intro: "Hire one to fix your biggest leak, or hire the whole team and let every lead get answered, followed up and booked.",
  cardsTitle: "The team",
  includedIn: "Included in AI Front Office",
  alsoAlone: "Also sold alone as the AI Receptionist Starter",
  flowTitle: "How they work together",
  flow: [
    "A call or lead comes in.",
    "The AI Receptionist or AI Lead Responder answers.",
    "The booking lands in your calendar.",
    "The AI Follow-up Agent chases anyone who didn't book.",
    "The AI Reviews Agent asks for a review after the job.",
  ],
  flowNote: "Everything is logged in your CRM.",
  comesWithTitle: "What every AI employee comes with",
  comesWith: [
    { title: "Trained on your business", body: "Services, prices policy, hours, service area and FAQs." },
    { title: "Your rules", body: "What to book, what to escalate, what never to say." },
    { title: "A manager", body: "We review conversations every week and keep improving them." },
    { title: "Everything logged in your CRM", body: "So nothing is lost." },
  ],
  hireWholeTeam: "Hire the whole team",
  profile: {
    breadcrumb: "AI Team",
    reportsTo: "Reports to",
    reportsToValue: "you",
    livesIn: "Lives in",
    livesInValue: "your CRM",
    jobTitle: "Job description",
    skillsTitle: "Skills",
    dayTitle: "A day in the life",
    neverTitle: "What it never does",
    hireTitle: "How to hire",
    faqTitle: "Questions",
    ctaTitle: "Your next lead is calling. Who's answering?",
  },
};
