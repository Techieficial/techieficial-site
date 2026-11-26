import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { documentTypes, objectTypes, schemaTypes, singletonTypes, typesWithSeo, typesWithWorkflow } from "../schemaTypes";
import { canPublish, statusOf } from "../workflow";

type Field = { name: string; type: string; fields?: Field[] };
const byName = new Map(schemaTypes.map((type) => [type.name, type]));
const fieldsOf = (typeName: string) => ((byName.get(typeName) as unknown as { fields: Field[] }).fields ?? []).map((field) => field.name);

/** Reads the keys of a TypeScript object type from a file in the site's content folder. */
function typeKeys(file: string, typeName: string): string[] {
  const source = readFileSync(fileURLToPath(new URL(`../../content/${file}`, import.meta.url)), "utf8");
  const start = source.indexOf(`export type ${typeName} = {`);
  if (start < 0) throw new Error(`${typeName} not found in ${file}`);
  let depth = 0;
  let end = start;
  for (let i = source.indexOf("{", start); i < source.length; i++) {
    if (source[i] === "{") depth++;
    if (source[i] === "}") depth--;
    if (depth === 0) {
      end = i;
      break;
    }
  }
  const body = source.slice(source.indexOf("{", start) + 1, end);
  // Top-level keys only: lines indented by exactly two spaces.
  return [...body.matchAll(/^ {2}(\w+)\??:/gm)].map((match) => match[1]);
}

describe("schema registry", () => {
  it("registers every Phase 7 document type", () => {
    const expected = ["page", "service", "industry", "offer", "aiTeamMember", "blogPost", "caseStudy", "testimonial", "faq", "mediaAsset", "foundingOffer", "siteSettings"];
    expect(documentTypes.map((type) => type.name).sort()).toEqual([...expected].sort());
    for (const name of expected) expect(byName.get(name)?.type).toBe("document");
  });

  it("registers the shared objects", () => {
    expect(objectTypes.map((type) => type.name)).toEqual(expect.arrayContaining(["seo", "cta", "workflow"]));
  });

  it("has unique type names", () => {
    expect(new Set(schemaTypes.map((type) => type.name)).size).toBe(schemaTypes.length);
  });

  it.each(typesWithSeo)("%s has an seo field of type seo", (name) => {
    const field = (byName.get(name) as unknown as { fields: Field[] }).fields.find((f) => f.name === "seo");
    expect(field?.type).toBe("seo");
  });

  it("only singletons and media skip the review workflow", () => {
    const without = documentTypes.map((type) => type.name).filter((name) => !typesWithWorkflow.includes(name));
    expect(without.sort()).toEqual(["foundingOffer", "mediaAsset", "siteSettings"]);
    expect([...singletonTypes].sort()).toEqual(["foundingOffer", "siteSettings"]);
  });

  it("every document type runs the site copy rule", () => {
    for (const type of documentTypes) expect(typeof (type as { validation?: unknown }).validation, type.name).toBe("function");
  });

  it("seo object has title, description, canonical, ogImage and noindex", () => {
    expect(fieldsOf("seo")).toEqual(["title", "description", "canonical", "ogImage", "noindex"]);
  });

  it("workflow object has status, reviewer and notes", () => {
    expect(fieldsOf("workflow")).toEqual(["status", "reviewer", "notes"]);
  });
});

describe("mirrors the site content model", () => {
  it("offer has every field of Offer in content/pricing.ts", () => {
    const keys = typeKeys("pricing.ts", "Offer");
    expect(keys.length).toBeGreaterThan(15);
    expect(fieldsOf("offer")).toEqual(expect.arrayContaining(keys));
  });

  it("aiTeamMember has every field of TeamMember in content/team.ts", () => {
    const keys = typeKeys("team.ts", "TeamMember");
    expect(keys.length).toBeGreaterThan(10);
    expect(fieldsOf("aiTeamMember")).toEqual(expect.arrayContaining(keys));
  });

  it("blogPost covers the blog frontmatter", () => {
    // Frontmatter key to Studio field. seoTitle and description live in seo; status is the workflow.
    const map: Record<string, string> = { slug: "slug", title: "title", seoTitle: "seo", description: "seo", date: "publishedAt", updated: "updated", author: "author", services: "services", status: "workflow", draft: "draft" };
    const frontmatter = readFileSync(fileURLToPath(new URL("../../content/blog/speed-to-lead.md", import.meta.url)), "utf8").split("---")[1];
    const keys = [...frontmatter.matchAll(/^(\w+):/gm)].map((m) => m[1]);
    for (const key of keys) expect(map[key], `unmapped frontmatter key ${key}`).toBeDefined();
    expect(fieldsOf("blogPost")).toEqual(expect.arrayContaining([...Object.values(map), "body", "scheduledAt"]));
  });

  it("faq has question, answer, group and home flag", () => {
    expect(fieldsOf("faq")).toEqual(expect.arrayContaining(["question", "answer", "group", "home"]));
  });
});

describe("proof rules", () => {
  it("case studies follow the PROOF_PACK template and have no quote or rating fields", () => {
    const fields = fieldsOf("caseStudy");
    expect(fields).toEqual(expect.arrayContaining(["who", "before", "built", "changed", "videos", "foundersPastWork", "clientNamingApproved"]));
    expect(fields.filter((name) => /quote|rating|stars|review|testimonial/i.test(name))).toEqual([]);
  });

  it("testimonials need permission and carry a discount disclosure", () => {
    expect(fieldsOf("testimonial")).toEqual(expect.arrayContaining(["quote", "name", "role", "company", "permissionToPublish", "foundingClient", "discountDisclosure"]));
    expect(fieldsOf("testimonial").filter((name) => /rating|stars/i.test(name))).toEqual([]);
  });

  it("founding offer keeps a hand-set places counter", () => {
    expect(fieldsOf("foundingOffer")).toEqual(expect.arrayContaining(["placesTotal", "placesLeft", "open"]));
  });
});

describe("workflow gate", () => {
  it("defaults to draft", () => {
    expect(statusOf(undefined)).toBe("draft");
    expect(statusOf({})).toBe("draft");
  });

  it("allows publishing only once approved", () => {
    expect(canPublish({ workflow: { status: "draft" } })).toBe(false);
    expect(canPublish({ workflow: { status: "in_review" } })).toBe(false);
    expect(canPublish({ workflow: { status: "approved" } })).toBe(true);
    expect(canPublish({ workflow: { status: "published" } })).toBe(true);
  });
});
