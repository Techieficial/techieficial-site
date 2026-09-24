import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, MinusIcon } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/site.config";
import { home } from "@/content/home";
import { homeFaqs } from "@/content/faq";
import { packages } from "@/content/pricing";
import { recordedCallAudio } from "@/content/gallery";
import { getCaseStudies, getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { CaseStudyCard, CTABand, DemoCallBlock, FAQAccordion, LogoMarquee, PricingCard, ServiceCard } from "@/components/blocks";
import { GrowthWheel } from "@/components/GrowthWheel";
import { CountUp, Reveal } from "@/components/Reveal";
import { Button, Container, Section, SectionHeader } from "@/components/ui";

export const metadata = pageMetadata({ ...home.seo, path: "/" });

export default function HomePage() {
  const services = getServices();
  const studies = getCaseStudies().slice(0, 3);
  const wheelServices = services.map((s) => ({
    slug: s.slug,
    name: s.name,
    navName: s.navName,
    outcome: s.outcome,
    highlights: s.highlights,
    url: s.url,
    icon: s.icon,
    color: siteConfig.serviceColors[s.slug],
  }));
  const { hero } = home;

  return (
    <>
      {/* 1. Hero */}
      <section id="top" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        <div aria-hidden className="pointer-events-none absolute -top-48 right-[-15%] -z-10 size-[820px] rounded-full bg-[radial-gradient(closest-side,rgba(124,92,255,0.32),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute bottom-[-30%] left-[-20%] -z-10 size-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.14),transparent)]" />
        <Container className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface/70 px-3.5 py-1.5 text-sm font-medium">
              <span aria-hidden className="size-2 rounded-full bg-accent-2" />
              {hero.tag}
            </p>
            <h1 className="mt-6 text-[length:var(--text-display)] font-bold leading-[1.02] tracking-[-0.035em]">
              {hero.titleStart} <span className="text-electric">{hero.titleHighlight}</span>
              {hero.titleEnd}
            </h1>
            <p className="mt-6 max-w-[46ch] text-[length:var(--text-lead)] leading-relaxed text-muted">{hero.sub}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={siteConfig.cta.primary.href} size="lg">
                {siteConfig.cta.primary.label}
              </Button>
              <Button href={siteConfig.cta.demo.href} size="lg" variant="secondary" arrow={false}>
                {siteConfig.cta.demo.label}
              </Button>
            </div>
            {hero.stats.length > 0 && (
              <dl className="mt-10 flex flex-wrap gap-3">
                {hero.stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-rule bg-surface/70 px-4 py-3">
                    <dd className="font-display text-2xl font-bold">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </dd>
                    <dt className="text-sm text-muted">{s.label}</dt>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <GrowthWheel services={wheelServices} />
        </Container>
      </section>

      {/* 2. Trust */}
      <LogoMarquee lead={home.trust.lead} items={siteConfig.countries} />

      {/* 3. Problem */}
      <Section id="problem" labelledBy="problem-title">
        <SectionHeader id="problem-title" title={home.problem.title} intro={home.problem.intro} />
        <div className="grid gap-5 md:grid-cols-3">
          {home.problem.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-[20px] border border-rule bg-surface p-7">
                <p className="font-display text-5xl font-bold tracking-[-0.03em] text-electric">{c.stat}</p>
                <p className="mt-2 text-sm text-muted">{c.statLabel}</p>
                <h3 className="mt-6 text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
                <a href={c.href} className="mt-auto inline-flex items-center gap-1 pt-6 text-sm text-accent-text hover:text-ink" rel="noopener" target="_blank">
                  Source: {c.source}
                  <ArrowUpRightIcon aria-hidden className="size-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. Services */}
      <Section id="services" tone="raised" labelledBy="services-title">
        <SectionHeader
          id="services-title"
          title={home.services.title}
          intro={home.services.intro}
          action={
            <Link href="/services" className="inline-flex items-center gap-1.5 font-medium text-accent-text hover:text-ink">
              All services <ArrowRightIcon aria-hidden className="size-4" />
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <ServiceCard service={s} size={i < 2 ? "lg" : "md"} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5. Live demo teaser (shown when the demo number exists) */}
      {siteConfig.contact.demoPhone && (
        <section className="py-20 md:py-28" aria-label="Live demo">
          <Container>
            <DemoCallBlock title={home.demo.title} body={home.demo.body}>
              {recordedCallAudio && (
                <div>
                  <p className="mb-2 text-sm text-muted">{home.demo.audioLabel}</p>
                  <audio controls preload="none" src={recordedCallAudio} className="w-full max-w-md" />
                </div>
              )}
            </DemoCallBlock>
          </Container>
        </section>
      )}

      {/* 6. How it works */}
      <Section id="process" labelledBy="process-title">
        <SectionHeader id="process-title" title={home.process.title} intro={home.process.intro} />
        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent to-accent-2 md:left-0 md:top-[19px] md:h-px md:w-full md:bg-gradient-to-r" />
          {home.process.steps.map((s, i) => (
            <li key={s.title} className="relative pl-16 md:pl-0 md:pt-16">
              <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-full border border-rule bg-surface-2 font-display font-bold">
                {i + 1}
              </span>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 7. Results (hidden until real case studies exist) */}
      {studies.length > 0 && (
        <Section tone="raised" labelledBy="results-title">
          <SectionHeader id="results-title" title={home.results.title} intro={home.results.intro} />
          <div className="grid gap-5 md:grid-cols-3">
            {studies.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </Section>
      )}

      {/* 8. Packages preview */}
      <Section labelledBy="packages-title">
        <SectionHeader
          id="packages-title"
          title={home.packages.title}
          intro={home.packages.intro}
          action={
            <Link href="/pricing" className="inline-flex items-center gap-1.5 font-medium text-accent-text hover:text-ink">
              {home.packages.link} <ArrowRightIcon aria-hidden className="size-4" />
            </Link>
          }
        />
        <div className="grid gap-5 pt-3 md:grid-cols-3">
          {packages.map((p) => (
            <PricingCard key={p.key} pkg={p} compact />
          ))}
        </div>
      </Section>

      {/* 9. Academy strip */}
      <section id="academy" aria-labelledby="academy-title" className="py-10">
        <Container>
          <div className="relative flex flex-col gap-8 overflow-hidden rounded-[28px] border border-rule bg-surface p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div aria-hidden className="pointer-events-none absolute -left-20 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(163,230,53,0.28),transparent)]" />
            <div className="relative max-w-2xl">
              <h2 id="academy-title" className="text-[length:var(--text-h3)] font-bold leading-tight tracking-[-0.02em] md:text-4xl">
                {home.academy.title}
              </h2>
              <p className="mt-4 text-muted">{home.academy.body}</p>
            </div>
            <Button href={siteConfig.cta.waitlist.href} variant="secondary" size="lg" className="relative shrink-0">
              {siteConfig.cta.waitlist.label}
            </Button>
          </div>
        </Container>
      </section>

      {/* 10. Comparison */}
      <Section labelledBy="compare-title">
        <SectionHeader id="compare-title" title={home.comparison.title} />
        <div className="overflow-x-auto rounded-[20px] border border-rule">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <caption className="sr-only">{home.comparison.title}</caption>
            <thead>
              <tr className="border-b border-rule">
                <td className="p-5" />
                {home.comparison.columns.map((c, i) => (
                  <th key={c} scope="col" className={`p-5 font-display text-lg font-semibold ${i === 0 ? "bg-surface-2 text-accent-text" : "text-muted"}`}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {home.comparison.rows.map((r) => (
                <tr key={r.label} className="border-b border-rule last:border-b-0">
                  <th scope="row" className="p-5 font-medium">
                    {r.label}
                  </th>
                  {r.values.map((v, i) => (
                    <td key={v} className={`p-5 align-top leading-relaxed ${i === 0 ? "bg-surface-2" : "text-muted"}`}>
                      <span className="flex gap-2.5">
                        {i === 0 ? (
                          <CheckIcon weight="bold" aria-hidden className="mt-1 size-4 shrink-0 text-accent-2" />
                        ) : (
                          <MinusIcon aria-hidden className="mt-1 size-4 shrink-0" />
                        )}
                        {v}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 11. FAQ */}
      <Section id="faq" tone="raised" labelledBy="faq-title">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 id="faq-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
              {home.faq.title}
            </h2>
            <Link href="/faq" className="mt-6 inline-flex items-center gap-1.5 font-medium text-accent-text hover:text-ink">
              {home.faq.link} <ArrowRightIcon aria-hidden className="size-4" />
            </Link>
          </div>
          <FAQAccordion items={homeFaqs} />
        </div>
      </Section>

      {/* 12. Final CTA */}
      <CTABand id="start" title={home.finalCta.title} body={home.finalCta.body} />
    </>
  );
}
