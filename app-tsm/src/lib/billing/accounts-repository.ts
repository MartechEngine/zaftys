import { demoLedgerAccounts } from "@/lib/demo-data";
import { listInvoices } from "@/lib/billing/invoice-repository";
import { listStoredLedgerAccounts } from "@/lib/mutations/sprint15-store";

export type LedgerAccount = {
  id: string;
  code: string;
  name: string;
  type: "Income" | "Expense" | "Asset" | "Liability";
  balance: string;
  balanceInr: number;
};

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export async function listLedgerAccounts(): Promise<LedgerAccount[]> {
  const invoices = await listInvoices();
  const freightRevenue = invoices.reduce((sum, i) => sum + i.subtotalInr, 0);
  const gstCollected = invoices.reduce((sum, i) => sum + i.gstInr, 0);
  const overflowRevenue = invoices
    .filter((i) => i.lineItems.some((l) => l.description.toLowerCase().includes("overflow")))
    .reduce((sum, i) => sum + i.subtotalInr, 0);

  const enriched: LedgerAccount[] = demoLedgerAccounts.map((account) => {
    if (account.id === "la1" && freightRevenue > 0) {
      const balanceInr = freightRevenue;
      return { ...account, type: account.type as LedgerAccount["type"], balance: formatInr(balanceInr), balanceInr };
    }
    if (account.id === "la2" && overflowRevenue > 0) {
      const balanceInr = overflowRevenue || 320_000;
      return { ...account, type: account.type as LedgerAccount["type"], balance: formatInr(balanceInr), balanceInr };
    }
    const balanceInr = parseInt(account.balance.replace(/[^\d]/g, ""), 10) || 0;
    return { ...account, type: account.type as LedgerAccount["type"], balanceInr };
  });

  if (gstCollected > 0) {
    enriched.push({
      id: "la-gst",
      code: "2200",
      name: "GST payable (output)",
      type: "Liability",
      balance: formatInr(gstCollected),
      balanceInr: gstCollected,
    });
  }

  return [...listStoredLedgerAccounts(), ...enriched];
}

export function validateCreateLedgerAccountInput(
  body: unknown,
): { code: string; name: string; type: LedgerAccount["type"] } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const code = String(data.code ?? "").trim();
  const name = String(data.name ?? "").trim();
  const type = String(data.type ?? "").trim() as LedgerAccount["type"];
  if (!code) return { error: "Account code is required." };
  if (!name) return { error: "Account name is required." };
  if (!["Income", "Expense", "Asset", "Liability"].includes(type)) {
    return { error: "Invalid account type." };
  }
  return { code, name, type };
}

export async function createLedgerAccount(input: {
  code: string;
  name: string;
  type: LedgerAccount["type"];
}) {
  const { createStoredLedgerAccount } = await import("@/lib/mutations/sprint15-store");
  return createStoredLedgerAccount(input);
}
