import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpFromLine,
  CheckCircle2,
  Container,
  Cylinder,
  Layers,
  Maximize2,
  Package,
  Droplets,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { paths } from "@/lib/site-paths";
import {
  logisticsContainerInquiry,
  logisticsContractInquiry,
  logisticsHubQuote,
  type LogisticsServiceCopy,
} from "@/lib/logistics-hub-copy";
import type { LogisticsLeafCta } from "@/lib/logistics-service-leaves";
import { mailtoCompany } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const fleetTypeIcons: Record<string, LucideIcon> = {
  lcv: Package,
  open_truck: Truck,
  trailer: Layers,
  container: Container,
  bulker: Cylinder,
  tipper: ArrowUpFromLine,
  odc: Maximize2,
  tanker: Droplets,
};

type FleetSuitableType = LogisticsServiceCopy["fleetSuitable"]["types"][number];

function FleetTypeTile({ type, interactive = true }: { type: FleetSuitableType; interactive?: boolean }) {
  const Icon = fleetTypeIcons[type.id] ?? Truck;
  return (
    <Link
      to={`${paths.fleet}#${type.id}`}
      tabIndex={interactive ? undefined : -1}
      className="group flex h-[11rem] w-[8rem] flex-col items-center border border-border bg-surface px-3 py-4 text-center transition-colors hover:border-primary/40 hover:bg-white md:h-[12rem] md:w-[8.75rem] md:px-3.5 md:py-5"
    >
      <span className="mb-3 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white transition-colors group-hover:bg-primary md:h-14 md:w-14">
        <Icon size={24} strokeWidth={1.75} aria-hidden />
      </span>
      <span className="line-clamp-2 min-h-[2.5rem] w-full font-heading text-sm font-bold leading-snug text-navy">
        {type.label}
      </span>
      <span className="mt-1.5 line-clamp-2 min-h-[2rem] w-full text-[11px] leading-snug text-muted-foreground md:text-xs">
        {type.detail}
      </span>
    </Link>
  );
}

function FleetMarqueeSegment({
  types,
  interactive,
  labelled,
}: {
  types: readonly FleetSuitableType[];
  interactive: boolean;
  labelled?: boolean;
}) {
  const items = [...types, ...types];
  return (
    <ul
      className="flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4"
      aria-hidden={labelled ? undefined : true}
      aria-label={labelled ? "Suitable fleet types" : undefined}
    >
      {items.map((type, i) => (
        <li key={`${interactive ? "a" : "b"}-${type.id}-${type.label}-${i}`} className="shrink-0">
          <FleetTypeTile type={type} interactive={interactive && i < types.length} />
        </li>
      ))}
    </ul>
  );
}

function FleetSuitableScroller({ types }: { types: readonly FleetSuitableType[] }) {
  if (types.length === 0) return null;

  const canLoop = types.length > 1;
  const durationSec = Math.max(28, types.length * 7);

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white via-white/80 to-transparent md:w-14"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white via-white/80 to-transparent md:w-14"
        aria-hidden
      />

      <div className="py-5 md:py-6">
        <div
          className={cn(
            "flex w-max will-change-transform",
            canLoop &&
              "animate-scroll-rtl hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none",
          )}
          style={canLoop ? { animationDuration: `${durationSec}s` } : undefined}
        >
          <FleetMarqueeSegment types={types} interactive labelled />
          {canLoop ? <FleetMarqueeSegment types={types} interactive={false} /> : null}
        </div>
      </div>
    </div>
  );
}

export function LogisticsServiceCtas({
  serviceId,
  cta,
  secondary,
}: {
  serviceId: string;
  cta: LogisticsLeafCta;
  secondary: { label: string; path: string };
}) {
  const primary =
    cta === "contract"
      ? logisticsContractInquiry
      : cta === "container"
        ? logisticsContainerInquiry
        : logisticsHubQuote;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button asChild size="lg" variant="accent">
        <a
          href={mailtoCompany(primary.subject, primary.body)}
          onClick={() => trackEvent("cta_mailto", { placement: `logistics-${serviceId}`, intent: cta })}
        >
          {primary.label}
        </a>
      </Button>
      {cta !== "contract" ? (
        <WhatsAppButton label="Chat on WhatsApp" placement={`logistics-${serviceId}`} />
      ) : null}
      <Link to={secondary.path} className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
        {secondary.label} <ArrowRight className="ml-1.5" size={14} />
      </Link>
    </div>
  );
}

