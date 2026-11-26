import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes, singletonTypes } from "./schemaTypes";
import { structure } from "./structure";
import { resolveActions, resolveBadges } from "./workflow";

/**
 * Project id and dataset come from studio/.env (see .env.example). Nothing is hardcoded:
 * the Sanity project is created by the owner in B5.
 */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "development";

export default defineConfig({
  name: "default",
  title: "Techieficial content",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: "2025-01-01" })],
  schema: {
    types: schemaTypes,
    // Singletons never appear in the global "Create new" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: resolveActions,
    badges: resolveBadges,
    newDocumentOptions: (prev, { creationContext }) => (creationContext.type === "global" ? prev.filter((item) => !singletonTypes.has(item.templateId)) : prev),
  },
});
