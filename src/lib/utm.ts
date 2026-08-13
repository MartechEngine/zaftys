const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "zaftys_utm_first_touch";

export type UtmAttribution = Partial<Record<(typeof UTM_KEYS)[number], string>>;

function readStored(): UtmAttribution {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as UtmAttribution;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/** Capture UTMs on first landing; keep for the rest of the session. */
export function captureUtmFromLocation(): UtmAttribution {
  if (typeof window === "undefined") return {};
  const existing = readStored();
  if (Object.keys(existing).length > 0) return existing;

  const params = new URLSearchParams(window.location.search);
  const next: UtmAttribution = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) next[key] = value.slice(0, 255);
  }
  if (Object.keys(next).length > 0) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota / private mode */
    }
  }
  return next;
}

export function getUtmAttribution(): UtmAttribution {
  if (typeof window === "undefined") return {};
  const stored = readStored();
  if (Object.keys(stored).length > 0) return stored;
  return captureUtmFromLocation();
}
