/**
 * ZAFTYS India Corridor Network — premium logistics intelligence visualization.
 * Map: /images/marketing/india-map-kashmir.png (full Kashmir as India).
 * Geo (India3): N 37.5°, S 5.0°, W 67.0°E, E 99.0°E.
 */
import { useId } from "react";
import { cn } from "@/lib/utils";

const MAP_SRC = "/images/marketing/india-map-kashmir.png";
const VB = { w: 960, h: 1034 } as const;

const GEO = {
  west: 67.0,
  east: 99.0,
  north: 37.5,
  south: 5.0,
} as const;

function project(lon: number, lat: number) {
  return {
    x: ((lon - GEO.west) / (GEO.east - GEO.west)) * VB.w,
    y: ((GEO.north - lat) / (GEO.north - GEO.south)) * VB.h,
  };
}

type HubTier = 1 | 2;

type HubDef = {
  id: string;
  label: string;
  short: string;
  lon: number;
  lat: number;
  tier: HubTier;
};

const HQ: HubDef = {
  id: "amravati",
  label: "Amravati",
  short: "Amravati",
  lon: 77.75,
  lat: 20.93,
  tier: 1,
};

const HUBS: HubDef[] = [
  { id: "mundra", label: "Mundra", short: "Mundra", lon: 69.72, lat: 22.84, tier: 2 },
  { id: "hazira", label: "Hazira", short: "Hazira", lon: 72.65, lat: 21.12, tier: 2 },
  { id: "mumbai", label: "Mumbai", short: "Mumbai", lon: 72.88, lat: 19.08, tier: 1 },
  { id: "delhi", label: "Delhi NCR", short: "Delhi", lon: 77.21, lat: 28.61, tier: 1 },
  { id: "kolkata", label: "Kolkata", short: "Kolkata", lon: 88.36, lat: 22.57, tier: 1 },
  { id: "haldia", label: "Haldia", short: "Haldia", lon: 88.06, lat: 22.03, tier: 2 },
  { id: "raipur", label: "Raipur", short: "Raipur", lon: 81.63, lat: 21.25, tier: 2 },
  { id: "hyd", label: "Hyderabad", short: "Hyderabad", lon: 78.49, lat: 17.39, tier: 1 },
  { id: "blr", label: "Bengaluru", short: "Bengaluru", lon: 77.59, lat: 12.97, tier: 1 },
  { id: "chennai", label: "Chennai", short: "Chennai", lon: 80.27, lat: 13.08, tier: 1 },
];

type RouteKind = "mesh" | "major" | "active";

type RouteEdge = {
  id: string;
  from: string;
  to: string;
  kind: RouteKind;
  /** Optional callout when active */
  callout?: string;
};

/** Inter-hub geometry — hierarchy applied via `kind` */
const EDGES: RouteEdge[] = [
  // Dense mesh (quiet)
  { id: "mundra-hazira", from: "mundra", to: "hazira", kind: "mesh" },
  { id: "hazira-mumbai", from: "hazira", to: "mumbai", kind: "mesh" },
  { id: "mundra-mumbai", from: "mundra", to: "mumbai", kind: "mesh" },
  { id: "kolkata-haldia", from: "kolkata", to: "haldia", kind: "mesh" },
  { id: "haldia-raipur", from: "haldia", to: "raipur", kind: "mesh" },
  { id: "kolkata-raipur", from: "kolkata", to: "raipur", kind: "mesh" },
  { id: "raipur-hyd", from: "raipur", to: "hyd", kind: "mesh" },
  { id: "delhi-raipur", from: "delhi", to: "raipur", kind: "mesh" },
  { id: "blr-kolkata", from: "blr", to: "kolkata", kind: "mesh" },
  { id: "raipur-chennai", from: "raipur", to: "chennai", kind: "mesh" },
  { id: "mundra-kolkata", from: "mundra", to: "kolkata", kind: "mesh" },
  { id: "hazira-hyd", from: "hazira", to: "hyd", kind: "mesh" },
  // Major corridors
  { id: "mumbai-delhi", from: "mumbai", to: "delhi", kind: "major" },
  { id: "delhi-kolkata", from: "delhi", to: "kolkata", kind: "major" },
  { id: "mumbai-hyd", from: "mumbai", to: "hyd", kind: "major" },
  { id: "hyd-blr", from: "hyd", to: "blr", kind: "major" },
  { id: "hyd-chennai", from: "hyd", to: "chennai", kind: "major" },
  { id: "blr-chennai", from: "blr", to: "chennai", kind: "major" },
  { id: "mumbai-blr", from: "mumbai", to: "blr", kind: "major" },
  { id: "delhi-hyd", from: "delhi", to: "hyd", kind: "major" },
  { id: "mundra-delhi", from: "mundra", to: "delhi", kind: "major" },
  { id: "kolkata-chennai", from: "kolkata", to: "chennai", kind: "major" },
  // Active freight (sparse — orange accent reserved here)
  {
    id: "active-mumbai-hyd",
    from: "mumbai",
    to: "hyd",
    kind: "active",
    callout: "MUMBAI → HYDERABAD",
  },
  {
    id: "active-delhi-kolkata",
    from: "delhi",
    to: "kolkata",
    kind: "active",
    callout: "DELHI → KOLKATA",
  },
  {
    id: "active-hq-mumbai",
    from: "amravati",
    to: "mumbai",
    kind: "active",
    callout: "AMRAVATI → MUMBAI",
  },
];

