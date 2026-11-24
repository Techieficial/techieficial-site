import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { team, teamCopy, teamUrl, type TeamMember } from "@/content/team";
import { liveHref } from "@/lib/nav";
import { Reveal } from "./Reveal";
import { ServiceGlyph } from "./layout/ServiceGlyph";

/** Link to a team member's profile, or the AI agents service page until profiles exist. */
export const profileHref = (m: TeamMember) => liveHref({ href: teamUrl(m.slug), fallback: "/services/ai-agents" }) ?? "/services/ai-agents";

/** The 4 AI employee cards: role, "Works: 24/7", 3 skills, "Replaces", link. `hire` adds an extra line per card. */
export function TeamCards({ hire }: { hire?: (m: TeamMember) => string | undefined }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((m, i) => (
        <li key={m.slug}>
          <Reveal delay={i * 0.06} className="h-full">
            <article className="flex h-full flex-col rounded-[20px] border border-rule bg-surface p-6">
              <ServiceGlyph service={{ icon: m.icon }} />
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{m.name}</h3>
              <p className="mt-1 text-sm text-muted">
                {teamCopy.worksLabel}: <span className="font-medium text-ink">{teamCopy.works}</span>
              </p>
              <ul className="mt-4 space-y-2 text-[15px]">
                {m.cardSkills.map((s) => (
                  <li key={s} className="flex gap-2.5">
                    <CheckIcon weight="bold" aria-hidden className="mt-1 size-4 shrink-0 text-accent-text" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-rule pt-4 text-sm text-muted">
                <span className="font-medium text-ink">{teamCopy.replacesLabel}:</span> {m.replaces}
              </p>
              {hire?.(m) && <p className="mt-2 text-sm text-accent-text">{hire(m)}</p>}
              <Link href={profileHref(m)} className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 font-medium text-accent-text hover:text-ink">
                {teamCopy.viewProfile}
                <span className="sr-only">: {m.name}</span>
                <ArrowRightIcon aria-hidden className="size-4" />
              </Link>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

type Step = { time: string; title: string; story: string; ai: string };

/**
 * "Follow one lead": a vertical timeline that reveals step by step as you scroll.
 * With reduced motion (or no JavaScript) it is a plain list; on phones it is one column.
 */
export function LeadStory({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative space-y-8 border-l border-rule pl-8 md:space-y-10 md:pl-10">
      {steps.map((s, i) => (
        <li key={s.time} className="relative">
          <span aria-hidden className="absolute -left-[41px] top-1 grid size-5 place-items-center rounded-full border border-rule bg-bg md:-left-[49px]">
            <span className="size-2 rounded-full bg-accent" />
          </span>
          <Reveal delay={i * 0.05}>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent-text">{s.time}</p>
            <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
            {s.story && <p className="mt-2 leading-relaxed text-muted">{s.story}</p>}
            <p className="mt-3 rounded-2xl border border-rule bg-surface p-4 leading-relaxed">{s.ai}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
