import type { ShipmentRecord } from "@/lib/dev-store";
import { demoInvoices } from "@/lib/demo-data";
import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import {
  getInvoiceStatusOverride,
  setInvoiceStatus,
} from "@/lib/billing/invoice-store";
import {
  createStoredInvoice,
  listStoredInvoices,
} from "@/lib/billing/invoice-create-store";
import {
  ensureBillingHydrated,
  persistInvoice,
  persistInvoiceStatus,
} from "@/lib/db/domain-persistence";

export type InvoiceLineItem = {
  description: string;
  amount: string;
  amountInr: number;
};

export type InvoiceRecord = {
  id: string;
  number: string;
  client: string;
  amount: string;
  amountInr: number;
  gst: string;
  gstInr: number;
  subtotalInr: number;
  status: "pending" | "paid";
  due: string;
  shipmentId?: string;
  lineItems: InvoiceLineItem[];
};

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function freightSubtotal(tonnageMt: number) {
  return tonnageMt * 420;
}

function formatDueFromIso(iso: string) {
  const d = new Date(iso);
  d.setDate(d.getDate() + 14);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function invoiceFromShipment(s: ShipmentRecord): InvoiceRecord {
  const subtotalInr = freightSubtotal(s.tonnageMt);
  const gstInr = Math.round(subtotalInr * 0.18);
  const amountInr = subtotalInr + gstInr;
  const suffix = s.publicId.replace(/\D/g, "").slice(-4).padStart(4, "0");

  return {
    id: `inv-${s.id}`,
    number: `INV-2026-${suffix}`,
    client: s.client,
    amount: formatInr(amountInr),
    amountInr,
    gst: formatInr(gstInr),
    gstInr,
    subtotalInr,
    status: "pending",
    due: formatDueFromIso(s.updatedAt),
    shipmentId: s.id,
    lineItems: [
      {
        description: `${s.origin} → ${s.destination} · ${s.commodity} ${s.tonnageMt} MT`,
        amount: formatInr(subtotalInr),
        amountInr: subtotalInr,
      },
    ],
  };
}

const DEMO_LINE_ITEMS: Record<string, InvoiceLineItem[]> = {
  inv1: [
    { description: "Amravati → Mumbai · Cement 32 MT", amount: "₹1,02,400", amountInr: 102400 },
    { description: "Loading charges", amount: "₹8,000", amountInr: 8000 },
    { description: "Detention (2h)", amount: "₹14,400", amountInr: 14400 },
  ],
  inv2: [
    { description: "Wardha → Pune · FMCG 15 MT", amount: "₹68,400", amountInr: 68400 },
    { description: "Fuel surcharge", amount: "₹18,000", amountInr: 18000 },
  ],
  inv3: [
    { description: "Nagpur → Hyderabad · Steel 28 MT", amount: "₹1,86,000", amountInr: 186000 },
    { description: "Weighbridge fee", amount: "₹24,000", amountInr: 24000 },
  ],
};

function demoToRecord(d: (typeof demoInvoices)[number]): InvoiceRecord {
  const lines = DEMO_LINE_ITEMS[d.id] ?? [
    { description: "Freight charges", amount: d.amount, amountInr: 0 },
  ];
  const subtotalInr = lines.reduce((sum, l) => sum + l.amountInr, 0);
  const gstInr = Math.round(subtotalInr * 0.18) || parseInt(d.gst.replace(/\D/g, ""), 10) || 0;
  const amountInr = subtotalInr + gstInr || parseInt(d.amount.replace(/\D/g, ""), 10) || 0;

  return {
    id: d.id,
    number: d.number,
    client: d.client,
    amount: d.amount,
    amountInr,
    gst: d.gst,
    gstInr,
    subtotalInr: subtotalInr || amountInr - gstInr,
    status: d.status,
    due: d.due,
    lineItems: lines,
  };
}

export type CreateInvoiceInput = {
  client: string;
  description: string;
  subtotalInr: number;
  dueDays?: number;
};

export function validateCreateInvoiceInput(
  body: unknown,
): CreateInvoiceInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const client = String(data.client ?? "").trim();
  const description = String(data.description ?? "").trim();
  const subtotalInr = Number(data.subtotalInr ?? data.amount ?? 0);
  if (!client) return { error: "Client is required." };
  if (!description) return { error: "Description is required." };
  if (!Number.isFinite(subtotalInr) || subtotalInr <= 0) {
    return { error: "Subtotal must be a positive number." };
  }
  const dueDays = data.dueDays !== undefined ? Number(data.dueDays) : undefined;
  return {
    client,
    description,
    subtotalInr,
    dueDays: dueDays && Number.isFinite(dueDays) ? dueDays : undefined,
  };
}

export async function createInvoice(input: CreateInvoiceInput): Promise<InvoiceRecord> {
  await ensureBillingHydrated();
  const invoice = createStoredInvoice(input);
  await persistInvoice(invoice);
  return invoice;
}

export async function listInvoices(): Promise<InvoiceRecord[]> {
  await ensureBillingHydrated();
  const shipments = await fetchAllShipmentsRaw();
  const stored = listStoredInvoices();
  const demo = demoInvoices.map(demoToRecord);
  const demoClients = new Set(demo.map((d) => d.client));

  const generated = shipments
    .filter((s) => s.status === "delivered" && !demoClients.has(s.client))
    .map(invoiceFromShipment);

  return [...stored, ...demo, ...generated]
    .map((inv) => {
      const override = getInvoiceStatusOverride(inv.id);
      return override ? { ...inv, status: override } : inv;
    })
    .sort((a, b) => b.number.localeCompare(a.number));
}

export async function getInvoice(id: string): Promise<InvoiceRecord | undefined> {
  await ensureBillingHydrated();
  const invoices = await listInvoices();
  return invoices.find((i) => i.id === id);
}

export async function updateInvoiceStatus(
  id: string,
  status: "pending" | "paid",
): Promise<InvoiceRecord | undefined> {
  await ensureBillingHydrated();
  const invoice = await getInvoice(id);
  if (!invoice) return undefined;
  setInvoiceStatus(id, status);
  await persistInvoiceStatus(id, status);
  return { ...invoice, status };
}
