import { notFound } from "next/navigation";
import { workPage } from "@/content/pages";
import { getCaseStudies, getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { WorkGrid } from "@/components/WorkGrid";
import { Section } from "@/components/ui";

export const metadata = pageMetadata({ ...workPage.seo, path: "/work" });

export default function WorkPage() {
  const studies = getCaseStudies();
  if (!studies.length) notFound();
  const services = getServices()
    .filter((s) => studies.some((c) => c.services.includes(s.slug)))
    .map((s) => ({ slug: s.slug, name: s.navName }));
  return (
    <>
      <PageHero title={workPage.title} intro={workPage.intro} crumbs={[{ name: "Work", path: "/work" }]} />
      <Section className="!pt-4">
        <WorkGrid studies={studies} services={services} allLabel={workPage.filterAll} />
      </Section>
    </>
  );
}
