import type { APIRequestContext } from "@playwright/test";

/** Every public route from the sitemap, plus pages kept out of it on purpose. */
export async function allRoutes(request: APIRequestContext) {
  const xml = await (await request.get("/sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  return [...paths, "/thank-you"];
}
