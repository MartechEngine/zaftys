"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MapPin, Package, Search, Truck, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchResult, SearchResultKind } from "@/lib/search/global-search";

const KIND_ICONS: Record<SearchResultKind, typeof Package> = {
  shipment: Package,
  driver: User,
  vehicle: Truck,
  client: Users,
  page: MapPin,
};

const KIND_LABELS: Record<SearchResultKind, string> = {
  shipment: "Shipment",
  driver: "Driver",
  vehicle: "Vehicle",
  client: "Client",
  page: "Page",
};

const GlobalSearchContext = createContext<{ open: boolean; setOpen: (v: boolean) => void } | null>(
  null,
);

export function useGlobalSearch() {
  const ctx = useContext(GlobalSearchContext);
  if (!ctx) throw new Error("useGlobalSearch must be used within GlobalSearchProvider");
  return ctx;
}

export function GlobalSearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <GlobalSearchContext.Provider value={{ open, setOpen }}>
      {children}
      <GlobalSearchDialog open={open} onOpenChange={setOpen} />
    </GlobalSearchContext.Provider>
  );
}

export function GlobalSearchTrigger() {
  const { setOpen } = useGlobalSearch();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="hidden min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-left md:flex"
    >
      <Search className="size-4 text-muted-foreground" />
      <span className="flex-1 text-sm text-muted-foreground">Search shipments, drivers, vehicles…</span>
      <kbd className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
        ⌘K
      </kbd>
    </button>
  );
}

function GlobalSearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const json = await res.json();
        if (res.ok) {
          setResults(json.data ?? []);
          setActiveIndex(0);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => window.clearTimeout(timer);
  }, [query, open]);

  const navigate = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router],
  );

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
        return;
      }
      if (results.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % results.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + results.length) % results.length);
      }
      if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        navigate(results[activeIndex].href);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, results, activeIndex, navigate, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Close search"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Global search"
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a1220]/95 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shipments, drivers, vehicles, clients…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {loading ? <Loader2 className="size-4 animate-spin text-muted-foreground" /> : null}
          <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            esc
          </kbd>
        </div>

        <ul className="max-h-[min(360px,50vh)] overflow-y-auto py-2">
          {query.trim().length < 2 ? (
            <li className="px-4 py-6 text-center text-sm text-muted-foreground">
              Type at least 2 characters to search
            </li>
          ) : results.length === 0 && !loading ? (
            <li className="px-4 py-6 text-center text-sm text-muted-foreground">
              No results for “{query.trim()}”
            </li>
          ) : (
            results.map((r, i) => {
              const Icon = KIND_ICONS[r.kind];
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors",
                      i === activeIndex ? "bg-primary/15" : "hover:bg-white/[0.05]",
                    )}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => navigate(r.href)}
                  >
                    <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-heading">{r.title}</p>
                      {r.subtitle ? (
                        <p className="truncate text-xs text-muted-foreground">{r.subtitle}</p>
                      ) : null}
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-wide text-muted-foreground">
                      {KIND_LABELS[r.kind]}
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
