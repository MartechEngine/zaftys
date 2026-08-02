import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { upsertDocument, loadCollection } from "@/lib/db/collections";
import { isDatabaseConfigured } from "@/lib/db/client";

type PasswordRecord = {
  id: string;
  email: string;
  hash: string;
  updatedAt: string;
};

const g = globalThis as typeof globalThis & {
  __tsmPasswordHashes?: Record<string, string>;
  __tsmPasswordsHydrated?: boolean;
};

function memoryStore() {
  if (!g.__tsmPasswordHashes) g.__tsmPasswordHashes = {};
  return g.__tsmPasswordHashes;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPasswordHash(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  try {
    const test = scryptSync(password, salt, 64);
    const expected = Buffer.from(hash, "hex");
    if (test.length !== expected.length) return false;
    return timingSafeEqual(test, expected);
  } catch {
    return false;
  }
}

export function getPasswordHash(email: string): string | undefined {
  return memoryStore()[normalizeEmail(email)];
}

/** Set a precomputed scrypt hash (salt:hex) without re-hashing. */
export function setPasswordHashRaw(email: string, hash: string): void {
  memoryStore()[normalizeEmail(email)] = hash;
}

export async function setPasswordHash(email: string, newPassword: string): Promise<void> {
  const key = normalizeEmail(email);
  const hash = hashPassword(newPassword);
  memoryStore()[key] = hash;

  if (isDatabaseConfigured()) {
    try {
      const record: PasswordRecord = {
        id: key,
        email: key,
        hash,
        updatedAt: new Date().toISOString(),
      };
      await upsertDocument("user_passwords", key, record);
    } catch (err) {
      console.error("[password-store] persist failed", err);
    }
  }
}

/** Remove override so DEV_USERS default password applies again. */
export async function clearPasswordHash(email: string): Promise<void> {
  const key = normalizeEmail(email);
  delete memoryStore()[key];

  if (isDatabaseConfigured()) {
    try {
      const { deleteDocument } = await import("@/lib/db/collections");
      await deleteDocument("user_passwords", key);
    } catch (err) {
      console.error("[password-store] clear failed", err);
    }
  }
}

export async function hydratePasswordHashes(): Promise<void> {
  const { applyAuthSeedOnce } = await import("@/lib/auth/auth-seed");
  applyAuthSeedOnce(setPasswordHashRaw);

  if (!isDatabaseConfigured() || g.__tsmPasswordsHydrated) return;
  try {
    const rows = await loadCollection<PasswordRecord>("user_passwords");
    const store = memoryStore();
    for (const row of rows) {
      if (row?.email && row?.hash) {
        store[normalizeEmail(row.email)] = row.hash;
      }
    }
    g.__tsmPasswordsHydrated = true;
  } catch (err) {
    console.error("[password-store] hydrate failed", err);
  }
}
