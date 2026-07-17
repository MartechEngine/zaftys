import { demoParts } from "@/lib/demo-data";
import { logActivity } from "@/lib/dev-store";

const g = globalThis as typeof globalThis & {
  __tsmPartStock?: Record<string, number>;
};

function getStock(): Record<string, number> {
  if (!g.__tsmPartStock) {
    g.__tsmPartStock = Object.fromEntries(demoParts.map((p) => [p.id, p.stock]));
  }
  return g.__tsmPartStock;
}

export function getPartStock(id: string): number | undefined {
  const stock = getStock();
  if (Object.prototype.hasOwnProperty.call(stock, id)) return stock[id];
  return undefined;
}

export function adjustPartStock(id: string, delta: number) {
  const part = demoParts.find((p) => p.id === id);
  if (!part) return undefined;

  const stock = getStock();
  const current = stock[id] ?? part.stock;
  const next = Math.max(0, current + delta);
  stock[id] = next;

  logActivity({
    shipmentId: "",
    type: "parts.adjusted",
    message: `${part.sku} stock ${current} → ${next}`,
    timestamp: new Date().toISOString(),
  });

  return {
    ...part,
    stock: next,
    lowStock: next <= part.reorder,
  };
}
