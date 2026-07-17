import { listShipments } from "@/lib/data/shipment-repository";

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
  const tab = searchParams.get("tab") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const client = searchParams.get("client") ?? undefined;
  const origin = searchParams.get("origin") ?? undefined;
  const destination = searchParams.get("destination") ?? undefined;
  const source = searchParams.get("source") ?? undefined;

  const shipments = await listShipments({
    tab,
    status,
    q,
    client,
    origin,
    destination,
    source,
  });

  const header = [
    "public_id",
    "client",
    "origin",
    "destination",
    "commodity",
    "tonnage_mt",
    "status",
    "source",
    "driver",
    "vehicle",
    "eta",
    "lr_number",
  ];

  const rows = shipments.map((s) =>
    [
      s.publicId,
      s.client,
      s.origin,
      s.destination,
      s.commodity,
      s.tonnageMt,
      s.status,
      s.originType,
      s.driver,
      s.vehicle,
      s.eta,
      s.lrNumber,
    ]
      .map(csvEscape)
      .join(","),
  );

  const csv = [header.join(","), ...rows].join("\n");
  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="shipments-${stamp}.csv"`,
    },
  });
}
