import { getOrderType, renameOrderType } from "@/lib/settings/order-types-repository";
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const name = String((body as { name?: string }).name ?? "").trim();
  if (!name) return apiError("VALIDATION_ERROR", "name is required.");

  const orderType = await renameOrderType(id, name);
  if (!orderType) return apiError("ORDER_TYPE_NOT_FOUND", "Order type not found.", 404);
  return apiSuccess(orderType);
}
