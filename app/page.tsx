import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { siteConfig, telHref } from "@/site.config";
import { home } from "@/content/home";
import { featuredOffers } from "@/content/pricing";
import { growthAddOns, team, teamCopy } from "@/content/team";
import { recordedCallAudio } from "@/content/gallery";
import { getCaseStudies } from "@/lib/content";
import { liveHref } from "@/lib/nav";
import { pageMetadata } from "@/lib/seo";
import { CaseStudyCard, CTABand, DemoCallBlock, FAQAccordion, PricingCard, TrustLine } from "@/components/blocks";
import { GrowthWheel, type WheelService } from "@/components/GrowthWheel";
import { CountUp } from "@/components/Reveal";
import { ComparisonSection, ProblemSection } from "@/components/sections";
import { LeadStory, profileHref, TeamCards } from "@/components/team";
import { Button, Container, Section, SectionHeader } from "@/components/ui";

export const metadata = pageMetadata({ ...home.seo, path: "/" });

/** Homepage, docs/SITE_CONTENT_V3.md section 2.1: 12 sections in order. */
export default function HomePage() {
  const studies = getCaseStudies().slice(0, 3);
  const shades = Object.values(siteConfig.serviceColors);
  const wheel: WheelService[] = [
    ...team.map((m, i) => ({
      slug: m.slug,
      name: m.name,
      navName: m.short,
      outcome: m.line,
      highlights: m.cardSkills,
      url: profileHref(m),
      icon: m.icon,
      color: shades[i],
      linkLabel: teamCopy.viewProfile,
    })),
    {
      slug: "growth-add-ons",
      name: growthAddOns.name,
      navName: growthAddOns.short,
      outcome: growthAddOns.line,
      highlights: growthAddOns.skills,
      url: growthAddOns.href,
      icon: growthAddOns.icon,
      color: shades[4],
      linkLabel: growthAddOns.linkLabel,
    },
  ];
  const { hero } = home;
  const phone = siteConfig.contact.demoPhone;
  const teamHref = liveHref({ href: "/ai-team", fallback: "/services/ai-agents" });
  const wholeTeamHref = liveHref({ href: "/offers/ai-front-office", fallback: "/pricing" });
  const offersHref = liveHref({ href: "/offers", fallback: "/pricing" });
  const insideHref = liveHref({ href: "/inside" });

  return (
    <>
      {/* 1. Hero: centred message, then the main visual (the AI team wheel). */}
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
          <p className="mt-6 max-w-[60ch] text-[length:var(--text-lead)] leading-relaxed text-muted">{hero.sub}</p>
          <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href={siteConfig.cta.demo.href} size="lg">
              {siteConfig.cta.demo.label}
            </Button>{" "}
            <Button href={siteConfig.cta.primary.href} size="lg" variant="secondary" arrow={false}>
              {siteConfig.cta.primary.label}
            </Button>
          </div>
          <TrustLine lead={home.trust.lead} items={home.trust.countries} />
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
        {/* Main visual: the AI team wheel, until the owner's hero video is ready (content/_missing.md). */}
        <Container className="mt-14 md:mt-20">
          <div className="mx-auto max-w-[640px]">
            <GrowthWheel services={wheel} label={teamCopy.wheelLabel} hubLabel={teamCopy.hub} />
          </div>
        </Container>
      </section>

      {/* 2. Follow one lead */}
      <Section id="story" tone="raised" labelledBy="story-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader id="story-title" title={home.story.title} intro={home.story.intro} />
          </div>
          <div>
            <LeadStory steps={home.story.steps} />
            <p className="mt-10 font-display text-xl font-semibold">{home.story.closing}</p>
            {teamHref && (
              <Button href={teamHref} variant="secondary" arrow={false} className="mt-6">
                {home.story.button}
              </Button>
            )}
          </div>
        </div>
      </Section>

      {/* 3. The problem */}
      <ProblemSection />

      {/* 4. Meet the team (id "services" keeps old /#services links working) */}
      <Section id="services" tone="raised" labelledBy="team-title">
        <SectionHeader
          id="team-title"
          title={home.team.title}
          action={
            wholeTeamHref && (
              <Link href={wholeTeamHref} className="inline-flex items-center gap-1.5 font-medium text-accent-text hover:text-ink">
                {home.team.button} <ArrowRightIcon aria-hidden className="size-4" />
              </Link>
            )
          }
        />
        <TeamCards />
      </Section>

      {/* 5. We run on it */}
      <Section labelledBy="proof-title">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="proof-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
            {home.proof.title}
          </h2>
          <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-muted">
            {home.proof.body}
            {phone && ` ${home.proof.demoLine}`} {home.proof.close}
          </p>
          {insideHref && (
            <Button href={insideHref} variant="secondary" arrow={false} className="mt-8">
              {home.proof.button}
            </Button>
          )}
        </div>
      </Section>

      {/* 6. Offers preview */}
      <Section tone="raised" labelledBy="packages-title">
        <SectionHeader
          id="packages-title"
          title={home.packages.title}
          intro={home.packages.intro}
          action={
            offersHref && (
              <Link href={offersHref} className="inline-flex items-center gap-1.5 font-medium text-accent-text hover:text-ink">
                {home.packages.link} <ArrowRightIcon aria-hidden className="size-4" />
              </Link>
            )
          }
        />
        <div className="grid gap-5 pt-3 md:grid-cols-3">
          {featuredOffers.map((o) => (
            <PricingCard key={o.slug} offer={o} compact />
          ))}
        </div>
      </Section>

      {/* 7. How it works */}
      <Section id="process" labelledBy="process-title">
        <SectionHeader id="process-title" title={home.process.title} intro={home.process.intro || undefined} />
        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-rule md:left-0 md:top-[19px] md:h-px md:w-full" />
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

      {/* 8. Demo teaser: call the AI when the demo number exists, otherwise book a live demo */}
      <section className="py-10 md:py-16" aria-labelledby="demo-title">
        <Container>
          {phone ? (
            <DemoCallBlock title={home.demo.title} body={home.demo.body} titleId="demo-title">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={telHref(phone)} data-event="demo_call_started">
                  {siteConfig.cta.callAi.label}
                </Button>{" "}
                <Button href="/demo" variant="secondary" arrow={false}>
                  {home.demo.callMe}
                </Button>
              </div>
              {recordedCallAudio && (
                <div className="mt-6">
                  <p className="mb-2 text-sm text-muted">{home.demo.audioLabel}</p>
                  <audio controls preload="none" src={recordedCallAudio} className="w-full max-w-md" />
                </div>
              )}
            </DemoCallBlock>
          ) : (
            <div className="relative overflow-hidden rounded-[28px] border border-rule bg-surface p-8 md:p-12">
              <h2 id="demo-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
                {home.demo.noPhoneTitle}
              </h2>
              <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] text-muted">{home.demo.noPhoneBody}</p>
              <Button href="/demo#build" size="lg" className="mt-8">
                {home.demo.noPhoneButton}
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Results (hidden until real case studies exist) */}
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

      {/* 9. Comparison */}
      <ComparisonSection />

      {/* 10. Academy strip */}
      <section id="academy" aria-labelledby="academy-title" className="py-10">
        <Container>
          <div className="relative flex flex-col gap-8 overflow-hidden rounded-[28px] border border-rule bg-surface p-8 md:flex-row md:items-center md:justify-between md:p-12">
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
          <FAQAccordion items={home.faq.items} />
        </div>
      </Section>

      {/* 12. Final CTA */}
      <CTABand id="start" title={home.finalCta.title} />
    </>
  );
}
