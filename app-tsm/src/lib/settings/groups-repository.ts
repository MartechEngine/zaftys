import { demoGroups } from "@/lib/demo-data";
import { listOrgUsers } from "@/lib/settings/users-repository";
import { listOrgRoles } from "@/lib/settings/roles-repository";
import {
  createStoredSettingsGroup,
  listStoredSettingsGroups,
  patchStoredSettingsGroup,
} from "@/lib/mutations/entity-stores";
import { getGroupPatch, patchGroupFields } from "@/lib/mutations/sprint11-store";
import {
  addSettingsGroupMember,
  getSettingsGroupMemberOps,
  removeSettingsGroupMember,
} from "@/lib/mutations/sprint16-store";
import { ensureSettingsHydrated, persistSettingsGroup } from "@/lib/db/domain-persistence";

export type SettingsGroupRecord = {
  id: string;
  name: string;
  members: number;
  policy: string;
  roleId?: string;
};

export async function listSettingsGroups(): Promise<SettingsGroupRecord[]> {
  await ensureSettingsHydrated();
  const [users, roles] = await Promise.all([listOrgUsers(), listOrgRoles()]);

  const demo = demoGroups.map((group) => {
    const patch = getGroupPatch(group.id);
    const merged = { ...group, ...patch };
    const role = roles.find(
      (r) => r.name === merged.policy || merged.policy.startsWith(r.name),
    );
    const membersFromUsers = role
      ? users.filter(
          (u) => u.role === role.name || u.role === merged.policy.split(" ")[0],
        ).length
      : 0;
    const ops = getSettingsGroupMemberOps(group.id);
    const memberCount = Math.max(0, merged.members + ops.added.length - ops.removed.length);

    return {
      ...merged,
      members: Math.max(memberCount, membersFromUsers),
      roleId: role?.id,
    };
  });

  return [...listStoredSettingsGroups(), ...demo];
}

export function validateCreateSettingsGroupInput(
  body: unknown,
): { name: string; policy?: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  if (!name) return { error: "Group name is required." };
  return {
    name,
    policy: String(data.policy ?? "").trim() || undefined,
  };
}

export async function createSettingsGroup(input: {
  name: string;
  policy?: string;
}): Promise<SettingsGroupRecord> {
  await ensureSettingsHydrated();
  const group = createStoredSettingsGroup(input);
  await persistSettingsGroup(group);
  return group;
}

export async function getSettingsGroup(id: string) {
  await ensureSettingsHydrated();
  return (await listSettingsGroups()).find((g) => g.id === id);
}

export async function patchSettingsGroup(
  id: string,
  input: { name?: string; policy?: string },
): Promise<SettingsGroupRecord | undefined> {
  await ensureSettingsHydrated();
  const existing = await getSettingsGroup(id);
  if (!existing) return undefined;
  const stored = patchStoredSettingsGroup(id, input);
  if (stored) {
    await persistSettingsGroup(stored);
    return stored;
  }
  patchGroupFields(id, input);
  const merged = { ...existing, ...input };
  await persistSettingsGroup({
    id: merged.id,
    name: merged.name,
    members: merged.members,
    policy: merged.policy,
  });
  return merged;
}

export async function addMemberToSettingsGroup(
  groupId: string,
  userId: string,
): Promise<SettingsGroupRecord | undefined> {
  const group = await getSettingsGroup(groupId);
  if (!group) return undefined;
  addSettingsGroupMember(groupId, userId);
  return getSettingsGroup(groupId);
}

export async function removeMemberFromSettingsGroup(
  groupId: string,
  userId: string,
): Promise<SettingsGroupRecord | undefined> {
  const group = await getSettingsGroup(groupId);
  if (!group) return undefined;
  removeSettingsGroupMember(groupId, userId);
  return getSettingsGroup(groupId);
}
