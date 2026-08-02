/**
 * Execution plane contract (ADR-008 / S2).
 * UI and repositories talk to this interface — not Fleetbase types directly.
 */

import type { CreateShipmentInput } from "@/lib/shipments/create-shipment";
import type { ShipmentStatus } from "@/lib/constants";
import type { Driver, ShipmentRecord, Vehicle } from "@/lib/dev-store";

export type ExecutionBackend = "fleetbase" | "postgres" | "dev-store";

/** Live backends that own orders/fleet (not in-memory demo). */
export type LiveExecutionBackend = "fleetbase" | "postgres";

export type ExecutionPosition = {
  id?: string;
  orderId?: string;
  latitude?: number;
  longitude?: number;
};

export class ExecutionError extends Error {
  constructor(
    message: string,
    public status = 503,
  ) {
    super(message);
    this.name = "ExecutionError";
  }
}

/**
 * Headless LOS operations. Postgres adapter lands in S3; Fleetbase is transitional.
 */
export interface ExecutionStore {
  readonly backend: LiveExecutionBackend;

  healthCheck(): Promise<boolean>;

  listShipments(limit?: number): Promise<ShipmentRecord[]>;
  getShipment(id: string): Promise<ShipmentRecord | null>;
  createShipment(input: CreateShipmentInput): Promise<ShipmentRecord>;
  assignShipment(
    id: string,
    driverId: string,
    vehicleId: string,
  ): Promise<ShipmentRecord>;
  updateShipmentStatus(id: string, status: ShipmentStatus): Promise<ShipmentRecord>;
  /** Backend-specific patch (Fleetbase order fields during transition). */
  updateShipmentPatch(
    id: string,
    patch: Record<string, unknown>,
  ): Promise<ShipmentRecord>;

  listDrivers(limit?: number): Promise<Driver[]>;
  getDriver(id: string): Promise<Driver | null>;
  createDriver(payload: Record<string, unknown>): Promise<Driver>;
  updateDriver(id: string, patch: Record<string, unknown>): Promise<Driver>;

  listVehicles(limit?: number): Promise<Vehicle[]>;
  getVehicle(id: string): Promise<Vehicle | null>;
  createVehicle(payload: Record<string, unknown>): Promise<Vehicle>;
  updateVehicle(id: string, patch: Record<string, unknown>): Promise<Vehicle>;

  listPositions(limit?: number): Promise<ExecutionPosition[]>;
}
