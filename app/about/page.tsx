import { GlobeHemisphereWestIcon } from "@phosphor-icons/react/dist/ssr";
import { aboutPage, ui } from "@/content/pages";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { CTABand, PageHero } from "@/components/blocks";
import { CardGrid } from "@/components/StepList";
import { Section, SectionHeader } from "@/components/ui";

export const metadata = pageMetadata({ ...aboutPage.seo, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero title={aboutPage.title} intro={aboutPage.intro} crumbs={[{ name: "About", path: "/about" }]} />

      <Section className="!pt-4" labelledBy="values-title">
        <SectionHeader id="values-title" title={aboutPage.valuesTitle} />
        <CardGrid items={aboutPage.values} cols={4} />
      </Section>

      <Section tone="raised" labelledBy="how-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <h2 id="how-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
            {aboutPage.howTitle}
          </h2>
          <ol className="grid gap-3">
            {aboutPage.how.map((h, i) => (
              <li key={h} className="flex gap-4 rounded-2xl border border-rule bg-bg p-5">
                <span className="font-display font-bold text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                {h}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section labelledBy="countries-title">
        <SectionHeader id="countries-title" title={aboutPage.countriesTitle} intro={aboutPage.countriesBody} />
        <ul className="flex flex-wrap gap-3">
          {siteConfig.countries.map((c) => (
            <li key={c} className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-5 py-3">
              <GlobeHemisphereWestIcon aria-hidden weight="duotone" className="size-5 text-accent-2" />
              {c}
            </li>
          ))}
        </ul>
      </Section>

      <CTABand title={ui.industryCtaTitle} body={ui.serviceCtaBody} />
    </>
  );
}
