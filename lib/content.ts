import { blog, industries, legal, services, work } from "#site/content";
import type { ServiceSlug } from "@/site.config";

const live = <T extends { draft: boolean }>(items: T[]) => items.filter((i) => !i.draft);

export type Service = (typeof services)[number];
export type Industry = (typeof industries)[number];
export type CaseStudy = (typeof work)[number];
export type Post = (typeof blog)[number];
export type LegalDoc = (typeof legal)[number];

/** Services whose page was replaced by a v3 page: their links point there and no service page is built. */
const replacedServicePages: Record<string, string> = { "ai-agents": "/ai-team" };

export const getServices = () =>
  live(services)
    .map((s) => (replacedServicePages[s.slug] ? { ...s, url: replacedServicePages[s.slug] } : s))
    .sort((a, b) => a.order - b.order);

/** Services that still have their own /services/[slug] page. */
export const getServicePages = () => getServices().filter((s) => !replacedServicePages[s.slug]);
export const getService = (slug: string) => getServices().find((s) => s.slug === slug);
export const serviceBySlug = (slug: ServiceSlug) => getService(slug)!;

export const getIndustries = () => live(industries);
export const getIndustry = (slug: string) => getIndustries().find((i) => i.slug === slug);

export const getCaseStudies = () => live(work);
export const getCaseStudy = (slug: string) => getCaseStudies().find((c) => c.slug === slug);
export const hasWork = () => getCaseStudies().length > 0;

export const getPosts = () =>
  live(blog).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export const getLegalDocs = () => live(legal);
export const getLegalDoc = (slug: string) => getLegalDocs().find((d) => d.slug === slug);
