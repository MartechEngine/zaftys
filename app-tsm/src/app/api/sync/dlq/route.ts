import {
  dismissSyncDlq,
  enqueueSyncFailure,
  listSyncDlq,
  processDueSyncRetries,
  retrySyncDlq,
} from "@/lib/sync/dlq";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") as
    | "open"
    | "retrying"
    | "dismissed"
    | "resolved"
    | null;
  const rows = await listSyncDlq(status ?? undefined);
  return apiSuccess(rows, { total: rows.length });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const action = String(data.action ?? "enqueue");

  if (action === "process") {
    return apiSuccess(await processDueSyncRetries());
  }

  if (action === "enqueue") {
    const entityType = String(data.entityType ?? "integration").trim();
    const entityId = String(data.entityId ?? "unknown").trim();
    const operation = String(data.operation ?? "sync").trim();
    const error = String(data.error ?? "Unknown sync failure").trim();
    if (!error) return apiError("VALIDATION_ERROR", "error is required.");
    const entry = await enqueueSyncFailure({ entityType, entityId, operation, error });
    return apiSuccess(entry, { created: true });
  }

  return apiError("VALIDATION_ERROR", "Unknown action. Use enqueue or process.");
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const id = String(data.id ?? "").trim();
  const action = String(data.action ?? "retry");
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");

  if (action === "dismiss") {
    const row = await dismissSyncDlq(id);
    if (!row) return apiError("NOT_FOUND", "DLQ entry not found.", 404);
    return apiSuccess(row);
  }

  const row = await retrySyncDlq(id);
  if (!row) return apiError("NOT_FOUND", "DLQ entry not found.", 404);
  return apiSuccess(row);
}
