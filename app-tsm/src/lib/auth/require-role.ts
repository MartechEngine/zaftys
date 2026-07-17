import { getSession } from "@/lib/auth/session";
import type { SessionPayload, UserRole } from "@/lib/auth/types";
import { apiError } from "@/lib/api-response";
import type { NextResponse } from "next/server";

const DISPATCHER_OR_ADMIN: UserRole[] = ["admin", "dispatcher"];

/** Gate mutating network listing/offer routes — permissive in dev when role is absent. */
export async function requireDispatcherOrAdmin(): Promise<
  { ok: true; session: SessionPayload | null } | { ok: false; response: NextResponse }
> {
  const session = await getSession();
  if (!session) {
    return { ok: true, session: null };
  }
  if (DISPATCHER_OR_ADMIN.includes(session.role)) {
    return { ok: true, session };
  }
  if (process.env.NODE_ENV !== "production") {
    return { ok: true, session };
  }
  return {
    ok: false,
    response: apiError(
      "FORBIDDEN",
      "Dispatcher or admin role required for this action.",
      403,
    ),
  };
}
