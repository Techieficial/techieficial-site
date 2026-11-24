import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/site.config";
import { team, teamCopy, teamPage, teamUrl } from "@/content/team";
import { offerBySlug } from "@/content/pricing";
import { pageMetadata, serviceLd } from "@/lib/seo";
import { CTABand, FAQAccordion, PageHero, PricingCard } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { Button, Section, SectionHeader } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

const find = (slug: string) => team.find((m) => m.slug === slug);

export async function generateMetadata({ params }: PageProps<"/ai-team/[slug]">): Promise<Metadata> {
  const m = find((await params).slug);
  if (!m) return {};
  return pageMetadata({ ...m.seo, path: teamUrl(m.slug) });
}

/** AI employee profile (docs/SITE_CONTENT_V3.md 2.3). Sections without content are left out. */
export default async function ProfilePage({ params }: PageProps<"/ai-team/[slug]">) {
  const m = find((await params).slug);
  if (!m) notFound();
  const t = teamPage.profile;
  const facts = [
    { label: teamCopy.worksLabel, value: teamCopy.works },
    { label: t.reportsTo, value: t.reportsToValue },
    { label: t.livesIn, value: t.livesInValue },
  ];
  return (
    <>
      <JsonLd data={serviceLd({ name: m.profileName ?? m.name, description: m.seo.description, url: teamUrl(m.slug) })} />
      <PageHero
        title={m.h1}
        intro={m.profileName ?? m.name}
        crumbs={[
          { name: t.breadcrumb, path: "/ai-team" },
          { name: m.name, path: teamUrl(m.slug) },
        ]}
      >
        <dl className="flex flex-wrap gap-3">
          {facts.map((f) => (
            <div key={f.label} className="rounded-full border border-rule bg-surface/70 px-4 py-2 text-sm">
              <dt className="inline text-muted">{f.label}:</dt> <dd className="inline font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section className="!pt-4" labelledBy="job-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="job-title" className="text-[length:var(--text-h3)] font-bold md:text-3xl">
              {t.jobTitle}
            </h2>
            <p className="mt-4 text-[length:var(--text-lead)] leading-relaxed text-muted">{m.job}</p>
          </div>
          <div>
            <h2 className="text-[length:var(--text-h3)] font-bold md:text-3xl">{t.skillsTitle}</h2>
            <ul className="mt-4 space-y-3">
              {m.skills.map((s) => (
                <li key={s} className="flex gap-3">
                  <CheckIcon weight="bold" aria-hidden className="mt-1 size-5 shrink-0 text-accent-text" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {(m.day || m.never) && (
        <Section tone="raised" labelledBy={m.day ? "day-title" : "never-title"}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {m.day && (
              <div>
                <h2 id="day-title" className="text-[length:var(--text-h3)] font-bold md:text-3xl">
                  {t.dayTitle}
                </h2>
                <ol className="mt-6 space-y-4">
                  {m.day.map((d) => (
                    <li key={d.time} className="rounded-2xl border border-rule bg-bg p-5">
                      <p className="font-display text-sm font-semibold text-accent-text">{d.time}</p>
                      <p className="mt-1">{d.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {m.never && (
              <div>
                <h2 id="never-title" className="text-[length:var(--text-h3)] font-bold md:text-3xl">
                  {t.neverTitle}
                </h2>
                <p className="mt-6 flex gap-3 rounded-2xl border border-rule bg-bg p-5 leading-relaxed">
                  <XIcon weight="bold" aria-hidden className="mt-1 size-5 shrink-0 text-muted" />
                  {m.never}
                </p>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section labelledBy="hire-title">
        <SectionHeader id="hire-title" title={t.hireTitle} intro={m.hire.text} />
        <div className="grid gap-5 md:grid-cols-2 lg:max-w-4xl">
          {m.hire.offers.map((slug) => (
            <PricingCard key={slug} offer={offerBySlug(slug)} />
          ))}
        </div>
        <Button href={siteConfig.cta.demo.href} variant="ghost" arrow={false} className="mt-6 !px-0">
          {siteConfig.cta.demo.label}
        </Button>
      </Section>

      {m.faqs && (
        <Section tone="raised" labelledBy="pfaq-title">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <h2 id="pfaq-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
              {t.faqTitle}
            </h2>
            <FAQAccordion items={m.faqs} />
          </div>
        </Section>
      )}

      <CTABand title={t.ctaTitle} />
    </>
  );
}
