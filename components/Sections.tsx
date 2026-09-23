import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { CtaButton } from "./CtaButton";
import { FlightPlan } from "./FlightPlan";
import { Logo } from "./Logo";
import { COMPARISON, COUNTRIES, FAQS, PROOF_LINE, STEPS } from "@/lib/content";

const wrap = "mx-auto max-w-[1240px]";
const h2 = "text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]";

export function Hero() {
  return (
    <section className="px-4 pb-20 pt-14 md:px-6 md:pb-28 md:pt-20">
      <div className={wrap}>
        <h1 className="text-[clamp(2.5rem,6.2vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          <span className="block">One team. Every channel.</span>{" "}
          <span className="block text-muted">Planned like a campaign.</span>
        </h1>
        <div className="mt-7 flex flex-col gap-8 md:mt-9 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[44ch] text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed">
            AI video, paid ads, CRM automation and AI agents, run end to end by one team.
          </p>
          <CtaButton size="lg" />
        </div>
        <div className="mt-12 md:mt-16">
          <FlightPlan />
        </div>
      </div>
    </section>
  );
}

export function ProofBand() {
  return (
    <section aria-label="Proof" className="border-y border-rule bg-surface px-4 py-14 md:px-6 md:py-20">
      <div className={`${wrap} grid gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center md:gap-16`}>
        <p className="text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium leading-[1.25] tracking-[-0.025em]">
          {PROOF_LINE}.
        </p>
        <ul className="grid grid-cols-5 gap-2" aria-label="Countries delivered in">
          {COUNTRIES.map((c) => (
            <li
              key={c.code}
              title={c.name}
              className="grid aspect-square place-items-center rounded-[14px] bg-accent-soft font-mono text-base font-medium text-accent md:text-lg"
            >
              <span aria-hidden>{c.code}</span>
              <span className="sr-only">{c.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${wrap} mt-12 border-t border-rule pt-8`}>
        <p className="text-sm text-muted">[PLACEHOLDER: client logos, with permission]</p>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="h-14 rounded-[12px] border border-dashed border-rule" aria-hidden />
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Compare() {
  return (
    <section className="px-4 py-24 md:px-6 md:py-36">
      <div className={wrap}>
        <h2 className={`${h2} max-w-[20ch]`}>Stop managing four vendors to run one funnel.</h2>
        <div className="mt-14 overflow-hidden rounded-[20px] border border-rule bg-surface md:mt-20">
          <div className="hidden grid-cols-[minmax(0,2fr)_minmax(0,5fr)_minmax(0,5fr)] border-b border-rule text-sm text-muted md:grid">
            <div className="px-8 py-5" />
            <div className="px-8 py-5">The usual setup</div>
            <div className="bg-accent-soft px-8 py-5 font-medium text-accent">With Techieficial</div>
          </div>
          {COMPARISON.map((row) => (
            <div
              key={row.topic}
              className="grid border-b border-rule last:border-b-0 md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)_minmax(0,5fr)]"
            >
              <div className="px-5 pt-6 font-medium md:px-8 md:py-7">{row.topic}</div>
              <div className="px-5 pb-3 pt-2 leading-relaxed text-muted md:px-8 md:py-7">
                <span className="mb-1 block text-xs md:hidden">The usual setup</span>
                {row.usual}
              </div>
              <div className="mx-3 mb-4 rounded-[12px] bg-accent-soft px-4 py-3 leading-relaxed md:m-0 md:rounded-none md:px-8 md:py-7">
                <span className="mb-1 block text-xs text-accent md:hidden">With Techieficial</span>
                {row.ours}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="bg-surface px-4 py-24 md:px-6 md:py-36">
      <div className={wrap}>
        <h2 className={`${h2} max-w-[18ch]`}>From first call to a running program.</h2>
        <ol className="relative mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
          <span aria-hidden className="absolute left-[15px] top-4 h-[calc(100%-2rem)] w-px bg-rule md:left-0 md:top-[15px] md:h-px md:w-full" />
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative pl-14 md:pl-0 md:pt-16">
              <span className="absolute left-0 top-0 grid size-8 place-items-center rounded-full bg-accent font-mono text-sm font-medium text-on-accent">
                {i + 1}
              </span>
              <h3 className="text-2xl font-medium tracking-[-0.025em]">{s.title}</h3>
              <p className="mt-3 max-w-[36ch] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const ACADEMY = [
  { title: "Courses", body: "Self-paced lessons on the same systems we build for clients." },
  { title: "Mentorship", body: "One-to-one sessions with a practitioner while you build your own." },
  { title: "Corporate training", body: "Training for your marketing or operations team, run on your own stack." },
];

export function Academy() {
  return (
    <section id="academy" className="px-4 py-24 md:px-6 md:py-36">
      <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20`}>
        <div>
          <h2 className={`${h2} max-w-[16ch]`}>Want to run it yourself? Learn from the people who build it.</h2>
          <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-muted">
            The Techieficial Academy teaches your team to run CRM, ads, video and AI agents in-house.
          </p>
          <dl className="mt-10 border-t border-rule">
            {ACADEMY.map((a) => (
              <div key={a.title} className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
                <dt className="font-medium">{a.title}</dt>
                <dd className="leading-relaxed text-muted">{a.body}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid aspect-[4/5] place-items-center rounded-[20px] border border-dashed border-rule bg-surface p-8 text-center text-sm text-muted sm:aspect-[4/3] lg:aspect-[4/5]">
          [PLACEHOLDER: Academy session photo, 1600 x 2000]
        </div>
      </div>
    </section>
  );
}

function Quote({ big = false }: { big?: boolean }) {
  return (
    <figure
      className={`flex flex-col justify-between rounded-[20px] bg-surface p-7 md:p-9 ${big ? "md:row-span-2" : ""}`}
    >
      <blockquote
        className={`${big ? "text-2xl md:text-[2rem]" : "text-lg md:text-xl"} font-medium leading-snug tracking-[-0.02em] text-muted`}
      >
        &ldquo;[PLACEHOLDER: client quote, 3 lines max]&rdquo;
      </blockquote>
      <figcaption className="mt-10 flex items-center gap-4 text-sm">
        <span aria-hidden className="size-11 shrink-0 rounded-full border border-dashed border-rule" />
        <span>
          <span className="block font-medium">[PLACEHOLDER: Name]</span>
          <span className="text-muted">[PLACEHOLDER: Role, Company]</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="clients-heading" className="px-4 pb-24 md:px-6 md:pb-36">
      <div className={wrap}>
        <h2 id="clients-heading" className={`${h2} max-w-[18ch]`}>
          What clients say.
        </h2>
        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:grid-rows-2">
          <Quote big />
          <Quote />
          <Quote />
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="border-t border-rule px-4 py-24 md:px-6 md:py-36">
      <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}>
        <h2 className={`${h2} max-w-[12ch]`}>Questions, answered.</h2>
        <div className="border-t border-rule">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-rule">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-medium tracking-[-0.015em] md:text-xl">
                {f.q}
                <PlusIcon
                  aria-hidden
                  className="size-5 shrink-0 text-muted transition-transform duration-300 ease-out-expo group-open:rotate-45"
                />
              </summary>
              <p className="max-w-[60ch] pb-7 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="book" className="px-4 pb-6 md:px-6">
      <div className="mx-auto max-w-[1288px] rounded-[28px] bg-accent px-6 py-16 text-on-accent md:px-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end lg:gap-20">
          <div>
            <h2 className="max-w-[14ch] text-[clamp(2.3rem,5.4vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Let&rsquo;s plan your next 12 weeks.
            </h2>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed opacity-85">
              On the call we look at your goals and current channels, and tell you where we would start. If
              we are not the right fit, we will say so.
            </p>
            <div className="mt-10">
              <CtaButton size="lg" tone="inverse" />
            </div>
          </div>
          <div className="grid min-h-[260px] place-items-center rounded-[20px] border border-dashed border-current/35 p-8 text-center text-sm opacity-85">
            [PLACEHOLDER: booking calendar embed]
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-16 md:px-6">
      <div className={`${wrap} flex flex-col gap-10 md:flex-row md:items-start md:justify-between`}>
        <div>
          <Logo />
          <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-muted">
            AI video, paid ads, CRM automation, AI agents and training. One team.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm">
          <a href="#services" className="text-muted hover:text-ink">Services</a>
          <a href="#academy" className="text-muted hover:text-ink">Academy</a>
          <a href="#process" className="text-muted hover:text-ink">How it works</a>
          <a href="#faq" className="text-muted hover:text-ink">FAQ</a>
          <span className="text-muted">[PLACEHOLDER: email]</span>
          <span className="text-muted">[PLACEHOLDER: social links]</span>
        </nav>
      </div>
      <p className={`${wrap} mt-14 border-t border-rule pt-6 text-xs text-muted`}>
        &copy; {new Date().getFullYear()} Techieficial. [PLACEHOLDER: legal entity and privacy policy link]
      </p>
    </footer>
  );
}
