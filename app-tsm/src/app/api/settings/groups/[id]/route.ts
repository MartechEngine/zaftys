import { getSettingsGroup, patchSettingsGroup } from "@/lib/settings/groups-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const group = await getSettingsGroup(id);
  if (!group) return apiError("GROUP_NOT_FOUND", "Group not found.", 404);
  return apiSuccess(group);
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
  const patch: { name?: string; policy?: string } = {};
  if (typeof data.name === "string" && data.name.trim()) patch.name = data.name.trim();
  if (typeof data.policy === "string" && data.policy.trim()) patch.policy = data.policy.trim();
  if (Object.keys(patch).length === 0) {
    return apiError("VALIDATION_ERROR", "Provide name or policy.");
  }
  const group = await patchSettingsGroup(id, patch);
  if (!group) return apiError("GROUP_NOT_FOUND", "Group not found.", 404);
  return apiSuccess(group);
}
