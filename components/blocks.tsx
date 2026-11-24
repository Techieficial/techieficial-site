import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, CaretRightIcon, CheckIcon, PhoneCallIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { accentText, formatPhone, isPreviewBuild, siteConfig, telHref, type ServiceSlug } from "@/site.config";
import { priceParts, pricesFinal, usageNote, type Offer } from "@/content/pricing";
import { pricingPage, ui } from "@/content/pages";
import type { CaseStudy, Service } from "@/lib/content";
import { breadcrumbLd, faqLd } from "@/lib/seo";
import { ContentIcon } from "./icons";
import { JsonLd } from "./JsonLd";
import { Button, buttonClass, Container } from "./ui";

export const serviceColor = (slug: ServiceSlug) => siteConfig.serviceColors[slug];

/* ---------- Service card ---------- */

export function ServiceCard({ service, size = "md" }: { service: Service; size?: "md" | "lg" }) {
  const color = serviceColor(service.slug);
  return (
    <Link
      href={service.url}
      className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-rule bg-surface p-6 transition-colors duration-300 hover:border-[color:var(--c)] md:p-7"
      style={{ ["--c" as string]: color }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-45"
        style={{ background: color }}
      />
      <span className="grid size-12 place-items-center rounded-2xl" style={{ background: "color-mix(in srgb, var(--accent) 12%, transparent)", color: accentText }}>
        <ContentIcon name={service.icon} weight="duotone" className="size-6" aria-hidden />
      </span>
      <h3 className={`mt-6 font-semibold tracking-[-0.02em] ${size === "lg" ? "text-2xl" : "text-xl"}`}>{service.name}</h3>
      <p className="mt-2 leading-relaxed text-muted">{service.outcome}</p>
      {size === "lg" && (
        <ul className="mt-5 space-y-2 text-[15px]">
          {service.highlights.map((h) => (
            <li key={h} className="flex gap-2.5">
              <CheckIcon weight="bold" aria-hidden className="mt-1 size-4 shrink-0" style={{ color: accentText }} />
              {h}
            </li>
          ))}
        </ul>
      )}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-medium" style={{ color: accentText }}>
        Explore {service.navName}
        <ArrowRightIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/* ---------- Pricing card ---------- */

/** One offer: name, prices, usage note, short include list, and the right button for its buying path. */
export function PricingCard({ offer, compact = false }: { offer: Offer; compact?: boolean }) {
  const price = priceParts(offer);
  const checkoutOpen = offer.path === "checkout" && siteConfig.checkoutLive && offer.paymentLink;
  return (
    <div
      className={`relative flex h-full flex-col rounded-[20px] border p-7 ${offer.popular ? "border-accent bg-surface-2 shadow-[0_30px_80px_-40px_var(--glow)]" : "border-rule bg-surface"}`}
    >
      {offer.popular && (
        <span className="absolute -top-3 left-7 rounded-full bg-electric px-3 py-1 text-xs font-semibold text-on-accent">
          {pricingPage.popular}
        </span>
      )}
      <h3 className="text-2xl font-bold tracking-[-0.02em]">{offer.name}</h3>
      <p className="mt-2 text-muted">{offer.tagline}</p>
      <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-rule py-5">
        {price.setup && (
          <div>
            <dt className="text-sm text-muted">{pricingPage.setup}</dt>
            <dd className="mt-1 font-display text-2xl font-semibold">{price.setup}</dd>
          </div>
        )}
        {price.monthly && (
          <div>
            <dt className="text-sm text-muted">{pricingPage.monthly}</dt>
            <dd className="mt-1 font-display text-2xl font-semibold">
              {price.monthly}
              {offer.monthlyNote && " "}
              {offer.monthlyNote && <span className="block text-sm font-normal text-muted">{offer.monthlyNote}</span>}
            </dd>
          </div>
        )}
        {price.oneTime && (
          <div>
            <dt className="text-sm text-muted">{pricingPage.oneTimeLabel}</dt>
            <dd className="mt-1 font-display text-2xl font-semibold">{price.oneTime}</dd>
          </div>
        )}
        {offer.minimumTerm && (
          <div>
            <dt className="text-sm text-muted">{pricingPage.minimumLabel}</dt>
            <dd className="mt-1 text-[15px] font-medium">{offer.minimumTerm}</dd>
          </div>
        )}
      </dl>
      {offer.monthly !== undefined && <p className="mt-3 text-xs text-muted">{usageNote}</p>}
      {offer.draft && !pricesFinal && isPreviewBuild && (
        <p className="mt-2 inline-flex w-fit rounded-full border border-dashed border-rule px-2.5 py-0.5 text-xs text-muted">{pricingPage.draftNote}</p>
      )}
      {!compact && (
        <ul className="mt-6 space-y-2.5 text-[15px]">
          {offer.includes.map((item) => (
            <li key={item} className="flex gap-2.5">
              <CheckIcon weight="bold" aria-hidden className="mt-1 size-4 shrink-0 text-accent-text" />
              {item}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-7">
        {offer.path === "call" ? (
          <Button href={`${siteConfig.cta.primary.href}?package=${encodeURIComponent(offer.name)}`} variant={offer.popular ? "primary" : "secondary"} className="w-full">
            {siteConfig.cta.primary.label}
          </Button>
        ) : checkoutOpen ? (
          <Button href={offer.paymentLink!} variant={offer.popular ? "primary" : "secondary"} className="w-full">
            {offer.checkoutLabel}
          </Button>
        ) : (
          <span aria-disabled="true" className={buttonClass("secondary", "md", "w-full cursor-not-allowed opacity-70")}>
            {pricingPage.checkoutSoon}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------- Case study card ---------- */

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={study.url} className="group flex h-full flex-col rounded-[20px] border border-rule bg-surface p-7 transition-colors hover:border-accent-hover">
      <p className="text-sm text-muted">
        {study.industry}, {study.country}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{study.title}</h3>
      <dl className="mt-6 grid grid-cols-2 gap-4">
        {study.results.slice(0, 2).map((r) => (
          <div key={r.label}>
            <dt className="sr-only">{r.label}</dt>
            <dd className="font-display text-3xl font-bold text-electric">{r.value}</dd>
            <dd className="mt-1 text-sm text-muted">{r.label}</dd>
          </div>
        ))}
      </dl>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-medium text-accent-text">
        {ui.readCaseStudy} <ArrowRightIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/* ---------- FAQ ---------- */

export function FAQAccordion({ items, schema = true }: { items: { q: string; a: string }[]; schema?: boolean }) {
  return (
    <div className="divide-y divide-rule border-y border-rule">
      {schema && <JsonLd data={faqLd(items)} />}
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 py-5 text-lg font-medium tracking-[-0.01em]">
            {f.q}
            <PlusIcon aria-hidden className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="max-w-[65ch] pb-6 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- CTA band ---------- */

/** Closing call to action. `secondary` adds a second button (e.g. "Interview the AI team"). */
export function CTABand({ title, body, id, secondary = true }: { title: string; body?: string; id?: string; secondary?: boolean }) {
  const phone = siteConfig.contact.demoPhone;
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-rule bg-surface px-6 py-14 text-center md:px-16 md:py-20">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-72 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
          <h2 id={id ? `${id}-title` : undefined} className="relative mx-auto max-w-[18ch] text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">
            {title}
          </h2>
          {body && <p className="relative mx-auto mt-5 max-w-[52ch] text-[length:var(--text-lead)] text-muted">{body}</p>}
          <div className="relative mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={siteConfig.cta.primary.href} size="lg">
              {siteConfig.cta.primary.label}
            </Button>{" "}
            {secondary && (
              <Button href={siteConfig.cta.demo.href} size="lg" variant="secondary" arrow={false}>
                {siteConfig.cta.demo.label}
              </Button>
            )}
            {phone && (
              <a href={telHref(phone)} className="inline-flex items-center gap-2 font-medium text-ink hover:text-accent-text" data-event="demo_call_started">
                <PhoneCallIcon aria-hidden className="size-5" />
                {siteConfig.cta.callAi.label}: {formatPhone(phone)}
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Breadcrumbs ---------- */

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
      <JsonLd data={breadcrumbLd(all)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <CaretRightIcon aria-hidden className="size-3.5" />}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-ink">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-ink">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------- Demo call block ---------- */

export function DemoCallBlock({ title, body, children, titleId }: { title: string; body: string; children?: ReactNode; titleId?: string }) {
  const phone = siteConfig.contact.demoPhone;
  if (!phone) return null;
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-rule bg-surface p-8 md:p-12">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <h2 id={titleId} className="relative text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-[-0.03em]">{title}</h2>
      <p className="relative mt-4 max-w-[52ch] text-[length:var(--text-lead)] text-muted">{body}</p>
      <a
        href={telHref(phone)}
        data-event="demo_call_started"
        className="relative mt-8 inline-flex items-center gap-4 font-display text-[clamp(2rem,1.4rem+3vw,3.5rem)] font-bold tracking-[-0.02em] text-electric"
      >
        <PhoneCallIcon aria-hidden weight="duotone" className="size-10 shrink-0 text-accent-5" />
        {formatPhone(phone)}
      </a>
      {children && <div className="relative mt-8">{children}</div>}
    </div>
  );
}

/* ---------- Trust line ---------- */

/** One quiet line under the hero buttons, e.g. "Clients in United States, United Kingdom ...". Rendered once. */
export function TrustLine({ lead, items }: { lead: string; items: readonly string[] }) {
  return (
    <p className="mt-8 max-w-[60ch] text-sm text-muted">
      {lead}{" "}
      <span className="font-medium text-ink">{items.slice(0, -1).join(", ")}</span>
      {items.length > 1 && " and "}
      <span className="font-medium text-ink">{items[items.length - 1]}</span>
    </p>
  );
}

/* ---------- Long-form content ---------- */

export function Prose({ html }: { html: string }) {
  return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ---------- Page hero (inner pages) ---------- */

export function PageHero({
  title,
  intro,
  crumbs,
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 size-[640px] rounded-full opacity-60 blur-2xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />
      <Container>
        {crumbs && <Breadcrumbs items={crumbs} />}
        <h1 className="max-w-[20ch] text-[length:var(--text-h1)] font-bold leading-[1.04] tracking-[-0.035em]">{title}</h1>
        {intro && <p className="mt-6 max-w-[60ch] text-[length:var(--text-lead)] leading-relaxed text-muted">{intro}</p>}
        {children && <div className="mt-9">{children}</div>}
      </Container>
    </section>
  );
}
