import {
  getWorkOrder,
  updateWorkOrderStatus,
  type WorkOrderStatus,
} from "@/lib/maintenance/work-order-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const workOrder = await getWorkOrder(id);
  if (!workOrder) return apiError("WORK_ORDER_NOT_FOUND", "Work order not found.", 404);
  return apiSuccess(workOrder);
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

  const status = String((body as { status?: string }).status ?? "") as WorkOrderStatus;
  if (!["open", "in_progress", "resolved"].includes(status)) {
    return apiError("VALIDATION_ERROR", "status must be open, in_progress, or resolved.");
  }

  const updated = await updateWorkOrderStatus(id, status);
  if (!updated) return apiError("WORK_ORDER_NOT_FOUND", "Work order not found.", 404);
  return apiSuccess(updated);
}
