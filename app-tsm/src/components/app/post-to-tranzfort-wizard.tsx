"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import type { ShipmentRecord } from "@/lib/dev-store";
import type { NetworkListing } from "@/lib/network/listing-types";
import type {
  MaterialSuggestion,
  PlaceSuggestion,
  VehicleCatalog,
} from "@/lib/tsm/catalog-types";
import {
  TRUCK_SHORTCUTS,
  applyPlaceToForm,
  buildDraftFromForm,
  configsForCategory,
  configurationDisplayLabel,
  draftGate,
  filterConfigsByWheel,
  postLoadCategories,
  prefillPublishForm,
  pricingTotals,
  slotBandLabelForConfigs,
  slotCeilingForConfigs,
  summarizeConfigurations,
  wheelOptionsForConfigs,
  type FormFieldErrors,
  type PublishFormState,
} from "@/lib/tsm/form-draft";
import type { TsmListingDuration } from "@/lib/tsm/post-draft";
import {
  bridgeStatusLabel,
  isMockTranzfortLoadId,
  shouldMarkLiveOnTranzfort,
  shouldMarkSuperLoad,
} from "@/lib/tsm/live-honesty";
import { cn } from "@/lib/utils";

type Props = {
  shipment: ShipmentRecord;
  existingListing?: NetworkListing | null;
  onPosted?: () => void;
  onCancel?: () => void;
};

type OrgInfo = {
  company: string;
  canPublish: boolean;
  bridgeMode: string;
  liveConfigured: boolean;
  linked: boolean;
  liveLinked: boolean;
  tsmRole: string;
};

const LISTING_OPTIONS: { id: TsmListingDuration; label: string }[] = [
  { id: "48_hours", label: "48 hours" },
  { id: "7_days", label: "7 days" },
  { id: "30_days", label: "30 days" },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-[11px] text-rose-300">{message}</p>;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      {children}
    </section>
  );
}

function inputClassName(hasError?: boolean) {
  return cn(
    "mt-1 h-9 w-full rounded-xl border bg-white/[0.05] px-3 text-sm text-foreground outline-none focus:border-primary/40",
    hasError ? "border-rose-400/50" : "border-white/10",
  );
}

