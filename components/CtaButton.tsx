import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { CTA_HREF, CTA_LABEL } from "@/lib/content";

type Props = {
  size?: "md" | "lg";
  className?: string;
};

export function CtaButton({ size = "md", className = "" }: Props) {
  const sizes = {
    md: "h-11 pl-5 pr-1.5 text-[15px] gap-3",
    lg: "h-14 pl-7 pr-2 text-base gap-4",
  };
  return (
    <a
      href={CTA_HREF}
      className={`group inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-electric font-semibold text-on-accent shadow-[0_10px_30px_-12px_rgba(124,92,255,0.7)] transition-[transform,box-shadow] duration-300 ease-out-expo hover:shadow-[0_14px_40px_-12px_rgba(34,211,238,0.6)] active:scale-[0.98] ${sizes[size]} ${className}`}
    >
      {CTA_LABEL}
      <span
        aria-hidden
        className={`grid place-items-center rounded-full bg-on-accent/12 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-px ${size === "lg" ? "size-10" : "size-8"}`}
      >
        <ArrowUpRightIcon weight="bold" className="size-4" />
      </span>
    </a>
  );
}
