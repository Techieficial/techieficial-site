import { handleLead } from "@/lib/leadHandler";

/** Demo Lab "Have it call me": sent to the call-me webhook (CRM_CALLME_WEBHOOK_URL). */
export function POST(request: Request) {
  return handleLead(request, "callme");
}
