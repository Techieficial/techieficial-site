import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { auditThanks } from "@/content/tools";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { TrackOnMount } from "@/components/TrackOnMount";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  ...pageMetadata({ ...auditThanks.seo, path: "/thank-you/audit" }),
  robots: { index: false, follow: true },
};

/** After the free audit request. The turnaround time is left out until the owner confirms it. */
export default function AuditThanksPage() {
  return (
    <>
      <TrackOnMount event="form_submit" />
      <PageHero title={auditThanks.title} intro={auditThanks.intro}>
        <Button href={siteConfig.cta.demo.href} size="lg">
          {siteConfig.cta.demo.label}
        </Button>
      </PageHero>
    </>
  );
}