export function PostToTranZfortWizard({
  shipment,
  existingListing,
  onPosted,
  onCancel,
}: Props) {
  const router = useRouter();
  const isEdit =
    !!existingListing &&
    !["withdrawn", "expired", "assigned"].includes(existingListing.state);

  const [form, setForm] = useState<PublishFormState>(() =>
    prefillPublishForm(shipment, existingListing),
  );
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [busy, setBusy] = useState<"draft" | "publish" | null>(null);
  const [org, setOrg] = useState<OrgInfo | null>(null);

  const [catalog, setCatalog] = useState<VehicleCatalog | null>(null);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [bodyStyleCode, setBodyStyleCode] = useState(
    existingListing?.draftSnapshot?.requiredBodyStyleCodes?.[0] ?? "",
  );
  const [wheelFilter, setWheelFilter] = useState<number | null>(null);

  const [originQuery, setOriginQuery] = useState(form.originCity);
  const [destQuery, setDestQuery] = useState(form.destinationCity);
  const [originSuggestions, setOriginSuggestions] = useState<PlaceSuggestion[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<PlaceSuggestion[]>([]);
  const [searchingOrigin, setSearchingOrigin] = useState(false);
  const [searchingDest, setSearchingDest] = useState(false);

  const [materialQuery, setMaterialQuery] = useState(form.material);
  const [materialSuggestions, setMaterialSuggestions] = useState<MaterialSuggestion[]>([]);
  const [searchingMaterials, setSearchingMaterials] = useState(false);
  const [materialsSource, setMaterialsSource] = useState<"live" | "stub" | null>(null);

  const [resolvingRoute, setResolvingRoute] = useState(false);
  const routeReq = useRef(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getTsmOrg();
        if (cancelled) return;
        setOrg({
          company: data.org.tradeName || data.org.legalName,
          canPublish: data.seat.canPublish,
          bridgeMode: data.bridge.mode,
          liveConfigured: data.bridge.liveConfigured,
          linked: data.bridge.linked,
          liveLinked: data.bridge.liveLinked === true,
          tsmRole: data.seat.tsmRole,
        });
      } catch {
        /* ignore — form still usable for draft */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setCatalogLoading(true);
      try {
        const data = await api.getVehicleCatalog();
        if (!cancelled) setCatalog(data);
      } catch {
        if (!cancelled) toast.error("Could not load vehicle catalog");
      } finally {
        if (!cancelled) setCatalogLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const refreshRoute = useCallback(async (next: PublishFormState) => {
    if (
      next.originLat == null ||
      next.originLng == null ||
      next.destinationLat == null ||
      next.destinationLng == null
    ) {
      setForm((prev) => ({ ...prev, route: null }));
      return;
    }
    const reqId = ++routeReq.current;
    setResolvingRoute(true);
    try {
      const { preview } = await api.previewRoute(
        { lat: next.originLat, lng: next.originLng },
        { lat: next.destinationLat, lng: next.destinationLng },
      );
      if (reqId !== routeReq.current) return;
      setForm((prev) => ({ ...prev, route: preview }));
      setErrors((prev) => {
        const { route: _r, ...rest } = prev;
        return rest;
      });
    } catch {
      if (reqId !== routeReq.current) return;
      setForm((prev) => ({ ...prev, route: null }));
      setErrors((prev) => ({
        ...prev,
        route: "Route preview unavailable — check origin and destination.",
      }));
    } finally {
      if (reqId === routeReq.current) setResolvingRoute(false);
    }
  }, []);

  useEffect(() => {
    if (
      form.originLat != null &&
      form.originLng != null &&
      form.destinationLat != null &&
      form.destinationLng != null &&
      !form.route
    ) {
      void refreshRoute(form);
    }
    // intentionally only when coords exist without route
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.originLat, form.originLng, form.destinationLat, form.destinationLng]);

  useEffect(() => {
    const q = originQuery.trim();
    if (q.length < 1) {
      setOriginSuggestions([]);
      return;
    }
    const t = window.setTimeout(async () => {
      setSearchingOrigin(true);
      try {
        const res = await api.searchPlaces(q);
        setOriginSuggestions(res.items);
      } catch {
        setOriginSuggestions([]);
      } finally {
        setSearchingOrigin(false);
      }
    }, 220);
    return () => window.clearTimeout(t);
  }, [originQuery]);

  useEffect(() => {
    const q = destQuery.trim();
    if (q.length < 1) {
      setDestSuggestions([]);
      return;
    }
    const t = window.setTimeout(async () => {
      setSearchingDest(true);
      try {
        const res = await api.searchPlaces(q);
        setDestSuggestions(res.items);
      } catch {
        setDestSuggestions([]);
      } finally {
        setSearchingDest(false);
      }
    }, 220);
    return () => window.clearTimeout(t);
  }, [destQuery]);

  useEffect(() => {
    const q = materialQuery.trim();
    if (q.length < 1) {
      setMaterialSuggestions([]);
      return;
    }
    const t = window.setTimeout(async () => {
      setSearchingMaterials(true);
      try {
        const res = await api.searchMaterials(q);
        setMaterialSuggestions(res.items);
        setMaterialsSource(res.source);
      } catch {
        setMaterialSuggestions([]);
      } finally {
        setSearchingMaterials(false);
      }
    }, 220);
    return () => window.clearTimeout(t);
  }, [materialQuery]);

  const totals = useMemo(() => pricingTotals(form, catalog), [form, catalog]);
  const ceiling = useMemo(
    () => slotCeilingForConfigs(catalog, form.configurationCodes),
    [catalog, form.configurationCodes],
  );
  const bandLabel = useMemo(
    () => slotBandLabelForConfigs(catalog, form.configurationCodes),
    [catalog, form.configurationCodes],
  );

  const categories = useMemo(
    () => (catalog ? postLoadCategories(catalog) : []),
    [catalog],
  );

  const bodyStyles = useMemo(() => {
    if (!catalog || !form.categoryCode) return [];
    return catalog.bodyStyles.filter((b) => b.categoryCode === form.categoryCode);
  }, [catalog, form.categoryCode]);

  const categoryConfigs = useMemo(() => {
    if (!catalog || !form.categoryCode) return [];
    return configsForCategory(catalog, form.categoryCode, bodyStyleCode || undefined);
  }, [catalog, form.categoryCode, bodyStyleCode]);

  const wheelOptions = useMemo(
    () => wheelOptionsForConfigs(categoryConfigs),
    [categoryConfigs],
  );

  const configurations = useMemo(
    () => filterConfigsByWheel(categoryConfigs, wheelFilter),
    [categoryConfigs, wheelFilter],
  );

  async function selectPlace(side: "origin" | "destination", suggestion: PlaceSuggestion) {
    try {
      const { place } = await api.resolvePlace(suggestion);
      const next = applyPlaceToForm(side, place, form);
      setForm(next);
      if (side === "origin") {
        setOriginQuery(place.city);
        setOriginSuggestions([]);
        setErrors((prev) => {
          const { originCity: _a, originLabel: _b, ...rest } = prev;
          return rest;
        });
      } else {
        setDestQuery(place.city);
        setDestSuggestions([]);
        setErrors((prev) => {
          const { destinationCity: _a, destinationLabel: _b, ...rest } = prev;
          return rest;
        });
      }
      await refreshRoute(next);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not resolve place");
    }
  }

  function selectMaterial(item: MaterialSuggestion) {
    setForm((prev) => ({
      ...prev,
      material: item.nameEn,
      materialCode: item.code,
    }));
    setMaterialQuery(item.nameEn);
    setMaterialSuggestions([]);
    setErrors((prev) => {
      const { material: _a, materialCode: _b, ...rest } = prev;
      return rest;
    });
  }

  function listingPayload(draft: ReturnType<typeof buildDraftFromForm>, opts: {
    publish: boolean;
    loadId?: string;
    bridgeMode?: string;
  }) {
    const mode = opts.bridgeMode ?? org?.bridgeMode ?? "mock";
    return {
      trucksNeeded: draft.trucksNeeded,
      priceType: draft.priceType,
      rateInr: draft.priceAmount,
      advancePercent: draft.advancePercentage,
      bodyType: categories.find((c) => c.code === form.categoryCode)?.nameEn,
      pickupWindowStart: `${draft.pickupDate}T06:00:00.000Z`,
      plantNotes: form.plantNotes || undefined,
      publish: opts.publish,
      draftSnapshot: draft,
      tranzfortLoadId: opts.loadId,
      liveOnTranzfort: shouldMarkLiveOnTranzfort(opts.loadId, mode),
      superLoad: shouldMarkSuperLoad(opts.loadId),
    };
  }

  async function saveDraft() {
    setBusy("draft");
    try {
      const draft = buildDraftFromForm(
        form,
        shipment.id,
        existingListing?.draftSnapshot?.idempotencyKey,
      );
      const payload = listingPayload(draft, { publish: false });
      if (isEdit) {
        await api.updateNetworkListing(shipment.id, payload);
        toast.success("Draft saved");
      } else {
        await api.postNetworkListing({
          shipmentId: shipment.id,
          ...payload,
          publish: false,
        });
        toast.success("Draft saved — publish when ready");
      }
      onPosted?.();
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save draft");
    } finally {
      setBusy(null);
    }
  }

  async function publish() {
    if (org && !org.canPublish) {
      toast.error("Your role cannot publish to TranZfort.");
      return;
    }

    if (org?.bridgeMode === "live") {
      if (catalog?.source !== "live" || !catalog.configurations.length) {
        toast.error(
          "Live catalog unavailable — cannot publish stub vehicle codes to TranZfort.",
        );
        return;
      }
      if (materialsSource === "stub") {
        toast.error(
          "Live materials unavailable — pick a material from live TranZfort search.",
        );
        return;
      }
    }

    const gate = draftGate(form, shipment.id, catalog, {
      idempotencyKey: existingListing?.draftSnapshot?.idempotencyKey,
      bridgeMode: org?.bridgeMode,
    });
    if (!gate.ok) {
      setErrors(gate.fieldErrors);
      toast.error(gate.reason ?? "Fix the highlighted fields.");
      return;
    }

    if (org?.bridgeMode === "live" && !org.linked) {
      toast.error("Link a TranZfort supplier before live publish.");
      return;
    }

    setBusy("publish");
    setErrors({});
    try {
      // Persist the exact validated draft before crossing the TZ boundary.
      // Failed live calls can then retry with the same idempotency key.
      const draftPayload = listingPayload(gate.draft, { publish: false });
      if (isEdit) {
        await api.updateNetworkListing(shipment.id, draftPayload);
      } else {
        try {
          await api.postNetworkListing({
            shipmentId: shipment.id,
            ...draftPayload,
            publish: false,
          });
        } catch {
          await api.updateNetworkListing(shipment.id, draftPayload);
        }
      }

      const published = await api.publishToTranzfort(gate.draft);
      const payload = listingPayload(gate.draft, {
        publish: true,
        loadId: published.loadId,
        bridgeMode: published.mode,
      });

      if (isEdit) {
        await api.updateNetworkListing(shipment.id, {
          ...payload,
          publish: true,
        });
      } else {
        try {
          await api.postNetworkListing({
            shipmentId: shipment.id,
            ...payload,
            publish: true,
          });
        } catch {
          // Listing may already exist as draft — upgrade it.
          await api.updateNetworkListing(shipment.id, {
            ...payload,
            publish: true,
          });
        }
      }

      toast.success(published.message || `Published ${published.loadId}`);
      onPosted?.();
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Publish failed");
    } finally {
      setBusy(null);
    }
  }

  const modeLabel = org
    ? bridgeStatusLabel({
        mode: org.bridgeMode,
        liveConfigured: org.liveConfigured,
        linked: org.bridgeMode === "live" ? org.liveLinked : org.linked,
      })
    : "…";

  const publishBlocked = Boolean(org && !org.canPublish);
  const liveCatalogBlocked =
    org?.bridgeMode === "live" &&
    (catalog?.source !== "live" || !catalog?.configurations.length);

  return (
    <div className="glass space-y-4 rounded-2xl p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {isEdit ? "Edit TranZfort listing" : "Post to TranZfort"}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Posts as {org?.company ?? "your company"}. Your name is recorded for audit only. ·{" "}
            {modeLabel}
            {catalog ? ` · catalog ${catalog.source}` : ""}
            {liveCatalogBlocked ? " · live catalog required" : ""}
          </p>
        </div>
        {existingListing?.liveOnTranzfort ? (
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-200">
            Live on TranZfort
            {existingListing.superLoad ? " · Super Load" : ""}
          </span>
        ) : existingListing?.tranzfortLoadId &&
          isMockTranzfortLoadId(existingListing.tranzfortLoadId) ? (
          <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-medium text-amber-100">
            Mock Super Load (not on TranZfort)
          </span>
        ) : null}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm">
        <p className="font-medium text-foreground">
          {shipment.publicId} · {shipment.origin} → {shipment.destination}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {shipment.commodity} · {shipment.tonnageMt}T · {shipment.client}
        </p>
      </div>

      {publishBlocked && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
          View only ({org?.tsmRole}) — publish requires admin or dispatcher.
        </div>
      )}
      {liveCatalogBlocked && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
          Live bridge requires a live TranZfort vehicle catalog. Check keys / RPC, then reload the
          form.
        </div>
      )}

      <Section title="1. Route & timing">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-xs text-muted-foreground">
            Origin city
            <input
              value={originQuery}
              onChange={(e) => {
                setOriginQuery(e.target.value);
                setForm((prev) => ({ ...prev, originCity: e.target.value, route: null, originLat: null, originLng: null }));
              }}
              placeholder="Search city"
              className={inputClassName(Boolean(errors.originCity))}
            />
            <FieldError message={errors.originCity} />
            {searchingOrigin && (
              <p className="mt-1 text-[11px] text-muted-foreground">Searching…</p>
            )}
            {originSuggestions.length > 0 && (
              <ul className="mt-1 max-h-36 overflow-auto rounded-lg border border-white/10 bg-[#0b1220]">
                {originSuggestions.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-xs text-foreground hover:bg-white/5"
                      onClick={() => void selectPlace("origin", s)}
                    >
                      <span className="font-medium">{s.city}</span>
                      <span className="text-muted-foreground"> · {s.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </label>

          <label className="block text-xs text-muted-foreground">
            Origin exact location
            <input
              value={form.originLabel}
              onChange={(e) => setForm((prev) => ({ ...prev, originLabel: e.target.value }))}
              placeholder="Plant gate / weighbridge"
              className={inputClassName(Boolean(errors.originLabel))}
            />
            <FieldError message={errors.originLabel} />
          </label>

          <label className="block text-xs text-muted-foreground">
            Destination city
            <input
              value={destQuery}
              onChange={(e) => {
                setDestQuery(e.target.value);
                setForm((prev) => ({
                  ...prev,
                  destinationCity: e.target.value,
                  route: null,
                  destinationLat: null,
                  destinationLng: null,
                }));
              }}
              placeholder="Search city"
              className={inputClassName(Boolean(errors.destinationCity))}
            />
            <FieldError message={errors.destinationCity} />
            {searchingDest && (
              <p className="mt-1 text-[11px] text-muted-foreground">Searching…</p>
            )}
            {destSuggestions.length > 0 && (
              <ul className="mt-1 max-h-36 overflow-auto rounded-lg border border-white/10 bg-[#0b1220]">
                {destSuggestions.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-xs text-foreground hover:bg-white/5"
                      onClick={() => void selectPlace("destination", s)}
                    >
                      <span className="font-medium">{s.city}</span>
                      <span className="text-muted-foreground"> · {s.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </label>

          <label className="block text-xs text-muted-foreground">
            Destination exact location
            <input
              value={form.destinationLabel}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, destinationLabel: e.target.value }))
              }
              placeholder="Delivery plant / yard"
              className={inputClassName(Boolean(errors.destinationLabel))}
            />
            <FieldError message={errors.destinationLabel} />
          </label>

          <label className="block text-xs text-muted-foreground">
            Pickup date
            <input
              type="date"
              value={form.pickupDate}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setForm((prev) => ({ ...prev, pickupDate: e.target.value }))}
              className={inputClassName(Boolean(errors.pickupDate))}
            />
            <FieldError message={errors.pickupDate} />
          </label>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs">
          {resolvingRoute ? (
            <p className="text-muted-foreground">Resolving route…</p>
          ) : form.route ? (
            <p className="text-foreground">
              Route preview:{" "}
              <strong>{form.route.distanceKm.toFixed(1)} km</strong>
              {" · "}
              ~{form.route.durationMinutes} min
              <span className="text-muted-foreground"> · {form.route.source}</span>
            </p>
          ) : (
            <p className="text-amber-100">
              {errors.route ??
                "Select origin and destination from suggestions to preview the route."}
            </p>
          )}
        </div>
      </Section>

      <Section title="2. Cargo & vehicle">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-xs text-muted-foreground sm:col-span-2">
            Material
            <input
              value={materialQuery}
              onChange={(e) => {
                setMaterialQuery(e.target.value);
                setForm((prev) => ({
                  ...prev,
                  material: e.target.value,
                  materialCode: "",
                }));
              }}
              placeholder="Type material (e.g. Cement, Steel)"
              className={inputClassName(Boolean(errors.materialCode || errors.material))}
            />
            <FieldError message={errors.materialCode || errors.material} />
            {form.materialCode && (
              <p className="mt-1 text-[11px] text-emerald-200">
                Selected code: {form.materialCode}
                <button
                  type="button"
                  className="ml-2 text-muted-foreground underline"
                  onClick={() => {
                    setForm((prev) => ({ ...prev, materialCode: "", material: "" }));
                    setMaterialQuery("");
                  }}
                >
                  Clear
                </button>
              </p>
            )}
            {searchingMaterials && (
              <p className="mt-1 text-[11px] text-muted-foreground">Searching materials…</p>
            )}
            {materialSuggestions.length > 0 && (
              <ul className="mt-1 max-h-36 overflow-auto rounded-lg border border-white/10 bg-[#0b1220]">
                {materialSuggestions.map((m) => (
                  <li key={m.code}>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-xs text-foreground hover:bg-white/5"
                      onClick={() => selectMaterial(m)}
                    >
                      <span className="font-medium">{m.nameEn}</span>
                      <span className="text-muted-foreground"> · {m.code}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </label>

          <label className="block text-xs text-muted-foreground">
            Cargo weight (tonnes)
            <input
              type="number"
              min={0.1}
              step={0.1}
              value={form.weightTonnes}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  weightTonnes: Number(e.target.value) || 0,
                }))
              }
              className={inputClassName(Boolean(errors.weightTonnes))}
            />
            <FieldError message={errors.weightTonnes} />
            {bandLabel && (
              <p className="mt-1 text-[11px] text-muted-foreground">
                Accepted truck capacity band: {bandLabel}
                {ceiling != null ? ` (ceiling ${ceiling}T / truck)` : ""}
              </p>
            )}
          </label>

          <label className="block text-xs text-muted-foreground">
            Trucks needed
            <input
              type="number"
              min={1}
              max={50}
              value={form.trucksNeeded}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  trucksNeeded: Math.max(1, Number(e.target.value) || 1),
                }))
              }
              className={inputClassName(Boolean(errors.trucksNeeded))}
            />
            <FieldError message={errors.trucksNeeded} />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {TRUCK_SHORTCUTS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, trucksNeeded: n }))}
                  className={cn(
                    "h-7 rounded-lg border px-2 text-[11px]",
                    form.trucksNeeded === n
                      ? "border-primary/40 bg-primary/15 text-primary"
                      : "border-white/10 text-muted-foreground hover:bg-white/5",
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </label>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-foreground">Vehicle requirements</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              TranZfort catalog: type · wheels (W) · capacity (T). Matching uses configuration
              codes — not free-text body/tyres.
            </p>
          </div>
          {catalogLoading ? (
            <p className="text-xs text-muted-foreground">Loading catalog…</p>
          ) : (
            <>
              <label className="block text-xs text-muted-foreground">
                Type (category)
                <select
                  value={form.categoryCode}
                  onChange={(e) => {
                    const code = e.target.value;
                    setBodyStyleCode("");
                    setWheelFilter(null);
                    setForm((prev) => ({
                      ...prev,
                      categoryCode: code,
                      bodyStyleCodes: [],
                      configurationCodes: [],
                    }));
                  }}
                  className={inputClassName(Boolean(errors.vehicle))}
                >
                  <option value="">Select type</option>
                  {categories.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.nameEn}
                    </option>
                  ))}
                </select>
              </label>

              {bodyStyles.length > 1 && (
                <label className="block text-xs text-muted-foreground">
                  Body style
                  <select
                    value={bodyStyleCode}
                    onChange={(e) => {
                      const code = e.target.value;
                      setBodyStyleCode(code);
                      setWheelFilter(null);
                      setForm((prev) => ({
                        ...prev,
                        bodyStyleCodes: code ? [code] : [],
                        configurationCodes: [],
                      }));
                    }}
                    className={inputClassName()}
                  >
                    <option value="">Any / all</option>
                    {bodyStyles.map((b) => (
                      <option key={b.code} value={b.code}>
                        {b.nameEn}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {wheelOptions.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground">Filter by wheels</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setWheelFilter(null)}
                      className={cn(
                        "h-7 rounded-lg border px-2 text-[11px] font-medium",
                        wheelFilter == null
                          ? "border-primary/40 bg-primary/15 text-primary"
                          : "border-white/10 text-muted-foreground hover:bg-white/5",
                      )}
                    >
                      All
                    </button>
                    {wheelOptions.map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setWheelFilter(w)}
                        className={cn(
                          "h-7 rounded-lg border px-2 text-[11px] font-medium",
                          wheelFilter === w
                            ? "border-primary/40 bg-primary/15 text-primary"
                            : "border-white/10 text-muted-foreground hover:bg-white/5",
                        )}
                      >
                        {w}W
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs text-muted-foreground">
                  {wheelFilter != null
                    ? `${wheelFilter}W · capacity`
                    : "Configurations (type · W · ton)"}
                </p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {configurations.length === 0 ? (
                    <p className="text-[11px] text-muted-foreground">
                      {form.categoryCode
                        ? "No configurations for this selection."
                        : "Choose a type first."}
                    </p>
                  ) : (
                    configurations.map((cfg) => {
                      const checked = form.configurationCodes.includes(cfg.code);
                      const ton =
                        cfg.loadingTonMin != null && cfg.loadingTonMax != null
                          ? cfg.loadingTonMin === cfg.loadingTonMax
                            ? `${cfg.loadingTonMax}T`
                            : `${cfg.loadingTonMin}-${cfg.loadingTonMax}T`
                          : null;
                      return (
                        <label
                          key={cfg.code}
                          className={cn(
                            "flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 text-xs",
                            checked
                              ? "border-primary/40 bg-primary/10 text-foreground"
                              : "border-white/10 text-muted-foreground hover:bg-white/5",
                          )}
                        >
                          <input
                            type="checkbox"
                            className="mt-0.5"
                            checked={checked}
                            onChange={(e) => {
                              setForm((prev) => {
                                const next = e.target.checked
                                  ? [...prev.configurationCodes, cfg.code]
                                  : prev.configurationCodes.filter((c) => c !== cfg.code);
                                return {
                                  ...prev,
                                  configurationCodes: next,
                                  bodyStyleCodes: bodyStyleCode
                                    ? [bodyStyleCode]
                                    : cfg.bodyStyleCode
                                      ? [cfg.bodyStyleCode]
                                      : prev.bodyStyleCodes,
                                };
                              });
                              setErrors((prev) => {
                                const { vehicle: _v, ...rest } = prev;
                                return rest;
                              });
                            }}
                          />
                          <span className="min-w-0">
                            <span className="font-medium text-foreground">
                              {configurationDisplayLabel(cfg)}
                            </span>
                            <span className="mt-0.5 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
                              {cfg.wheelsW != null && (
                                <span className="rounded bg-white/5 px-1.5 py-0.5">{cfg.wheelsW}W</span>
                              )}
                              {ton && (
                                <span className="rounded bg-white/5 px-1.5 py-0.5">{ton}</span>
                              )}
                              {cfg.lengthFt?.trim() && (
                                <span className="rounded bg-white/5 px-1.5 py-0.5">
                                  {cfg.lengthFt}FT
                                </span>
                              )}
                            </span>
                          </span>
                        </label>
                      );
                    })
                  )}
                </div>
                <FieldError message={errors.vehicle} />
                {(bandLabel || form.configurationCodes.length > 0) && (
                  <div className="mt-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[11px]">
                    {bandLabel && (
                      <p className="text-foreground">
                        Slot / capacity band:{" "}
                        <strong>{bandLabel}</strong>
                        {ceiling != null ? ` · ceiling ${ceiling}T per truck` : ""}
                      </p>
                    )}
                    {form.configurationCodes.length > 0 && (
                      <p className="mt-1 text-muted-foreground">
                        Selected: {summarizeConfigurations(catalog, form.configurationCodes)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Section>

      <Section title="3. Price & payment">
        <div className="flex gap-2">
          {(["fixed", "per_ton"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, priceType: type }))}
              className={cn(
                "h-8 flex-1 rounded-lg border text-xs font-semibold transition-colors",
                form.priceType === type
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-white/10 text-muted-foreground hover:bg-white/5",
              )}
            >
              {type === "fixed" ? "Fixed" : "Per ton"}
            </button>
          ))}
        </div>

        <label className="block text-xs text-muted-foreground">
          Network rate (₹{form.priceType === "per_ton" ? " / ton" : ""})
          <input
            type="number"
            min={1}
            value={form.priceAmount}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                priceAmount: Number(e.target.value) || 0,
              }))
            }
            className={inputClassName(Boolean(errors.priceAmount))}
          />
          <FieldError message={errors.priceAmount} />
        </label>

        <div>
          <label className="text-xs text-muted-foreground">
            Advance {form.advancePercentage}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={form.advancePercentage}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                advancePercentage: Number(e.target.value),
              }))
            }
            className="mt-2 w-full accent-[var(--primary)]"
          />
          <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
            <span>Advance ₹{totals.advance.toLocaleString("en-IN")}</span>
            <span>Balance ₹{totals.balance.toLocaleString("en-IN")}</span>
          </div>
          <FieldError message={errors.advancePercentage} />
        </div>
      </Section>

      <Section title="4. Listing window">
        <div className="flex flex-wrap gap-2">
          {LISTING_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, listingDuration: opt.id }))}
              className={cn(
                "h-8 rounded-lg border px-3 text-xs font-semibold",
                form.listingDuration === opt.id
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-white/10 text-muted-foreground hover:bg-white/5",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">
          How long the load stays visible on TranZfort Find Loads.
        </p>

        <label className="block text-xs text-muted-foreground">
          Plant / pickup notes (TSM only)
          <textarea
            value={form.plantNotes}
            onChange={(e) => setForm((prev) => ({ ...prev, plantNotes: e.target.value }))}
            rows={2}
            placeholder="Gate hours, weighbridge, docs…"
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-foreground"
          />
        </label>
      </Section>

      <Section title="5. Review">
        <div className="space-y-1 text-sm text-foreground">
          <p>
            {form.originCity || "—"} → {form.destinationCity || "—"}
          </p>
          <p className="text-xs text-muted-foreground">
            {form.material || "—"}
            {form.materialCode ? ` (${form.materialCode})` : ""} · {form.weightTonnes || "—"}T ·{" "}
            {form.trucksNeeded} truck(s)
          </p>
          <p className="text-xs text-muted-foreground">
            Vehicle: {summarizeConfigurations(catalog, form.configurationCodes)}
            {bandLabel ? ` · band ${bandLabel}` : ""}
          </p>
          <p className="text-xs text-muted-foreground">
            ₹{form.priceAmount.toLocaleString("en-IN")}
            {form.priceType === "per_ton" ? "/ton" : " fixed"} · Adv {form.advancePercentage}% ·{" "}
            {form.listingDuration.replace("_", " ")} · Pickup {form.pickupDate || "—"}
          </p>
          <p className="text-xs text-muted-foreground">
            Posts as {org?.company ?? "company"} · {modeLabel}
          </p>
        </div>
      </Section>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="accent"
          disabled={busy !== null || publishBlocked || liveCatalogBlocked}
          onClick={() => void publish()}
        >
          {busy === "publish" ? "Publishing…" : "Publish as Super Load"}
        </Button>
        <Button
          variant="outline"
          disabled={busy !== null || publishBlocked}
          onClick={() => void saveDraft()}
        >
          {busy === "draft" ? "Saving…" : "Save draft"}
        </Button>
        {onCancel && (
          <Button variant="outline" disabled={busy !== null} onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
