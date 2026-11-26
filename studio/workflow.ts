import type { DocumentActionComponent, DocumentActionsResolver, DocumentBadgeComponent, DocumentBadgesResolver } from "sanity";
import { publishableStatuses, workflowStatuses, type WorkflowStatus } from "./schemaTypes/objects/workflow";
import { singletonTypes, typesWithWorkflow } from "./schemaTypes";

type WithWorkflow = { workflow?: { status?: WorkflowStatus } } | null | undefined;

export const statusOf = (doc: WithWorkflow): WorkflowStatus => doc?.workflow?.status ?? "draft";

/** True when the workflow lets this document be published. */
export const canPublish = (doc: WithWorkflow) => publishableStatuses.includes(statusOf(doc));

const badgeColor: Record<WorkflowStatus, "warning" | "primary" | "success" | undefined> = {
  draft: undefined,
  in_review: "warning",
  approved: "primary",
  published: "success",
};

/** Shows the review status next to the document title. */
export const WorkflowBadge: DocumentBadgeComponent = (props) => {
  const doc = (props.draft ?? props.published) as WithWorkflow;
  const status = statusOf(doc);
  const title = workflowStatuses.find((s) => s.value === status)?.title ?? status;
  return { label: title, title: `Review status: ${title}`, color: badgeColor[status] };
};

/**
 * Wraps the built-in Publish action: it stays disabled until the review status is Approved.
 * Roles (B5) decide who may set Approved; this keeps the order draft, review, approve, publish.
 */
export function gatePublish(original: DocumentActionComponent): DocumentActionComponent {
  const Gated: DocumentActionComponent = (props) => {
    const result = original(props);
    if (!result) return result;
    const doc = (props.draft ?? props.published) as WithWorkflow;
    if (canPublish(doc)) return result;
    return { ...result, disabled: true, title: "Set the review status to Approved before publishing." };
  };
  Gated.action = original.action;
  Gated.displayName = "GatedPublishAction";
  return Gated;
}

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export const resolveActions: DocumentActionsResolver = (prev, context) => {
  if (singletonTypes.has(context.schemaType)) return prev.filter((action) => action.action && singletonActions.has(action.action));
  if (!typesWithWorkflow.includes(context.schemaType)) return prev;
  return prev.map((action) => (action.action === "publish" ? gatePublish(action) : action));
};

export const resolveBadges: DocumentBadgesResolver = (prev, context) => (typesWithWorkflow.includes(context.schemaType) ? [...prev, WorkflowBadge] : prev);
