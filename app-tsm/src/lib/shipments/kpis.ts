import type { ShipmentRecord } from "@/lib/dev-store";
import { getOutboundListingStats } from "@/lib/network/listing-store";
import { isExceptionShipment } from "@/lib/shipments/filters";

export function computeKpisFromShipments(shipments: ShipmentRecord[]) {
  const active = shipments.filter((s) =>
    ["dispatched", "at_plant", "in_transit", "at_weighbridge"].includes(s.status),
  ).length;
  const exceptions = shipments.filter(isExceptionShipment).length;
  const atPlant = shipments.filter((s) => s.status === "at_plant").length;

  const { openPosts, offersWaiting } = getOutboundListingStats();
  const inboundOverflow = shipments.filter(
    (s) => s.status === "pending" && s.originType === "network",
  ).length;
  const networkOverflow = openPosts > 0 ? openPosts : inboundOverflow;

  return {
    activeTrips: active,
    exceptions,
    atPlant,
    networkOverflow,
    outboundOpenPosts: openPosts,
    outboundOffersWaiting: offersWaiting,
    inboundOverflow,
  };
}

export function computeExceptionsFromShipments(shipments: ShipmentRecord[]) {
  return shipments
    .filter(isExceptionShipment)
    .map((s) => ({
      id: s.id,
      shipmentId: s.id,
      publicId: s.publicId,
      reason:
        s.status === "exception"
          ? "Late ETA (+45m)"
          : s.originType === "network"
            ? "Unassigned — network booking"
            : "Awaiting assignment",
    }));
}
