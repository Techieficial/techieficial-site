import { defineField, defineType } from "sanity";

/** Draft, review, approve, publish (BUILD_PLAN_V3 Phase 7). */
export const workflowStatuses = [
  { title: "Draft", value: "draft" },
  { title: "In review", value: "in_review" },
  { title: "Approved", value: "approved" },
  { title: "Published", value: "published" },
] as const;

export type WorkflowStatus = (typeof workflowStatuses)[number]["value"];

/** Statuses that allow the Publish button. */
export const publishableStatuses: WorkflowStatus[] = ["approved", "published"];

export const workflow = defineType({
  name: "workflow",
  title: "Review workflow",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: [...workflowStatuses], layout: "radio", direction: "horizontal" },
      initialValue: "draft",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "reviewer", title: "Reviewer", type: "string", description: "Who checked this copy." }),
    defineField({ name: "notes", title: "Review notes", type: "text", rows: 3 }),
  ],
});
