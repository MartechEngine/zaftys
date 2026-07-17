import {
  acceptNetworkOverflow,
  rejectNetworkOverflow,
  reviewNetworkOverflow,
} from "@/lib/data/overflow-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string; action: string }> },
) {
  const { id, action } = await params;

  if (action === "accept") {
    const result = await acceptNetworkOverflow(id);
    if (!result) {
      return apiError("ACCEPT_FAILED", "Could not accept overflow load.", 404);
    }
    return apiSuccess(result);
  }

  if (action === "reject") {
    const load = await rejectNetworkOverflow(id);
    if (!load) {
      return apiError("REJECT_FAILED", "Could not reject overflow load.", 404);
    }
    return apiSuccess({ load });
  }

  if (action === "review") {
    const load = await reviewNetworkOverflow(id);
    if (!load) {
      return apiError("REVIEW_FAILED", "Could not mark load for review.", 404);
    }
    return apiSuccess({ load });
  }

  return apiError("INVALID_ACTION", "Unknown action.", 400);
}
