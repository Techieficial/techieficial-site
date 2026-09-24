import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-electric text-on-accent shadow-[0_10px_30px_-12px_rgba(124,92,255,0.8)] hover:shadow-[0_14px_40px_-12px_rgba(34,211,238,0.6)]",
  secondary: "border border-rule bg-surface/60 text-ink hover:border-accent-hover hover:bg-surface-2",
  ghost: "text-ink hover:text-accent-text",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out-expo active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${extra}`;
}

/** Link styled as a button. External or tel links render a plain anchor. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = variant === "primary",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  "data-event"?: string;
}) {
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowUpRightIcon
          weight="bold"
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-px group-hover:translate-x-0.5"
        />
      )}
    </>
  );
  const cls = buttonClass(variant, size, className);
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Section({
  id,
  children,
  className = "",
  tone = "default",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "raised";
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-20 md:py-28 ${tone === "raised" ? "border-y border-rule bg-surface/50" : ""} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  title,
  intro,
  id,
  align = "left",
  as: Tag = "h2",
  action,
}: {
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div className={`mb-12 flex flex-col gap-6 md:mb-16 ${centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className={centered ? "max-w-3xl" : "max-w-3xl"}>
        <Tag
          id={id}
          className={`${Tag === "h1" ? "text-[length:var(--text-h1)]" : "text-[length:var(--text-h2)]"} font-bold leading-[1.05] tracking-[-0.03em]`}
        >
          {title}
        </Tag>
        {intro && <p className="mt-5 max-w-[60ch] text-[length:var(--text-lead)] leading-relaxed text-muted">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function Glow({ color, className = "" }: { color: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 rounded-full blur-3xl ${className}`}
      style={{ background: `radial-gradient(closest-side, ${color}55, transparent)` }}
    />
  );
}

export function Tag({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface/70 px-3.5 py-1.5 text-sm font-medium text-ink"
    >
      <span aria-hidden className="size-2 rounded-full" style={{ background: color ?? "var(--accent-2)" }} />
      {children}
    </span>
  );
}
