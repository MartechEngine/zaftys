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
