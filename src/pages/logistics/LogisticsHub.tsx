import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Container,
  Factory,
  Route,
  Shield,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import ResponsiveImage from "@/components/ResponsiveImage";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { paths } from "@/lib/site-paths";
import { pageSeo } from "@/lib/page-seo";
import {
  logisticsContainerInquiry,
  logisticsContractInquiry,
  logisticsHubCopy,
  logisticsHubQuote,
  logisticsServiceIndex,
} from "@/lib/logistics-hub-copy";
import { homeFeaturedIndustries, mailtoCompany } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import heroServices from "@/assets/hero-services.jpg";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, LucideIcon> = {
  "three-pl": Truck,
  contract: Shield,
  dedicated: Route,
  industrial: Factory,
  container: Container,
};

type ServiceVisual =
  | (typeof logisticsHubCopy.threePl)["visual"]
  | (typeof logisticsHubCopy.contract)["visual"]
  | (typeof logisticsHubCopy.dedicated)["visual"]
  | (typeof logisticsHubCopy.industrial)["visual"]
  | (typeof logisticsHubCopy.container)["visual"];

type ServiceBlock = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  lead: string;
  body: string;
  problem: string;
  whoFor: readonly string[];
  points: readonly string[];
  outcomes: readonly string[];
  image: string;
  imageAlt: string;
  visual: ServiceVisual;
  cta: "quote" | "contract" | "container";
  secondary: { label: string; path: string };
  leafPath: string;
};

const serviceBlocks: ServiceBlock[] = [
  { ...logisticsHubCopy.container, cta: "container" },
  { ...logisticsHubCopy.threePl, cta: "quote" },
  { ...logisticsHubCopy.industrial, cta: "quote" },
  { ...logisticsHubCopy.contract, cta: "contract" },
  { ...logisticsHubCopy.dedicated, cta: "contract" },
];

const serviceIds = serviceBlocks.map((b) => b.id);

function useActiveService(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: [0.1, 0.25, 0.4] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function ServiceCtas({ block }: { block: ServiceBlock }) {
  const primary =
    block.cta === "contract"
      ? logisticsContractInquiry
      : block.cta === "container"
        ? logisticsContainerInquiry
        : logisticsHubQuote;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button asChild size="lg" variant="accent">
        <a
          href={mailtoCompany(primary.subject, primary.body)}
          onClick={() => trackEvent("cta_mailto", { placement: `logistics-${block.id}`, intent: block.cta })}
        >
          {primary.label}
        </a>
      </Button>
      {block.cta !== "contract" ? (
        <WhatsAppButton label="Chat on WhatsApp" placement={`logistics-${block.id}`} />
      ) : null}
      {block.secondary.path.startsWith("#") ? (
        <a href={block.secondary.path} className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
          {block.secondary.label} <ArrowRight className="ml-1.5" size={14} />
        </a>
      ) : (
        <Link to={block.secondary.path} className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
          {block.secondary.label} <ArrowRight className="ml-1.5" size={14} />
        </Link>
      )}
    </div>
  );
}

