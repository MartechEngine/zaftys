import type { ShipmentRecord } from "@/lib/dev-store";
import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";

export type DispatchCalendarEvent = {
  id: string;
  shipmentId: string;
  shipment: string;
  route: string;
  date: string;
  time: string;
  driver: string;
  status: string;
};

const SCHEDULE_STATUSES = new Set([
  "pending",
  "dispatched",
  "at_plant",
  "in_transit",
  "at_weighbridge",
]);

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function extractTime(eta?: string, updatedAt?: string) {
  if (eta) {
    const match = eta.match(/(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i);
    if (match) return match[1];
    if (eta.toLowerCase().includes("today")) return "14:00";
  }
  if (updatedAt) {
    return new Date(updatedAt).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  return "08:00";
}

function sortKey(s: ShipmentRecord) {
  return `${s.updatedAt}-${s.publicId}`;
}

export async function getDispatchCalendar(): Promise<DispatchCalendarEvent[]> {
  const shipments = await fetchAllShipmentsRaw();

  return shipments
    .filter((s) => SCHEDULE_STATUSES.has(s.status))
    .sort((a, b) => sortKey(a).localeCompare(sortKey(b)))
    .map((s) => ({
      id: `cal-${s.id}`,
      shipmentId: s.id,
      shipment: s.publicId,
      route: `${s.origin} → ${s.destination}`,
      date: formatDate(s.updatedAt),
      time: extractTime(s.eta, s.updatedAt),
      driver: s.driver ?? "Unassigned",
      status: s.status,
    }));
}

export async function getDriverSchedule(driverId: string) {
  const { listDrivers } = await import("@/lib/data/shipment-repository");
  const driver = (await listDrivers()).find((d) => d.id === driverId);
  if (!driver) return undefined;

  const calendar = await getDispatchCalendar();
  const surname = driver.name.split(" ").pop() ?? driver.name;
  const events = calendar.filter(
    (e) => e.driver === driver.name || e.driver.includes(surname),
  );

  return {
    driver: { id: driver.id, name: driver.name, status: driver.status },
    events: events.length > 0 ? events : calendar.slice(0, 3),
  };
}
