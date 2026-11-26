import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyCard, PricingCard, ServiceCard } from "@/components/blocks";
import { TeamCards } from "@/components/team";
import { CardGrid, StepList } from "@/components/StepList";
import { featuredOffers, offers } from "@/content/pricing";
import { getServices, type CaseStudy } from "@/lib/content";

const meta = { title: "Core/Cards", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/** Real service data from content/services. */
export const Services: Story = {
  render: () => (
    <div className="grid gap-5 md:grid-cols-3">
      {getServices()
        .slice(0, 3)
        .map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
    </div>
  ),
};
export const ServiceLarge: Story = { render: () => <ServiceCard service={getServices()[0]} size="lg" /> };

/** Real offers from content/pricing.ts (prices are DRAFT until the owner confirms). */
export const Pricing: Story = {
  render: () => (
    <div className="grid gap-5 lg:grid-cols-3">
      {featuredOffers.map((o) => (
        <PricingCard key={o.slug} offer={o} />
      ))}
    </div>
  ),
};
export const PricingCompact: Story = { render: () => <div className="max-w-sm"><PricingCard offer={offers[offers.length - 1]} compact /></div> };

/** The 4 AI employee cards from content/team.ts. */
export const Team: Story = { render: () => <TeamCards /> };

/**
 * No case study is published yet, so this story uses clearly fictional sample data to show the layout.
 * It never reaches the site: the Work pages stay hidden until real data exists.
 */
const sample = {
  slug: "storybook-sample",
  url: "/work",
  title: "Storybook sample: layout preview only",
  client: "Sample",
  industry: "Sample industry",
  country: "Sample country",
  results: [
    { value: "00", label: "Sample metric one" },
    { value: "00", label: "Sample metric two" },
  ],
} as unknown as CaseStudy;
export const CaseStudy_: Story = { name: "Case study (sample data)", render: () => <div className="max-w-md"><CaseStudyCard study={sample} /></div> };

export const Steps: Story = {
  render: () => (
    <StepList
      steps={[
        { title: "Audit", body: "We map where leads leak today." },
        { title: "Build", body: "We set up your AI team in your CRM." },
        { title: "Launch", body: "Live in 10 to 14 days." },
      ]}
    />
  ),
};
export const Grid: Story = {
  render: () => (
    <CardGrid
      items={[
        { title: "Answers every call", body: "24/7, in your business name." },
        { title: "Replies in under a minute", body: "Every web lead gets a fast first reply." },
        { title: "Asks for reviews", body: "After every finished job." },
      ]}
    />
  ),
};
