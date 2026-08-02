import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { canPublishToTranzfort, toTsmSeatRole } from "@/lib/tsm/org";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import type { TsmPostDraft } from "@/lib/tsm/post-draft";
import {
  ensureRemoteTsmOrgSupplierLink,
  getBridgeMode,
  isBridgeLiveConfigured,
  rpcPublishTsmLoadAsSuper,
} from "@/lib/tsm/bridge-rpc";
import { publishGateForMode } from "@/lib/tsm/live-honesty";
import { appendPublishAudit } from "@/lib/tsm/publish-audit-store";
import { persistPublishAuditRow } from "@/lib/db/domain-persistence";

function asDraft(raw: unknown): TsmPostDraft | null {
  if (!raw || typeof raw !== "object") return null;
  const d = raw as Record<string, unknown>;
  return {
    idempotencyKey: String(d.idempotencyKey ?? "").trim(),
    originLabel: String(d.originLabel ?? ""),
    originCity: String(d.originCity ?? ""),
    originState: String(d.originState ?? ""),
    originLat: Number(d.originLat ?? 0),
    originLng: Number(d.originLng ?? 0),
    destinationLabel: String(d.destinationLabel ?? ""),
    destinationCity: String(d.destinationCity ?? ""),
    destinationState: String(d.destinationState ?? ""),
    destinationLat: Number(d.destinationLat ?? 0),
    destinationLng: Number(d.destinationLng ?? 0),
    routeDistanceKm: Number(d.routeDistanceKm ?? 0),
    routeDurationMinutes: Number(d.routeDurationMinutes ?? 0),
    routePolyline: String(d.routePolyline ?? ""),
    routeSnapshotSource: String(d.routeSnapshotSource ?? "tsm"),
    material: String(d.material ?? ""),
    materialCode: d.materialCode != null ? String(d.materialCode) : null,
    weightTonnes: d.weightTonnes != null ? Number(d.weightTonnes) : null,
    requiredBodyType: d.requiredBodyType != null ? String(d.requiredBodyType) : null,
    requiredTyres: Array.isArray(d.requiredTyres)
      ? d.requiredTyres.map((n) => Number(n))
      : null,
    trucksNeeded: Number(d.trucksNeeded ?? 1),
    priceAmount: Number(d.priceAmount ?? 0),
    priceType: d.priceType === "per_ton" ? "per_ton" : "fixed",
    advancePercentage: Number(d.advancePercentage ?? 0),
    pickupDate: String(d.pickupDate ?? "").slice(0, 10),
    listingDuration:
      d.listingDuration === "48_hours" || d.listingDuration === "30_days"
        ? d.listingDuration
        : "7_days",
    requiredVehicleCategoryCode:
      d.requiredVehicleCategoryCode != null
        ? String(d.requiredVehicleCategoryCode)
        : null,
    requiredBodyStyleCodes: Array.isArray(d.requiredBodyStyleCodes)
      ? d.requiredBodyStyleCodes.map(String)
      : [],
    requiredConfigurationCodes: Array.isArray(d.requiredConfigurationCodes)
      ? d.requiredConfigurationCodes.map(String)
      : [],
    requiredVehicleCategoryCodes: Array.isArray(d.requiredVehicleCategoryCodes)
      ? d.requiredVehicleCategoryCodes.map(String)
      : [],
    sourceShipmentId: d.sourceShipmentId != null ? String(d.sourceShipmentId) : undefined,
  };
}

/**
 * Publish draft as Super Load via TranZfort orchestrator (when live).
 * Body: { draft: TsmPostDraft }
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);
  if (!canPublishToTranzfort(session.role)) {
    return apiError("FORBIDDEN", "Your role cannot publish to TranZfort.", 403);
  }
  if (session.canPublishToTranzfort === false) {
    return apiError(
      "NOT_VERIFIED",
      "Complete supplier verification in the TranZfort app before publishing.",
      403,
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return apiError("INVALID_JSON", "Body must be JSON.");
  }

  const draft = asDraft(body.draft ?? body);
  if (!draft) return apiError("VALIDATION", "draft object is required.");

  const org = await getOrgAccountForSession(session);
  const roleAtPost = toTsmSeatRole(session.role);
  const mode = getBridgeMode();

  const gate = publishGateForMode(draft, mode);
  if (!gate.ok) return apiError("VALIDATION", gate.reason ?? "Invalid draft.");

  async function audit(
    status: "success" | "error" | "mock",
    opts: { loadId?: string; error?: string },
  ) {
    const row = appendPublishAudit({
      orgId: org.id,
      postedByUserId: session!.id,
      postedByName: session!.name,
      roleAtPost,
      idempotencyKey: draft!.idempotencyKey,
      loadId: opts.loadId,
      status,
      error: opts.error,
    });
    await persistPublishAuditRow(row);
    return row;
  }

  if (mode === "mock") {
    const loadId = `tz-mock-${draft.idempotencyKey.slice(0, 24)}`;
    await audit("mock", { loadId });
    return apiSuccess({
      loadId,
      mode: "mock",
      orgId: org.id,
      company: org.tradeName,
      message: `Mock Super Load publish as ${org.tradeName}. Posts as company; your name is recorded for audit only.`,
      roleAtPost,
    });
  }

  if (!isBridgeLiveConfigured()) {
    await audit("error", { error: "bridge_not_configured" });
    return apiError(
      "BRIDGE_NOT_CONFIGURED",
      "Live bridge needs TRANZFORT_SUPABASE_URL and TRANZFORT_SERVICE_KEY.",
      503,
    );
  }

  if (!org.tranzfortSupplierId) {
    await audit("error", { error: "tsm_org_not_linked" });
    return apiError(
      "ORG_NOT_LINKED",
      "Link a TranZfort supplier first (POST /api/tsm/tranzfort/link-supplier).",
      409,
    );
  }

  try {
    // Local `tranzfortSupplierId` is intent, not proof. Publish requires the
    // authoritative TZ `tsm_org_supplier_map` row; repair it idempotently.
    await ensureRemoteTsmOrgSupplierLink({
      tsmOrgId: org.id,
      supplierId: org.tranzfortSupplierId,
      companyName: org.tradeName || org.legalName,
      mainContactName: org.mainContactName,
      autoPolicy: org.superLoadAutoPolicy,
      dailyPostLimit: 100,
      notes: "Verified/repaired by TSM publish preflight",
    });
    const loadId = await rpcPublishTsmLoadAsSuper(org, draft);
    await audit("success", { loadId });
    return apiSuccess({
      loadId,
      mode: "live",
      orgId: org.id,
      company: org.tradeName,
      message: `Published to TranZfort as Super Load for ${org.tradeName}.`,
      roleAtPost,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "publish_failed";
    await audit("error", { error: message });
    return apiError("PUBLISH_FAILED", message, 502);
  }
}
