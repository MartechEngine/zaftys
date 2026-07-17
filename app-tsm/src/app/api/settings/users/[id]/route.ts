import { getOrgUser, patchOrgUser } from "@/lib/settings/users-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await getOrgUser(id);
  if (!user) return apiError("USER_NOT_FOUND", "User not found.", 404);
  return apiSuccess(user);
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

  const data = (body ?? {}) as Record<string, unknown>;
  const patch: { status?: "active" | "pending"; role?: string } = {};
  if (data.status === "active" || data.status === "pending") patch.status = data.status;
  if (typeof data.role === "string" && data.role.trim()) patch.role = data.role.trim();
  if (data.activate === true) patch.status = "active";

  if (Object.keys(patch).length === 0) {
    return apiError("VALIDATION_ERROR", "Provide status, activate, or role.");
  }

  const user = await patchOrgUser(id, patch);
  if (!user) return apiError("USER_NOT_FOUND", "User not found.", 404);
  return apiSuccess(user);
}
