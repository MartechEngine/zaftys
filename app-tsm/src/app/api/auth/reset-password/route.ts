import { setPasswordHash } from "@/lib/auth/password-store";
import { recordPasswordResetComplete } from "@/lib/mutations/sprint16-store";
import { getSecuritySettings } from "@/lib/settings/config-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as { email?: string; password?: string; confirmPassword?: string };
  const email = String(data.email ?? "").trim().toLowerCase();
  const password = String(data.password ?? "");
  const confirmPassword = String(data.confirmPassword ?? "");

  const security = await getSecuritySettings();
  const minLen = Math.max(6, Number(security.passwordMinLength) || 12);

  if (!email || !email.includes("@")) {
    return apiError("VALIDATION_ERROR", "Valid email is required.");
  }
  if (password.length < minLen) {
    return apiError(
      "VALIDATION_ERROR",
      `Password must be at least ${minLen} characters.`,
    );
  }
  if (password !== confirmPassword) {
    return apiError("VALIDATION_ERROR", "Passwords do not match.");
  }

  await setPasswordHash(email, password);
  const row = recordPasswordResetComplete(email);
  return apiSuccess({
    email: row.email,
    completedAt: row.completedAt,
    local: true,
    message: "Password updated for local sign-in.",
  });
}