/** Full Design A body - used on service leaves (and optionally hub). */
export function LogisticsServiceBody({
  service,
  cta,
  /** When true (default), Overview repeats tagline + lead. Leaf pages set false after PageHero. */
  echoHero = true,
}: {
  service: LogisticsServiceCopy;
  cta: LogisticsLeafCta;
  echoHero?: boolean;
}) {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
          <div className="flex flex-col gap-5 md:gap-6">
            <article className="border border-border bg-white p-6 shadow-sm md:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                {echoHero ? "Overview" : "In practice"}
              </p>
              {echoHero ? (
                <>
                  <p className="mb-4 font-heading text-xl font-bold leading-snug text-navy md:text-2xl">{service.tagline}</p>
                  <p className="mb-3 leading-relaxed text-muted-foreground">{service.lead}</p>
                  <p className="leading-relaxed text-muted-foreground">{service.body}</p>
                </>
              ) : (
                <p className="leading-relaxed text-muted-foreground md:text-lg">{service.body}</p>
              )}
            </article>

            <article className="border border-primary/20 bg-navy p-6 text-white shadow-sm md:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">The problem we solve</p>
              <p className="text-lg leading-relaxed text-gray-100 md:text-xl">{service.problem}</p>
            </article>

            <article className="flex-1 border border-border bg-white p-6 shadow-sm md:p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                <h2 className="font-heading text-lg font-bold text-navy">Who this is for</h2>
              </div>
              <ul className="space-y-3">
                {service.whoFor.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="flex flex-col gap-5 md:gap-6">
            <article className="border border-border bg-white p-6 shadow-sm md:p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                <h2 className="font-heading text-lg font-bold text-navy">What you get</h2>
              </div>
              <ul className="space-y-3">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="flex-1 border border-border bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-5 font-heading text-lg font-bold text-navy">How we run it</h2>
              <ol className="m-0 space-y-4 p-0">
                {service.points.map((point, i) => (
                  <li key={point} className="flex gap-4 border-b border-border/70 pb-4 last:border-0 last:pb-0">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-navy font-heading text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-sm leading-relaxed text-muted-foreground md:text-base">{point}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="border border-border bg-white p-6 shadow-sm md:p-7">
              <p className="mb-1 font-heading font-bold text-navy">Ready to move this lane?</p>
              <p className="mb-5 text-sm text-muted-foreground">Request capacity or discuss a contract with the desk.</p>
              <LogisticsServiceCtas serviceId={service.id} cta={cta} secondary={service.secondary} />
            </article>
          </div>
        </div>

        <article className="mt-5 overflow-hidden border border-border bg-white shadow-sm md:mt-6 lg:mt-8">
          <div className="flex flex-col gap-4 border-b border-border/70 px-6 py-5 md:flex-row md:items-end md:justify-between md:gap-8 md:px-8 md:py-6">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Suitable fleet</p>
              <h2 className="mb-2 font-heading text-xl font-bold text-navy md:text-2xl">Body classes for this service</h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{service.fleetSuitable.lead}</p>
            </div>
            <Link
              to={paths.fleet}
              className="inline-flex shrink-0 items-center text-sm font-semibold text-primary hover:underline"
            >
              See full fleet catalog <ArrowRight className="ml-1.5" size={14} />
            </Link>
          </div>

          <FleetSuitableScroller types={service.fleetSuitable.types} />
        </article>
      </div>
    </>
  );
}

/** Image-head + body - used when embedding a service block on the hub (legacy full section). */
export function LogisticsServiceSection({
  service,
  cta,
}: {
  service: LogisticsServiceCopy;
  cta: LogisticsLeafCta;
}) {
  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-heading`}
      className="relative scroll-mt-28 bg-surface"
    >
      <div className="relative h-[280px] w-full overflow-hidden md:h-[360px] lg:h-[400px]">
        <img
          src={service.image}
          alt={service.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/50 to-navy/35" />
        <div className="absolute inset-x-0 top-0 z-10 p-6 md:p-10 lg:p-12">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 font-heading text-sm font-bold tracking-[0.22em] text-accent">{service.index}</p>
            <h2
              id={`${service.id}-heading`}
              className="font-heading text-2xl font-bold leading-[1.05] text-white sm:text-3xl md:text-5xl lg:text-6xl"
            >
              {service.title}
            </h2>
          </div>
        </div>
      </div>

      <LogisticsServiceBody service={service} cta={cta} />
    </section>
  );
}

/** Hub catalog teaser - image head + short copy + link to full leaf. */
export function LogisticsServiceTeaser({
  service,
  path,
}: {
  service: LogisticsServiceCopy;
  path: string;
}) {
  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-heading`}
      className="relative scroll-mt-28 bg-surface"
    >
      <div className="relative h-[240px] w-full overflow-hidden md:h-[300px] lg:h-[340px]">
        <img
          src={service.image}
          alt={service.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/50 to-navy/35" />
        <div className="absolute inset-x-0 top-0 z-10 p-6 md:p-10 lg:p-12">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 font-heading text-sm font-bold tracking-[0.22em] text-accent">{service.index}</p>
            <h2
              id={`${service.id}-heading`}
              className="font-heading text-2xl font-bold leading-[1.05] text-white sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {service.title}
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10 lg:px-10">
        <div className="border border-border bg-white p-6 shadow-sm md:p-8 lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-3xl">
            <p className="mb-3 font-heading text-xl font-bold leading-snug text-navy md:text-2xl">{service.tagline}</p>
            <p className="leading-relaxed text-muted-foreground">{service.lead}</p>
          </div>
          <Link
            to={path}
            className="mt-6 inline-flex shrink-0 items-center font-heading text-sm font-bold text-primary hover:underline lg:mt-0"
          >
            Full service page <ArrowRight className="ml-1.5" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
