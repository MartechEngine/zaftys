/**
 * TranZfort supplier login (password L1 + Google Admin).
 * Mock works without Supabase keys. Live needs anon + URL (+ service key for org link).
 */

import {
  ensureRemoteTsmOrgSupplierLink,
  getBridgeMode,
  getRemoteTsmOrgSupplierLinkBySupplier,
  isBridgeLiveConfigured,
} from "@/lib/tsm/bridge-rpc";
import { orgIdForSupplier } from "@/lib/tsm/org";
import { setOrgAccount } from "@/lib/tsm/org-repository";
import type { SessionUser } from "@/lib/auth/types";

export type TzVerificationStatus = "verified" | "pending" | "rejected" | "unknown";

export type TzSupplierIdentity = {
  tzUserId: string;
  supplierId: string;
  email: string;
  name: string;
  companyName: string;
  verificationStatus: TzVerificationStatus;
  userRoleType: string;
};

export type TzLoginResult =
  | {
      ok: true;
      identity: TzSupplierIdentity;
      user: SessionUser;
      mode: "mock" | "live";
      publishAllowed: boolean;
      message?: string;
    }
  | { ok: false; code: string; message: string; status: number };

const PLATFORM_BLOCKLIST = new Set(["supplier@zaftys.com"]);

/** Pilot mock supplier — only when bridge is mock (no real TZ Auth). */
const MOCK_PILOT: TzSupplierIdentity & { password: string } = {
  email: "tabish.khan9404@gmail.com",
  password: "mock-dev",
  tzUserId: "652922ee-5780-4af2-9297-085da0fa1008",
  supplierId: "652922ee-5780-4af2-9297-085da0fa1008",
  name: "Tabish Khan",
  companyName: "Tabish Khan",
  verificationStatus: "verified",
  userRoleType: "supplier",
};

export function isPlatformBlockedEmail(email: string): boolean {
  return PLATFORM_BLOCKLIST.has(email.trim().toLowerCase());
}

/** Anon + URL enough for Auth (password / Google). Service key still required for live link. */
export function isTranzfortAuthConfigured(): boolean {
  const url = process.env.TRANZFORT_SUPABASE_URL?.trim();
  const anon =
    process.env.TRANZFORT_ANON_KEY?.trim() || process.env.SUPABASE_ANON_KEY?.trim();
  return Boolean(url && anon);
}

export function tranzfortPublicUrl(): string {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) throw new Error("TRANZFORT_SUPABASE_URL is not set");
  return base;
}

export function tranzfortAnonKey(): string {
  const anon =
    process.env.TRANZFORT_ANON_KEY?.trim() || process.env.SUPABASE_ANON_KEY?.trim() || "";
  if (!anon) throw new Error("TRANZFORT_ANON_KEY is not set");
  return anon;
}

function sessionFromIdentity(identity: TzSupplierIdentity, publishAllowed: boolean): SessionUser {
  return {
    id: `tz-${identity.supplierId}`,
    email: identity.email,
    name: identity.name,
    role: "admin",
    authSource: "tranzfort",
    tzUserId: identity.tzUserId,
    supplierId: identity.supplierId,
    tsmOrgId: orgIdForSupplier(identity.supplierId),
    verificationStatus: identity.verificationStatus,
    canPublishToTranzfort: publishAllowed,
  };
}

/**
 * Bootstrap TSM org for a TZ supplier (multi-tenant).
 * Prefer an existing TZ map row (1:1 supplier) over inventing a second org id.
 * New suppliers get `org_tz_<supplierId>`.
 */
export async function bootstrapOrgFromIdentity(
  identity: TzSupplierIdentity,
): Promise<string> {
  let orgId = orgIdForSupplier(identity.supplierId);
  const companyName = identity.companyName || identity.name;
  const mode = getBridgeMode();

  if (mode === "live" && isBridgeLiveConfigured()) {
    const existing = await getRemoteTsmOrgSupplierLinkBySupplier(identity.supplierId);
    if (existing?.tsmOrgId) {
      orgId = existing.tsmOrgId.toLowerCase().trim();
    }

    const next = await setOrgAccount({
      id: orgId,
      legalName: companyName,
      tradeName: companyName,
      mainContactName: identity.name,
      tranzfortSupplierId: identity.supplierId,
      superLoadAutoPolicy: "paid_tsm_auto_activate",
    });

    const remote = await ensureRemoteTsmOrgSupplierLink({
      tsmOrgId: next.id,
      supplierId: identity.supplierId,
      companyName: next.tradeName,
      mainContactName: next.mainContactName,
      autoPolicy: next.superLoadAutoPolicy,
    });

    // If ensure reused a different org (shouldn't after lookup), align local account.
    if (remote.tsmOrgId.toLowerCase() !== next.id.toLowerCase()) {
      const aligned = await setOrgAccount({
        ...next,
        id: remote.tsmOrgId.toLowerCase().trim(),
      });
      return aligned.id;
    }
    return next.id;
  }

  const next = await setOrgAccount({
    id: orgId,
    legalName: companyName,
    tradeName: companyName,
    mainContactName: identity.name,
    tranzfortSupplierId: identity.supplierId,
    superLoadAutoPolicy: "paid_tsm_auto_activate",
  });
  return next.id;
}

