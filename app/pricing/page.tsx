import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { pricingPage, ui } from "@/content/pages";
import { monthlyCovers, packages, pricingFaqs } from "@/content/pricing";
import { getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { CTABand, FAQAccordion, PageHero, PricingCard } from "@/components/blocks";
import { EngineBuilder } from "@/components/EngineBuilder";
import { Section, SectionHeader } from "@/components/ui";

export const metadata = pageMetadata({ ...pricingPage.seo, path: "/pricing" });

export default function PricingPage() {
  const services = getServices().map((s) => ({ slug: s.slug, name: s.navName }));
  return (
    <>
      <PageHero title={pricingPage.title} intro={pricingPage.intro} crumbs={[{ name: "Pricing", path: "/pricing" }]} />

      <Section className="!pt-4" labelledBy="builder-title">
        <SectionHeader id="builder-title" title={pricingPage.builder.title} />
        <EngineBuilder services={services} />
      </Section>

      <Section tone="raised" id="packages" labelledBy="packages-title">
        <SectionHeader id="packages-title" title={pricingPage.packagesTitle} />
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <PricingCard key={p.key} pkg={p} />
          ))}
        </div>
      </Section>

      <Section labelledBy="covers-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <h2 id="covers-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
            {pricingPage.coversTitle}
          </h2>
          <ul className="grid gap-3">
            {monthlyCovers.map((c) => (
              <li key={c} className="flex items-center gap-3 rounded-2xl border border-rule bg-surface p-5">
                <CheckIcon aria-hidden weight="bold" className="size-5 shrink-0 text-accent-2" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="raised" labelledBy="pfaq-title">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 id="pfaq-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
            {pricingPage.faqTitle}
          </h2>
          <FAQAccordion items={pricingFaqs} />
        </div>
      </Section>

      <CTABand title={ui.industryCtaTitle} body={ui.serviceCtaBody} />
    </>
  );
}
