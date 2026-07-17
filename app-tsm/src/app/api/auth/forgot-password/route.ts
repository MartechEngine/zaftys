import { recordPasswordResetRequest } from "@/lib/mutations/sprint15-store";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const email = String((body as { email?: string }).email ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return apiError("VALIDATION_ERROR", "Valid email is required.");
  }

  const row = recordPasswordResetRequest(email);
  return apiSuccess({ email: row.email, requestedAt: row.requestedAt });
}
