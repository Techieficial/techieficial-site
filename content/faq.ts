/** Site-wide FAQ, grouped. Status: needs-review. */

export type Faq = { q: string; a: string; home?: boolean };
export type FaqGroup = { title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Services",
    items: [
      {
        q: "What does Techieficial do?",
        a: "We plan and run five services as one system: marketing automation with a CRM, paid ads, AI video content, AI agents and training. You can hire us for one service or all five.",
        home: true,
      },
      {
        q: "Can I hire you for just one service?",
        a: "Yes. Many clients start with one service, usually marketing automation or an AI receptionist, and add more once it is working.",
        home: true,
      },
      {
        q: "Do you work with businesses outside the US?",
        a: "Yes. We have delivered CRM and automation systems for clients in the US, UK, Canada, Australia and New Zealand.",
        home: true,
      },
      {
        q: "Do you offer white-label services for agencies?",
        a: "Yes. We build CRM systems, AI agents and AI video under your agency's brand. See our agencies page for details.",
      },
    ],
  },
  {
    title: "Pricing",
    items: [
      {
        q: "How much does it cost?",
        a: "Packages start from a one-time setup fee plus a monthly fee. See the pricing page for starting prices, or use the Engine Builder for a recommendation.",
        home: true,
      },
      {
        q: "Is ad spend included?",
        a: "No. Ad spend is paid directly to the ad platforms. Our fee covers strategy, setup, creatives and management.",
      },
      {
        q: "Will I get a fixed quote?",
        a: "Yes. After the demo call you get a written proposal with a fixed scope and price before any work starts.",
      },
    ],
  },
  {
    title: "Process",
    items: [
      {
        q: "How does a project start?",
        a: "With a demo call. We look at how leads reach you today, show you what we would build and send a written proposal.",
        home: true,
      },
      {
        q: "How long does a build take?",
        a: "Most builds follow four steps: audit, build, launch and operate. We agree the timeline for your project in the proposal.",
      },
      {
        q: "What do you need from us?",
        a: "Access to your existing tools, a short kickoff call and a person on your team who can answer questions during the build.",
      },
      {
        q: "What happens after launch?",
        a: "We monitor the system, fix anything that breaks, improve it every month and send you a report.",
      },
    ],
  },
  {
    title: "AI and data",
    items: [
      {
        q: "Will customers know they are speaking to an AI?",
        a: "We recommend AI agents introduce themselves as virtual assistants. They hand over to a person whenever needed.",
        home: true,
      },
      {
        q: "How is our data handled?",
        a: "We only collect what is needed to answer, book and follow up with leads, and we agree data handling rules with you before launch.",
      },
      {
        q: "Can the AI make mistakes?",
        a: "Yes, like any system. That is why we set clear rules for what agents can do, review conversations and improve them every month.",
      },
    ],
  },
  {
    title: "Contracts",
    items: [
      {
        q: "Is there a minimum term?",
        a: "Contract terms are set out in your proposal. Ask us on the call about the options for your project.",
      },
      {
        q: "Who owns the system you build?",
        a: "Ownership of accounts, data and content is agreed in your contract. Your customer data always stays yours.",
      },
      {
        q: "Can we cancel?",
        a: "Cancellation terms are set out in your contract. We will explain them clearly before you sign.",
      },
    ],
  },
];

export const homeFaqs = faqGroups.flatMap((g) => g.items).filter((f) => f.home);
