/**
 * In-memory + Postgres-backed TSM org accounts for TranZfort bridge.
 * Supports multiple orgs (one per TZ supplier); "active" is last activated / hydrated.
 */

import { allowDemoSeeds } from "@/lib/data/demo-mode";
import { getStoredOrgProfile } from "@/lib/settings/org-store";
import {
  DEFAULT_TSM_ORG_ID,
  defaultTsmOrgAccount,
  type SuperLoadAutoPolicy,
  type TsmOrgAccount,
} from "@/lib/tsm/org";

const g = globalThis as typeof globalThis & {
  __tsmOrgAccounts?: Map<string, TsmOrgAccount>;
  __tsmActiveOrgId?: string;
};

function accounts(): Map<string, TsmOrgAccount> {
  if (!g.__tsmOrgAccounts) g.__tsmOrgAccounts = new Map();
  return g.__tsmOrgAccounts;
}

function seedFromProfile(): TsmOrgAccount {
  const base = defaultTsmOrgAccount();
  if (!allowDemoSeeds()) return base;
  const profile = getStoredOrgProfile();
  return {
    ...base,
    legalName: profile.name || base.legalName,
    tradeName: profile.name || base.tradeName,
    gstin: profile.gstin || undefined,
    mainContactName: profile.email ? profile.email.split("@")[0] : base.mainContactName,
  };
}

function ensureSeeded() {
  const map = accounts();
  if (map.size === 0) {
    const seed = seedFromProfile();
    map.set(seed.id, seed);
    g.__tsmActiveOrgId = seed.id;
  }
  if (!g.__tsmActiveOrgId || !map.has(g.__tsmActiveOrgId)) {
    g.__tsmActiveOrgId = map.keys().next().value ?? DEFAULT_TSM_ORG_ID;
  }
}

export function getTsmOrgAccountById(orgId: string): TsmOrgAccount | null {
  ensureSeeded();
  const row = accounts().get(orgId.toLowerCase().trim());
  return row ? { ...row } : null;
}

export function getTsmOrgAccount(): TsmOrgAccount {
  ensureSeeded();
  const id = g.__tsmActiveOrgId ?? DEFAULT_TSM_ORG_ID;
  const row = accounts().get(id) ?? seedFromProfile();
  if (!accounts().has(row.id)) accounts().set(row.id, row);
  return { ...row };
}

export function setActiveTsmOrgId(orgId: string) {
  const id = orgId.toLowerCase().trim();
  ensureSeeded();
  if (accounts().has(id)) g.__tsmActiveOrgId = id;
}

/** Replace/upsert one org and make it active. */
export function replaceTsmOrgAccount(account: TsmOrgAccount) {
  const id = (account.id || DEFAULT_TSM_ORG_ID).toLowerCase().trim();
  const next: TsmOrgAccount = { ...account, id };
  accounts().set(id, next);
  g.__tsmActiveOrgId = id;
}

/** Hydrate many orgs from Postgres (does not clear other in-memory orgs). */
export function upsertTsmOrgAccounts(rows: TsmOrgAccount[]) {
  ensureSeeded();
  for (const row of rows) {
    const id = (row.id || DEFAULT_TSM_ORG_ID).toLowerCase().trim();
    accounts().set(id, { ...row, id });
  }
  if (!g.__tsmActiveOrgId || !accounts().has(g.__tsmActiveOrgId)) {
    const first = rows[0]?.id ?? DEFAULT_TSM_ORG_ID;
    g.__tsmActiveOrgId = first.toLowerCase().trim();
  }
}

export function updateTsmOrgAccount(
  patch: Partial<TsmOrgAccount>,
): TsmOrgAccount {
  const current = getTsmOrgAccount();
  const next: TsmOrgAccount = {
    id: (patch.id ?? current.id).toLowerCase().trim(),
    legalName: patch.legalName?.trim() || current.legalName,
    tradeName: patch.tradeName?.trim() || current.tradeName,
    gstin: patch.gstin !== undefined ? patch.gstin?.trim() || undefined : current.gstin,
    mainContactName: patch.mainContactName?.trim() || current.mainContactName,
    tranzfortSupplierId:
      patch.tranzfortSupplierId !== undefined
        ? patch.tranzfortSupplierId?.trim() || undefined
        : current.tranzfortSupplierId,
    superLoadAutoPolicy: (patch.superLoadAutoPolicy ??
      current.superLoadAutoPolicy) as SuperLoadAutoPolicy,
  };
  accounts().set(next.id, next);
  g.__tsmActiveOrgId = next.id;
  return { ...next };
}
