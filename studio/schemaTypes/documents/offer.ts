import { defineField } from "sanity";
import { offerPathRule } from "../../lib/rules";
import { defineDocument, draftField } from "../define";

const price = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "number", group: "price", description, validation: (rule) => rule.min(0) });

/** Mirrors `Offer` in content/pricing.ts. Prices are US dollars. */
export const offer = defineDocument({
  name: "offer",
  title: "Offer",
  seo: true,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "price", title: "Price and checkout" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "bestFor", title: "Best for", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "includes", title: "Includes (short list for cards)", type: "array", group: "content", of: [{ type: "string" }], validation: (rule) => rule.required().min(1) }),
    defineField({ name: "popular", title: "Mark as most popular", type: "boolean", group: "content", initialValue: false }),
    defineField({ name: "services", title: "Services", type: "array", group: "content", of: [{ type: "reference", to: [{ type: "service" }] }] }),
    defineField({
      name: "replaces",
      title: "Replaces old package",
      type: "string",
      group: "content",
      options: { list: ["capture", "convert", "dominate"] },
    }),
    price("setup", "Setup fee"),
    price("monthly", "Monthly fee"),
    price("oneTime", "One-time price"),
    defineField({ name: "from", title: 'Starting price ("From")', type: "boolean", group: "price", initialValue: false }),
    defineField({ name: "monthlyNote", title: "Note under monthly price", type: "string", group: "price", description: 'For example "plus ad spend".' }),
    defineField({ name: "minimumTerm", title: "Minimum term", type: "string", group: "price", description: 'For example "3-month minimum".' }),
    price("ownCrmMonthly", "Monthly fee with own CRM account"),
    price("quickStart", "Quick-start setup fee"),
    defineField({
      name: "path",
      title: "Buying path",
      type: "string",
      group: "price",
      description: "Call: Demo Lab, then strategy call. Checkout: CRM payment link (under $3,000 only).",
      options: {
        list: [
          { title: "Strategy call", value: "call" },
          { title: "Checkout", value: "checkout" },
        ],
        layout: "radio",
      },
      initialValue: "call",
      validation: (rule) => rule.required().custom((_value, context) => offerPathRule(context.document as Parameters<typeof offerPathRule>[0])),
    }),
    defineField({
      name: "paymentLink",
      title: "CRM payment link",
      type: "url",
      group: "price",
      description: "Used only while checkout is switched on in Site settings.",
      hidden: ({ document }) => document?.path !== "checkout",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "checkoutLabel",
      title: "Checkout button",
      type: "string",
      group: "price",
      options: { list: ["Get started", "Buy now"] },
      hidden: ({ document }) => document?.path !== "checkout",
    }),
    price("compareAtPrice", "Compare-at price", "Optional higher price shown crossed out."),
    defineField({ name: "limitedOffer", title: "Limited-time line", type: "string", group: "price", description: "Optional. No countdown timers." }),
    draftField("content"),
  ],
  preview: { select: { title: "name", subtitle: "tagline" } },
});
