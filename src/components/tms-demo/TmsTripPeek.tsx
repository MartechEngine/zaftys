import { useMemo, useState } from "react";
import { ArrowRight, FileCheck2, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { TmsDemoFrame } from "./TmsDemoFrame";
import {
  BOARD_COLUMNS,
  DEMO_KPIS,
  DEMO_TRIPS,
  STATUS_CLASS,
  STATUS_LABEL,
  STATUS_ORDER,
  type DemoTrip,
  type TripStatus,
} from "./fixtures";

type Persona = "fleet" | "shipper";

type TmsTripPeekProps = {
  className?: string;
  /** compact fits former image slots; full adds KPI strip + more board detail */
  density?: "compact" | "full";
};

function nextStatus(status: TripStatus): TripStatus | null {
  const i = STATUS_ORDER.indexOf(status);
  if (i < 0 || i >= STATUS_ORDER.length - 1) return null;
  return STATUS_ORDER[i + 1] ?? null;
}

function boardColumnFor(status: TripStatus): TripStatus {
  return status;
}

export function TmsTripPeek({ className, density = "full" }: TmsTripPeekProps) {
  const [persona, setPersona] = useState<Persona>("fleet");
  const [trips, setTrips] = useState<DemoTrip[]>(() => DEMO_TRIPS.map((t) => ({ ...t })));
  const [focusId, setFocusId] = useState(DEMO_TRIPS[0]?.id ?? "");

  const focus = trips.find((t) => t.id === focusId) ?? trips[0];
  const compact = density === "compact";

  const columns = useMemo(() => {
    return BOARD_COLUMNS.map((col) => ({
      ...col,
      trips: trips.filter((t) => {
        if (col.key === "backlog") return false;
        return boardColumnFor(t.status) === col.key;
      }),
    }));
  }, [trips]);

  function advanceFocus() {
    if (!focus) return;
    const n = nextStatus(focus.status);
    if (!n) return;
    setTrips((prev) => prev.map((t) => (t.id === focus.id ? { ...t, status: n } : t)));
  }

  function resetDemo() {
    setTrips(DEMO_TRIPS.map((t) => ({ ...t })));
    setFocusId(DEMO_TRIPS[0]?.id ?? "");
    setPersona("fleet");
  }

  return (
    <TmsDemoFrame className={cn("w-full", className)} compact={compact}>
      <div className={cn("space-y-3", compact ? "p-3" : "p-4")}>
        <div
          className="flex rounded-lg border p-0.5 text-xs"
          style={{ borderColor: "var(--tms-border)", background: "rgba(255,255,255,0.03)" }}
          role="tablist"
          aria-label="TMS preview persona"
        >
          {(
            [
              { id: "fleet" as const, label: "Fleet ops" },
              { id: "shipper" as const, label: "Shipper portal" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={persona === tab.id}
              onClick={() => setPersona(tab.id)}
              className={cn(
                "flex-1 rounded-md px-2 py-1.5 transition-colors",
                persona === tab.id
                  ? "bg-white/10 text-[var(--tms-heading)]"
                  : "text-[var(--tms-muted)] hover:text-[var(--tms-heading)]",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {!compact ? (
          <div className="grid grid-cols-4 gap-2">
            {DEMO_KPIS.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-lg border px-2 py-2"
                style={{ borderColor: "var(--tms-border)", background: "var(--tms-card)" }}
              >
                <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--tms-muted)" }}>
                  {kpi.label}
                </p>
                <p className="text-sm font-bold tabular-nums mt-0.5">{kpi.value}</p>
              </div>
            ))}
          </div>
        ) : null}

        {persona === "fleet" ? (
          <FleetBoard
            columns={columns}
            focusId={focus?.id}
            onSelect={setFocusId}
            compact={compact}
          />
        ) : (
          <ShipperView trip={focus} compact={compact} />
        )}

        {focus ? (
          <div
            className="rounded-lg border p-3"
            style={{ borderColor: "var(--tms-border)", background: "var(--tms-card)" }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--tms-muted)" }}>
                  Active trip
                </p>
                <p className="text-sm font-semibold truncate">{focus.id}</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: "var(--tms-muted)" }}>
                  {focus.cargo} · {focus.route}
                </p>
              </div>
              <span className={cn("tms-status shrink-0", STATUS_CLASS[focus.status])}>
                {STATUS_LABEL[focus.status]}
              </span>
            </div>

            <div className="flex gap-1 mb-3" aria-hidden>
              {STATUS_ORDER.map((s, i) => {
                const current = STATUS_ORDER.indexOf(focus.status);
                const done = i <= current;
                return (
                  <div
                    key={s}
                    className="h-1 flex-1 rounded-full transition-colors"
                    style={{
                      background: done ? "var(--tms-primary)" : "rgba(255,255,255,0.08)",
                    }}
                  />
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={advanceFocus}
                disabled={!nextStatus(focus.status)}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "var(--tms-primary)", color: "#040a11" }}
              >
                <Play size={12} />
                {nextStatus(focus.status)
                  ? `Advance to ${STATUS_LABEL[nextStatus(focus.status)!]}`
                  : "Trip complete"}
              </button>
              <button
                type="button"
                onClick={resetDemo}
                className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold"
                style={{ borderColor: "var(--tms-border)", color: "var(--tms-muted)" }}
              >
                <RotateCcw size={12} />
                Reset
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </TmsDemoFrame>
  );
}

function FleetBoard({
  columns,
  focusId,
  onSelect,
  compact,
}: {
  columns: { key: string; label: string; trips: DemoTrip[] }[];
  focusId?: string;
  onSelect: (id: string) => void;
  compact: boolean;
}) {
  const visible = columns;

  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--tms-muted)" }}>
        Dispatch board · tap a trip
      </p>
      <div className={cn("grid gap-2", compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4")}>
        {visible.map((col) => (
          <div
            key={col.key}
            className="rounded-lg border min-h-[88px] p-1.5"
            style={{ borderColor: "var(--tms-border)", background: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex items-center justify-between px-1 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "var(--tms-muted)" }}>
                {col.label}
              </span>
              <span className="text-[10px] tabular-nums" style={{ color: "var(--tms-muted)" }}>
                {col.trips.length}
              </span>
            </div>
            <div className="space-y-1.5">
              {col.trips.length === 0 ? (
                <p className="text-[10px] px-1 py-2" style={{ color: "var(--tms-muted)" }}>
                  —
                </p>
              ) : (
                col.trips.slice(0, compact ? 2 : 3).map((trip) => (
                  <button
                    key={trip.id}
                    type="button"
                    onClick={() => onSelect(trip.id)}
                    className={cn(
                      "w-full text-left rounded-md border px-2 py-1.5 transition-colors",
                      focusId === trip.id ? "ring-1 ring-[var(--tms-primary)]" : "hover:border-white/20",
                    )}
                    style={{
                      borderColor: focusId === trip.id ? "rgba(0,169,251,0.5)" : "var(--tms-border)",
                      background: "var(--tms-card)",
                    }}
                  >
                    <p className="text-[10px] font-bold truncate">{trip.id.replace("ZFT-2026-", "")}</p>
                    <p className="text-[10px] truncate mt-0.5" style={{ color: "var(--tms-muted)" }}>
                      {trip.route}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShipperView({ trip, compact }: { trip?: DemoTrip; compact: boolean }) {
  if (!trip) return null;
  const epodReady = trip.status === "delivered";

  return (
    <div
      className="rounded-lg border p-3"
      style={{ borderColor: "var(--tms-border)", background: "var(--tms-card)" }}
    >
      <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--tms-muted)" }}>
        Client portal · shipment status
      </p>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold">{trip.id}</p>
          <p className="text-xs mt-1" style={{ color: "var(--tms-muted)" }}>
            {trip.cargo}
          </p>
          <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "var(--tms-muted)" }}>
            {trip.route} <ArrowRight size={10} /> plant window tracked
          </p>
        </div>
        <span className={cn("tms-status shrink-0", STATUS_CLASS[trip.status])}>
          {STATUS_LABEL[trip.status]}
        </span>
      </div>

      {!compact ? (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-md border px-2 py-2" style={{ borderColor: "var(--tms-border)" }}>
            <p style={{ color: "var(--tms-muted)" }} className="text-[10px] uppercase">
              Vehicle
            </p>
            <p className="mt-0.5 font-medium">{trip.vehicle}</p>
          </div>
          <div className="rounded-md border px-2 py-2" style={{ borderColor: "var(--tms-border)" }}>
            <p style={{ color: "var(--tms-muted)" }} className="text-[10px] uppercase">
              Origin
            </p>
            <p className="mt-0.5 font-medium">{trip.origin}</p>
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "mt-3 flex items-center gap-2 rounded-md border px-2.5 py-2 text-xs",
          epodReady ? "opacity-100" : "opacity-60",
        )}
        style={{ borderColor: "var(--tms-border)" }}
      >
        <FileCheck2 size={14} style={{ color: epodReady ? "var(--tms-success)" : "var(--tms-muted)" }} />
        <span>
          {epodReady
            ? "ePOD ready · LR & weighbridge ticket attached"
            : "Documents unlock when the trip is delivered"}
        </span>
      </div>
    </div>
  );
}
