import {
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

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as { id?: string; status?: string };
  const id = String(data.id ?? "").trim();
  const status = String(data.status ?? "") as FaultStatus;

  if (!id) return apiError("VALIDATION_ERROR", "id is required.");
  if (!["open", "linked", "resolved"].includes(status)) {
    return apiError("VALIDATION_ERROR", "status must be open, linked, or resolved.");
  }

  const updated = await updateFaultStatus(id, status);
  if (!updated) return apiError("FAULT_NOT_FOUND", "Fault report not found.", 404);
  return apiSuccess(updated);
}
