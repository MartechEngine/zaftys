import type { Driver, ShipmentRecord, Vehicle } from "@/lib/dev-store";
import {
  fetchAllShipmentsRaw,
  listDrivers,
  listVehicles,
} from "@/lib/data/shipment-repository";
import {
  getExecutionBackend,
  getExecutionStore,
  isLiveExecutionMode,
} from "@/lib/execution";

export type DriverDetail = Driver & {
  recentShipments: ShipmentRecord[];
};

export type VehicleDetail = Vehicle & {
  recentShipments: ShipmentRecord[];
};

async function execution() {
  if (getExecutionBackend() !== "postgres") return getExecutionStore();
  try {
    const { getSession } = await import("@/lib/auth/session");
    const session = await getSession();
    if (session?.tsmOrgId?.trim()) {
      return getExecutionStore({ orgId: session.tsmOrgId });
    }
  } catch {
    /* env org */
  }
  return getExecutionStore();
}

function recentForDriver(shipments: ShipmentRecord[], driver: Driver, limit = 8) {
  return shipments
    .filter((s) => s.driverId === driver.id || s.driver === driver.name)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}

function recentForVehicle(shipments: ShipmentRecord[], vehicle: Vehicle, limit = 8) {
  return shipments
    .filter(
      (s) =>
        s.vehicleId === vehicle.id ||
        s.vehicle === vehicle.registration,
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}

export async function getDriver(id: string): Promise<DriverDetail | null> {
  if (isLiveExecutionMode()) {
    try {
      const driver = await (await execution()).getDriver(id);
      if (driver) {
        const shipments = await fetchAllShipmentsRaw();
        return { ...driver, recentShipments: recentForDriver(shipments, driver) };
      }
    } catch (e) {
      console.warn("[driver] Execution getDriver fallback to list:", e);
    }
  }

  const driver = (await listDrivers()).find((d) => d.id === id);
  if (!driver) return null;

  const shipments = await fetchAllShipmentsRaw();
  return { ...driver, recentShipments: recentForDriver(shipments, driver) };
}

export async function getVehicle(id: string): Promise<VehicleDetail | null> {
  if (isLiveExecutionMode()) {
    try {
      const vehicle = await (await execution()).getVehicle(id);
      if (vehicle) {
        const shipments = await fetchAllShipmentsRaw();
        return { ...vehicle, recentShipments: recentForVehicle(shipments, vehicle) };
      }
    } catch (e) {
      console.warn("[vehicle] Execution getVehicle fallback to list:", e);
    }
  }

  const vehicle = (await listVehicles()).find((v) => v.id === id);
  if (!vehicle) return null;

  const shipments = await fetchAllShipmentsRaw();
  return { ...vehicle, recentShipments: recentForVehicle(shipments, vehicle) };
}
