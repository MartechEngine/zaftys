import { logActivity } from "@/lib/dev-store";
import { deleteStoredAutomationRule } from "@/lib/mutations/sprint12-store";

const g = globalThis as typeof globalThis & {
  __tsmDeletedAutomation?: Set<string>;
  __tsmDeletedReportSchedules?: Set<string>;
  __tsmOrderFieldPatches?: Record<string, { required?: boolean }>;
  __tsmDeletedOrderFields?: Set<string>;
  __tsmTallyLastExport?: string;
  __tsmTallyExportCount?: number;
};

export function isAutomationDeleted(id: string) {
  return Boolean(g.__tsmDeletedAutomation?.has(id));
}

export function markAutomationDeleted(id: string) {
  if (!g.__tsmDeletedAutomation) g.__tsmDeletedAutomation = new Set();
  g.__tsmDeletedAutomation.add(id);
  deleteStoredAutomationRule(id);
  logActivity({
    shipmentId: "",
    type: "automation.deleted",
    message: id,
    timestamp: new Date().toISOString(),
  });
}

export function isReportScheduleDeleted(id: string) {
  return Boolean(g.__tsmDeletedReportSchedules?.has(id));
}

export function markReportScheduleDeleted(id: string) {
  if (!g.__tsmDeletedReportSchedules) g.__tsmDeletedReportSchedules = new Set();
  g.__tsmDeletedReportSchedules.add(id);
  logActivity({
    shipmentId: "",
    type: "report_schedule.deleted",
    message: id,
    timestamp: new Date().toISOString(),
  });
}

export function getOrderFieldPatch(id: string) {
  return g.__tsmOrderFieldPatches?.[id];
}

export function patchOrderField(id: string, patch: { required?: boolean }) {
  if (!g.__tsmOrderFieldPatches) g.__tsmOrderFieldPatches = {};
  g.__tsmOrderFieldPatches[id] = { ...g.__tsmOrderFieldPatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "order_field.updated",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmOrderFieldPatches[id];
}

export function isOrderFieldDeleted(id: string) {
  return Boolean(g.__tsmDeletedOrderFields?.has(id));
}

export function markOrderFieldDeleted(id: string) {
  if (!g.__tsmDeletedOrderFields) g.__tsmDeletedOrderFields = new Set();
  g.__tsmDeletedOrderFields.add(id);
  logActivity({
    shipmentId: "",
    type: "order_field.deleted",
    message: id,
    timestamp: new Date().toISOString(),
  });
}

export function recordTallyExport() {
  g.__tsmTallyLastExport = new Date().toISOString();
  g.__tsmTallyExportCount = (g.__tsmTallyExportCount ?? 0) + 1;
  logActivity({
    shipmentId: "",
    type: "tally.exported",
    message: `Export #${g.__tsmTallyExportCount}`,
    timestamp: g.__tsmTallyLastExport,
  });
  return {
    exportedAt: g.__tsmTallyLastExport,
    exportCount: g.__tsmTallyExportCount,
  };
}

export function getTallyLastExport() {
  return g.__tsmTallyLastExport;
}
