import { handleLead } from "@/lib/leadHandler";

/** Every site form posts here (except Demo Lab "call me", which uses /api/callme). */
export function POST(request: Request) {
  return handleLead(request, "lead");
}
