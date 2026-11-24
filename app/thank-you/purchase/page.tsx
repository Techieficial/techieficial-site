import type { Metadata } from "next";
import { purchaseThanks } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { StepList } from "@/components/StepList";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  ...pageMetadata({ ...purchaseThanks.seo, path: "/thank-you/purchase" }),
  robots: { index: false, follow: true },
};

/** After a CRM payment link purchase. The kickoff-call calendar link is added once the owner supplies it. */
export default function PurchaseThanksPage() {
  return (
    <>
      <PageHero title={purchaseThanks.title} intro={purchaseThanks.intro} />
      <Section className="!pt-0">
        <StepList steps={purchaseThanks.steps} />
      </Section>
    </>
  );
}
