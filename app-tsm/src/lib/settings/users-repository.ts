import { demoUsers } from "@/lib/demo-data";
import {
  inviteStoredOrgUser,
  listStoredOrgUsers,
} from "@/lib/mutations/entity-stores";

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
      status: u.status,
    })),
  ];

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
