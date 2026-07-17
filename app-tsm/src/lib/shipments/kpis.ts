import type { ShipmentRecord } from "@/lib/dev-store";
import { isActiveShipment, isExceptionShipment } from "@/lib/shipments/filters";

export function computeKpisFromShipments(shipments: ShipmentRecord[]) {
  const active = shipments.filter((s) =>
    ["dispatched", "at_plant", "in_transit", "at_weighbridge"].includes(s.status),
  ).length;
  const exceptions = shipments.filter(isExceptionShipment).length;
  const atPlant = shipments.filter((s) => s.status === "at_plant").length;
  const networkOverflow = shipments.filter(
    (s) => s.status === "pending" && s.originType === "network",
  ).length;

  return { activeTrips: active, exceptions, atPlant, networkOverflow };
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
