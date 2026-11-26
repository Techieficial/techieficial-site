import { defineField } from "sanity";
import { defineDocument, draftField, serviceRefs, slugField } from "../define";

/**
 * Mirrors the blog frontmatter in content/blog/*.md (velite `blog`). `seo.title` is `seoTitle`,
 * `publishedAt` is `date`. Body is portable text instead of markdown.
 */
export const blogPost = defineDocument({
  name: "blogPost",
  title: "Blog post",
  seo: true,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "publishing", title: "Publishing" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (rule) => rule.required() }),
    slugField("title", "content"),
    defineField({ name: "excerpt", title: "Short summary", type: "text", rows: 2, group: "content", description: "Shown on the blog list. Falls back to the meta description." }),
    defineField({ name: "body", title: "Body", type: "richText", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "author", title: "Author", type: "string", group: "publishing", initialValue: "Techieficial team", validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", title: "Published date", type: "datetime", group: "publishing", validation: (rule) => rule.required() }),
    defineField({ name: "updated", title: "Last updated", type: "datetime", group: "publishing" }),
    defineField({
      name: "scheduledAt",
      title: "Go live at",
      type: "datetime",
      group: "publishing",
      description: "Optional. The site shows the post only after this time, even when it is published.",
    }),
    serviceRefs("services", "Related services", "publishing"),
    draftField("publishing"),
  ],
  orderings: [{ title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt" } },
});