export type IdentityGateOptions = {
  /** Google Admin path: verified required. Password can soft-allow with publish disabled. */
  requireVerified: boolean;
};

/**
 * Load profile (+ supplier company) with an access token and apply product gates.
 * Never invents roles / never calls ensure_role_extension.
 */
export async function identityFromAccessToken(
  accessToken: string,
  userId: string,
  emailFallback: string,
  options: IdentityGateOptions,
): Promise<TzLoginResult> {
  const base = tranzfortPublicUrl();
  const anon = tranzfortAnonKey();

  const profileRes = await fetch(
    `${base}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=id,email,full_name,verification_status,user_role_type,is_banned,trust_safety_status`,
    {
      headers: {
        apikey: anon,
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );
  const profileText = await profileRes.text();
  if (!profileRes.ok) {
    return {
      ok: false,
      code: "PROFILE_FAILED",
      message: `Could not load TranZfort profile (${profileRes.status}).`,
      status: 502,
    };
  }

  let profile: {
    id: string;
    email?: string;
    full_name?: string;
    verification_status?: string;
    user_role_type?: string;
    is_banned?: boolean;
    trust_safety_status?: string;
  };
  try {
    const rows = JSON.parse(profileText) as typeof profile[];
    if (!Array.isArray(rows) || !rows[0]) {
      return {
        ok: false,
        code: "PROFILE_MISSING",
        message:
          "No TranZfort profile for this account. Sign up and verify as a supplier in the TranZfort app first.",
        status: 403,
      };
    }
    profile = rows[0];
  } catch {
    return {
      ok: false,
      code: "PROFILE_PARSE",
      message: "Unexpected profile response from TranZfort.",
      status: 502,
    };
  }

  const email = (profile.email || emailFallback).trim().toLowerCase();
  if (isPlatformBlockedEmail(email)) {
    return {
      ok: false,
      code: "PLATFORM_ACCOUNT",
      message: "Platform accounts cannot open a customer TSM workspace.",
      status: 403,
    };
  }

  if (profile.is_banned === true) {
    return {
      ok: false,
      code: "ACCOUNT_RESTRICTED",
      message: "This TranZfort account is restricted. Contact TranZfort support.",
      status: 403,
    };
  }
  const trust = String(profile.trust_safety_status ?? "").toLowerCase();
  if (trust === "suspended" || trust === "banned") {
    return {
      ok: false,
      code: "ACCOUNT_RESTRICTED",
      message: "This TranZfort account is restricted. Contact TranZfort support.",
      status: 403,
    };
  }

  const roleType = String(profile.user_role_type ?? "").toLowerCase();
  if (roleType !== "supplier") {
    return {
      ok: false,
      code: "NOT_SUPPLIER",
      message:
        "Only TranZfort suppliers can sign in to TSM as company admin. Sign up and verify as a supplier in the TranZfort app.",
      status: 403,
    };
  }

  const verificationRaw = String(profile.verification_status ?? "unknown").toLowerCase();
  const verificationStatus: TzVerificationStatus =
    verificationRaw === "verified" ||
    verificationRaw === "pending" ||
    verificationRaw === "rejected"
      ? verificationRaw
      : "unknown";

  if (options.requireVerified && verificationStatus !== "verified") {
    return {
      ok: false,
      code: "NOT_VERIFIED",
      message:
        "Complete supplier verification in the TranZfort app before signing in to TSM as admin.",
      status: 403,
    };
  }

  let companyName = profile.full_name?.trim() || email.split("@")[0] || "Supplier";
  try {
    const supRes = await fetch(
      `${base}/rest/v1/suppliers?id=eq.${encodeURIComponent(userId)}&select=company_name`,
      {
        headers: {
          apikey: anon,
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );
    if (supRes.ok) {
      const rows = (await supRes.json()) as Array<{ company_name?: string }>;
      if (rows[0]?.company_name?.trim()) companyName = rows[0].company_name.trim();
    }
  } catch {
    /* keep full_name */
  }

  const identity: TzSupplierIdentity = {
    tzUserId: profile.id,
    supplierId: profile.id,
    email,
    name: profile.full_name?.trim() || companyName,
    companyName,
    verificationStatus,
    userRoleType: roleType,
  };

  const publishAllowed = verificationStatus === "verified";
  const user = sessionFromIdentity(identity, publishAllowed);
  return {
    ok: true,
    identity,
    user,
    mode: "live",
    publishAllowed,
    message: publishAllowed
      ? undefined
      : "Signed in — complete verification in the TranZfort app before publishing.",
  };
}

async function finalizeLogin(result: TzLoginResult): Promise<TzLoginResult> {
  if (!result.ok) return result;
  try {
    const orgId = await bootstrapOrgFromIdentity(result.identity);
    result.user.tsmOrgId = orgId;
    return result;
  } catch (error) {
    return {
      ok: false,
      code: "LIVE_LINK_FAILED",
      message:
        error instanceof Error
          ? `TranZfort sign-in succeeded, but company linking failed: ${error.message}`
          : "TranZfort sign-in succeeded, but company linking failed.",
      status: 502,
    };
  }
}

function mockLogin(email: string, password: string): TzLoginResult {
  const key = email.trim().toLowerCase();
  if (isPlatformBlockedEmail(key)) {
    return {
      ok: false,
      code: "PLATFORM_ACCOUNT",
      message: "Platform accounts cannot open a customer TSM workspace.",
      status: 403,
    };
  }

  if (key !== MOCK_PILOT.email || password !== MOCK_PILOT.password) {
    return {
      ok: false,
      code: "INVALID_CREDENTIALS",
      message:
        "Mock TranZfort login only accepts the pilot supplier (tabish.khan9404@gmail.com / mock-dev) until Supabase keys are added.",
      status: 401,
    };
  }

  const { password: _pw, ...identity } = MOCK_PILOT;
  const publishAllowed = identity.verificationStatus === "verified";
  const user = sessionFromIdentity(identity, publishAllowed);
  return {
    ok: true,
    identity,
    user,
    mode: "mock",
    publishAllowed,
    message: "Mock TranZfort login — add SUPABASE keys later for live Auth.",
  };
}

async function livePasswordLogin(email: string, password: string): Promise<TzLoginResult> {
  if (isPlatformBlockedEmail(email)) {
    return {
      ok: false,
      code: "PLATFORM_ACCOUNT",
      message: "Platform accounts cannot open a customer TSM workspace.",
      status: 403,
    };
  }

  if (!isTranzfortAuthConfigured()) {
    return {
      ok: false,
      code: "KEYS_MISSING",
      message:
        "Live TranZfort login needs TRANZFORT_SUPABASE_URL and TRANZFORT_ANON_KEY. Use mock login for now, or load Bitwarden secrets.",
      status: 503,
    };
  }

  const base = tranzfortPublicUrl();
  const anon = tranzfortAnonKey();

  const tokenRes = await fetch(`${base}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: anon,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.trim(), password }),
    cache: "no-store",
  });
  const tokenText = await tokenRes.text();
  if (!tokenRes.ok) {
    return {
      ok: false,
      code: "INVALID_CREDENTIALS",
      message: "TranZfort email or password is incorrect.",
      status: 401,
    };
  }

  let accessToken = "";
  let userId = "";
  let userEmail = email;
  try {
    const json = JSON.parse(tokenText) as {
      access_token?: string;
      user?: { id?: string; email?: string };
    };
    accessToken = json.access_token ?? "";
    userId = json.user?.id ?? "";
    userEmail = json.user?.email ?? email;
  } catch {
    return {
      ok: false,
      code: "AUTH_PARSE",
      message: "Unexpected Auth response from TranZfort.",
      status: 502,
    };
  }
  if (!accessToken || !userId) {
    return {
      ok: false,
      code: "AUTH_PARSE",
      message: "TranZfort Auth did not return a user session.",
      status: 502,
    };
  }

  // Password path: soft unverified (publish disabled). Google path uses requireVerified.
  return identityFromAccessToken(accessToken, userId, userEmail, {
    requireVerified: false,
  });
}

/**
 * Authenticate as TZ supplier (password) and bootstrap TSM org link.
 */
export async function loginTranZfortSupplier(
  email: string,
  password: string,
): Promise<TzLoginResult> {
  const mode = getBridgeMode();
  const result =
    mode === "live" ? await livePasswordLogin(email, password) : mockLogin(email, password);
  return finalizeLogin(result);
}

/**
 * Complete Google OAuth after PKCE code exchange — verified supplier Admin only.
 */
export async function loginTranZfortSupplierFromAccessToken(
  accessToken: string,
  userId: string,
  emailFallback: string,
): Promise<TzLoginResult> {
  if (!isTranzfortAuthConfigured()) {
    return {
      ok: false,
      code: "KEYS_MISSING",
      message: "TranZfort Auth keys missing (URL + anon).",
      status: 503,
    };
  }
  const result = await identityFromAccessToken(accessToken, userId, emailFallback, {
    requireVerified: true,
  });
  return finalizeLogin(result);
}

export const MOCK_TZ_LOGIN_HINT =
  "Pilot mock: tabish.khan9404@gmail.com / mock-dev (bridge=mock). Add Supabase keys for live.";
