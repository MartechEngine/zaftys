"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/app/data-table";
import type {
  BookingInboxListResult,
  BookingInboxRow,
  BookingInboxTab,
} from "@/lib/tsm/bookings-types";

const PAGE_SIZE = 25;

const TABS: { id: BookingInboxTab; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "decided", label: "Decided" },
  { id: "all", label: "All" },
];

function statusLabel(status: string) {
  return status.replace(/_/g, " ");
}

export function BookingInboxDesk() {
  const [tab, setTab] = useState<BookingInboxTab>("pending");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState<BookingInboxListResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        status: tab,
        limit: String(PAGE_SIZE),
        offset: String(page * PAGE_SIZE),
      });
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`/api/tsm/tranzfort/bookings?${params}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error?.message ?? "Could not load bookings.");
        setData(null);
        return;
      }
      setData(json.data as BookingInboxListResult);
    } catch {
      setError("Could not reach the server.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [tab, q, page]);

  useEffect(() => {
    void load();
  }, [load]);

  async function act(row: BookingInboxRow, action: "approve" | "reject") {
    if (row.status !== "submitted") return;
    setBusyId(row.id);
    try {
      const res = await fetch(`/api/tsm/tranzfort/bookings/${encodeURIComponent(row.id)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error?.message ?? `${action} failed`);
        return;
      }
      toast.success(
        action === "approve"
          ? (json.data?.message as string) ?? "Booking approved"
          : (json.data?.message as string) ?? "Booking rejected",
      );
      await load();
    } catch {
      toast.error("Could not reach the server.");
    } finally {
      setBusyId(null);
    }
  }

  const total = data?.total ?? 0;
  const shownFrom = total === 0 ? 0 : page * PAGE_SIZE + 1;
  const shownTo = Math.min((page + 1) * PAGE_SIZE, total);
  const hasPrev = page > 0;
  const hasNext = shownTo < total;
  const actionsOk = data?.actionsAvailable !== false;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-0.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(t.id);
                setPage(0);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs ${
                tab === t.id
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(0);
            }}
            placeholder="Search trucker / lane / material"
            className="h-9 w-52 sm:w-72"
          />
          <Button type="button" variant="outline" size="sm" onClick={() => void load()}>
            Refresh
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/network/my-loads">My Loads</Link>
          </Button>
          <Button asChild variant="accent" size="sm">
            <Link href="/dispatch">Dispatch board</Link>
          </Button>
        </div>
      </div>

      {data?.honesty && (
        <p className="text-xs text-muted-foreground">
          {data.honesty}
          {data.supplierIdMasked ? ` · supplier ${data.supplierIdMasked}` : ""}
          {data.source === "mock" ? " · Mock" : " · Live"}
        </p>
      )}

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {loading && !data ? (
        <p className="text-sm text-muted-foreground">Loading bookings…</p>
      ) : (
        <DataTable<BookingInboxRow>
          rows={data?.items ?? []}
          emptyMessage={
            data?.linked
              ? tab === "pending"
                ? "No pending booking requests."
                : "No bookings in this view."
              : "Link a TranZfort supplier to see bookings."
          }
          columns={[
            {
              key: "lane",
              header: "Load / lane",
              render: (r) => (
                <div className="min-w-[12rem] space-y-1">
                  <p className="font-medium text-heading">
                    {r.originLabel} → {r.destinationLabel}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                    <span>{r.material}</span>
                    {r.isSuperLoad && (
                      <span className="rounded-full bg-violet-500/15 px-1.5 py-0.5 text-[10px] text-violet-200">
                        Super
                      </span>
                    )}
                    {r.postedFromTsm && (
                      <span className="rounded-full bg-sky-500/15 px-1.5 py-0.5 text-[10px] text-sky-200">
                        From TSM
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {r.loadId} · slots {r.trucksBooked}/{r.trucksNeeded}
                  </p>
                </div>
              ),
            },
            {
              key: "trucker",
              header: "Trucker / truck",
              render: (r) => (
                <div className="space-y-0.5">
                  <p className="font-medium text-heading">{r.truckerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {[r.truckNumber, r.truckBodyType, r.truckTyres != null ? `${r.truckTyres}W` : null]
                      .filter(Boolean)
                      .join(" · ") || "—"}
                  </p>
                  {r.truckerVerification && (
                    <p className="text-[11px] capitalize text-muted-foreground">
                      {r.truckerVerification}
                      {r.truckerRating != null ? ` · ★ ${r.truckerRating}` : ""}
                    </p>
                  )}
                </div>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (r) => (
                <div className="space-y-1">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs capitalize ${
                      r.status === "submitted"
                        ? "bg-amber-500/15 text-amber-200"
                        : r.status === "approved"
                          ? "bg-emerald-500/15 text-emerald-200"
                          : "bg-white/10 text-muted-foreground"
                    }`}
                  >
                    {statusLabel(r.status)}
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}
                  </p>
                </div>
              ),
            },
            {
              key: "actions",
              header: "",
              render: (r) =>
                r.status === "submitted" ? (
                  <div className="flex flex-wrap gap-1.5">
                    <Button
                      type="button"
                      size="sm"
                      variant="accent"
                      disabled={!actionsOk || busyId === r.id}
                      onClick={() => void act(r, "approve")}
                    >
                      Approve
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={!actionsOk || busyId === r.id}
                      onClick={() => void act(r, "reject")}
                    >
                      Reject
                    </Button>
                  </div>
                ) : r.tripId ? (
                  <span className="font-mono text-[11px] text-muted-foreground">
                    trip {r.tripId.slice(0, 8)}…
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                ),
            },
          ]}
        />
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{total === 0 ? "0 bookings" : `${shownFrom}–${shownTo} of ${total}`}</span>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={!hasPrev || loading}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Previous
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={!hasNext || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
