import {
  getTsmOrgAccount,
  replaceTsmOrgAccount,
  updateTsmOrgAccount,
} from "@/lib/tsm/org-account-store";
import type { TsmOrgAccount } from "@/lib/tsm/org";
import { ensureTsmOrgHydrated, persistTsmOrgAccount } from "@/lib/db/domain-persistence";

export async function getOrgAccount(): Promise<TsmOrgAccount> {
  await ensureTsmOrgHydrated();
  return getTsmOrgAccount();
}

/** Prefer session org (multi-supplier); never bleed into a foreign pilot org. */
export async function getOrgAccountForSession(session: {
  tsmOrgId?: string | null;
  supplierId?: string | null;
}): Promise<TsmOrgAccount> {
  await ensureTsmOrgHydrated();
  const { getTsmOrgAccountById, setActiveTsmOrgId, getTsmOrgAccount, replaceTsmOrgAccount } =
    await import("@/lib/tsm/org-account-store");
  const { orgIdForSupplier, DEFAULT_TSM_ORG_ID } = await import("@/lib/tsm/org");
  const { resolveSessionOrgId } = await import("@/lib/tsm/tenancy");

  const expectedId = resolveSessionOrgId(session);
  const found = getTsmOrgAccountById(expectedId);
  if (found) {
    setActiveTsmOrgId(expectedId);
    return found;
  }

  // Session asks for a dedicated org that is not hydrated yet — materialize a shell
  // instead of returning a different company's active singleton.
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
    return shell;
  }

  return getTsmOrgAccount();
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
