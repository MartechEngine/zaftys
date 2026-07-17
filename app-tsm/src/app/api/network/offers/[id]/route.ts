import { NextRequest } from "next/server";
import { requireDispatcherOrAdmin } from "@/lib/auth/require-role";
import { apiError, apiSuccess } from "@/lib/api-response";
import {
  acceptNetworkOffer,
  rejectNetworkOffer,
} from "@/lib/network/listing-repository";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const auth = await requireDispatcherOrAdmin();
  if (!auth.ok) return auth.response;

  const { id } = await ctx.params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("INVALID_JSON", "Invalid JSON body", 400);
  }
  const record =
    body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const action = record.action;
  const reason = typeof record.reason === "string" ? record.reason : undefined;

  if (action === "accept") {
    const result = await acceptNetworkOffer(id);
    if ("error" in result && result.error) {
      return apiError("OFFER_ERROR", result.error, 400);
    }
    return apiSuccess(result);
  }
  if (action === "reject") {
    const result = await rejectNetworkOffer(id, reason);
    if ("error" in result && result.error) {
      return apiError("OFFER_ERROR", result.error, 400);
    }
    return apiSuccess(result);
  }
  return apiError("VALIDATION", "action must be accept or reject", 400);
}
