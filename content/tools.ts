/** Inside Techieficial, the missed-call calculator and the free audit (docs/SITE_CONTENT_V3.md 2.7, 2.8). Status: needs-review. */

export const insidePage = {
  seo: {
    title: "Inside Techieficial: We Run on Our Own AI Team",
    description: "No slides, no promises. See what's actually running Techieficial today: the same CRM, booking and email setup we build for clients.",
  },
  title: "We run Techieficial on the same AI team we sell.",
  intro: "No slides, no promises. Here's what's actually running our business today.",
  liveTitle: "Live now",
  live: [
    { title: "Lead intake", body: "Every form on this site goes into our CRM in seconds, tagged by source, with every answer saved on the contact." },
    { title: "Booking", body: "Our strategy calls and test builds are booked through the same CRM calendar you'll get." },
    { title: "Email", body: "Our emails go out from our own verified sending domain, the same setup we do for clients." },
  ],
  /** Shown only when live (the demo line needs the demo number). The other "coming online" items stay hidden until they exist. */
  demoLine: { title: "Our demo line", body: "Our AI Receptionist answers our demo line, the same way it would answer yours." },
  closing: "Want to see it run? Call it, test it, then decide.",
};

export const calculatorPage = {
  seo: {
    title: "Missed-Call Revenue Calculator | Techieficial",
    description: "How much are missed calls costing you? Put in your calls per week, missed calls, booking rate and job value to see an estimate.",
  },
  title: "How much are missed calls costing you?",
  intro: "Put in your own numbers. Everything is worked out in your browser.",
  inputs: {
    calls: "Calls per week",
    missed: "Calls you miss (%), your best guess",
    booking: "Answered callers who book (%)",
    jobValue: "Average job value ($)",
  },
  resultTitle: "Your estimate",
  perMonth: "per month",
  perYear: "per year",
  result: "You could be losing about {amount} a month to missed calls. An AI Receptionist answers every one.",
  empty: "Fill in all four numbers to see your estimate.",
  note: "This is an estimate from your numbers, not a promise.",
  starter: "See the AI Receptionist Starter",
  emailTitle: "Email me this result",
  emailButton: "Send it",
  emailSent: "Sent. Check your inbox.",
  formula: "Monthly lost revenue = calls per week x 4.3 x missed % x booking % x average job value.",
};

export const auditPage = {
  seo: {
    title: "Free 15-Minute Lead-Leak Audit | Techieficial",
    description: "We call your business, submit your website form and message your social pages like a real customer. Then you get a video of what to fix.",
  },
  title: "Find out where your leads are slipping away. Free.",
  intro: "We'll call your business, submit your website form and message your social pages like a real customer would. Then we send you a 15-minute video showing what happened and what to fix.",
  formTitle: "Request your free audit",
  submit: "Request my audit",
};

export const auditThanks = {
  seo: { title: "Your Audit Is on Its Way | Techieficial", description: "Thanks for requesting a free lead-leak audit from Techieficial." },
  title: "Your audit is on its way.",
  intro: "We'll call your business, submit your website form and message your social pages like a real customer would, then send you a short video of what to fix.",
};
