import {
  createOrderTypeField,
  deleteOrderTypeField,
  getOrderTypeFields,
  updateOrderTypeField,
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

  const data = body as { fieldId?: string; required?: boolean };
  const fieldId = String(data.fieldId ?? "").trim();
  if (!fieldId) return apiError("VALIDATION_ERROR", "fieldId is required.");
  if (typeof data.required !== "boolean") {
    return apiError("VALIDATION_ERROR", "required must be a boolean.");
  }

  const field = await updateOrderTypeField(id, fieldId, { required: data.required });
  if (!field) return apiError("FIELD_NOT_FOUND", "Field not found.", 404);
  return apiSuccess(field);
}

export async function DELETE(
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

  const fieldId = String((body as { fieldId?: string }).fieldId ?? "").trim();
  if (!fieldId) return apiError("VALIDATION_ERROR", "fieldId is required.");

  const deleted = await deleteOrderTypeField(id, fieldId);
  if (!deleted) return apiError("FIELD_NOT_FOUND", "Field not found.", 404);
  return apiSuccess({ fieldId, deleted: true });
}
