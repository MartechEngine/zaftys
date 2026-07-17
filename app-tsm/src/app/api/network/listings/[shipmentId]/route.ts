import { NextRequest } from "next/server";
import { requireDispatcherOrAdmin } from "@/lib/auth/require-role";
import { apiError, apiSuccess } from "@/lib/api-response";
import {
  getShipmentNetworkContext,
  updateShipmentListing,
  withdrawShipmentListing,
} from "@/lib/network/listing-repository";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ shipmentId: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { shipmentId } = await ctx.params;
  const data = await getShipmentNetworkContext(shipmentId);
  if (!data) return apiError("NOT_FOUND", "Shipment not found", 404);
  return apiSuccess({ listing: data.listing, offers: data.offers });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const auth = await requireDispatcherOrAdmin();
  if (!auth.ok) return auth.response;

  const { shipmentId } = await ctx.params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("INVALID_JSON", "Invalid JSON body", 400);
  }
  if (!body || typeof body !== "object") return apiError("INVALID_BODY", "Invalid body", 400);
  const b = body as Record<string, unknown>;

  const result = await updateShipmentListing(shipmentId, {
    trucksNeeded: b.trucksNeeded !== undefined ? Number(b.trucksNeeded) : undefined,
    rateInr: b.rateInr !== undefined ? Number(b.rateInr) : undefined,
    bodyType: typeof b.bodyType === "string" ? b.bodyType : undefined,
    tyres: b.tyres !== undefined ? Number(b.tyres) : undefined,
    pickupWindowStart:
      typeof b.pickupWindowStart === "string" ? b.pickupWindowStart : undefined,
    pickupWindowEnd: typeof b.pickupWindowEnd === "string" ? b.pickupWindowEnd : undefined,
    plantNotes: typeof b.plantNotes === "string" ? b.plantNotes : undefined,
    publish: b.publish === true,
    expiresAt: typeof b.expiresAt === "string" ? b.expiresAt : undefined,
  });

  if ("error" in result && result.error) {
    return apiError("LISTING_ERROR", result.error, 400);
  }
  return apiSuccess(result);
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const auth = await requireDispatcherOrAdmin();
  if (!auth.ok) return auth.response;

  const { shipmentId } = await ctx.params;
  const result = await withdrawShipmentListing(shipmentId);
  if ("error" in result && result.error) {
    return apiError("LISTING_ERROR", result.error, 400);
  }
  return apiSuccess(result);
}
