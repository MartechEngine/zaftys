import {
  createOrderTypeField,
  getOrderTypeFields,
  validateCreateOrderFieldInput,
} from "@/lib/settings/order-types-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await getOrderTypeFields(id);
  if (!result) return apiError("ORDER_TYPE_NOT_FOUND", "Order type not found.", 404);
  return apiSuccess(result);
}

export async function POST(
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

  const parsed = validateCreateOrderFieldInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const result = await createOrderTypeField(id, parsed);
  if (!result) return apiError("ORDER_TYPE_NOT_FOUND", "Order type not found.", 404);
  return apiSuccess(result.field, { created: true });
}
