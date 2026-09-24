import rehypeSlug from "rehype-slug";
import { defineCollection, defineConfig, s } from "velite";

const status = s.enum(["approved", "needs-review"]).default("needs-review");
const serviceSlug = s.enum(["marketing-automation", "paid-ads", "ai-video", "ai-agents", "training"]);
const faq = s.object({ q: s.string(), a: s.string() });
const card = s.object({ title: s.string(), body: s.string() });

const services = defineCollection({
  name: "Service",
  pattern: "services/*.md",
  schema: s
    .object({
      slug: serviceSlug,
      order: s.number(),
      name: s.string(),
      navName: s.string(),
      icon: s.string(),
      outcome: s.string().max(90),
      headline: s.string(),
      who: s.string(),
      seoTitle: s.string().max(60),
      description: s.string().max(155),
      pains: s.array(card).length(3),
      deliverables: s.array(card).min(6).max(9),
      highlights: s.array(s.string()).length(3),
      platforms: s.array(s.object({ name: s.string(), soon: s.boolean().default(false) })).default([]),
      note: s.string().optional(),
      demo: s.enum(["call", "gallery", "video", "none"]).default("none"),
      process: s.array(s.object({ title: s.string(), when: s.string(), body: s.string() })).min(3),
      pricingKey: s.string(),
      faqs: s.array(faq).length(5),
      related: s.array(serviceSlug),
      industries: s.array(s.string()),
      status,
      draft: s.boolean().default(false),
      body: s.markdown(),
    })
    .transform((data) => ({ ...data, url: `/services/${data.slug}` })),
});

const industries = defineCollection({
  name: "Industry",
  pattern: "industries/*.md",
  schema: s
    .object({
      slug: s.slug("industries"),
      name: s.string(),
      navName: s.string(),
      headline: s.string(),
      intro: s.string(),
      seoTitle: s.string().max(60),
      description: s.string().max(155),
      pains: s.array(card).length(3),
      workflow: s.array(card).min(4).max(6),
      packageKey: s.string(),
      packageWhy: s.string(),
      services: s.array(serviceSlug).min(2),
      faqs: s.array(faq).min(3),
      status,
      draft: s.boolean().default(false),
    })
    .transform((data) => ({ ...data, url: `/industries/${data.slug}` })),
});

const work = defineCollection({
  name: "CaseStudy",
  pattern: "work/*.md",
  schema: s
    .object({
      slug: s.slug("work"),
      title: s.string(),
      client: s.string(),
      industry: s.string(),
      country: s.string(),
      summary: s.string().max(155),
      problem: s.string(),
      steps: s.array(card),
      results: s.array(s.object({ value: s.string(), label: s.string() })).min(1),
      testimonial: s.object({ quote: s.string(), name: s.string(), role: s.string() }).optional(),
      services: s.array(serviceSlug).min(1),
      status,
      draft: s.boolean().default(false),
      body: s.markdown(),
    })
    .transform((data) => ({ ...data, url: `/work/${data.slug}` })),
});

const blog = defineCollection({
  name: "Post",
  pattern: "blog/*.md",
  schema: s
    .object({
      slug: s.slug("blog"),
      title: s.string(),
      seoTitle: s.string().max(60),
      description: s.string().max(155),
      date: s.isodate(),
      updated: s.isodate().optional(),
      author: s.string(),
      services: s.array(serviceSlug).default([]),
      status,
      draft: s.boolean().default(false),
      metadata: s.metadata(),
      toc: s.toc(),
      body: s.markdown(),
    })
    .transform((data) => ({ ...data, url: `/blog/${data.slug}` })),
});

const legal = defineCollection({
  name: "Legal",
  pattern: "legal/*.md",
  schema: s
    .object({
      slug: s.enum(["privacy", "terms", "cookies", "sms-terms", "accessibility"]),
      title: s.string(),
      description: s.string().max(155),
      updated: s.isodate(),
      status,
      draft: s.boolean().default(false),
      body: s.markdown(),
    })
    .transform((data) => ({ ...data, url: `/${data.slug}` })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { services, industries, work, blog, legal },
  markdown: { gfm: true, rehypePlugins: [rehypeSlug] },
});
