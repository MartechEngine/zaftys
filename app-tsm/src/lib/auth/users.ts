import type { SessionUser } from "@/lib/auth/types";
import { defaultRouteForRole } from "@/lib/navigation";
import {
  getPasswordHash,
  hydratePasswordHashes,
  verifyPasswordHash,
} from "@/lib/auth/password-store";
import {
  getAuthUserByEmail,
  listAuthUsers,
  type AuthUserRecord,
} from "@/lib/auth/auth-users-store";
import { ensureAuthUsersHydrated } from "@/lib/db/domain-persistence";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { canPublishToTranzfort } from "@/lib/tsm/org";

/** Dev-only users — replace with DB / Fleetbase org users in production */
export const DEV_USERS: Array<SessionUser & { password: string }> = [
  {
    id: "u-admin",
    email: "admin@zaftys.com",
    name: "Admin",
    role: "admin",
    password: "dev",
    authSource: "auth_lite",
  },
  {
    id: "u-dispatcher",
    email: "dispatcher@zaftys.com",
    name: "Dispatcher",
    role: "dispatcher",
    password: "dev",
    authSource: "auth_lite",
  },
  {
    id: "u-fleet",
    email: "fleet@zaftys.com",
    name: "Fleet Manager",
    role: "fleet_manager",
    password: "dev",
    authSource: "auth_lite",
  },
  {
    id: "u-client",
    email: "client@acme.com",
    name: "Acme Client",
    role: "client",
    password: "dev",
    authSource: "auth_lite",
  },
];

function toSessionUser(user: SessionUser): SessionUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone,
    authSource: user.authSource,
    tsmOrgId: user.tsmOrgId,
    orgUserId: user.orgUserId,
    supplierId: user.supplierId,
    tzUserId: user.tzUserId,
    verificationStatus: user.verificationStatus,
    canPublishToTranzfort: user.canPublishToTranzfort,
  };
}

/** Enrich seat / auth-lite session with org supplier when tsmOrgId is known. */
export async function enrichSeatSession(user: SessionUser): Promise<SessionUser> {
  const base = toSessionUser(user);
  if (!base.tsmOrgId && base.authSource !== "seat") {
    return {
      ...base,
      authSource: base.authSource ?? "auth_lite",
      canPublishToTranzfort:
        base.canPublishToTranzfort ?? canPublishToTranzfort(base.role),
    };
  }

  const org = await getOrgAccountForSession(base);
  const authSource = base.authSource ?? (base.tsmOrgId ? "seat" : "auth_lite");
  return {
    ...base,
    authSource,
    tsmOrgId: base.tsmOrgId || org.id,
    supplierId: base.supplierId || org.tranzfortSupplierId,
    canPublishToTranzfort:
      base.canPublishToTranzfort ?? canPublishToTranzfort(base.role),
  };
}

function findLoginCandidate(email: string): {
  user: SessionUser;
  defaultPassword?: string;
  requireHash: boolean;
} | null {
  const key = email.trim().toLowerCase();
  const persisted = getAuthUserByEmail(key);
  if (persisted) {
    if (persisted.status !== "active") return null;
    return {
      user: toSessionUser({
        ...persisted,
        authSource: persisted.authSource ?? "seat",
      }),
      requireHash: true,
    };
  }
  const dev = DEV_USERS.find((u) => u.email.toLowerCase() === key);
  if (!dev) return null;
  const { password, ...sessionUser } = dev;
  return { user: sessionUser, defaultPassword: password, requireHash: false };
}

/**
 * Verify credentials: password hash (if set) wins; else DEV_USERS default password.
 * Persisted auth_users always require a password hash.
 */
export async function verifyDevCredentials(email: string, password: string) {
  await ensureAuthUsersHydrated();
  await hydratePasswordHashes();

  const candidate = findLoginCandidate(email);
  if (!candidate) return null;

  const override = getPasswordHash(email);
  if (override) {
    if (!verifyPasswordHash(password, override)) return null;
    return enrichSeatSession(candidate.user);
  }

  if (candidate.requireHash) return null;
  if (candidate.defaultPassword !== password) return null;
  return enrichSeatSession(candidate.user);
}

export function getDefaultRoute(role: SessionUser["role"]) {
  return defaultRouteForRole(role);
}

export function listKnownAuthUsers(): Array<SessionUser | AuthUserRecord> {
  return [...DEV_USERS.map(({ password: _, ...u }) => u), ...listAuthUsers()];
}
