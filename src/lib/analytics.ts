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
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function clarityId(): string {
  return import.meta.env.VITE_CLARITY_ID?.trim() ?? "";
}

function gaMeasurementId(): string {
  return import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? "";
}

export function isAnalyticsEnabled(): boolean {
  return Boolean(clarityId() || gaMeasurementId());
}

function ensureGtag(): void {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }
}

function loadClarity(id: string): void {
  if (typeof window.clarity === "function") return;

  const clarity = (...args: unknown[]) => {
    const fn = window.clarity as ((...a: unknown[]) => void) & { q?: unknown[][] };
    fn.q = fn.q || [];
    fn.q.push(args);
  };
  window.clarity = clarity;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

function loadGa4(id: string): void {
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`)) return;
  ensureGtag();
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
  window.gtag?.("js", new Date());
  window.gtag?.("config", id, { send_page_view: false, anonymize_ip: true });
}

export function initAnalytics(): void {
  if (typeof window === "undefined") return;

  const clarity = clarityId();
  const ga = gaMeasurementId();
  if (clarity) loadClarity(clarity);
  if (ga) loadGa4(ga);
}

export function trackPageview(path: string, title?: string): void {
  captureUtmFromLocation();
  const ga = gaMeasurementId();
  if (!ga || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title || document.title,
    page_location: `${window.location.origin}${path}`,
  });
}

export function trackEvent(event: AnalyticsEvent, props?: Record<string, string>): void {
  const params: Record<string, string> = {};
  if (props?.placement) params.placement = props.placement;
  if (props?.page) params.page = props.page;
  if (props?.intent) params.intent = props.intent;

  if (window.gtag && gaMeasurementId()) {
    window.gtag("event", event, params);
  }
  if (typeof window.clarity === "function") {
    window.clarity("event", event);
  }
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
