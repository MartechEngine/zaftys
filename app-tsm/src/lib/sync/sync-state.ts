/** Sync state — in-memory with durable Postgres persistence when DATABASE_URL is set. */
import { isDatabaseConfigured } from "@/lib/db/client";
import { loadCollection, upsertDocument } from "@/lib/db/collections";

export interface SyncState {
  lastSyncAt: string;
  lastSuccessAt?: string;
  healthy: boolean;
  source: "tranzfort" | "none";
  lastRun?: {
    scanned: number;
    created: number;
    skipped: number;
    errors: string[];
  };
}

type SyncStateDoc = SyncState & { id: string };

const DOC_ID = "current";

let state: SyncState = {
  lastSyncAt: new Date().toISOString(),
  healthy: true,
  source: "none",
};

let hydratePromise: Promise<void> | null = null;
let hydrated = false;

async function ensureHydrated() {
  if (hydrated || !isDatabaseConfigured()) {
    hydrated = true;
    return;
  }
  if (hydratePromise) return hydratePromise;

  hydratePromise = (async () => {
    try {
      const rows = await loadCollection<SyncStateDoc>("sync_state");
      const row = rows.find((r) => r.id === DOC_ID) ?? rows[0];
      if (row) {
        const { id: _id, ...rest } = row;
        state = {
          lastSyncAt: rest.lastSyncAt ?? state.lastSyncAt,
          lastSuccessAt: rest.lastSuccessAt,
          healthy: rest.healthy ?? state.healthy,
          source: rest.source ?? state.source,
          lastRun: rest.lastRun,
        };
      }
    } catch (err) {
      console.error("[sync-state] hydrate failed", err);
    } finally {
      hydrated = true;
    }
  })();

  return hydratePromise;
}

async function persist() {
  if (!isDatabaseConfigured()) return;
  try {
    const doc: SyncStateDoc = { id: DOC_ID, ...state };
    await upsertDocument("sync_state", DOC_ID, doc);
  } catch (err) {
    console.error("[sync-state] persist failed", err);
  }
}

export async function getSyncState(): Promise<SyncState> {
  await ensureHydrated();
  return { ...state };
}

export async function recordSyncRun(input: {
  success: boolean;
  scanned: number;
  created: number;
  skipped: number;
  errors: string[];
  source?: SyncState["source"];
}): Promise<SyncState> {
  await ensureHydrated();
  const now = new Date().toISOString();
  state = {
    lastSyncAt: now,
    lastSuccessAt: input.success ? now : state.lastSuccessAt,
    healthy: input.success && input.errors.length === 0,
    source: input.source ?? state.source,
    lastRun: {
      scanned: input.scanned,
      created: input.created,
      skipped: input.skipped,
      errors: input.errors,
    },
  };
  await persist();
  return getSyncState();
}

export async function markSyncStale() {
  await ensureHydrated();
  state = { ...state, healthy: false };
  await persist();
}
