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
  const inTransit = activities.find(
    (a) =>
      a.type === "shipment.in_transit" ||
      (a.type === "shipment.status_changed" && /transit/i.test(a.message)),
  );
  const delivered = activities.find(
    (a) => a.type === "shipment.delivered" || a.type === "shipment.delivered",
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
      done: status !== "pending",
      current: status === "dispatched" || status === "at_plant",
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
      current: false,
    },
  ];
}
