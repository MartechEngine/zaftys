import type { ActivityEvent } from "@/lib/dev-store";
import type { ShipmentStatus } from "@/lib/constants";

export type TimelineStep = {
  label: string;
  time: string;
  done: boolean;
  current?: boolean;
};

function formatTime(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const TRANSIT_STATUSES: ShipmentStatus[] = [
  "in_transit",
  "at_weighbridge",
  "delivered",
  "exception",
];

export function buildShipmentTimeline(
  shipment: {
    status: ShipmentStatus;
    driver?: string;
    eta?: string;
    updatedAt: string;
  },
  activities: ActivityEvent[],
): TimelineStep[] {
  const { status } = shipment;
  const cancelled = status === "cancelled";

  const created = activities.find((a) => a.type === "shipment.created");
  const assigned = activities.find((a) => a.type === "shipment.assigned");
  const atPlant = activities.find(
    (a) =>
      a.type === "shipment.at_plant" ||
      (a.type === "shipment.status_changed" && /plant/i.test(a.message)),
  );
  const inTransit = activities.find(
    (a) =>
      a.type === "shipment.in_transit" ||
      (a.type === "shipment.status_changed" && /transit/i.test(a.message)),
  );
  const delivered = activities.find(
    (a) =>
      a.type === "shipment.delivered" ||
      (a.type === "shipment.status_changed" && /delivered/i.test(a.message)),
  );

  if (cancelled) {
    return [
      {
        label: "Booked",
        time: formatTime(created?.timestamp),
        done: true,
      },
      {
        label: "Cancelled",
        time: formatTime(shipment.updatedAt),
        done: true,
        current: true,
      },
    ];
  }

  const dispatchedDone = !["pending"].includes(status);
  const plantDone = ["at_plant", ...TRANSIT_STATUSES].includes(status);

  return [
    {
      label: "Booked",
      time: formatTime(created?.timestamp ?? shipment.updatedAt),
      done: true,
      current: status === "pending",
    },
    {
      label: "Dispatched",
      time: shipment.driver ? formatTime(assigned?.timestamp) : "—",
      done: dispatchedDone,
      current: status === "dispatched",
    },
    {
      label: "At plant",
      time: formatTime(atPlant?.timestamp),
      done: plantDone,
      current: status === "at_plant",
    },
    {
      label: "In transit",
      time: formatTime(inTransit?.timestamp),
      done: TRANSIT_STATUSES.includes(status),
      current: status === "in_transit" || status === "at_weighbridge",
    },
    {
      label: "Delivered",
      time:
        status === "delivered"
          ? (shipment.eta ?? formatTime(delivered?.timestamp ?? shipment.updatedAt))
          : "—",
      done: status === "delivered",
      current: status === "delivered",
    },
  ];
}
