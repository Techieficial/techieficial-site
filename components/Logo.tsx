import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Techieficial home">
      <svg viewBox="0 0 22 18" className="h-[18px] w-[22px]" aria-hidden>
        <rect x="0" y="0" width="14" height="4" rx="2" className="fill-accent" />
        <rect x="5" y="7" width="17" height="4" rx="2" className="fill-accent" />
        <rect x="2" y="14" width="9" height="4" rx="2" className="fill-accent" />
      </svg>
      <span className="text-[17px] font-semibold tracking-[-0.02em]">techieficial</span>
    </Link>
  );
}
