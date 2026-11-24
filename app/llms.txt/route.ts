import { siteConfig } from "@/site.config";
import { getIndustries, getPosts, getServicePages } from "@/lib/content";
import { team, teamUrl } from "@/content/team";
import { offers } from "@/content/pricing";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** Plain-text summary of the company for AI search engines (llmstxt.org format). */
export function GET() {
  const link = (name: string, path: string, note?: string) => `- [${name}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.name} builds, trains and manages AI teams for service businesses: an AI Receptionist, AI Lead Responder, AI Follow-up Agent and AI Reviews Agent working 24/7 inside the client's CRM. Clients in ${siteConfig.countries.join(", ")}.`,
    "",
    "## The AI team",
    link("Meet the AI team", "/ai-team"),
    ...team.map((m) => link(m.profileName ?? m.name, teamUrl(m.slug), m.line)),
    "",
    "## Offers",
    ...offers.map((o) => link(o.name, `/offers/${o.slug}`, o.tagline)),
    "",
    "## More services",
    ...getServicePages().map((s) => link(s.name, s.url, s.outcome)),
    "",
    "## Industries",
    ...getIndustries().map((i) => link(i.name, i.url, i.description)),
    "",
    "## Key pages",
    link("Demo Lab", "/demo", "Interview the AI team and book a test build"),
    link("Inside Techieficial", "/inside", "What runs Techieficial today"),
    link("Missed-call calculator", "/tools/missed-call-calculator", "Estimate what missed calls cost you"),
    link("Free lead-leak audit", "/audit"),
    link("Offers and pricing", "/offers", "Every offer with setup and monthly prices, add-ons and the Team Builder"),
    link("Agencies", "/agencies", "White-label fulfillment for agencies"),
    link("Academy", "/academy", "Training and courses waitlist"),
    link("FAQ", "/faq"),
    link("Book a strategy call", "/contact"),
    "",
    "## Blog",
    ...getPosts().map((p) => link(p.title, p.url, p.description)),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
