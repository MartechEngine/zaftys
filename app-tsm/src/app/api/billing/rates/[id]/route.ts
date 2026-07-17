import { getServiceRate } from "@/lib/billing/rates-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await getServiceRate(id);
  if (!result) return apiError("RATE_NOT_FOUND", "Service rate not found.", 404);
  return apiSuccess(result);
}
