import { defineField } from "sanity";
import { defineDocument, draftField, slugField } from "../define";

/** Mirrors the velite `industries` collection. Its `workflow` steps are `steps` here (workflow is the review object). */
export const industry = defineDocument({
  name: "industry",
  title: "Industry",
  seo: true,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Details" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "content", validation: (rule) => rule.required() }),
    slugField("name", "content"),
    defineField({ name: "navName", title: "Menu name", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "headline", title: "Headline", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3, group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "pains", title: "Pains", type: "array", group: "content", of: [{ type: "card" }], validation: (rule) => rule.required().min(3).max(4) }),
    defineField({ name: "steps", title: "How the system works", type: "array", group: "content", of: [{ type: "card" }], validation: (rule) => rule.required().min(4).max(6) }),
    defineField({
      name: "builtFor",
      title: '"Built for" list',
      type: "object",
      group: "details",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "items", title: "Items", type: "array", of: [{ type: "string" }], validation: (rule) => rule.min(2) }),
      ],
    }),
    defineField({ name: "packageKey", title: "Package key", type: "string", group: "details" }),
    defineField({ name: "offer", title: "Recommended offer", type: "reference", group: "details", to: [{ type: "offer" }] }),
    defineField({ name: "packageWhy", title: "Why this offer", type: "text", rows: 2, group: "details", validation: (rule) => rule.required() }),
    defineField({ name: "startSmallKey", title: "Start small offer key", type: "string", group: "details" }),
    defineField({ name: "startSmallOffer", title: "Start small offer", type: "reference", group: "details", to: [{ type: "offer" }] }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      group: "details",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      validation: (rule) => rule.required().min(2).unique(),
    }),
    defineField({ name: "faqs", title: "FAQs", type: "array", group: "details", of: [{ type: "qa" }], validation: (rule) => rule.required().min(3) }),
    draftField("content"),
  ],
  preview: { select: { title: "name", subtitle: "headline" } },
});
