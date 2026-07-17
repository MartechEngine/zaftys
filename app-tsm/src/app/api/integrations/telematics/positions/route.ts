import { getSession } from "@/lib/auth/session";
import { isCronAuthorized, isCronConfigured } from "@/lib/jobs/authorize-cron";
import { listLivePositions, upsertLivePosition } from "@/lib/map/live-positions";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

async function authorize(request: Request) {
  if (await getSession()) return true;
  if (isCronAuthorized(request)) return true;
  return false;
}

export async function GET(request: Request) {
  if (!(await authorize(request))) {
    return apiError("UNAUTHORIZED", "Sign in or cron Bearer required.", 401);
  }
  const rows = await listLivePositions();
  return apiSuccess(rows, { total: rows.length });
}

type PositionInput = {
  shipmentId?: string;
  orderId?: string;
  lat?: number;
  latitude?: number;
  lng?: number;
  lon?: number;
  longitude?: number;
  vehicleId?: string;
  source?: string;
};

function parseOne(raw: PositionInput):
  | { error: string }
  | {
      shipmentId: string;
      lat: number;
      lng: number;
      vehicleId?: string;
      source: string;
    } {
  const shipmentId = String(raw.shipmentId ?? raw.orderId ?? "").trim();
  const lat = Number(raw.lat ?? raw.latitude);
  const lng = Number(raw.lng ?? raw.lon ?? raw.longitude);
  if (!shipmentId) return { error: "shipmentId (or orderId) is required." };
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return { error: "lat and lng are required numbers." };
  }
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return { error: "lat/lng out of range." };
  }
  return {
    shipmentId,
    lat,
    lng,
    vehicleId: raw.vehicleId ? String(raw.vehicleId) : undefined,
    source: raw.source ? String(raw.source) : "telematics",
  };
}

/**
 * Ingest live GPS from Traccar / telematics providers.
 * Auth: session cookie or `Authorization: Bearer <TSM_CRON_SECRET>`.
 */
export async function POST(request: Request) {
  if (!(await authorize(request))) {
    return apiError(
      "UNAUTHORIZED",
      isCronConfigured()
        ? "Sign in or provide Authorization: Bearer <TSM_CRON_SECRET>."
        : "Sign in required. Set TSM_CRON_SECRET for webhook ingest.",
      401,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const rows = Array.isArray(body)
    ? body
    : Array.isArray((body as { positions?: unknown })?.positions)
      ? (body as { positions: unknown[] }).positions
      : [body];

  const saved = [];
  const errors: string[] = [];

  for (const row of rows) {
    if (!row || typeof row !== "object") {
      errors.push("Invalid position row.");
      continue;
    }
    const parsed = parseOne(row as PositionInput);
    if ("error" in parsed) {
      errors.push(parsed.error);
      continue;
    }
    saved.push(await upsertLivePosition(parsed));
  }

  if (saved.length === 0) {
    return apiError("VALIDATION_ERROR", errors[0] ?? "No valid positions.", 400);
  }

  return apiSuccess(
    { positions: saved, errors },
    { created: saved.length, errorCount: errors.length },
  );
}
