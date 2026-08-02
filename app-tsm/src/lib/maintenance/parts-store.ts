import { demoParts } from "@/lib/demo-data";
import { demoSeed } from "@/lib/data/demo-mode";
import { logActivity } from "@/lib/dev-store";
import { getPartMetaPatch } from "@/lib/mutations/sprint18-store";
import { listCreatedParts, upsertCreatedPart } from "@/lib/mutations/sprint17-store";

const g = globalThis as typeof globalThis & {
  __tsmPartStock?: Record<string, number>;
};

function getStock(): Record<string, number> {
  if (!g.__tsmPartStock) {
    g.__tsmPartStock = Object.fromEntries(demoSeed(demoParts).map((p) => [p.id, p.stock]));
  }
  return g.__tsmPartStock;
}

export function replacePartStock(map: Record<string, number>) {
  g.__tsmPartStock = { ...map };
}

export function listPartStockEntries(): { id: string; value: number }[] {
  return Object.entries(getStock()).map(([id, value]) => ({ id, value }));
}

function findPartBase(id: string) {
  const created = listCreatedParts().find((p) => p.id === id);
  if (created) return created;
  return demoSeed(demoParts).find((p) => p.id === id);
}

export function getPartStock(id: string): number | undefined {
  const stock = getStock();
  if (Object.prototype.hasOwnProperty.call(stock, id)) return stock[id];
  const created = listCreatedParts().find((p) => p.id === id);
  if (created) return created.stock;
  return undefined;
}

export function adjustPartStock(id: string, delta: number) {
  const part = findPartBase(id);
  if (!part) return undefined;

  const stock = getStock();
  const current = stock[id] ?? part.stock;
  const next = Math.max(0, current + delta);
  stock[id] = next;

  // Keep created-part row in sync for durability
  if ("sku" in part && listCreatedParts().some((p) => p.id === id)) {
    upsertCreatedPart({ ...part, stock: next });
  }

  const meta = getPartMetaPatch(id);
  const reorder = meta?.reorder ?? part.reorder;
  const location = meta?.location ?? part.location;

  logActivity({
    shipmentId: "",
    type: "parts.adjusted",
    message: `${part.sku} stock ${current} → ${next}`,
    timestamp: new Date().toISOString(),
  });

  return {
    ...part,
    stock: next,
    reorder,
    location,
    lowStock: next <= reorder,
  };
}

export function getPartDisplayMeta(id: string) {
  const part = findPartBase(id);
  if (!part) return undefined;
  const meta = getPartMetaPatch(id);
  const reorder = meta?.reorder ?? part.reorder;
  const location = meta?.location ?? part.location;
  return { reorder, location, lowStock: (getStock()[id] ?? part.stock) <= reorder };
}
