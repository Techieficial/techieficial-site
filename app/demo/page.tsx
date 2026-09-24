import { CheckCircleIcon, PhoneCallIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPhone, siteConfig, telHref } from "@/site.config";
import { demoPage, forms } from "@/content/pages";
import { gallery, galleryCategories, walkthroughs } from "@/content/gallery";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { DemoTabs, type DemoTab } from "@/components/DemoTabs";
import { LeadForm } from "@/components/forms/LeadForm";
import { CalendarEmbed } from "@/components/CalendarEmbed";
import { Gallery, VideoTile } from "@/components/VideoTile";
import { Container } from "@/components/ui";
import { ChatWidgetLoader } from "@/components/ChatWidgetLoader";

export const metadata = pageMetadata({ ...demoPage.seo, path: "/demo" });

export default function DemoPage() {
  const phone = siteConfig.contact.demoPhone;
  const tabs: DemoTab[] = [];

  if (phone) {
    tabs.push({
      id: "live",
      label: demoPage.tabs.live,
      content: (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[20px] border border-rule bg-surface p-7">
            <h2 className="text-2xl font-bold">{demoPage.live.callTitle}</h2>
            <p className="mt-2 text-muted">{demoPage.live.callBody}</p>
            <a href={telHref(phone)} data-event="demo_call_started" className="mt-6 inline-flex items-center gap-3 font-display text-3xl font-bold text-electric">
              <PhoneCallIcon aria-hidden weight="duotone" className="size-8 text-accent-5" />
              {formatPhone(phone)}
            </a>
            <h3 className="mt-10 font-semibold">{demoPage.live.whatHappened}</h3>
            <ol className="mt-4 space-y-3">
              {demoPage.live.steps.map((s) => (
                <li key={s} className="flex gap-3">
                  <CheckCircleIcon aria-hidden weight="duotone" className="size-6 shrink-0 text-accent-2" />
                  {s}
                </li>
              ))}
            </ol>
            <ChatWidgetLoader label={demoPage.live.chatButton} loadedLabel={demoPage.live.chatLoaded} />
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

  if (gallery.length) {
    tabs.push({
      id: "gallery",
      label: demoPage.tabs.gallery,
      content: <Gallery items={gallery} categories={galleryCategories} allLabel={demoPage.galleryAll} />,
    });
  }

  tabs.push({
    id: "build",
    label: demoPage.tabs.build,
    content: (
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div className="rounded-[20px] border border-rule bg-surface p-7">
          <h2 className="text-2xl font-bold">{demoPage.build.title}</h2>
          <p className="mb-6 mt-2 text-muted">{demoPage.build.intro}</p>
          <LeadForm source="test-build" fields={["name", "email", "phone", "testBuild"]} submitLabel={forms.submit} event="test_build_booked" redirectTo="/thank-you" />
        </div>
        <CalendarEmbed />
      </div>
    ),
  });

  return (
    <>
      <PageHero title={demoPage.title} intro={demoPage.intro} crumbs={[{ name: "Demo Lab", path: "/demo" }]} color="#FB923C">
        {phone && (
          <a href={telHref(phone)} data-event="demo_call_started" className="inline-flex items-center gap-3 font-display text-[clamp(2rem,1.4rem+3vw,3.5rem)] font-bold text-electric">
            <PhoneCallIcon aria-hidden weight="duotone" className="size-10 text-accent-5" />
            {formatPhone(phone)}
          </a>
        )}
      </PageHero>
      <section className="pb-24">
        <Container>
          <DemoTabs tabs={tabs} />
        </Container>
      </section>
    </>
  );
}
