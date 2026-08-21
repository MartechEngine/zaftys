import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Gauge, Network, Radio, Shield, Truck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import heroFleet from "@/assets/hero-fleet.webp";
import { pageHeroAlts } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import ResponsiveImage from "@/components/ResponsiveImage";
import { marketplaceVehicleCatalog } from "@/lib/vehicle-catalog";
import {
  fleetCargoMatch,
  fleetOpsPoints,
  fleetPageCopy,
  ownedFleetAssets,
} from "@/lib/fleet-page-copy";
import { pageSeo } from "@/lib/page-seo";
import { breadcrumbSchema } from "@/lib/schema";
import { truckImageForId } from "@/lib/services-images";
import { paths } from "@/lib/site-paths";
import { cn } from "@/lib/utils";

const opsIcons: LucideIcon[] = [Gauge, Wrench, Shield, Radio];

function useActiveFleetCategory() {
  const [active, setActive] = useState<"own-fleet" | "network-fleet">("own-fleet");

  useEffect(() => {
    const ids = ["own-fleet", "network-fleet"] as const;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id === "own-fleet" || id === "network-fleet") setActive(id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.05, 0.15, 0.3] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

const Fleet = () => {
  const { hash } = useLocation();
  const copy = fleetPageCopy;
  const activeCategory = useActiveFleetCategory();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.fleet.title}
        description={pageSeo.fleet.description}
        canonical={paths.fleet}
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Fleet", path: paths.fleet },
        ])}
      />

      <PageHero
        badge={copy.hero.badge}
        title={copy.hero.h1}
        description={copy.hero.lead}
        imageSrc={heroFleet}
        imageAlt={pageHeroAlts.fleet}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label="Check Fleet Availability"
            subject={heroMailSubjects.fleet}
            body={heroMailBodies.fleet}
          />
          <Link to={paths.logistics.hub}>
            <Button size="lg" variant="on-dark-outline">
              Transportation
            </Button>
          </Link>
        </CTAGroup>
      </PageHero>

      <section
        className="sticky top-16 z-20 border-b border-border bg-surface/95 shadow-sm backdrop-blur"
        aria-label="Fleet categories"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-3 py-2 sm:gap-3 sm:px-6 md:px-8 md:py-2.5">
          <a
            href="#own-fleet"
            aria-current={activeCategory === "own-fleet" ? "true" : undefined}
            className={cn(
              "group relative flex items-center gap-3 overflow-hidden border-2 px-3 py-2.5 transition-all md:gap-3.5 md:px-4 md:py-3",
              activeCategory === "own-fleet"
                ? "border-navy bg-navy text-white shadow-md shadow-navy/20"
                : "border-transparent bg-white text-navy hover:border-navy/30 hover:shadow-sm",
            )}
          >
            <span
              className={cn(
                "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg md:h-10 md:w-10",
                activeCategory === "own-fleet" ? "bg-white/15 text-accent" : "bg-navy text-white",
              )}
            >
              <Truck size={18} strokeWidth={1.75} aria-hidden />
            </span>
            <span className="min-w-0 text-left">
              <span
                className={cn(
                  "mb-0 block text-[10px] font-bold uppercase tracking-[0.16em]",
                  activeCategory === "own-fleet" ? "text-accent" : "text-primary",
                )}
              >
                01 · Own
              </span>
              <span className="block font-heading text-base font-bold leading-tight md:text-lg">Own Fleet</span>
              <span
                className={cn(
                  "mt-0.5 hidden text-xs leading-snug sm:block",
                  activeCategory === "own-fleet" ? "text-gray-300" : "text-muted-foreground",
                )}
              >
                Company-operated trucks
              </span>
            </span>
          </a>

          <a
            href="#network-fleet"
            aria-current={activeCategory === "network-fleet" ? "true" : undefined}
            className={cn(
              "group relative flex items-center gap-3 overflow-hidden border-2 px-3 py-2.5 transition-all md:gap-3.5 md:px-4 md:py-3",
              activeCategory === "network-fleet"
                ? "border-accent bg-navy text-white shadow-md shadow-accent/20"
                : "border-transparent bg-white text-navy hover:border-accent/40 hover:shadow-sm",
            )}
          >
            <span
              className={cn(
                "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg md:h-10 md:w-10",
                activeCategory === "network-fleet" ? "bg-accent text-white" : "bg-navy text-accent",
              )}
            >
              <Network size={18} strokeWidth={1.75} aria-hidden />
            </span>
            <span className="min-w-0 text-left">
              <span
                className={cn(
                  "mb-0 block text-[10px] font-bold uppercase tracking-[0.16em]",
                  activeCategory === "network-fleet" ? "text-accent" : "text-muted-foreground",
                )}
              >
                02 · Network
              </span>
              <span className="block font-heading text-base font-bold leading-tight md:text-lg">Network Fleet</span>
              <span
                className={cn(
                  "mt-0.5 hidden text-xs leading-snug sm:block",
                  activeCategory === "network-fleet" ? "text-gray-300" : "text-muted-foreground",
                )}
              >
                All commercial types · labeled
              </span>
            </span>
          </a>
        </div>
      </section>

      {/* Own Fleet */}
      <section id="own-fleet" className="scroll-mt-36 bg-surface">
        <div className="border-b border-border bg-white px-5 py-12 md:px-8 md:py-14">
          <div className="mx-auto max-w-7xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{copy.own.eyebrow}</p>
            <h2 className="mb-3 font-heading text-3xl font-bold text-navy md:text-4xl">{copy.own.h2}</h2>
            <p className="max-w-2xl text-lg text-muted-foreground">{copy.own.lead}</p>
          </div>
        </div>

        <div className="px-5 py-10 md:px-8 md:py-12">
          <div className="mx-auto max-w-7xl">
            <ul className="mb-8 flex flex-wrap gap-2">
              {ownedFleetAssets.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-semibold text-navy hover:border-primary/40"
                  >
                    {t.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {ownedFleetAssets.map((item) => {
                const img = truckImageForId(item.imageId);
                return (
                  <article
                    id={item.id}
                    key={item.id}
                    className="scroll-mt-40 overflow-hidden border border-border bg-white shadow-sm"
                  >
                    <div className="flex items-center justify-between border-b border-border bg-navy px-4 py-2.5 text-white">
                      <span className="text-xs font-semibold uppercase tracking-widest text-accent">Own Fleet</span>
                      <span className="font-heading text-sm font-bold">{item.title}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[9.5rem_1fr]">
                      <div className="bg-black">
                        <ResponsiveImage
                          src={img.src}
                          alt={img.alt}
                          aspectRatio="3/2"
                          objectFit="contain"
                          className="bg-black"
                        />
                      </div>
                      <div className="p-5">
                        <p className="mb-3 text-sm text-muted-foreground">{item.detail}</p>
                        <ul className="flex flex-wrap gap-1.5">
                          {item.specs.map((style) => (
                            <li
                              key={style}
                              className="rounded bg-surface px-2 py-0.5 text-[11px] font-semibold uppercase text-navy"
                            >
                              {style}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 overflow-hidden border border-border bg-white">
              <div className="border-b border-border px-5 py-4">
                <h3 className="font-heading text-lg font-bold text-navy">Cargo → own-fleet asset</h3>
              </div>
              {fleetCargoMatch.map((row, i) => (
                <div
                  key={row.cargo}
                  className={cn(
                    "grid grid-cols-1 gap-1 border-b border-border px-5 py-3.5 last:border-0 sm:grid-cols-2",
                    i % 2 === 0 ? "bg-white" : "bg-surface",
                  )}
                >
                  <p className="font-heading font-bold text-navy">{row.cargo}</p>
                  <p className="text-muted-foreground">{row.truck}</p>
                </div>
              ))}
            </div>

            {/* Ops under Own — ownership = how the lane is run */}
            <div className="mt-10">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-navy">{copy.ops.h2}</h3>
                  <p className="mt-1 max-w-xl text-sm text-muted-foreground">{copy.ops.lead}</p>
                </div>
                <Link
                  to={paths.technology.tms}
                  className="inline-flex shrink-0 items-center text-sm font-semibold text-primary hover:underline"
                >
                  Explore ZAFTYS TMS <ArrowRight className="ml-1.5" size={14} />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {fleetOpsPoints.map((p, i) => {
                  const Icon = opsIcons[i] ?? Gauge;
                  return (
                    <div key={p.title} className="border border-border bg-white p-4">
                      <Icon className="mb-2.5 text-primary" size={20} />
                      <h4 className="mb-1 font-heading text-sm font-bold text-navy">{p.title}</h4>
                      <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Fleet */}
      <section id="network-fleet" className="scroll-mt-36 bg-navy text-white">
        <div className="px-5 py-12 md:px-8 md:py-14">
          <div className="mx-auto max-w-7xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">{copy.network.eyebrow}</p>
            <h2 className="mb-3 font-heading text-3xl font-bold md:text-4xl">{copy.network.h2}</h2>
            <p className="mb-8 max-w-2xl text-lg text-gray-300">{copy.network.lead}</p>
            <div className="grid gap-4 md:grid-cols-3">
              {copy.network.points.map((card) => (
                <article key={card.title} className="border border-white/15 bg-white/5 p-5">
                  <h3 className="mb-2 font-heading text-lg font-bold">{card.title}</h3>
                  <p className="text-sm text-gray-400">{card.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-surface px-5 py-10 text-navy md:px-8 md:py-12">
          <div className="mx-auto max-w-7xl">
            <h3 className="mb-2 font-heading text-2xl font-bold">Network catalog — all types</h3>
            <p className="mb-5 max-w-2xl text-muted-foreground">{copy.network.catalogLead}</p>

            <ul className="mb-6 flex flex-wrap gap-2">
              {marketplaceVehicleCatalog.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-semibold text-navy hover:border-primary/40"
                  >
                    {t.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {marketplaceVehicleCatalog.map((item) => {
                const img = truckImageForId(item.imageId);
                return (
                  <article
                    id={item.id}
                    key={item.id}
                    className="scroll-mt-40 overflow-hidden border border-border bg-white shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-border bg-navy px-3 py-2 text-white">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">Network</span>
                      <span className="truncate font-heading text-sm font-bold">{item.title}</span>
                    </div>
                    <div className="bg-black">
                      <ResponsiveImage
                        src={img.src}
                        alt={img.alt}
                        aspectRatio="16/10"
                        objectFit="contain"
                        className="bg-black"
                      />
                    </div>
                    <div className="p-3.5">
                      <p className="mb-2 line-clamp-2 text-xs font-medium text-navy/80">{item.typical}</p>
                      <ul className="flex flex-wrap gap-1">
                        {item.bodyStyles.slice(0, 3).map((style) => (
                          <li
                            key={style}
                            className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-semibold uppercase text-navy"
                          >
                            {style}
                          </li>
                        ))}
                        {item.bodyStyles.length > 3 ? (
                          <li className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                            +{item.bodyStyles.length - 3}
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" variant="accent" asChild>
                <Link to={paths.network.tranzfort}>About Tranzfort</Link>
              </Button>
              <Button size="lg" variant="outline-brand" asChild>
                <Link to={paths.network.hub}>
                  Network hub <ArrowRight className="ml-2" size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta-band text-center">
        <div className="container mx-auto container-padding">
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">{copy.finalCta.h2}</h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-200">{copy.finalCta.lead}</p>
          <CTAGroup>
            <HeroEmailButton
              label="Check Fleet Availability"
              subject={heroMailSubjects.fleet}
              body={heroMailBodies.fleet}
            />
            <WhatsAppButton label="Chat on WhatsApp" placement="fleet-cta" />
            <Link to={paths.logistics.hub}>
              <Button size="lg" variant="on-dark-outline">
                Transportation
              </Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default Fleet;
