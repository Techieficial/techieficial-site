import type { NavLinkDef } from "@/content/pages";
import { publicRoutes } from "./routes";

/**
 * Resolves a nav link to a page that exists: its v3 page if built, else its fallback, else null (hidden).
 * This keeps the menu and footer on the v3 structure while new pages are added phase by phase,
 * without ever linking to a page that does not exist.
 */
export function liveHref(link: { href: string; fallback?: string }): string | null {
  const live = new Set(publicRoutes().map((r) => r.path));
  const path = (h: string) => h.split("#")[0] || "/";
  if (live.has(path(link.href))) return link.href;
  if (link.fallback && live.has(path(link.fallback))) return link.fallback;
  return null;
}

/** Keeps only links that resolve, with their live href. */
export function liveLinks(links: NavLinkDef[]) {
  return links.flatMap((l) => {
    const href = liveHref(l);
    return href ? [{ label: l.label, href }] : [];
  });
}
