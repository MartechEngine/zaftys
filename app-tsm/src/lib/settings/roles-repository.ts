import { demoRoles } from "@/lib/demo-data";
import { listOrgUsers } from "@/lib/settings/users-repository";
import {
  createStoredRole,
  listStoredRoles,
  patchStoredRole,
} from "@/lib/mutations/entity-stores";
import { getRolePatch, patchRoleFields } from "@/lib/mutations/sprint11-store";

export type OrgRoleRecord = {
  id: string;
  name: string;
  users: number;
  type: "org" | "system";
};

function matchesRole(userRole: string, roleName: string) {
  const role = roleName.toLowerCase();
  const user = userRole.toLowerCase();
  if (role.includes("administrator") || role.includes("admin")) {
    return user.includes("admin");
  }
  if (role.includes("dispatcher")) return user === "dispatcher";
  if (role.includes("fleet")) return user.includes("fleet");
  if (role.includes("client")) return user === "client";
  return userRole === roleName;
}

export async function listOrgRoles(): Promise<OrgRoleRecord[]> {
  const users = await listOrgUsers();

  const demo = demoRoles.map((r) => {
    const count = users.filter((u) => matchesRole(u.role, r.name)).length;
    const patch = getRolePatch(r.id);
    return {
      ...r,
      ...patch,
      users: count > 0 ? count : r.users,
    };
  });

  return [...listStoredRoles(), ...demo];
}

export function validateCreateRoleInput(
  body: unknown,
): { name: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const name = String((body as Record<string, unknown>).name ?? "").trim();
  if (!name) return { error: "Role name is required." };
  return { name };
}

export async function createOrgRole(name: string): Promise<OrgRoleRecord> {
  return createStoredRole({ name });
}

export async function getOrgRole(id: string): Promise<OrgRoleRecord | undefined> {
  return (await listOrgRoles()).find((r) => r.id === id);
}

export async function patchOrgRole(
  id: string,
  input: { name: string },
): Promise<OrgRoleRecord | undefined> {
  const existing = await getOrgRole(id);
  if (!existing) return undefined;
  const stored = patchStoredRole(id, input);
  if (stored) return stored;
  patchRoleFields(id, input);
  return { ...existing, name: input.name };
}
