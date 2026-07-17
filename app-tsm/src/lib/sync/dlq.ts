import {
  ensureArrayHydrated,
  upsertDocument,
  deleteDocument,
  type CollectionName,
} from "@/lib/db/collections";
import { isDatabaseConfigured } from "@/lib/db/client";
import { markSyncStale, recordSyncRun } from "@/lib/sync/sync-state";
import { enqueueNotification } from "@/lib/notifications/dispatch";

export type SyncDlqEntry = {
  id: string;
  entityType: string;
  entityId: string;
  operation: string;
  error: string;
  attempts: number;
  maxAttempts: number;
  nextRetryAt: string;
  createdAt: string;
  lastAttemptAt?: string;
  status: "open" | "retrying" | "dismissed" | "resolved";
};

const COLLECTION: CollectionName = "sync_dlq";

const g = globalThis as typeof globalThis & {
  __tsmSyncDlq?: SyncDlqEntry[];
  __tsmSyncDlqHydrated?: boolean;
};

function store(): SyncDlqEntry[] {
  if (!g.__tsmSyncDlq) g.__tsmSyncDlq = [];
  return g.__tsmSyncDlq;
}

function replaceAll(items: SyncDlqEntry[]) {
  g.__tsmSyncDlq = [...items];
}

export async function ensureSyncDlqHydrated() {
  if (g.__tsmSyncDlqHydrated) return;
  await ensureArrayHydrated({
    collection: COLLECTION,
    list: () => [...store()],
    replace: replaceAll,
  });
  g.__tsmSyncDlqHydrated = true;
}

async function persistEntry(entry: SyncDlqEntry) {
  if (!isDatabaseConfigured()) return;
  try {
    await upsertDocument(COLLECTION, entry.id, entry);
  } catch (err) {
    console.error("[sync-dlq] persist failed", err);
  }
}

export async function listSyncDlq(status?: SyncDlqEntry["status"]) {
  await ensureSyncDlqHydrated();
  const rows = [...store()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (status) return rows.filter((r) => r.status === status);
  return rows.filter((r) => r.status !== "dismissed" && r.status !== "resolved");
}

export async function enqueueSyncFailure(input: {
  entityType: string;
  entityId: string;
  operation: string;
  error: string;
  maxAttempts?: number;
}): Promise<SyncDlqEntry> {
  await ensureSyncDlqHydrated();
  const now = new Date().toISOString();
  const id = `dlq-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const entry: SyncDlqEntry = {
    id,
    entityType: input.entityType,
    entityId: input.entityId,
    operation: input.operation,
    error: input.error.slice(0, 500),
    attempts: 0,
    maxAttempts: input.maxAttempts ?? 5,
    nextRetryAt: now,
    createdAt: now,
    status: "open",
  };
  store().unshift(entry);
  await persistEntry(entry);

  await recordSyncRun({
    success: false,
    scanned: 0,
    created: 0,
    skipped: 0,
    errors: [input.error.slice(0, 200)],
    source: "none",
  });
  await markSyncStale();

  await enqueueNotification({
    id: `sync-dlq-${id}`,
    title: "Sync failure queued",
    body: `${input.operation} · ${input.entityType}/${input.entityId}: ${input.error.slice(0, 120)}`,
    href: "/network/sync",
    tone: "warning",
    channelId: "n-sync",
  });

  return entry;
}

export async function dismissSyncDlq(id: string): Promise<SyncDlqEntry | null> {
  await ensureSyncDlqHydrated();
  const entry = store().find((r) => r.id === id);
  if (!entry) return null;
  entry.status = "dismissed";
  await persistEntry(entry);
  if (isDatabaseConfigured()) {
    try {
      await deleteDocument(COLLECTION, id);
    } catch {
      /* keep dismissed row in DB via upsert above */
    }
  }
  return entry;
}

export async function retrySyncDlq(id: string): Promise<SyncDlqEntry | null> {
  await ensureSyncDlqHydrated();
  const entry = store().find((r) => r.id === id);
  if (!entry || entry.status === "dismissed") return null;

  entry.attempts += 1;
  entry.lastAttemptAt = new Date().toISOString();
  entry.status = "retrying";

  // Local retry stub (no TranZfort adapter): resolve unless max attempts exceeded.
  if (entry.attempts >= entry.maxAttempts) {
    entry.status = "open";
    entry.error = `${entry.error} · max retries reached`;
    entry.nextRetryAt = new Date(Date.now() + 60 * 60_000).toISOString();
  } else {
    entry.status = "resolved";
    entry.nextRetryAt = entry.lastAttemptAt;
  }

  await persistEntry(entry);

  if (entry.status === "resolved") {
    await recordSyncRun({
      success: true,
      scanned: 1,
      created: 0,
      skipped: 0,
      errors: [],
      source: "none",
    });
  }

  return entry;
}

export async function processDueSyncRetries(): Promise<{ processed: number; resolved: number }> {
  await ensureSyncDlqHydrated();
  const now = Date.now();
  let processed = 0;
  let resolved = 0;
  for (const entry of [...store()]) {
    if (entry.status !== "open") continue;
    if (Date.parse(entry.nextRetryAt) > now) continue;
    const result = await retrySyncDlq(entry.id);
    processed += 1;
    if (result?.status === "resolved") resolved += 1;
  }
  return { processed, resolved };
}
