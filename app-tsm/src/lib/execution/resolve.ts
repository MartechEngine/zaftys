/**
 * Resolve which execution backend is active (ADR-008).
 *
 * TSM_DEMO_UI=1              → dev-store
 * TSM_EXECUTION_BACKEND=…    → explicit override (fleetbase | postgres | dev-store)
 * default (S4)               → postgres when DATABASE_URL set, else fleetbase if key set
 */

import type {
  ExecutionBackend,
  ExecutionStore,
  LiveExecutionBackend,
} from "@/lib/execution/types";
import { ExecutionError } from "@/lib/execution/types";
import { FleetbaseExecutionStore } from "@/lib/execution/fleetbase-store";
import { PostgresExecutionStore } from "@/lib/execution/postgres-store";
import { isDatabaseConfigured } from "@/lib/db/client";

function inferDefaultBackend(): ExecutionBackend {
  // S4: Postgres is the product default when the app DB is available.
  if (isDatabaseConfigured()) return "postgres";
  if (process.env.FLEETBASE_API_KEY?.trim()) return "fleetbase";
  return "postgres";
}

export function getExecutionBackend(): ExecutionBackend {
  if (process.env.TSM_DEMO_UI === "1") return "dev-store";
  const raw = process.env.TSM_EXECUTION_BACKEND?.toLowerCase().trim();
  if (raw === "postgres") return "postgres";
  if (raw === "fleetbase") return "fleetbase";
  if (raw === "dev-store" || raw === "dev") return "dev-store";
  return inferDefaultBackend();
}

/** True when shipments/fleet must come from a live ExecutionStore (no demo fallback). */
export function isLiveExecutionMode(): boolean {
  const b = getExecutionBackend();
  return b === "fleetbase" || b === "postgres";
}

export function getLiveExecutionBackend(): LiveExecutionBackend | null {
  const b = getExecutionBackend();
  if (b === "fleetbase" || b === "postgres") return b;
  return null;
}

/**
 * Org for Postgres LOS.
 * Prefer explicit arg → TSM_EXECUTION_ORG_ID (smoke/single-tenant) → error.
 */
export function resolveExecutionOrgId(explicit?: string | null): string {
  const fromArg = explicit?.trim().toLowerCase();
  if (fromArg) return fromArg;
  const fromEnv = process.env.TSM_EXECUTION_ORG_ID?.trim().toLowerCase();
  if (fromEnv) return fromEnv;
  throw new ExecutionError(
    "Postgres execution requires org id: pass getExecutionStore({ orgId }) or set TSM_EXECUTION_ORG_ID (e.g. org_zaftys_local for smoke).",
    400,
  );
}

const cache = new Map<string, ExecutionStore>();

export function getExecutionStore(opts?: { orgId?: string | null }): ExecutionStore {
  const backend = getLiveExecutionBackend();
  if (!backend) {
    throw new ExecutionError(
      "ExecutionStore is not used in demo/dev-store mode.",
      503,
    );
  }

  if (backend === "fleetbase") {
    const key = "fleetbase";
    let store = cache.get(key);
    if (!store) {
      store = new FleetbaseExecutionStore();
      cache.set(key, store);
    }
    return store;
  }

  const orgId = resolveExecutionOrgId(opts?.orgId);
  const key = `postgres:${orgId}`;
  let store = cache.get(key);
  if (!store) {
    store = new PostgresExecutionStore(orgId);
    cache.set(key, store);
  }
  return store;
}

/** Test helper — clear singleton between env flips. */
export function resetExecutionStoreCache() {
  cache.clear();
}
