"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api-client";
import { demoClients } from "@/lib/demo-data";
import type { Driver, Vehicle } from "@/lib/dev-store";
import { cn } from "@/lib/utils";

const STEPS = ["Client & route", "Load details", "Assignment", "Review"] as const;

export function CreateShipmentWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [loadingFleet, setLoadingFleet] = useState(true);

  const [clientId, setClientId] = useState(demoClients[0]?.id ?? "");
  const [origin, setOrigin] = useState("Amravati");
  const [destination, setDestination] = useState("Nagpur");
  const [commodity, setCommodity] = useState("Cement");
  const [tonnage, setTonnage] = useState("32");
  const [lrNumber, setLrNumber] = useState("");
  const [driverId, setDriverId] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const client = demoClients.find((c) => c.id === clientId);
  const selectedDriver = drivers.find((d) => d.id === driverId);
  const selectedVehicle = vehicles.find((v) => v.id === vehicleId);

  useEffect(() => {
    Promise.all([api.getDrivers(), api.getVehicles()])
      .then(([d, v]) => {
        setDrivers(d.filter((x) => x.status !== "off_duty"));
        setVehicles(v.filter((x) => x.status === "available" || x.status === "on_trip"));
      })
      .catch(() => toast.error("Could not load fleet options."))
      .finally(() => setLoadingFleet(false));
  }, []);

  function next() {
    if (step === 0 && (!origin.trim() || !destination.trim())) {
      toast.error("Origin and destination are required.");
      return;
    }
    if (step === 1 && (!commodity.trim() || Number(tonnage) <= 0)) {
      toast.error("Enter a valid commodity and tonnage.");
      return;
    }
    if (step < STEPS.length - 1) setStep(step + 1);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  async function submit() {
    if (!client) {
      toast.error("Select a client.");
      return;
    }
    setSubmitting(true);
    try {
      const shipment = await api.createShipment({
        client: client.name,
        origin: origin.trim(),
        destination: destination.trim(),
        commodity: commodity.trim(),
        tonnageMt: Number(tonnage),
        lrNumber: lrNumber.trim() || undefined,
        driverId: driverId || undefined,
        vehicleId: vehicleId || undefined,
      });
      toast.success("Shipment created", {
        description: `${shipment.publicId} · ${origin} → ${destination}`,
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

      <Card className="max-w-2xl">
        <CardContent className="space-y-4 p-6">
          {step === 0 && (
            <>
              <label className="block text-sm">
                <span className="text-label">Client</span>
                <select
                  className={cn(fieldClass, "rounded-lg border border-white/12 bg-white/[0.05] px-3 py-2 text-sm text-foreground")}
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                >
                  {demoClients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-label">Origin</span>
                  <Input className={fieldClass} value={origin} onChange={(e) => setOrigin(e.target.value)} />
                </label>
                <label className="block text-sm">
                  <span className="text-label">Destination</span>
                  <Input className={fieldClass} value={destination} onChange={(e) => setDestination(e.target.value)} />
                </label>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <label className="block text-sm">
                <span className="text-label">Commodity</span>
                <Input className={fieldClass} value={commodity} onChange={(e) => setCommodity(e.target.value)} />
              </label>
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
                      className={cn(fieldClass, "rounded-lg border border-white/12 bg-white/[0.05] px-3 py-2 text-sm text-foreground")}
                      value={driverId}
                      onChange={(e) => setDriverId(e.target.value)}
                    >
                      <option value="">Unassigned</option>
                      {drivers.map((d) => (
                        <option key={d.id} value={d.id}>{d.name} · {d.vehicle ?? "no vehicle"}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm">
                    <span className="text-label">Vehicle</span>
                    <select
                      className={cn(fieldClass, "rounded-lg border border-white/12 bg-white/[0.05] px-3 py-2 text-sm text-foreground")}
                      value={vehicleId}
                      onChange={(e) => setVehicleId(e.target.value)}
                    >
                      <option value="">Unassigned</option>
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>{v.registration} · {v.capacityMt} MT</option>
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
                <dt className="text-label">Client</dt>
                <dd className="font-medium text-heading">{client?.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-label">Route</dt>
                <dd>{origin} → {destination}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-label">Load</dt>
                <dd>{commodity} · {tonnage} MT</dd>
              </div>
              {lrNumber && (
                <div className="flex justify-between gap-4">
                  <dt className="text-label">LR</dt>
                  <dd className="font-mono">{lrNumber}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <dt className="text-label">Assignment</dt>
                <dd>
                  {selectedDriver
                    ? `${selectedDriver.name} · ${selectedVehicle?.registration ?? "—"}`
                    : "Unassigned"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-label">Est. charge</dt>
                <dd>₹{(Number(tonnage) * 420).toLocaleString("en-IN")}</dd>
              </div>
            </dl>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {step > 0 && (
              <Button variant="outline" onClick={back} disabled={submitting}>Back</Button>
            )}
            {step < STEPS.length - 1 ? (
              <Button variant="accent" onClick={next}>Next step</Button>
            ) : (
              <Button variant="accent" onClick={submit} disabled={submitting}>
                {submitting ? "Creating…" : "Create shipment"}
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/shipments">Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
