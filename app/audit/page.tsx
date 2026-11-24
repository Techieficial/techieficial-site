import { auditPage } from "@/content/tools";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { LeadForm } from "@/components/forms/LeadForm";
import { Section } from "@/components/ui";

export const metadata = pageMetadata({ ...auditPage.seo, path: "/audit" });

/** Free lead-leak audit (docs/SITE_CONTENT_V3.md 2.8). Tag: audit. */
export default function AuditPage() {
  return (
    <>
      <PageHero title={auditPage.title} intro={auditPage.intro} crumbs={[{ name: "Free audit", path: "/audit" }]} />
      <Section className="!pt-4" labelledBy="audit-form-title">
        <div className="max-w-2xl rounded-[20px] border border-rule bg-surface p-7">
          <h2 id="audit-form-title" className="mb-6 text-2xl font-bold">
            {auditPage.formTitle}
          </h2>
          <LeadForm source="audit" fields={["name", "email", "phone", "company", "siteUrl", "city"]} submitLabel={auditPage.submit} redirectTo="/thank-you/audit" />
        </div>
      </Section>
    </>
  );
}
