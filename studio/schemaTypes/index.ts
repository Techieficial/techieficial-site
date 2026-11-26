import { aiTeamMember } from "./documents/aiTeamMember";
import { blogPost } from "./documents/blogPost";
import { caseStudy } from "./documents/caseStudy";
import { industry } from "./documents/industry";
import { faq, foundingOffer, mediaAsset, siteSettings } from "./documents/misc";
import { offer } from "./documents/offer";
import { page } from "./documents/page";
import { service } from "./documents/service";
import { testimonial } from "./documents/testimonial";
import { cta } from "./objects/cta";
import { seo } from "./objects/seo";
import { card, qa, richText } from "./objects/shared";
import { workflow } from "./objects/workflow";

export const objectTypes = [seo, cta, workflow, card, qa, richText];

export const documentTypes = [page, service, industry, offer, aiTeamMember, blogPost, caseStudy, testimonial, faq, mediaAsset, foundingOffer, siteSettings];

export const schemaTypes = [...objectTypes, ...documentTypes];

/** One document each, edited from the Settings and Offers groups. */
export const singletonTypes = new Set(["siteSettings", "foundingOffer"]);

/** Document types with their own URL on the site, so they carry the SEO object. */
export const typesWithSeo = ["page", "service", "industry", "offer", "aiTeamMember", "blogPost", "caseStudy", "siteSettings"];

/** Document types that go through draft, review, approve, publish. */
export const typesWithWorkflow = documentTypes.filter((type) => type.fields.some((field) => field.name === "workflow")).map((type) => type.name);
