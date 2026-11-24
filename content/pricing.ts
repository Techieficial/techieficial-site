/**
 * Offers, add-ons and prices (v3). Source: docs/SITE_CONTENT_V3.md section 2.4 and docs/CRM_SETUP.md.
 * Status: DRAFT. The owner is confirming every price. Change a price here and it changes everywhere.
 */
import type { ServiceSlug } from "@/site.config";

/** Prices are drafts until the owner confirms them. Drafts show a small note on preview builds only. */
export const pricesFinal = false;

/** Shown next to every monthly price. */
export const usageNote = "Phone, SMS and email usage billed at cost.";

export type OfferSlug =
  | "ai-growth-team"
  | "ai-front-office"
  | "ai-receptionist-starter"
  | "crm-workspace"
  | "missed-call-text-back"
  | "ai-receptionist-playbook";

export type Offer = {
  slug: OfferSlug;
  name: string;
  /** One line under the name. */
  tagline: string;
  /** "Best for" line on the offers ladder. */
  bestFor: string;
  /** Prices in US dollars. Leave out what does not apply. */
  setup?: number;
  monthly?: number;
  oneTime?: number;
  /** Prices start here and can go up ("From $7,500"). */
  from?: boolean;
  /** Extra line under the monthly price, e.g. "plus ad spend". */
  monthlyNote?: string;
  minimumTerm?: string;
  /** "call": Demo Lab, then strategy call ($3,000 and up). "checkout": CRM payment link. */
  path: "call" | "checkout";
  /** CRM payment link (checkout offers only). Used only while siteConfig.checkoutLive is true. */
  paymentLink?: string;
  checkoutLabel?: "Get started" | "Buy now";
  /** Optional: a higher crossed-out price, and a limited-time line (no timers). */
  compareAtPrice?: number;
  limitedOffer?: string;
  /** Monthly fee when the client already has their own CRM account (AI Front Office). */
  ownCrmMonthly?: number;
  /** Optional quick-start setup fee (CRM Workspace). */
  quickStart?: number;
  popular?: boolean;
  draft: boolean;
  /** Short list for cards. */
  includes: string[];
  /** Old package key this offer replaces (Capture, Convert, Dominate), used by older pages until they are rebuilt. */
  replaces?: "capture" | "convert" | "dominate";
  services: ServiceSlug[];
};

export const offers: Offer[] = [
  {
    slug: "ai-growth-team",
    name: "AI Growth Team",
    tagline: "The AI team plus ads and AI video to fill it with leads.",
    bestFor: "Businesses that need more leads, not just better handling",
    setup: 7500,
    monthly: 2500,
    from: true,
    monthlyNote: "plus ad spend",
    minimumTerm: "3-month minimum",
    path: "call",
    draft: true,
    includes: ["Everything in AI Front Office", "Paid ads setup and management", "AI video and static ad creatives", "1 custom back-office AI agent", "2 team training workshops"],
    replaces: "dominate",
    services: ["ai-agents", "marketing-automation", "paid-ads", "ai-video", "training"],
  },
  {
    slug: "ai-front-office",
    name: "AI Front Office",
    tagline: "The full 4-person AI team.",
    bestFor: "Every lead answered, followed up and booked",
    setup: 3500,
    monthly: 1297,
    minimumTerm: "3-month minimum",
    ownCrmMonthly: 997,
    path: "call",
    popular: true,
    draft: true,
    includes: ["AI Receptionist", "AI Lead Responder", "AI Follow-up Agent", "AI Reviews Agent", "Your CRM, set up and managed"],
    replaces: "convert",
    services: ["ai-agents", "marketing-automation"],
  },
  {
    slug: "ai-receptionist-starter",
    name: "AI Receptionist Starter",
    tagline: "Never miss a call again.",
    bestFor: "Owners who miss calls but aren't ready for the full team",
    setup: 1497,
    monthly: 497,
    path: "checkout",
    paymentLink: "https://link.fastpaydirect.com/payment-link/6b05af0a21a48a3872d28e4b",
    checkoutLabel: "Get started",
    draft: true,
    includes: ["1 AI Receptionist trained on your business", "Answers, books and transfers urgent calls", "Missed-call text-back", "Instant call summaries", "Live in 7 to 10 business days"],
    replaces: "capture",
    services: ["ai-agents", "marketing-automation"],
  },
  {
    slug: "crm-workspace",
    name: "CRM Workspace",
    tagline: "Your own CRM, hosted and supported.",
    bestFor: "A hosted, supported CRM without AI",
    monthly: 197,
    quickStart: 297,
    path: "checkout",
    paymentLink: "https://link.fastpaydirect.com/payment-link/6b05aee6906a8b62055d9462",
    checkoutLabel: "Get started",
    draft: true,
    includes: ["Contacts, pipeline and calendars", "One inbox for SMS, email and social", "Forms, website builder and review tools", "Mobile app", "Optional quick-start setup for $297"],
    services: ["marketing-automation"],
  },
  {
    slug: "missed-call-text-back",
    name: "Missed-Call Text-Back Setup",
    tagline: "Turn missed calls into conversations.",
    bestFor: "A quick fix for missed calls",
    oneTime: 297,
    path: "checkout",
    paymentLink: "https://link.fastpaydirect.com/payment-link/6b05aec4906a8b62055d9461",
    checkoutLabel: "Buy now",
    draft: true,
    includes: ["Instant text to every missed call", "A short reply flow", "Owner alerts", "Tested before launch", "Live in 3 business days"],
    services: ["marketing-automation"],
  },
  {
    slug: "ai-receptionist-playbook",
    name: "AI Receptionist Playbook",
    tagline: "Build your own AI receptionist the way we build ours.",
    bestFor: "Do-it-yourselfers",
    oneTime: 97,
    path: "checkout",
    paymentLink: "https://link.fastpaydirect.com/payment-link/6b05ae96906a8b62055d945e",
    checkoutLabel: "Buy now",
    draft: true,
    includes: ["Call script", "Knowledge-base template", "FAQ list", "Call-flow map", "Prompt pack"],
    services: ["ai-agents"],
  },
];

