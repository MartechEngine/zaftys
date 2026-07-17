import {
  createFaultReport,
  linkFaultWithWorkOrder,
  listFaultReports,
  updateFaultStatus,
  type FaultStatus,
} from "@/lib/maintenance/fault-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") ?? undefined;
  return apiSuccess(
    await listFaultReports({
      status: status as "open" | "linked" | "resolved" | "active" | undefined,
    }),
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as { vehicle?: string; driver?: string; issue?: string };
  const vehicle = String(data.vehicle ?? "").trim();
  const driver = String(data.driver ?? "").trim();
  const issue = String(data.issue ?? "").trim();

  if (!vehicle) return apiError("VALIDATION_ERROR", "vehicle is required.");
  if (!driver) return apiError("VALIDATION_ERROR", "driver is required.");
  if (!issue) return apiError("VALIDATION_ERROR", "issue is required.");

  const fault = await createFaultReport({ vehicle, driver, issue });
  return apiSuccess(fault, { created: true });
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as { id?: string; status?: string; createWorkOrder?: boolean };
  const id = String(data.id ?? "").trim();
  const status = String(data.status ?? "") as FaultStatus;
  const createWorkOrder = data.createWorkOrder === true;

  if (!id) return apiError("VALIDATION_ERROR", "id is required.");

  if (createWorkOrder || status === "linked") {
    const linked = await linkFaultWithWorkOrder(id);
    if (!linked) return apiError("FAULT_NOT_FOUND", "Fault report not found.", 404);
    return apiSuccess(linked);
  }

  if (!["open", "linked", "resolved"].includes(status)) {
    return apiError("VALIDATION_ERROR", "status must be open, linked, or resolved.");
  }

  const updated = await updateFaultStatus(id, status);
  if (!updated) return apiError("FAULT_NOT_FOUND", "Fault report not found.", 404);
  return apiSuccess(updated);
}
