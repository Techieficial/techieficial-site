import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { isPreviewBuild, siteConfig, telHref } from "@/site.config";
import { offersPage, productBySlug, productPages } from "@/content/offers";
import { pricingPage } from "@/content/pages";
import { fillPrices, formatUsd, offerBySlug, priceParts, pricesFinal } from "@/content/pricing";
import { pageMetadata, serviceLd } from "@/lib/seo";
import { CTABand, FAQAccordion, PageHero } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { Button, buttonClass, Section, SectionHeader } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return productPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/offers/[slug]">): Promise<Metadata> {
  const p = productBySlug((await params).slug);
  if (!p) return {};
  return pageMetadata({ ...p.seo, path: `/offers/${p.slug}` });
}

/** Product page template (docs/SITE_CONTENT_V3.md 2.5). Empty sections are left out. */
export default async function ProductPage({ params }: PageProps<"/offers/[slug]">) {
  const p = productBySlug((await params).slug);
  if (!p) notFound();
  const o = offerBySlug(p.slug);
  const t = offersPage.product;
  const price = priceParts(o);
  const phone = siteConfig.contact.demoPhone;
  const checkoutOpen = o.path === "checkout" && siteConfig.checkoutLive && o.paymentLink;
  const url = `/offers/${p.slug}`;

  return (
    <>
      <JsonLd data={serviceLd({ name: o.name, description: p.seo.description, url })} />
      <PageHero title={p.h1} intro={p.sub} crumbs={[{ name: offersPage.ladderTitle, path: "/offers" }, { name: o.name, path: url }]}>
        <div className="max-w-xl rounded-[20px] border border-rule bg-surface p-6">
          <p className="text-sm font-medium text-muted">
            {t.priceTitle}: <span className="text-ink">{o.name}</span>
          </p>
          <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
            {price.setup && (
              <div>
                <dt className="text-sm text-muted">{pricingPage.setup}</dt>
                <dd className="font-display text-3xl font-bold">{price.setup}</dd>
              </div>
            )}
            {price.monthly && (
              <div>
                <dt className="text-sm text-muted">{pricingPage.monthly}</dt>
                <dd className="font-display text-3xl font-bold">
                  {price.monthly}
                  {o.monthlyNote && " "}
                  {o.monthlyNote && <span className="block text-sm font-normal text-muted">{o.monthlyNote}</span>}
                </dd>
              </div>
            )}
            {price.oneTime && (
              <div>
                <dt className="text-sm text-muted">{pricingPage.oneTimeLabel}</dt>
                <dd className="font-display text-3xl font-bold">
                  {o.compareAtPrice !== undefined && <s className="mr-2 text-lg font-normal text-muted">{formatUsd(o.compareAtPrice)}</s>}
                  {price.oneTime}
                </dd>
              </div>
            )}
          </dl>
          <ul className="mt-3 space-y-1 text-sm text-muted">
            {p.priceNotes.map((n) => (
              <li key={n}>{fillPrices(n, o)}</li>
            ))}
          </ul>
          {o.limitedOffer && <p className="mt-3 text-sm font-medium text-accent-text">{o.limitedOffer}</p>}
          {o.draft && !pricesFinal && isPreviewBuild && (
            <p className="mt-3 inline-flex w-fit rounded-full border border-dashed border-rule px-2.5 py-0.5 text-xs text-muted">{pricingPage.draftNote}</p>
          )}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {o.path === "call" ? (
              <>
                <Button href={siteConfig.cta.demo.href} size="lg">
                  {siteConfig.cta.demo.label}
                </Button>{" "}
                <Button href={`${siteConfig.cta.primary.href}?package=${encodeURIComponent(o.name)}`} size="lg" variant="secondary" arrow={false}>
                  {siteConfig.cta.primary.label}
                </Button>
              </>
            ) : (
              <>
                {checkoutOpen ? (
                  <Button href={o.paymentLink!} size="lg">
                    {o.checkoutLabel}
                  </Button>
                ) : (
                  <span aria-disabled="true" className={buttonClass("secondary", "lg", "cursor-not-allowed opacity-70")}>
                    {pricingPage.checkoutSoon}
                  </span>
                )}{" "}
                {phone && p.slug === "ai-receptionist-starter" && (
                  <Button href={telHref(phone)} size="lg" variant="secondary" arrow={false} data-event="demo_call_started">
                    {t.callFirst}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </PageHero>

      {p.whoFor && (
        <Section className="!pt-4" labelledBy="who-title">
          <h2 id="who-title" className="text-[length:var(--text-h3)] font-bold md:text-3xl">
            {t.whoForTitle}
          </h2>
          <p className="mt-4 max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-muted">{p.whoFor}</p>
        </Section>
      )}

      <Section tone="raised" labelledBy="get-title">
        <SectionHeader id="get-title" title={t.getTitle} />
        <ul className={`grid gap-4 ${p.whatYouGet.some((w) => w.title) ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {p.whatYouGet.map((w) => (
            <li key={w.title ?? w.body} className="flex gap-3 rounded-2xl border border-rule bg-bg p-5">
              <CheckIcon weight="bold" aria-hidden className="mt-1 size-5 shrink-0 text-accent-text" />
              <span>
                {w.title && <span className="block font-semibold">{w.title}</span>}
                {w.title && " "}
                <span className={w.title ? "mt-1 block text-muted" : ""}>{w.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {(p.timeline || p.monthlyCovers || p.extra) && (
        <Section labelledBy={p.timeline ? "timeline-title" : p.monthlyCovers ? "monthly-title" : "extra-title-0"}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {p.timeline && (
              <div>
                <h2 id="timeline-title" className="text-[length:var(--text-h3)] font-bold md:text-3xl">
                  {t.timelineTitle}
                </h2>
                <p className="mt-4 leading-relaxed text-muted">{p.timeline}</p>
              </div>
            )}
            {p.monthlyCovers && (
              <div>
                <h2 id="monthly-title" className="text-[length:var(--text-h3)] font-bold md:text-3xl">
                  {t.monthlyTitle}
                </h2>
                <p className="mt-4 leading-relaxed text-muted">{p.monthlyCovers}</p>
              </div>
            )}
            {p.extra?.map((e, i) => (
              <div key={e.title} className={e.items ? "lg:col-span-2" : ""}>
                <h2 id={`extra-title-${i}`} className="text-[length:var(--text-h3)] font-bold md:text-3xl">
                  {e.title}
                </h2>
                {e.text && <p className="mt-4 leading-relaxed text-muted">{e.text}</p>}
                {e.items && (
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {e.items.map((it) => (
                      <li key={it.body} className="flex gap-2.5">
                        <CheckIcon weight="bold" aria-hidden className="mt-1 size-4 shrink-0 text-accent-text" />
                        {it.body}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {p.faqs && (
        <Section tone="raised" labelledBy="ofaq-title">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <h2 id="ofaq-title" className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
              {t.faqTitle}
            </h2>
            <FAQAccordion items={p.faqs.map((f) => ({ q: f.q, a: fillPrices(f.a, o) }))} />
          </div>
        </Section>
      )}

      <CTABand title={t.ctaTitle} />
    </>
  );
}
