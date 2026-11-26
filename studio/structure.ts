import type { StructureResolver } from "sanity/structure";
import { typesWithWorkflow } from "./schemaTypes";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title));

/** Desk grouping: Pages, AI team, Offers, Proof, Blog, FAQs, Media, Settings, plus review queues. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Needs review")
        .id("needs-review")
        .child(
          S.documentList()
            .title("Needs review")
            .apiVersion("2025-01-01")
            .filter('_type in $types && workflow.status == "in_review"')
            .params({ types: typesWithWorkflow })
            .defaultOrdering([{ field: "_updatedAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Approved, not yet published")
        .id("approved")
        .child(
          S.documentList()
            .title("Approved")
            .apiVersion("2025-01-01")
            .filter('_type in $types && workflow.status == "approved"')
            .params({ types: typesWithWorkflow }),
        ),
      S.divider(),
      S.listItem()
        .title("Pages")
        .id("pages")
        .child(
          S.list()
            .title("Pages")
            .items([S.documentTypeListItem("page").title("Pages"), S.documentTypeListItem("service").title("Services"), S.documentTypeListItem("industry").title("Industries")]),
        ),
      S.documentTypeListItem("aiTeamMember").title("AI team"),
      S.listItem()
        .title("Offers")
        .id("offers")
        .child(S.list().title("Offers").items([S.documentTypeListItem("offer").title("Offers"), singleton(S, "foundingOffer", "Founding offer")])),
      S.listItem()
        .title("Proof")
        .id("proof")
        .child(S.list().title("Proof").items([S.documentTypeListItem("caseStudy").title("Case studies"), S.documentTypeListItem("testimonial").title("Testimonials")])),
      S.documentTypeListItem("blogPost").title("Blog"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("mediaAsset").title("Media"),
      S.divider(),
      S.listItem().title("Settings").id("settings").child(S.list().title("Settings").items([singleton(S, "siteSettings", "Site settings")])),
    ]);
