import type { APIRequestContext } from "@playwright/test";

/** Every public route from the sitemap, plus pages kept out of it on purpose. */
export async function allRoutes(request: APIRequestContext) {
  const xml = await (await request.get("/sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  return [...paths, "/thank-you", "/thank-you/audit", "/thank-you/purchase"];
}

/** Text a crawler reads from the raw page HTML: scripts, styles and tags stripped, entities decoded. */
export function htmlText(html: string) {
  const body = html.split(/<body[^>]*>/)[1] ?? html;
  return body
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    // Block elements start a new line in the browser, so they separate text; inline tags do not.
    .replace(/<\/?(?:div|p|li|ul|ol|h[1-6]|section|article|header|footer|nav|main|aside|table|caption|thead|tbody|tr|td|th|dl|dt|dd|details|summary|figure|figcaption|form|fieldset|legend|br)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

export const countOf = (text: string, needle: string) => text.split(needle).length - 1;

/**
 * axe results for the site's own markup. Third-party iframes (the CRM booking calendar on /demo, video players)
 * are not judged on their inner markup, which we cannot change: axe gives an element inside a frame a target
 * with more than one part (frame, then element). The iframe element itself (frame-title etc.) is still checked.
 */
export function ownViolations<T extends { nodes: { target: unknown[] }[] }>(violations: T[]): T[] {
  return violations
    .map((v) => ({ ...v, nodes: v.nodes.filter((n) => n.target.length === 1) }))
    .filter((v) => v.nodes.length > 0);
}
