import Link from "next/link";
import { blogPage } from "@/content/pages";
import { getPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/blocks";
import { Section } from "@/components/ui";
import { PostMeta } from "@/components/PostMeta";

export const metadata = pageMetadata({ ...blogPage.seo, path: "/blog" });

export default function BlogPage() {
  const posts = getPosts();
  return (
    <>
      <PageHero title={blogPage.title} intro={blogPage.intro} crumbs={[{ name: "Blog", path: "/blog" }]} />
      <Section className="!pt-4">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={p.url} className="flex h-full flex-col rounded-[20px] border border-rule bg-surface p-7 transition-colors hover:border-accent-hover">
                <PostMeta date={p.date} minutes={p.metadata.readingTime} />
                <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{p.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
