import type { SessionUser } from "@/lib/auth/types";

const g = globalThis as typeof globalThis & {
  __tsmProfileStore?: Map<string, { name?: string; phone?: string }>;
};

function store() {
  if (!g.__tsmProfileStore) g.__tsmProfileStore = new Map();
  return g.__tsmProfileStore;
}

export function getProfileOverlay(userId: string) {
  return store().get(userId);
}

export function updateProfileOverlay(
  userId: string,
  patch: { name?: string; phone?: string },
) {
  const current = store().get(userId) ?? {};
  const next = { ...current, ...patch };
  store().set(userId, next);
  return next;
}

export function applyProfileOverlay(user: SessionUser): SessionUser & { phone?: string } {
  const overlay = getProfileOverlay(user.id);
  if (!overlay) return user;
  return {
    ...user,
    name: overlay.name ?? user.name,
    phone: overlay.phone,
  };
}
