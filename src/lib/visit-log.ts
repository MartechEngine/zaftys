import { getUtmAttribution } from "@/lib/utm";

export function logVisit(path: string): void {
  if (typeof window === "undefined") return;

  const send = () => {
    const utm = getUtmAttribution();
    const payload = JSON.stringify({
      path,
      referrer: document.referrer || "",
      user_agent: navigator.userAgent || "",
      ...utm,
    });

    void fetch("/api/visit.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {
      /* ignore network errors; page should still work */
    });
  };

  // Keep the first paint free of the visit beacon on slow mobile CPUs.
  const ric = window.requestIdleCallback?.bind(window);
  if (typeof ric === "function") {
    ric(() => send(), { timeout: 4000 });
    return;
  }
  window.setTimeout(send, 1500);
}
