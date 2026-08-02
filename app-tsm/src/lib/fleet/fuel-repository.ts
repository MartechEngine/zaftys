import { demoFuelReports, demoFuelTransactions } from "@/lib/demo-data";
import { allowDemoSeeds, demoSeed } from "@/lib/data/demo-mode";
import { listVehiclesSafe } from "@/lib/data/shipment-repository";
import {
  createStoredFuelTransaction,
  listStoredFuelTransactions,
  type FuelTransaction,
} from "@/lib/fleet/fuel-store";

export type { FuelTransaction };

export type FuelReport = {
  id: string;
  vehicle: string;
  vehicleId?: string;
  kmPerLiter: number;
  costPerKm: string;
  costPerKmInr: number;
  period: string;
  litersTotal: number;
};

export type CreateFuelTransactionInput = {
  vehicle: string;
  station: string;
  liters: number;
  amountInr?: number;
  date?: string;
};

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function parseInr(value: string) {
  return parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
}

export function validateCreateFuelTransactionInput(
  body: unknown,
): CreateFuelTransactionInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const vehicle = String(data.vehicle ?? "").trim();
  const station = String(data.station ?? "").trim();
  const liters = Number(data.liters);
  const amountInr = data.amountInr != null ? Number(data.amountInr) : undefined;
  const date = String(data.date ?? "").trim() || undefined;

  if (!vehicle) return { error: "Vehicle is required." };
  if (!station) return { error: "Station is required." };
  if (!Number.isFinite(liters) || liters <= 0) return { error: "Liters must be > 0." };
  if (amountInr != null && (!Number.isFinite(amountInr) || amountInr < 0)) {
    return { error: "Amount must be a non-negative number." };
  }

  return { vehicle, station, liters, amountInr, date };
}

export async function listFuelTransactions(): Promise<FuelTransaction[]> {
  const { ensureFleetAuxHydrated } = await import("@/lib/db/domain-persistence");
  await ensureFleetAuxHydrated();
  const vehicles = await listVehiclesSafe();
  // Invented "live" fill-ups are demo-only — live mode shows stored txs only.
  const live: FuelTransaction[] = allowDemoSeeds()
    ? vehicles.slice(0, 2).map((v, index) => ({
        id: `ft-live-${v.id}`,
        vehicle: v.registration,
        vehicleId: v.id,
        station: index === 0 ? "IOCL Badnera" : "Vidarbha Fuel Hub",
        liters: 160 + index * 25,
        amount: formatInr(14400 + index * 2200),
        amountInr: 14400 + index * 2200,
        date: "12 Jul 2026",
      }))
    : [];

  const fromDemo: FuelTransaction[] = demoSeed(demoFuelTransactions).map((t) => ({
    ...t,
    amountInr: parseInr(t.amount),
  }));

  const seen = new Set<string>();
  return [...listStoredFuelTransactions(), ...live, ...fromDemo].filter((t) => {
    if (seen.has(t.id)) return false;
    seen.add(t.id);
    return true;
  });
}

export async function createFuelTransaction(
  input: CreateFuelTransactionInput,
): Promise<FuelTransaction> {
  const { ensureFleetAuxHydrated, persistFuelTransaction } = await import(
    "@/lib/db/domain-persistence"
  );
  await ensureFleetAuxHydrated();
  const vehicles = await listVehiclesSafe();
  const match = vehicles.find((v) => v.registration === input.vehicle);
  const created = createStoredFuelTransaction({
    ...input,
    vehicleId: match?.id,
  });
  await persistFuelTransaction(created);
  return created;
}

export async function listFuelReports(): Promise<FuelReport[]> {
  const vehicles = await listVehiclesSafe();
  const transactions = await listFuelTransactions();

  let fromVehicles: FuelReport[] = [];
  if (allowDemoSeeds()) {
    fromVehicles = vehicles.map((v, index) => {
      const vehicleTx = transactions.filter((t) => t.vehicle === v.registration);
      const litersTotal = vehicleTx.reduce((sum, t) => sum + t.liters, 0) || 180 + index * 15;
      const kmPerLiter = 3.0 + (index % 3) * 0.1;
      const costPerKmInr = 8.4 + index * 0.35;
      return {
        id: `fr-live-${v.id}`,
        vehicle: v.registration,
        vehicleId: v.id,
        kmPerLiter,
        costPerKm: `₹${costPerKmInr.toFixed(2)}`,
        costPerKmInr,
        period: "Jul 2026",
        litersTotal,
      };
    });
  } else {
    for (const v of vehicles) {
      const vehicleTx = transactions.filter((t) => t.vehicle === v.registration);
      if (vehicleTx.length === 0) continue;
      const litersTotal = vehicleTx.reduce((sum, t) => sum + t.liters, 0);
      fromVehicles.push({
        id: `fr-${v.id}`,
        vehicle: v.registration,
        vehicleId: v.id,
        kmPerLiter: 0,
        costPerKm: "—",
        costPerKmInr: 0,
        period: "Current",
        litersTotal,
      });
    }
  }

  const fromDemo: FuelReport[] = demoSeed(demoFuelReports).map((r) => ({
    ...r,
    costPerKmInr: parseFloat(r.costPerKm.replace(/[^\d.]/g, "")) || 0,
    litersTotal: 520,
  }));

  const seen = new Set<string>();
  return [...fromVehicles, ...fromDemo].filter((r) => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });
}
