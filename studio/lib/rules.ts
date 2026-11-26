/**
 * Site copy rules (CLAUDE.md section 2), as plain functions so they can be unit tested
 * without the Studio. Schemas wire them in through `rule.custom(...)`.
 */

export const EM_DASH = "\u2014";

/**
 * The CRM vendor name, in its common spellings. Visible copy always says "CRM".
 * "high level" with a space is ordinary English ("a high level view"), so only the
 * joined brand spelling, the "Go" prefixed spellings and the abbreviation are rejected.
 */
const VENDOR_NAME = /\bgo\s*high\s*level\b|\bhighlevel\b|\bghl\b/i;

export const messages = {
  emDash: "Remove the em dash. Use a comma, period or colon instead.",
  vendor: 'Say "CRM" instead of the CRM vendor name.',
  tooLong: (max: number, length: number) => `Keep this to ${max} characters or fewer (now ${length}).`,
};

/** The first rule a piece of text breaks, or undefined when it is fine. */
export function copyProblem(text: string): string | undefined {
  if (text.includes(EM_DASH)) return messages.emDash;
  if (VENDOR_NAME.test(text)) return messages.vendor;
  return undefined;
}

export type PathSegment = string | number | { _key: string };
export type CopyIssue = { path: PathSegment[]; message: string };

/**
 * Walks a whole document (strings, objects, arrays, portable text spans) and lists every
 * string that breaks a copy rule, with a Studio path to it. Keys that start with "_" are
 * system fields (ids, types, references, asset refs) and are skipped.
 */
export function findCopyIssues(value: unknown, path: PathSegment[] = []): CopyIssue[] {
  if (typeof value === "string") {
    const message = copyProblem(value);
    return message ? [{ path, message }] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => {
      const key = item && typeof item === "object" && typeof (item as { _key?: unknown })._key === "string" ? { _key: (item as { _key: string })._key } : index;
      return findCopyIssues(item, [...path, key]);
    });
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !key.startsWith("_"))
      .flatMap(([key, child]) => findCopyIssues(child, [...path, key]));
  }
  return [];
}

/** Sanity custom validator result: true, or a list of messages with paths. */
export type RuleResult = true | { message: string; path?: PathSegment[] }[] | string;

/** Document-level rule: every text field in the document follows the copy rules. */
export function siteCopyRule(doc: unknown): RuleResult {
  const issues = findCopyIssues(doc);
  return issues.length ? issues.map(({ message, path }) => ({ message, path })) : true;
}

/** Field-level rule for one string. */
export function textRule(value: unknown): true | string {
  if (typeof value !== "string") return true;
  return copyProblem(value) ?? true;
}

/** Field-level length limit that also applies the copy rules. */
export function maxLength(max: number) {
  return (value: unknown): true | string => {
    if (typeof value !== "string") return true;
    if (value.length > max) return messages.tooLong(max, value.length);
    return textRule(value);
  };
}

/** Limits used across schemas (CLAUDE.md section 9 and velite.config.ts). */
export const limits = {
  seoTitle: 60,
  seoDescription: 155,
  outcome: 90,
};

/** Must be exactly true before the document can be published (validation errors block publishing). */
export function mustBeTrue(message: string) {
  return (value: unknown): true | string => (value === true ? true : message);
}

/**
 * Offers of $3,000 or more go to the Demo Lab and a strategy call, never direct checkout
 * (STRATEGY_PACK F6 and F7). Checks the up-front price (setup or one-time).
 */
export const checkoutLimit = 3000;

export function offerPathRule(offer: { path?: string; setup?: number; oneTime?: number } | undefined): true | string {
  if (!offer || offer.path !== "checkout") return true;
  const upFront = Math.max(offer.setup ?? 0, offer.oneTime ?? 0);
  return upFront >= checkoutLimit ? "Offers of $3,000 or more use the call path, not checkout." : true;
}

/** Places left can never be more than places in total (F14 founding offer counter). */
export function placesLeftRule(left: unknown, total: unknown): true | string {
  if (typeof left !== "number" || typeof total !== "number") return true;
  if (left < 0) return "Places left cannot be below 0.";
  return left <= total ? true : "Places left cannot be more than places in total.";
}

/** A Loom share or embed link. */
export function loomUrlRule(value: unknown): true | string {
  if (typeof value !== "string" || value === "") return true;
  return /^https:\/\/(www\.)?loom\.com\/(share|embed)\/[a-zA-Z0-9]+/.test(value) ? true : "Use a Loom link, for example https://www.loom.com/share/...";
}
