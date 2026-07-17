"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import type { ShipmentRecord } from "@/lib/dev-store";
import type { NetworkListing, NetworkPriceType } from "@/lib/network/listing-types";

type Props = {
  shipment: ShipmentRecord;
  existingListing?: NetworkListing | null;
  onPosted?: () => void;
  onCancel?: () => void;
};

function toDatetimeLocal(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function PostToTranZfortWizard({
  shipment,
  existingListing,
  onPosted,
  onCancel,
}: Props) {
  const router = useRouter();
  const isEdit = !!existingListing && !["withdrawn", "expired", "assigned"].includes(existingListing.state);
  const defaultRate = Math.max(1000, Math.round(shipment.tonnageMt * 420));

  const [trucksNeeded, setTrucksNeeded] = useState(existingListing?.trucksNeeded ?? 1);
  const [priceType, setPriceType] = useState<NetworkPriceType>(
    existingListing?.priceType ?? "fixed",
  );
  const [rateInr, setRateInr] = useState(existingListing?.rateInr ?? defaultRate);
  const [advancePercent, setAdvancePercent] = useState(existingListing?.advancePercent ?? 30);
  const [bodyType, setBodyType] = useState(existingListing?.bodyType ?? "Open");
  const [tyres, setTyres] = useState(existingListing?.tyres ?? 10);
  const [pickupWindowStart, setPickupWindowStart] = useState(
    toDatetimeLocal(existingListing?.pickupWindowStart),
  );
  const [pickupWindowEnd, setPickupWindowEnd] = useState(
    toDatetimeLocal(existingListing?.pickupWindowEnd),
  );
  const [plantNotes, setPlantNotes] = useState(existingListing?.plantNotes ?? "");
  const [busy, setBusy] = useState(false);

  const advanceAmt = useMemo(
    () => Math.round((rateInr * advancePercent) / 100),
    [rateInr, advancePercent],
  );
  const balanceAmt = rateInr - advanceAmt;

  const payload = {
    trucksNeeded,
    rateInr,
    bodyType,
    tyres,
    pickupWindowStart: pickupWindowStart
      ? new Date(pickupWindowStart).toISOString()
      : undefined,
    pickupWindowEnd: pickupWindowEnd ? new Date(pickupWindowEnd).toISOString() : undefined,
    plantNotes: plantNotes || undefined,
  };

  async function publish() {
    setBusy(true);
    try {
      if (isEdit) {
        await api.updateNetworkListing(shipment.id, { ...payload, publish: true });
        toast.success("Listing updated and published");
      } else {
        await api.postNetworkListing({
          shipmentId: shipment.id,
          priceType,
          advancePercent,
          ...payload,
          publish: true,
        });
        toast.success("Posted to TranZfort — verified partners can request");
      }
      onPosted?.();
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not post listing");
    } finally {
      setBusy(false);
    }
  }

  async function saveDraft() {
    setBusy(true);
    try {
      if (isEdit && existingListing?.state === "draft") {
        await api.updateNetworkListing(shipment.id, payload);
        toast.success("Draft saved");
      } else if (!isEdit) {
        await api.postNetworkListing({
          shipmentId: shipment.id,
          priceType,
          advancePercent,
          ...payload,
          publish: false,
        });
        toast.success("Draft saved — publish when ready");
      } else {
        await api.updateNetworkListing(shipment.id, payload);
        toast.success("Listing updated");
      }
      onPosted?.();
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save draft");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="glass space-y-4 rounded-2xl p-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground">
          {isEdit ? "Edit TranZfort listing" : "Post to TranZfort"}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          ZAFTYS is the supplier. Shipper stays on ZAFTYS track — partners never see client
          settlement.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm">
        <p className="font-medium text-foreground">
          {shipment.origin} → {shipment.destination}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {shipment.commodity} · {shipment.tonnageMt}T · {shipment.client}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-xs text-muted-foreground">
          Trucks needed
          <input
            type="number"
            min={1}
            max={20}
            value={trucksNeeded}
            onChange={(e) => setTrucksNeeded(Number(e.target.value) || 1)}
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-foreground"
          />
        </label>
        <label className="block text-xs text-muted-foreground">
          Body type
          <select
            value={bodyType}
            onChange={(e) => setBodyType(e.target.value)}
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-foreground"
          >
            <option value="Open">Open</option>
            <option value="Trailer">Trailer</option>
            <option value="Container">Container</option>
            <option value="Tipper">Tipper</option>
          </select>
        </label>
        <label className="block text-xs text-muted-foreground">
          Tyres
          <input
            type="number"
            min={6}
            max={22}
            value={tyres}
            onChange={(e) => setTyres(Number(e.target.value) || 10)}
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-foreground"
          />
        </label>
      </div>

      {!isEdit && (
        <div className="flex gap-2">
          {(["fixed", "per_ton"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setPriceType(type)}
              className={`h-8 flex-1 rounded-lg text-xs font-semibold border transition-colors ${
                priceType === type
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-white/10 text-muted-foreground hover:bg-white/5"
              }`}
            >
              {type === "fixed" ? "Fixed" : "Per ton"}
            </button>
          ))}
        </div>
      )}

      <label className="block text-xs text-muted-foreground">
        Network rate (₹{!isEdit && priceType === "per_ton" ? " / ton" : ""})
        <input
          type="number"
          min={1}
          value={rateInr}
          onChange={(e) => setRateInr(Number(e.target.value) || 0)}
          className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-foreground"
        />
      </label>

      {!isEdit && (
        <div>
          <label className="text-xs text-muted-foreground">
            Advance {advancePercent}%
          </label>
          <input
            type="range"
            min={0}
            max={50}
            value={advancePercent}
            onChange={(e) => setAdvancePercent(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--primary)]"
          />
          <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
            <span>Advance ₹{advanceAmt.toLocaleString("en-IN")}</span>
            <span>Balance ₹{balanceAmt.toLocaleString("en-IN")}</span>
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-xs text-muted-foreground">
          Pickup window start
          <input
            type="datetime-local"
            value={pickupWindowStart}
            onChange={(e) => setPickupWindowStart(e.target.value)}
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-foreground"
          />
        </label>
        <label className="block text-xs text-muted-foreground">
          Pickup window end
          <input
            type="datetime-local"
            value={pickupWindowEnd}
            onChange={(e) => setPickupWindowEnd(e.target.value)}
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-foreground"
          />
        </label>
      </div>

      <label className="block text-xs text-muted-foreground">
        Plant / pickup notes
        <textarea
          value={plantNotes}
          onChange={(e) => setPlantNotes(e.target.value)}
          rows={2}
          placeholder="Gate hours, weighbridge, docs…"
          className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-foreground"
        />
      </label>

      <p className="text-[11px] text-muted-foreground">
        Visibility: <span className="text-foreground">Verified network</span> (KYC partners only —
        not a public board)
      </p>

      <div className="flex flex-wrap gap-2">
        <Button variant="accent" disabled={busy || rateInr < 1} onClick={publish}>
          {busy ? "Saving…" : isEdit && existingListing?.state === "draft" ? "Publish load" : "Post load"}
        </Button>
        <Button variant="outline" disabled={busy || rateInr < 1} onClick={saveDraft}>
          Save draft
        </Button>
        {onCancel && (
          <Button variant="outline" disabled={busy} onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
