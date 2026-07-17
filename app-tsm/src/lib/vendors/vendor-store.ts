import { logActivity } from "@/lib/dev-store";

export type StoredVendor = {
  id: string;
  name: string;
  type: string;
  city: string;
  contact: string;
};

const g = globalThis as typeof globalThis & {
  __tsmDevVendors?: StoredVendor[];
};

function getStore(): StoredVendor[] {
  if (!g.__tsmDevVendors) g.__tsmDevVendors = [];
  return g.__tsmDevVendors;
}

export function listStoredVendors(): StoredVendor[] {
  return [...getStore()];
}

export function createStoredVendor(input: {
  name: string;
  type: string;
  city: string;
  contact: string;
}): StoredVendor {
  const vendor: StoredVendor = {
    id: `vnd-${Date.now().toString(36)}`,
    name: input.name.trim(),
    type: input.type.trim(),
    city: input.city.trim(),
    contact: input.contact.trim(),
  };
  getStore().unshift(vendor);
  logActivity({
    shipmentId: "",
    type: "vendor.created",
    message: `Vendor ${vendor.name} · ${vendor.type}`,
    timestamp: new Date().toISOString(),
  });
  return vendor;
}
