import { getSession } from "@/lib/auth/session";
import { getOrgUser, patchOrgUser } from "@/lib/settings/users-repository";
import { apiError, apiSuccess } from "@/lib/api-response";
import {
  canManageSeats,
  countActiveAdminSeats,
  isAdminRoleLabel,
  mapInviteRoleToPortalRole,
} from "@/lib/auth/seats";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { upsertAuthUser, getAuthUserByEmail } from "@/lib/auth/auth-users-store";
import { persistAuthUser, ensureAuthUsersHydrated } from "@/lib/db/domain-persistence";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);
  const { id } = await params;
  const user = await getOrgUser(id);
  if (!user) return apiError("USER_NOT_FOUND", "User not found.", 404);
  return apiSuccess(user);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);
  if (!canManageSeats(session.role)) {
    return apiError("FORBIDDEN", "Only company admins can manage seats.", 403);
  }

  await ensureAuthUsersHydrated();
  const org = await getOrgAccountForSession(session);
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
  if (data.promoteToAdmin === true) patch.role = "Admin";
  if (data.activate === true) {
    return apiError(
      "VALIDATION_ERROR",
      "Seats activate by accepting the invite link (set password). Do not force-activate.",
      400,
    );
  }
  if (data.status === "pending" || data.deactivate === true) {
    patch.status = "pending";
  }

  if (Object.keys(patch).length === 0) {
    return apiError("VALIDATION_ERROR", "Provide status, role, or promoteToAdmin.");
  }

  const existing = await getOrgUser(id);
  if (!existing) return apiError("USER_NOT_FOUND", "User not found.", 404);
  if (existing.tsmOrgId && existing.tsmOrgId !== org.id) {
    return apiError("FORBIDDEN", "Seat belongs to another company.", 403);
  }

  const auth = getAuthUserByEmail(existing.email);
  const wasAdmin =
    (auth?.status === "active" && auth.role === "admin") ||
    (existing.status === "active" && isAdminRoleLabel(existing.role));
  const adminCount = countActiveAdminSeats(org.id);

  // Block deactivating the last seat admin
  if (patch.status === "pending" && wasAdmin && adminCount <= 1) {
    return apiError(
      "LAST_ADMIN",
      "Cannot deactivate the last company admin seat. Promote another seat to Admin first.",
      400,
    );
  }

  // Block demoting the last seat admin
  if (
    patch.role &&
    wasAdmin &&
    !isAdminRoleLabel(patch.role) &&
    adminCount <= 1
  ) {
    return apiError(
      "LAST_ADMIN",
      "Cannot demote the last company admin seat. Promote another seat to Admin first.",
      400,
    );
  }

  const user = await patchOrgUser(id, patch);
  if (!user) return apiError("USER_NOT_FOUND", "User not found.", 404);

  // Soft-disable matching login when deactivated
  if (patch.status === "pending") {
    if (auth) {
      const disabled = upsertAuthUser({
        ...auth,
        status: "disabled",
        tsmOrgId: auth.tsmOrgId ?? org.id,
        orgUserId: auth.orgUserId ?? user.id,
        supplierId: auth.supplierId ?? org.tranzfortSupplierId,
        authSource: auth.authSource ?? "seat",
      });
      await persistAuthUser(disabled);
    }
  } else if (auth && auth.status === "active") {
    // Keep login role in sync with seat role label
    const portalRole = mapInviteRoleToPortalRole(user.role);
    const synced = upsertAuthUser({
      ...auth,
      role: portalRole,
      name: user.name,
      tsmOrgId: auth.tsmOrgId ?? org.id,
      orgUserId: auth.orgUserId ?? user.id,
      supplierId: auth.supplierId ?? org.tranzfortSupplierId,
      authSource: "seat",
      status: "active",
    });
    await persistAuthUser(synced);
  } else if (!auth && user.status === "active" && patch.role) {
    // Role-only change before accept — org row only; login created on invite accept
  }

  return apiSuccess({
    ...user,
    portalRole: mapInviteRoleToPortalRole(user.role),
    adminSeats: countActiveAdminSeats(org.id),
  });
}
