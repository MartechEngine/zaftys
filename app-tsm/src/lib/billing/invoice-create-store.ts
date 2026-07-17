import { logActivity } from "@/lib/dev-store";
import type { InvoiceRecord, InvoiceLineItem } from "@/lib/billing/invoice-repository";

const g = globalThis as typeof globalThis & {
  __tsmDevInvoices?: InvoiceRecord[];
};

function getStore(): InvoiceRecord[] {
  if (!g.__tsmDevInvoices) g.__tsmDevInvoices = [];
  return g.__tsmDevInvoices;
}

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function listStoredInvoices(): InvoiceRecord[] {
  return [...getStore()];
}

export function createStoredInvoice(input: {
  client: string;
  description: string;
  subtotalInr: number;
  dueDays?: number;
}): InvoiceRecord {
  const subtotalInr = Math.round(input.subtotalInr);
  const gstInr = Math.round(subtotalInr * 0.18);
  const amountInr = subtotalInr + gstInr;
  const due = new Date();
  due.setDate(due.getDate() + (input.dueDays ?? 15));

  const lineItems: InvoiceLineItem[] = [
    {
      description: input.description.trim(),
      amount: formatInr(subtotalInr),
      amountInr: subtotalInr,
    },
  ];

  const invoice: InvoiceRecord = {
    id: `inv-${Date.now().toString(36)}`,
    number: `INV-2026-${String(Date.now()).slice(-4)}`,
    client: input.client.trim(),
    amount: formatInr(amountInr),
    amountInr,
    gst: formatInr(gstInr),
    gstInr,
    subtotalInr,
    status: "pending",
    due: due.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    lineItems,
  };

  getStore().unshift(invoice);
  logActivity({
    shipmentId: "",
    type: "invoice.created",
    message: `${invoice.number} · ${invoice.client} · ${invoice.amount}`,
    timestamp: new Date().toISOString(),
  });
  return invoice;
}
