import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeader, Tag } from "@/components/ui";
import { Breadcrumbs, PageHero, TrustLine } from "@/components/blocks";
import { siteConfig } from "@/site.config";

const meta = { title: "Core/Headers and labels", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/** Section heading with optional intro. One H1 per page: use as="h1" only in a page hero. */
export const SectionHeaderLeft: Story = {
  render: () => <SectionHeader title="Meet your AI team" intro="Four AI employees that answer, follow up and ask for reviews." />,
};
export const SectionHeaderCentred: Story = {
  render: () => (
    <SectionHeader
      align="center"
      title={
        <>
          Hire your <span className="text-electric">AI team</span>
        </>
      }
      intro="The one-colour blend is for a single key word only."
    />
  ),
};
/** Pill label with a dot in the accent or a service shade. */
export const Tags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Tag>AI growth agency</Tag>
      {Object.entries(siteConfig.serviceColors).map(([slug, color]) => (
        <Tag key={slug} color={color}>
          {slug}
        </Tag>
      ))}
    </div>
  ),
};
/** Breadcrumb trail; also outputs BreadcrumbList JSON-LD. */
export const BreadcrumbTrail: Story = {
  render: () => <Breadcrumbs items={[{ name: "AI team", path: "/ai-team" }, { name: "AI Receptionist", path: "/ai-team/receptionist" }]} />,
};
export const InnerPageHero: Story = {
  parameters: { layout: "fullscreen" },
  render: () => <PageHero title="Contact" intro="Book a strategy call or send a message." crumbs={[{ name: "Contact", path: "/contact" }]} />,
};
export const Trust: Story = { render: () => <TrustLine lead="Clients in" items={siteConfig.countries} /> };
