import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CTABand, FAQAccordion } from "@/components/blocks";
import { DemoTabs } from "@/components/DemoTabs";
import { GrowthWheel, type WheelService } from "@/components/GrowthWheel";
import { MissedCallCalculator } from "@/components/MissedCallCalculator";
import { homeFaqs } from "@/content/faq";
import { growthAddOns, team, teamCopy, teamUrl } from "@/content/team";
import { siteConfig } from "@/site.config";

const meta = { title: "Core/Interactive", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/** Native details/summary accordion; keyboard works by default. Outputs FAQPage JSON-LD unless schema={false}. */
export const Accordion: Story = { render: () => <FAQAccordion items={homeFaqs.slice(0, 4)} schema={false} /> };

/** Tabs with roving focus and arrow keys; the URL hash selects a tab on the Demo Lab. */
export const Tabs: Story = {
  render: () => (
    <DemoTabs
      label="Demo Lab"
      tabs={[
        { id: "live", label: "Try it live", content: <p>Tab one content.</p> },
        { id: "watch", label: "Watch it work", content: <p>Tab two content.</p> },
        { id: "book", label: "Book a test build", content: <p>Tab three content.</p> },
      ]}
    />
  ),
};

/** Hero wheel: hover, click, arrow keys; no motion with prefers-reduced-motion; chips under 768px. Same data as the homepage. */
export const Wheel: Story = {
  render: () => {
    const shades = Object.values(siteConfig.serviceColors);
    const services: WheelService[] = [
      ...team.map((m, i) => ({
        slug: m.slug,
        name: m.name,
        navName: m.short,
        outcome: m.line,
        highlights: m.cardSkills,
        url: teamUrl(m.slug),
        icon: m.icon,
        color: shades[i],
        linkLabel: teamCopy.viewProfile,
      })),
      {
        slug: "growth-add-ons",
        name: growthAddOns.name,
        navName: growthAddOns.short,
        outcome: growthAddOns.line,
        highlights: growthAddOns.skills,
        url: growthAddOns.href,
        icon: growthAddOns.icon,
        color: shades[4],
        linkLabel: growthAddOns.linkLabel,
      },
    ];
    return <GrowthWheel services={services} label={teamCopy.wheelLabel} hubLabel={teamCopy.hub} />;
  },
};

export const Calculator: Story = { render: () => <MissedCallCalculator /> };

export const CallToAction: Story = {
  parameters: { layout: "fullscreen" },
  render: () => <CTABand title="Ready to hire your AI team?" body="Book a 30-minute strategy call." />,
};
