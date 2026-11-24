import { getCaseStudies, getIndustries, getLegalDocs, getPosts, getServicePages, hasWork } from "./content";
import { team, teamUrl } from "@/content/team";

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
    "/ai-team",
  ];
  if (hasWork()) staticPaths.push("/work");

  return [
    ...staticPaths.map((path) => ({ path })),
    ...getServicePages().map((s) => ({ path: s.url })),
    ...team.map((m) => ({ path: teamUrl(m.slug) })),
    ...getIndustries().map((i) => ({ path: i.url })),
    ...getCaseStudies().map((c) => ({ path: c.url })),
    ...getPosts().map((p) => ({ path: p.url, lastModified: p.updated ?? p.date })),
    ...getLegalDocs().map((d) => ({ path: d.url, lastModified: d.updated })),
  ];
}
