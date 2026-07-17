import { listOrgUsers } from "@/lib/settings/users-repository";
import {
  getStoredOrgProfile,
  updateStoredOrgProfile,
  type OrgProfileFields,
} from "@/lib/settings/org-store";
import {
  getOrgLogoFilename,
  getOrgLogoStorageKey,
  setOrgLogoMeta,
} from "@/lib/mutations/sprint12-store";
import { ensureOrgHydrated, persistOrgProfile } from "@/lib/db/domain-persistence";

export type OrgProfile = OrgProfileFields & {
  userCount: number;
  portalUrl: string;
  logoFilename?: string;
  logoStorageKey?: string;
};

export type UpdateOrgInput = Partial<OrgProfileFields> & {
  logoFilename?: string;
  logoStorageKey?: string;
};

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
  if (data.logoFilename != null) {
    const logoFilename = String(data.logoFilename).trim();
    if (!logoFilename) return { error: "logoFilename cannot be empty." };
    patch.logoFilename = logoFilename;
  }
  if (data.logoStorageKey != null) {
    patch.logoStorageKey = String(data.logoStorageKey).trim() || undefined;
  }

  if (Object.keys(patch).length === 0) {
    return { error: "Provide at least one field to update." };
  }

  return patch;
}

export async function getOrgProfile(): Promise<OrgProfile> {
  await ensureOrgHydrated();
  const users = await listOrgUsers();
  const org = getStoredOrgProfile();
  const logoFilename = getOrgLogoFilename() ?? org.logoFilename;
  const logoStorageKey = getOrgLogoStorageKey() ?? org.logoStorageKey;
  return {
    ...org,
    ...(logoFilename ? { logoFilename } : {}),
    ...(logoStorageKey ? { logoStorageKey } : {}),
    userCount: users.length,
    portalUrl: "https://app.zaftys.com",
  };
}

export async function updateOrgProfile(input: UpdateOrgInput): Promise<OrgProfile> {
  await ensureOrgHydrated();
  const { logoFilename, logoStorageKey, ...profileFields } = input;
  if (Object.keys(profileFields).length > 0) {
    updateStoredOrgProfile(profileFields);
  }
  if (logoFilename || logoStorageKey !== undefined) {
    setOrgLogoMeta({
      filename: logoFilename,
      storageKey: logoStorageKey,
    });
    updateStoredOrgProfile({
      ...(logoFilename ? { logoFilename } : {}),
      ...(logoStorageKey !== undefined ? { logoStorageKey } : {}),
    });
  }
  const profile = await getOrgProfile();
  await persistOrgProfile({
    name: profile.name,
    gstin: profile.gstin,
    address: profile.address,
    phone: profile.phone,
    email: profile.email,
    logoFilename: profile.logoFilename,
    logoStorageKey: profile.logoStorageKey,
  });
  return profile;
}

export async function uploadOrgLogo(input?: {
  filename?: string;
  storageKey?: string;
}): Promise<OrgProfile> {
  await ensureOrgHydrated();
  const filename = input?.filename?.trim() || "zaftys-logo.png";
  setOrgLogoMeta({
    filename,
    storageKey: input?.storageKey,
  });
  updateStoredOrgProfile({
    logoFilename: filename,
    logoStorageKey: input?.storageKey,
  });
  const profile = await getOrgProfile();
  await persistOrgProfile({
    name: profile.name,
    gstin: profile.gstin,
    address: profile.address,
    phone: profile.phone,
    email: profile.email,
    logoFilename: profile.logoFilename,
    logoStorageKey: profile.logoStorageKey,
  });
  return profile;
}
