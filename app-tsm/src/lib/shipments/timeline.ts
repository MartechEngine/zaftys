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

function findActivity(
  activities: ActivityEvent[],
  types: string[],
  messageRe?: RegExp,
) {
  return activities.find(
    (a) =>
      types.includes(a.type) ||
      (messageRe &&
        (a.type === "shipment.status_changed" || a.type.startsWith("shipment.")) &&
        messageRe.test(a.message)),
  );
}

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
  const exception = status === "exception";

  const created = findActivity(activities, ["shipment.created"]);
  const assigned = findActivity(activities, ["shipment.assigned", "shipment.dispatched"], /assign|dispatch/i);
  const atPlant = findActivity(activities, ["shipment.at_plant"], /plant/i);
  const inTransit = findActivity(activities, ["shipment.in_transit"], /transit/i);
  const weighbridge = findActivity(activities, ["shipment.at_weighbridge"], /weigh/i);
  const delivered = findActivity(activities, ["shipment.delivered"], /delivered/i);
  const exceptionEvent = findActivity(activities, ["shipment.exception"], /exception|delay|hold/i);

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

  if (exception) {
    return [
      {
        label: "Booked",
        time: formatTime(created?.timestamp ?? shipment.updatedAt),
        done: true,
      },
      {
        label: "Dispatched",
        time: formatTime(assigned?.timestamp),
        done: true,
      },
      {
        label: "Exception",
        time: formatTime(exceptionEvent?.timestamp ?? shipment.updatedAt),
        done: true,
        current: true,
      },
    ];
  }

  const order: ShipmentStatus[] = [
    "pending",
    "dispatched",
    "at_plant",
    "in_transit",
    "at_weighbridge",
    "delivered",
  ];
  const idx = Math.max(0, order.indexOf(status));

  const steps: TimelineStep[] = [
    {
      label: "Booked",
      time: formatTime(created?.timestamp ?? shipment.updatedAt),
      done: true,
      current: status === "pending",
    },
    {
      label: "Dispatched",
      time: shipment.driver || idx >= 1 ? formatTime(assigned?.timestamp ?? shipment.updatedAt) : "—",
      done: idx >= 1,
      current: status === "dispatched",
    },
    {
      label: "At plant",
      time: formatTime(atPlant?.timestamp),
      done: idx >= 2,
      current: status === "at_plant",
    },
    {
      label: "In transit",
      time: formatTime(inTransit?.timestamp),
      done: idx >= 3,
      current: status === "in_transit",
    },
    {
      label: "Weighbridge",
      time: formatTime(weighbridge?.timestamp),
      done: idx >= 4,
      current: status === "at_weighbridge",
    },
    {
      label: "Delivered",
      time:
        status === "delivered"
          ? formatTime(delivered?.timestamp ?? shipment.updatedAt)
          : shipment.eta
            ? `ETA ${shipment.eta}`
            : "—",
      done: status === "delivered",
      current: status === "delivered",
    },
  ];

  return steps;
}
