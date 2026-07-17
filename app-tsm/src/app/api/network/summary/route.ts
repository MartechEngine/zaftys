import { getNetworkSummary } from "@/lib/network/partners-repository";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getNetworkSummary());
}
