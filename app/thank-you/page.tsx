import type { Metadata } from "next";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
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
  return (
    <>
      <TrackOnMount event="book_call" />
      <PageHero title={thankYouPage.title} intro={thankYouPage.intro} color="#A3E635" />
      <Section className="!pt-0">
        <StepList steps={thankYouPage.steps} />
      </Section>
      <Section tone="raised" labelledBy="prep-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <h2 id="prep-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
            {thankYouPage.prepTitle}
          </h2>
          <ul className="grid gap-3">
            {thankYouPage.prep.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-2xl border border-rule bg-bg p-5">
                <CheckCircleIcon aria-hidden weight="duotone" className="size-6 shrink-0 text-accent-4" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section labelledBy="explore-title">
        <SectionHeader id="explore-title" title={thankYouPage.explore} />
        <div className="flex flex-wrap gap-3">
          <Button href="/demo">{thankYouPage.demoLink}</Button>
          {hasWork() && (
            <Button href="/work" variant="secondary">
              {thankYouPage.workLink}
            </Button>
          )}
          <Button href="/blog" variant="secondary">
            {thankYouPage.blogLink}
          </Button>
        </div>
      </Section>
    </>
  );
}
