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
  | "report_pdf_open"
  | "report_lead_submit"
  | "report_download";

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

let bootstrapped = false;
let loadScheduled = false;
let pendingPageview: { path: string; title?: string } | null = null;

function ensureGtag(): void {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    // Must push `arguments`, not a rest array — gtag.js ignores queued Array hits.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
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

function loadGa4(id: string, onReady?: () => void): void {
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`)) {
    onReady?.();
    return;
  }
  ensureGtag();
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  // Stub queues these until gtag.js loads; flush SPA pageview after the script is ready.
  window.gtag?.("js", new Date());
  window.gtag?.("config", id, {
    send_page_view: false,
    anonymize_ip: true,
  });
  script.onload = () => onReady?.();
  script.onerror = () => {
    console.warn("[analytics] Failed to load gtag.js — check VITE_GA_MEASUREMENT_ID");
  };
  document.head.appendChild(script);
}

function loadVendors(): void {
  if (bootstrapped) return;
  bootstrapped = true;
  const clarity = clarityId();
  const ga = gaMeasurementId();
  if (clarity) loadClarity(clarity);
  if (ga) {
    loadGa4(ga, () => {
      const queued = pendingPageview;
      pendingPageview = null;
      if (queued) sendPageview(queued.path, queued.title);
    });
  }
}

/** Load tags on idle, first interaction, or after 2s — not 15s (Realtime looked empty). */
export function initAnalytics(): void {
  if (typeof window === "undefined" || loadScheduled) return;
  if (!isAnalyticsEnabled()) return;
  loadScheduled = true;

  const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "touchstart"];
  let fallbackTimer = 0;
  let idleId = 0;

  const cleanup = () => {
    window.clearTimeout(fallbackTimer);
    if (idleId && "cancelIdleCallback" in window) {
      window.cancelIdleCallback(idleId);
    }
    for (const event of events) {
      window.removeEventListener(event, onReady);
    }
  };

  const onReady = () => {
    cleanup();
    loadVendors();
  };

  for (const event of events) {
    window.addEventListener(event, onReady, { once: true, passive: true });
  }
  if ("requestIdleCallback" in window) {
    idleId = window.requestIdleCallback(onReady, { timeout: 2000 });
  }
  fallbackTimer = window.setTimeout(onReady, 2000);
}

function sendPageview(path: string, title?: string): void {
  const ga = gaMeasurementId();
  if (!ga) return;
  ensureGtag();
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_title: title || document.title,
    page_location: `${window.location.origin}${path}`,
  });
}

export function trackPageview(path: string, title?: string): void {
  captureUtmFromLocation();
  if (!gaMeasurementId()) return;
  if (!bootstrapped) {
    pendingPageview = { path, title };
    return;
  }
  sendPageview(path, title);
}

export function trackEvent(event: AnalyticsEvent, props?: Record<string, string>): void {
  const params: Record<string, string> = {};
  if (props?.placement) params.placement = props.placement;
  if (props?.page) params.page = props.page;
  if (props?.intent) params.intent = props.intent;

  if (gaMeasurementId()) {
    ensureGtag();
    window.gtag?.("event", event, params);
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
