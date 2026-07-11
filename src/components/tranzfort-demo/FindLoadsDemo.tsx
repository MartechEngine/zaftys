import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_ROUTE, SAMPLE_LOADS } from "./fixtures/loads";
import type { MarketplaceLoad } from "./types";
import { MarketplaceLoadCard } from "./app-ui/MarketplaceLoadCard";

type FindLoadsDemoProps = {
  compact?: boolean;
  className?: string;
  /** app = TranZfort light canvas + marketplace cards */
  theme?: "app" | "dark";
};

const FILTER_CHIPS = ["Open", "Container", "10 tyres"] as const;

export function FindLoadsDemo({ compact, className, theme = "app" }: FindLoadsDemoProps) {
  const [origin, setOrigin] = useState(DEFAULT_ROUTE.origin);
  const [destination, setDestination] = useState(DEFAULT_ROUTE.destination);
  const [selectedChip, setSelectedChip] = useState<string>("Open");
  const [results, setResults] = useState<MarketplaceLoad[] | null>(null);
  const [searching, setSearching] = useState(false);
  const isApp = theme === "app";

  const runSearch = () => {
    setSearching(true);
    setResults(null);
    window.setTimeout(() => {
      setResults(SAMPLE_LOADS);
      setSearching(false);
    }, 700);
  };

  const visibleResults = results ? (compact ? results.slice(0, 2) : results) : null;

  return (
    <div
      className={cn(
        "px-2.5 pt-2 pb-1 space-y-2.5",
        isApp ? "app-canvas" : "p-3 space-y-3 text-white",
        className,
      )}
    >
      <div className={cn("space-y-2", isApp && "app-card rounded-xl p-2.5")}>
        <label
          className={cn(
            "text-[10px] uppercase tracking-wider font-semibold",
            isApp ? "app-text-muted" : "text-white/60",
          )}
        >
          Route
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className={cn(
              "h-9 rounded-lg px-2.5 text-xs outline-none",
              isApp
                ? "border border-[#E7E5E4] bg-[#FAF7F2] app-text-primary focus:border-[#0E8C84]/50"
                : "bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-teal/50",
            )}
            placeholder="From"
          />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={cn(
              "h-9 rounded-lg px-2.5 text-xs outline-none",
              isApp
                ? "border border-[#E7E5E4] bg-[#FAF7F2] app-text-primary focus:border-[#0E8C84]/50"
                : "bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-teal/50",
            )}
            placeholder="To"
          />
        </div>
        {isApp && (
          <div className="flex flex-wrap gap-1">
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setSelectedChip(chip)}
                className={cn(
                  "px-2 py-0.5 rounded-full text-[9px] font-semibold border transition-colors",
                  chip === selectedChip ? "app-filter-chip-selected" : "app-filter-chip",
                )}
              >
                {chip}
              </button>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={runSearch}
          disabled={searching}
          className={cn(
            "w-full h-9 rounded-lg text-white text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60",
            isApp
              ? "bg-gradient-to-r from-[#0E8C84] to-[#0A5550]"
              : "bg-gradient-brand shadow-brand",
          )}
        >
          <Search className="h-3.5 w-3.5" />
          {searching ? "Searching…" : "Find loads"}
        </button>
      </div>

      {searching && (
        <div className="space-y-2 animate-pulse">
          {[1, 2].map((i) => (
            <div
              key={i}
              className={cn("h-[72px] rounded-xl", isApp ? "app-card" : "demo-card")}
            />
          ))}
        </div>
      )}

      {visibleResults && (
        <div className="space-y-2">
          {visibleResults.map((load) =>
            isApp ? (
              <MarketplaceLoadCard key={load.id} load={load} compact />
            ) : (
              <LegacyLoadCard key={load.id} load={load} />
            ),
          )}
          {compact && results && results.length > 2 && (
            <p
              className={cn(
                "text-[10px] text-center pt-0.5",
                isApp ? "app-text-muted" : "text-white/50",
              )}
            >
              +{results.length - 2} more matches in app
            </p>
          )}
        </div>
      )}

      {!results && !searching && (
        <p
          className={cn(
            "text-[11px] text-center py-4",
            isApp ? "app-text-muted" : "text-white/55",
          )}
        >
          Tap Find loads  -  matches appear in under a second.
        </p>
      )}
    </div>
  );
}

function LegacyLoadCard({ load }: { load: MarketplaceLoad }) {
  return (
    <button
      type="button"
      className="w-full text-left rounded-xl demo-card demo-card-interactive p-2.5 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-xs font-semibold text-white">
          {load.origin} → {load.destination}
        </div>
        {load.matchScore != null && (
          <span className="shrink-0 text-[10px] font-bold text-orange-glow">{load.matchScore}%</span>
        )}
      </div>
      <div className="mt-1.5 text-[11px] text-white/75">
        {load.material} · {load.weightTonnes}T · {load.pickupDate}
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-sm font-bold text-white">₹{load.priceInr.toLocaleString("en-IN")}</span>
        <span className="text-[10px] text-white/60">{load.supplierName}</span>
      </div>
    </button>
  );
}
