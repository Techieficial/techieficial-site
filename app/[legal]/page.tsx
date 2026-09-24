import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ui } from "@/content/pages";
import { getLegalDoc, getLegalDocs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero, Prose } from "@/components/blocks";
import { formatDate } from "@/components/PostMeta";
import { Container } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLegalDocs().map((d) => ({ legal: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[legal]">): Promise<Metadata> {
  const d = getLegalDoc((await params).legal);
  if (!d) return {};
  return pageMetadata({ title: `${d.title} | Techieficial`, description: d.description, path: d.url });
}

export default async function LegalPage({ params }: PageProps<"/[legal]">) {
  const doc = getLegalDoc((await params).legal);
  if (!doc) notFound();
  return (
    <>
      <PageHero title={doc.title} crumbs={[{ name: doc.title, path: doc.url }]}>
        <p className="text-sm text-muted">
          {ui.lastUpdated}: <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
        </p>
      </PageHero>
      <Container className="pb-24">
        <div className="max-w-[72ch]">
          <Prose html={doc.body} />
        </div>
      </Container>
    </>
  );
}
