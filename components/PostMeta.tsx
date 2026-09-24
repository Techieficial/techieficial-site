import { blogPage } from "@/content/pages";

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export function PostMeta({ date, minutes, author }: { date: string; minutes: number; author?: string }) {
  return (
    <p className="text-sm text-muted">
      {author && <>{author} · </>}
      <time dateTime={date}>{formatDate(date)}</time> · {Math.max(1, Math.round(minutes))} {blogPage.minRead}
    </p>
  );
}
