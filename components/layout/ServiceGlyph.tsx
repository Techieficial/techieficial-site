import { ContentIcon } from "../icons";

export type NavService = { slug: string; name: string; url: string; outcome: string; icon: string; color: string };

/** Icon tile used in menus. Only the icon name is needed. */

export function ServiceGlyph({ service, small = false }: { service: { icon: string }; small?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl ${small ? "size-9" : "size-11"}`}
      style={{ background: "color-mix(in srgb, var(--accent) 12%, transparent)", color: "var(--accent-text)" }}
    >
      <ContentIcon name={service.icon} weight="duotone" aria-hidden className={small ? "size-5" : "size-6"} />
    </span>
  );
}
