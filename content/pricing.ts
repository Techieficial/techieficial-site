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

/* ---------- Individual services (owner-supplied prices, Nov 24, 2026) ---------- */

export type ServiceOption = {
  key: string;
  name: string;
  price: string;
  /** Time frame or scope line under the price. */
  note: string;
  includes: string[];
  cta: "request" | "call" | "quote";
};

export type ServiceGroup = { id: string; label: string; intro: string; options: ServiceOption[] };

export const serviceGroups: ServiceGroup[] = [
  {
    id: "care",
    label: "Care plan",
    intro: "Monthly support for a CRM you already have.",
    options: [
      {
        key: "care-starter",
        name: "Starter",
        price: "$350/month",
        note: "Up to 8 hours a month",
        includes: ["Workflow and automation fixes", "Pipeline and CRM maintenance", "Email and SMS template edits", "Monthly 30-minute check-in call", "Reply within 48 hours"],
        cta: "request",
      },
      {
        key: "care-growth",
        name: "Growth",
        price: "$700/month",
        note: "Up to 20 hours a month",
        includes: ["Everything in Starter", "New simple automation builds", "Funnel and form updates", "Contact and list management", "Weekly video progress updates", "Reply within 24 hours"],
        cta: "request",
      },
      {
        key: "care-scale",
        name: "Scale",
        price: "$1,300/month",
        note: "Up to 40 hours a month",
        includes: ["Everything in Growth", "Full CRM management", "Complex automation builds", "Multi-channel campaign management", "Strategy call every two weeks", "Same-day reply"],
        cta: "request",
      },
    ],
  },
  {
    id: "build",
    label: "System build",
    intro: "A complete CRM built around how your business runs.",
    options: [
      {
        key: "build-starter",
        name: "Starter build",
        price: "$1,200",
        note: "5 to 7 business days",
        includes: ["Up to 3 pipelines", "Up to 5 automation workflows", "Lead capture form and calendar", "Up to 5 email templates", "Video walkthrough at handover"],
        cta: "request",
      },
      {
        key: "build-standard",
        name: "Standard build",
        price: "$2,500",
        note: "10 to 14 business days",
        includes: ["Up to 6 pipelines", "Up to 15 automation workflows", "Email and SMS campaigns", "Up to 2 funnels", "Custom dashboard", "Training call and documentation"],
        cta: "request",
      },
      {
        key: "build-full",
        name: "Full build",
        price: "$4,500+",
        note: "3 to 5 weeks, custom quote",
        includes: ["Everything in Standard", "Complex multi-stage automations", "Third-party integrations included", "AI chatbot or voice AI optional", "Full team training session"],
        cta: "call",
      },
    ],
  },
  {
    id: "fix",
    label: "Quick fix",
    intro: "Something is broken and you need it sorted fast.",
    options: [
      {
        key: "fix-single",
        name: "Single fix",
        price: "$97",
        note: "24 to 48 hours",
        includes: ["1 specific issue resolved", "Video walkthrough of the fix", "7-day follow-up window"],
        cta: "request",
      },
      {
        key: "fix-multi",
        name: "Multi-issue fix",
        price: "$197",
        note: "48 to 72 hours",
        includes: ["Up to 3 related issues", "Video walkthrough", "7-day follow-up window"],
        cta: "request",
      },
      {
        key: "fix-audit",
        name: "Deep audit and fix",
        price: "$397",
        note: "3 to 5 business days",
        includes: ["Full CRM audit", "Up to 5 issues resolved", "Written audit report", "30-minute walkthrough call"],
        cta: "request",
      },
    ],
  },
  {
    id: "integration",
    label: "Integration",
    intro: "Connect another tool to your CRM.",
    options: [
      {
        key: "integration-simple",
        name: "Simple",
        price: "$500",
        note: "3 to 5 business days",
        includes: ["1 third-party tool connected", "Up to 3 automated flows", "Testing and documentation"],
        cta: "request",
      },
      {
        key: "integration-complex",
        name: "Complex",
        price: "$1,200",
        note: "5 to 10 business days",
        includes: ["Several tools connected", "Custom webhook or API setup", "Up to 10 automation flows", "Testing and video walkthrough"],
        cta: "request",
      },
    ],
  },
  {
    id: "more",
    label: "More services",
    intro: "Other work we take on.",
    options: [
      {
        key: "crm-audit",
        name: "CRM audit",
        price: "$250 to $500",
        note: "A full health check of your CRM",
        includes: ["Every pipeline and automation reviewed", "A written list of what to fix first"],
        cta: "request",
      },
      {
        key: "crm-migration",
        name: "CRM migration",
        price: "Custom quote",
        note: "For example, moving from another CRM",
        includes: ["Automations, campaigns and pipelines rebuilt", "Checked end to end after the move"],
        cta: "quote",
      },
      {
        key: "deliverability",
        name: "A2P 10DLC and email deliverability",
        price: "Custom quote",
        note: "So texts and emails actually arrive",
        includes: ["A2P 10DLC registration", "Sending domain set up correctly"],
        cta: "quote",
      },
      {
        key: "voice-agent",
        name: "Voice AI agent setup",
        price: "Custom quote",
        note: "An AI agent that answers, qualifies and books",
        includes: ["Scripted and tested on real scenarios", "Call results saved to your CRM"],
        cta: "quote",
      },
      {
        key: "agency-build",
        name: "Reusable build for agencies",
        price: "Custom quote",
        note: "One build for all your clients",
        includes: ["Built once, deployed to each new account", "White-label, under your brand"],
        cta: "quote",
      },
      {
        key: "meta-ads",
        name: "Meta Ads management",
        price: "Custom quote",
        note: "Facebook and Instagram lead campaigns",
        includes: ["Campaign setup and creative testing", "Leads sent straight into your CRM"],
        cta: "quote",
      },
    ],
  },
];
