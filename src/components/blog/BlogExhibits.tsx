import { useState, type ReactNode } from "react";
import type { BlogExhibit } from "@/lib/blog-data";
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";

function FigureChrome({
  caption,
  source,
  children,
}: {
  caption?: string;
  source?: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-8 rounded-xl border border-border bg-[#F8FAFC] p-4 md:p-6">
      {caption ? (
        <figcaption className="mb-4 font-heading text-sm font-bold normal-case tracking-normal text-navy">
          {caption}
        </figcaption>
      ) : null}
      {children}
      {source ? <p className="mt-4 text-xs leading-relaxed text-navy/70">{source}</p> : null}
    </figure>
  );
}

function Donut({ slices, caption }: { slices: readonly { label: string; value: number; color?: string }[]; caption: string }) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
  const cx = 140;
  const radius = 96;
  const stroke = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const palette = [zaftysViz.navy, zaftysViz.primary, zaftysViz.primaryBright, zaftysViz.teal, zaftysViz.warm];
  const lead = [...slices].sort((a, b) => b.value - a.value)[0];
  const tiedLead = Boolean(lead && slices.filter((slice) => slice.value === lead.value).length > 1);

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
      <svg viewBox="0 0 280 280" className="h-72 w-72 shrink-0 md:h-80 md:w-80 lg:h-96 lg:w-96" role="img" aria-label={caption}>
        <circle cx={cx} cy={cx} r={radius} fill="none" stroke="#E8EEF7" strokeWidth={stroke} />
        <g transform={`rotate(-90 ${cx} ${cx})`}>
          {slices.map((slice, index) => {
            const length = (slice.value / total) * circumference;
            const node = (
              <circle
                key={slice.label}
                cx={cx}
                cy={cx}
                r={radius}
                fill="none"
                stroke={slice.color ?? palette[index % palette.length]}
                strokeWidth={stroke}
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={-offset}
              />
            );
            offset += length;
            return node;
          })}
        </g>
        <circle cx={cx} cy={cx} r={radius - stroke / 2 - 8} fill="white" />
        {!tiedLead && lead ? (
          <>
            <text
              x={cx}
              y={cx - 8}
              textAnchor="middle"
              fill={zaftysViz.navy}
              fontSize="42"
              fontWeight="700"
              fontFamily="inherit"
            >
              {lead.value}%
            </text>
            <text
              x={cx}
              y={cx + 22}
              textAnchor="middle"
              fill={zaftysViz.primary}
              fontSize="13"
              fontWeight="600"
              fontFamily="inherit"
            >
              {lead.label.length > 22 ? `${lead.label.slice(0, 20)}...` : lead.label}
            </text>
          </>
        ) : null}
      </svg>
      <ul className="w-full max-w-md space-y-3 text-base">
        {slices.map((slice, index) => (
          <li key={slice.label} className="flex items-start gap-3 text-navy/90">
            <span
              className="mt-1.5 h-4 w-4 shrink-0 rounded-sm"
              style={{ background: slice.color ?? palette[index % palette.length] }}
            />
            <span>
              <span className="font-semibold text-navy">{slice.label}</span>
              <span className="text-navy/70"> · {slice.value}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const scorecardGroups: Record<string, { label: string; weight: string; color: string }> = {
  Tracking: { label: "Tracking", weight: "25%", color: zaftysViz.navy },
  Yard: { label: "In-plant yard", weight: "25%", color: zaftysViz.primary },
  Sourcing: { label: "Fleet sourcing", weight: "20%", color: zaftysViz.primaryBright },
  Finance: { label: "Finance and ERP", weight: "20%", color: zaftysViz.teal },
  Vendor: { label: "Vendor capability", weight: "10%", color: zaftysViz.warm },
  Gate: { label: "Gate and masters", weight: "25%", color: zaftysViz.navy },
  Weighbridge: { label: "Weighbridge", weight: "25%", color: zaftysViz.primary },
  Bay: { label: "Bay distribution", weight: "25%", color: zaftysViz.primaryBright },
  Docs: { label: "Documents", weight: "15%", color: zaftysViz.teal },
  Governance: { label: "Transporter governance", weight: "10%", color: zaftysViz.warm },
  Contract: { label: "Contract sourcing", weight: "25%", color: zaftysViz.navy },
  Spot: { label: "Spot sourcing", weight: "25%", color: zaftysViz.primary },
  Visibility: { label: "Transit visibility", weight: "20%", color: zaftysViz.primaryBright },
  Backhaul: { label: "Backhaul", weight: "20%", color: zaftysViz.teal },
  Settlement: { label: "Settlement", weight: "10%", color: zaftysViz.warm },
  Slots: { label: "Yard and loading bays", weight: "20%", color: zaftysViz.primaryBright },
  Documentation: { label: "Documents and e-POD", weight: "20%", color: zaftysViz.teal },
  Analytics: { label: "Vendor analytics", weight: "10%", color: zaftysViz.warm },
  EPOD: { label: "Digital ePOD", weight: "25%", color: zaftysViz.navy },
  Eway: { label: "e-Way Bill compliance", weight: "25%", color: zaftysViz.primary },
  Invoice: { label: "Invoice audit", weight: "20%", color: zaftysViz.primaryBright },
  Detention: { label: "Detention control", weight: "20%", color: zaftysViz.teal },
  ERP: { label: "ERP and reporting", weight: "10%", color: zaftysViz.warm },
};

function ScorePips({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex shrink-0 gap-1" role="radiogroup" aria-label="Score 1 to 5">
      {[1, 2, 3, 4, 5].map((n) => {
        const selected = value === n;
        return (
          <button
            key={n}
            type="button"
            aria-checked={selected}
            role="radio"
            onClick={() => onChange(value === n ? 0 : n)}
            className={`flex h-8 w-8 items-center justify-center rounded-md border text-[11px] font-semibold transition-colors ${
              selected
                ? "border-navy bg-navy text-white"
                : "border-navy/25 bg-white text-navy/55 hover:border-navy/45 hover:text-navy"
            }`}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

function ScorecardTable({
  rows,
}: {
  rows: readonly (readonly string[])[];
}) {
  const [scores, setScores] = useState<Record<string, number>>({});
  const groups: { key: string; items: { num: string; ask: string }[] }[] = [];
  for (const row of rows) {
    const [num, group, ask] = row;
    const last = groups[groups.length - 1];
    if (!last || last.key !== group) groups.push({ key: group, items: [{ num, ask }] });
    else last.items.push({ num, ask });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg bg-white px-4 py-3 text-xs text-navy/80">
        <span>
          Tap a score in the room. <span className="font-semibold text-navy">1</span> weak · <span className="font-semibold text-navy">5</span> proven live.
        </span>
        <span className="hidden h-3 w-px bg-navy/15 sm:block" />
        <span>Skip the line = <span className="font-semibold text-navy">0</span> (tap again to clear). Do not mark phase two.</span>
      </div>
      {groups.map((group) => {
        const meta = scorecardGroups[group.key] ?? {
          label: group.key,
          weight: "",
          color: zaftysViz.navy,
        };
        return (
          <div key={group.key} className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm">
            <div
              className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-white"
              style={{ background: meta.color }}
            >
              <p className="font-heading text-sm font-bold normal-case tracking-normal">{meta.label}</p>
              <p className="text-[11px] font-semibold tracking-wide text-white/80">
                Weight {meta.weight}
                <span className="mx-2 opacity-50">·</span>
                Lines {group.items[0]?.num}-{group.items[group.items.length - 1]?.num}
              </p>
            </div>
            <ol>
              {group.items.map((item, index) => (
                <li
                  key={item.num}
                  className={`flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between ${
                    index < group.items.length - 1 ? "border-b border-navy/10" : ""
                  } ${index % 2 === 1 ? "bg-[#F8FAFC]" : ""}`}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ background: meta.color }}
                    >
                      {item.num}
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-navy">{item.ask}</p>
                  </div>
                  <div className="pl-10 sm:pl-0">
                    <ScorePips
                      value={scores[item.num] ?? 0}
                      onChange={(n) => setScores((prev) => ({ ...prev, [item.num]: n }))}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}

function CompareTable({
  headers,
  rows,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  const [, leftHead, rightHead] = headers;
  return (
    <div className="space-y-3">
      <div className="hidden grid-cols-[8rem_1fr_1fr] gap-3 px-1 text-[10px] font-heading font-bold tracking-widest text-navy/45 sm:grid">
        <span />
        <span>{leftHead}</span>
        <span>{rightHead}</span>
      </div>
      {rows.map((row) => {
        const [label, left, right] = row;
        return (
          <div key={label} className="grid gap-3 rounded-xl border border-navy/10 bg-white p-4 sm:grid-cols-[8rem_1fr_1fr] sm:items-stretch">
            <p className="font-heading text-xs font-bold normal-case tracking-normal text-[#1E4D8C] sm:pt-1">{label}</p>
            <div className="rounded-lg bg-[#F1F5F9] p-3 text-sm leading-relaxed text-navy/90">
              <p className="mb-1 text-[10px] font-heading font-bold tracking-widest text-navy/55 sm:hidden">{leftHead}</p>
              {left}
            </div>
            <div className="rounded-lg border border-[#0D9488]/30 bg-[#F0FDFA] p-3 text-sm leading-relaxed text-navy">
              <p className="mb-1 text-[10px] font-heading font-bold tracking-widest text-[#0D9488] sm:hidden">{rightHead}</p>
              {right}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function BlogExhibitBlock({ exhibit }: { exhibit: BlogExhibit }) {
  if (exhibit.kind === "donut") {
    return (
      <FigureChrome caption={exhibit.caption} source={exhibit.source}>
        <Donut slices={exhibit.slices} caption={exhibit.caption} />
      </FigureChrome>
    );
  }

  if (exhibit.kind === "table") {
    return (
      <FigureChrome caption={exhibit.caption} source={exhibit.source}>
        {exhibit.variant === "scorecard" ? (
          <ScorecardTable rows={exhibit.rows} />
        ) : exhibit.variant === "compare" ? (
          <CompareTable headers={exhibit.headers} rows={exhibit.rows} />
        ) : (
          <div className="-mx-1 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-navy/15 bg-white">
                  {exhibit.headers.map((header) => (
                    <th key={header} className="px-3 py-2 font-heading text-xs font-bold normal-case tracking-normal text-navy">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exhibit.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white/70" : "bg-[#EEF3F8]"}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`${rowIndex}-${cellIndex}`}
                        className={`px-3 py-2.5 align-top leading-relaxed text-navy/90 ${
                          cellIndex === row.length - 1 && exhibit.headers[cellIndex] === "Score"
                            ? "w-16 border-l border-dashed border-navy/20"
                            : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </FigureChrome>
    );
  }

  if (exhibit.kind === "tiles") {
    return (
      <FigureChrome caption={exhibit.caption} source={exhibit.source}>
        <div className="grid gap-3 sm:grid-cols-2">
          {exhibit.items.map((item, index) => (
            <div key={item.title} className="rounded-lg border border-navy/10 bg-white p-4">
              <p className="text-[10px] font-heading font-bold tracking-widest text-[#0D9488]">0{index + 1}</p>
              <h3 className="mt-1 font-heading text-sm font-bold normal-case tracking-normal text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/90">{item.body}</p>
            </div>
          ))}
        </div>
      </FigureChrome>
    );
  }

  if (exhibit.kind === "steps") {
    const many = exhibit.items.length >= 5;
    return (
      <FigureChrome caption={exhibit.caption} source={exhibit.source}>
        {many ? (
          <ol className="relative space-y-0 pl-2">
            {exhibit.items.map((item, index) => (
              <li key={item.title} className="relative flex gap-4 pb-6 last:pb-0">
                {index < exhibit.items.length - 1 ? (
                  <span
                    className="absolute left-[1.15rem] top-10 bottom-0 w-px bg-navy/15"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-heading font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 rounded-xl border border-navy/10 bg-white px-4 py-3.5 shadow-sm">
                  <h3 className="font-heading text-base font-bold normal-case tracking-normal text-navy">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy/90">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <ol className="grid gap-4 sm:grid-cols-2">
            {exhibit.items.map((item, index) => (
              <li key={item.title} className="rounded-xl border border-navy/10 bg-white p-5 shadow-sm">
                <span className="font-heading text-xs font-bold text-[#1E4D8C]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 font-heading text-base font-bold normal-case tracking-normal text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/90">{item.body}</p>
              </li>
            ))}
          </ol>
        )}
      </FigureChrome>
    );
  }

  if (exhibit.kind === "bars") {
    const max = Math.max(...exhibit.items.map((item) => item.value), 1);
    return (
      <FigureChrome caption={exhibit.caption} source={exhibit.source}>
        <ul className="space-y-3">
          {exhibit.items.map((item) => (
            <li key={item.label}>
              <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-navy">{item.label}</span>
                <span className="shrink-0 font-heading text-sm font-bold text-navy">
                  {item.value} {exhibit.unit}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-navy/10">
                <div
                  className="h-full rounded-full bg-[#1E4D8C]"
                  style={{ width: `${(item.value / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </FigureChrome>
    );
  }

  if (exhibit.kind === "stacked") {
    const total = exhibit.items.reduce((sum, item) => sum + item.value, 0) || 1;
    const palette = [zaftysViz.navy, zaftysViz.primaryBright, zaftysViz.teal, zaftysViz.warm];
    return (
      <FigureChrome caption={exhibit.caption} source={exhibit.source}>
        <div className="flex h-12 overflow-hidden rounded-full">
          {exhibit.items.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center justify-center text-[11px] font-bold text-white"
              style={{
                width: `${(item.value / total) * 100}%`,
                background: item.color ?? palette[index % palette.length],
              }}
            >
              {item.value}%
            </div>
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-4 text-sm">
          {exhibit.items.map((item, index) => (
            <li key={item.label} className="flex items-center gap-2 text-navy/90">
              <span
                className="h-3 w-3 rounded-sm"
                style={{ background: item.color ?? palette[index % palette.length] }}
              />
              {item.label}
            </li>
          ))}
        </ul>
      </FigureChrome>
    );
  }

  if (exhibit.kind === "ranges") {
    return (
      <FigureChrome caption={exhibit.caption} source={exhibit.source}>
        <ul className="space-y-4">
          {exhibit.items.map((item) => (
            <li key={item.label} className="rounded-xl border border-navy/10 bg-white p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-heading text-sm font-bold normal-case tracking-normal text-navy">{item.label}</h3>
                {item.low != null && item.high != null ? (
                  <p className="font-heading text-lg font-bold text-[#0D9488]">
                    {item.low}-{item.high}
                    {item.suffix ? ` ${item.suffix}` : ""}
                  </p>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-navy/90">{item.detail}</p>
              {item.low != null && item.high != null ? (
                <div className="relative mt-3 h-2 rounded-full bg-navy/10">
                  <div
                    className="absolute inset-y-0 rounded-full bg-[#0D9488]/70"
                    style={{ left: `${item.low}%`, width: `${Math.max(item.high - item.low, 4)}%` }}
                  />
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </FigureChrome>
    );
  }

  return (
    <FigureChrome caption={exhibit.caption} source={exhibit.source}>
      <ol className="grid gap-3 md:grid-cols-3">
        {exhibit.items.map((item) => (
          <li key={item.phase} className="rounded-lg border border-navy/10 bg-white p-4">
            <p className="text-[10px] font-heading font-bold tracking-widest text-[#0D9488]">{item.phase}</p>
            <h3 className="mt-1 font-heading text-sm font-bold normal-case tracking-normal text-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy/90">{item.body}</p>
          </li>
        ))}
      </ol>
    </FigureChrome>
  );
}
