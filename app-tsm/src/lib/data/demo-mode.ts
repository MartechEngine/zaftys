/**
 * Demo vs live gate.
 *
 * LIVE-FIRST (Jul 2026): demo catalogs are OFF unless explicitly enabled.
 *   TSM_DEMO_UI=1 → allow `@/lib/demo-data` seeds (opt-in only; for future demos)
 *   unset / "0" / anything else → live honesty: empty catalogs, Fleetbase + Postgres only
 *
 * TranZfort bridge: use TSM_TRANZFORT_BRIDGE_MODE=mock|live + server secrets.
 * See docs/app/ops/TSM-TZ-pilot-cleanup-and-smoke-runbook.md
 */
export function isDemoUiMode(): boolean {
  return process.env.TSM_DEMO_UI === "1";
}

/** Prefer this in repositories that seed from `@/lib/demo-data`. */
export function allowDemoSeeds(): boolean {
  return isDemoUiMode();
}

/** Returns `items` only when demo UI is explicitly enabled; otherwise []. */
export function demoSeed<T>(items: readonly T[]): T[] {
  return allowDemoSeeds() ? [...items] : [];
}
