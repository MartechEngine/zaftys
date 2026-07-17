import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type UiTone = "primary" | "destructive" | "warning" | "success" | "muted";

const toneText: Record<UiTone, string> = {
  primary: "text-primary",
  destructive: "text-destructive",
  warning: "text-warning",
  success: "text-success",
  muted: "text-muted-foreground",
};

export function ToneDot({ tone }: { tone: UiTone }) {
  return <Circle className={cn("h-2 w-2 fill-current", toneText[tone])} />;
}

/** Compact stat — obsidian shipments/fleet header row */
export function StatChip({
  label,
  value,
  tone = "primary",
}: {
  label: string;
  value: number | string;
  tone?: UiTone;
}) {
  return (
    <div className="glass p-4">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <ToneDot tone={tone} />
        {label}
      </div>
      <div className="mt-2 font-display text-3xl font-semibold tracking-tight text-heading">
        {value}
      </div>
    </div>
  );
}

/** Icon + stat — obsidian fleet KPI row */
export function IconStatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
}) {
  return (
    <div className="glass flex items-center gap-4 p-4">
      <div className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">
        <Icon className="size-5" strokeWidth={1.75} />
      </div>
      <div>
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="font-display text-2xl font-semibold text-heading">{value}</div>
      </div>
    </div>
  );
}

/** Alert / exception list row */
export function AlertRow({
  title,
  meta,
  href,
  icon: Icon,
  tone = "primary",
}: {
  title: string;
  meta?: string;
  href?: string;
  icon: LucideIcon;
  tone?: UiTone;
}) {
  const inner = (
    <>
      <div
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-lg",
          tone === "warning" && "bg-warning/15 text-warning",
          tone === "destructive" && "bg-destructive/15 text-destructive",
          tone === "success" && "bg-success/15 text-success",
          tone === "primary" && "bg-primary/15 text-primary",
          tone === "muted" && "bg-white/10 text-muted-foreground",
        )}
      >
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-heading">{title}</div>
        {meta && <div className="mt-0.5 text-[11px] text-muted-foreground">{meta}</div>}
      </div>
      {href && (
        <ChevronRight className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
      )}
    </>
  );

  const className =
    "group flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 transition hover:bg-white/[0.06]";

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

/** Dispatch kanban column shell */
export function KanbanColumn({
  title,
  count,
  tone = "muted",
  children,
}: {
  title: string;
  count: number;
  tone?: UiTone;
  children: ReactNode;
}) {
  return (
    <div className="glass flex min-w-[280px] flex-1 flex-col p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", tone === "primary" && "bg-primary", tone === "warning" && "bg-warning", tone === "success" && "bg-success", tone === "destructive" && "bg-destructive", tone === "muted" && "bg-muted-foreground")} />
          <span className="text-sm font-semibold text-heading">{title}</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-foreground/80">
            {count}
          </span>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

/** Inner card within a kanban column */
export function KanbanCard({ children }: { children: ReactNode }) {
  return <div className="glass-strong rounded-xl p-3">{children}</div>;
}

/** Network hero banner */
export function NetworkHero({
  eyebrow,
  title,
  description,
  stats,
}: {
  eyebrow: string;
  title: string;
  description: string;
  stats: { label: string; value: string; icon: LucideIcon }[];
}) {
  return (
    <section className="glass relative overflow-hidden p-6">
      <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full bg-silver/20 blur-3xl" />
      <div className="relative flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="text-[10px] tracking-[0.2em] text-primary uppercase">{eyebrow}</div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-heading md:text-3xl">{title}</h2>
          <p className="mt-1 max-w-lg text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-strong rounded-xl px-3 py-3 text-center sm:px-4">
              <s.icon className="mx-auto size-4 text-primary" />
              <div className="mt-1.5 font-display text-lg font-semibold text-heading sm:text-xl">
                {s.value}
              </div>
              <div className="text-[10px] tracking-wider text-muted-foreground uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
