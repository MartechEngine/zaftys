import { listActivities } from "@/lib/dev-store";
import { getExceptions } from "@/lib/data/shipment-repository";
import {
  isNotificationRead,
  markNotificationsRead as markReadIds,
} from "@/lib/notifications/read-store";
import {
  ensureNotificationsHydrated,
  listStoredNotifications,
} from "@/lib/notifications/dispatch";
import { persistNotificationReads } from "@/lib/notifications/persist";

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
  if (type.includes("exception") || type === "gps.stale") return "Exception alert";
  if (type === "network.offer.received") {
    const match = message.match(/TranZfort offer on ([^·]+)/);
    return match ? `TranZfort offer on ${match[1].trim()}` : "TranZfort offer received";
  }
  if (type.includes("document")) return "Document uploaded";
  if (type.includes("created")) return "New shipment";
  if (type.includes("cancelled")) return "Shipment cancelled";
  if (type.includes("status")) return "Status update";
  if (type.includes("notification.email_stub")) return "Email stub";
  const first = message.split("·")[0]?.trim();
  return first ?? "Activity";
}

export async function listNotifications(limit = 20): Promise<NotificationItem[]> {
  await ensureNotificationsHydrated();
  const items: NotificationItem[] = [];
  const seen = new Set<string>();

  for (const n of await listStoredNotifications(limit)) {
    seen.add(n.id);
    items.push({
      id: n.id,
      title: n.title,
      body: n.body,
      time: n.createdAt,
      timeLabel: formatTimeLabel(n.createdAt),
      read: isNotificationRead(n.id),
      href: n.href,
      tone: n.tone,
    });
  }

  const exceptions = await getExceptions();
  for (const ex of exceptions.slice(0, 5)) {
    const id = `ex-${ex.id}`;
    if (seen.has(id)) continue;
    seen.add(id);
    items.push({
      id,
      title: `Exception: ${ex.publicId}`,
      body: ex.reason,
      time: new Date().toISOString(),
      timeLabel: "Active",
      read: isNotificationRead(id),
      href: `/shipments/${ex.shipmentId}`,
      tone: "warning",
    });
  }

  for (const a of listActivities(limit)) {
    if (seen.has(a.id)) continue;
    seen.add(a.id);
    items.push({
      id: a.id,
      title: titleForActivity(a.type, a.message),
      body: a.message,
      time: a.timestamp,
      timeLabel: formatTimeLabel(a.timestamp),
      read: isNotificationRead(a.id),
      href: a.shipmentId ? `/shipments/${a.shipmentId}` : undefined,
      tone: a.type.includes("exception") || a.type === "gps.stale"
        ? "warning"
        : a.type.includes("delivered")
          ? "success"
          : "default",
    });
  }

  return items
    .sort((a, b) => b.time.localeCompare(a.time))
    .slice(0, limit);
}

export async function countUnreadNotifications() {
  const items = await listNotifications(10);
  return items.filter((n) => !n.read).length;
}

export async function markNotificationsRead(ids: string[]) {
  const marked = markReadIds(ids);
  await persistNotificationReads(ids);
  return marked;
}

export async function markAllNotificationsRead() {
  const items = await listNotifications(100);
  const ids = items.map((n) => n.id);
  markReadIds(ids);
  await persistNotificationReads(ids);
  return ids.length;
}
