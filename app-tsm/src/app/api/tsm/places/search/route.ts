import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { listStoredPlaces } from "@/lib/fleet/places-store";
import { searchPlaces } from "@/lib/tsm/places-server";
import type { PlaceSuggestion } from "@/lib/tsm/catalog-types";

/** Place / city typeahead for publish form. */
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  const { searchParams } = new URL(request.url);
  const q = String(searchParams.get("q") ?? "").trim();
  if (q.length < 1) return apiSuccess({ items: [] as PlaceSuggestion[] });

  const saved: PlaceSuggestion[] = listStoredPlaces()
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.city.toLowerCase().includes(q.toLowerCase()),
    )
    .slice(0, 5)
    .map((p) => {
      const cityHit = searchPlaces(p.city, 1).items[0];
      return {
        id: `saved:${p.id}`,
        label: p.name,
        city: p.city,
        state: cityHit?.state ?? "",
        lat: cityHit?.lat ?? 0,
        lng: cityHit?.lng ?? 0,
        source: "saved" as const,
      };
    })
    .filter((p) => p.lat !== 0 || p.lng !== 0);

  const { items: cities, source } = searchPlaces(q, 8);
  const items = [...saved, ...cities].slice(0, 10);
  return apiSuccess({ items, source });
}
