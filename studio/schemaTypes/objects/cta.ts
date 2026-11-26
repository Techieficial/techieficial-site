import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Button text", type: "string", validation: (rule) => rule.required().max(40) }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "A site path such as /contact, or a full https:// address.",
      validation: (rule) =>
        rule.required().custom((value) => (typeof value !== "string" || /^(\/|https:\/\/|#)/.test(value) ? true : "Start with /, # or https://")),
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: { list: ["primary", "secondary", "link"], layout: "radio" },
      initialValue: "primary",
    }),
    defineField({
      name: "event",
      title: "Conversion event",
      type: "string",
      description: "Analytics event fired on click (CLAUDE.md section 11).",
      options: {
        list: ["book_call", "demo_call_started", "callme_submit", "form_submit", "newsletter_signup", "engine_builder_complete", "test_build_booked"],
      },
    }),
  ],
});
