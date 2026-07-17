import { listInvoices } from "@/lib/billing/invoice-repository";
import { getOrgProfile } from "@/lib/settings/org-repository";
import { getSyncStatus } from "@/lib/data/shipment-repository";

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

  const configured = process.env.TALLY_COMPANY_NAME || process.env.TALLY_EXPORT_ENABLED === "1";

  return {
    status: configured ? "connected" : "not_configured",
    exportFormat: "XML (Tally Prime)",
    lastExport: configured
      ? sync.lastSyncAt
        ? new Date(sync.lastSyncAt).toLocaleString("en-IN")
        : "Never"
      : "—",
    invoiceCount: invoices.length,
    pendingCount: invoices.filter((i) => i.status === "pending").length,
    gstin: org.gstin,
    companyName: process.env.TALLY_COMPANY_NAME ?? org.name,
  };
}
