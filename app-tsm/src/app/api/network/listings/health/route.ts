import { getOutboundExchangeHealth } from "@/lib/network/load-exchange/client";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(getOutboundExchangeHealth());
}
