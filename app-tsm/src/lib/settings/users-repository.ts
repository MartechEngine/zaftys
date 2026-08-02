import { demoUsers } from "@/lib/demo-data";
import { demoSeed } from "@/lib/data/demo-mode";
import {
  inviteStoredOrgUser,
  listStoredOrgUsers,
} from "@/lib/mutations/entity-stores";
import { getOrgUserPatch, patchOrgUserFields } from "@/lib/mutations/sprint10-store";
import { resendOrgUserInvite as recordOrgUserInviteResend } from "@/lib/mutations/sprint17-store";
import {
  ensureAuthUsersHydrated,
  ensureSettingsHydrated,
  persistAuthUser,
  persistOrgUser,
} from "@/lib/db/domain-persistence";
import {
  countActiveSeatsForOrg,
  getAuthUserByEmail,
  upsertAuthUser,
} from "@/lib/auth/auth-users-store";
import { setPasswordHash } from "@/lib/auth/password-store";
import {
  consumeInviteToken,
  createInviteToken,
  getInviteToken,
} from "@/lib/auth/invite-tokens";
import {
  MAX_SEATS_PER_ORG,
  mapInviteRoleToPortalRole,
} from "@/lib/auth/seats";
import { enrichSeatSession } from "@/lib/auth/users";
import type { SessionUser } from "@/lib/auth/types";

export type OrgUserRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending";
  tsmOrgId?: string;
};

export async function listOrgUsers(
  q?: string,
  tsmOrgId?: string,
): Promise<OrgUserRecord[]> {
  await ensureSettingsHydrated();
  let users: OrgUserRecord[] = [
    ...listStoredOrgUsers(),
    ...demoSeed(demoUsers).map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status as "active" | "pending",
    })),
  ].map((u) => {
    const patch = getOrgUserPatch(u.id);
    return patch ? { ...u, ...patch } : u;
  });

  if (tsmOrgId?.trim()) {
    const org = tsmOrgId.toLowerCase().trim();
    users = users.filter((u) => {
      const uid = (u.tsmOrgId ?? "").toLowerCase();
      if (uid === org) return true;
      // Pilot legacy rows without tsmOrgId — only show on org_zaftys_local
      if (!uid && org === "org_zaftys_local") return true;
      return false;
    });
  }

  if (q?.trim()) {
    const needle = q.trim().toLowerCase();
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(needle) ||
        u.email.toLowerCase().includes(needle) ||
        u.role.toLowerCase().includes(needle),
    );
  }

  return users;
}

export function countPendingSeatsForOrg(tsmOrgId: string): number {
  const org = tsmOrgId.toLowerCase().trim();
  return listStoredOrgUsers().filter(
    (u) =>
      (u.tsmOrgId ?? "").toLowerCase() === org &&
      u.status === "pending",
  ).length;
}

export function seatUsageForOrg(tsmOrgId: string): {
  used: number;
  pending: number;
  active: number;
  max: number;
  remaining: number;
} {
  const active = countActiveSeatsForOrg(tsmOrgId);
  const pending = countPendingSeatsForOrg(tsmOrgId);
  const used = active + pending;
  return {
    used,
    pending,
    active,
    max: MAX_SEATS_PER_ORG,
    remaining: Math.max(0, MAX_SEATS_PER_ORG - used),
  };
}

export function validateInviteOrgUserInput(
  body: unknown,
): { name: string; email: string; role?: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim().toLowerCase();
  if (!name) return { error: "Name is required." };
  if (!email || !email.includes("@")) return { error: "Valid email is required." };
  const roleRaw = String(data.role ?? "").trim() || "Dispatcher";
  const roleLower = roleRaw.toLowerCase();
  if (roleLower.includes("admin")) {
    return { error: "Invite Dispatcher or Viewer only. Org Admin uses Continue with Google." };
  }
  return {
    name,
    email,
    role: roleRaw,
  };
}

