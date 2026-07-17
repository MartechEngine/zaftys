import { getOrderType } from "@/lib/settings/order-types-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await getOrderType(id);
  if (!result) return apiError("ORDER_TYPE_NOT_FOUND", "Order type not found.", 404);
  return apiSuccess(result);
}
