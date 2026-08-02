import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import {
  getOrgAccountForSession,
  saveOrgAccount,
} from "@/lib/tsm/org-repository";
import { canPublishToTranzfort, toTsmSeatRole } from "@/lib/tsm/org";
import {
  getBridgeMode,
  getRemoteTsmOrgSupplierLink,
  isBridgeLiveConfigured,
} from "@/lib/tsm/bridge-rpc";
import { listPublishAudit } from "@/lib/tsm/publish-audit-store";
import { ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";

/** Current TSM org account + bridge readiness (auth-lite). */
export async function GET() {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  await ensureTsmOrgHydrated();
  const org = await getOrgAccountForSession(session);
  const mode = getBridgeMode();

  const linked = Boolean(org.tranzfortSupplierId);
  const liveConfigured = isBridgeLiveConfigured();
  let remoteLink: Awaited<ReturnType<typeof getRemoteTsmOrgSupplierLink>> = null;
  let remoteLinkError: string | null = null;
  if (mode === "live" && liveConfigured) {
    try {
      remoteLink = await getRemoteTsmOrgSupplierLink(org.id);
    } catch (error) {
      remoteLinkError = error instanceof Error ? error.message : "remote_link_check_failed";
    }
  }
  const supplierMatches =
    Boolean(remoteLink && org.tranzfortSupplierId) &&
    remoteLink!.supplierId.toLowerCase() === org.tranzfortSupplierId!.toLowerCase();
  const liveLinked = mode === "live" && liveConfigured && supplierMatches;

  return apiSuccess({
    org,
    bridge: {
      mode,
      liveConfigured,
      linked,
      /** True only when the authoritative TZ map row exists and matches local intent. */
      liveLinked,
      linkStatus:
        mode !== "live"
          ? linked
            ? "mock_local"
            : "unlinked"
          : remoteLinkError
            ? "check_failed"
            : liveLinked
              ? "verified"
              : remoteLink
                ? "supplier_mismatch"
                : linked
                  ? "local_only"
                  : "unlinked",
      remoteLinkError,
      supplierIdMasked: org.tranzfortSupplierId
        ? `${org.tranzfortSupplierId.slice(0, 8)}…${org.tranzfortSupplierId.slice(-4)}`
        : null,
    },
  seat: {
      userId: session.id,
      role: session.role,
      tsmRole: toTsmSeatRole(session.role),
      canPublish:
        session.canPublishToTranzfort === false
          ? false
          : canPublishToTranzfort(session.role),
      authSource: session.authSource ?? "auth_lite",
      supplierId: session.supplierId,
      verificationStatus: session.verificationStatus,
    },
    recentAudit: listPublishAudit(10),
  });
}

/** Update TSM company fields (auth-lite). */
export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);
  if (!canPublishToTranzfort(session.role)) {
    return apiError("FORBIDDEN", "Your role cannot edit the TSM company account.", 403);
  }

  await ensureTsmOrgHydrated();
  await getOrgAccountForSession(session);

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return apiError("INVALID_JSON", "Body must be JSON.");
  }

  const next = await saveOrgAccount({
    legalName: body.legalName != null ? String(body.legalName) : undefined,
    tradeName: body.tradeName != null ? String(body.tradeName) : undefined,
    gstin: body.gstin != null ? String(body.gstin) : undefined,
    mainContactName:
      body.mainContactName != null ? String(body.mainContactName) : undefined,
    superLoadAutoPolicy:
      body.superLoadAutoPolicy === "manual"
        ? "manual"
        : body.superLoadAutoPolicy === "paid_tsm_auto_activate"
          ? "paid_tsm_auto_activate"
          : undefined,
  });

  return apiSuccess(next);
}
