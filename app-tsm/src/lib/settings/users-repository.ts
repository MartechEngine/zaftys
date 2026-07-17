import { demoUsers } from "@/lib/demo-data";
import {
  inviteStoredOrgUser,
  listStoredOrgUsers,
} from "@/lib/mutations/entity-stores";
import { getOrgUserPatch, patchOrgUserFields } from "@/lib/mutations/sprint10-store";

export type OrgUserRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending";
};

export async function listOrgUsers(q?: string): Promise<OrgUserRecord[]> {
  let users: OrgUserRecord[] = [
    ...listStoredOrgUsers(),
    ...demoUsers.map((u) => ({
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

export function validateInviteOrgUserInput(
  body: unknown,
): { name: string; email: string; role?: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim().toLowerCase();
  if (!name) return { error: "Name is required." };
  if (!email || !email.includes("@")) return { error: "Valid email is required." };
  return {
    name,
    email,
    role: String(data.role ?? "").trim() || undefined,
  };
}

export async function inviteOrgUser(input: {
  name: string;
  email: string;
  role?: string;
}): Promise<OrgUserRecord> {
  return inviteStoredOrgUser(input);
}

export async function getOrgUser(id: string): Promise<OrgUserRecord | undefined> {
  return (await listOrgUsers()).find((u) => u.id === id);
}

export async function patchOrgUser(
  id: string,
  input: { status?: "active" | "pending"; role?: string },
): Promise<OrgUserRecord | undefined> {
  const user = await getOrgUser(id);
  if (!user) return undefined;

  const stored = listStoredOrgUsers().find((u) => u.id === id);
  if (stored) {
    if (input.status) stored.status = input.status;
    if (input.role) stored.role = input.role;
    return { ...stored };
  }

  patchOrgUserFields(id, input);
  return { ...user, ...input };
}