export const offerBySlug = (slug: OfferSlug) => offers.find((o) => o.slug === slug)!;

/** The 3 offers previewed on the homepage and hub pages. */
export const featuredOffers = (["ai-receptionist-starter", "ai-front-office", "ai-growth-team"] as const).map(offerBySlug);

/** Maps an old package key (still in service and industry content) to the offer that replaced it. */
export const offerForPackage = (key: string) => offers.find((o) => o.replaces === key);

export type AddOn = { name: string; setup?: number; monthly?: number; oneTime?: number; from?: boolean; usage?: boolean; draft: boolean };

export const addOns: AddOn[] = [
  { name: "Extra AI employee (for example an outbound caller)", setup: 750, monthly: 197, usage: true, draft: true },
  { name: "Extra location or calendar", setup: 497, monthly: 197, draft: true },
  { name: "Spanish-language line", setup: 497, draft: true },
  { name: "Database reactivation campaign (one-time)", oneTime: 997, draft: true },
  { name: "AI video pack (5 videos)", oneTime: 497, draft: true },
  { name: "Team AI workshop (90 minutes)", oneTime: 497, draft: true },
  { name: "Field-service software connection", oneTime: 750, from: true, draft: true },
];

export const monthlyCovers = [
  "CRM platform and AI plan",
  "Monitoring of every AI employee and automation",
  "Ongoing tuning of scripts and knowledge base",
  "Workflow fixes and improvements",
  "Support",
  "A monthly report: calls answered, leads booked and revenue recovered",
];

export const pricingFaqs = [
  {
    q: "Why a setup fee?",
    a: "It covers the build: your CRM, training each AI employee on your business, connecting your calendar and testing every scenario.",
  },
  {
    q: "What does \"usage at cost\" mean?",
    a: "Calls, texts and emails have small per-use charges from the phone and email networks. We pass them to you at cost, with no markup.",
  },
  {
    q: "Is there a contract?",
    a: "The AI Front Office and AI Growth Team have a 3-month minimum. The others are month to month.",
  },
  {
    q: "Do you work with businesses outside the US?",
    a: "Yes. We work with clients in the US, UK, Canada, Australia and New Zealand.",
  },
];

/* ---------- Team Builder ---------- */

/**
 * Team Builder rules (docs/SITE_CONTENT_V3.md 2.4): "Not enough leads" points to the AI Growth Team;
 * only missed calls points to the AI Receptionist Starter; anything else (2 or more problems, or one
 * problem only the full team solves) points to the AI Front Office.
 */
export function recommendOffer(problems: string[]): Offer {
  if (problems.includes("leads")) return offerBySlug("ai-growth-team");
  if (problems.length === 1 && problems[0] === "missed-calls") return offerBySlug("ai-receptionist-starter");
  return offerBySlug("ai-front-office");
}

export const formatUsd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Price values for an offer card. The card labels already say "Setup from" and "Monthly from". */
export function priceParts(o: { setup?: number; monthly?: number; oneTime?: number }) {
  return {
    setup: o.setup !== undefined ? formatUsd(o.setup) : undefined,
    monthly: o.monthly !== undefined ? `${formatUsd(o.monthly)}/mo` : undefined,
    oneTime: o.oneTime !== undefined ? formatUsd(o.oneTime) : undefined,
  };
}

/** Fills price tokens in copy ({ownCrmMonthly}, {quickStart}) from the offer, so prices live only here. */
export function fillPrices(text: string, o: Offer) {
  return text
    .replace("{ownCrmMonthly}", o.ownCrmMonthly !== undefined ? formatUsd(o.ownCrmMonthly) : "")
    .replace("{quickStart}", o.quickStart !== undefined ? formatUsd(o.quickStart) : "");
}
