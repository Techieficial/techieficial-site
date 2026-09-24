/** Numbered cards used for "How it works" style lists. */
export function StepList({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-[20px] border border-rule bg-surface p-6">
          <span className="grid size-10 place-items-center rounded-full bg-electric font-display font-bold text-on-accent">{i + 1}</span>
          <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
          <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function CardGrid({ items, cols = 3 }: { items: { title: string; body: string }[]; cols?: 2 | 3 | 4 }) {
  const grid = cols === 4 ? "lg:grid-cols-4" : cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <div className={`grid gap-5 md:grid-cols-2 ${grid}`}>
      {items.map((c) => (
        <article key={c.title} className="rounded-[20px] border border-rule bg-surface p-7">
          <h3 className="text-xl font-semibold">{c.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{c.body}</p>
        </article>
      ))}
    </div>
  );
}
