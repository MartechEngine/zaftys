import { getShipment, updateShipmentStatus } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";
import { parseStatusPatch, validateStatusTransition } from "@/lib/shipments/update-shipment";
import type { ShipmentStatus } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  if (!body || typeof body !== "object") {
    return apiError("INVALID_BODY", "Body must be an object.");
  }

  const data = body as Record<string, unknown>;
  const ids = Array.isArray(data.ids)
    ? data.ids.map((id) => String(id).trim()).filter(Boolean)
    : [];
  const statusPatch = parseStatusPatch({ status: data.status });

  if (ids.length === 0) {
    return apiError("VALIDATION_ERROR", "ids must be a non-empty array.");
  }
  if (!statusPatch) {
    return apiError("VALIDATION_ERROR", "status is required.");
  }

  const updated: string[] = [];
  const skipped: { id: string; reason: string }[] = [];

  for (const id of ids) {
    const existing = await getShipment(id);
    if (!existing) {
      skipped.push({ id, reason: "not found" });
      continue;
    }
    const transitionErr = validateStatusTransition(
      existing.status,
      statusPatch.status as ShipmentStatus,
    );
    if (transitionErr) {
      skipped.push({ id, reason: transitionErr });
      continue;
    }
    try {
      const shipment = await updateShipmentStatus(id, statusPatch.status);
      if (!shipment) {
        skipped.push({ id, reason: "update failed" });
        continue;
      }
      updated.push(id);
    } catch (e) {
      skipped.push({
        id,
        reason: e instanceof Error ? e.message : "update failed",
      });
    }
  }

  return apiSuccess({
    status: statusPatch.status,
    updated,
    skipped,
    updatedCount: updated.length,
    skippedCount: skipped.length,
  });
}
