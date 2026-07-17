import { listActivities } from "@/lib/dev-store";
import { getExceptions } from "@/lib/data/shipment-repository";

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  timeLabel: string;
  read: boolean;
  href?: string;
  tone?: "default" | "warning" | "success";
}

function formatTimeLabel(iso: string) {
  try {
    const date = new Date(iso);
    const diffMs = Date.now() - date.getTime();
    const mins = Math.floor(diffMs / 60_000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  } catch {
    return iso;
  }
}

function titleForActivity(type: string, message: string) {
  if (type.includes("exception")) return "Exception alert";
  if (type.includes("document")) return "Document uploaded";
  if (type.includes("created")) return "New shipment";
  if (type.includes("cancelled")) return "Shipment cancelled";
  if (type.includes("status")) return "Status update";
  const first = message.split("·")[0]?.trim();
  return first ?? "Activity";
}

export async function listNotifications(limit = 20): Promise<NotificationItem[]> {
  const items: NotificationItem[] = [];

  const exceptions = await getExceptions();
  for (const ex of exceptions.slice(0, 5)) {
    items.push({
      id: `ex-${ex.id}`,
      title: `Exception: ${ex.publicId}`,
      body: ex.reason,
      time: new Date().toISOString(),
      timeLabel: "Active",
      read: false,
      href: `/shipments/${ex.shipmentId}`,
      tone: "warning",
    });
  }

  for (const a of listActivities(limit)) {
    items.push({
      id: a.id,
      title: titleForActivity(a.type, a.message),
      body: a.message,
      time: a.timestamp,
      timeLabel: formatTimeLabel(a.timestamp),
      read: false,
      href: a.shipmentId ? `/shipments/${a.shipmentId}` : undefined,
      tone: a.type.includes("exception") ? "warning" : a.type.includes("delivered") ? "success" : "default",
    });
  }

  return items.slice(0, limit);
}

export async function countUnreadNotifications() {
  const items = await listNotifications(10);
  return items.filter((n) => !n.read).length;
}
