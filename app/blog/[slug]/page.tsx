import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPage, ui } from "@/content/pages";
import { getPost, getPosts, serviceBySlug } from "@/lib/content";
import { articleLd, pageMetadata } from "@/lib/seo";
import { CTABand, PageHero, Prose } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { PostMeta } from "@/components/PostMeta";
import { Container } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.seoTitle, description: p.description, path: p.url, type: "article" });
}

type TocItem = { title: string; url: string; items: TocItem[] };

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const toc = post.toc as TocItem[];
  const related = getPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.services.filter((s) => post.services.includes(s)).length - a.services.filter((s) => post.services.includes(s)).length)
    .slice(0, 2);

  return (
    <>
      <JsonLd data={articleLd(post)} />
      <PageHero
        title={post.title}
        crumbs={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: post.url },
        ]}
      >
        <PostMeta date={post.date} minutes={post.metadata.readingTime} author={post.author} />
      </PageHero>
      <Container className="grid grid-cols-[minmax(0,1fr)] gap-12 pb-24 lg:grid-cols-[minmax(0,8fr)_minmax(0,3fr)]">
        <article className="min-w-0">
          <Prose html={post.body} />
          {post.services.length > 0 && (
            <p className="mt-12 flex flex-wrap gap-2 border-t border-rule pt-6 text-sm">
              {post.services.map((s) => {
                const svc = serviceBySlug(s);
                return (
                  <Link key={s} href={svc.url} className="rounded-full border border-rule px-4 py-2 hover:border-accent-hover">
                    {svc.name}
                  </Link>
                );
              })}
            </p>
          )}
        </article>
        {toc.length > 0 && (
          <aside className="order-first lg:order-none">
            <nav aria-labelledby="toc-title" className="rounded-2xl border border-rule bg-surface p-6 lg:sticky lg:top-28">
              <h2 id="toc-title" className="font-semibold">
                {blogPage.toc}
              </h2>
              <ul className="mt-3 grid gap-2 text-[15px]">
                {toc.flatMap((t) => [t, ...t.items]).map((t) => (
                  <li key={t.url}>
                    <a href={t.url} className="text-muted hover:text-ink">
                      {t.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </Container>
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-rule py-20">
          <Container>
            <h2 id="related-title" className="text-[length:var(--text-h3)] font-bold">
              {blogPage.related}
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={p.url} className="block h-full rounded-[20px] border border-rule bg-surface p-7 hover:border-accent-hover">
                    <PostMeta date={p.date} minutes={p.metadata.readingTime} />
                    <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
      <CTABand title={ui.industryCtaTitle} body={ui.serviceCtaBody} />
    </>
  );
}
