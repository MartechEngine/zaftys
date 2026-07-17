import { demoGstSummary, demoServiceRates } from "@/lib/demo-data";
import { listInvoices } from "@/lib/billing/invoice-repository";
import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import { createStoredRate, listStoredRates } from "@/lib/billing/rates-store";

export type ServiceRate = {
  id: string;
  name: string;
  basis: string;
  rate: string;
  minCharge: string;
  shipmentCount: number;
};

export type CreateServiceRateInput = {
  name: string;
  basis: string;
  rate: string;
  minCharge?: string;
};

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function rateMatchesShipment(
  rate: { id: string; name: string },
  shipment: { origin: string; destination: string; commodity: string; originType: string },
) {
  const name = rate.name.toLowerCase();
  if (rate.id === "sr3" || name.includes("overflow")) return shipment.originType === "network";
  if (name.includes("cement")) return shipment.commodity.toLowerCase().includes("cement");
  if (name.includes("amravati") && name.includes("nagpur")) {
    return (
      shipment.origin.toLowerCase().includes("amravati") &&
      shipment.destination.toLowerCase().includes("nagpur")
    );
  }
  if (name.includes("nagpur") && name.includes("pune")) {
    return (
      shipment.origin.toLowerCase().includes("nagpur") &&
      shipment.destination.toLowerCase().includes("pune")
    );
  }
  return false;
}

export function validateCreateServiceRateInput(
  body: unknown,
): CreateServiceRateInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const basis = String(data.basis ?? "").trim();
  const rate = String(data.rate ?? "").trim();
  const minCharge = String(data.minCharge ?? "").trim();

  if (!name) return { error: "Rate name is required." };
  if (!basis) return { error: "Basis is required." };
  if (!rate) return { error: "Rate value is required." };

  return { name, basis, rate, minCharge: minCharge || undefined };
}

export async function listServiceRates(): Promise<ServiceRate[]> {
  const shipments = await fetchAllShipmentsRaw();
  const stored = listStoredRates().map((rate) => ({
    ...rate,
    shipmentCount: shipments.filter((s) => rateMatchesShipment(rate, s)).length,
  }));
  const demo = demoServiceRates.map((rate) => ({
    ...rate,
    shipmentCount: shipments.filter((s) => rateMatchesShipment(rate, s)).length,
  }));
  return [...stored, ...demo];
}

export async function createServiceRate(input: CreateServiceRateInput): Promise<ServiceRate> {
  const rate = createStoredRate(input);
  return { ...rate, shipmentCount: 0 };
}

export async function getServiceRate(id: string) {
  const rate = (await listServiceRates()).find((r) => r.id === id);
  if (!rate) return undefined;

  const shipments = await fetchAllShipmentsRaw();
  const applied = shipments.filter((s) => rateMatchesShipment(rate, s)).slice(0, 5);

  return { rate, appliedShipments: applied };
}

export async function getGstSummary() {
  const invoices = await listInvoices();
  const taxableInr = invoices.reduce((sum, i) => sum + i.subtotalInr, 0);
  const gstInr = invoices.reduce((sum, i) => sum + i.gstInr, 0);
  const halfGst = Math.round(gstInr / 2);

  return {
    period: demoGstSummary.period,
    taxableValue: formatInr(
      taxableInr || parseInt(demoGstSummary.taxableValue.replace(/\D/g, ""), 10),
    ),
    cgst: formatInr(halfGst || parseInt(demoGstSummary.cgst.replace(/\D/g, ""), 10)),
    sgst: formatInr(halfGst || parseInt(demoGstSummary.sgst.replace(/\D/g, ""), 10)),
    igst: demoGstSummary.igst,
    invoiceCount: invoices.length,
    filings: demoGstSummary.filings,
  };
}
