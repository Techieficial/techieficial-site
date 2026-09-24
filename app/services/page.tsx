import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { readableOnDark, siteConfig, type ServiceSlug } from "@/site.config";
import { servicesHub } from "@/content/pages";
import { packages } from "@/content/pricing";
import { getServices, serviceBySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { CTABand, PageHero, PricingCard, ServiceCard } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/ui";
import { home } from "@/content/home";

export const metadata = pageMetadata({ ...servicesHub.seo, path: "/services" });

export default function ServicesHubPage() {
  const services = getServices();
  return (
    <>
      <PageHero title={servicesHub.title} intro={servicesHub.intro} crumbs={[{ name: "Services", path: "/services" }]} />

      <Section className="!pt-4" labelledBy="all-services">
        <h2 id="all-services" className="sr-only">
          {servicesHub.title}
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05} className={i === services.length - 1 && services.length % 2 ? "md:col-span-2" : ""}>
              <ServiceCard service={s} size="lg" />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="raised" labelledBy="connect-title">
        <SectionHeader id="connect-title" title={servicesHub.connectTitle} />
        <ol className="grid gap-4 md:grid-cols-2">
          {servicesHub.connect.map((c) => {
            const from = serviceBySlug(c.from as ServiceSlug);
            const to = serviceBySlug(c.to as ServiceSlug);
            return (
              <li key={c.label} className="rounded-2xl border border-rule bg-bg p-6">
                <p className="flex flex-wrap items-center gap-2 font-display text-lg font-semibold">
                  <span style={{ color: readableOnDark(siteConfig.serviceColors[from.slug]) }}>{from.navName}</span>
                  <ArrowRightIcon aria-label="feeds" className="size-5 text-muted" />
                  <span style={{ color: readableOnDark(siteConfig.serviceColors[to.slug]) }}>{to.navName}</span>
                </p>
                <p className="mt-2 leading-relaxed text-muted">{c.label}</p>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section labelledBy="packages-title">
        <SectionHeader id="packages-title" title={servicesHub.packagesTitle} intro={home.packages.intro} />
        <div className="grid gap-5 pt-3 md:grid-cols-3">
          {packages.map((p) => (
            <PricingCard key={p.key} pkg={p} />
          ))}
        </div>
      </Section>

      <CTABand title={home.finalCta.title} body={home.finalCta.body} />
    </>
  );
}
