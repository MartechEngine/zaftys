import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { canPublishToTranzfort, toTsmSeatRole } from "@/lib/tsm/org";
import { getOrgAccountForSession, saveOrgAccount } from "@/lib/tsm/org-repository";
import {
  ensureRemoteTsmOrgSupplierLink,
  getBridgeMode,
  isBridgeLiveConfigured,
} from "@/lib/tsm/bridge-rpc";

/**
 * Link TSM org → TranZfort supplier (service_role RPC when live).
 * Body: { supplierId, companyName?, mainContactName?, autoPolicy?, dailyPostLimit?, notes? }
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);
  if (!canPublishToTranzfort(session.role)) {
    return apiError("FORBIDDEN", "Your role cannot link TranZfort suppliers.", 403);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return apiError("INVALID_JSON", "Body must be JSON.");
  }

  const supplierId = String(body.supplierId ?? "").trim();
  if (!supplierId) {
    return apiError("VALIDATION", "supplierId is required (TranZfort profiles.id).");
  }

  const org = await getOrgAccountForSession(session);
  const companyName = String(body.companyName ?? org.tradeName ?? org.legalName).trim();
  const mainContactName = String(
    body.mainContactName ?? org.mainContactName,
  ).trim();
  const autoPolicy =
    String(body.autoPolicy ?? org.superLoadAutoPolicy) === "manual"
      ? ("manual" as const)
      : ("paid_tsm_auto_activate" as const);

  const mode = getBridgeMode();
  if (mode === "mock") {
    const next = await saveOrgAccount({
      tranzfortSupplierId: supplierId,
      tradeName: companyName,
      mainContactName,
      superLoadAutoPolicy: autoPolicy,
    });
    return apiSuccess({
      supplierId,
      orgId: next.id,
      mode: "mock",
      message: "Mock link stored on TSM org. Set TSM_TRANZFORT_BRIDGE_MODE=live to call TranZfort.",
      roleAtPost: toTsmSeatRole(session.role),
    });
  }

  if (!isBridgeLiveConfigured()) {
    return apiError(
      "BRIDGE_NOT_CONFIGURED",
      "Live bridge needs TRANZFORT_SUPABASE_URL and TRANZFORT_SERVICE_KEY.",
      503,
    );
  }

  try {
    const remote = await ensureRemoteTsmOrgSupplierLink({
      tsmOrgId: org.id,
      supplierId,
      companyName,
      mainContactName,
      autoPolicy,
      dailyPostLimit:
        typeof body.dailyPostLimit === "number" ? body.dailyPostLimit : 100,
      notes: body.notes != null ? String(body.notes) : undefined,
    });
    const next = await saveOrgAccount({
      tranzfortSupplierId: remote.supplierId,
      tradeName: companyName,
      mainContactName,
      superLoadAutoPolicy: autoPolicy,
    });
    return apiSuccess({
      supplierId: remote.supplierId,
      orgId: next.id,
      mode: "live",
      liveLinked: true,
      message: "Linked and verified TSM org on TranZfort.",
      roleAtPost: toTsmSeatRole(session.role),
    });
  } catch (e) {
    return apiError(
      "LINK_FAILED",
      e instanceof Error ? e.message : "link_supplier_failed",
      502,
    );
  }
}
