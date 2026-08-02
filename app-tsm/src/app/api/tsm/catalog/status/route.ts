import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getCatalogMirrorMeta } from "@/lib/tsm/catalog-mirror";
import { canPublishToTranzfort } from "@/lib/tsm/org";

/** Catalog mirror status — materials + offline places sync age/counts. */
export async function GET() {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  const meta = getCatalogMirrorMeta();
  return apiSuccess({
    ...meta,
    ready: meta.materialsLoaded && meta.placesLoaded,
    hint: meta.materialsLoaded && meta.placesLoaded
      ? "Local TZ catalogs ready for shipment create + publish."
      : "Run: npm run catalog:sync (needs TRANZFORT_* keys + indian_cities.json path).",
    canRefresh: canPublishToTranzfort(session.role),
  });
}
