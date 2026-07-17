import type { SessionUser } from "@/lib/auth/types";
import { defaultRouteForRole } from "@/lib/navigation";
import {
  getPasswordHash,
  hydratePasswordHashes,
  verifyPasswordHash,
} from "@/lib/auth/password-store";

/** Dev-only users — replace with DB / Fleetbase org users in production */
export const DEV_USERS: Array<SessionUser & { password: string }> = [
  {
    id: "u-admin",
    email: "admin@zaftys.com",
    name: "Admin",
    role: "admin",
    password: "dev",
  },
  {
    id: "u-dispatcher",
    email: "dispatcher@zaftys.com",
    name: "Dispatcher",
    role: "dispatcher",
    password: "dev",
  },
  {
    id: "u-fleet",
    email: "fleet@zaftys.com",
    name: "Fleet Manager",
    role: "fleet_manager",
    password: "dev",
  },
  {
    id: "u-client",
    email: "client@acme.com",
    name: "Acme Client",
    role: "client",
    password: "dev",
  },
];

function toSessionUser(user: SessionUser & { password: string }): SessionUser {
  const { password: _, ...sessionUser } = user;
  return sessionUser;
}

/**
 * Verify credentials: override scrypt hash (if set) wins; otherwise default password `dev`.
 */
export async function verifyDevCredentials(email: string, password: string) {
  await hydratePasswordHashes();
  const user = DEV_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;

  const override = getPasswordHash(email);
  if (override) {
    if (!verifyPasswordHash(password, override)) return null;
    return toSessionUser(user);
  }

  if (user.password !== password) return null;
  return toSessionUser(user);
}

export function getDefaultRoute(role: SessionUser["role"]) {
  return defaultRouteForRole(role);
}
