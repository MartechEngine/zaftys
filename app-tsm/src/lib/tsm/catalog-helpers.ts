/**
 * TranZfort catalog helpers for the TSM publish form.
 * Mirrors Flutter `load_slot_band.dart` + post picker semantics.
 */

import type {
  VehicleCatalog,
  VehicleCategory,
  VehicleConfiguration,
} from "@/lib/tsm/catalog-types";

export type LoadConfigBand = {
  bandMin: number | null;
  bandMax: number | null;
};

/** Configurations visible on supplier post-load picker (`post_selectable`). */
export function postSelectableConfigurations(
  catalog: VehicleCatalog,
  categoryCode?: string,
): VehicleConfiguration[] {
  return catalog.configurations.filter((item) => {
    if (item.postSelectable === false) return false;
    if (categoryCode && item.categoryCode !== categoryCode) return false;
    return true;
  });
}

/**
 * Prefer post envelopes when present (LD-6 collapsed wheel/capacity chips).
 * Falls back to all post-selectable configs for that category.
 */
export function postLoadConfigurations(
  catalog: VehicleCatalog,
  categoryCode?: string,
): VehicleConfiguration[] {
  const selectable = postSelectableConfigurations(catalog, categoryCode);
  const envelopes = selectable.filter((c) => c.isPostEnvelope);
  return envelopes.length > 0 ? envelopes : selectable;
}

/** Categories that have at least one post-selectable config (excludes ODC). */
export function postLoadCategories(catalog: VehicleCatalog): VehicleCategory[] {
  const codes = new Set(
    postSelectableConfigurations(catalog)
      .map((c) => c.categoryCode.trim())
      .filter(Boolean),
  );
  return catalog.categories.filter(
    (c) => c.code !== "odc" && c.code !== "parcel" && codes.has(c.code),
  );
}

export function deriveLoadConfigBand(
  catalog: VehicleCatalog,
  configurationCodes: string[],
): LoadConfigBand {
  const codes = new Set(
    configurationCodes.map((c) => c.trim().toLowerCase()).filter(Boolean),
  );
  if (codes.size === 0) return { bandMin: null, bandMax: null };

  let bandMin: number | null = null;
  let bandMax: number | null = null;
  for (const config of catalog.configurations) {
    if (!codes.has(config.code.trim().toLowerCase())) continue;
    const min = config.loadingTonMin;
    const max = config.loadingTonMax;
    if (min == null || max == null || min <= 0 || max <= 0) continue;
    bandMin = bandMin == null ? min : Math.min(bandMin, min);
    bandMax = bandMax == null ? max : Math.max(bandMax, max);
  }
  return { bandMin, bandMax };
}

export function deriveLoadSlotCeiling(
  catalog: VehicleCatalog,
  configurationCodes: string[],
): number | null {
  return deriveLoadConfigBand(catalog, configurationCodes).bandMax;
}

function formatTon(value: number): string {
  return value === Math.round(value) ? String(Math.round(value)) : value.toFixed(1);
}

/** e.g. `12–19 T` or `7.5 T` — same as Flutter `formatLoadSlotBandLabel`. */
export function formatLoadSlotBandLabel(band: LoadConfigBand): string | null {
  if (band.bandMax == null) return null;
  const min = band.bandMin;
  const max = band.bandMax;
  if (min != null && min !== max) {
    return `${formatTon(min)}–${formatTon(max)} T`;
  }
  return `${formatTon(max)} T`;
}

/**
 * Compact chip / list label: prefer TZ `label_en`, else build
 * `{W}W · {min}-{max}T` (+ length when present).
 */
export function configurationDisplayLabel(item: VehicleConfiguration): string {
  const fromCatalog = item.labelEn?.trim();
  if (fromCatalog) return fromCatalog;

  const parts: string[] = [];
  if (item.wheelsW != null) parts.push(`${item.wheelsW}W`);
  if (item.lengthFt?.trim()) parts.push(item.lengthFt.trim());
  if (item.loadingTonMin != null && item.loadingTonMax != null) {
    parts.push(`${formatTon(item.loadingTonMin)}-${formatTon(item.loadingTonMax)}T`);
  } else if (item.loadingTonMax != null) {
    parts.push(`${formatTon(item.loadingTonMax)}T`);
  }
  return parts.length ? parts.join(" · ") : item.code;
}

/** Wheel counts available for a category (for filter chips). */
export function wheelOptionsForConfigs(configs: VehicleConfiguration[]): number[] {
  const wheels = new Set<number>();
  for (const c of configs) {
    if (c.wheelsW != null && c.wheelsW > 0) wheels.add(c.wheelsW);
  }
  return [...wheels].sort((a, b) => a - b);
}

export function filterConfigsByWheel(
  configs: VehicleConfiguration[],
  wheelFilter: number | null,
): VehicleConfiguration[] {
  if (wheelFilter == null) return configs;
  return configs.filter((c) => c.wheelsW === wheelFilter);
}

/** Sort configs like TZ: by wheels, then loading_ton_min. */
export function sortPostConfigs(configs: VehicleConfiguration[]): VehicleConfiguration[] {
  return [...configs].sort((a, b) => {
    const aw = a.wheelsW ?? 0;
    const bw = b.wheelsW ?? 0;
    if (aw !== bw) return aw - bw;
    return (a.loadingTonMin ?? 0) - (b.loadingTonMin ?? 0);
  });
}
