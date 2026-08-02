import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getAuthUserByEmail } from "@/lib/auth/auth-users-store";
import { ensureAuthUsersHydrated, ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { listOrgUsers } from "@/lib/settings/users-repository";
import { TenancyError, tenancyHttpStatus } from "@/lib/tsm/tenancy";

/**
 * Support lookup: email → seat / org / supplier (Admin only).
 * Does not invent org from empty sessions.
 */
export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);
  if (session.role !== "admin") {
    return apiError("FORBIDDEN", "Admin only.", 403);
  }

  const email = new URL(req.url).searchParams.get("email")?.trim().toLowerCase();
  if (!email) return apiError("VALIDATION", "Query email is required.", 400);

  await ensureAuthUsersHydrated();
  await ensureTsmOrgHydrated();

  const auth = getAuthUserByEmail(email);
  const orgUsers = await listOrgUsers(undefined, session.tsmOrgId);
  const pending = orgUsers.find((u) => u.email.toLowerCase() === email);

  let callerOrg: { id: string; tradeName: string; supplierId?: string } | null =
    null;
  try {
    const org = await getOrgAccountForSession(session);
    callerOrg = {
      id: org.id,
      tradeName: org.tradeName,
      supplierId: org.tranzfortSupplierId,
    };
  } catch (e) {
    if (e instanceof TenancyError) {
      return apiError(e.code, e.message, tenancyHttpStatus(e.code));
    }
    throw e;
  }

  const targetOrgId = auth?.tsmOrgId || pending?.tsmOrgId || null;
  let targetOrg: { id: string; tradeName: string; supplierId?: string } | null =
    null;
  if (targetOrgId) {
    try {
      const org = await getOrgAccountForSession({ tsmOrgId: targetOrgId });
      targetOrg = {
        id: org.id,
        tradeName: org.tradeName,
        supplierId: org.tranzfortSupplierId,
      };
    } catch {
      targetOrg = { id: targetOrgId, tradeName: "(not hydrated)" };
    }
  }

  return apiSuccess({
    email,
    authUser: auth
      ? {
          id: auth.id,
          role: auth.role,
          status: auth.status,
          tsmOrgId: auth.tsmOrgId,
          authSource: auth.authSource,
        }
      : null,
    pendingInvite: pending
      ? { id: pending.id, status: pending.status, tsmOrgId: pending.tsmOrgId }
      : null,
    targetOrg,
    callerOrg,
    sameOrgAsCaller: Boolean(
      targetOrg && callerOrg && targetOrg.id === callerOrg.id,
    ),
  });
}
