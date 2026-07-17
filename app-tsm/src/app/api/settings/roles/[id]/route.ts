import {
  deleteOrgRoleById,
  getOrgRole,
  patchOrgRole,
  updateRolePermissions,
} from "@/lib/settings/roles-repository";
import { ROLE_PERMISSION_MODULES } from "@/lib/mutations/sprint16-store";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const role = await getOrgRole(id);
  if (!role) return apiError("ROLE_NOT_FOUND", "Role not found.", 404);
  return apiSuccess(role);
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
  const name = String(data.name ?? "").trim();
  const permissions =
    data.permissions && typeof data.permissions === "object"
      ? (data.permissions as Record<string, boolean>)
      : undefined;

  if (permissions) {
    const patch: Record<string, boolean> = {};
    for (const key of ROLE_PERMISSION_MODULES) {
      if (typeof permissions[key] === "boolean") patch[key] = permissions[key];
    }
    if (Object.keys(patch).length === 0) {
      return apiError("VALIDATION_ERROR", "Provide at least one permission flag.");
    }
    const role = await updateRolePermissions(id, patch);
    if (!role) return apiError("ROLE_NOT_FOUND", "Role not found.", 404);
    return apiSuccess(role);
  }

  if (!name) return apiError("VALIDATION_ERROR", "name or permissions is required.");
  const role = await patchOrgRole(id, { name });
  if (!role) return apiError("ROLE_NOT_FOUND", "Role not found.", 404);
  return apiSuccess(role);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await deleteOrgRoleById(id);
  if (result === "not_found") return apiError("ROLE_NOT_FOUND", "Role not found.", 404);
  if (result === "system") {
    return apiError("FORBIDDEN", "System roles cannot be deleted.", 403);
  }
  return apiSuccess({ id, deleted: true });
}
