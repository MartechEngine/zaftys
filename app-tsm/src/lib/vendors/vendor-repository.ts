import { demoVendors, demoWorkOrders } from "@/lib/demo-data";
import { createStoredVendor, listStoredVendors } from "@/lib/vendors/vendor-store";
import {
  getWorkOrderStatusOverride,
  listStoredWorkOrders,
} from "@/lib/maintenance/work-order-store";

export type VendorRecord = {
  id: string;
  name: string;
  type: string;
  city: string;
  contact: string;
  openWorkOrders: number;
  totalSpendInr: number;
};

export type CreateVendorInput = {
  name: string;
  type: string;
  city: string;
  contact: string;
};

function parseCostInr(cost: string) {
  return parseInt(cost.replace(/\D/g, ""), 10) || 0;
}

function allWorkOrders() {
  const demo = demoWorkOrders.map((wo) => ({
    ...wo,
    status: getWorkOrderStatusOverride(wo.id) ?? wo.status,
  }));
  return [...listStoredWorkOrders(), ...demo];
}

function vendorStats(vendorName: string) {
  const orders = allWorkOrders().filter((wo) => wo.vendor === vendorName);
  return {
    openWorkOrders: orders.filter((wo) => wo.status !== "resolved").length,
    totalSpendInr: orders.reduce((sum, wo) => sum + parseCostInr(wo.cost), 0),
  };
}

export function validateCreateVendorInput(body: unknown): CreateVendorInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const type = String(data.type ?? "").trim() || "Maintenance";
  const city = String(data.city ?? "").trim();
  const contact = String(data.contact ?? "").trim();

  if (!name) return { error: "Vendor name is required." };
  if (!city) return { error: "City is required." };
  if (!contact) return { error: "Contact is required." };

  return { name, type, city, contact };
}

export async function listVendors(q?: string): Promise<VendorRecord[]> {
  const stored = listStoredVendors().map((v) => ({ ...v, ...vendorStats(v.name) }));
  const demo = demoVendors.map((v) => ({ ...v, ...vendorStats(v.name) }));
  let vendors = [...stored, ...demo];

  if (q?.trim()) {
    const needle = q.trim().toLowerCase();
    vendors = vendors.filter(
      (v) =>
        v.name.toLowerCase().includes(needle) ||
        v.type.toLowerCase().includes(needle) ||
        v.city.toLowerCase().includes(needle),
    );
  }

  return vendors.sort((a, b) => a.name.localeCompare(b.name));
}

export async function createVendor(input: CreateVendorInput): Promise<VendorRecord> {
  const existing = (await listVendors()).find(
    (v) => v.name.toLowerCase() === input.name.toLowerCase(),
  );
  if (existing) throw new Error(`Vendor "${input.name}" already exists.`);

  const vendor = createStoredVendor(input);
  return { ...vendor, openWorkOrders: 0, totalSpendInr: 0 };
}

export async function getVendor(id: string) {
  const vendor = (await listVendors()).find((v) => v.id === id);
  if (!vendor) return undefined;

  const workOrders = allWorkOrders().filter((wo) => wo.vendor === vendor.name);
  return { vendor, workOrders };
}
