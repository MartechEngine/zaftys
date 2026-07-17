import { logActivity } from "@/lib/dev-store";

export type AppliedOrchestratorPlan = {
  shipmentId: string;
  publicId: string;
  action: string;
  appliedAt: string;
  driverId?: string;
  vehicleId?: string;
};

export type QuoteFieldPatch = {
  tonnage?: number;
  rateInr?: number;
};

export type PartMetaPatch = {
  reorder?: number;
  location?: string;
};

export type StoredFault = {
  id: string;
  vehicle: string;
  driver: string;
  issue: string;
  reported: string;
  status: "open";
};

const g = globalThis as typeof globalThis & {
  __tsmOrchestratorApplied?: AppliedOrchestratorPlan | null;
  __tsmQuoteFieldPatches?: Record<string, QuoteFieldPatch>;
  __tsmPartMetaPatches?: Record<string, PartMetaPatch>;
  __tsmCreatedFaults?: StoredFault[];
};

export function recordOrchestratorApply(plan: AppliedOrchestratorPlan) {
  g.__tsmOrchestratorApplied = plan;
  logActivity({
    shipmentId: plan.shipmentId,
    type: "orchestrator.applied",
    message: `${plan.publicId} · ${plan.action}`,
    timestamp: plan.appliedAt,
  });
  return plan;
}

export function getOrchestratorApplied() {
  return g.__tsmOrchestratorApplied ?? null;
}

export function clearOrchestratorApplied() {
  g.__tsmOrchestratorApplied = null;
}

export function patchQuoteFields(quoteId: string, patch: QuoteFieldPatch) {
  if (!g.__tsmQuoteFieldPatches) g.__tsmQuoteFieldPatches = {};
  g.__tsmQuoteFieldPatches[quoteId] = { ...g.__tsmQuoteFieldPatches[quoteId], ...patch };
  logActivity({
    shipmentId: "",
    type: "quote.revised",
    message: `${quoteId} · ${Object.keys(patch).join(", ")}`,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmQuoteFieldPatches[quoteId];
}

export function getQuoteFieldPatch(quoteId: string) {
  return g.__tsmQuoteFieldPatches?.[quoteId];
}

export function patchPartMeta(partId: string, patch: PartMetaPatch) {
  if (!g.__tsmPartMetaPatches) g.__tsmPartMetaPatches = {};
  g.__tsmPartMetaPatches[partId] = { ...g.__tsmPartMetaPatches[partId], ...patch };
  logActivity({
    shipmentId: "",
    type: "parts.meta_updated",
    message: `${partId} · ${Object.keys(patch).join(", ")}`,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmPartMetaPatches[partId];
}

export function getPartMetaPatch(partId: string) {
  return g.__tsmPartMetaPatches?.[partId];
}

export function createStoredFault(input: {
  vehicle: string;
  driver: string;
  issue: string;
}): StoredFault {
  if (!g.__tsmCreatedFaults) g.__tsmCreatedFaults = [];
  const row: StoredFault = {
    id: `fr-${Date.now().toString(36)}`,
    vehicle: input.vehicle.trim(),
    driver: input.driver.trim(),
    issue: input.issue.trim(),
    reported: new Date().toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "open",
  };
  g.__tsmCreatedFaults.unshift(row);
  logActivity({
    shipmentId: "",
    type: "fault.created",
    message: `${row.vehicle} · ${row.issue}`,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function listCreatedFaults(): StoredFault[] {
  return [...(g.__tsmCreatedFaults ?? [])];
}
