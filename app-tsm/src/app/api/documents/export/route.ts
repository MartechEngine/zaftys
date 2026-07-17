import { listAllDocuments } from "@/lib/data/shipment-repository";

export const dynamic = "force-dynamic";

function csvEscape(value: string | number | undefined) {
  const s = String(value ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  const type = searchParams.get("type") ?? undefined;

  const documents = await listAllDocuments({
    q,
    type: type && type !== "all" ? type : undefined,
  });

  const header = ["id", "name", "type", "shipment_id", "shipment", "client", "uploaded_at"];
  const rows = documents.map((d) =>
    [
      d.id,
      d.name,
      d.typeLabel,
      d.shipmentId,
      d.shipmentPublicId,
      d.client,
      d.uploadedAt,
    ]
      .map(csvEscape)
      .join(","),
  );

  const csv = [header.join(","), ...rows].join("\n");
  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="documents-${stamp}.csv"`,
    },
  });
}
