import { getUtmAttribution } from "@/lib/utm";

export function logVisit(path: string): void {
  if (typeof window === "undefined") return;

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
}
