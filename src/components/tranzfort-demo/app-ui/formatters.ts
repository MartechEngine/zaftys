/** Mirrors marketplace_price_fact_row.dart amount formatting */
export function formatMarketplacePrice(amount: number, priceType: "fixed" | "per_ton" = "fixed"): string {
  if (priceType === "per_ton") {
    return `₹${amount.toLocaleString("en-IN")}/T`;
  }
  if (amount >= 100_000) {
    const v = amount / 100_000;
    return `₹${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}L`;
  }
  if (amount >= 1_000) {
    const v = amount / 1_000;
    return `₹${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}K`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatTyreLabel(tyres: number | number[]): string {
  const list = Array.isArray(tyres) ? [...tyres].sort((a, b) => a - b) : [tyres];
  if (list.length === 0) return "";
  if (list.length === 1) return `${list[0]}W`;
  return list.map((t) => `${t}W`).join("·");
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
