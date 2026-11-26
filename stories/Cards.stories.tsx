import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CTABand, FAQAccordion, PricingCard, ServiceCard } from "@/components/blocks";
import { getServices } from "@/lib/content";
import { featuredOffers } from "@/content/pricing";
import { faqGroups } from "@/content/faq";
import { siteConfig } from "@/site.config";

const meta = { title: "Components/Cards", parameters: { layout: "padded" } } satisfies Meta;
export default meta;

export const ServiceCards: StoryObj = {
  render: () => (
    <div className="grid gap-5 md:grid-cols-3">
      {getServices().map((s) => (
        <ServiceCard key={s.slug} service={s} />
      ))}
    </div>
  ),
};
export const ServiceCardLarge: StoryObj = { render: () => <div className="max-w-md"><ServiceCard service={getServices()[0]} size="lg" /></div> };
export const PricingCards: StoryObj = {
  render: () => (
    <div className="grid gap-5 lg:grid-cols-3">
      {featuredOffers.map((o) => (
        <PricingCard key={o.slug} offer={o} />
      ))}
    </div>
  ),
};
export const FAQ: StoryObj = { render: () => <FAQAccordion items={faqGroups[0].items.slice(0, 4)} schema={false} /> };
export const CTA: StoryObj = { render: () => <CTABand title={siteConfig.cta.primary.label} body={siteConfig.mission} /> };
