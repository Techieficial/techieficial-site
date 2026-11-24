import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { thankYouPage } from "@/content/pages";
import { hasWork } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { StepList } from "@/components/StepList";
import { TrackOnMount } from "@/components/TrackOnMount";
import { Button, Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  ...pageMetadata({ ...thankYouPage.seo, path: "/thank-you" }),
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  const steps = [...thankYouPage.steps, ...(siteConfig.contact.demoPhone ? [thankYouPage.callStep] : [])];
  return (
    <>
      <TrackOnMount event="book_call" />
      <PageHero title={thankYouPage.title} intro={thankYouPage.intro} />
      <Section className="!pt-0">
        <StepList steps={steps} />
      </Section>
      <Section tone="raised" labelledBy="explore-title">
        <SectionHeader id="explore-title" title={thankYouPage.explore} />
        <div className="flex flex-wrap gap-3">
          <Button href="/demo">{thankYouPage.demoLink}</Button>{" "}
          {hasWork() && (
            <>
              <Button href="/work" variant="secondary">
                {thankYouPage.workLink}
              </Button>{" "}
            </>
          )}
          <Button href="/blog" variant="secondary">
            {thankYouPage.blogLink}
          </Button>
        </div>
      </Section>
    </>
  );
}
