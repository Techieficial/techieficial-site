import { defineField } from "sanity";
import { limits, maxLength } from "../../lib/rules";
import { defineDocument, draftField, iconField, serviceRefs, slugField } from "../define";

/** Mirrors the velite `services` collection (velite.config.ts). SEO title and description live in `seo`. */
export const service = defineDocument({
  name: "service",
  title: "Service",
  seo: true,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Details" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "content", validation: (rule) => rule.required() }),
    slugField("name", "content"),
    defineField({ name: "order", title: "Order", type: "number", group: "content", validation: (rule) => rule.required().integer().min(0) }),
    defineField({ name: "navName", title: "Menu name", type: "string", group: "content", validation: (rule) => rule.required() }),
    iconField("content"),
    defineField({ name: "outcome", title: "Outcome line", type: "string", group: "content", validation: (rule) => rule.required().custom(maxLength(limits.outcome)) }),
    defineField({ name: "headline", title: "Headline", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "who", title: "Who it is for", type: "text", rows: 2, group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "pains", title: "Pains", type: "array", group: "content", of: [{ type: "card" }], validation: (rule) => rule.required().length(3) }),
    defineField({ name: "deliverables", title: "Deliverables", type: "array", group: "content", of: [{ type: "card" }], validation: (rule) => rule.required().min(6).max(9) }),
    defineField({ name: "highlights", title: "Highlights", type: "array", group: "content", of: [{ type: "string" }], validation: (rule) => rule.required().length(3) }),
    defineField({ name: "body", title: "Body", type: "richText", group: "content" }),
    defineField({
      name: "platforms",
      title: "Platforms",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          name: "platform",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "soon", title: "Coming soon", type: "boolean", initialValue: false }),
          ],
        },
      ],
    }),
    defineField({ name: "note", title: "Note", type: "text", rows: 2, group: "details" }),
    defineField({ name: "demo", title: "Demo type", type: "string", group: "details", options: { list: ["call", "gallery", "video", "none"] }, initialValue: "none" }),
    defineField({
      name: "process",
      title: "Process steps",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          name: "processStep",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "when", title: "When", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "body", title: "Body", type: "text", rows: 2, validation: (rule) => rule.required() }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(3),
    }),
    defineField({ name: "pricingKey", title: "Package key", type: "string", group: "details", description: "Old package key (capture, convert, dominate) until pages use offers directly." }),
    defineField({ name: "offer", title: "Recommended offer", type: "reference", group: "details", to: [{ type: "offer" }] }),
    defineField({ name: "faqs", title: "FAQs", type: "array", group: "details", of: [{ type: "qa" }], validation: (rule) => rule.required().length(5) }),
    serviceRefs("related", "Related services", "details"),
    defineField({ name: "industries", title: "Industries", type: "array", group: "details", of: [{ type: "reference", to: [{ type: "industry" }] }] }),
    draftField("content"),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "outcome" } },
});
