/**
 * TSM org / seats for TranZfort overflow (auth-lite).
 * Ownership is always the company org — seats only gate who may Publish.
 */

import type { UserRole } from "@/lib/auth/types";

export type TsmSeatRole = "account_admin" | "dispatcher" | "viewer";

export type SuperLoadAutoPolicy = "paid_tsm_auto_activate" | "manual";

export type TsmOrgAccount = {
  id: string;
  legalName: string;
  tradeName: string;
  gstin?: string;
  mainContactName: string;
  /** TranZfort profiles.id once linked */
  tranzfortSupplierId?: string;
  superLoadAutoPolicy: SuperLoadAutoPolicy;
};

/** Map portal session role → TSM seat role (publish gate). */
export function toTsmSeatRole(role: UserRole): TsmSeatRole {
  if (role === "admin") return "account_admin";
  if (role === "dispatcher") return "dispatcher";
  return "viewer";
}

export function canPublishToTranzfort(role: TsmSeatRole | UserRole): boolean {
  const portalRoles: UserRole[] = [
    "admin",
    "dispatcher",
    "fleet_manager",
    "client",
    "partner",
  ];
  const seat = (portalRoles as string[]).includes(role)
    ? toTsmSeatRole(role as UserRole)
    : (role as TsmSeatRole);
  return seat === "account_admin" || seat === "dispatcher";
}

export function canApproveBookings(role: TsmSeatRole | UserRole): boolean {
  return canPublishToTranzfort(role);
}

export const DEFAULT_TSM_ORG_ID = "org_zaftys_local";

/**
 * Stable TSM org id for a TranZfort supplier — one org per supplier (multi-tenant).
 * Pilot `org_zaftys_local` remains for legacy/dev only; new Google/password Admin logins use this.
 */
export function orgIdForSupplier(supplierId: string): string {
  const id = supplierId.trim().toLowerCase();
  if (!id) return DEFAULT_TSM_ORG_ID;
  return `org_tz_${id}`;
}

export function defaultTsmOrgAccount(): TsmOrgAccount {
  return {
    id: DEFAULT_TSM_ORG_ID,
    legalName: "ZAFTYS Logistics",
    tradeName: "ZAFTYS",
    mainContactName: "Dispatcher",
    superLoadAutoPolicy: "paid_tsm_auto_activate",
  };
}
