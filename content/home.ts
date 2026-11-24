/** Home page copy (docs/SITE_CONTENT_V3.md section 2.1). Status: needs-review. */

export const home = {
  seo: {
    title: "AI Team for Service Businesses | Techieficial",
    description:
      "Hire an AI team that answers every call, replies to every lead, follows up and books jobs 24/7. Built, trained and managed for you.",
  },
  hero: {
    tag: "AI teams for service businesses",
    titleStart: "Hire an AI team that",
    titleHighlight: "answers every lead",
    titleEnd: ".",
    sub: "Your AI Receptionist, Lead Responder, Follow-up Agent and Reviews Agent work 24/7 inside your CRM. Calls get answered, leads get booked and reviews keep coming in. We build, train and manage the team for you.",
    /** Real numbers only. Leave empty to hide the stat chips. */
    stats: [] as { value: number; suffix?: string; label: string }[],
  },
  trust: {
    lead: "Trusted by service businesses in",
    countries: ["the US", "UK", "Canada", "Australia", "New Zealand"],
  },
  story: {
    title: "Follow one lead through your AI team.",
    intro: "Here is what happens when a homeowner calls your business after hours.",
    steps: [
      { time: "7:42 PM", title: "The call.", story: "A homeowner's AC stops working. They call three companies. Yours is the only one that answers.", ai: "Your AI Receptionist picks up on the first ring, asks what's wrong and checks if it's an emergency." },
      { time: "7:45 PM", title: "The booking.", story: "The caller picks a slot for 8 AM.", ai: "The booking goes straight into your calendar, and the caller gets a text confirmation." },
      { time: "7:46 PM", title: "You are in the loop.", story: "", ai: "You get a short summary: name, address, problem, booked time. The contact is logged and tagged in your pipeline." },
      { time: "Meanwhile", title: "A web lead.", story: "Someone fills in your website form and never books.", ai: "Your AI Lead Responder texts them within a minute and the Follow-up Agent keeps the conversation going until they book or say no." },
      { time: "Next day", title: "The review.", story: "The job is done.", ai: "Your AI Reviews Agent asks for a review, sends happy customers to Google and routes unhappy ones to you privately." },
    ],
    closing: "One lead. Four AI employees. No one on your team had to stop working.",
    button: "See the AI team",
  },
  problem: {
    title: "Most service businesses don't lose leads to competitors. They lose them to voicemail.",
    intro: "",
    cards: [
      {
        title: "Missed calls",
        body: "You are on a job, the phone rings, and the caller books whoever answers first.",
        stat: "62%",
        statLabel: "of calls to small businesses went unanswered in one study of 85 businesses.",
        source: "411 Locals, 2016",
        href: "https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/",
      },
      {
        title: "Slow replies",
        body: "Website and ad leads wait hours for a reply. By then they've moved on.",
        stat: "7x",
        statLabel: "more likely to qualify a lead when contacted within an hour.",
        source: "Harvard Business Review, 2011",
        href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
      },
      {
        title: "No follow-up",
        body: "Quotes go out and nobody chases them. Old customers never hear from you again.",
      },
    ] as { title: string; body: string; stat?: string; statLabel?: string; source?: string; href?: string }[],
  },
  team: {
    title: "Meet your AI team.",
    button: "Hire the whole team",
  },
  proof: {
    title: "We run Techieficial on the same AI team we sell.",
    body: "Every form on this site goes straight into our CRM, gets tagged and lands in front of a person. Our booking calendar is the one you will use.",
    demoLine: "And our demo line is answered by the same AI Receptionist we build for clients.",
    close: "If it's good enough to run our business, it's ready to run yours.",
    button: "Look inside Techieficial",
  },
  demo: {
    title: "Don't take our word for it. Call it.",
    body: "Call our AI Receptionist right now. Ask it anything a customer would ask. Try to trip it up.",
    audioLabel: "Or hear a recorded call",
    callMe: "Have it call me",
    noPhoneTitle: "Hear it with your own business.",
    noPhoneBody: "Book a live demo and we'll set up a test version of the AI team with your business name and services.",
    noPhoneButton: "Book a live demo",
  },
  process: {
    title: "Live in weeks, not months.",
    intro: "",
    steps: [
      { title: "Audit (day 1)", body: "We map how leads reach you today and where they slip through." },
      { title: "Build (week 1 to 2)", body: "We set up your CRM, train each AI employee on your services, prices, hours and service area, and connect your calendar." },
      { title: "Test (week 2)", body: "We run every call and message scenario before anything goes live." },
      { title: "Launch and tune (ongoing)", body: "We monitor every conversation, fix what needs fixing and send you a monthly report." },
    ],
  },
  results: {
    title: "Results",
    intro: "Real projects, real numbers.",
  },
  packages: {
    title: "Start where you are.",
    intro: "Start with one hire or bring on the whole team. Every plan is built for you, trained on your business and managed every month.",
    link: "See all offers",
  },
  academy: {
    title: "Want your people to work with AI too?",
    body: "We train your team to use the systems we build. Join the Academy waitlist.",
  },
  comparison: {
    title: "AI team vs the usual options.",
    caption: "How a Techieficial AI team compares with an answering service and an extra front-desk hire",
    columns: ["Techieficial AI team", "Answering service", "Extra front-desk hire"],
    rows: [
      { label: "Answers at 2 AM", values: ["Yes", "Usually", "No"] },
      { label: "Books into your calendar", values: ["Yes", "Sometimes", "Yes, in office hours"] },
      { label: "Replies to web and social leads", values: ["Yes, in under a minute", "No", "When they have time"] },
      { label: "Follows up and requests reviews", values: ["Yes, automatically", "No", "If someone remembers"] },
      { label: "Logs every lead in your CRM", values: ["Yes", "Rarely", "Manually"] },
      { label: "Sick days, training, turnover", values: ["None", "Varies", "Yes"] },
    ],
  },
  faq: {
    title: "Questions, answered.",
    link: "See all questions",
    items: [
      { q: "Will callers know they're talking to AI?", a: "The AI Receptionist sounds natural, and it can introduce itself as your virtual assistant. We recommend being upfront; most callers care more about getting booked than who answers." },
      { q: "What if a call is an emergency or too complex?", a: "It transfers the call to you or your on-call number, following rules you set." },
      { q: "Do I need a new CRM?", a: "No. If you already use our CRM, we build inside it. If not, we host one for you." },
      { q: "How long until it's live?", a: "The AI Receptionist Starter goes live in 7 to 10 business days. The full AI Front Office takes 14 to 21 days." },
      { q: "What does the monthly fee cover?", a: "The CRM platform and AI plan, monitoring of every AI employee, ongoing tuning, workflow fixes, support and a monthly report. Phone, SMS and email usage is billed at cost." },
      { q: "Am I locked in?", a: "The AI Front Office has a 3-month minimum so the team has time to learn your business. After that it's month to month." },
    ],
  },
  finalCta: {
    title: "Your next lead is calling. Who's answering?",
    body: "",
  },
};
