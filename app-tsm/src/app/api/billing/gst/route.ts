import { getGstSummary } from "@/lib/billing/rates-repository";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getGstSummary());
}
