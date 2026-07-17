import { getOrderTypeFlow, updateOrderTypeFlow } from "@/lib/settings/order-types-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await getOrderTypeFlow(id);
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

  const data = body as Record<string, unknown>;
  let steps: string[] = [];
  if (Array.isArray(data.steps)) {
    steps = data.steps.map((s) => String(s).trim()).filter(Boolean);
  } else if (typeof data.statusFlow === "string") {
    steps = data.statusFlow.split(/\s*→\s*|\s*>\s*|\s*,\s*/).map((s) => s.trim()).filter(Boolean);
  }

  if (steps.length === 0) {
    return apiError("VALIDATION_ERROR", "Provide steps[] or statusFlow string.");
  }

  const result = await updateOrderTypeFlow(id, steps);
  if (!result) return apiError("ORDER_TYPE_NOT_FOUND", "Order type not found.", 404);
  if ("error" in result) return apiError("VALIDATION_ERROR", result.error);
  return apiSuccess(result);
}
