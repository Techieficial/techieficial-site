import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ui } from "@/content/pages";
import { packages } from "@/content/pricing";
import { getCaseStudies, getIndustries, getIndustry, serviceBySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { CaseStudyCard, CTABand, FAQAccordion, PageHero, PricingCard, ServiceCard } from "@/components/blocks";
import { Button, Section, SectionHeader } from "@/components/ui";
import { siteConfig } from "@/site.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return getIndustries().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const i = getIndustry((await params).slug);
  if (!i) return {};
  return pageMetadata({ title: i.seoTitle, description: i.description, path: i.url });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();
  const pkg = packages.find((p) => p.key === ind.packageKey);
  const services = ind.services.map((s) => serviceBySlug(s));
  const study = getCaseStudies().find((c) => c.industry.toLowerCase().includes(ind.name.toLowerCase().split(" ")[0]));

  return (
    <>
      <PageHero title={ind.headline} intro={ind.intro} crumbs={[{ name: ind.name, path: ind.url }]} color="#22D3EE">
        <Button href={siteConfig.cta.primary.href} size="lg">
          {siteConfig.cta.primary.label}
        </Button>
      </PageHero>

      <Section className="!pt-6" labelledBy="pains-title">
        <h2 id="pains-title" className="sr-only">
          {ui.painsTitle}
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {ind.pains.map((p) => (
            <article key={p.title} className="rounded-[20px] border border-rule bg-surface p-7">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="raised" labelledBy="workflow-title">
        <SectionHeader id="workflow-title" title={ui.workflowTitle} />
        <ol className="relative grid gap-4">
          {ind.workflow.map((w, i) => (
            <li key={w.title} className="grid gap-4 rounded-2xl border border-rule bg-bg p-6 md:grid-cols-[3rem_minmax(0,1fr)] md:items-start">
              <span className="grid size-10 place-items-center rounded-full bg-electric font-display font-bold text-on-accent">{i + 1}</span>
              <div>
                <h3 className="text-lg font-semibold">{w.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{w.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {pkg && (
        <Section labelledBy="pkg-title">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 id="pkg-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
                {ui.recommendedTitle}
              </h2>
              <p className="mt-5 max-w-[52ch] text-[length:var(--text-lead)] text-muted">{ind.packageWhy}</p>
            </div>
            <PricingCard pkg={pkg} />
          </div>
        </Section>
      )}

      {study && (
        <Section labelledBy="results-title">
          <SectionHeader id="results-title" title={ui.resultsTitle} />
          <div className="max-w-xl">
            <CaseStudyCard study={study} />
          </div>
        </Section>
      )}

      <Section tone="raised" labelledBy="services-title">
        <SectionHeader id="services-title" title={`${ui.servicesForTitle} ${ind.name.toLowerCase()}`} />
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <Section labelledBy="faq-title">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 id="faq-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
            {ui.faqTitle} {ind.name.toLowerCase()}
          </h2>
          <FAQAccordion items={ind.faqs} />
        </div>
      </Section>

      <CTABand title={ui.industryCtaTitle} body={ui.serviceCtaBody} />
    </>
  );
}
