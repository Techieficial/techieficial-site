/**
 * Packages, price points and the Engine Builder logic.
 * Status: needs-review. The owner must confirm every price before launch.
 */
import type { ServiceSlug } from "@/site.config";

export const pricesFinal = false;

export type PackageKey = "capture" | "convert" | "dominate";

export type Package = {
  key: PackageKey;
  name: string;
  tagline: string;
  setupFrom: number;
  monthlyFrom: number;
  monthlyNote?: string;
  popular?: boolean;
  includes: string[];
  services: ServiceSlug[];
};

export const packages: Package[] = [
  {
    key: "capture",
    name: "Capture",
    tagline: "Stop losing the leads you already get.",
    setupFrom: 1500,
    monthlyFrom: 297,
    includes: ["CRM setup", "Missed-call text back", "Speed-to-lead replies", "Review requests"],
    services: ["marketing-automation"],
  },
  {
    key: "convert",
    name: "Convert",
    tagline: "Answer, nurture and book, day and night.",
    setupFrom: 3500,
    monthlyFrom: 997,
    popular: true,
    includes: [
      "Everything in Capture",
      "AI voice receptionist",
      "Nurture sequences",
      "Lead reactivation",
      "Monthly AI video creatives",
    ],
    services: ["marketing-automation", "ai-agents", "ai-video"],
  },
  {
    key: "dominate",
    name: "Dominate",
    tagline: "The full growth engine, run for you.",
    setupFrom: 7500,
    monthlyFrom: 2500,
    monthlyNote: "plus ad spend",
    includes: [
      "Everything in Convert",
      "Ads management",
      "1 custom AI employee",
      "Team training",
    ],
    services: ["marketing-automation", "ai-agents", "ai-video", "paid-ads", "training"],
  },
];

export const monthlyCovers = [
  "Your CRM platform",
  "Monitoring of bots and automations",
  "Ongoing optimization",
  "Support when you need it",
  "Monthly reporting",
];

export const pricingFaqs = [
  {
    q: "Why is there a setup fee and a monthly fee?",
    a: "The setup fee covers the build: planning, configuration, content and testing. The monthly fee covers the CRM platform, monitoring, improvements, support and reporting.",
  },
  {
    q: "What does \"from\" mean?",
    a: "Prices shown are starting points. The final price depends on the number of locations, users, automations and agents. You get a fixed quote before any work starts.",
  },
  {
    q: "Is ad spend included?",
    a: "No. Ad spend is paid directly to the ad platforms. The Dominate package includes ads management, not the spend itself.",
  },
  {
    q: "Can I start small and add services later?",
    a: "Yes. Many clients start with Capture and add AI agents, video or ads once the basics are working.",
  },
  {
    q: "Is there a long-term contract?",
    a: "Contract terms are agreed in your proposal. Ask us on the call about the options.",
  },
];

/* ---------- Engine Builder ---------- */

export const builderSizes = [
  { key: "solo", label: "Solo" },
  { key: "small", label: "2 to 10" },
  { key: "medium", label: "11 to 50" },
  { key: "large", label: "50+" },
] as const;

export const builderGoals = [
  { key: "answer", label: "Stop missing leads" },
  { key: "grow", label: "Get more leads" },
  { key: "content", label: "Make more content" },
  { key: "team", label: "Train my team" },
] as const;

export type BuilderSize = (typeof builderSizes)[number]["key"];
export type BuilderGoal = (typeof builderGoals)[number]["key"];

/**
 * Recommends the smallest package that covers the chosen services,
 * stepping up when the goal or business size needs more.
 */
export function recommendPackage(services: ServiceSlug[], size: BuilderSize, goal: BuilderGoal): Package {
  const rank: Record<PackageKey, number> = { capture: 0, convert: 1, dominate: 2 };
  let best: PackageKey = "capture";
  const bump = (k: PackageKey) => {
    if (rank[k] > rank[best]) best = k;
  };

  for (const s of services) {
    if (s === "ai-agents" || s === "ai-video") bump("convert");
    if (s === "paid-ads" || s === "training") bump("dominate");
  }
  if (goal === "grow" || goal === "team") bump("dominate");
  if (goal === "content") bump("convert");
  if (size === "large") bump("dominate");
  if (size === "medium") bump("convert");

  return packages.find((p) => p.key === best)!;
}

export const formatUsd = (n: number) => `$${n.toLocaleString("en-US")}`;
