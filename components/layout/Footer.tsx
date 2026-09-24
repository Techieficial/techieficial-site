import Link from "next/link";
import { PhoneCallIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPhone, siteConfig, telHref } from "@/site.config";
import { footer } from "@/content/pages";
import { getIndustries, getServices, hasWork } from "@/lib/content";
import { LeadForm } from "../forms/LeadForm";
import { CookiePrefsButton } from "../consent/Consent";
import { Button, Container } from "../ui";
import { Logo } from "./Logo";

export function Footer() {
  const phone = siteConfig.contact.demoPhone;
  const email = siteConfig.contact.email;
  const resources = [
    { label: "Demo Lab", href: "/demo" },
    ...(hasWork() ? [{ label: "Work", href: "/work" }] : []),
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ];
  const columns = [
    { title: footer.columns.services, links: getServices().map((s) => ({ label: s.name, href: s.url })) },
    { title: footer.columns.industries, links: getIndustries().map((i) => ({ label: i.name, href: i.url })) },
    { title: footer.columns.resources, links: resources },
    { title: footer.columns.academy, links: footer.academyLinks },
    { title: footer.columns.company, links: footer.companyLinks },
  ].filter((c) => c.links.length);

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

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 py-12 md:grid-cols-5">
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
            <p className="mt-3 text-sm leading-relaxed text-muted">{siteConfig.mission}</p>
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
            {email && (
              <a href={`mailto:${email}`} className="mt-3 inline-block text-sm text-muted hover:text-ink">
                {email}
              </a>
            )}
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
              &copy; {new Date().getFullYear()} {siteConfig.name}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
