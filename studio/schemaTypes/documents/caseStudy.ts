import { defineField } from "sanity";
import { loomUrlRule, mustBeTrue } from "../../lib/rules";
import { defineDocument, serviceRefs, slugField } from "../define";

/**
 * Project story, following the PROOF_PACK section 2 template: who, before, what was built,
 * what changed, video. Real work only. By design there are no quote, rating or review fields
 * (PROOF_PACK section 1); quotes live in Testimonial, with permission.
 */
export const caseStudy = defineDocument({
  name: "caseStudy",
  title: "Case study",
  seo: true,
  groups: [
    { name: "story", title: "Story", default: true },
    { name: "proof", title: "Video and checks" },
  ],
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string", group: "story", validation: (rule) => rule.required() }),
    slugField("headline", "story"),
    defineField({ name: "clientName", title: "Client name", type: "string", group: "story", description: "Shown only when client naming is approved." }),
    defineField({
      name: "anonymousLabel",
      title: "Anonymous description",
      type: "string",
      group: "story",
      description: 'Used when the client is not named, for example "US HVAC business".',
    }),
    defineField({
      name: "clientNamingApproved",
      title: "Owner confirmed the client can be named or described this way",
      type: "boolean",
      group: "proof",
      description: "Must be on before publishing. Also confirms no NDA blocks this story.",
      initialValue: false,
      validation: (rule) => rule.custom(mustBeTrue("The owner must confirm client naming before this story is published.")),
    }),
    defineField({
      name: "clientDataChecked",
      title: "Videos checked for visible client data",
      type: "boolean",
      group: "proof",
      description: "Names, phone numbers and emails blurred or trimmed in every video.",
      initialValue: false,
      validation: (rule) => rule.custom(mustBeTrue("Check every video for visible client data before publishing.")),
    }),
    defineField({
      name: "foundersPastWork",
      title: "Founder's past work",
      type: "boolean",
      group: "story",
      description: 'Shows the "Founder\'s past work" label. Keep on for builds done before Techieficial.',
      initialValue: true,
    }),
    defineField({ name: "industry", title: "Industry", type: "string", group: "story" }),
    defineField({ name: "country", title: "Country", type: "string", group: "story" }),
    defineField({ name: "who", title: "Who", type: "text", rows: 2, group: "story", validation: (rule) => rule.required() }),
    defineField({ name: "before", title: "Before", type: "text", rows: 3, group: "story", validation: (rule) => rule.required() }),
    defineField({ name: "built", title: "What was built", type: "text", rows: 4, group: "story", validation: (rule) => rule.required() }),
    defineField({
      name: "changed",
      title: "What changed",
      type: "text",
      rows: 3,
      group: "story",
      description: "Only facts the owner stated or measured. No made-up results numbers.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "videos",
      title: "Loom videos",
      type: "array",
      group: "proof",
      of: [
        {
          type: "object",
          name: "loomVideo",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "url", title: "Loom link", type: "url", validation: (rule) => rule.required().custom(loomUrlRule) }),
            defineField({ name: "duration", title: "Length", type: "string", description: 'For example "5:14".' }),
          ],
          preview: { select: { title: "title", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "diagram",
      title: "Flow diagram",
      type: "image",
      group: "proof",
      description: "Use when there is no video. No client data.",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() })],
    }),
    serviceRefs("services", "Services used", "story"),
    defineField({ name: "industries", title: "Matching industry pages", type: "array", group: "story", of: [{ type: "reference", to: [{ type: "industry" }] }] }),
  ],
  preview: { select: { title: "headline", subtitle: "clientName" } },
});
