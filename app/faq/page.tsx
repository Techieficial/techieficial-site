import { faqPage } from "@/content/pages";
import { faqGroups } from "@/content/faq";
import { faqLd, pageMetadata } from "@/lib/seo";
import { CTABand, FAQAccordion, PageHero } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui";
import { ui } from "@/content/pages";

export const metadata = pageMetadata({ ...faqPage.seo, path: "/faq" });

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function FaqPage() {
  return (
    <>
      <PageHero title={faqPage.title} intro={faqPage.intro} crumbs={[{ name: "FAQ", path: "/faq" }]} />
      <JsonLd data={faqLd(faqGroups.flatMap((g) => g.items))} />
      <Section className="!pt-4">
        <nav aria-label={faqPage.title} className="mb-12 flex flex-wrap gap-2">
          {faqGroups.map((g) => (
            <a key={g.title} href={`#${slug(g.title)}`} className="min-h-11 rounded-full border border-rule px-4 py-2.5 text-sm hover:border-accent-hover">
              {g.title}
            </a>
          ))}
        </nav>
        <div className="grid gap-16">
          {faqGroups.map((g) => (
            <section key={g.title} id={slug(g.title)} aria-labelledby={`${slug(g.title)}-title`} className="grid grid-cols-[minmax(0,1fr)] scroll-mt-28 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
              <h2 id={`${slug(g.title)}-title`} className="text-[length:var(--text-h3)] font-bold">
                {g.title}
              </h2>
              <FAQAccordion items={g.items} schema={false} />
            </section>
          ))}
        </div>
      </Section>
      <CTABand title={ui.industryCtaTitle} body={ui.serviceCtaBody} />
    </>
  );
}
