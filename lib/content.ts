export const CTA_LABEL = "Start your project";
export const CTA_HREF = "#start";

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
  summary: string;
  includes: string[];
  platformsLabel: string;
  platforms: { name: string; soon?: boolean }[];
  /** Illustrative 12-week plan: [startWeek, endWeek] inclusive, 1-based */
  plan: [number, number][];
  planNote: string;
};

export const SERVICES: Service[] = [
  {
    id: "crm",
    name: "Marketing Automation",
    summary:
      "We build your CRM so every lead is captured, followed up and tracked to a sale, without anyone copying data between tools.",
    includes: [
      "Pipelines and lead capture forms",
      "Follow-up sequences by email and SMS",
      "Booking, reminders and no-show recovery",
      "Reporting your team will actually read",
    ],
    platformsLabel: "Platforms",
    platforms: [
      { name: "Our CRM build" },
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
    summary:
      "Video produced with AI and edited by people, so you can test more creative without booking a shoot for every idea.",
    includes: [
      "Product review videos",
      "Ad creatives cut for each placement",
      "Social content for your own channels",
    ],
    platformsLabel: "Formats",
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
    summary:
      "Campaigns planned, launched and managed across the platforms where your buyers spend time, with spend tied back to CRM results.",
    includes: [
      "Channel plan and budget split",
      "Campaign build, tracking and launch",
      "Programmatic display on DV360 (Google Display & Video 360), using audience data from your DMP (data management platform)",
      "Weekly optimisation and reporting",
    ],
    platformsLabel: "Platforms",
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
    summary:
      "Custom AI agents and workflows that take repetitive work off your team, connected to the tools you already use.",
    includes: [
      "Lead routing and qualification workflows",
      "AI agents for enquiries and admin",
      "Connections between your apps and your CRM",
    ],
    platformsLabel: "Platforms",
    platforms: [{ name: "n8n" }, { name: "Make" }],
    plan: [[5, 8]],
    planNote: "Weeks 5 to 8: agents and workflows added once real lead volume shows where time is lost.",
  },
  {
    id: "academy",
    name: "Academy",
    summary:
      "Learn to run these systems in-house, through self-paced courses, one-to-one mentorship or training for your whole team.",
    includes: ["Courses", "Mentorship", "Corporate training"],
    platformsLabel: "Formats",
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

export const STEPS: { title: string; body: string; weeks: [number, number]; label: string }[] = [
  {
    title: "Project brief",
    weeks: [0, 0],
    label: "Week 0",
    body: "Tell us about your goals, channels and current tools. We come back with questions and, if we are a fit, a time to talk it through.",
  },
  {
    title: "Your plan",
    weeks: [1, 1],
    label: "Week 1",
    body: "You get a written plan: which channels, in what order, what we build, and what it costs.",
  },
  {
    title: "Build and run",
    weeks: [2, 12],
    label: "Week 2 onward",
    body: "We build, launch and manage the program, and report on it in one place every week.",
  },
];

export const FAQS = [
  {
    q: "What does it cost?",
    a: "Scope and pricing are set once we understand your project and which channels you need. [PLACEHOLDER: starting price or typical engagement range]",
  },
  {
    q: "Which CRM do you work with?",
    a: "Today we build and run your CRM on the platform we set up and manage for you. HubSpot, Zoho and Salesforce builds are coming soon. [PLACEHOLDER: name the CRM platform here if you want it shown]",
  },
  {
    q: "Do you work with businesses outside the US?",
    a: "Yes. We have delivered CRM and automation systems for 13+ clients across the US, UK, Canada, New Zealand and Australia.",
  },
  {
    q: "Can we hire you for one service only?",
    a: "Yes. You can start with one service and add others once it is working.",
  },
  {
    q: "Can you train our in-house team?",
    a: "Yes. The Academy offers courses, one-to-one mentorship and corporate training, so your team can run the systems we build.",
  },
  {
    q: "How soon can we launch?",
    a: "[PLACEHOLDER: typical time from project brief to first launch]",
  },
];
