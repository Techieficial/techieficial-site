import { Suspense } from "react";
import { EnvelopeSimpleIcon, PhoneCallIcon } from "@phosphor-icons/react/dist/ssr";
import { contactPage } from "@/content/pages";
import { formatPhone, siteConfig, telHref } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { CalendarEmbed } from "@/components/CalendarEmbed";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui";

export const metadata = pageMetadata({ ...contactPage.seo, path: "/contact" });

export default function ContactPage() {
  const { email, demoPhone } = siteConfig.contact;
  return (
    <>
      <PageHero title={contactPage.title} intro={contactPage.intro} crumbs={[{ name: "Contact", path: "/contact" }]} />
      <section className="pb-24">
        <Container className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div className="rounded-[20px] border border-rule bg-surface p-7">
            <h2 className="mb-6 text-2xl font-bold">{contactPage.formTitle}</h2>
            <Suspense>
              <ContactForm />
            </Suspense>
          </div>
          <div className="grid content-start gap-6">
            <CalendarEmbed />
            {(email || demoPhone) && (
              <div className="rounded-[20px] border border-rule bg-surface p-7">
                <h2 className="text-lg font-semibold">{contactPage.otherWays}</h2>
                <ul className="mt-4 grid gap-3">
                  {email && (
                    <li>
                      <a href={`mailto:${email}`} className="inline-flex items-center gap-3 hover:text-accent-text">
                        <EnvelopeSimpleIcon aria-hidden weight="duotone" className="size-6 text-accent-2" />
                        {email}
                      </a>
                    </li>
                  )}
                  {demoPhone && (
                    <li>
                      <a href={telHref(demoPhone)} data-event="demo_call_started" className="inline-flex items-center gap-3 hover:text-accent-text">
                        <PhoneCallIcon aria-hidden weight="duotone" className="size-6 text-accent-5" />
                        {formatPhone(demoPhone)}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
