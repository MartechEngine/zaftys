import {
  getDriverInvite,
  resendNavigatorInvite,
} from "@/lib/fleet/invite-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const invite = await getDriverInvite(id);
  if (!invite) return apiError("DRIVER_NOT_FOUND", "Driver not found.", 404);
  return apiSuccess(invite);
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const invite = await resendNavigatorInvite(id);
  if (!invite) return apiError("DRIVER_NOT_FOUND", "Driver not found.", 404);
  return apiSuccess(invite);
}
