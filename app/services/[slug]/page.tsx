import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon, CheckIcon, FlaskIcon } from "@phosphor-icons/react/dist/ssr";
import { readableOnDark, siteConfig } from "@/site.config";
import { ui } from "@/content/pages";
import { formatUsd, packages } from "@/content/pricing";
import { getCaseStudies, getIndustry, getService, getServices, serviceBySlug } from "@/lib/content";
import { pageMetadata, serviceLd } from "@/lib/seo";
import { CaseStudyCard, CTABand, DemoCallBlock, FAQAccordion, PageHero, ServiceCard } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Button, Section, SectionHeader } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.seoTitle, description: s.description, path: s.url });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const color = siteConfig.serviceColors[s.slug];
  const text = readableOnDark(color);
  const pkg = packages.find((p) => p.key === s.pricingKey);
  const study = getCaseStudies().find((c) => c.services.includes(s.slug));
  const industries = s.industries.map((slug) => getIndustry(slug)).filter((i) => i !== undefined);
  const related = s.related.map((slug) => serviceBySlug(slug));

  return (
    <>
      <JsonLd data={serviceLd({ name: s.name, description: s.description, url: s.url })} />
      <PageHero title={s.headline} intro={s.who} color={color} crumbs={[{ name: "Services", path: "/services" }, { name: s.name, path: s.url }]}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={siteConfig.cta.primary.href} size="lg">
            {siteConfig.cta.primary.label}
          </Button>
          <Button href="/demo" size="lg" variant="secondary" arrow={false}>
            {ui.seeDemo}
          </Button>
        </div>
      </PageHero>

      {/* Pains */}
      <Section labelledBy="pains-title" className="!pt-6">
        <h2 id="pains-title" className="sr-only">
          {ui.painsTitle}
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {s.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article className="h-full rounded-[20px] border border-rule bg-surface p-7" style={{ boxShadow: `inset 0 2px 0 ${color}` }}>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What we build */}
      <Section id="deliverables" tone="raised" labelledBy="build-title">
        <SectionHeader id="build-title" title={ui.buildTitle} intro={s.body ? <span dangerouslySetInnerHTML={{ __html: s.body.replace(/<\/?p>/g, "") }} /> : undefined} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.deliverables.map((d) => (
            <div key={d.title} className="rounded-2xl border border-rule bg-bg p-6">
              <CheckIcon weight="bold" aria-hidden className="size-5" style={{ color }} />
              <h3 className="mt-4 text-lg font-semibold">{d.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{d.body}</p>
            </div>
          ))}
        </div>
        {s.platforms.length > 0 && (
          <div className="mt-10">
            <p className="text-sm text-muted">{ui.platforms}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.platforms.map((p) => (
                <li key={p.name} className={`rounded-full border px-4 py-1.5 text-sm ${p.soon ? "border-dashed border-rule text-muted" : "border-rule bg-surface"}`}>
                  {p.name}
                  {p.soon && <span className="ml-1.5 text-xs">({ui.comingSoon})</span>}
                </li>
              ))}
            </ul>
            {s.note && <p className="mt-4 text-sm text-muted">{s.note}</p>}
          </div>
        )}
      </Section>

      {/* Demo */}
      <Section labelledBy="demo-title">
        {s.demo === "call" && siteConfig.contact.demoPhone ? (
          <DemoCallBlock title={ui.demoTitle} body={ui.demoCallBody} />
        ) : (
          <Link href="/demo" className="group flex flex-col gap-6 rounded-[28px] border border-rule bg-surface p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <h2 id="demo-title" className="text-[length:var(--text-h3)] font-bold md:text-3xl">
                {ui.demoTitle}
              </h2>
              <p className="mt-3 max-w-[52ch] text-muted">{ui.demoLabBody}</p>
            </div>
            <span className="inline-flex items-center gap-2 font-medium" style={{ color: text }}>
              <FlaskIcon aria-hidden weight="duotone" className="size-6" />
              {ui.demoLab}
              <ArrowRightIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        )}
      </Section>

      {/* Process */}
      <Section tone="raised" labelledBy="process-title">
        <SectionHeader id="process-title" title={ui.processTitle} />
        <ol className="grid gap-5 md:grid-cols-4">
          {s.process.map((p, i) => (
            <li key={p.title} className="rounded-2xl border border-rule bg-bg p-6">
              <p className="text-sm font-medium" style={{ color: text }}>
                {i + 1}. {p.when}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Results (only with a real case study) */}
      {study && (
        <Section labelledBy="results-title">
          <SectionHeader id="results-title" title={ui.resultsTitle} />
          <div className="max-w-xl">
            <CaseStudyCard study={study} />
          </div>
        </Section>
      )}

      {/* Pricing */}
      {pkg && (
        <Section labelledBy="pricing-title">
          <div className="flex flex-col gap-6 rounded-[28px] border border-rule bg-surface p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <h2 id="pricing-title" className="text-[length:var(--text-h3)] font-bold md:text-3xl">
                {ui.pricingTitle}
              </h2>
              <p className="mt-3 max-w-[56ch] text-muted">
                {ui.pricingFrom
                  .replace("{package}", pkg.name)
                  .replace("{setup}", formatUsd(pkg.setupFrom))
                  .replace("{monthly}", formatUsd(pkg.monthlyFrom))}
              </p>
            </div>
            <Button href="/pricing" variant="secondary" arrow={false}>
              {ui.pricingLink}
            </Button>
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section tone="raised" labelledBy="faq-title">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 id="faq-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
            {ui.faqTitle} {s.navName}
          </h2>
          <FAQAccordion items={s.faqs} />
        </div>
      </Section>

      {/* Related */}
      <Section labelledBy="related-title">
        <SectionHeader id="related-title" title={ui.relatedServices} />
        <div className="grid gap-5 md:grid-cols-2">
          {related.map((r) => (
            <ServiceCard key={r.slug} service={r} />
          ))}
        </div>
        {industries.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold">{ui.relatedIndustries}</h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={i.url} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-rule bg-surface px-5 hover:border-accent-hover">
                    {i.name}
                    <ArrowRightIcon aria-hidden className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <CTABand title={ui.serviceCtaTitle.replace("{name}", s.navName)} body={ui.serviceCtaBody} />
    </>
  );
}
