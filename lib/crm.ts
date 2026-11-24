import type { LeadOutput, LeadSource } from "./lead";

/**
 * Builds the flat payload the CRM workflow expects (docs/CRM_SETUP.md, section 3).
 * Every key is always sent, empty when unknown, so the CRM mapping never breaks.
 */

/** Site form id to the CRM `source` value ("Website: {source}" in the CRM). */
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

/** One CRM tag per submission, from the allowed list in docs/CRM_SETUP.md. */
function crmTag(lead: LeadOutput) {
  if (lead.source === "contact") return lead.selection?.size || lead.selection?.goal ? "engine-builder" : "contact-form";
  return crmSource[lead.source];
}

function splitName(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return { first: parts[0] ?? "", last: parts.slice(1).join(" ") };
}

export function toCrmPayload(lead: LeadOutput, ctx: { pageUrl?: string; utm?: Record<string, string> }) {
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
