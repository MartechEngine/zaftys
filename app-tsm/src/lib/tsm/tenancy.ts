/**
 * Multi-tenant helpers (Horizon 1 / S1).
 * Session org is authoritative; never trust client-supplied org/supplier UUIDs.
 * Never silently fall back to org_zaftys_local when session lacks org + supplier.
 */

import {
  DEFAULT_TSM_ORG_ID,
  orgIdForSupplier,
  type TsmOrgAccount,
} from "@/lib/tsm/org";
import type { SessionUser } from "@/lib/auth/types";

export type TenancyMode = "pilot_legacy" | "multi_tenant";

export function isPilotLegacyOrgId(orgId: string | null | undefined): boolean {
  return (orgId ?? "").toLowerCase().trim() === DEFAULT_TSM_ORG_ID;
}

export class TenancyError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "TenancyError";
  }
}

/**
 * Canonical org id for this session (seat inherits Admin’s org).
 * @throws TenancyError ORG_REQUIRED when neither tsmOrgId nor supplierId is set
 *         (refuses silent pilot-org fallback).
 */
export function resolveSessionOrgId(session: {
  tsmOrgId?: string | null;
  supplierId?: string | null;
  authSource?: string | null;
}): string {
  const fromSession = session.tsmOrgId?.trim().toLowerCase();
  if (fromSession) return fromSession;
  const supplier = session.supplierId?.trim();
  if (supplier) return orgIdForSupplier(supplier);
  throw new TenancyError(
    "ORG_REQUIRED",
    "Session has no tsmOrgId or supplierId. Refusing silent fallback to org_zaftys_local.",
  );
}

/** Soft resolve for status / diagnostics — null when org cannot be derived. */
export function peekSessionOrgId(session: {
  tsmOrgId?: string | null;
  supplierId?: string | null;
}): string | null {
  try {
    return resolveSessionOrgId(session);
  } catch {
    return null;
  }
}

/**
 * Expected supplier for marketplace writes.
 * Prefer linked org.tranzfortSupplierId; else session.supplierId.
 */
export function resolveSessionSupplierId(
  session: { supplierId?: string | null },
  org: Pick<TsmOrgAccount, "tranzfortSupplierId">,
): string | undefined {
  const fromOrg = org.tranzfortSupplierId?.trim();
  if (fromOrg) return fromOrg;
  return session.supplierId?.trim() || undefined;
}

/**
 * Guard: org row must match session org (prevents active-singleton bleed).
 */
export function assertOrgMatchesSession(
  session: { tsmOrgId?: string | null; supplierId?: string | null },
  org: TsmOrgAccount,
): void {
  const expected = resolveSessionOrgId(session);
  if (org.id.toLowerCase() !== expected) {
    throw new TenancyError(
      "ORG_MISMATCH",
      `Session org ${expected} does not match resolved account ${org.id}.`,
    );
  }
}

/**
 * Guard: marketplace supplier on org must match session supplier when both set.
 */
export function assertSupplierMatchesOrg(
  session: { supplierId?: string | null },
  org: TsmOrgAccount,
): void {
  const sessionSupplier = session.supplierId?.trim().toLowerCase();
  const orgSupplier = org.tranzfortSupplierId?.trim().toLowerCase();
  if (!sessionSupplier || !orgSupplier) return;
  if (sessionSupplier !== orgSupplier) {
    throw new TenancyError(
      "SUPPLIER_MISMATCH",
      "Session supplier does not match org’s linked TranZfort supplier.",
    );
  }
}

/** Run org + supplier guards after resolving the account. */
export function assertSessionTenancy(
  session: { tsmOrgId?: string | null; supplierId?: string | null },
  org: TsmOrgAccount,
): void {
  assertOrgMatchesSession(session, org);
  assertSupplierMatchesOrg(session, org);
}

export type TenancyStatusSnapshot = {
  mode: TenancyMode | "unscoped";
  sessionOrgId: string | null;
  sessionSupplierId: string | null;
  resolvedOrgId: string | null;
  resolvedSupplierId: string | null;
  isPilotLegacyOrg: boolean;
  linked: boolean;
  honesty: string;
  desktopShell: {
    packaging: "tauri_hosted";
    secretsInClient: false;
    scaffoldPath: string;
  };
};

export function buildTenancyStatus(input: {
  session: SessionUser | null;
  org: TsmOrgAccount | null;
}): TenancyStatusSnapshot {
  const session = input.session;
  const org = input.org;
  const sessionOrgId = session?.tsmOrgId?.trim() || null;
  const sessionSupplierId = session?.supplierId?.trim() || null;
  const resolvedOrgId = session
    ? peekSessionOrgId(session)
    : org?.id ?? null;
  const resolvedSupplierId =
    session && org
      ? resolveSessionSupplierId(session, org) ?? null
      : org?.tranzfortSupplierId ?? sessionSupplierId;

  const isPilot = isPilotLegacyOrgId(resolvedOrgId);
  const linked = Boolean(resolvedSupplierId);
  const unscoped = Boolean(session && !resolvedOrgId);

  return {
    mode: unscoped ? "unscoped" : isPilot ? "pilot_legacy" : "multi_tenant",
    sessionOrgId,
    sessionSupplierId,
    resolvedOrgId,
    resolvedSupplierId,
    isPilotLegacyOrg: isPilot,
    linked,
    honesty: unscoped
      ? "Session has no tsmOrgId or supplierId — marketplace APIs will return 403 (no pilot fallback)."
      : isPilot
        ? "Pilot/legacy org (org_zaftys_local). New Google Admins should resolve to org_tz_<supplierId>."
        : "Multi-tenant org id derived from supplier (org_tz_*). Marketplace scoped to linked supplier.",
    desktopShell: {
      packaging: "tauri_hosted",
      secretsInClient: false,
      scaffoldPath: "app-tsm/desktop",
    },
  };
}

/** Map TenancyError → API response fields. */
export function tenancyHttpStatus(code: string): number {
  if (code === "ORG_REQUIRED" || code === "ORG_MISMATCH" || code === "SUPPLIER_MISMATCH") {
    return 403;
  }
  return 400;
}
