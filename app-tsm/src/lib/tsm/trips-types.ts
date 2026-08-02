/** Supplier Trips desk — TZ read-through types. */

export type SupplierTripTab = "active" | "completed" | "all";

export type SupplierTripRow = {
  id: string;
  loadId: string;
  stage: string;
  originLabel: string;
  destinationLabel: string;
  material: string;
  truckNumber: string | null;
  truckerName: string | null;
  assignedAt: string | null;
  deliveredAt: string | null;
  completedAt: string | null;
};

export type SupplierTripsListResult = {
  items: SupplierTripRow[];
  total: number;
  source: "live" | "mock";
  honesty: string;
  linked: boolean;
  supplierIdMasked: string | null;
};
