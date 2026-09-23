import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { CTA_HREF, CTA_LABEL } from "@/lib/content";

type Props = {
  size?: "md" | "lg";
  tone?: "accent" | "inverse";
  className?: string;
};

export function CtaButton({ size = "md", tone = "accent", className = "" }: Props) {
  const tones = {
    accent: "bg-accent text-on-accent hover:bg-accent-hover",
    inverse: "bg-on-accent text-accent hover:opacity-90",
  };
  const dot = {
    accent: "bg-on-accent/15",
    inverse: "bg-accent/10",
  };
  const sizes = {
    md: "h-11 pl-5 pr-1.5 text-[15px] gap-3",
    lg: "h-14 pl-7 pr-2 text-base gap-4",
  };
  return (
    <a
      href={CTA_HREF}
      className={`group inline-flex shrink-0 items-center whitespace-nowrap rounded-full font-medium transition-[background-color,transform,opacity] duration-300 ease-out-expo active:scale-[0.98] ${tones[tone]} ${sizes[size]} ${className}`}
    >
      {CTA_LABEL}
      <span
        aria-hidden
        className={`grid place-items-center rounded-full transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-px ${dot[tone]} ${size === "lg" ? "size-10" : "size-8"}`}
      >
        <ArrowUpRightIcon weight="bold" className="size-4" />
      </span>
    </a>
  );
}