export async function inviteOrgUser(input: {
  name: string;
  email: string;
  role?: string;
  tsmOrgId: string;
  supplierId?: string;
}): Promise<OrgUserRecord & { invitePath?: string }> {
  await ensureSettingsHydrated();
  await ensureAuthUsersHydrated();

  const orgId = input.tsmOrgId.toLowerCase().trim();
  if (!orgId) throw new Error("tsmOrgId is required to invite a seat.");

  const usage = seatUsageForOrg(orgId);
  if (usage.remaining <= 0) {
    throw new Error(`Seat limit reached (${usage.max} seats). Deactivate a seat to invite another.`);
  }

  const existingAuth = getAuthUserByEmail(input.email);
  if (existingAuth && existingAuth.status === "active") {
    throw new Error("That email already has a TSM login.");
  }

  const user = inviteStoredOrgUser({
    name: input.name,
    email: input.email,
    role: input.role,
    tsmOrgId: orgId,
  });
  await persistOrgUser(user);
  const { invitePath } = await createInviteToken({
    kind: "org_user",
    email: user.email,
    subjectId: user.id,
    tsmOrgId: orgId,
    seatRole: user.role,
    invitedName: user.name,
  });
  return { ...user, invitePath };
}

export async function getOrgUser(id: string): Promise<OrgUserRecord | undefined> {
  await ensureSettingsHydrated();
  return (await listOrgUsers()).find((u) => u.id === id);
}

export async function patchOrgUser(
  id: string,
  input: { status?: "active" | "pending"; role?: string },
): Promise<OrgUserRecord | undefined> {
  await ensureSettingsHydrated();
  const user = await getOrgUser(id);
  if (!user) return undefined;

  const stored = listStoredOrgUsers().find((u) => u.id === id);
  if (stored) {
    if (input.status) stored.status = input.status;
    if (input.role) stored.role = input.role;
    await persistOrgUser(stored);
    return { ...stored };
  }

  patchOrgUserFields(id, input);
  const merged = { ...user, ...input };
  await persistOrgUser(merged);
  return merged;
}

export async function resendOrgUserInvite(id: string, tsmOrgId?: string) {
  const user = await getOrgUser(id);
  if (!user || user.status !== "pending") return undefined;
  const resent = recordOrgUserInviteResend(id);
  const { invitePath } = await createInviteToken({
    kind: "org_user",
    email: user.email,
    subjectId: user.id,
    tsmOrgId: tsmOrgId || user.tsmOrgId,
    seatRole: user.role,
    invitedName: user.name,
  });
  return { ...resent, invitePath };
}

/**
 * Accept invite: set password → auth_users (seat) → activate org_users → consume token.
 */
export async function acceptOrgUserInvite(input: {
  token: string;
  password: string;
  name?: string;
}): Promise<{ user: SessionUser; orgUser: OrgUserRecord }> {
  await ensureSettingsHydrated();
  await ensureAuthUsersHydrated();

  const invite = await getInviteToken(input.token);
  if (!invite || invite.kind !== "org_user") {
    throw new Error("Invalid invite.");
  }
  if (invite.consumedAt) throw new Error("This invite was already used.");
  if (new Date(invite.expiresAt).getTime() < Date.now()) {
    throw new Error("This invite has expired.");
  }
  if (!input.password || input.password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const orgUser = await getOrgUser(invite.subjectId);
  if (!orgUser) throw new Error("Invite user record not found.");

  const tsmOrgId = (invite.tsmOrgId || orgUser.tsmOrgId || "").toLowerCase().trim();
  if (!tsmOrgId) throw new Error("Invite is missing company org. Ask admin to resend.");

  const portalRole = mapInviteRoleToPortalRole(invite.seatRole || orgUser.role);
  const name = (input.name?.trim() || invite.invitedName || orgUser.name).trim();

  const { getOrgAccountForSession } = await import("@/lib/tsm/org-repository");
  const org = await getOrgAccountForSession({ tsmOrgId });

  await setPasswordHash(invite.email, input.password);
  const authUser = upsertAuthUser({
    email: invite.email,
    name,
    role: portalRole,
    status: "active",
    tsmOrgId,
    orgUserId: orgUser.id,
    supplierId: org.tranzfortSupplierId,
    authSource: "seat",
  });
  await persistAuthUser(authUser);

  const activated = await patchOrgUser(orgUser.id, { status: "active" });
  await consumeInviteToken(input.token);

  const sessionUser = await enrichSeatSession({
    id: authUser.id,
    email: authUser.email,
    name: authUser.name,
    role: authUser.role,
    authSource: "seat",
    tsmOrgId,
    orgUserId: orgUser.id,
    supplierId: org.tranzfortSupplierId,
  });

  return { user: sessionUser, orgUser: activated ?? { ...orgUser, status: "active" } };
}
