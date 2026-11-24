import { CheckCircleIcon, PhoneCallIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPhone, siteConfig, telHref } from "@/site.config";
import { demoPage } from "@/content/pages";
import { gallery, galleryCategories, walkthroughs } from "@/content/gallery";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { DemoTabs, type DemoTab } from "@/components/DemoTabs";
import { LeadForm } from "@/components/forms/LeadForm";
import { CalendarEmbed } from "@/components/CalendarEmbed";
import { Gallery, VideoTile } from "@/components/VideoTile";
import { Button, Container, Section, SectionHeader } from "@/components/ui";
import { ChatWidgetLoader } from "@/components/ChatWidgetLoader";

export const metadata = pageMetadata({ ...demoPage.seo, path: "/demo" });

/** Demo Lab, docs/SITE_CONTENT_V3.md 2.6. Tabs whose assets are missing are hidden. */
export default function DemoPage() {
  const phone = siteConfig.contact.demoPhone;
  const tabs: DemoTab[] = [];

  // Tab 1: only once the demo number is live.
  if (phone) {
    tabs.push({
      id: "live",
      label: demoPage.tabs.live,
      content: (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[20px] border border-rule bg-surface p-7">
            <h2 className="text-2xl font-bold">{demoPage.live.callTitle}</h2>
            <a href={telHref(phone)} data-event="demo_call_started" className="mt-6 inline-flex items-center gap-3 font-display text-3xl font-bold text-electric">
              <PhoneCallIcon aria-hidden weight="duotone" className="size-8 text-accent-text" />
              {formatPhone(phone)}
            </a>
            <h3 className="mt-8 font-semibold">{demoPage.live.tipsTitle}</h3>
            <ul className="mt-3 space-y-2 text-muted">
              {demoPage.live.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-semibold">{demoPage.live.whatHappened}</h3>
            <ol className="mt-4 space-y-3">
              {demoPage.live.steps.map((s) => (
                <li key={s} className="flex gap-3">
                  <CheckCircleIcon aria-hidden weight="duotone" className="size-6 shrink-0 text-accent-text" />
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-[20px] border border-rule bg-surface p-7">
            <h2 className="text-2xl font-bold">{demoPage.live.callMeTitle}</h2>
            <p className="mb-6 mt-2 text-muted">{demoPage.live.callMeBody}</p>
            <LeadForm source="demo-callme" fields={["name", "email", "phone"]} submitLabel={demoPage.live.callMeSubmit} event="callme_submit" />
          </div>
        </div>
      ),
    });
  }

  // Tab 2: only once the chat widget script exists.
  if (siteConfig.chatWidgetSrc) {
    tabs.push({
      id: "chat",
      label: demoPage.tabs.chat,
      content: (
        <div className="max-w-2xl rounded-[20px] border border-rule bg-surface p-7">
          <h2 className="text-2xl font-bold">{demoPage.chat.title}</h2>
          <p className="mt-2 text-muted">{demoPage.chat.tip}</p>
          <ChatWidgetLoader label={demoPage.chat.button} loadedLabel={demoPage.chat.loaded} />
        </div>
      ),
    });
  }

  // Tab 3: only once walkthrough videos exist.
  if (walkthroughs.length) {
    tabs.push({
      id: "watch",
      label: demoPage.tabs.watch,
      content: (
        <div className="grid gap-5 md:grid-cols-3">
          {walkthroughs.map((v) => (
            <VideoTile key={v.url} item={v} />
          ))}
        </div>
      ),
    });
  }

  // Tab 4: always.
  tabs.push({
    id: "build",
    label: demoPage.tabs.build,
    content: (
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div className="rounded-[20px] border border-rule bg-surface p-7">
          <h2 className="text-2xl font-bold">{demoPage.build.title}</h2>
          <p className="mb-6 mt-2 text-muted">{demoPage.build.intro}</p>
          <LeadForm
            source="test-build"
            fields={["name", "email", "company", "siteUrl", "businessType", "problem", "phone"]}
            submitLabel={demoPage.build.submit}
            event="test_build_booked"
            redirectTo="/thank-you"
          />
        </div>
        <CalendarEmbed url={siteConfig.contact.testBuildCalendarUrl} title={demoPage.build.calendarTitle} />
      </div>
    ),
  });

  return (
    <>
      <PageHero title={demoPage.title} intro={demoPage.intro} crumbs={[{ name: "Demo Lab", path: "/demo" }]}>
        {phone ? (
          <a href={telHref(phone)} data-event="demo_call_started" className="inline-flex items-center gap-3 font-display text-[clamp(2rem,1.4rem+3vw,3.5rem)] font-bold text-electric">
            <PhoneCallIcon aria-hidden weight="duotone" className="size-10 text-accent-text" />
            {formatPhone(phone)}
          </a>
        ) : (
          <Button href="#build" size="lg">
            {demoPage.noPhoneButton}
          </Button>
        )}
      </PageHero>
      <section className="pb-16" aria-label={demoPage.tabsLabel}>
        <Container>
          <DemoTabs tabs={tabs} label={demoPage.tabsLabel} />
        </Container>
      </section>
      {gallery.length > 0 && (
        <Section tone="raised" labelledBy="gallery-title">
          <SectionHeader id="gallery-title" title={demoPage.galleryTitle} />
          <Gallery items={gallery} categories={galleryCategories} allLabel={demoPage.galleryAll} />
        </Section>
      )}
    </>
  );
}
