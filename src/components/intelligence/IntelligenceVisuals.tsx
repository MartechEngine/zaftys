import { cn } from "@/lib/utils";

/** Browser chrome around real TMS / report screenshots. */
export function IntelligenceProductShot({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn("marketing-widget overflow-hidden bg-[#0c1220] shadow-lg", className)}>
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#121a2b] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden />
        <span className="ml-2 truncate font-mono text-[10px] text-white/40">
          app.zaftys.com
        </span>
      </div>
      <img
        src={src}
        alt={alt}
        width={1280}
        height={853}
        className="block aspect-[3/2] w-full object-cover object-top"
        loading="lazy"
        decoding="async"
      />
      {caption ? (
        <figcaption className="border-t border-white/10 bg-[#121a2b] px-3 py-2 text-[11px] text-white/55">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Illustrative lane-rate panel for Beta freight intelligence (not live rates). */
export function LaneRateDashboard({ className }: { className?: string }) {
  const lanes = [
    { lane: "Nagpur → Pune", move: "+2.1%", bar: 72, tone: "up" as const },
    { lane: "JNPT → Inland ICD", move: "-0.8%", bar: 54, tone: "down" as const },
    { lane: "Raipur → Hyderabad", move: "+1.4%", bar: 61, tone: "up" as const },
    { lane: "Amravati → Mumbai", move: "0.0%", bar: 48, tone: "flat" as const },
  ];

  return (
    <div
      className={cn(
        "overflow-hidden border border-border bg-gradient-to-br from-[#0c1220] via-[#121a2b] to-[#1a2740] text-white shadow-lg",
        className,
      )}
      role="img"
      aria-label="Illustrative freight rate intelligence dashboard for corridor context"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            Freight rate intelligence · Beta
          </p>
          <p className="mt-0.5 font-heading text-sm font-bold">Lane context</p>
        </div>
        <span className="border border-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
          Illustrative
        </span>
      </div>

      <div className="grid grid-cols-3 gap-px border-b border-white/10 bg-white/5">
        {[
          { label: "Corridors in view", value: "Your lanes" },
          { label: "Window", value: "90 days" },
          { label: "Source", value: "Trip + desk" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#121a2b] px-3 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">{kpi.label}</p>
            <p className="mt-1 font-heading text-sm font-bold text-white">{kpi.value}</p>
          </div>
        ))}
      </div>

      <ul className="space-y-3 p-4">
        {lanes.map((row) => (
          <li key={row.lane}>
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <span className="text-xs font-medium text-white/85">{row.lane}</span>
              <span
                className={cn(
                  "font-mono text-[11px] font-semibold",
                  row.tone === "up" && "text-emerald-400",
                  row.tone === "down" && "text-amber-300",
                  row.tone === "flat" && "text-white/50",
                )}
              >
                {row.move}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden bg-white/10">
              <div
                className={cn(
                  "h-full",
                  row.tone === "up" && "bg-accent",
                  row.tone === "down" && "bg-amber-400/80",
                  row.tone === "flat" && "bg-white/35",
                )}
                style={{ width: `${row.bar}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="border-t border-white/10 px-4 py-2.5 text-[10px] leading-relaxed text-white/40">
        Sample layout only. Not published spot rates. Live Beta uses your corridors and ZAFTYS trip records.
      </p>
    </div>
  );
}

/** Compact ops KPI strip for intro / data foundation. */
export function OpsAnalyticsPreview({ className }: { className?: string }) {
  const kpis = [
    { label: "Exception queue", value: "Desk live", hint: "Delay · gate · ePOD" },
    { label: "Lane reliability", value: "By corridor", hint: "OTIF shape" },
    { label: "Fleet split", value: "Own | Network", hint: "Never blended" },
    { label: "Close-out", value: "ePOD cycle", hint: "Billing ready" },
  ];

  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      role="img"
      aria-label="Operations analytics KPI categories from ZAFTYS TMS"
    >
      {kpis.map((k) => (
        <div key={k.label} className="bg-surface px-4 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">{k.label}</p>
          <p className="mt-2 font-heading text-lg font-bold text-navy">{k.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{k.hint}</p>
        </div>
      ))}
    </div>
  );
}

function statusTone(status: string) {
  if (status === "Available" || status === "Live") return "border-primary/30 bg-primary/10 text-primary";
  if (status === "Beta") return "border-accent/40 bg-accent/10 text-navy";
  return "border-border bg-muted text-muted-foreground";
}

export function IntelligenceStatusLabel({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]",
        statusTone(status),
      )}
    >
      {status}
    </span>
  );
}
