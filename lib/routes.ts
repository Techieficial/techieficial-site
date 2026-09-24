import { getCaseStudies, getIndustries, getLegalDocs, getPosts, getServices, hasWork } from "./content";

export type RouteEntry = { path: string; lastModified?: string };

/** Every public page that exists. Used by the sitemap, llms.txt and tests. */
export function publicRoutes(): RouteEntry[] {
  const staticPaths = [
    "/",
    "/services",
    "/demo",
    "/pricing",
    "/agencies",
    "/academy",
    "/about",
    "/contact",
    "/faq",
    "/blog",
  ];
  if (hasWork()) staticPaths.push("/work");

  return [
    ...staticPaths.map((path) => ({ path })),
    ...getServices().map((s) => ({ path: s.url })),
    ...getIndustries().map((i) => ({ path: i.url })),
    ...getCaseStudies().map((c) => ({ path: c.url })),
    ...getPosts().map((p) => ({ path: p.url, lastModified: p.updated ?? p.date })),
    ...getLegalDocs().map((d) => ({ path: d.url, lastModified: d.updated })),
  ];
}
