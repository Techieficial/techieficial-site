import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { LeadForm } from "@/components/forms/LeadForm";

/**
 * Every site form. Validates with zod on the client and again on the server (/api/lead).
 * Errors are linked to fields with aria-describedby and announced in an aria-live region.
 * In Storybook nothing is sent: submitting a valid form calls /api/lead, which does not exist here.
 */
const meta = {
  title: "Forms/Lead form",
  component: LeadForm,
  tags: ["autodocs"],
  args: { source: "contact", submitLabel: "Send", fields: ["name", "email", "phone", "businessType", "goal", "message"] },
} satisfies Meta<typeof LeadForm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = { args: { fields: ["name", "email"], compact: true, submitLabel: "Join", source: "newsletter" } };

/** Validation state: submit empty, then the required-field errors show. */
export const WithErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /send/i }));
    await expect(canvas.getAllByRole("textbox").some((el) => el.getAttribute("aria-invalid") === "true")).toBe(true);
  },
};
