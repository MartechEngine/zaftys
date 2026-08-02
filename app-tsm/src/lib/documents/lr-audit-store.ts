/**
 * LR generate / void / regenerate audit (ADR-009).
 */

export type LrAuditAction = "generate" | "regenerate" | "void";

export type LrAuditRow = {
  id: string;
  orgId: string;
  shipmentId: string;
  action: LrAuditAction;
  lrNumber: string;
  documentId?: string;
  actorUserId: string;
  actorName?: string;
  reason?: string;
  createdAt: string;
};

const g = globalThis as typeof globalThis & {
  __tsmLrAudit?: LrAuditRow[];
  __tsmLrSeries?: Record<string, number>;
};

function store(): LrAuditRow[] {
  if (!g.__tsmLrAudit) g.__tsmLrAudit = [];
  return g.__tsmLrAudit;
}

function seriesMap(): Record<string, number> {
  if (!g.__tsmLrSeries) g.__tsmLrSeries = {};
  return g.__tsmLrSeries;
}

export function listLrAudit(limit = 50, shipmentId?: string): LrAuditRow[] {
  return store()
    .filter((r) => !shipmentId || r.shipmentId === shipmentId)
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function replaceLrAudit(rows: LrAuditRow[]) {
  g.__tsmLrAudit = [...rows];
}

export function replaceLrSeries(map: Record<string, number>) {
  g.__tsmLrSeries = { ...map };
}

export function getLrSeriesSnapshot(): Record<string, number> {
  return { ...seriesMap() };
}

export function appendLrAudit(
  row: Omit<LrAuditRow, "id" | "createdAt"> & { id?: string; createdAt?: string },
): LrAuditRow {
  const full: LrAuditRow = {
    id: row.id ?? `lr_audit_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    orgId: row.orgId,
    shipmentId: row.shipmentId,
    action: row.action,
    lrNumber: row.lrNumber,
    documentId: row.documentId,
    actorUserId: row.actorUserId,
    actorName: row.actorName,
    reason: row.reason,
    createdAt: row.createdAt ?? new Date().toISOString(),
  };
  store().unshift(full);
  return full;
}

/** Allocates next LR-{year}-{nnnn} per org (monotonic in-process + persisted). */
export function allocateLrNumber(orgId: string): string {
  const year = new Date().getFullYear();
  const key = `${orgId.trim().toLowerCase()}:${year}`;
  const map = seriesMap();
  const next = (map[key] ?? 1000) + 1;
  map[key] = next;
  return `LR-${year}-${String(next).padStart(4, "0")}`;
}
