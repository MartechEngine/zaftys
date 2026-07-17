import { demoGroups } from "@/lib/demo-data";
import { listOrgUsers } from "@/lib/settings/users-repository";
import { listOrgRoles } from "@/lib/settings/roles-repository";
import {
  createStoredSettingsGroup,
  listStoredSettingsGroups,
} from "@/lib/mutations/entity-stores";

export type SettingsGroupRecord = {
  id: string;
  name: string;
  members: number;
  policy: string;
  roleId?: string;
};

export async function listSettingsGroups(): Promise<SettingsGroupRecord[]> {
  const [users, roles] = await Promise.all([listOrgUsers(), listOrgRoles()]);

  const demo = demoGroups.map((group) => {
    const role = roles.find((r) => r.name === group.policy || group.policy.startsWith(r.name));
    const membersFromUsers = role
      ? users.filter((u) => u.role === role.name || u.role === group.policy.split(" ")[0]).length
      : 0;

    return {
      ...group,
      members: Math.max(group.members, membersFromUsers),
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
  return createStoredSettingsGroup(input);
}
