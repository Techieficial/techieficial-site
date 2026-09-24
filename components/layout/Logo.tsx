import Link from "next/link";
import { siteConfig } from "@/site.config";

/** Current wordmark. Replace with /public/brand/logo.svg when the final logo is supplied. */
export function LogoMark({ className = "h-[18px] w-[22px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 18" className={className} aria-hidden>
      <rect x="0" y="0" width="14" height="4" rx="2" fill="#9B87FF" />
      <rect x="5" y="7" width="17" height="4" rx="2" fill="#22D3EE" />
      <rect x="2" y="14" width="9" height="4" rx="2" fill="#F472B6" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="inline-flex min-h-11 items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
      <LogoMark />
      <span className="font-display text-[19px] font-semibold tracking-[-0.02em]">techieficial</span>
    </Link>
  );
}
