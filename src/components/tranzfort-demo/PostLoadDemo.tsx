import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_ROUTE, HERO_LOAD, HERO_ROUTE_PREVIEW } from "./fixtures/loads";
import { SAMPLE_BOOKING_REQUESTS } from "./fixtures/booking-requests";
import { BookingRequestCard } from "./app-ui/BookingRequestCard";
import { MarketplaceRouteLine } from "./app-ui/MarketplaceRouteLine";
import { formatInr } from "./app-ui/formatters";

type PostLoadDemoProps = {
  className?: string;
  theme?: "app" | "dark";
};

type PostState = "idle" | "posting" | "requests" | "done";

export function PostLoadDemo({ className, theme = "app" }: PostLoadDemoProps) {
  const [advance, setAdvance] = useState(30);
  const [priceType, setPriceType] = useState<"fixed" | "per_ton">("fixed");
  const [state, setState] = useState<PostState>("idle");
  const topRequest = SAMPLE_BOOKING_REQUESTS[0];
  const isApp = theme === "app";
  const advanceAmt = Math.round((HERO_LOAD.priceInr * advance) / 100);
  const balanceAmt = HERO_LOAD.priceInr - advanceAmt;

  const postLoad = () => {
    if (state !== "idle" && state !== "done") return;
    setState("posting");
    window.setTimeout(() => setState("requests"), 700);
  };

  const approve = () => setState("done");
  const reset = () => setState("idle");

  const shell = isApp ? "app-card rounded-xl p-2.5 space-y-2" : "space-y-3";
  const labelClass = isApp
    ? "text-[9px] uppercase tracking-wider app-text-muted font-semibold"
    : "text-[10px] uppercase tracking-wider text-white/50";
  const btnPrimary = isApp
    ? "bg-gradient-to-r from-[#0E8C84] to-[#0A5550]"
    : "bg-gradient-brand";

  return (
    <div
      className={cn(
        "px-2.5 pt-2 pb-1 space-y-2.5",
        isApp ? "app-canvas" : "p-3 space-y-3 text-white",
        className,
      )}
    >
      {state === "idle" && (
        <div className={shell}>
          {isApp ? (
            <>
              <MarketplaceRouteLine
                originCity={DEFAULT_ROUTE.origin}
                originState={HERO_LOAD.originState}
                destinationCity={DEFAULT_ROUTE.destination}
                destinationState={HERO_LOAD.destinationState}
              />
              <p className="text-[10px] text-[#0E8C84] font-medium">
                {HERO_ROUTE_PREVIEW.distanceKm} km · ~
                {Math.round(HERO_ROUTE_PREVIEW.driveMins / 60)}h drive
              </p>
              <p className="text-[10px] app-text-secondary">
                {HERO_LOAD.material} · {HERO_LOAD.weightTonnes}T · {HERO_LOAD.bodyType} · 2 trucks
              </p>
              <div className="flex gap-1">
                {(["fixed", "per_ton"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPriceType(type)}
                    className={cn(
                      "flex-1 h-7 rounded-lg text-[10px] font-semibold border transition-colors",
                      priceType === type ? "app-filter-chip-selected" : "app-filter-chip",
                    )}
                  >
                    {type === "fixed" ? "Fixed" : "Per ton"}
                  </button>
                ))}
              </div>
              <div className="text-lg font-extrabold app-text-primary">
                {formatInr(HERO_LOAD.priceInr)}
              </div>
              <label className={labelClass}>Advance {advance}%</label>
              <input
                type="range"
                min={0}
                max={50}
                value={advance}
                onChange={(e) => setAdvance(Number(e.target.value))}
                className="w-full h-1 accent-[#0E8C84]"
              />
              <div className="flex justify-between text-[10px] app-text-secondary">
                <span>Advance {formatInr(advanceAmt)}</span>
                <span>Balance {formatInr(balanceAmt)}</span>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                <DarkField label="From" value={DEFAULT_ROUTE.origin} />
                <DarkField label="To" value={DEFAULT_ROUTE.destination} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <DarkField label="Weight (T)" value={`${HERO_LOAD.weightTonnes}`} />
                <DarkField label="Price (₹)" value={`${HERO_LOAD.priceInr}`} />
              </div>
            </>
          )}

          {state === "idle" && (
            <button
              type="button"
              onClick={postLoad}
              className={cn(
                "w-full h-9 rounded-lg text-white text-xs font-semibold",
                btnPrimary,
              )}
            >
              Post load
            </button>
          )}
        </div>
      )}

      {state === "posting" && (
        <div className="flex items-center justify-center gap-2 py-8">
          <Loader2 className={cn("h-5 w-5 animate-spin", isApp ? "text-[#0E8C84]" : "text-teal-glow")} />
          <span className={cn("text-xs", isApp ? "app-text-secondary" : "text-white/70")}>
            Publishing to Find Loads…
          </span>
        </div>
      )}

      {state === "requests" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px]">
            <span className={cn("font-semibold", isApp ? "app-text-primary" : "text-white/80")}>
              Booking requests
            </span>
            <span className="text-[#D97706] font-bold">{SAMPLE_BOOKING_REQUESTS.length} new</span>
          </div>
          <BookingRequestCard request={topRequest} onApprove={approve} />
          <p className={cn("text-[10px] text-center", isApp ? "app-text-muted" : "text-white/45")}>
            +2 more requests
          </p>
        </div>
      )}

      {state === "done" && (
        <div className="space-y-2">
          <div
            className={cn(
              "rounded-xl p-3 flex items-start gap-2",
              isApp
                ? "app-card border border-[#0E8C84]/25"
                : "border border-orange/30 bg-orange/10",
            )}
          >
            <Check className={cn("h-5 w-5 shrink-0", isApp ? "text-[#0E8C84]" : "text-orange-glow")} />
            <div>
              <p className={cn("text-sm font-semibold", isApp ? "app-text-primary" : "text-white")}>
                Booking approved
              </p>
              <p className={cn("text-[10px] mt-1", isApp ? "app-text-secondary" : "text-white/65")}>
                {topRequest.truckerName} · {topRequest.truckLabel}
              </p>
              <p className="text-[10px] text-[#0E8C84] mt-1">Trip linked · track from My Loads</p>
            </div>
          </div>
          <button
            type="button"
            onClick={reset}
            className="text-[11px] font-semibold text-[#0E8C84] hover:underline w-full text-center"
          >
            Post another load
          </button>
        </div>
      )}

      {state === "idle" && isApp && (
        <p className="text-[9px] text-center app-text-muted">
          Truckers request  -  you approve verified drivers
        </p>
      )}
    </div>
  );
}

function DarkField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wider text-white/50">{label}</span>
      <div className="mt-1 w-full h-9 rounded-lg bg-white/10 border border-white/20 px-2.5 text-xs text-white flex items-center">
        {value}
      </div>
    </label>
  );
}
