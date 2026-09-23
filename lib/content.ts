export const CTA_LABEL = "Book a strategy call";
export const CTA_HREF = "#book";

export const PROOF_LINE =
  "CRM and automation systems delivered for 13+ clients across the US, UK, Canada, New Zealand and Australia";

export const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "NZ", name: "New Zealand" },
  { code: "AU", name: "Australia" },
];

export type ServiceId = "video" | "ads" | "crm" | "agents" | "academy";

export type Service = {
  id: ServiceId;
  name: string;
  short: string;
  summary: string;
  includes: string[];
  platforms: { name: string; soon?: boolean }[];
  /** Illustrative 12-week plan: [startWeek, endWeek] inclusive, 1-based */
  plan: [number, number][];
  planNote: string;
};

export const SERVICES: Service[] = [
  {
    id: "crm",
    name: "Marketing Automation",
    short: "CRM automation",
    summary:
      "We build your CRM so every lead is captured, followed up and tracked to a sale, without anyone copying data between tools.",
    includes: [
      "Pipelines and lead capture forms",
      "Follow-up sequences by email and SMS",
      "Booking, reminders and no-show recovery",
      "Reporting your team will actually read",
    ],
    platforms: [
      { name: "CRM" },
      { name: "HubSpot", soon: true },
      { name: "Zoho", soon: true },
      { name: "Salesforce", soon: true },
    ],
    plan: [[1, 4]],
    planNote: "Weeks 1 to 4: CRM, pipelines and follow-up built before a single ad goes live.",
  },
  {
    id: "video",
    name: "AI Video Content",
    short: "AI video",
    summary:
      "Video produced with AI and edited by people, so you can test more creative without booking a shoot for every idea.",
    includes: [
      "Product review videos",
      "Ad creatives cut for each placement",
      "Social content for your own channels",
    ],
    platforms: [
      { name: "Product reviews" },
      { name: "Ad creatives" },
      { name: "Social content" },
    ],
    plan: [
      [2, 4],
      [8, 10],
    ],
    planNote: "Weeks 2 to 4 and 8 to 10: a first round of creative, then a refresh based on what the ads learned.",
  },
  {
    id: "ads",
    name: "Paid Ads",
    short: "Paid ads",
    summary:
      "Campaigns planned, launched and managed across the platforms where your buyers spend time, with spend tied back to CRM results.",
    includes: [
      "Channel plan and budget split",
      "Campaign build, tracking and launch",
      "Weekly optimisation and reporting",
    ],
    platforms: [
      { name: "Meta" },
      { name: "Google" },
      { name: "TikTok" },
      { name: "LinkedIn" },
      { name: "DV360" },
      { name: "DMP" },
    ],
    plan: [[4, 12]],
    planNote: "Weeks 4 to 12: ads go live once tracking and follow-up are ready to catch every lead.",
  },
  {
    id: "agents",
    name: "AI Agent Automation",
    short: "AI agents",
    summary:
      "Custom AI agents and workflows that take repetitive work off your team, connected to the tools you already use.",
    includes: [
      "Lead routing and qualification workflows",
      "AI agents for enquiries and admin",
      "Connections between your apps and your CRM",
    ],
    platforms: [{ name: "n8n" }, { name: "Make" }],
    plan: [[5, 8]],
    planNote: "Weeks 5 to 8: agents and workflows added once real lead volume shows where time is lost.",
  },
  {
    id: "academy",
    name: "Academy",
    short: "Academy",
    summary:
      "Learn to run these systems in-house, through self-paced courses, one-to-one mentorship or training for your whole team.",
    includes: ["Courses", "Mentorship", "Corporate training"],
    platforms: [{ name: "Courses" }, { name: "Mentorship" }, { name: "Corporate training" }],
    plan: [[10, 12]],
    planNote: "Weeks 10 to 12: your team is trained to own the system day to day.",
  },
];

export const COMPARISON = [
  {
    topic: "Briefing",
    usual: "You brief an ad agency, a video team and a CRM freelancer separately.",
    ours: "One brief. One plan that covers every channel.",
  },
  {
    topic: "Handoffs",
    usual: "Leads from ads land in a CRM nobody set up for them.",
    ours: "Ads, CRM and follow-up are built together, in the right order.",
  },
  {
    topic: "Reporting",
    usual: "Three reports, three formats, and no link between spend and sales.",
    ours: "One report from ad spend through to booked calls and sales.",
  },
  {
    topic: "Accountability",
    usual: "Each vendor owns a slice and points at the others when numbers drop.",
    ours: "One team owns the result.",
  },
];

export const STEPS = [
  {
    title: "Strategy call",
    body: "We look at your goals, your current channels and your stack, and tell you honestly where we would start.",
  },
  {
    title: "Your plan",
    body: "You get a written plan: which channels, in what order, what we build, and what it costs.",
  },
  {
    title: "Build and run",
    body: "We build, launch and manage the program, and report on it in one place every week.",
  },
];

export const FAQS = [
  {
    q: "What does it cost?",
    a: "Scope and pricing are set after the strategy call, once we know which channels you need. [PLACEHOLDER: starting price or typical engagement range]",
  },
  {
    q: "Which CRM do you work with?",
    a: "We build and run your CRM for you. HubSpot, Zoho and Salesforce builds are coming soon.",
  },
  {
    q: "Do you work with businesses outside the US?",
    a: "Yes. We have delivered CRM and automation systems for 13+ clients across the US, UK, Canada, New Zealand and Australia.",
  },
  {
    q: "Can we hire you for one service only?",
    a: "Yes. Many clients start with one service, often CRM automation or paid ads, and add others when the first is working.",
  },
  {
    q: "Can you train our in-house team?",
    a: "Yes. The Academy offers courses, one-to-one mentorship and corporate training, so your team can run the systems we build.",
  },
  {
    q: "How soon can we launch?",
    a: "[PLACEHOLDER: typical time from strategy call to first launch]",
  },
];
