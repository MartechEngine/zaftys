import {
  getTsmOrgAccount,
  replaceTsmOrgAccount,
  updateTsmOrgAccount,
} from "@/lib/tsm/org-account-store";
import {
  DEFAULT_TSM_ORG_ID,
  defaultTsmOrgAccount,
  type TsmOrgAccount,
} from "@/lib/tsm/org";
import { ensureTsmOrgHydrated, persistTsmOrgAccount } from "@/lib/db/domain-persistence";
import {
  assertSessionTenancy,
  resolveSessionOrgId,
} from "@/lib/tsm/tenancy";

export async function getOrgAccount(): Promise<TsmOrgAccount> {
  await ensureTsmOrgHydrated();
  return getTsmOrgAccount();
}

/**
 * Prefer session org (multi-supplier).
 * Never returns a foreign active singleton when session org is missing —
 * throws TenancyError ORG_REQUIRED instead of falling back to org_zaftys_local.
 */
export async function getOrgAccountForSession(session: {
  tsmOrgId?: string | null;
  supplierId?: string | null;
}): Promise<TsmOrgAccount> {
  await ensureTsmOrgHydrated();
  const { getTsmOrgAccountById, setActiveTsmOrgId, replaceTsmOrgAccount } =
    await import("@/lib/tsm/org-account-store");

  const expectedId = resolveSessionOrgId(session);
  const found = getTsmOrgAccountById(expectedId);
  if (found) {
    setActiveTsmOrgId(expectedId);
    assertSessionTenancy(session, found);
    return found;
  }

  // Dedicated org not hydrated yet — materialize a shell (never swap to another company).
  if (expectedId !== DEFAULT_TSM_ORG_ID) {
    const shell: TsmOrgAccount = {
      id: expectedId,
      legalName: "Company",
      tradeName: "Company",
      mainContactName: "Admin",
      tranzfortSupplierId: session.supplierId?.trim() || undefined,
      superLoadAutoPolicy: "paid_tsm_auto_activate",
    };
    replaceTsmOrgAccount(shell);
    await persistTsmOrgAccount(shell);
    assertSessionTenancy(session, shell);
    return shell;
  }

  // Explicit pilot org id on session — load or seed pilot only (not unrelated active).
  const pilot = getTsmOrgAccountById(DEFAULT_TSM_ORG_ID);
  if (pilot) {
    setActiveTsmOrgId(DEFAULT_TSM_ORG_ID);
    assertSessionTenancy(session, pilot);
    return pilot;
  }
  const seed = defaultTsmOrgAccount();
  replaceTsmOrgAccount(seed);
  await persistTsmOrgAccount(seed);
  assertSessionTenancy(session, seed);
  return seed;
}

export async function saveOrgAccount(
  patch: Partial<TsmOrgAccount>,
): Promise<TsmOrgAccount> {
  await ensureTsmOrgHydrated();
  const next = updateTsmOrgAccount(patch);
  await persistTsmOrgAccount(next);
  return next;
}

export async function setOrgAccount(account: TsmOrgAccount): Promise<TsmOrgAccount> {
  await ensureTsmOrgHydrated();
  replaceTsmOrgAccount(account);
  const next = getTsmOrgAccount();
  await persistTsmOrgAccount(next);
  return next;
}

export { getTsmOrgAccount };
