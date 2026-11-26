/**
 * Missed-call calculator (docs/SITE_CONTENT_V3.md 2.8):
 * monthly lost revenue = calls per week x 4.3 x missed % x booking % x average job value.
 * Percentages are capped at 100. Returns 0 until every input is a finite number of 0 or more.
 */
export const WEEKS_PER_MONTH = 4.3;

export type CalculatorInput = { calls: number; missed: number; booking: number; jobValue: number };

export function monthlyLostRevenue(v: CalculatorInput): number {
  const values = [v.calls, v.missed, v.booking, v.jobValue];
  if (!values.every((n) => Number.isFinite(n) && n >= 0)) return 0;
  return v.calls * WEEKS_PER_MONTH * (Math.min(v.missed, 100) / 100) * (Math.min(v.booking, 100) / 100) * v.jobValue;
}
