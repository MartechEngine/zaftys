import { listShipments, tickMapGeo } from "@/lib/data/shipment-repository";
import { vehicleMarkersFromShipment } from "@/lib/map-markers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const INTERVAL_MS = 5_000;

async function buildPayload() {
  // Simulated GPS motion only in demo UI — live mode should use telematics ingest later
  if (process.env.TSM_DEMO_UI !== "0") {
    tickMapGeo();
  }
  const active = await listShipments({ tab: "active" });
  const markers = active
    .map((s) =>
      vehicleMarkersFromShipment({
        id: s.id,
        publicId: s.publicId,
        status: s.status,
        vehicle: s.vehicle,
        driver: s.driver,
        geo: s.geo,
      }),
    )
    .filter(Boolean);
  return { markers, at: new Date().toISOString() };
}

/** Server-Sent Events stream for live GPS positions (replaces 30s poll when connected). */
export async function GET(request: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;

      const send = async () => {
        if (closed) return;
        try {
          const payload = await buildPayload();
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        } catch {
          controller.enqueue(
            encoder.encode(`event: error\ndata: ${JSON.stringify({ message: "tick failed" })}\n\n`),
          );
        }
      };

      await send();
      const interval = setInterval(() => void send(), INTERVAL_MS);

      request.signal.addEventListener("abort", () => {
        closed = true;
        clearInterval(interval);
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
