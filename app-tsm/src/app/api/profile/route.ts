import { getSession, createSessionToken, sessionCookieOptions } from "@/lib/auth/session";
import { updateProfileOverlay, applyProfileOverlay } from "@/lib/auth/profile-store";
import { apiError, apiSuccess } from "@/lib/api-response";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);
  const { exp: _, ...user } = session;
  return apiSuccess(user);
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const b = body as { name?: string; phone?: string };
  const name = typeof b.name === "string" ? b.name.trim() : undefined;
  const phone = typeof b.phone === "string" ? b.phone.trim() : undefined;

  if (name !== undefined && !name) {
    return apiError("VALIDATION_ERROR", "Name cannot be empty.", 400);
  }

  updateProfileOverlay(session.id, {
    ...(name !== undefined ? { name } : {}),
    ...(phone !== undefined ? { phone } : {}),
  });

  const updated = applyProfileOverlay({
    id: session.id,
    email: session.email,
    name: name ?? session.name,
    role: session.role,
    phone,
  });

  const token = createSessionToken(updated);
  const response = NextResponse.json({
    data: updated,
    meta: { timestamp: new Date().toISOString() },
  });
  response.cookies.set(sessionCookieOptions(token));
  return response;
}