/** Locked Design A — image head + equal 50/50 content grid */
function ServiceSection({ block }: { block: ServiceBlock }) {
  return (
    <section
      id={block.id}
      aria-labelledby={`${block.id}-heading`}
      className="relative scroll-mt-28 bg-[#f3f5f8]"
    >
      <div className="relative h-[280px] w-full overflow-hidden md:h-[360px] lg:h-[400px]">
        <img
          src={block.image}
          alt={block.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/50 to-navy/35" />
        <div className="absolute inset-x-0 top-0 z-10 p-6 md:p-10 lg:p-12">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 font-heading text-sm font-bold tracking-[0.22em] text-accent">{block.index}</p>
            <h2
              id={`${block.id}-heading`}
              className="font-heading text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl"
            >
              {block.title}
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
          <div className="flex flex-col gap-5 md:gap-6">
            <article className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Overview</p>
              <p className="mb-4 font-heading text-xl font-bold leading-snug text-navy md:text-2xl">{block.tagline}</p>
              <p className="mb-3 leading-relaxed text-muted-foreground">{block.lead}</p>
              <p className="mb-5 leading-relaxed text-muted-foreground">{block.body}</p>
              <Link to={block.leafPath} className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
                Full service page <ArrowRight className="ml-1.5" size={14} />
              </Link>
            </article>

            <article className="rounded-2xl border border-primary/20 bg-navy p-6 text-white shadow-sm md:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">The problem we solve</p>
              <p className="text-lg leading-relaxed text-gray-100 md:text-xl">{block.problem}</p>
            </article>

            <article className="flex-1 rounded-2xl border border-border bg-white p-6 shadow-sm md:p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                <h3 className="font-heading text-lg font-bold text-navy">Who this is for</h3>
              </div>
              <ul className="space-y-3">
                {block.whoFor.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="flex flex-col gap-5 md:gap-6">
            <article className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                <h3 className="font-heading text-lg font-bold text-navy">What you get</h3>
              </div>
              <ul className="space-y-3">
                {block.outcomes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="flex-1 rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
              <h3 className="mb-5 font-heading text-lg font-bold text-navy">How we run it</h3>
              <ol className="m-0 space-y-4 p-0">
                {block.points.map((point, i) => (
                  <li key={point} className="flex gap-4 border-b border-border/70 pb-4 last:border-0 last:pb-0">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-navy font-heading text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-sm leading-relaxed text-muted-foreground md:text-base">{point}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-7">
              <p className="mb-1 font-heading font-bold text-navy">Ready to move this lane?</p>
              <p className="mb-5 text-sm text-muted-foreground">Request capacity or discuss a contract with the desk.</p>
              <ServiceCtas block={block} />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

const LogisticsHub = () => {
  const copy = logisticsHubCopy;
  const activeService = useActiveService(serviceIds);
  const strip = copy.capacityStrip;

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.logistics.title}
        description={pageSeo.logistics.description}
        canonical={paths.logistics.hub}
        schema={[
          organizationSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Logistics", path: paths.logistics.hub },
          ]),
        ]}
      />

      <PageHero
        badge={copy.hero.badge}
        title={copy.hero.h1}
        description={copy.hero.lead}
        imageSrc={heroServices}
        imageAlt={copy.hero.imageAlt}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label={logisticsHubQuote.label}
            subject={logisticsHubQuote.subject}
            body={logisticsHubQuote.body}
          />
          <WhatsAppButton label="Chat on WhatsApp" placement="logistics-hub-hero" />
          <Link to={paths.fleet}>
            <Button size="lg" variant="on-dark-outline">
              Our Fleet
            </Button>
          </Link>
        </CTAGroup>
      </PageHero>

      <section
        id="services"
        aria-labelledby="services-index-heading"
        className="relative scroll-mt-28 border-b border-border bg-[#f3f5f8]"
      >
        <div className="container relative mx-auto container-padding py-14 md:py-16">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              {copy.servicesIndex.eyebrow}
            </p>
            <h2
              id="services-index-heading"
              className="mb-4 font-heading text-3xl font-bold leading-tight text-navy md:text-4xl"
            >
              {copy.servicesIndex.h2}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{copy.servicesIndex.lead}</p>
          </div>
          <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {logisticsServiceIndex.map((item) => {
              const Icon = serviceIcons[item.id] ?? Truck;
              const active = activeService === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "group flex h-full flex-col border bg-white p-5 shadow-sm transition-all",
                      active
                        ? "border-primary ring-1 ring-primary/20"
                        : "border-border hover:border-primary/40 hover:shadow-md",
                    )}
                    aria-current={active ? "true" : undefined}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-heading text-2xl font-bold text-primary">{item.index}</span>
                      <Icon
                        className={cn(
                          "transition-colors",
                          active ? "text-accent" : "text-muted-foreground group-hover:text-primary",
                        )}
                        size={22}
                      />
                    </div>
                    <span className="mb-2 font-heading text-lg font-bold leading-snug text-navy md:text-xl">
                      {item.title}
                    </span>
                    <span className="mt-auto text-sm leading-relaxed text-muted-foreground">{item.blurb}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Compact capacity strip — replaces How we move + Capacity clarity */}
      <section id="capacity" aria-label="Capacity model" className="border-b border-border bg-white">
        <div className="container mx-auto container-padding py-8 md:py-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm md:text-base">
              <Link to={strip.owned.path} className="font-heading font-bold text-navy hover:text-primary">
                {strip.owned.label}
              </Link>
              <span className="text-muted-foreground" aria-hidden>
                ·
              </span>
              <a href={strip.contract.path} className="font-heading font-bold text-navy hover:text-primary">
                {strip.contract.label}
              </a>
              <span className="text-muted-foreground" aria-hidden>
                ·
              </span>
              <Link to={strip.network.path} className="font-heading font-bold text-navy hover:text-primary">
                {strip.network.label}
              </Link>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-right">{strip.note}</p>
          </div>
        </div>
      </section>

      {serviceBlocks.map((block) => (
        <ServiceSection key={block.id} block={block} />
      ))}

      {/* Industries — short strip */}
      <section id="industries" aria-labelledby="logistics-industries-heading" className="scroll-mt-28 bg-white py-12 md:py-16">
        <div className="container mx-auto container-padding">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{copy.industries.eyebrow}</p>
              <h2 id="logistics-industries-heading" className="font-heading text-2xl font-bold text-navy md:text-3xl">
                {copy.industries.h2}
              </h2>
              <p className="mt-2 text-muted-foreground">{copy.industries.lead}</p>
            </div>
            <Link to={paths.industries} className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
              View all industries <ArrowRight className="ml-1.5" size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {homeFeaturedIndustries.map((industry) => (
              <Link
                key={industry.slug}
                to={`${paths.industries}/${industry.slug}`}
                className="group overflow-hidden border border-border bg-card transition-colors hover:border-primary/40"
              >
                <ResponsiveImage
                  src={industry.image}
                  alt={`${industry.name} transport by ZAFTYS`}
                  aspectRatio="16/9"
                  objectFit="cover"
                />
                <div className="px-3 py-3">
                  <p className="font-heading text-sm font-bold text-navy group-hover:text-primary md:text-base">
                    {industry.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="final-cta" aria-labelledby="logistics-final-cta-heading" className="bg-primary py-16 text-white md:py-20">
        <div className="container mx-auto container-padding text-center">
          <h2 id="logistics-final-cta-heading" className="mb-4 text-3xl font-heading font-bold md:text-4xl">
            {copy.finalCta.h2}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-300">{copy.finalCta.lead}</p>
          <CTAGroup>
            <HeroEmailButton
              label={logisticsHubQuote.label}
              subject={logisticsHubQuote.subject}
              body={logisticsHubQuote.bodyShort}
            />
            <WhatsAppButton label="Chat on WhatsApp" placement="logistics-hub-cta" />
            <Link to={paths.fleet}>
              <Button size="lg" variant="on-dark-outline">
                Our Fleet
              </Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default LogisticsHub;
