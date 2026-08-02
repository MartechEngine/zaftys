"use client";

import { useEffect, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type PlacePick = {
  city: string;
  state: string;
  lat: number;
  lng: number;
  label: string;
};

export type MaterialPick = {
  code: string;
  nameEn: string;
};

type PlaceTypeaheadProps = {
  label: string;
  value: PlacePick | null;
  query: string;
  onQueryChange: (q: string) => void;
  onPick: (place: PlacePick) => void;
  onClear: () => void;
  className?: string;
};

export function PlaceCatalogTypeahead({
  label,
  value,
  query,
  onQueryChange,
  onPick,
  onClear,
  className,
}: PlaceTypeaheadProps) {
  const id = useId();
  const [items, setItems] = useState<PlacePick[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value || query.trim().length < 2) {
      setItems([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      setLoading(true);
      fetch(`/api/tsm/places/search?q=${encodeURIComponent(query.trim())}&limit=8`, {
        signal: ctrl.signal,
      })
        .then((r) => r.json())
        .then((json) => {
          const rows = Array.isArray(json.data?.items) ? json.data.items : [];
          setItems(
            rows.map((r: Record<string, unknown>) => ({
              city: String(r.city ?? ""),
              state: String(r.state ?? ""),
              lat: Number(r.lat),
              lng: Number(r.lng),
              label: String(r.label ?? ""),
            })),
          );
          setOpen(true);
        })
        .catch(() => setItems([]))
        .finally(() => setLoading(false));
    }, 200);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query, value]);

  return (
    <label className={cn("relative block text-sm", className)}>
      <span className="text-label">{label}</span>
      <Input
        id={id}
        className="mt-1 w-full"
        value={value ? value.label : query}
        onChange={(e) => {
          if (value) onClear();
          onQueryChange(e.target.value);
        }}
        onFocus={() => items.length > 0 && setOpen(true)}
        placeholder="Search city / town (TZ offline catalog)"
        autoComplete="off"
      />
      {value && (
        <p className="mt-1 text-[10px] text-muted-foreground">
          {value.city}, {value.state} · {value.lat.toFixed(3)}, {value.lng.toFixed(3)}
          <button type="button" className="ml-2 text-link hover:underline" onClick={onClear}>
            Clear
          </button>
        </p>
      )}
      {loading && !value && (
        <p className="mt-1 text-[10px] text-muted-foreground">Searching…</p>
      )}
      {open && !value && items.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-white/10 bg-background/95 shadow-lg backdrop-blur">
          {items.map((item) => (
            <li key={`${item.city}|${item.state}|${item.lat}`}>
              <button
                type="button"
                className="block w-full px-3 py-2 text-left text-sm hover:bg-white/10"
                onClick={() => {
                  onPick(item);
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </label>
  );
}

type MaterialTypeaheadProps = {
  label: string;
  value: MaterialPick | null;
  query: string;
  onQueryChange: (q: string) => void;
  onPick: (material: MaterialPick) => void;
  onClear: () => void;
  className?: string;
};

export function MaterialCatalogTypeahead({
  label,
  value,
  query,
  onQueryChange,
  onPick,
  onClear,
  className,
}: MaterialTypeaheadProps) {
  const id = useId();
  const [items, setItems] = useState<MaterialPick[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value || query.trim().length < 2) {
      setItems([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      setLoading(true);
      fetch(`/api/tsm/tranzfort/materials?q=${encodeURIComponent(query.trim())}&limit=10`, {
        signal: ctrl.signal,
      })
        .then((r) => r.json())
        .then((json) => {
          const rows = Array.isArray(json.data?.items) ? json.data.items : [];
          setItems(
            rows.map((r: Record<string, unknown>) => ({
              code: String(r.code ?? ""),
              nameEn: String(r.nameEn ?? ""),
            })),
          );
          setOpen(true);
        })
        .catch(() => setItems([]))
        .finally(() => setLoading(false));
    }, 200);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query, value]);

  return (
    <label className={cn("relative block text-sm", className)}>
      <span className="text-label">{label}</span>
      <Input
        id={id}
        className="mt-1 w-full"
        value={value ? value.nameEn : query}
        onChange={(e) => {
          if (value) onClear();
          onQueryChange(e.target.value);
        }}
        onFocus={() => items.length > 0 && setOpen(true)}
        placeholder="Search TranZfort materials"
        autoComplete="off"
      />
      {value && (
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">
          {value.code}
          <button type="button" className="ml-2 font-sans text-link hover:underline" onClick={onClear}>
            Clear
          </button>
        </p>
      )}
      {loading && !value && (
        <p className="mt-1 text-[10px] text-muted-foreground">Searching…</p>
      )}
      {open && !value && items.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-white/10 bg-background/95 shadow-lg backdrop-blur">
          {items.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                className="block w-full px-3 py-2 text-left text-sm hover:bg-white/10"
                onClick={() => {
                  onPick(item);
                  setOpen(false);
                }}
              >
                <span>{item.nameEn}</span>
                <span className="ml-2 font-mono text-[10px] text-muted-foreground">{item.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </label>
  );
}
