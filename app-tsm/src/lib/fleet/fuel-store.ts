import { logActivity } from "@/lib/dev-store";

export type FuelTransaction = {
  id: string;
  vehicle: string;
  vehicleId?: string;
  station: string;
  liters: number;
  amount: string;
  amountInr: number;
  date: string;
};

const g = globalThis as typeof globalThis & {
  __tsmDevFuelTx?: FuelTransaction[];
};

function getStore(): FuelTransaction[] {
  if (!g.__tsmDevFuelTx) g.__tsmDevFuelTx = [];
  return g.__tsmDevFuelTx;
}

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function listStoredFuelTransactions(): FuelTransaction[] {
  return [...getStore()];
}

export function createStoredFuelTransaction(input: {
  vehicle: string;
  vehicleId?: string;
  station: string;
  liters: number;
  amountInr?: number;
  date?: string;
}): FuelTransaction {
  const amountInr = input.amountInr ?? Math.round(input.liters * 90);
  const tx: FuelTransaction = {
    id: `ft-${Date.now().toString(36)}`,
    vehicle: input.vehicle.trim(),
    vehicleId: input.vehicleId,
    station: input.station.trim(),
    liters: input.liters,
    amount: formatInr(amountInr),
    amountInr,
    date:
      input.date?.trim() ||
      new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  };
  getStore().unshift(tx);
  logActivity({
    shipmentId: "",
    type: "fuel.created",
    message: `${tx.vehicle} · ${tx.liters}L @ ${tx.station}`,
    timestamp: new Date().toISOString(),
  });
  return tx;
}
