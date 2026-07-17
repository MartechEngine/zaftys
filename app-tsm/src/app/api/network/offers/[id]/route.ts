import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/api-response";
import {
  acceptNetworkOffer,
  rejectNetworkOffer,
} from "@/lib/network/listing-repository";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("INVALID_JSON", "Invalid JSON body", 400);
  }
  const action =
    body && typeof body === "object"
      ? (body as Record<string, unknown>).action
      : undefined;

  if (action === "accept") {
    const result = await acceptNetworkOffer(id);
    if ("error" in result && result.error) {
      return apiError("OFFER_ERROR", result.error, 400);
    }
    return apiSuccess(result);
  }
  if (action === "reject") {
    const result = await rejectNetworkOffer(id);
    if ("error" in result && result.error) {
      return apiError("OFFER_ERROR", result.error, 400);
    }
    return apiSuccess(result);
  }
  return apiError("VALIDATION", "action must be accept or reject", 400);
}
