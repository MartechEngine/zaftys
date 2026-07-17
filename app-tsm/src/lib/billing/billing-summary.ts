import { listInvoices, type InvoiceRecord } from "@/lib/billing/invoice-repository";
import { demoServiceRates } from "@/lib/demo-data";

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export type BillingSummary = {
  invoiceCount: number;
  pendingCount: number;
  paidCount: number;
  pendingTotal: string;
  paidTotal: string;
  pendingTotalInr: number;
  paidTotalInr: number;
  rateRuleCount: number;
  recentInvoices: InvoiceRecord[];
};

export async function getBillingSummary(): Promise<BillingSummary> {
  const invoices = await listInvoices();
  const pending = invoices.filter((i) => i.status === "pending");
  const paid = invoices.filter((i) => i.status === "paid");
  const pendingTotalInr = pending.reduce((sum, i) => sum + i.amountInr, 0);
  const paidTotalInr = paid.reduce((sum, i) => sum + i.amountInr, 0);

  return {
    invoiceCount: invoices.length,
    pendingCount: pending.length,
    paidCount: paid.length,
    pendingTotal: formatInr(pendingTotalInr),
    paidTotal: formatInr(paidTotalInr),
    pendingTotalInr,
    paidTotalInr,
    rateRuleCount: demoServiceRates.length,
    recentInvoices: invoices.slice(0, 5),
  };
}
