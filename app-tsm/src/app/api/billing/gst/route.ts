import { getGstSummary } from "@/lib/billing/rates-repository";
import { listInvoices } from "@/lib/billing/invoice-repository";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const format = new URL(request.url).searchParams.get("format");
  if (format === "csv") {
    const invoices = await listInvoices();
    const header = "number,client,subtotal_inr,gst_inr,amount_inr,status,due\n";
    const rows = invoices
      .map(
        (i) =>
          `${i.number},${JSON.stringify(i.client)},${i.subtotalInr},${i.gstInr},${i.amountInr},${i.status},${JSON.stringify(i.due)}`,
      )
      .join("\n");
    return new Response(header + rows + "\n", {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="gst-export.csv"',
      },
    });
  }
  return apiSuccess(await getGstSummary());
}
