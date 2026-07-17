import { getSession } from "@/lib/auth/session";
import {
  clearPasswordHash,
  getPasswordHash,
  hydratePasswordHashes,
  setPasswordHash,
  verifyPasswordHash,
} from "@/lib/auth/password-store";
import { DEV_USERS, verifyDevCredentials } from "@/lib/auth/users";
import { recordPasswordChange } from "@/lib/mutations/sprint12-store";
import { getSecuritySettings } from "@/lib/settings/config-repository";
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
  const currentPassword = String(data.currentPassword ?? "");
  const newPassword = String(data.newPassword ?? "").trim();

  const security = await getSecuritySettings();
  const minLen = Math.max(6, Number(security.passwordMinLength) || 12);

  if (!currentPassword) {
    return apiError("VALIDATION_ERROR", "currentPassword is required.", 400);
  }

  const devUser = DEV_USERS.find(
    (u) => u.email.toLowerCase() === session.email.toLowerCase(),
  );
  const restoringDefault = Boolean(devUser && newPassword === devUser.password);

  if (!newPassword || (!restoringDefault && newPassword.length < minLen)) {
    return apiError(
      "VALIDATION_ERROR",
      `newPassword must be at least ${minLen} characters.`,
    );
  }

  await hydratePasswordHashes();
  const override = getPasswordHash(session.email);
  if (override) {
    if (!verifyPasswordHash(currentPassword, override)) {
      return apiError("INVALID_CREDENTIALS", "Current password is incorrect.", 401);
    }
  } else {
    const ok = await verifyDevCredentials(session.email, currentPassword);
    if (!ok) {
      return apiError("INVALID_CREDENTIALS", "Current password is incorrect.", 401);
    }
  }

  if (restoringDefault) {
    await clearPasswordHash(session.email);
  } else {
    await setPasswordHash(session.email, newPassword);
  }
  const result = recordPasswordChange();
  return apiSuccess({
    ok: true,
    minLength: minLen,
    restoredDefault: restoringDefault,
    ...result,
  });
}
