import { defineField } from "sanity";
import { placesLeftRule } from "../../lib/rules";
import { defineDocument } from "../define";

/** Group titles from content/faq.ts. */
export const faqGroupTitles = ["Services", "Pricing", "Process", "AI and data", "Contracts"];

/** Mirrors `Faq` in content/faq.ts. */
export const faq = defineDocument({
  name: "faq",
  title: "FAQ",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "group", title: "Group", type: "string", options: { list: faqGroupTitles }, validation: (rule) => rule.required() }),
    defineField({ name: "order", title: "Order in group", type: "number" }),
    defineField({ name: "home", title: "Show on the homepage", type: "boolean", initialValue: false }),
  ],
  orderings: [
    {
      title: "Group, then order",
      name: "groupOrder",
      by: [
        { field: "group", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: { select: { title: "question", subtitle: "group" } },
});

/** A reusable image or file with alt text and a client data check. */
export const mediaAsset = defineDocument({
  name: "mediaAsset",
  title: "Media",
  workflow: false,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "kind", title: "Kind", type: "string", options: { list: ["image", "video", "file"], layout: "radio" }, initialValue: "image" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, hidden: ({ document }) => document?.kind !== "image" }),
    defineField({ name: "file", title: "File", type: "file", hidden: ({ document }) => document?.kind === "image" }),
    defineField({ name: "videoUrl", title: "Video link", type: "url", description: "Loom or YouTube link instead of an upload.", hidden: ({ document }) => document?.kind !== "video" }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe what the image shows. Required for images.",
      validation: (rule) => rule.custom((value, context) => (context.document?.kind === "image" && !value ? "Images need alt text." : true)),
    }),
    defineField({ name: "credit", title: "Source or credit", type: "string" }),
    defineField({ name: "clientDataChecked", title: "Checked for visible client data", type: "boolean", initialValue: false }),
    defineField({ name: "notes", title: "Usage notes", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "kind", media: "image" } },
});

/** Founding-client offer settings (F14). The places counter is set by hand. Singleton. */
export const foundingOffer = defineDocument({
  name: "foundingOffer",
  title: "Founding offer",
  workflow: false,
  fields: [
    defineField({ name: "open", title: "Applications open", type: "boolean", initialValue: false, description: "When off, the /founding page and its form stay hidden." }),
    defineField({ name: "placesTotal", title: "Places in total", type: "number", validation: (rule) => rule.required().integer().min(0) }),
    defineField({
      name: "placesLeft",
      title: "Places left",
      type: "number",
      description: "Set by hand when a founding client signs.",
      validation: (rule) => rule.required().integer().custom((value, context) => placesLeftRule(value, context.document?.placesTotal)),
    }),
    defineField({ name: "offer", title: "Offer it discounts", type: "reference", to: [{ type: "offer" }] }),
    defineField({ name: "setup", title: "Founding setup fee (US dollars)", type: "number", validation: (rule) => rule.min(0) }),
    defineField({ name: "monthly", title: "Founding monthly fee (US dollars)", type: "number", validation: (rule) => rule.min(0) }),
    defineField({ name: "foundingMonths", title: "Months at the founding price", type: "number", validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "terms", title: "What the client agrees to", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "crmTag", title: "CRM tag for applications", type: "string", initialValue: "founding-client", readOnly: true }),
  ],
  preview: { prepare: () => ({ title: "Founding offer" }) },
});

/** Site-wide settings (mirrors parts of site.config.ts). Singleton. */
export const siteSettings = defineDocument({
  name: "siteSettings",
  title: "Site settings",
  workflow: false,
  seo: true,
  fields: [
    defineField({ name: "name", title: "Site name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "email", title: "Business email", type: "email" }),
    defineField({ name: "supportEmail", title: "Support email", type: "email" }),
    defineField({ name: "primaryCta", title: "Primary call to action", type: "cta" }),
    defineField({
      name: "socials",
      title: "Social accounts",
      type: "array",
      description: "Only accounts that exist.",
      of: [
        {
          type: "object",
          name: "social",
          fields: [
            defineField({ name: "label", title: "Network", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "href", title: "Link", type: "url", validation: (rule) => rule.required().uri({ scheme: ["https"] }) }),
          ],
        },
      ],
    }),
    defineField({ name: "countries", title: "Countries served", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "announcement",
      title: "Announcement bar",
      type: "object",
      fields: [
        defineField({ name: "enabled", title: "Show", type: "boolean", initialValue: false }),
        defineField({ name: "text", title: "Text", type: "string" }),
      ],
    }),
    defineField({ name: "checkoutLive", title: "Direct checkout switched on", type: "boolean", initialValue: false, description: "Leave off until a test payment works." }),
    defineField({ name: "pricesFinal", title: "Prices confirmed by the owner", type: "boolean", initialValue: false }),
    defineField({ name: "usageNote", title: "Usage note under monthly prices", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
