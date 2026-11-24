import { calculatorPage } from "@/content/tools";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { MissedCallCalculator } from "@/components/MissedCallCalculator";
import { Section } from "@/components/ui";

export const metadata = pageMetadata({ ...calculatorPage.seo, path: "/tools/missed-call-calculator" });

/** Missed-call revenue calculator (docs/SITE_CONTENT_V3.md 2.8). */
export default function CalculatorPage() {
  return (
    <>
      <PageHero title={calculatorPage.title} intro={calculatorPage.intro} crumbs={[{ name: "Missed-call calculator", path: "/tools/missed-call-calculator" }]} />
      <Section className="!pt-4">
        <MissedCallCalculator />
      </Section>
    </>
  );
}
