"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import type { Driver, Vehicle } from "@/lib/dev-store";
import { glassInput } from "@/lib/surface";
import { cn } from "@/lib/utils";

interface AssignDriverDrawerProps {
  shipmentId: string;
  shipmentLabel: string;
  open: boolean;
  onClose: () => void;
  onAssigned: () => void;
}

export function AssignDriverDrawer({
  shipmentId,
  shipmentLabel,
  open,
  onClose,
  onAssigned,
}: AssignDriverDrawerProps) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [driverId, setDriverId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    api
      .getAssignOptions(shipmentId)
      .then(({ drivers: d, vehicles: v }) => {
        setDrivers(d);
        setVehicles(v);
        setDriverId("");
        setVehicleId("");
      })
      .catch(() => toast.error("Could not load drivers and vehicles."))
      .finally(() => setLoading(false));
  }, [open, shipmentId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!driverId || !vehicleId) return;
    setSubmitting(true);
    try {
      await api.assignShipment(shipmentId, driverId, vehicleId);
      toast.success(`Driver assigned to ${shipmentLabel}.`);
      onAssigned();
      onClose();
    } catch {
      toast.error("Could not assign driver. Check vehicle availability and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        aria-label="Close drawer"
        onClick={onClose}
      />
      <div className="glass-strong fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-heading">Assign driver</h2>
            <p className="font-mono text-sm text-muted-foreground">{shipmentLabel}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-auto p-6">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading options…</p>
          ) : (
            <>
              <label className="block text-sm font-medium text-heading" htmlFor="driver">
                Driver
              </label>
              <select
                id="driver"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className={cn("mt-1 mb-4 w-full rounded-xl px-3 py-2 text-sm", glassInput)}
                required
              >
                <option value="">Select driver</option>
                {drivers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} · {d.status.replace("_", " ")}
                  </option>
                ))}
              </select>

              <label className="block text-sm font-medium text-heading" htmlFor="vehicle">
                Vehicle
              </label>
              <select
                id="vehicle"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className={cn("mt-1 mb-4 w-full rounded-xl px-3 py-2 text-sm", glassInput)}
                required
              >
                <option value="">Select vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.registration} · {v.capacityMt} MT · docs {v.docs}
                  </option>
                ))}
              </select>

              {vehicles.length === 0 && (
                <p className="mb-4 text-xs text-warning">
                  No available vehicles meet capacity and document requirements.
                </p>
              )}
            </>
          )}

          <div className="mt-auto flex gap-2 pt-6">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="accent"
              className={cn("flex-1", submitting && "opacity-70")}
              disabled={submitting || loading || !driverId || !vehicleId}
            >
              {submitting ? "Assigning…" : "Confirm assign"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
