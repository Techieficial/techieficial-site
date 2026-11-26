import { defineField } from "sanity";
import { mustBeTrue } from "../../lib/rules";
import { defineDocument } from "../define";

/** Disclosure wording from PROOF_PACK section 1 (US FTC endorsement rules). */
export const defaultDiscountDisclosure = "Founding client: received a discounted build.";

/** A real client's words, published only with written permission. No star ratings. */
export const testimonial = defineDocument({
  name: "testimonial",
  title: "Testimonial",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, description: "The client's own words, unedited apart from typos.", validation: (rule) => rule.required() }),
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({
      name: "permissionToPublish",
      title: "Client gave written permission to publish",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.custom(mustBeTrue("Written permission is required before this testimonial is published.")),
    }),
    defineField({ name: "permissionNote", title: "Where the permission is kept", type: "string", description: "For example the email or form it came from." }),
    defineField({ name: "foundingClient", title: "Founding client (received a discount)", type: "boolean", initialValue: false }),
    defineField({
      name: "discountDisclosure",
      title: "Discount disclosure",
      type: "string",
      description: "Shown next to the quote. Required for founding clients.",
      initialValue: defaultDiscountDisclosure,
      hidden: ({ document }) => document?.foundingClient !== true,
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.foundingClient === true && !(typeof value === "string" && value.trim()) ? "Founding-client testimonials must say they received a discount." : true,
        ),
    }),
    defineField({ name: "caseStudy", title: "Related case study", type: "reference", to: [{ type: "caseStudy" }] }),
  ],
  preview: { select: { title: "name", subtitle: "company" } },
});
