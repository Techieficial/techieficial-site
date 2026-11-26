import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { offersPage, teamBuilder } from "@/content/offers";
import { addOns, formatUsd, monthlyCovers, offers, pricingFaqs } from "@/content/pricing";
import { liveHref, liveLinks } from "@/lib/nav";
import { pageMetadata, serviceListLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { CTABand, FAQAccordion, PageHero, PricingCard } from "@/components/blocks";
import { TeamBuilder } from "@/components/TeamBuilder";
import { Section, SectionHeader } from "@/components/ui";

export const metadata = pageMetadata({ ...offersPage.seo, path: "/offers" });

const addOnPrice = (a: (typeof addOns)[number]) =>
  [
    a.setup !== undefined && `${formatUsd(a.setup)} setup`,
    a.monthly !== undefined && `${formatUsd(a.monthly)}/mo`,
    a.oneTime !== undefined && `${a.from ? "From " : ""}${formatUsd(a.oneTime)}`,
  ]
    .filter(Boolean)
    .join(" + ") + (a.usage ? ", plus usage" : "");

/** Offers and pricing, "Build your team" (docs/SITE_CONTENT_V3.md 2.4). */
export default function OffersPage() {
  const free = liveLinks(offersPage.free);
  return (
    <>
      <JsonLd data={serviceListLd(offersPage.title, "/offers", offers.map((o) => ({ name: o.name, description: o.tagline, url: `/offers/${o.slug}` })))} />
      <PageHero title={offersPage.title} intro={offersPage.intro} crumbs={[{ name: offersPage.ladderTitle, path: "/offers" }]} />

      <Section className="!pt-4" labelledBy="builder-title">
        <SectionHeader id="builder-title" title={teamBuilder.title} />
        <TeamBuilder />
      </Section>

      <Section tone="raised" id="offers" labelledBy="offers-title">
        <SectionHeader id="offers-title" title={offersPage.ladderTitle} />
        <div className="grid gap-6 lg:grid-cols-3">
          {offers.map((o) => (
            <div key={o.slug} className="flex flex-col">
              <PricingCard offer={o} />
              <p className="mt-3 px-2 text-sm text-muted">
                <span className="font-medium text-ink">{offersPage.bestFor}:</span> {o.bestFor}.
              </p>
              {liveHref({ href: `/offers/${o.slug}` }) && (
                <Link href={`/offers/${o.slug}`} className="mt-1 inline-flex min-h-11 items-center gap-1.5 px-2 text-sm font-medium text-accent-text hover:text-ink">
                  {offersPage.details}
                  <span className="sr-only">: {o.name}</span>
                  <ArrowRightIcon aria-hidden className="size-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
        {free.length > 0 && (
          <p className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-semibold">{offersPage.freeTitle}:</span>{" "}
            {free.map((f) => (
              <Link key={f.href} href={f.href} className="font-medium text-accent-text hover:text-ink">
                {f.label}
              </Link>
            ))}
          </p>
        )}
      </Section>

      <Section labelledBy="covers-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="covers-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
              {offersPage.coversTitle}
            </h2>
            <h3 className="mt-8 font-semibold">{offersPage.usageTitle}</h3>
            <p className="mt-2 max-w-[48ch] text-muted">{offersPage.usage}</p>
          </div>
          <ul className="grid gap-3">
            {monthlyCovers.map((c) => (
              <li key={c} className="flex items-center gap-3 rounded-2xl border border-rule bg-surface p-5">
                <CheckIcon aria-hidden weight="bold" className="size-5 shrink-0 text-accent-text" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="raised" id="add-ons" labelledBy="addons-title">
        <SectionHeader id="addons-title" title={offersPage.addOnsTitle} />
        <div className="overflow-x-auto rounded-[20px] border border-rule">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <caption className="sr-only">{offersPage.addOnsTitle}</caption>
            <thead>
              <tr className="border-b border-rule">
                <th scope="col" className="p-5 font-semibold">
                  {offersPage.addOnCol}
                </th>
                <th scope="col" className="p-5 font-semibold">
                  {offersPage.priceCol}
                </th>
              </tr>
            </thead>
            <tbody>
              {addOns.map((a) => (
                <tr key={a.name} className="border-b border-rule last:border-b-0">
                  <th scope="row" className="p-5 font-medium">
                    {a.name}
                  </th>
                  <td className="p-5 text-muted">{addOnPrice(a)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section labelledBy="pfaq-title">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 id="pfaq-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
            {offersPage.faqTitle}
          </h2>
          <FAQAccordion items={pricingFaqs} />
        </div>
      </Section>

      <CTABand title={offersPage.product.ctaTitle} />
    </>
  );
}
