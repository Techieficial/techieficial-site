import * as z from "zod/mini";

/** Where a lead came from, and the CRM tag it gets. */
export const leadSources = {
  contact: "booked-call",
  "demo-callme": "demo-callme",
  "test-build": "test-build",
  newsletter: "newsletter",
  academy: "academy-waitlist",
  agency: "agency-partner",
} as const;

export type LeadSource = keyof typeof leadSources;

const text = (max: number) => z.optional(z.string().check(z.trim(), z.maxLength(max)));

const phone = z.string().check(z.trim(), z.regex(/^\+?[\d\s().-]{7,20}$/, "phone"));

// zod/mini keeps the browser bundle small; the same schema runs on the server.
export const leadSchema = z
  .object({
    source: z.enum(Object.keys(leadSources) as [LeadSource, ...LeadSource[]]),
    name: text(120),
    email: z.string().check(z.trim(), z.toLowerCase(), z.email("email"), z.maxLength(254)),
    phone: z.optional(z.union([phone, z.literal("")])),
    businessType: text(80),
    goal: text(120),
    budget: text(60),
    message: text(4000),
    smsConsent: z._default(z.boolean(), false),
    answers: z.optional(z.record(z.string(), z.string().check(z.maxLength(1000)))),
    selection: z.optional(z.record(z.string(), z.string().check(z.maxLength(300)))),
    page: text(500),
    /** Honeypot. Real people never fill this in. */
    website: z.optional(z.string().check(z.maxLength(0))),
    turnstileToken: text(4096),
  })
  .check(
    z.superRefine((data, ctx) => {
      if (data.source !== "newsletter" && !data.name) ctx.addIssue({ code: "custom", path: ["name"], message: "required", input: data.name });
      if ((data.source === "demo-callme" || data.source === "contact") && !data.phone) {
        ctx.addIssue({ code: "custom", path: ["phone"], message: "required", input: data.phone });
      }
    }),
  );

export type LeadInput = z.input<typeof leadSchema>;
