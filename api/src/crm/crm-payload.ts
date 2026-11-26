import type { CrmPayload } from "../data/types.js";

/**
 * Same rules as lib/crm.ts on the site (a test checks both give the same payload).
 * Site form id to CRM `source`, and site form id to CRM tag (docs/CRM_SETUP.md section 3).
 */
export const leadSources = {
  contact: "booked-call",
  "demo-callme": "demo-callme",
  "test-build": "test-build",
  newsletter: "newsletter",
  academy: "academy-waitlist",
  agency: "agency-partner",
  audit: "audit",
  calculator: "calculator",
} as const;

export type LeadSource = keyof typeof leadSources;
export const leadSourceKeys = Object.keys(leadSources) as LeadSource[];

/** Every tag the CRM workflow accepts. */
export const crmTags = ["booked-call", "contact-form", "demo-callme", "test-build", "newsletter", "academy-waitlist", "agency-partner", "engine-builder", "audit", "calculator"] as const;

const crmSource: Record<LeadSource, string> = {
  contact: "contact-form",
  "demo-callme": "demo-callme",
  "test-build": "test-build",
  newsletter: "newsletter",
  academy: "academy-waitlist",
  agency: "agency-partner",
  audit: "audit",
  calculator: "calculator",
};

export type LeadFields = {
  source: LeadSource;
  name?: string;
  company?: string;
  email: string;
  phone?: string;
  businessType?: string;
  goal?: string;
  budget?: string;
  message?: string;
  smsConsent?: boolean;
  answers?: Record<string, string>;
  selection?: Record<string, string>;
  page?: string;
};

function crmTag(lead: LeadFields) {
  if (lead.source === "contact") return lead.selection?.size || lead.selection?.goal ? "engine-builder" : "contact-form";
  return crmSource[lead.source];
}

function splitName(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return { first: parts[0] ?? "", last: parts.slice(1).join(" ") };
}

export function toCrmPayload(lead: LeadFields, ctx: { pageUrl?: string; utm?: Record<string, string> }): CrmPayload {
  const { first, last } = splitName(lead.name);
  const extra = Object.entries(lead.answers ?? {}).map(([q, a]) => `${q}: ${a}`);
  const message = [lead.message, ...extra].filter(Boolean).join("\n");
  const sel = lead.selection ?? {};
  const utm = ctx.utm ?? {};
  return {
    first_name: first,
    last_name: last,
    email: lead.email,
    phone: lead.phone ?? "",
    company_name: lead.company ?? "",
    source: crmSource[lead.source],
    tag: crmTag(lead),
    business_type: lead.businessType ?? "",
    business_size: sel.size ?? "",
    main_goal: lead.goal ?? sel.goal ?? "",
    budget_range: lead.budget ?? "",
    message,
    product_interest: sel.package ?? sel.service ?? "",
    selected_services: sel.services ?? "",
    sms_consent: lead.smsConsent ? "true" : "false",
    page_url: ctx.pageUrl ?? "",
    utm_source: utm.utm_source ?? "",
    utm_medium: utm.utm_medium ?? "",
    utm_campaign: utm.utm_campaign ?? "",
    utm_content: utm.utm_content ?? "",
    utm_term: utm.utm_term ?? "",
  };
}
