/**
 * Postgres ExecutionStore stub (ADR-008 Phase B / S3).
 * Opt-in via TSM_EXECUTION_BACKEND=postgres — not for pilot until implemented.
 */

import type { CreateShipmentInput } from "@/lib/shipments/create-shipment";
import type { ShipmentStatus } from "@/lib/constants";
import type { Driver, ShipmentRecord, Vehicle } from "@/lib/dev-store";
import type { ExecutionPosition, ExecutionStore } from "@/lib/execution/types";
import { ExecutionError } from "@/lib/execution/types";

function notReady(method: string): never {
  throw new ExecutionError(
    `PostgresExecutionStore.${method} is not implemented yet (S3). Keep TSM_EXECUTION_BACKEND=fleetbase for pilot.`,
    501,
  );
}

export class PostgresExecutionStore implements ExecutionStore {
  readonly backend = "postgres" as const;

  async healthCheck(): Promise<boolean> {
    return false;
  }

  async listShipments(): Promise<ShipmentRecord[]> {
    notReady("listShipments");
  }
  async getShipment(): Promise<ShipmentRecord | null> {
    notReady("getShipment");
  }
  async createShipment(_input: CreateShipmentInput): Promise<ShipmentRecord> {
    notReady("createShipment");
  }
  async assignShipment(): Promise<ShipmentRecord> {
    notReady("assignShipment");
  }
  async updateShipmentStatus(
    _id: string,
    _status: ShipmentStatus,
  ): Promise<ShipmentRecord> {
    notReady("updateShipmentStatus");
  }
  async updateShipmentPatch(): Promise<ShipmentRecord> {
    notReady("updateShipmentPatch");
  }
  async listDrivers(): Promise<Driver[]> {
    notReady("listDrivers");
  }
  async getDriver(): Promise<Driver | null> {
    notReady("getDriver");
  }
  async createDriver(): Promise<Driver> {
    notReady("createDriver");
  }
  async updateDriver(): Promise<Driver> {
    notReady("updateDriver");
  }
  async listVehicles(): Promise<Vehicle[]> {
    notReady("listVehicles");
  }
  async getVehicle(): Promise<Vehicle | null> {
    notReady("getVehicle");
  }
  async createVehicle(): Promise<Vehicle> {
    notReady("createVehicle");
  }
  async updateVehicle(): Promise<Vehicle> {
    notReady("updateVehicle");
  }
  async listPositions(): Promise<ExecutionPosition[]> {
    notReady("listPositions");
  }
}
