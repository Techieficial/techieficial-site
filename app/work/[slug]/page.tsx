import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ui } from "@/content/pages";
import { getCaseStudies, getCaseStudy, serviceBySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { CTABand, PageHero, Prose, ServiceCard } from "@/components/blocks";
import { Section, SectionHeader } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return pageMetadata({ title: `${c.title} | Techieficial`.slice(0, 60), description: c.summary, path: c.url, type: "article" });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  return (
    <>
      <PageHero
        title={c.title}
        intro={`${c.client}. ${c.industry}, ${c.country}.`}
        crumbs={[
          { name: "Work", path: "/work" },
          { name: c.client, path: c.url },
        ]}
      />
      <Section className="!pt-4" labelledBy="results-title">
        <h2 id="results-title" className="sr-only">
          {ui.results}
        </h2>
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.results.map((r) => (
            <div key={r.label} className="rounded-[20px] border border-rule bg-surface p-6">
              <dd className="font-display text-4xl font-bold text-electric">{r.value}</dd>
              <dt className="mt-2 text-muted">{r.label}</dt>
            </div>
          ))}
        </dl>
      </Section>
      <Section tone="raised" labelledBy="problem-title">
        <SectionHeader id="problem-title" title={ui.problem} />
        <p className="max-w-[65ch] text-[length:var(--text-lead)] leading-relaxed text-muted">{c.problem}</p>
      </Section>
      <Section labelledBy="built-title">
        <SectionHeader id="built-title" title={ui.whatWeBuilt} />
        <ol className="grid gap-4 md:grid-cols-2">
          {c.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-rule bg-surface p-6">
              <span className="font-display text-sm font-bold text-accent-text">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        {c.body && (
          <div className="mt-12">
            <Prose html={c.body} />
          </div>
        )}
      </Section>
      {c.testimonial && (
        <Section tone="raised">
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="font-display text-[length:var(--text-h3)] font-semibold leading-snug">&ldquo;{c.testimonial.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 text-muted">
              {c.testimonial.name}, {c.testimonial.role}
            </figcaption>
          </figure>
        </Section>
      )}
      <Section labelledBy="used-title">
        <SectionHeader id="used-title" title={ui.servicesUsed} />
        <div className="grid gap-5 md:grid-cols-3">
          {c.services.map((s) => (
            <ServiceCard key={s} service={serviceBySlug(s)} />
          ))}
        </div>
      </Section>
      <CTABand title={ui.industryCtaTitle} body={ui.serviceCtaBody} />
    </>
  );
}
