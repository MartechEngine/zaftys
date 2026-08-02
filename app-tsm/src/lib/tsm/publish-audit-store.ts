/**
 * TSM-side publish audit (posted-by vs company ownership).
 */

export type PublishAuditStatus = "success" | "error" | "mock";

export type PublishAuditRow = {
  id: string;
  orgId: string;
  postedByUserId: string;
  /** Seat display name for “who clicked” (not marketplace identity). */
  postedByName?: string;
  roleAtPost: string;
  idempotencyKey: string;
  loadId?: string;
  status: PublishAuditStatus;
  error?: string;
  createdAt: string;
};

const g = globalThis as typeof globalThis & {
  __tsmPublishAudit?: PublishAuditRow[];
};

function store(): PublishAuditRow[] {
  if (!g.__tsmPublishAudit) g.__tsmPublishAudit = [];
  return g.__tsmPublishAudit;
}

export function listPublishAudit(limit = 50): PublishAuditRow[] {
  return store()
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function replacePublishAudit(rows: PublishAuditRow[]) {
  g.__tsmPublishAudit = [...rows];
}

export function appendPublishAudit(
  row: Omit<PublishAuditRow, "id" | "createdAt"> & { id?: string; createdAt?: string },
): PublishAuditRow {
  const full: PublishAuditRow = {
    id: row.id ?? `audit_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    orgId: row.orgId,
    postedByUserId: row.postedByUserId,
    postedByName: row.postedByName,
    roleAtPost: row.roleAtPost,
    idempotencyKey: row.idempotencyKey,
    loadId: row.loadId,
    status: row.status,
    error: row.error,
    createdAt: row.createdAt ?? new Date().toISOString(),
  };
  store().unshift(full);
  return full;
}
