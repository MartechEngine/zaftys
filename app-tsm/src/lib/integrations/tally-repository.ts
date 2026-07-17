import { listInvoices } from "@/lib/billing/invoice-repository";
import { getOrgProfile } from "@/lib/settings/org-repository";
import { getSyncStatus } from "@/lib/data/shipment-repository";
import {
  configureTallyLocal,
  isTallyConfiguredLocally,
} from "@/lib/mutations/fleet-entity-store";
import {
  getTallyLastExport,
  recordTallyExport,
} from "@/lib/mutations/sprint13-store";

export type TallyExportStatus = {
  status: "connected" | "not_configured";
  exportFormat: string;
  lastExport: string;
  invoiceCount: number;
  pendingCount: number;
  gstin: string;
  companyName: string;
};

export async function getTallyExportStatus(): Promise<TallyExportStatus> {
  const [invoices, org, sync] = await Promise.all([
    listInvoices(),
    getOrgProfile(),
    getSyncStatus(),
  ]);

  const configured =
    isTallyConfiguredLocally() ||
    Boolean(process.env.TALLY_COMPANY_NAME) ||
    process.env.TALLY_EXPORT_ENABLED === "1";

  const localExport = getTallyLastExport();

  return {
    status: configured ? "connected" : "not_configured",
    exportFormat: "CSV (invoices)",
    lastExport: localExport
      ? new Date(localExport).toLocaleString("en-IN")
      : configured
        ? sync.lastSyncAt
          ? new Date(sync.lastSyncAt).toLocaleString("en-IN")
          : "Just now"
        : "—",
    invoiceCount: invoices.length,
    pendingCount: invoices.filter((i) => i.status === "pending").length,
    gstin: org.gstin,
    companyName: process.env.TALLY_COMPANY_NAME ?? org.name,
  };
}

export async function configureTally() {
  configureTallyLocal();
  return getTallyExportStatus();
}

export function buildTallyInvoiceCsv(
  invoices: Awaited<ReturnType<typeof listInvoices>>,
): string {
  const header = "number,client,subtotal_inr,gst_inr,amount_inr,status,due\n";
  const rows = invoices
    .map(
      (i) =>
        `${i.number},${JSON.stringify(i.client)},${i.subtotalInr},${i.gstInr},${i.amountInr},${i.status},${JSON.stringify(i.due)}`,
    )
    .join("\n");
  return header + rows + (rows ? "\n" : "");
}

export async function exportTallyNow() {
  if (!isTallyConfiguredLocally()) {
    configureTallyLocal();
  }
  const invoices = await listInvoices();
  const exportMeta = recordTallyExport();
  const status = await getTallyExportStatus();
  const csv = buildTallyInvoiceCsv(invoices);
  return {
    ...status,
    exportedAt: exportMeta.exportedAt,
    exportCount: exportMeta.exportCount,
    invoiceCount: invoices.length,
    csv,
  };
}
