import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/site.config";
import { team, teamPage, teamUrl } from "@/content/team";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, serviceListLd } from "@/lib/seo";
import { CTABand, PageHero } from "@/components/blocks";
import { TeamCards } from "@/components/team";
import { Button, Section, SectionHeader } from "@/components/ui";

export const metadata = pageMetadata({ ...teamPage.seo, path: "/ai-team" });

/** Meet the AI Team (docs/SITE_CONTENT_V3.md 2.2). */
export default function AiTeamPage() {
  const wholeTeam = "/offers/ai-front-office";
  return (
    <>
      <JsonLd data={serviceListLd(teamPage.title, "/ai-team", team.map((m) => ({ name: m.profileName ?? m.name, description: m.line, url: teamUrl(m.slug) })))} />
      <PageHero title={teamPage.title} intro={teamPage.intro} crumbs={[{ name: teamPage.profile.breadcrumb, path: "/ai-team" }]}>
        <div className="flex flex-col gap-3 sm:flex-row">
          {wholeTeam && (
            <Button href={wholeTeam} size="lg">
              {teamPage.hireWholeTeam}
            </Button>
          )}{" "}
          <Button href={siteConfig.cta.demo.href} size="lg" variant="secondary" arrow={false}>
            {siteConfig.cta.demo.label}
          </Button>
        </div>
      </PageHero>

      <Section className="!pt-4" labelledBy="team-cards-title">
        <h2 id="team-cards-title" className="sr-only">
          {teamPage.cardsTitle}
        </h2>
        <TeamCards hire={(m) => (m.slug === "receptionist" ? `${teamPage.includedIn}. ${teamPage.alsoAlone}.` : `${teamPage.includedIn}.`)} />
      </Section>

      <Section tone="raised" labelledBy="flow-title">
        <SectionHeader id="flow-title" title={teamPage.flowTitle} />
        <ol className="grid gap-4 md:grid-cols-5">
          {teamPage.flow.map((step, i) => (
            <li key={step} className="relative rounded-2xl border border-rule bg-bg p-5">
              <span className="grid size-8 place-items-center rounded-full bg-surface-2 font-display text-sm font-bold">{i + 1}</span>
              <p className="mt-3 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 font-medium text-accent-text">{teamPage.flowNote}</p>
      </Section>

      <Section labelledBy="comes-title">
        <SectionHeader id="comes-title" title={teamPage.comesWithTitle} />
        <ul className="grid gap-4 sm:grid-cols-2">
          {teamPage.comesWith.map((c) => (
            <li key={c.title} className="flex gap-4 rounded-2xl border border-rule bg-surface p-6">
              <CheckIcon weight="bold" aria-hidden className="mt-1 size-5 shrink-0 text-accent-text" />
              <span>
                <span className="block font-semibold">{c.title}</span>{" "}
                <span className="mt-1 block text-muted">{c.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand title={teamPage.profile.ctaTitle} />
    </>
  );
}
