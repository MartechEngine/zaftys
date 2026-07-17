import { createShipment, getShipment, updateShipmentFields } from "@/lib/data/shipment-repository";
import { logActivity } from "@/lib/dev-store";
import {
  acceptOverflow,
  createOverflowFromShipment,
  filterOverflowByQuery,
  getOverflowLoad,
  listOverflowLoads,
  markOverflowReview,
  parseRoute,
  rejectOverflow,
  type OverflowLoad,
} from "@/lib/network/overflow-store";

export async function listNetworkOverflow(q?: string, status?: OverflowLoad["status"] | "active") {
  const items = listOverflowLoads(status);
  return filterOverflowByQuery(items, q);
}

export async function reviewNetworkOverflow(id: string) {
  return markOverflowReview(id);
}

export async function rejectNetworkOverflow(id: string) {
  return rejectOverflow(id);
}

export async function acceptNetworkOverflow(id: string) {
  const load = getOverflowLoad(id);
  if (!load) return null;
  if (load.status === "accepted" && load.shipmentId) {
    const shipment = await getShipment(load.shipmentId);
    return shipment ? { load, shipment } : null;
  }
  if (load.status === "rejected") return null;

  const { origin, destination } = parseRoute(load.route);
  const shipment = await createShipment({
    client: `TranZfort · ${load.bookingId}`,
    origin,
    destination,
    commodity: load.commodity,
    tonnageMt: load.tonnage,
    originType: "network",
  });

  if (!shipment) return null;

  const updated = acceptOverflow(id, shipment.id);
  return updated ? { load: updated, shipment } : null;
}

export function listNetworkAssignments() {
  return listOverflowLoads("accepted").filter((l) => l.shipmentId);
}

export async function postShipmentToOverflow(shipmentId: string) {
  const shipment = await getShipment(shipmentId);
  if (!shipment) return { error: "Shipment not found." as const };

  if (shipment.status === "delivered" || shipment.status === "cancelled") {
    return { error: "Cannot post completed or cancelled shipments to overflow." as const };
  }

  // Soft-deprecate: outbound posting belongs on Load Exchange via "Post to TranZfort".
  // Keep a non-destructive mark so callers still get a booking id without cancelling the shipment.
  const created = createOverflowFromShipment({
    id: shipment.id,
    publicId: shipment.publicId,
    origin: shipment.origin,
    destination: shipment.destination,
    commodity: shipment.commodity,
    tonnageMt: shipment.tonnageMt,
    client: shipment.client,
  });

  if ("error" in created && created.error) {
    return {
      error: created.error,
      preferListing: true as const,
      message:
        "Outbound posting is via shipment Post to TranZfort / Load Exchange listings. Overflow desk is for inbound network bookings.",
    };
  }

  await updateShipmentFields(shipmentId, {
    eta: shipment.eta ? `${shipment.eta} · posted to network` : "Posted to network",
  });

  logActivity({
    shipmentId,
    type: "shipment.overflow",
    message: `${shipment.publicId} marked posted-to-network · ${created.load.bookingId} (use Post to TranZfort for Load Exchange)`,
    timestamp: new Date().toISOString(),
  });

  return {
    load: created.load,
    cancelled: false as const,
    preferListing: true as const,
    message:
      "Shipment marked posted-to-network without cancel. Prefer Post to TranZfort on the shipment for outbound Load Exchange listings; this overflow desk is for inbound bookings.",
  };
}
