import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeader, Tag } from "@/components/ui";
import { Breadcrumbs, TrustLine } from "@/components/blocks";
import { siteConfig } from "@/site.config";

const meta = { title: "Components/Layout", parameters: { layout: "padded" } } satisfies Meta;
export default meta;

export const SectionHeaderLeft: StoryObj = { render: () => <SectionHeader title={siteConfig.name} intro={siteConfig.mission} /> };
export const SectionHeaderCentered: StoryObj = { render: () => <SectionHeader align="center" title={siteConfig.name} intro={siteConfig.mission} /> };
export const TagChip: StoryObj = { render: () => <Tag>{siteConfig.countries[0]}</Tag> };
export const Crumbs: StoryObj = { render: () => <Breadcrumbs items={[{ name: "AI team", path: "/ai-team" }]} /> };
export const Trust: StoryObj = { render: () => <TrustLine lead="Clients in" items={siteConfig.countries} /> };
