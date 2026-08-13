import { captureUtmFromLocation } from "@/lib/utm";

export type AnalyticsEvent =
  | "cta_whatsapp"
  | "cta_call"
  | "cta_mailto"
  | "cta_demo"
  | "cta_partner"
  | "cta_tranzfort"
  | "form_contact_success"
  | "form_partner_success"
  | "form_careers_success"
  | "newsletter_subscribe_success"
  | "report_view"
  | "report_pdf_open";

declare global {
  interface Window {
    _paq?: unknown[][];
  }
}

function matomoUrl(): string {
  const raw = import.meta.env.VITE_MATOMO_URL?.trim() ?? "";
  if (!raw) return "";
  return raw.endsWith("/") ? raw : `${raw}/`;
}

function matomoSiteId(): string {
  return import.meta.env.VITE_MATOMO_SITE_ID?.trim() ?? "";
}

export function isAnalyticsEnabled(): boolean {
  return Boolean(matomoUrl() && matomoSiteId());
}

function categoryFor(event: AnalyticsEvent): string {
  if (event.startsWith("cta_")) return "cta";
  if (event.startsWith("form_") || event.startsWith("newsletter_")) return "form";
  return "content";
}

export function initAnalytics(): void {
  if (typeof window === "undefined" || !isAnalyticsEnabled() || window._paq) return;

  const url = matomoUrl();
  const siteId = matomoSiteId();
  const _paq: unknown[][] = [];
  window._paq = _paq;
  _paq.push(["enableLinkTracking"]);
  _paq.push(["setTrackerUrl", `${url}matomo.php`]);
  _paq.push(["setSiteId", siteId]);

  const script = document.createElement("script");
  script.async = true;
  script.src = `${url}matomo.js`;
  document.head.appendChild(script);
}

export function trackPageview(path: string, title?: string): void {
  captureUtmFromLocation();
  if (!window._paq) return;
  window._paq.push(["setCustomUrl", path]);
  if (title) window._paq.push(["setDocumentTitle", title]);
  window._paq.push(["trackPageView"]);
}

export function trackEvent(event: AnalyticsEvent, props?: Record<string, string>): void {
  if (!window._paq) return;
  const name = props?.placement || props?.page || props?.intent || "";
  window._paq.push(["trackEvent", categoryFor(event), event, name]);
}

export function mailtoEventFromSubject(subject?: string): {
  event: Extract<AnalyticsEvent, "cta_mailto" | "cta_demo" | "cta_partner">;
  intent?: string;
} {
  const s = (subject || "").toLowerCase();
  if (s.includes("demo")) return { event: "cta_demo", intent: "demo" };
  if (s.includes("partner")) return { event: "cta_partner", intent: "partner" };
  if (s.includes("quote")) return { event: "cta_mailto", intent: "quote" };
  return { event: "cta_mailto" };
}
