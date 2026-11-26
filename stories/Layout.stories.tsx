import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navbar, type NavMenu } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Logo, LogoMark } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { nav } from "@/content/pages";
import { liveHref, liveLinks } from "@/lib/nav";

const meta = { title: "Layout/Navigation", tags: ["autodocs"], parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

// Same menu the site builds in app/layout.tsx.
const menu: NavMenu = {
  teamHref: liveHref(nav.team) ?? "/services",
  cards: nav.team.cards.flatMap((c) => {
    const href = liveHref(c);
    return href ? [{ name: c.name, line: c.line, icon: c.icon, href }] : [];
  }),
  wholeTeam: (() => {
    const href = liveHref(nav.team.wholeTeam);
    return href ? { title: nav.team.wholeTeam.title, body: nav.team.wholeTeam.body, href } : null;
  })(),
  industries: liveLinks(nav.industries),
  services: liveLinks(nav.services),
  links: liveLinks(nav.links),
};

/** Sticky nav with the AI team mega-menu (hover, click, Escape closes) and a full-screen mobile sheet. */
export const Nav: Story = { render: () => <div style={{ minHeight: 520 }}><Navbar menu={menu} /></div> };
export const NavMobile: Story = { ...Nav, globals: { viewport: { value: "mobile1" } } };
export const SiteFooter: Story = { render: () => <Footer /> };
/** Current mark and wordmark. The final logo replaces these files when it arrives (content/_missing.md). */
export const Brand: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex items-center gap-8">
      <Logo />
      <LogoMark />
      <ThemeToggle />
    </div>
  ),
};
