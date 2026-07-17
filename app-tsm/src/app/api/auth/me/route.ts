import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return apiError("UNAUTHORIZED", "Not signed in.", 401);
  }
  const { exp: _, ...user } = session;
  return apiSuccess(user);
}
