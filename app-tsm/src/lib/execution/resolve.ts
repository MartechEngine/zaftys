/**
 * Resolve which execution backend is active (ADR-008 Phases A–C).
 *
 * TSM_DEMO_UI=1           → dev-store (in-memory)
 * TSM_EXECUTION_BACKEND=postgres → postgres (S3; stub until implemented)
 * default / fleetbase     → Fleetbase adapter (current pilot)
 */

import type {
  ExecutionBackend,
  ExecutionStore,
  LiveExecutionBackend,
} from "@/lib/execution/types";
import { ExecutionError } from "@/lib/execution/types";
import { FleetbaseExecutionStore } from "@/lib/execution/fleetbase-store";
import { PostgresExecutionStore } from "@/lib/execution/postgres-store";

export function getExecutionBackend(): ExecutionBackend {
  if (process.env.TSM_DEMO_UI === "1") return "dev-store";
  const raw = (process.env.TSM_EXECUTION_BACKEND ?? "fleetbase").toLowerCase().trim();
  if (raw === "postgres") return "postgres";
  if (raw === "dev-store" || raw === "dev") return "dev-store";
  return "fleetbase";
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

let cached: { backend: LiveExecutionBackend; store: ExecutionStore } | null = null;

export function getExecutionStore(): ExecutionStore {
  const backend = getLiveExecutionBackend();
  if (!backend) {
    throw new ExecutionError(
      "ExecutionStore is not used in demo/dev-store mode.",
      503,
    );
  }

  if (cached?.backend === backend) return cached.store;

  const store: ExecutionStore =
    backend === "postgres"
      ? new PostgresExecutionStore()
      : new FleetbaseExecutionStore();

  cached = { backend, store };
  return store;
}

/** Test helper — clear singleton between env flips. */
export function resetExecutionStoreCache() {
  cached = null;
}
