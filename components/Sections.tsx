import { CheckIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { CtaButton } from "./CtaButton";
import { FlightPlan } from "./FlightPlan";
import { Logo } from "./Logo";
import { ServiceWheel } from "./ServiceWheel";
import { ContactForm } from "./ContactForm";
import { COMPARISON, COUNTRIES, FAQS, STEPS } from "@/lib/content";

const wrap = "mx-auto max-w-[1240px]";
const h2 = "text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]";

/** Glow and flow line behind the nav and hero, so there is no seam under the sticky nav. */
export function HeroBackdrop() {
  return (
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1100px] overflow-hidden">
        <div className="absolute -top-40 right-[-10%] size-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(124,92,255,0.28),transparent)]" />
        <div className="absolute bottom-[-20%] left-[-15%] size-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.16),transparent)]" />
        <svg viewBox="0 0 1440 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="flow" x1="0" x2="1">
              <stop offset="0" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="0.4" stopColor="#7c5cff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#22d3ee" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path
            className="flow-line"
            d="M-40 620 C 260 700, 460 520, 720 440 S 1100 300, 1180 420 S 1120 620, 1250 520 S 1400 300, 1500 260"
            fill="none"
            stroke="url(#flow)"
            strokeWidth="2.5"
          />
        </svg>
      </div>
  );
}

export function Hero() {
  return (
    <section className="relative px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-14">
      <div className={`${wrap} grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-8`}>
        <div>
          <h1 className="text-[clamp(2.6rem,5.6vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            One team for your whole <span className="text-electric">growth engine</span>.
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed">
            AI video, paid ads, CRM automation and AI agents, run end to end. Plus an Academy to train
            your team.
          </p>
          <div className="mt-9">
            <CtaButton size="lg" />
          </div>
        </div>
        <ServiceWheel />
      </div>
    </section>
  );
}

export function PlanSection() {
  return (
    <section className="px-4 py-24 md:px-6 md:py-32">
      <div className={wrap}>
        <h2 className={`${h2} max-w-[20ch]`}>Every channel on one plan.</h2>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted">
          Each service goes live in the right order, so leads from your ads land in a CRM that is
          ready for them.
        </p>
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
      <div className={`${wrap} grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-16`}>
        <p className="font-mono text-[clamp(4.5rem,11vw,8.5rem)] font-medium leading-none tracking-[-0.06em] text-accent-text tabular">
          13+
        </p>
        <div>
          <p className="max-w-[34ch] text-[clamp(1.35rem,2.4vw,1.9rem)] font-medium leading-[1.3] tracking-[-0.02em]">
            CRM and automation systems delivered for clients in five countries.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-muted" aria-label="Countries delivered in">
            {COUNTRIES.map((c) => (
              <li key={c.code}>{c.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className={`${wrap} mt-12 rounded-[12px] border border-dashed border-rule px-5 py-4 text-sm text-muted`}>
        [PLACEHOLDER: client logos, with permission]
      </p>
    </section>
  );
}

export function Compare() {
  return (
    <section className="px-4 py-24 md:px-6 md:py-36">
      <div className={wrap}>
        <h2 className={`${h2} max-w-[20ch]`}>Stop managing three vendors to run one funnel.</h2>
        <div className="mt-14 overflow-hidden rounded-[20px] border border-rule bg-surface md:mt-20">
          <div className="hidden grid-cols-[minmax(0,2fr)_minmax(0,5fr)_minmax(0,5fr)] border-b border-rule text-sm text-muted md:grid">
            <div className="px-8 py-5" />
            <div className="px-8 py-5">The usual setup</div>
            <div className="bg-accent-soft px-8 py-5 font-medium text-accent-text">With Techieficial</div>
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
                <span className="mb-1 block text-xs text-accent-text md:hidden">With Techieficial</span>
                {row.ours}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROCESS_WEEKS = Array.from({ length: 13 }, (_, i) => i);

export function Process() {
  return (
    <section id="process" className="bg-surface px-4 py-24 md:px-6 md:py-36">
      <div className={wrap}>
        <h2 className={`${h2} max-w-[18ch]`}>From first call to a running program.</h2>
        <ol className="mt-14 flex flex-col md:mt-20">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="grid gap-4 border-t border-rule py-8 last:border-b md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-12"
            >
              <div>
                <p className="font-mono text-sm text-accent-text tabular">
                  {i + 1}. {s.label}
                </p>
                <h3 className="mt-2 text-2xl font-medium tracking-[-0.025em]">{s.title}</h3>
                <p className="mt-2 max-w-[44ch] leading-relaxed text-muted">{s.body}</p>
              </div>
              <div aria-hidden className="grid h-7 grid-cols-13 gap-1 md:h-8 md:gap-1.5">
                {PROCESS_WEEKS.map((w) => (
                  <span key={w} style={{ gridColumn: w + 1, gridRow: 1 }} className="rounded-[4px] bg-track" />
                ))}
                <span
                  style={{ gridColumn: `${s.weeks[0] + 1} / ${s.weeks[1] + 2}`, gridRow: 1 }}
                  className="rounded-[6px] bg-accent"
                />
              </div>
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
    <section id="start" className="px-4 pb-6 md:px-6">
      <div className="relative mx-auto max-w-[1288px] overflow-hidden rounded-[28px] border border-rule bg-surface px-6 py-16 md:px-16 md:py-24">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(124,92,255,0.3),transparent)]" />
        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <div>
            <h2 className="max-w-[14ch] text-[clamp(2.3rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              Tell us about your <span className="text-electric">project</span>.
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">
              Share your goals and the channels you need. We reply with questions or a proposed next
              step. If we are not the right fit, we will say so.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {["A reply from the team, not a bot", "A written plan if we are a fit", "No obligation to continue"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <CheckIcon weight="bold" aria-hidden className="size-4 shrink-0 text-accent-2" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const link = "inline-flex min-h-11 items-center text-muted hover:text-ink";
  return (
    <footer className="px-4 pb-10 pt-16 md:px-6">
      <div className={`${wrap} flex flex-col gap-10 md:flex-row md:items-start md:justify-between`}>
        <div>
          <Logo />
          <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-muted">
            AI video, paid ads, CRM automation, AI agents and training. One team.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 text-sm">
          <a href="#services" className={link}>Services</a>
          <a href="#academy" className={link}>Academy</a>
          <a href="#process" className={link}>How it works</a>
          <a href="#faq" className={link}>FAQ</a>
          <a href="#start" className={link}>Start your project</a>
        </nav>
      </div>
      <p className={`${wrap} mt-14 border-t border-rule pt-6 text-xs text-muted`}>
        &copy; {new Date().getFullYear()} Techieficial. [PLACEHOLDER: email, social links, legal entity and privacy policy]
      </p>
    </footer>
  );
}

