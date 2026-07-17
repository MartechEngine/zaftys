import { demoLedgerAccounts } from "@/lib/demo-data";
import { listInvoices } from "@/lib/billing/invoice-repository";

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

  return enriched;
}
