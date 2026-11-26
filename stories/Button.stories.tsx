import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui";
import { siteConfig } from "@/site.config";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { href: siteConfig.cta.primary.href, children: siteConfig.cta.primary.label },
  argTypes: { variant: { control: "inline-radio", options: ["primary", "secondary", "ghost"] }, size: { control: "inline-radio", options: ["md", "lg"] } },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary", href: siteConfig.cta.demo.href, children: siteConfig.cta.demo.label, arrow: false } };
export const Ghost: Story = { args: { variant: "ghost", href: siteConfig.cta.demo.href, children: siteConfig.cta.demo.label } };
export const Large: Story = { args: { size: "lg" } };
