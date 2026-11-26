/** Rate limits per client IP. ttl is in milliseconds. */
export const RATE_LIMITS = {
  /** Every route unless it sets its own. */
  default: { limit: 120, ttl: 60_000 },
  /** Same as the site's /api/lead: 8 per 10 minutes. */
  leads: { limit: 8, ttl: 10 * 60_000 },
  assistant: { limit: 20, ttl: 60_000 },
  portal: { limit: 60, ttl: 60_000 },
} as const;
