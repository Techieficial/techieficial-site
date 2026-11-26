import { defineArrayMember, defineField } from "sanity";
import { defineDocument, slugField } from "../define";

/** Generic page built from sections (home, about, offers hub, founding, inside and so on). */
export const page = defineDocument({
  name: "page",
  title: "Page",
  seo: true,
  groups: [{ name: "content", title: "Content", default: true }],
  fields: [
    defineField({ name: "title", title: "Internal title", type: "string", group: "content", validation: (rule) => rule.required() }),
    slugField("title", "content"),
    defineField({ name: "h1", title: "Main heading (H1)", type: "string", group: "content" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3, group: "content" }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          name: "heroSection",
          title: "Hero",
          type: "object",
          fields: [
            defineField({ name: "tag", title: "Small label", type: "string" }),
            defineField({ name: "title", title: "Heading", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "sub", title: "Sub heading", type: "text", rows: 3 }),
            defineField({ name: "ctas", title: "Buttons", type: "array", of: [{ type: "cta" }], validation: (rule) => rule.max(2) }),
          ],
        }),
        defineArrayMember({
          name: "textSection",
          title: "Text",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Body", type: "richText" }),
          ],
        }),
        defineArrayMember({
          name: "cardsSection",
          title: "Cards",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Heading", type: "string" }),
            defineField({ name: "intro", title: "Intro", type: "text", rows: 2 }),
            defineField({ name: "cards", title: "Cards", type: "array", of: [{ type: "card" }] }),
          ],
        }),
        defineArrayMember({
          name: "faqSection",
          title: "FAQ list",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Heading", type: "string" }),
            defineField({ name: "items", title: "Questions", type: "array", of: [{ type: "reference", to: [{ type: "faq" }] }] }),
          ],
        }),
        defineArrayMember({
          name: "proofSection",
          title: "Project stories",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Heading", type: "string" }),
            defineField({ name: "stories", title: "Stories", type: "array", of: [{ type: "reference", to: [{ type: "caseStudy" }] }] }),
          ],
        }),
        defineArrayMember({
          name: "ctaSection",
          title: "Call to action band",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Heading", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
            defineField({ name: "cta", title: "Button", type: "cta", validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
