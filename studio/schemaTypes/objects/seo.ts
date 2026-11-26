import { defineField, defineType } from "sanity";
import { limits, maxLength } from "../../lib/rules";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      description: `Shown in search results and browser tabs. ${limits.seoTitle} characters or fewer.`,
      validation: (rule) => rule.required().custom(maxLength(limits.seoTitle)),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: `One or two sentences for search results. ${limits.seoDescription} characters or fewer.`,
      validation: (rule) => rule.required().custom(maxLength(limits.seoDescription)),
    }),
    defineField({
      name: "canonical",
      title: "Canonical URL",
      type: "url",
      description: "Leave empty to use this page's own address.",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      description: "1200 by 630 pixels. Leave empty to use the default image.",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() })],
    }),
    defineField({
      name: "noindex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
