import type { ShipmentStatus } from "@/lib/constants";
import type { ShipmentRecord } from "@/lib/dev-store";
import { pathToStatus, validateStatusTransition } from "@/lib/shipments/update-shipment";

export type DispatchColumnId = "unassigned" | "assigned" | "progress" | "done";

export const DISPATCH_COLUMNS: {
  id: DispatchColumnId;
  title: string;
  tone: "muted" | "primary" | "warning" | "success";
  filter: (s: ShipmentRecord) => boolean;
  targetStatus: ShipmentStatus;
}[] = [
  {
    id: "unassigned",
    title: "Backlog",
    tone: "muted",
    filter: (s) => s.status === "pending",
    targetStatus: "pending",
  },
  {
    id: "assigned",
    title: "Assigned",
    tone: "primary",
    filter: (s) => s.status === "dispatched",
    targetStatus: "dispatched",
  },
  {
    id: "progress",
    title: "En route",
    tone: "warning",
    filter: (s) =>
      ["in_transit", "at_plant", "at_weighbridge", "exception"].includes(s.status),
    targetStatus: "in_transit",
  },
  {
    id: "done",
    title: "Delivered",
    tone: "success",
    filter: (s) => s.status === "delivered",
    targetStatus: "delivered",
  },
];

export function columnForShipment(s: ShipmentRecord): DispatchColumnId {
  return DISPATCH_COLUMNS.find((col) => col.filter(s))?.id ?? "progress";
}

export function canDropInColumn(
  shipment: ShipmentRecord,
  columnId: DispatchColumnId,
): { ok: true } | { ok: false; reason: string; needsAssign?: boolean } {
  const col = DISPATCH_COLUMNS.find((c) => c.id === columnId);
  if (!col) return { ok: false, reason: "Unknown column." };

  const current = columnForShipment(shipment);
  if (current === columnId) return { ok: false, reason: "Already in this column." };

  if (columnId === "assigned" && shipment.status === "pending" && !shipment.driver) {
    return { ok: false, reason: "Assign a driver first.", needsAssign: true };
  }

  const path = pathToStatus(shipment.status, col.targetStatus);
  if (!path || path.length === 0) {
    const err = validateStatusTransition(shipment.status, col.targetStatus);
    return { ok: false, reason: err ?? "This move is not allowed." };
  }

  return { ok: true };
}

export function statusPathForColumn(
  shipment: ShipmentRecord,
  columnId: DispatchColumnId,
): ShipmentStatus[] | null {
  const col = DISPATCH_COLUMNS.find((c) => c.id === columnId);
  if (!col) return null;
  if (columnForShipment(shipment) === columnId) return [];
  return pathToStatus(shipment.status, col.targetStatus);
}
