import { describe, expect, it } from "vitest";
import { monthlyLostRevenue, WEEKS_PER_MONTH } from "@/lib/calculator";

describe("monthlyLostRevenue", () => {
  it("applies calls x 4.3 x missed% x booking% x job value", () => {
    expect(monthlyLostRevenue({ calls: 100, missed: 20, booking: 50, jobValue: 400 })).toBeCloseTo(100 * WEEKS_PER_MONTH * 0.2 * 0.5 * 400);
  });
  it("caps percentages at 100", () => {
    expect(monthlyLostRevenue({ calls: 10, missed: 250, booking: 400, jobValue: 100 })).toBeCloseTo(10 * WEEKS_PER_MONTH * 100);
  });
  it("returns 0 for negative or non-numeric input", () => {
    expect(monthlyLostRevenue({ calls: -1, missed: 20, booking: 50, jobValue: 400 })).toBe(0);
    expect(monthlyLostRevenue({ calls: Number.NaN, missed: 20, booking: 50, jobValue: 400 })).toBe(0);
    expect(monthlyLostRevenue({ calls: Infinity, missed: 20, booking: 50, jobValue: 400 })).toBe(0);
  });
  it("is 0 when nothing is missed", () => {
    expect(monthlyLostRevenue({ calls: 100, missed: 0, booking: 50, jobValue: 400 })).toBe(0);
  });
});
