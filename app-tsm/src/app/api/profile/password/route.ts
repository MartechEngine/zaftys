import { getSession } from "@/lib/auth/session";
import { recordPasswordChange } from "@/lib/mutations/sprint12-store";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const data = body as { currentPassword?: string; newPassword?: string };
  const newPassword = String(data.newPassword ?? "").trim();
  if (!newPassword || newPassword.length < 6) {
    return apiError("VALIDATION_ERROR", "newPassword must be at least 6 characters.", 400);
  }

  const result = recordPasswordChange();
  return apiSuccess({ ok: true, ...result });
}
