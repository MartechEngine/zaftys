"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PostToTranZfortWizard } from "@/components/app/post-to-tranzfort-wizard";
import { api } from "@/lib/api-client";
import type { ShipmentRecord } from "@/lib/dev-store";
import {
  LISTING_STATE_LABEL,
  type NetworkListing,
  type NetworkOffer,
} from "@/lib/network/listing-types";
import { cn } from "@/lib/utils";

type Props = {
  shipmentId: string;
  shipment?: ShipmentRecord;
  refreshKey?: number;
  onChanged?: () => void;
};

export function NetworkListingChip({ listing }: { listing: NetworkListing | null }) {
  if (!listing) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        listing.state === "offers_received" || listing.state === "partially_assigned"
          ? "bg-amber-500/15 text-amber-200"
          : listing.state === "assigned"
            ? "bg-emerald-500/15 text-emerald-300"
            : listing.state === "posted"
              ? "bg-primary/15 text-primary"
              : "bg-white/10 text-muted-foreground",
      )}
    >
      TranZfort · {LISTING_STATE_LABEL[listing.state]}
      {listing.trucksNeeded > 1
        ? ` · ${listing.trucksFilled}/${listing.trucksNeeded} trucks`
        : ""}
    </span>
  );
}

export function NetworkOffersPanel({
  shipmentId,
  shipment,
  refreshKey = 0,
  onChanged,
}: Props) {
  const router = useRouter();
  const [listing, setListing] = useState<NetworkListing | null>(null);
  const [offers, setOffers] = useState<NetworkOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getShipmentNetworkListing(shipmentId);
      setListing(data.listing);
      setOffers(data.offers);
    } catch {
      setListing(null);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  }, [shipmentId]);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  async function accept(id: string) {
    setBusyId(id);
    try {
      const result = await api.acceptNetworkOffer(id);
      toast.success(
        result.listing.state === "assigned"
          ? "Partner accepted — shipment dispatched"
          : `Slot filled · ${result.listing.trucksFilled}/${result.listing.trucksNeeded}`,
      );
      await load();
      onChanged?.();
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not accept offer");
    } finally {
      setBusyId(null);
    }
  }

  async function reject(id: string) {
    setBusyId(id);
    try {
      await api.rejectNetworkOffer(id);
      toast.success("Offer rejected");
      await load();
      onChanged?.();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not reject offer");
    } finally {
      setBusyId(null);
    }
  }

  async function withdraw() {
    setBusyId("withdraw");
    try {
      await api.withdrawNetworkListing(shipmentId);
      toast.success("Listing withdrawn");
      await load();
      onChanged?.();
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not withdraw");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading network…</p>;
  }

  if (!listing) {
    return (
      <p className="text-sm text-muted-foreground">
        No TranZfort listing yet. Use <strong className="text-foreground">Post to TranZfort</strong>{" "}
        when own fleet cannot cover this load.
      </p>
    );
  }

  const openOffers = offers.filter((o) => o.status === "open");
  const canWithdraw = !["assigned", "withdrawn", "expired"].includes(listing.state);
  const canEdit = !["assigned", "withdrawn", "expired"].includes(listing.state);

  if (editing && shipment) {
    return (
      <PostToTranZfortWizard
        shipment={shipment}
        existingListing={listing}
        onPosted={() => {
          setEditing(false);
          void load();
          onChanged?.();
        }}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1">
          <NetworkListingChip listing={listing} />
          <p className="text-xs text-muted-foreground">
            ₹{listing.rateInr.toLocaleString("en-IN")}
            {listing.priceType === "per_ton" ? "/ton" : ""} · Advance {listing.advancePercent}% ·{" "}
            {listing.visibility === "verified_open" ? "Verified network" : "Invite only"}
            {listing.tyres ? ` · ${listing.tyres} tyres` : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canEdit && shipment && (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              Edit listing
            </Button>
          )}
          {canWithdraw && (
            <Button
              variant="outline"
              size="sm"
              disabled={busyId === "withdraw"}
              onClick={withdraw}
            >
              Withdraw listing
            </Button>
          )}
        </div>
      </div>

      {openOffers.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {listing.state === "posted"
            ? "Waiting for partner requests…"
            : "No open offers."}
        </p>
      ) : (
        <ul className="space-y-3">
          {openOffers.map((offer) => (
            <li
              key={offer.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {offer.partnerName}
                  {offer.verified ? (
                    <span className="ml-2 text-[10px] font-semibold uppercase text-emerald-300">
                      Verified
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-muted-foreground">
                  ★ {offer.rating} · {offer.truckLabel} · {offer.bodyType} · {offer.tyres} tyres
                  {offer.rateInr
                    ? ` · ₹${offer.rateInr.toLocaleString("en-IN")}`
                    : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="accent"
                  disabled={busyId === offer.id}
                  onClick={() => accept(offer.id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busyId === offer.id}
                  onClick={() => reject(offer.id)}
                >
                  Reject
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {offers.filter((o) => o.status !== "open").length > 0 && (
        <div className="text-xs text-muted-foreground">
          Closed:{" "}
          {offers
            .filter((o) => o.status !== "open")
            .map((o) => `${o.partnerName} (${o.status})`)
            .join(" · ")}
        </div>
      )}
    </div>
  );
}
