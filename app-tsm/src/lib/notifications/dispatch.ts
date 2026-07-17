import { logActivity } from "@/lib/dev-store";
import {
  isDatabaseConfigured,
} from "@/lib/db/client";
import { upsertDocument, loadCollection, ensureArrayHydrated } from "@/lib/db/collections";
import { getNotificationSettings } from "@/lib/settings/config-repository";
import {
  isNotificationRead,
  markNotificationsRead as markReadInMemory,
} from "@/lib/notifications/read-store";
import { persistNotificationRead, hydrateNotificationReadsFromDb } from "@/lib/notifications/persist";

export type StoredNotification = {
  id: string;
  title: string;
  body: string;
  href?: string;
  tone?: "default" | "warning" | "success";
  channelId?: string;
  createdAt: string;
};

const g = globalThis as typeof globalThis & {
  __tsmStoredNotifications?: StoredNotification[];
};

function store(): StoredNotification[] {
  if (!g.__tsmStoredNotifications) g.__tsmStoredNotifications = [];
  return g.__tsmStoredNotifications;
}

function replaceStored(items: StoredNotification[]) {
  g.__tsmStoredNotifications = [...items];
}

export async function ensureNotificationsHydrated() {
  await ensureArrayHydrated({
    collection: "notification_items",
    list: () => [...store()],
    replace: replaceStored,
  });
  await hydrateNotificationReadsFromDb();
}

async function persistNotification(n: StoredNotification) {
  if (!isDatabaseConfigured()) return;
  try {
    await upsertDocument("notification_items", n.id, n);
  } catch (err) {
    console.error("[notifications] persist failed", err);
  }
}

/** Local email stub — logs + activity only (no SMTP). */
export async function sendEmailStub(input: {
  to: string;
  subject: string;
  body: string;
}) {
  const message = `Email stub → ${input.to}: ${input.subject}`;
  console.info(`[email-stub] ${message}`);
  logActivity({
    shipmentId: "",
    type: "notification.email_stub",
    message: `${message} · ${input.body.slice(0, 80)}`,
    timestamp: new Date().toISOString(),
  });
  return { sent: false, stub: true as const, to: input.to };
}

export async function enqueueNotification(input: {
  id?: string;
  title: string;
  body: string;
  href?: string;
  tone?: "default" | "warning" | "success";
  channelId?: string;
}): Promise<StoredNotification> {
  await ensureNotificationsHydrated();
  const id = input.id ?? `ntf-${Date.now().toString(36)}`;
  // Dedupe by id
  if (store().some((n) => n.id === id)) {
    return store().find((n) => n.id === id)!;
  }

  const row: StoredNotification = {
    id,
    title: input.title,
    body: input.body,
    href: input.href,
    tone: input.tone ?? "default",
    channelId: input.channelId,
    createdAt: new Date().toISOString(),
  };
  store().unshift(row);
  await persistNotification(row);

  logActivity({
    shipmentId: "",
    type: "notification.created",
    message: `${row.title} · ${row.body.slice(0, 100)}`,
    timestamp: row.createdAt,
  });

  // Channel-aware email stub
  if (input.channelId) {
    try {
      const channels = await getNotificationSettings();
      const channel = channels.find((c) => c.id === input.channelId);
      if (channel?.enabled && /email/i.test(channel.recipients)) {
        await sendEmailStub({
          to: channel.recipients,
          subject: row.title,
          body: row.body,
        });
      }
    } catch {
      /* ignore */
    }
  }

  return row;
}

export async function listStoredNotifications(limit = 25): Promise<StoredNotification[]> {
  await ensureNotificationsHydrated();
  return store().slice(0, limit);
}

export async function loadAllStoredNotificationsFromDb(): Promise<StoredNotification[]> {
  if (!isDatabaseConfigured()) return [];
  return loadCollection<StoredNotification>("notification_items");
}

export { isNotificationRead, markReadInMemory };