/** HQ spokes — major to tier-1, mesh to tier-2 (active overridden above) */
const SPOKE_TARGETS = HUBS.map((h) => h.id);

type Pt = { x: number; y: number };

function routeD(from: Pt, to: Pt, bend = 0) {
  const mx = (from.x + to.x) / 2 + bend;
  const my = (from.y + to.y) / 2 - Math.abs(bend) * 0.22;
  return `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}

function bendFor(a: string, b: string) {
  let h = 0;
  const s = `${a}-${b}`;
  for (let i = 0; i < s.length; i++) h = (h + s.charCodeAt(i) * (i + 3)) % 37;
  return (h - 18) * 0.95;
}

type Node = HubDef & Pt;

function buildGraph() {
  const hq = { ...HQ, ...project(HQ.lon, HQ.lat) };
  const hubs: Node[] = HUBS.map((h) => ({ ...h, ...project(h.lon, h.lat) }));
  const nodes: Record<string, Node> = Object.fromEntries(
    [hq, ...hubs].map((n) => [n.id, n]),
  );

  const activeIds = new Set(EDGES.filter((e) => e.kind === "active").map((e) => e.id));

  const spokeEdges: RouteEdge[] = SPOKE_TARGETS.map((to) => {
    const activeTwin = EDGES.find((e) => e.kind === "active" && e.from === "amravati" && e.to === to);
    if (activeTwin) return activeTwin;
    const hub = nodes[to];
    return {
      id: `hq-${to}`,
      from: "amravati",
      to,
      kind: hub.tier === 1 ? "major" : "mesh",
    };
  });

  const edgeList = [
    ...EDGES.filter((e) => !(e.from === "amravati" && activeIds.has(e.id))),
    ...spokeEdges.filter((e) => e.kind !== "active" || activeIds.has(e.id)),
    ...EDGES.filter((e) => e.kind === "active"),
  ];

  // Dedupe by id, prefer active > major > mesh
  const rank: Record<RouteKind, number> = { active: 3, major: 2, mesh: 1 };
  const byKey = new Map<string, RouteEdge>();
  for (const e of edgeList) {
    const key = [e.from, e.to].sort().join("|");
    const prev = byKey.get(key);
    if (!prev || rank[e.kind] > rank[prev.kind]) byKey.set(key, e);
  }

  const routes = [...byKey.values()].map((e) => {
    const a = nodes[e.from];
    const b = nodes[e.to];
    return {
      ...e,
      d: routeD(a, b, bendFor(e.from, e.to)),
    };
  });

  return { hq, hubs, nodes, routes };
}

const GRAPH = buildGraph();

const REGION_FOOTER = [
  { dir: "West", note: "Mundra · Hazira · Mumbai" },
  { dir: "East", note: "Kolkata · Haldia · Raipur" },
  { dir: "North", note: "Delhi NCR corridors" },
  { dir: "South", note: "Hyd · Bengaluru · Chennai" },
] as const;

export function AboutIndiaCorridorMap({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const { hq, hubs, routes } = GRAPH;

  const mesh = routes.filter((r) => r.kind === "mesh");
  const major = routes.filter((r) => r.kind === "major");
  const active = routes.filter((r) => r.kind === "active");

  const freight = active.flatMap((r, i) => [
    { id: `${r.id}-a`, d: r.d, dur: 5.5 + i * 1.2, priority: i === 0 },
    { id: `${r.id}-b`, d: r.d, dur: 7.2 + i * 0.8, priority: false, delay: 2.4 + i },
  ]);

  const hubCount = hubs.length + 1;
  const corridorCount = routes.length;
  const regionCount = REGION_FOOTER.length;

  return (
    <div
      className={cn(
        "icn relative overflow-hidden rounded-2xl border border-white/10 bg-[#020914]",
        className,
      )}
      data-map="zaftys-india-corridor"
    >
      <style>{`
        .icn-scan {
          animation: icnScan 10s ease-in-out infinite;
        }
        .icn-flow-major {
          stroke-dasharray: 5 16;
          animation: icnFlow 4.2s linear infinite;
        }
        .icn-flow-active {
          stroke-dasharray: 7 14;
          animation: icnFlow 2.8s linear infinite;
        }
        .icn-hub-pulse {
          animation: icnHubPulse 4s ease-out infinite;
        }
        .icn-hub-pulse-2 {
          animation: icnHubPulse 4.6s ease-out 1.4s infinite;
        }
        .icn-hq-pulse {
          animation: icnHqPulse 3.8s ease-out infinite;
        }
        .icn-atm {
          animation: icnAtm 12s ease-in-out infinite alternate;
        }
        .icn-callout {
          animation: icnCallout 9s ease-in-out infinite;
        }
        @keyframes icnScan {
          0% { transform: translateX(-120%); opacity: 0; }
          12% { opacity: 0.55; }
          88% { opacity: 0.55; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes icnFlow {
          to { stroke-dashoffset: -120; }
        }
        @keyframes icnHubPulse {
          0% { r: 10; opacity: 0.45; }
          100% { r: 26; opacity: 0; }
        }
        @keyframes icnHqPulse {
          0% { r: 14; opacity: 0.5; }
          100% { r: 40; opacity: 0; }
        }
        @keyframes icnAtm {
          from { opacity: 0.55; }
          to { opacity: 0.85; }
        }
        @keyframes icnCallout {
          0%, 18% { opacity: 0; }
          28%, 62% { opacity: 1; }
          75%, 100% { opacity: 0; }
        }
        @media (max-width: 639px) {
          .icn-label-t2 { display: none; }
          .icn-freight-secondary { display: none; }
          .icn-metrics { display: none; }
          .icn-sublabel { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .icn-scan,
          .icn-flow-major,
          .icn-flow-active,
          .icn-hub-pulse,
          .icn-hub-pulse-2,
          .icn-hq-pulse,
          .icn-atm,
          .icn-callout,
          .icn-freight {
            animation: none !important;
          }
          .icn-freight { display: none; }
          .icn-flow-major,
          .icn-flow-active {
            stroke-dasharray: none;
          }
        }
      `}</style>

      {/* HUD header */}
      <div className="relative z-20 flex items-start justify-between gap-3 px-5 pt-5 md:px-6 md:pt-6">
        <div>
          <p className="font-heading text-[11px] font-bold tracking-[0.22em] text-white/90">
            INDIA CORRIDOR NETWORK
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/70 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            Live network · Online
          </p>
        </div>
        <div className="icn-metrics hidden items-center gap-4 sm:flex">
          {[
            { n: String(hubCount).padStart(2, "0"), l: "Hubs" },
            { n: String(corridorCount), l: "Corridors" },
            { n: String(regionCount).padStart(2, "0"), l: "Regions" },
          ].map((m) => (
            <div key={m.l} className="text-right">
              <p className="font-heading text-sm font-bold tabular-nums text-white/90">{m.n}</p>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-white/35">{m.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-lg px-3 pb-2 pt-1 md:max-w-none md:px-4">
        <div className="relative aspect-[960/1034] w-full overflow-hidden rounded-xl">
          {/* 1. Relief / political terrain */}
          <img
            src={MAP_SRC}
            alt="Map of India including the entire Kashmir region — ZAFTYS corridor network"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter:
                "grayscale(0.25) sepia(0.35) hue-rotate(185deg) saturate(1.35) brightness(0.38) contrast(1.28)",
            }}
            loading="lazy"
            decoding="async"
          />

          {/* 2. Dark atmospheric tint */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(165deg, hsl(220 70% 6% / 0.72) 0%, hsl(210 55% 12% / 0.35) 45%, hsl(220 70% 5% / 0.78) 100%)",
            }}
          />

          {/* 3. Geographic grid (masked toward edges) */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(190 80% 65% / 0.14) 1px, transparent 1px), linear-gradient(90deg, hsl(190 80% 65% / 0.1) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse 70% 65% at 48% 48%, black 20%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 65% at 48% 48%, black 20%, transparent 75%)",
            }}
          />

          {/* 4. Topographic / atmospheric glow */}
          <div
            className="icn-atm pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 28% 22% at 46% 48%, hsl(190 90% 45% / 0.14), transparent 70%),
                radial-gradient(ellipse 18% 14% at 28% 58%, hsl(200 85% 50% / 0.1), transparent 70%),
                radial-gradient(ellipse 16% 12% at 42% 28%, hsl(200 80% 50% / 0.09), transparent 70%),
                radial-gradient(ellipse 14% 12% at 48% 62%, hsl(195 85% 50% / 0.08), transparent 70%)
              `,
            }}
          />

          {/* 12. Intelligence scan */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="icn-scan absolute inset-y-0 w-1/3"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(190 95% 60% / 0.07), transparent)",
              }}
            />
          </div>

          {/* Network SVG layers 5–11 */}
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="ZAFTYS India logistics corridor network with hubs and active freight lanes"
          >
            <defs>
              <linearGradient id={`${uid}-major`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(200 90% 55% / 0.15)" />
                <stop offset="50%" stopColor="hsl(190 95% 60% / 0.85)" />
                <stop offset="100%" stopColor="hsl(210 90% 70% / 0.2)" />
              </linearGradient>
              <linearGradient id={`${uid}-active`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(190 95% 55%)" />
                <stop offset="55%" stopColor="hsl(25 100% 58%)" />
                <stop offset="100%" stopColor="hsl(200 95% 65%)" />
              </linearGradient>
              <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id={`${uid}-soft`} x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 5. Mesh */}
            {mesh.map((r) => (
              <path
                key={r.id}
                d={r.d}
                fill="none"
                stroke="hsl(190 70% 60%)"
                strokeWidth="1.1"
                strokeLinecap="round"
                opacity={0.14}
              />
            ))}

            {/* 6–7. Major corridors */}
            {major.map((r) => (
              <g key={r.id}>
                <path
                  d={r.d}
                  fill="none"
                  stroke="hsl(190 80% 55% / 0.18)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d={r.d}
                  fill="none"
                  stroke={`url(#${uid}-major)`}
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  className="icn-flow-major"
                  opacity={0.7}
                />
              </g>
            ))}

            {/* 8. Active corridors */}
            {active.map((r) => (
              <g key={r.id}>
                <path
                  d={r.d}
                  fill="none"
                  stroke="hsl(25 100% 55% / 0.2)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter={`url(#${uid}-soft)`}
                />
                <path
                  d={r.d}
                  fill="none"
                  stroke={`url(#${uid}-active)`}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  className="icn-flow-active"
                  filter={`url(#${uid}-glow)`}
                />
              </g>
            ))}

            {/* 9. Freight particles */}
            {freight.map((p, i) => (
              <g
                key={p.id}
                className={cn("icn-freight", i % 2 === 1 && "icn-freight-secondary")}
              >
                <circle
                  r={p.priority ? 3.2 : 2.4}
                  fill={p.priority ? "hsl(25 100% 58%)" : "hsl(190 95% 70%)"}
                  filter={`url(#${uid}-glow)`}
                  opacity={0.95}
                >
                  <animateMotion
                    dur={`${p.dur}s`}
                    begin={`${p.delay ?? 0}s`}
                    repeatCount="indefinite"
                    path={p.d}
                  />
                </circle>
                <circle r={p.priority ? 1.3 : 1} fill="#fff">
                  <animateMotion
                    dur={`${p.dur}s`}
                    begin={`${p.delay ?? 0}s`}
                    repeatCount="indefinite"
                    path={p.d}
                  />
                </circle>
              </g>
            ))}

            {/* 10–11. Hubs */}
            {hubs.map((hub, i) => {
              const tier1 = hub.tier === 1;
              const coreR = tier1 ? 5.5 : 3.5;
              const ringR = tier1 ? 9 : 6;
              return (
                <g key={hub.id}>
                  {tier1 && (
                    <>
                      <circle
                        className="icn-hub-pulse"
                        cx={hub.x}
                        cy={hub.y}
                        fill="hsl(190 90% 55% / 0.35)"
                        style={{ animationDelay: `${(i % 5) * 0.55}s` }}
                      />
                      <circle
                        className="icn-hub-pulse-2"
                        cx={hub.x}
                        cy={hub.y}
                        fill="hsl(190 90% 55% / 0.22)"
                        style={{ animationDelay: `${(i % 5) * 0.55 + 1.2}s` }}
                      />
                    </>
                  )}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={ringR}
                    fill="hsl(215 70% 10% / 0.85)"
                    stroke={tier1 ? "hsl(190 90% 65%)" : "hsl(190 70% 55% / 0.55)"}
                    strokeWidth={tier1 ? 1.8 : 1.2}
                    filter={tier1 ? `url(#${uid}-soft)` : undefined}
                  />
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={coreR}
                    fill={tier1 ? "hsl(190 95% 78%)" : "hsl(190 80% 60% / 0.75)"}
                  />
                  <circle cx={hub.x} cy={hub.y} r={tier1 ? 2 : 1.2} fill="#fff" />

                  <g className={tier1 ? undefined : "icn-label-t2"}>
                    <text
                      x={hub.x}
                      y={hub.y - (tier1 ? 16 : 12)}
                      textAnchor="middle"
                      fill={tier1 ? "hsl(0 0% 100% / 0.92)" : "hsl(0 0% 100% / 0.55)"}
                      fontSize={tier1 ? 11 : 9}
                      fontFamily="ui-sans-serif, system-ui, sans-serif"
                      fontWeight="700"
                      letterSpacing="0.12em"
                      style={{
                        paintOrder: "stroke",
                        stroke: "hsl(220 70% 6% / 0.75)",
                        strokeWidth: 3,
                      }}
                    >
                      {hub.short.toUpperCase()}
                    </text>
                    {tier1 && (
                      <text
                        className="icn-sublabel"
                        x={hub.x}
                        y={hub.y - 5}
                        textAnchor="middle"
                        fill="hsl(190 80% 70% / 0.55)"
                        fontSize="7"
                        fontFamily="ui-sans-serif, system-ui, sans-serif"
                        fontWeight="600"
                        letterSpacing="0.14em"
                      >
                        MAJOR HUB
                      </text>
                    )}
                  </g>
                </g>
              );
            })}

            {/* HQ — Amravati */}
            <circle className="icn-hq-pulse" cx={hq.x} cy={hq.y} fill="hsl(25 100% 55% / 0.4)" />
            <circle
              cx={hq.x}
              cy={hq.y}
              r="13"
              fill="hsl(25 100% 50%)"
              stroke="#fff"
              strokeWidth="2.5"
              filter={`url(#${uid}-glow)`}
            />
            <circle cx={hq.x} cy={hq.y} r="4.5" fill="#fff" />

            <rect
              x={hq.x - 72}
              y={hq.y + 18}
              width="144"
              height="42"
              rx="6"
              fill="hsl(220 70% 6% / 0.92)"
              stroke="hsl(25 100% 55% / 0.55)"
              strokeWidth="1.2"
            />
            <text
              x={hq.x}
              y={hq.y + 34}
              textAnchor="middle"
              fill="hsl(25 100% 62%)"
              fontSize="9"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="700"
              letterSpacing="0.16em"
            >
              HQ · LOADING DESK
            </text>
            <text
              x={hq.x}
              y={hq.y + 50}
              textAnchor="middle"
              fill="#fff"
              fontSize="14"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="700"
            >
              Amravati
            </text>

            {/* Active callout */}
            {active[0]?.callout && (
              <g className="icn-callout" opacity={0}>
                <rect
                  x={48}
                  y={72}
                  width={210}
                  height={36}
                  rx={6}
                  fill="hsl(220 70% 6% / 0.88)"
                  stroke="hsl(25 100% 55% / 0.45)"
                  strokeWidth="1"
                />
                <text
                  x={58}
                  y={88}
                  fill="hsl(25 100% 60%)"
                  fontSize="8"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                  fontWeight="700"
                  letterSpacing="0.14em"
                >
                  ACTIVE FREIGHT
                </text>
                <text
                  x={58}
                  y={100}
                  fill="#fff"
                  fontSize="11"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                  fontWeight="700"
                >
                  {active[0].callout}
                </text>
              </g>
            )}
          </svg>

          {/* 14–15. Vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 58% 55% at 48% 46%, transparent 35%, hsl(220 70% 4% / 0.55) 78%, hsl(220 70% 3% / 0.88) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-2 border-t border-white/8 px-5 py-4 sm:grid-cols-4 md:px-6">
        {REGION_FOOTER.map((d) => (
          <div
            key={d.dir}
            className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2"
          >
            <p className="font-heading text-[10px] font-bold uppercase tracking-wider text-cyan-300/80">
              {d.dir}
            </p>
            <p className="mt-0.5 text-[11px] text-white/40">{d.note}</p>
          </div>
        ))}
      </div>
      <p className="px-5 pb-3 text-[9px] text-white/25 md:px-6">
        Network view for illustration — hub and corridor counts reflect this map overlay, not live fleet tallies.
      </p>
    </div>
  );
}
