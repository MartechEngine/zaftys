import { getJourneyReplay, listReplayCandidates } from "@/lib/map/replay-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shipmentId = searchParams.get("shipmentId") ?? undefined;

  if (shipmentId === "list") {
    return apiSuccess(await listReplayCandidates());
  }

  const replay = await getJourneyReplay(shipmentId);
  if (!replay) {
    return apiError("REPLAY_NOT_FOUND", "No delivered shipment available for replay.", 404);
  }

  return apiSuccess(replay);
}
