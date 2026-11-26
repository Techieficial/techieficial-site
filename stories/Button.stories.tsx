import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui";

/**
 * Link styled as a button. Primary is the solid accent (white text, 5.2:1); secondary is outlined; ghost is text only.
 * External, tel: and mailto: links render a plain anchor. Focus ring comes from the global :focus-visible style.
 */
const meta = {
  title: "Core/Button",
  component: Button,
  tags: ["autodocs"],
  args: { href: "/contact", children: "Book a strategy call" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "ghost"] },
    size: { control: "inline-radio", options: ["md", "lg"] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary", children: "Try the live demo" } };
export const Ghost: Story = { args: { variant: "ghost", children: "See all offers" } };
export const Large: Story = { args: { size: "lg" } };
export const ExternalLink: Story = { args: { href: "tel:+10000000000", variant: "secondary", children: "Call the AI", arrow: false } };
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button href="/contact">Primary</Button>
      <Button href="/demo" variant="secondary">
        Secondary
      </Button>
      <Button href="/offers" variant="ghost">
        Ghost
      </Button>
      <Button href="/contact" size="lg">
        Large primary
      </Button>
    </div>
  ),
};
