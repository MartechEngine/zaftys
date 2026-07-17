"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import maplibregl from "maplibre-gl";
import type { Map as MaplibreMap, Marker } from "maplibre-gl";
import type { ShipmentGeo } from "@/lib/geo";
import { cn } from "@/lib/utils";

import "maplibre-gl/dist/maplibre-gl.css";

export interface LiveMapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  variant: "vehicle" | "pickup" | "drop" | "cluster";
  stale?: boolean;
  href?: string;
  count?: number;
}

export interface LiveMapRoute {
  id: string;
  coordinates: [number, number][];
}

export interface LiveMapProps {
  markers: LiveMapMarker[];
  routes?: LiveMapRoute[];
  className?: string;
  height?: string;
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
  showPlaceholderLegend?: boolean;
  clusterVehicles?: boolean;
}

/** Free vector tiles — no API key or signup (OpenFreeMap / OpenStreetMap data) */
const DEFAULT_MAP_STYLE = "https://tiles.openfreemap.org/styles/dark";

function resolveMapStyle(): string {
  return process.env.NEXT_PUBLIC_MAP_STYLE ?? DEFAULT_MAP_STYLE;
}

function clusterVehicleMarkers(markers: LiveMapMarker[], zoom: number): LiveMapMarker[] {
  const staticMarkers = markers.filter((m) => m.variant !== "vehicle");
  const vehicles = markers.filter((m) => m.variant === "vehicle");
  if (zoom >= 10 || vehicles.length <= 4) return markers;

  const cell = zoom < 6 ? 1.2 : zoom < 8 ? 0.6 : 0.35;
  const buckets = new Map<string, LiveMapMarker[]>();

  for (const v of vehicles) {
    const key = `${Math.round(v.lat / cell)}:${Math.round(v.lng / cell)}`;
    const list = buckets.get(key) ?? [];
    list.push(v);
    buckets.set(key, list);
  }

  const clustered: LiveMapMarker[] = [...staticMarkers];
  for (const [key, group] of buckets) {
    if (group.length === 1) {
      clustered.push(group[0]);
      continue;
    }
    const lat = group.reduce((s, m) => s + m.lat, 0) / group.length;
    const lng = group.reduce((s, m) => s + m.lng, 0) / group.length;
    clustered.push({
      id: `cluster-${key}`,
      lat,
      lng,
      title: `${group.length} vehicles`,
      subtitle: group.map((m) => m.title).slice(0, 3).join(", "),
      variant: "cluster",
      count: group.length,
    });
  }
  return clustered;
}

