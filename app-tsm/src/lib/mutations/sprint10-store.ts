import { logActivity } from "@/lib/dev-store";

export type StoredFleetIssue = {
  id: string;
  vehicle: string;
  driver: string;
  issue: string;
  severity: "high" | "medium" | "low";
  reported: string;
  source: "navigator" | "maintenance";
};

const g = globalThis as typeof globalThis & {
  __tsmFleetIssues?: StoredFleetIssue[];
  __tsmResolvedIssues?: Set<string>;
  __tsmCompliancePatches?: Record<
    string,
    { status: "valid" | "expiring" | "expired"; expires?: string }
  >;
  __tsmPartnerVerified?: Set<string>;
  __tsmOrgUserPatches?: Record<string, { status?: "active" | "pending"; role?: string }>;
  __tsmReportRuns?: Array<{
    id: string;
    reportId: string;
    name: string;
    ranAt: string;
    metric: string;
  }>;
};

export function listStoredFleetIssues(): StoredFleetIssue[] {
  if (!g.__tsmFleetIssues) g.__tsmFleetIssues = [];
  return [...g.__tsmFleetIssues];
}

export function createStoredFleetIssue(input: {
  vehicle: string;
  driver: string;
  issue: string;
  severity?: StoredFleetIssue["severity"];
}): StoredFleetIssue {
  if (!g.__tsmFleetIssues) g.__tsmFleetIssues = [];
  const row: StoredFleetIssue = {
    id: `fi-${Date.now().toString(36)}`,
    vehicle: input.vehicle.trim(),
    driver: input.driver.trim(),
    issue: input.issue.trim(),
    severity: input.severity ?? "medium",
    reported: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    source: "navigator",
  };
  g.__tsmFleetIssues.unshift(row);
  logActivity({
    shipmentId: "",
    type: "fleet.issue.created",
    message: `${row.vehicle} · ${row.issue}`,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function isIssueResolved(id: string) {
  return Boolean(g.__tsmResolvedIssues?.has(id));
}

export function resolveStoredIssue(id: string) {
  if (!g.__tsmResolvedIssues) g.__tsmResolvedIssues = new Set();
  g.__tsmResolvedIssues.add(id);
  logActivity({
    shipmentId: "",
    type: "fleet.issue.resolved",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return true;
}

export function getCompliancePatch(id: string) {
  return g.__tsmCompliancePatches?.[id];
}

export function patchComplianceDoc(
  id: string,
  patch: { status: "valid" | "expiring" | "expired"; expires?: string },
) {
  if (!g.__tsmCompliancePatches) g.__tsmCompliancePatches = {};
  g.__tsmCompliancePatches[id] = {
    ...g.__tsmCompliancePatches[id],
    ...patch,
  };
  logActivity({
    shipmentId: "",
    type: "compliance.updated",
    message: `${id} · ${patch.status}`,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmCompliancePatches[id];
}

export function isPartnerVerifiedOverride(id: string) {
  return Boolean(g.__tsmPartnerVerified?.has(id));
}

export function markPartnerVerifiedOverride(id: string) {
  if (!g.__tsmPartnerVerified) g.__tsmPartnerVerified = new Set();
  g.__tsmPartnerVerified.add(id);
}

export function getOrgUserPatch(id: string) {
  return g.__tsmOrgUserPatches?.[id];
}

export function patchOrgUserFields(
  id: string,
  patch: { status?: "active" | "pending"; role?: string },
) {
  if (!g.__tsmOrgUserPatches) g.__tsmOrgUserPatches = {};
  g.__tsmOrgUserPatches[id] = { ...g.__tsmOrgUserPatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "user.updated",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmOrgUserPatches[id];
}

export function recordCustomReportRun(input: {
  reportId: string;
  name: string;
  metric: string;
}) {
  if (!g.__tsmReportRuns) g.__tsmReportRuns = [];
  const row = {
    id: `run-${Date.now().toString(36)}`,
    reportId: input.reportId,
    name: input.name,
    ranAt: new Date().toISOString(),
    metric: input.metric,
  };
  g.__tsmReportRuns.unshift(row);
  logActivity({
    shipmentId: "",
    type: "report.ran",
    message: `${input.name} · ${input.metric}`,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function listCustomReportRuns(reportId?: string) {
  if (!g.__tsmReportRuns) g.__tsmReportRuns = [];
  if (!reportId) return [...g.__tsmReportRuns];
  return g.__tsmReportRuns.filter((r) => r.reportId === reportId);
}
