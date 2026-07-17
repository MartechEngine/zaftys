import {
  getTallyExportStatus,
  configureTally,
  exportTallyNow,
  buildTallyInvoiceCsv,
} from "@/lib/integrations/tally-repository";
import { listInvoices } from "@/lib/billing/invoice-repository";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const format = new URL(request.url).searchParams.get("format");
  if (format === "csv") {
    const invoices = await listInvoices();
    const csv = buildTallyInvoiceCsv(invoices);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="tally-export.csv"',
      },
    });
  }
  return apiSuccess(await getTallyExportStatus());
}

export async function POST(request: Request) {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    // empty body is fine for configure
  }

  const action = String((body as { action?: string }).action ?? "").trim();
  if (action === "export") {
    const result = await exportTallyNow();
    return new Response(result.csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="tally-export-${new Date().toISOString().slice(0, 10)}.csv"`,
        "X-Tally-Export-Count": String(result.exportCount ?? result.invoiceCount),
      },
    });
  }

  return apiSuccess(await configureTally());
}
