"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MaterialCatalogTypeahead,
  PlaceCatalogTypeahead,
  type MaterialPick,
  type PlacePick,
} from "@/components/app/catalog-typeaheads";
import { api, type ClientRecord } from "@/lib/api-client";
import type { Driver, Vehicle } from "@/lib/dev-store";
import { cn } from "@/lib/utils";

const STEPS = ["Client & route", "Load details", "Assignment", "Review"] as const;

export function CreateShipmentWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [loadingFleet, setLoadingFleet] = useState(true);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [catalogHint, setCatalogHint] = useState<string | null>(null);

  const [clientId, setClientId] = useState("");
  const [originPlace, setOriginPlace] = useState<PlacePick | null>(null);
  const [destPlace, setDestPlace] = useState<PlacePick | null>(null);
  const [originQuery, setOriginQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");
  const [material, setMaterial] = useState<MaterialPick | null>(null);
  const [materialQuery, setMaterialQuery] = useState("");
  const [tonnage, setTonnage] = useState("32");
  const [lrNumber, setLrNumber] = useState("");
  const [driverId, setDriverId] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const client = clients.find((c) => c.id === clientId);
  const selectedDriver = drivers.find((d) => d.id === driverId);
  const selectedVehicle = vehicles.find((v) => v.id === vehicleId);

  useEffect(() => {
    Promise.all([api.getClients(), api.getDrivers(), api.getVehicles()])
      .then(([c, d, v]) => {
        setClients(c);
        if (c[0]) setClientId(c[0].id);
        setDrivers(d.filter((x) => x.status !== "off_duty"));
        setVehicles(v.filter((x) => x.status === "available" || x.status === "on_trip"));
      })
      .catch(() => toast.error("Could not load clients or fleet options."))
      .finally(() => setLoadingFleet(false));

    fetch("/api/tsm/catalog/status")
      .then((r) => r.json())
      .then((json) => {
        const d = json.data;
        if (!d) return;
        if (d.ready) {
          setCatalogHint(
            `TZ catalogs ready · ${d.materialsCount} materials · ${d.placesCount.toLocaleString()} places`,
          );
        } else {
          setCatalogHint(
            "TZ catalogs not synced — run npm run catalog:sync (places/materials typeahead may be empty).",
          );
        }
      })
      .catch(() => undefined);
  }, []);

  function next() {
    if (step === 0) {
      if (!originPlace || !destPlace) {
        toast.error("Pick origin and destination from the TranZfort places catalog.");
        return;
      }
    }
    if (step === 1) {
      if (!material || Number(tonnage) <= 0) {
        toast.error("Pick a TranZfort material and enter tonnage.");
        return;
      }
    }
    if (step < STEPS.length - 1) setStep(step + 1);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  async function submit() {
    if (!client || !originPlace || !destPlace || !material) {
      toast.error("Client, places, and material are required.");
      return;
    }
    setSubmitting(true);
    try {
      const shipment = await api.createShipment({
        client: client.name,
        origin: originPlace.city,
        destination: destPlace.city,
        commodity: material.nameEn,
        tonnageMt: Number(tonnage),
        lrNumber: lrNumber.trim() || undefined,
        driverId: driverId || undefined,
        vehicleId: vehicleId || undefined,
        materialCode: material.code,
        originPlace: {
          city: originPlace.city,
          state: originPlace.state,
          lat: originPlace.lat,
          lng: originPlace.lng,
          label: originPlace.label,
        },
        destinationPlace: {
          city: destPlace.city,
          state: destPlace.state,
          lat: destPlace.lat,
          lng: destPlace.lng,
          label: destPlace.label,
        },
      });
      toast.success("Shipment created", {
        description: `${shipment.publicId} · ${originPlace.city} → ${destPlace.city}`,
      });
      router.push(`/shipments/${shipment.id}`);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not create shipment.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass = "mt-1 w-full";

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {STEPS.map((label, i) => (
          <span
            key={label}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              i === step
                ? "bg-primary/15 text-primary"
                : i < step
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-white/5 text-muted-foreground",
            )}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>

      {catalogHint && (
        <p className="mb-4 text-xs text-muted-foreground">{catalogHint}</p>
      )}

      <Card className="max-w-2xl">
        <CardContent className="space-y-4 p-6">
          {step === 0 && (
            <>
              <label className="block text-sm">
                <span className="text-label">Client</span>
                <select
                  className={cn(
                    fieldClass,
                    "rounded-lg border border-white/12 bg-white/[0.05] px-3 py-2 text-sm text-foreground",
                  )}
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  disabled={loadingFleet || clients.length === 0}
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <PlaceCatalogTypeahead
                  label="Origin (TZ places)"
                  value={originPlace}
                  query={originQuery}
                  onQueryChange={setOriginQuery}
                  onPick={setOriginPlace}
                  onClear={() => {
                    setOriginPlace(null);
                    setOriginQuery("");
                  }}
                />
                <PlaceCatalogTypeahead
                  label="Destination (TZ places)"
                  value={destPlace}
                  query={destQuery}
                  onQueryChange={setDestQuery}
                  onPick={setDestPlace}
                  onClear={() => {
                    setDestPlace(null);
                    setDestQuery("");
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Places come from TranZfort&apos;s offline India catalog (city, state, lat/lng) so Post
                to TZ can reuse them.
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <MaterialCatalogTypeahead
                label="Material (TZ catalog)"
                value={material}
                query={materialQuery}
                onQueryChange={setMaterialQuery}
                onPick={setMaterial}
                onClear={() => {
                  setMaterial(null);
                  setMaterialQuery("");
                }}
              />
              <label className="block text-sm">
                <span className="text-label">Tonnage (MT)</span>
                <Input
                  type="number"
                  min={1}
                  className={fieldClass}
                  value={tonnage}
                  onChange={(e) => setTonnage(e.target.value)}
                />
              </label>
              <label className="block text-sm">
                <span className="text-label">LR number (optional)</span>
                <Input
                  className={fieldClass}
                  placeholder="Auto-generated if empty"
                  value={lrNumber}
                  onChange={(e) => setLrNumber(e.target.value)}
                />
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm text-muted-foreground">
                Assign now or leave unassigned — it will appear on the dispatch board.
              </p>
              {loadingFleet ? (
                <p className="text-sm text-subtle">Loading drivers and vehicles…</p>
              ) : (
                <>
                  <label className="block text-sm">
                    <span className="text-label">Driver</span>
                    <select
                      className={cn(
                        fieldClass,
                        "rounded-lg border border-white/12 bg-white/[0.05] px-3 py-2 text-sm text-foreground",
                      )}
                      value={driverId}
                      onChange={(e) => setDriverId(e.target.value)}
                    >
                      <option value="">Unassigned</option>
                      {drivers.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} · {d.vehicle ?? "no vehicle"}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm">
                    <span className="text-label">Vehicle</span>
                    <select
                      className={cn(
                        fieldClass,
                        "rounded-lg border border-white/12 bg-white/[0.05] px-3 py-2 text-sm text-foreground",
                      )}
                      value={vehicleId}
                      onChange={(e) => setVehicleId(e.target.value)}
                    >
                      <option value="">Unassigned</option>
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.registration} · {v.type} · {v.capacityMt}T
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}
            </>
          )}

          {step === 3 && (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Client</dt>
                <dd>{client?.name ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Lane</dt>
                <dd className="text-right">
                  {originPlace?.label ?? "—"} → {destPlace?.label ?? "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Material</dt>
                <dd className="text-right">
                  {material?.nameEn ?? "—"}
                  {material ? (
                    <span className="ml-1 font-mono text-[10px] text-muted-foreground">
                      {material.code}
                    </span>
                  ) : null}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Tonnage</dt>
                <dd>{tonnage} MT</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Assignment</dt>
                <dd>
                  {selectedDriver?.name ?? "Unassigned"}
                  {selectedVehicle ? ` · ${selectedVehicle.registration}` : ""}
                </dd>
              </div>
            </dl>
          )}

          <div className="flex justify-between gap-3 pt-2">
            <Button type="button" variant="outline" onClick={back} disabled={step === 0 || submitting}>
              Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button type="button" variant="accent" onClick={next}>
                Continue
              </Button>
            ) : (
              <Button type="button" variant="accent" onClick={() => void submit()} disabled={submitting}>
                {submitting ? "Creating…" : "Create shipment"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
