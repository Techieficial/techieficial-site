import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";
import { agenciesPage } from "@/content/pages";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { CardGrid, StepList } from "@/components/StepList";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button, Section, SectionHeader } from "@/components/ui";

export const metadata = pageMetadata({ ...agenciesPage.seo, path: "/agencies" });

export default function AgenciesPage() {
  const cta = siteConfig.cta.partner;
  return (
    <>
      <PageHero title={agenciesPage.title} intro={agenciesPage.intro} crumbs={[{ name: "Agencies", path: "/agencies" }]} color="#22D3EE">
        <Button href="#partner" size="lg">
          {cta.label}
        </Button>
      </PageHero>

      <Section className="!pt-4" labelledBy="offer-title">
        <SectionHeader id="offer-title" title={agenciesPage.offerTitle} />
        <CardGrid items={agenciesPage.offer} />
      </Section>

      <Section tone="raised" labelledBy="how-title">
        <SectionHeader id="how-title" title={agenciesPage.howTitle} />
        <StepList steps={agenciesPage.how} />
      </Section>

      <Section labelledBy="promise-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <h2 id="promise-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
            {agenciesPage.promiseTitle}
          </h2>
          <ul className="grid gap-3">
            {agenciesPage.promise.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-2xl border border-rule bg-surface p-5">
                <ShieldCheckIcon aria-hidden weight="duotone" className="size-6 shrink-0 text-accent-2" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="raised" id="partner" labelledBy="partner-title">
        <div className="mx-auto max-w-2xl">
          <SectionHeader id="partner-title" title={cta.label} intro={agenciesPage.partnerIntro} />
          <LeadForm source="agency" fields={["name", "email", "phone", "message"]} submitLabel={cta.label} redirectTo="/thank-you" />
        </div>
      </Section>
    </>
  );
}
