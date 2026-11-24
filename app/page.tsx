import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/site.config";
import { home } from "@/content/home";
import { packages } from "@/content/pricing";
import { recordedCallAudio } from "@/content/gallery";
import { getCaseStudies, getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { CaseStudyCard, CTABand, DemoCallBlock, PricingCard, ServiceCard, TrustLine } from "@/components/blocks";
import { GrowthWheel } from "@/components/GrowthWheel";
import { HashRedirect } from "@/components/HashRedirect";
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
      {/* 1. Hero: centred message, then the main visual (the "viewing point"). */}
      <section id="top" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        <div aria-hidden className="pointer-events-none absolute -top-64 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
        <Container className="flex flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface/70 px-3.5 py-1.5 text-sm font-medium">
            <span aria-hidden className="size-2 rounded-full bg-accent" />
            {hero.tag}
          </p>
          <h1 className="mt-6 max-w-[16ch] text-[length:var(--text-display)] font-bold leading-[1.02] tracking-[-0.035em]">
            {hero.titleStart} <span className="text-electric">{hero.titleHighlight}</span>
            {hero.titleEnd}
          </h1>
          <p className="mt-6 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-muted">{hero.sub}</p>
          <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href={siteConfig.cta.primary.href} size="lg">
              {siteConfig.cta.primary.label}
            </Button>{" "}
            <Button href={siteConfig.cta.demo.href} size="lg" variant="secondary" arrow={false}>
              {siteConfig.cta.demo.label}
            </Button>
          </div>
          <TrustLine lead={home.trust.lead} items={siteConfig.countries} />
          {hero.stats.length > 0 && (
            <dl className="mt-10 flex flex-wrap justify-center gap-3">
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
        </Container>
        {/* Main visual. The wheel stands in until the owner's hero video is ready (see content/_missing.md). */}
        <Container className="mt-14 md:mt-20">
          <div className="mx-auto max-w-[640px]">
            <GrowthWheel services={wheelServices} />
          </div>
        </Container>
      </section>

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

      {/* Old one-page anchors (#problem, #academy, #faq) forward to their own pages. */}
      <HashRedirect map={home.movedAnchors} />

      {/* Final CTA */}
      <CTABand id="start" title={home.finalCta.title} body={home.finalCta.body} />
    </>
  );
}
