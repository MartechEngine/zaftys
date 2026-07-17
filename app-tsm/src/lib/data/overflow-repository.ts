import { cancelShipment, createShipment, getShipment } from "@/lib/data/shipment-repository";
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
