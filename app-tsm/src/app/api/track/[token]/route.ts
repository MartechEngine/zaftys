import { getShipmentByToken } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const limited = rateLimit(`track:${ip}`, 60, 60_000);
  if (!limited.ok) {
    return apiError(
      "RATE_LIMITED",
      `Too many requests. Retry in ${limited.retryAfterSec}s.`,
      429,
    );
  }

  const { token } = await params;
  const shipment = await getShipmentByToken(decodeURIComponent(token));
  if (!shipment) {
    return apiError("TRACK_TOKEN_INVALID", "This tracking link is invalid or expired.", 404);
  }

  return apiSuccess({
    publicId: shipment.publicId,
    status: shipment.status,
    origin: shipment.origin,
    destination: shipment.destination,
    commodity: shipment.commodity,
    tonnageMt: shipment.tonnageMt,
    eta: shipment.eta,
    documents: shipment.documents.filter((d) => d.type === "epod"),
    geo: shipment.geo,
  });
}
