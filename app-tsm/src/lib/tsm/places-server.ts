/**
 * Server-only place lookup: TZ offline mirror first, city centroids as fallback.
 *
 * Reads the filesystem via `catalog-mirror`, so this must never be imported from
 * a client component — use `places-search.ts` there.
 */

import type { PlaceSuggestion } from "@/lib/tsm/catalog-types";
import { resolveMirroredPlace, searchMirroredPlaces } from "@/lib/tsm/catalog-mirror";
import { resolveCityPlace, searchCityPlaces } from "@/lib/tsm/places-search";

export type PlaceLookupSource = "tz-offline" | "tsm-centroid";

export function searchPlaces(
  query: string,
  limit = 8,
): { items: PlaceSuggestion[]; source: PlaceLookupSource } {
  const mirrored = searchMirroredPlaces(query, limit);
  if (mirrored.length > 0) return { items: mirrored, source: "tz-offline" };
  return { items: searchCityPlaces(query, limit), source: "tsm-centroid" };
}

export function resolvePlace(input: {
  city?: string;
  label?: string;
  state?: string;
  lat?: number;
  lng?: number;
}): PlaceSuggestion | null {
  return resolveMirroredPlace(input) ?? resolveCityPlace(input);
}
