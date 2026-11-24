import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/site.config";
import { insidePage } from "@/content/tools";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { Button, Section, SectionHeader } from "@/components/ui";

export const metadata = pageMetadata({ ...insidePage.seo, path: "/inside" });

/** Inside Techieficial (docs/SITE_CONTENT_V3.md 2.7). Only items that are live are shown. */
export default function InsidePage() {
  const items = [...insidePage.live, ...(siteConfig.contact.demoPhone ? [insidePage.demoLine] : [])];
  return (
    <>
      <PageHero title={insidePage.title} intro={insidePage.intro} crumbs={[{ name: "Inside", path: "/inside" }]} />
      <Section className="!pt-4" labelledBy="live-title">
        <SectionHeader id="live-title" title={insidePage.liveTitle} />
        <ul className="grid gap-5 md:grid-cols-3">
          {items.map((i) => (
            <li key={i.title} className="rounded-[20px] border border-rule bg-surface p-7">
              <CheckCircleIcon aria-hidden weight="duotone" className="size-7 text-accent-text" />
              <h3 className="mt-4 text-xl font-semibold">{i.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{i.body}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="raised" labelledBy="inside-close">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="inside-close" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
            {insidePage.closing}
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={siteConfig.cta.demo.href} size="lg">
              {siteConfig.cta.demo.label}
            </Button>{" "}
            <Button href={siteConfig.cta.primary.href} size="lg" variant="secondary" arrow={false}>
              {siteConfig.cta.primary.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
