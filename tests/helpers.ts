import type { APIRequestContext } from "@playwright/test";

/** Every public route from the sitemap, plus pages kept out of it on purpose. */
export async function allRoutes(request: APIRequestContext) {
  const xml = await (await request.get("/sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  return [...paths, "/thank-you"];
}

/** Text a crawler reads from the raw page HTML: scripts, styles and tags stripped, entities decoded. */
export function htmlText(html: string) {
  const body = html.split(/<body[^>]*>/)[1] ?? html;
  return body
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

export const countOf = (text: string, needle: string) => text.split(needle).length - 1;
