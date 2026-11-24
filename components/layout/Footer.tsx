import Link from "next/link";
import { PhoneCallIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPhone, siteConfig, telHref } from "@/site.config";
import { footer } from "@/content/pages";
import { liveLinks } from "@/lib/nav";
import { LeadForm } from "../forms/LeadForm";
import { CookiePrefsButton } from "../consent/Consent";
import { Button, Container } from "../ui";
import { Logo } from "./Logo";

export function Footer() {
  const phone = siteConfig.contact.demoPhone;
  const email = siteConfig.contact.email;
  // v3 columns; links to pages that are not built yet are left out, and empty columns are hidden.
  const columns = footer.columns.map((c) => ({ title: c.title, links: liveLinks(c.links) })).filter((c) => c.links.length);

  return (
    <footer className="border-t border-rule bg-surface/40 pb-28 pt-16 lg:pb-10">
      <Container>
        <div className="flex flex-col gap-8 border-b border-rule pb-12 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-[16ch] font-display text-[length:var(--text-h3)] font-bold tracking-[-0.02em] md:text-4xl">
            {footer.ctaTitle}
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={siteConfig.cta.primary.href} size="lg">
              {siteConfig.cta.primary.label}
            </Button>{" "}
            <Button href={siteConfig.cta.demo.href} size="lg" variant="secondary" arrow={false}>
              {siteConfig.cta.demo.label}
            </Button>
            {phone && (
              <a href={telHref(phone)} data-event="demo_call_started" className="inline-flex items-center gap-2 font-medium hover:text-accent-text">
                <PhoneCallIcon aria-hidden className="size-5" />
                {formatPhone(phone)}
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 border-b border-rule py-10 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-xl font-semibold">{footer.newsletter.title}</p>
          <LeadForm source="newsletter" fields={["email"]} compact submitLabel={footer.newsletter.button} event="newsletter_signup" successMessage={footer.newsletter.success} />
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 py-12 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-9 items-center text-[15px] text-muted hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-6 border-t border-rule pt-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            {siteConfig.socials.length > 0 && (
              <ul className="mt-4 flex gap-4 text-sm">
                {siteConfig.socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} rel="me noopener" className="text-muted hover:text-ink">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <dl className="mt-4 space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="text-muted">{footer.emailLabel}:</dt>{" "}
                <dd>
                  <a href={`mailto:${email}`} className="text-muted underline-offset-2 hover:text-ink hover:underline">
                    {email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted">{footer.supportLabel}:</dt>{" "}
                <dd>
                  <a href={`mailto:${siteConfig.contact.supportEmail}`} className="text-muted underline-offset-2 hover:text-ink hover:underline">
                    {siteConfig.contact.supportEmail}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-col gap-3 text-sm text-muted md:items-end">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {footer.legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookiePrefsButton label={footer.cookiePrefs} />
              </li>
            </ul>
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.name}. {footer.bottomLine}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
