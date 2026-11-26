import { defineField, defineType, type FieldDefinition, type FieldGroupDefinition, type PreviewConfig, type SortOrdering } from "sanity";
import { siteCopyRule } from "../lib/rules";

type DocOptions = {
  name: string;
  title: string;
  fields: FieldDefinition[];
  /** Adds the shared SEO object (pages that have their own URL). */
  seo?: boolean;
  /** Adds the review workflow object. Singletons and media skip it. */
  workflow?: boolean;
  groups?: FieldGroupDefinition[];
  preview?: PreviewConfig;
  orderings?: SortOrdering[];
};

/**
 * Every document type goes through here so the site copy rules (no em dash, no CRM
 * vendor name) run on every text field, and SEO and workflow fields stay consistent.
 */
export function defineDocument({ name, title, fields, seo = false, workflow = true, groups, preview, orderings }: DocOptions) {
  const extra: FieldDefinition[] = [];
  if (seo) extra.push(defineField({ name: "seo", title: "SEO", type: "seo", group: groups ? "seo" : undefined, validation: (rule) => rule.required() }));
  if (workflow) extra.push(defineField({ name: "workflow", title: "Review workflow", type: "workflow", group: groups ? "workflow" : undefined }));
  const allGroups = groups
    ? [...groups, ...(seo ? [{ name: "seo", title: "SEO" }] : []), ...(workflow ? [{ name: "workflow", title: "Workflow" }] : [])]
    : undefined;
  return defineType({
    name,
    title,
    type: "document",
    groups: allGroups,
    fields: [...fields, ...extra],
    preview,
    orderings,
    validation: (rule) => rule.custom((doc) => siteCopyRule(doc)),
  });
}

/** URL slug generated from a source field. */
export const slugField = (source = "title", group?: string) =>
  defineField({
    name: "slug",
    title: "URL slug",
    type: "slug",
    group,
    options: { source, maxLength: 96 },
    validation: (rule) => rule.required(),
  });

/** Hidden in production while true (CLAUDE.md rule 1). */
export const draftField = (group?: string) =>
  defineField({
    name: "draft",
    title: "Hide on the live site",
    type: "boolean",
    group,
    description: "Keep on while any fact is unconfirmed. The section stays hidden in production.",
    initialValue: true,
  });

/** Phosphor icon name used by the site, e.g. "Phone". */
export const iconField = (group?: string) =>
  defineField({ name: "icon", title: "Icon name", type: "string", group, description: 'Phosphor icon name, for example "Phone".' });

export const serviceRefs = (name: string, title: string, group?: string) =>
  defineField({ name, title, type: "array", group, of: [{ type: "reference", to: [{ type: "service" }] }], validation: (rule) => rule.unique() });
