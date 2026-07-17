import { demoOrg } from "@/lib/demo-data";
import { logActivity } from "@/lib/dev-store";

export type OrgProfileFields = {
  name: string;
  gstin: string;
  address: string;
  phone: string;
  email: string;
  logoFilename?: string;
  logoStorageKey?: string;
};

const g = globalThis as typeof globalThis & {
  __tsmOrgProfile?: OrgProfileFields;
};

export function getStoredOrgProfile(): OrgProfileFields {
  if (!g.__tsmOrgProfile) {
    g.__tsmOrgProfile = { ...demoOrg };
  }
  return { ...g.__tsmOrgProfile };
}

export function replaceStoredOrgProfile(profile: OrgProfileFields) {
  g.__tsmOrgProfile = { ...profile };
}

export function updateStoredOrgProfile(
  patch: Partial<OrgProfileFields>,
): OrgProfileFields {
  const current = getStoredOrgProfile();
  const next: OrgProfileFields = {
    name: patch.name?.trim() || current.name,
    gstin: patch.gstin?.trim() || current.gstin,
    address: patch.address?.trim() || current.address,
    phone: patch.phone?.trim() || current.phone,
    email: patch.email?.trim() || current.email,
    logoFilename:
      patch.logoFilename !== undefined
        ? patch.logoFilename.trim() || undefined
        : current.logoFilename,
    logoStorageKey:
      patch.logoStorageKey !== undefined
        ? patch.logoStorageKey.trim() || undefined
        : current.logoStorageKey,
  };
  g.__tsmOrgProfile = next;
  logActivity({
    shipmentId: "",
    type: "org.updated",
    message: `Organization profile updated · ${next.name}`,
    timestamp: new Date().toISOString(),
  });
  return next;
}
