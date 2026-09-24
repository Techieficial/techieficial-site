import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { notFoundPage } from "@/content/pages";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: { absolute: notFoundPage.seoTitle }, robots: { index: false } };

export default function NotFound() {
  return (
    <section className="pb-24 pt-36 md:pt-44">
      <Container>
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent-text">404</p>
        <h1 className="mt-4 max-w-[18ch] text-[length:var(--text-h1)] font-bold leading-[1.04] tracking-[-0.035em]">{notFoundPage.title}</h1>
        <p className="mt-6 max-w-[55ch] text-[length:var(--text-lead)] text-muted">{notFoundPage.body}</p>
        <ul className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
          {notFoundPage.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group flex items-center justify-between rounded-2xl border border-rule bg-surface p-5 font-medium hover:border-accent-hover">
                {l.label}
                <ArrowRightIcon aria-hidden className="size-5 text-accent-text transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
