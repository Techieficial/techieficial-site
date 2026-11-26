import { defineArrayMember, defineField, defineType } from "sanity";

/** Title and body pair (velite `card`). */
export const card = defineType({
  name: "card",
  title: "Card",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});

/** Inline question and answer, used inside services, industries and team members. */
export const qa = defineType({
  name: "qa",
  title: "Question and answer",
  type: "object",
  fields: [
    defineField({ name: "q", title: "Question", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "a", title: "Answer", type: "text", rows: 3, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "q", subtitle: "a" } },
});

/** Rich text body with headings, lists, links and images. */
export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [defineField({ name: "href", title: "Link", type: "url", validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }) })],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() })],
    }),
  ],
});
