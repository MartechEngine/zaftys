/**
 * Honesty helpers for mock vs live TranZfort bridge.
 * Prevents stub/mock artifacts from looking or acting like prod.
 */

import { getBridgeMode } from "@/lib/tsm/bridge-rpc";
import type { TsmPostDraft } from "@/lib/tsm/post-draft";
import { draftReadyForPublish } from "@/lib/tsm/post-draft";

export function isMockTranzfortLoadId(loadId: string | undefined | null): boolean {
  if (!loadId) return false;
  return loadId.startsWith("tz-mock-");
}

/** True only for real live marketplace ids (not mock prefixes). */
export function shouldMarkLiveOnTranzfort(
  loadId: string | undefined | null,
  bridgeMode: string | undefined | null,
): boolean {
  if (!loadId || isMockTranzfortLoadId(loadId)) return false;
  return bridgeMode === "live";
}

export function shouldMarkSuperLoad(loadId: string | undefined | null): boolean {
  return Boolean(loadId?.trim());
}

/** Hub copy: mock-linked supplier id is not a live map row. */
export function bridgeStatusLabel(input: {
  mode: string;
  liveConfigured: boolean;
  linked: boolean;
}): string {
  if (input.mode !== "live") {
    return input.linked ? "Mock bridge · linked (local only)" : "Mock bridge";
  }
  if (!input.liveConfigured) return "Live mode (keys missing)";
  return input.linked ? "Live bridge · linked" : "Live bridge · not linked";
}

export function draftReadyForLivePublish(draft: TsmPostDraft): { ok: boolean; reason?: string } {
  const base = draftReadyForPublish(draft);
  if (!base.ok) return base;

  if (!draft.materialCode?.trim()) {
    return { ok: false, reason: "Live publish requires a TranZfort material_code (pick from search)." };
  }
  if (!Number.isFinite(draft.originLat) || !Number.isFinite(draft.originLng)) {
    return { ok: false, reason: "Live publish requires origin coordinates." };
  }
  if (!Number.isFinite(draft.destinationLat) || !Number.isFinite(draft.destinationLng)) {
    return { ok: false, reason: "Live publish requires destination coordinates." };
  }
  if (draft.originLat === 0 && draft.originLng === 0) {
    return { ok: false, reason: "Live publish requires a resolved origin place (not 0,0)." };
  }
  if (draft.destinationLat === 0 && draft.destinationLng === 0) {
    return { ok: false, reason: "Live publish requires a resolved destination place (not 0,0)." };
  }
  const indiaPoint = (lat: number, lng: number) =>
    lat >= 5 && lat <= 40 && lng >= 65 && lng <= 100;
  if (!indiaPoint(draft.originLat, draft.originLng)) {
    return {
      ok: false,
      reason: "Origin coordinates are outside India or appear reversed. Re-select the place.",
    };
  }
  if (!indiaPoint(draft.destinationLat, draft.destinationLng)) {
    return {
      ok: false,
      reason: "Destination coordinates are outside India or appear reversed. Re-select the place.",
    };
  }
  if (!(draft.routeDistanceKm > 0)) {
    return { ok: false, reason: "Live publish requires a route distance preview." };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.pickupDate)) {
    return { ok: false, reason: "Live publish requires a valid pickup date (YYYY-MM-DD)." };
  }
  return { ok: true };
}

export function publishGateForMode(
  draft: TsmPostDraft,
  mode: "mock" | "live" = getBridgeMode(),
): { ok: boolean; reason?: string } {
  return mode === "live" ? draftReadyForLivePublish(draft) : draftReadyForPublish(draft);
}
