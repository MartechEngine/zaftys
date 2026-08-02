/**
 * Load gitignored `.data/auth-seed.json` into memory stores (dev / Docker-down).
 */
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type { AuthUserRecord } from "@/lib/auth/auth-users-store";
import { getAuthUserByEmail, upsertAuthUser } from "@/lib/auth/auth-users-store";

type SeedFile = {
  users?: AuthUserRecord[];
  passwords?: Array<{ email: string; hash: string }>;
};

const g = globalThis as typeof globalThis & {
  __tsmAuthSeedLoaded?: boolean;
};

function seedPath() {
  return join(process.cwd(), ".data", "auth-seed.json");
}

export function loadAuthSeedFile(): {
  users: AuthUserRecord[];
  passwords: Array<{ email: string; hash: string }>;
} {
  const path = seedPath();
  if (!existsSync(path)) return { users: [], passwords: [] };
  try {
    const raw = JSON.parse(readFileSync(path, "utf8")) as SeedFile;
    return {
      users: Array.isArray(raw.users) ? raw.users : [],
      passwords: Array.isArray(raw.passwords) ? raw.passwords : [],
    };
  } catch (err) {
    console.error("[auth-seed] failed to read", err);
    return { users: [], passwords: [] };
  }
}

/** Merge seed users + password hashes into memory (once per process). */
export function applyAuthSeedOnce(
  setPasswordHashRaw: (email: string, hash: string) => void,
) {
  if (g.__tsmAuthSeedLoaded) return;
  const seed = loadAuthSeedFile();
  for (const u of seed.users) {
    if (!u?.email) continue;
    if (!getAuthUserByEmail(u.email)) {
      upsertAuthUser({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        status: u.status ?? "active",
        tsmOrgId: u.tsmOrgId,
        orgUserId: u.orgUserId,
        supplierId: u.supplierId,
        authSource: u.authSource ?? (u.tsmOrgId ? "seat" : "auth_lite"),
      });
    }
  }
  for (const p of seed.passwords) {
    if (p?.email && p?.hash) setPasswordHashRaw(p.email, p.hash);
  }
  g.__tsmAuthSeedLoaded = true;
}
