import { isDatabaseConfigured } from "@/lib/db/client";
import {
  isCollectionHydrated,
  loadCollection,
  markCollectionHydrated,
  persistMapEntry,
} from "@/lib/db/collections";
import { markNotificationsRead as markInMemory } from "@/lib/notifications/read-store";

export async function hydrateNotificationReadsFromDb() {
  if (!isDatabaseConfigured() || isCollectionHydrated("notification_reads")) return;
  try {
    const rows = await loadCollection<{ id: string; value: boolean }>("notification_reads");
    markInMemory(rows.filter((r) => r.value).map((r) => r.id));
    markCollectionHydrated("notification_reads");
  } catch (err) {
    console.error("[notification-reads] hydrate failed", err);
  }
}

export async function persistNotificationRead(id: string) {
  if (!isDatabaseConfigured()) return;
  try {
    await persistMapEntry("notification_reads", id, true);
  } catch (err) {
    console.error("[notification-reads] persist failed", err);
  }
}

export async function persistNotificationReads(ids: string[]) {
  for (const id of ids) {
    await persistNotificationRead(id);
  }
}
