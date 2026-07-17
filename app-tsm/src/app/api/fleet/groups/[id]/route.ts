import { getFleetGroup, updateFleetGroup, addFleetGroupMemberRecord } from "@/lib/fleet/places-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await getFleetGroup(id);
  if (!result) return apiError("GROUP_NOT_FOUND", "Fleet group not found.", 404);
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

  const data = body as { name?: string; zone?: string };
  const patch: { name?: string; zone?: string } = {};
  if (data.name != null) {
    const name = String(data.name).trim();
    if (!name) return apiError("VALIDATION_ERROR", "name cannot be empty.");
    patch.name = name;
  }
  if (data.zone != null) {
    patch.zone = String(data.zone).trim();
  }
  if (Object.keys(patch).length === 0) {
    return apiError("VALIDATION_ERROR", "Provide name or zone.");
  }

  const group = await updateFleetGroup(id, patch);
  if (!group) return apiError("GROUP_NOT_FOUND", "Fleet group not found.", 404);
  return apiSuccess(group);
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

  const data = body as { driver?: string; vehicle?: string };
  const driver = String(data.driver ?? "").trim();
  const vehicle = String(data.vehicle ?? "").trim();
  if (!driver || !vehicle) {
    return apiError("VALIDATION_ERROR", "driver and vehicle are required.");
  }

  const result = await addFleetGroupMemberRecord(id, { driver, vehicle });
  if (!result) return apiError("GROUP_NOT_FOUND", "Fleet group not found.", 404);
  return apiSuccess(result, { created: true });
}