export function LiveMap({
  markers,
  routes = [],
  className,
  height = "100%",
  selectedId,
  onSelect,
  showPlaceholderLegend = true,
  clusterVehicles = true,
}: LiveMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MaplibreMap | null>(null);
  const markerRefs = useRef<Marker[]>([]);
  const [ready, setReady] = useState(false);
  const [zoom, setZoom] = useState(6);
  const mapStyle = resolveMapStyle();

  const displayMarkers = useMemo(
    () => (clusterVehicles ? clusterVehicleMarkers(markers, zoom) : markers),
    [markers, zoom, clusterVehicles],
  );

  useEffect(() => {
    if (!containerRef.current || markers.length === 0) return;

    let cancelled = false;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: mapStyle,
      center: [markers[0].lng, markers[0].lat],
      zoom: 6,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current = map;

    map.on("load", () => {
      if (cancelled) return;
      setReady(true);
      setZoom(map.getZoom());
      fitBounds(map, markers);
    });

    map.on("zoomend", () => {
      if (!cancelled) setZoom(map.getZoom());
    });

    return () => {
      cancelled = true;
      markerRefs.current.forEach((m) => m.remove());
      markerRefs.current = [];
      map.remove();
      mapRef.current = null;
      setReady(false);
    };
  }, [mapStyle, markers.length === 0]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!ready || !mapRef.current) return;

    markerRefs.current.forEach((m) => m.remove());
    markerRefs.current = [];

    for (const m of displayMarkers) {
      const el = document.createElement("button");
      el.type = "button";
      el.className = cn(
        "flex items-center justify-center rounded-full border-2 border-white shadow-md transition-transform",
        m.variant === "pickup" && "h-8 w-8 bg-emerald-500",
        m.variant === "drop" && "h-8 w-8 bg-red-500",
        m.variant === "vehicle" && "h-8 w-8",
        m.variant === "vehicle" && (m.stale ? "bg-gray-400" : "bg-orange"),
        m.variant === "cluster" && "h-10 min-w-10 bg-primary px-2 text-xs font-bold text-white",
        selectedId === m.id && "scale-125 ring-2 ring-navy-bright",
      );
      if (m.variant === "cluster") {
        el.textContent = String(m.count ?? "");
      } else {
        el.innerHTML =
          m.variant === "vehicle"
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>`;
      }
      el.title = m.title;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelect?.(m.id);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([m.lng, m.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 16 }).setHTML(
            `<strong>${m.title}</strong>${m.subtitle ? `<br/><span style="color:#94a8c0">${m.subtitle}</span>` : ""}`,
          ),
        )
        .addTo(mapRef.current);

      markerRefs.current.push(marker);
    }

    fitBounds(mapRef.current, displayMarkers);
  }, [displayMarkers, ready, selectedId, onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;

    const sourceId = "route-lines";
    const layerId = "route-lines-layer";
    const features = routes
      .filter((r) => r.coordinates.length >= 2)
      .map((r) => ({
        type: "Feature" as const,
        properties: { id: r.id },
        geometry: { type: "LineString" as const, coordinates: r.coordinates },
      }));

    const data = { type: "FeatureCollection" as const, features };

    if (map.getSource(sourceId)) {
      (map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(data);
      return;
    }

    map.addSource(sourceId, { type: "geojson", data });
    map.addLayer({
      id: layerId,
      type: "line",
      source: sourceId,
      layout: { "line-join": "round", "line-cap": "round" },
      paint: {
        "line-color": "#6366f1",
        "line-width": 3,
        "line-opacity": 0.75,
        "line-dasharray": [2, 1],
      },
    });
  }, [routes, ready]);

  if (markers.length === 0) {
    return (
      <MapPlaceholder
        className={className}
        height={height}
        message="No active shipments with map coordinates."
        markers={[]}
        showLegend={false}
      />
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl border border-white/10", className)}
      style={{ height }}
    >
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}

function fitBounds(map: MaplibreMap, markers: LiveMapMarker[]) {
  if (markers.length === 0) return;
  const bounds = new maplibregl.LngLatBounds();
  markers.forEach((m) => bounds.extend([m.lng, m.lat]));
  map.fitBounds(bounds, { padding: 48, maxZoom: 10 });
}

function MapPlaceholder({
  className,
  height,
  message,
  markers,
  showLegend,
}: {
  className?: string;
  height: string;
  message: string;
  markers: LiveMapMarker[];
  showLegend?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-6 text-center",
        className,
      )}
      style={{ height, minHeight: 280 }}
    >
      <MapPin className="mb-3 h-10 w-10 text-navy-bright" />
      <p className="text-sm font-medium text-heading">Map preview</p>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{message}</p>
      {showLegend && markers.length > 0 && (
        <ul className="mt-4 space-y-1 text-left text-xs text-muted-foreground">
          {markers.slice(0, 6).map((m) => (
            <li key={m.id}>
              {m.href ? (
                <Link href={m.href} className="text-link hover:underline">
                  {m.title}
                </Link>
              ) : (
                m.title
              )}
              {m.subtitle ? ` · ${m.subtitle}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function markersFromGeo(input: {
  id: string;
  publicId: string;
  vehicle?: string;
  driver?: string;
  geo?: ShipmentGeo;
  href?: string;
}): LiveMapMarker[] {
  if (!input.geo) return [];
  const out: LiveMapMarker[] = [
    {
      id: `${input.id}-pickup`,
      lat: input.geo.origin.lat,
      lng: input.geo.origin.lng,
      title: `${input.publicId} pickup`,
      variant: "pickup",
    },
    {
      id: `${input.id}-drop`,
      lat: input.geo.destination.lat,
      lng: input.geo.destination.lng,
      title: `${input.publicId} drop`,
      variant: "drop",
    },
  ];
  if (input.geo.current) {
    out.push({
      id: input.id,
      lat: input.geo.current.lat,
      lng: input.geo.current.lng,
      title: input.publicId,
      subtitle: [input.vehicle, input.driver].filter(Boolean).join(" · "),
      variant: "vehicle",
      stale: input.geo.gpsStale,
      href: input.href,
    });
  }
  return out;
}

/** Build a route polyline from origin → current → destination. */
export function routeFromGeo(id: string, geo: ShipmentGeo): LiveMapRoute {
  const coordinates: [number, number][] = [
    [geo.origin.lng, geo.origin.lat],
  ];
  if (geo.current) {
    coordinates.push([geo.current.lng, geo.current.lat]);
  }
  coordinates.push([geo.destination.lng, geo.destination.lat]);
  return { id, coordinates };
}
