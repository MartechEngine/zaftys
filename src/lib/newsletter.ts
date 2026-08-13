import { getUtmAttribution } from "@/lib/utm";
import { trackEvent } from "@/lib/analytics";

export const NEWSLETTER_CONSENT_VERSION = "newsletter-v1";

export async function subscribeNewsletter(email: string, source: "footer" | "blog"): Promise<{ success: boolean }> {
  const utm = getUtmAttribution();
  const response = await fetch("/api/newsletter.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      source,
      website: "",
      consent_version: NEWSLETTER_CONSENT_VERSION,
      source_url: typeof window !== "undefined" ? window.location.pathname : "",
      ...utm,
    }),
  });
  const result = await response.json();
  if (result.success) {
    trackEvent("newsletter_subscribe_success", { placement: source });
  }
  return result;
}
