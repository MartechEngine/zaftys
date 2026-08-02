import { NextRequest } from "next/server";
import { requireDispatcherOrAdmin } from "@/lib/auth/require-role";
import { apiError, apiSuccess } from "@/lib/api-response";
import {
  listOutboundNetworkDesk,
  postShipmentListing,
} from "@/lib/network/listing-repository";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const state = req.nextUrl.searchParams.get("state") ?? undefined;
  return apiSuccess(await listOutboundNetworkDesk(state));
}

export async function POST(req: NextRequest) {
  const auth = await requireDispatcherOrAdmin();
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("INVALID_JSON", "Invalid JSON body", 400);
  }
  if (!body || typeof body !== "object") return apiError("INVALID_BODY", "Invalid body", 400);
  const b = body as Record<string, unknown>;
  const shipmentId = typeof b.shipmentId === "string" ? b.shipmentId : "";
  if (!shipmentId) return apiError("VALIDATION", "shipmentId is required", 400);

  const result = await postShipmentListing({
    shipmentId,
    trucksNeeded: Number(b.trucksNeeded) || 1,
    priceType: b.priceType === "per_ton" ? "per_ton" : "fixed",
    rateInr: Number(b.rateInr) || 0,
    advancePercent: Number(b.advancePercent) || 0,
    bodyType: typeof b.bodyType === "string" ? b.bodyType : undefined,
    tyres: b.tyres !== undefined ? Number(b.tyres) : undefined,
    pickupWindowStart:
      typeof b.pickupWindowStart === "string" ? b.pickupWindowStart : undefined,
    pickupWindowEnd: typeof b.pickupWindowEnd === "string" ? b.pickupWindowEnd : undefined,
    plantNotes: typeof b.plantNotes === "string" ? b.plantNotes : undefined,
    publish: b.publish !== false,
    draftSnapshot:
      b.draftSnapshot && typeof b.draftSnapshot === "object"
        ? (b.draftSnapshot as import("@/lib/tsm/post-draft").TsmPostDraft)
        : undefined,
    tranzfortLoadId: typeof b.tranzfortLoadId === "string" ? b.tranzfortLoadId : undefined,
    liveOnTranzfort: b.liveOnTranzfort === true,
    superLoad: b.superLoad === true,
  });

  if ("error" in result && result.error) {
    return apiError("LISTING_ERROR", result.error, 400);
  }
  return apiSuccess(result);
}
