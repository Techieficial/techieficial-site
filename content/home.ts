/** Home page copy. Status: needs-review. */

export const home = {
  seo: {
    title: "Techieficial | AI Growth Agency",
    description:
      "AI video, paid ads, CRM automation and AI agents, planned and run as one system. Plus training so your team can run it too.",
  },
  hero: {
    tag: "AI growth agency",
    titleStart: "One team for your whole",
    titleHighlight: "growth engine",
    titleEnd: ".",
    sub: "AI video, paid ads, CRM automation and AI agents, planned and run as one system. Plus training so your team can run it too.",
    /** Real numbers only. Leave empty to hide the stat chips. */
    stats: [] as { value: number; suffix?: string; label: string }[],
  },
  trust: {
    lead: "Clients in",
  },
  problem: {
    title: "Stop managing three vendors to run one funnel.",
    intro: "Most growth problems are not a lack of leads. They are leads that get missed, followed up too slowly, or handed to tools that never get connected.",
    cards: [
      {
        title: "Missed calls",
        body: "Calls that go unanswered usually go to the next business on the list.",
        stat: "62%",
        statLabel: "of calls to small businesses went unanswered in one study of 85 businesses.",
        source: "411 Locals, 2016",
        href: "https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/",
      },
      {
        title: "Slow follow-up",
        body: "Leads cool off fast. The first business to reply often wins the customer.",
        stat: "7x",
        statLabel: "more likely to qualify a lead when contacted within an hour.",
        source: "Harvard Business Review, 2011",
        href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
      },
      {
        title: "AI tools that never went live",
        body: "AI that looks good in a demo is only useful once it is connected to how you work.",
        stat: "30%",
        statLabel: "of generative AI projects predicted to be abandoned after proof of concept.",
        source: "Gartner, 2024",
        href: "https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025",
      },
    ],
  },
  services: {
    title: "Five services. One growth engine.",
    intro: "Hire us for one or run all five. Each service is built to hand off cleanly to the next.",
  },
  demo: {
    title: "Call our AI receptionist now.",
    body: "Hear how it answers questions, captures details and books a time. No signup needed.",
    audioLabel: "Or hear a recorded call",
  },
  process: {
    title: "How it works",
    intro: "Every engagement follows the same four steps, so you always know what happens next.",
    steps: [
      { title: "Audit", body: "We map how leads reach you today, where they get lost and what to fix first." },
      { title: "Build", body: "We set up the CRM, automations, agents, ads and creative in the right order." },
      { title: "Launch", body: "We test every path end to end, train your team and go live." },
      { title: "Operate", body: "We monitor, improve and report on the system every month." },
    ],
  },
  results: {
    title: "Results",
    intro: "Real projects, real numbers.",
  },
  packages: {
    title: "Packages that grow with you.",
    intro: "Start with the basics and add more as the system proves itself. Prices are starting points; you get a fixed quote before any work starts.",
    link: "See full pricing",
  },
  academy: {
    title: "Want to run it yourself? Learn from the people who build it.",
    body: "The Techieficial Academy teaches the same systems we build for clients: CRM automation, AI agents and AI video.",
  },
  comparison: {
    title: "Techieficial vs. the alternatives",
    columns: ["Techieficial", "Separate vendors", "Hiring in-house"],
    rows: [
      { label: "Cost", values: ["One setup fee and one monthly fee", "Several retainers and invoices", "Salaries, benefits and tool costs"] },
      { label: "Speed to launch", values: ["One team builds in the right order", "Each vendor waits on the others", "Hiring and training come first"] },
      { label: "One plan", values: ["Ads, CRM, agents and video planned together", "Each vendor plans their own piece", "Depends on who you hire"] },
      { label: "Reporting", values: ["One report from spend to booked work", "Several reports in different formats", "You build the reporting yourself"] },
    ],
  },
  faq: {
    title: "Questions, answered.",
    link: "See all questions",
  },
  finalCta: {
    title: "See what we would build for you first.",
    body: "Book a demo. We look at how leads reach you today and map out your first build.",
  },
};
