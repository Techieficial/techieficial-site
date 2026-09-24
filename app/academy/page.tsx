import { academyPage } from "@/content/pages";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { CardGrid } from "@/components/StepList";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button, Section, SectionHeader } from "@/components/ui";

export const metadata = pageMetadata({ ...academyPage.seo, path: "/academy" });

export default function AcademyPage() {
  return (
    <>
      <PageHero title={academyPage.title} intro={academyPage.intro} crumbs={[{ name: "Academy", path: "/academy" }]} color="#A3E635">
        <Button href="#waitlist" size="lg">
          {siteConfig.cta.waitlist.label}
        </Button>
      </PageHero>

      <Section className="!pt-4" labelledBy="coming-title">
        <SectionHeader id="coming-title" title={academyPage.comingTitle} intro={academyPage.forWho} />
        <CardGrid items={academyPage.coming} cols={4} />
      </Section>

      <Section tone="raised" id="waitlist" labelledBy="waitlist-title">
        <div className="mx-auto max-w-xl">
          <SectionHeader id="waitlist-title" title={academyPage.waitlistTitle} intro={academyPage.waitlistBody} />
          <LeadForm source="academy" fields={["name", "email"]} submitLabel={siteConfig.cta.waitlist.label} event="form_submit" successMessage={academyPage.waitlistSuccess} />
        </div>
      </Section>
    </>
  );
}
