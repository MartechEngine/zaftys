import { logActivity } from "@/lib/dev-store";

export type StoredServiceRate = {
  id: string;
  name: string;
  basis: string;
  rate: string;
  minCharge: string;
};

const g = globalThis as typeof globalThis & {
  __tsmDevRates?: StoredServiceRate[];
};

function getStore(): StoredServiceRate[] {
  if (!g.__tsmDevRates) g.__tsmDevRates = [];
  return g.__tsmDevRates;
}

export function listStoredRates(): StoredServiceRate[] {
  return [...getStore()];
}

export function createStoredRate(input: {
  name: string;
  basis: string;
  rate: string;
  minCharge?: string;
}): StoredServiceRate {
  const rate: StoredServiceRate = {
    id: `sr-${Date.now().toString(36)}`,
    name: input.name.trim(),
    basis: input.basis.trim(),
    rate: input.rate.trim(),
    minCharge: input.minCharge?.trim() || "—",
  };
  getStore().unshift(rate);
  logActivity({
    shipmentId: "",
    type: "rate.created",
    message: `Rate ${rate.name} · ${rate.rate}`,
    timestamp: new Date().toISOString(),
  });
  return rate;
}

const gPatches = globalThis as typeof globalThis & {
  __tsmRatePatches?: Record<string, Partial<StoredServiceRate>>;
};

export function getRatePatch(id: string) {
  return gPatches.__tsmRatePatches?.[id];
}

export function patchStoredRate(
  id: string,
  patch: Partial<Pick<StoredServiceRate, "name" | "basis" | "rate" | "minCharge">>,
) {
  if (!gPatches.__tsmRatePatches) gPatches.__tsmRatePatches = {};
  const existing = getStore().find((r) => r.id === id);
  if (existing) {
    Object.assign(existing, patch);
    logActivity({
      shipmentId: "",
      type: "rate.updated",
      message: `Rate ${existing.name} updated`,
      timestamp: new Date().toISOString(),
    });
    return existing;
  }
  gPatches.__tsmRatePatches[id] = { ...gPatches.__tsmRatePatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "rate.updated",
    message: `Rate ${id} updated`,
    timestamp: new Date().toISOString(),
  });
  return { id, ...gPatches.__tsmRatePatches[id] };
}
