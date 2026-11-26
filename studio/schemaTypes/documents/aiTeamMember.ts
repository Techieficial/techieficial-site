import { defineField } from "sanity";
import { defineDocument, iconField } from "../define";

/** Mirrors `TeamMember` in content/team.ts. `seo` replaces its seo { title, description }. */
export const aiTeamMember = defineDocument({
  name: "aiTeamMember",
  title: "AI team member",
  seo: true,
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "profile", title: "Profile page" },
  ],
  fields: [
    defineField({ name: "name", title: "Full role", type: "string", group: "card", description: 'For example "AI Receptionist".', validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "card",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "short", title: "Short label", type: "string", group: "card", validation: (rule) => rule.required() }),
    defineField({ name: "order", title: "Order", type: "number", group: "card" }),
    iconField("card"),
    defineField({ name: "line", title: "One line on what it does", type: "string", group: "card", validation: (rule) => rule.required() }),
    defineField({ name: "cardSkills", title: "Card skills", type: "array", group: "card", of: [{ type: "string" }], validation: (rule) => rule.required().length(3) }),
    defineField({ name: "replaces", title: "Replaces", type: "string", group: "card", validation: (rule) => rule.required() }),
    defineField({ name: "profileName", title: "Profile page title", type: "string", group: "profile", description: "Only when it differs from the name." }),
    defineField({ name: "h1", title: "Main heading (H1)", type: "string", group: "profile", validation: (rule) => rule.required() }),
    defineField({ name: "job", title: "The job", type: "text", rows: 3, group: "profile", validation: (rule) => rule.required() }),
    defineField({ name: "skills", title: "Skills", type: "array", group: "profile", of: [{ type: "string" }], validation: (rule) => rule.required().min(1) }),
    defineField({
      name: "day",
      title: "A day in the life",
      type: "array",
      group: "profile",
      of: [
        {
          type: "object",
          name: "moment",
          fields: [
            defineField({ name: "time", title: "Time", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", title: "Text", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "time", subtitle: "text" } },
        },
      ],
    }),
    defineField({ name: "never", title: "What it never does", type: "text", rows: 2, group: "profile" }),
    defineField({
      name: "hire",
      title: "How to hire",
      type: "object",
      group: "profile",
      fields: [
        defineField({ name: "text", title: "Text", type: "text", rows: 2, validation: (rule) => rule.required() }),
        defineField({ name: "offers", title: "Offers", type: "array", of: [{ type: "reference", to: [{ type: "offer" }] }], validation: (rule) => rule.required().min(1) }),
      ],
    }),
    defineField({ name: "faqs", title: "FAQs", type: "array", group: "profile", of: [{ type: "qa" }] }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "line" } },
});
