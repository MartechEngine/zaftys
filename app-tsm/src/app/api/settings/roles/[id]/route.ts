import { getOrgRole, patchOrgRole } from "@/lib/settings/roles-repository";
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
  const name = String((body as { name?: string }).name ?? "").trim();
  if (!name) return apiError("VALIDATION_ERROR", "name is required.");
  const role = await patchOrgRole(id, { name });
  if (!role) return apiError("ROLE_NOT_FOUND", "Role not found.", 404);
  return apiSuccess(role);
}
