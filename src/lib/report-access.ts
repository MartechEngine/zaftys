import { getUtmAttribution } from "@/lib/utm";
import { trackEvent } from "@/lib/analytics";

export const REPORT_LEAD_CONSENT_VERSION = "report-lead-v1";
const STORAGE_KEY = "zaftys_report_access_v1";

export type ReportAccess = {
  token: string;
  email: string;
  expiresAt?: string;
};

export type ReportLeadPayload = {
  name: string;
  jobTitle: string;
  email: string;
  reportSlug: string;
  /** Honeypot - must stay empty for humans. */
  website?: string;
};

function readAccess(): ReportAccess | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ReportAccess;
    if (!parsed?.token || typeof parsed.token !== "string" || parsed.token.length !== 64) {
      return null;
    }
    if (parsed.expiresAt) {
      const exp = Date.parse(parsed.expiresAt);
      if (!Number.isNaN(exp) && exp < Date.now()) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
    }
    return parsed;
  } catch {
    return null;
  }
}

export function getReportAccess(): ReportAccess | null {
  return readAccess();
}

export function hasReportAccess(): boolean {
  return Boolean(readAccess()?.token);
}

export function clearReportAccess(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function storeReportAccess(access: ReportAccess): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(access));
  } catch {
    /* ignore */
  }
}

export function gatedReportPdfUrl(
  slug: string,
  options?: { download?: boolean; token?: string },
): string | null {
  const token = options?.token ?? readAccess()?.token;
  if (!token) return null;
  const params = new URLSearchParams({ slug, token });
  if (options?.download) params.set("download", "1");
  return `/api/report-pdf.php?${params.toString()}`;
}

export async function submitReportLead(
  payload: ReportLeadPayload,
): Promise<{ success: boolean; accessToken?: string; expiresAt?: string; error?: string }> {
  const utm = getUtmAttribution();
  const response = await fetch("/api/report-lead.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name.trim(),
      job_title: payload.jobTitle.trim(),
      email: payload.email.trim().toLowerCase(),
      report_slug: payload.reportSlug,
      website: payload.website ?? "",
      consent_version: REPORT_LEAD_CONSENT_VERSION,
      source_url: typeof window !== "undefined" ? window.location.pathname : "",
      ...utm,
    }),
  });

  let result: {
    success?: boolean;
    access_token?: string;
    expires_at?: string;
    error?: string;
    message?: string;
  } = {};
  try {
    result = await response.json();
  } catch {
    return { success: false, error: "Could not unlock the report. Please try again." };
  }

  if (!response.ok || !result.success || !result.access_token) {
    return {
      success: false,
      error: result.error || "Could not unlock the report. Please try again.",
    };
  }

  storeReportAccess({
    token: result.access_token,
    email: payload.email.trim().toLowerCase(),
    expiresAt: result.expires_at,
  });
  trackEvent("report_lead_submit", { page: payload.reportSlug });

  return {
    success: true,
    accessToken: result.access_token,
    expiresAt: result.expires_at,
  };
}
