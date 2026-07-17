/** In-memory sync state — replace with Redis/DB in production. */
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

let state: SyncState = {
  lastSyncAt: new Date().toISOString(),
  healthy: true,
  source: "none",
};

export function getSyncState() {
  return { ...state };
}

export function recordSyncRun(input: {
  success: boolean;
  scanned: number;
  created: number;
  skipped: number;
  errors: string[];
  source?: SyncState["source"];
}) {
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
  return getSyncState();
}

export function markSyncStale() {
  state = { ...state, healthy: false };
}
