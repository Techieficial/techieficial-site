import { siteConfig } from "@/site.config";
import { getIndustries, getPosts, getServices } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** Plain-text summary of the company for AI search engines (llmstxt.org format). */
export function GET() {
  const link = (name: string, path: string, note?: string) => `- [${name}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.name} is an ${siteConfig.tagline.toLowerCase()}. ${siteConfig.mission} Clients in ${siteConfig.countries.join(", ")}.`,
    "",
    "## Services",
    ...getServices().map((s) => link(s.name, s.url, s.outcome)),
    "",
    "## Industries",
    ...getIndustries().map((i) => link(i.name, i.url, i.description)),
    "",
    "## Key pages",
    link("Demo Lab", "/demo", "Test the AI receptionist and book a test build"),
    link("Pricing", "/pricing", "Packages and the Engine Builder"),
    link("Agencies", "/agencies", "White-label fulfillment for agencies"),
    link("Academy", "/academy", "Training and courses waitlist"),
    link("FAQ", "/faq"),
    link("Book a demo", "/contact"),
    "",
    "## Blog",
    ...getPosts().map((p) => link(p.title, p.url, p.description)),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
