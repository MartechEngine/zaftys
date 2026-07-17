import { listOrgUsers } from "@/lib/settings/users-repository";
import {
  getStoredOrgProfile,
  updateStoredOrgProfile,
  type OrgProfileFields,
} from "@/lib/settings/org-store";

export type OrgProfile = OrgProfileFields & {
  userCount: number;
  portalUrl: string;
};

export type UpdateOrgInput = Partial<OrgProfileFields>;

export function validateUpdateOrgInput(body: unknown): UpdateOrgInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;

  const patch: UpdateOrgInput = {};
  if (data.name != null) {
    const name = String(data.name).trim();
    if (!name) return { error: "Legal name cannot be empty." };
    patch.name = name;
  }
  if (data.gstin != null) {
    const gstin = String(data.gstin).trim().toUpperCase();
    if (gstin && !/^[0-9A-Z]{15}$/.test(gstin)) {
      return { error: "GSTIN must be 15 alphanumeric characters." };
    }
    patch.gstin = gstin;
  }
  if (data.address != null) patch.address = String(data.address).trim();
  if (data.phone != null) patch.phone = String(data.phone).trim();
  if (data.email != null) {
    const email = String(data.email).trim();
    if (email && !email.includes("@")) return { error: "Email looks invalid." };
    patch.email = email;
  }

  if (Object.keys(patch).length === 0) {
    return { error: "Provide at least one field to update." };
  }

  return patch;
}

export async function getOrgProfile(): Promise<OrgProfile> {
  const users = await listOrgUsers();
  const org = getStoredOrgProfile();
  return {
    ...org,
    userCount: users.length,
    portalUrl: "https://app.zaftys.com",
  };
}

export async function updateOrgProfile(input: UpdateOrgInput): Promise<OrgProfile> {
  updateStoredOrgProfile(input);
  return getOrgProfile();
}
