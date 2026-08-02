/**
 * Persisted auth-lite / team-seat login users (beyond hardcoded DEV_USERS).
 * Passwords live only in `user_passwords` (scrypt hashes) — never plaintext here.
 */

import type { SessionUser, UserRole } from "@/lib/auth/types";

export type AuthUserRecord = SessionUser & {
  status: "active" | "disabled";
  createdAt: string;
};

const g = globalThis as typeof globalThis & {
  __tsmAuthUsers?: AuthUserRecord[];
};

function store(): AuthUserRecord[] {
  if (!g.__tsmAuthUsers) g.__tsmAuthUsers = [];
  return g.__tsmAuthUsers;
}

export function listAuthUsers(): AuthUserRecord[] {
  return store().map((u) => ({ ...u }));
}

export function listAuthUsersForOrg(tsmOrgId: string): AuthUserRecord[] {
  const org = tsmOrgId.toLowerCase().trim();
  return store()
    .filter((u) => (u.tsmOrgId ?? "").toLowerCase() === org)
    .map((u) => ({ ...u }));
}

export function countActiveSeatsForOrg(tsmOrgId: string): number {
  return listAuthUsersForOrg(tsmOrgId).filter((u) => u.status === "active").length;
}

export function replaceAuthUsers(users: AuthUserRecord[]) {
  g.__tsmAuthUsers = users.map((u) => ({ ...u }));
}

export function getAuthUserByEmail(email: string): AuthUserRecord | undefined {
  const key = email.trim().toLowerCase();
  return store().find((u) => u.email.toLowerCase() === key);
}

export function upsertAuthUser(input: {
  id?: string;
  email: string;
  name: string;
  role: UserRole;
  status?: "active" | "disabled";
  tsmOrgId?: string | null;
  orgUserId?: string | null;
  supplierId?: string | null;
  authSource?: SessionUser["authSource"];
}): AuthUserRecord {
  const email = input.email.trim().toLowerCase();
  const existing = getAuthUserByEmail(email);
  const record: AuthUserRecord = {
    id: input.id ?? existing?.id ?? `u-${email.replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`,
    email,
    name: input.name.trim() || email.split("@")[0],
    role: input.role,
    status: input.status ?? existing?.status ?? "active",
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    authSource: input.authSource ?? existing?.authSource ?? "seat",
    tsmOrgId:
      input.tsmOrgId !== undefined
        ? input.tsmOrgId?.trim() || undefined
        : existing?.tsmOrgId,
    orgUserId:
      input.orgUserId !== undefined
        ? input.orgUserId?.trim() || undefined
        : existing?.orgUserId,
    supplierId:
      input.supplierId !== undefined
        ? input.supplierId?.trim() || undefined
        : existing?.supplierId,
  };
  const next = store().filter((u) => u.email.toLowerCase() !== email);
  next.push(record);
  g.__tsmAuthUsers = next;
  return { ...record };
}
