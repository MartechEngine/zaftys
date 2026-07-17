import { demoRoles } from "@/lib/demo-data";
import { listOrgUsers } from "@/lib/settings/users-repository";
import {
  createStoredRole,
  listStoredRoles,
  patchStoredRole,
} from "@/lib/mutations/entity-stores";
import { getRolePatch, patchRoleFields } from "@/lib/mutations/sprint11-store";
import {
  getRolePermissions,
  patchRolePermission,
  type RolePermissionMap,
  type RolePermissionModule,
  ROLE_PERMISSION_MODULES,
} from "@/lib/mutations/sprint16-store";
import {
  deleteOrgRole,
  isRoleDeleted,
  isSystemRole,
} from "@/lib/mutations/sprint17-store";

export type OrgRoleRecord = {
  id: string;
  name: string;
  users: number;
  type: "org" | "system";
  permissions: RolePermissionMap;
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
      permissions: getRolePermissions(r.id),
    };
  });

  return [
    ...listStoredRoles()
      .filter((r) => !isRoleDeleted(r.id))
      .map((r) => ({
        ...r,
        permissions: getRolePermissions(r.id),
      })),
    ...demo.filter((r) => !isRoleDeleted(r.id)),
  ];
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
  const row = createStoredRole({ name });
  return { ...row, permissions: getRolePermissions(row.id) };
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
  if (stored) return { ...stored, permissions: getRolePermissions(id) };
  patchRoleFields(id, input);
  return { ...existing, name: input.name, permissions: getRolePermissions(id) };
}

export async function updateRolePermissions(
  id: string,
  patch: Partial<RolePermissionMap>,
): Promise<OrgRoleRecord | undefined> {
  const existing = await getOrgRole(id);
  if (!existing) return undefined;

  for (const [key, enabled] of Object.entries(patch)) {
    if (!ROLE_PERMISSION_MODULES.includes(key as RolePermissionModule)) continue;
    if (typeof enabled === "boolean") {
      patchRolePermission(id, key as RolePermissionModule, enabled);
    }
  }

  return { ...existing, permissions: getRolePermissions(id) };
}

export async function deleteOrgRoleById(
  id: string,
): Promise<"deleted" | "system" | "not_found"> {
  const role = await getOrgRole(id);
  if (!role) return "not_found";
  if (role.type === "system" || isSystemRole(id)) return "system";
  const stored = listStoredRoles().find((r) => r.id === id);
  if (!stored) return "not_found";
  return deleteOrgRole(id) ? "deleted" : "not_found";
}
