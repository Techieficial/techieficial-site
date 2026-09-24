import { ContentIcon } from "../icons";

export type NavService = { slug: string; name: string; url: string; outcome: string; icon: string; color: string };

export function ServiceGlyph({ service, small = false }: { service: NavService; small?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl ${small ? "size-9" : "size-11"}`}
      style={{ background: `${service.color}22`, color: service.color }}
    >
      <ContentIcon name={service.icon} weight="duotone" aria-hidden className={small ? "size-5" : "size-6"} />
    </span>
  );
}
