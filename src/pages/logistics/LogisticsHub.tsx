import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Container,
  Factory,
  Route,
  Shield,
  Truck,
  Users,
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
import { homeFeaturedIndustries, homeOperatingModel, mailtoCompany } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import heroServices from "@/assets/hero-services.jpg";
import { cn } from "@/lib/utils";

const pillarIcons: Record<(typeof homeOperatingModel)[number]["id"], LucideIcon> = {
  fleet: Truck,
  contract: Route,
  network: Users,
};

const serviceIcons: Record<string, LucideIcon> = {
  "three-pl": Truck,
  contract: Shield,
  dedicated: Route,
  industrial: Factory,
  container: Container,
};

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
  cta: "quote" | "contract" | "container";
  secondary: { label: string; path: string };
  leafPath: string;
  tone: "light" | "tint" | "navy";
};

const serviceBlocks: ServiceBlock[] = [
  { ...logisticsHubCopy.threePl, cta: "quote", tone: "light" },
  { ...logisticsHubCopy.contract, cta: "contract", tone: "tint" },
  { ...logisticsHubCopy.dedicated, cta: "contract", tone: "light" },
  { ...logisticsHubCopy.industrial, cta: "quote", tone: "tint" },
  { ...logisticsHubCopy.container, cta: "container", tone: "navy" },
];

function ServiceCtas({ block }: { block: ServiceBlock }) {
  const primary =
    block.cta === "contract"
      ? logisticsContractInquiry
      : block.cta === "container"
        ? logisticsContainerInquiry
        : logisticsHubQuote;

  const onNavy = block.tone === "navy";

  return (
    <CTAGroup className="justify-start sm:justify-start">
      <Button asChild size="lg" variant="accent">
        <a
          href={mailtoCompany(primary.subject, primary.body)}
          onClick={() => trackEvent("cta_mailto", { placement: `logistics-${block.id}`, intent: block.cta })}
        >
          {primary.label}
        </a>
      </Button>
      {block.cta !== "contract" ? (
        <WhatsAppButton
          label="Chat on WhatsApp"
          placement={`logistics-${block.id}`}
          tone={onNavy ? "on-dark-outline" : "solid"}
        />
      ) : null}
      {block.secondary.path.startsWith("#") ? (
        <a href={block.secondary.path}>
          <Button
            size="lg"
            variant="outline"
            className={cn(
              onNavy
                ? "border-white/40 bg-transparent text-white hover:bg-white hover:text-navy"
                : "border-primary text-primary hover:bg-primary hover:text-white",
            )}
          >
            {block.secondary.label} <ArrowRight className="ml-2" size={16} />
          </Button>
        </a>
      ) : (
        <Link to={block.secondary.path}>
          <Button
            size="lg"
            variant="outline"
            className={cn(
              onNavy
                ? "border-white/40 bg-transparent text-white hover:bg-white hover:text-navy"
                : "border-primary text-primary hover:bg-primary hover:text-white",
            )}
          >
            {block.secondary.label} <ArrowRight className="ml-2" size={16} />
          </Button>
        </Link>
      )}
    </CTAGroup>
  );
}

const LogisticsHub = () => {
  const copy = logisticsHubCopy;

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

      {/* 01 — Hero */}
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
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-300">
          {logisticsServiceIndex.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="font-medium hover:text-white">
              {item.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* 02 — Services index (names as primary signal) */}
      <section
        id="services"
        aria-labelledby="services-index-heading"
        className="relative scroll-mt-28 border-b border-border bg-navy text-white"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, hsl(var(--primary) / 0.35), transparent 40%), radial-gradient(circle at 85% 80%, hsl(var(--accent) / 0.2), transparent 35%)",
          }}
        />
        <div className="container relative mx-auto container-padding py-14 md:py-16">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{copy.servicesIndex.eyebrow}</p>
            <h2 id="services-index-heading" className="mb-4 text-3xl font-heading font-bold leading-tight md:text-4xl">
              {copy.servicesIndex.h2}
            </h2>
            <p className="text-lg leading-relaxed text-gray-300">{copy.servicesIndex.lead}</p>
          </div>
          <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {logisticsServiceIndex.map((item) => {
              const Icon = serviceIcons[item.id] ?? Truck;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group flex h-full flex-col border border-white/15 bg-white/5 p-5 transition-colors hover:border-accent/50 hover:bg-white/10"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-heading text-2xl font-bold text-accent/90">{item.index}</span>
                      <Icon className="text-white/50 transition-colors group-hover:text-accent" size={22} />
                    </div>
                    <span className="mb-2 font-heading text-lg font-bold leading-snug text-white md:text-xl">
                      {item.title}
                    </span>
                    <span className="mt-auto text-sm leading-relaxed text-gray-400">{item.blurb}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 03 — How we move */}
      <section
        id="how-we-move"
        aria-labelledby="how-we-move-heading"
        className="section-padding scroll-mt-28 bg-gradient-to-b from-navy/[0.03] via-white to-white"
      >
        <div className="container mx-auto container-padding">
          <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              {copy.howWeMove.eyebrow}
            </p>
            <h2 id="how-we-move-heading" className="mb-4 text-3xl font-heading font-bold text-navy md:text-5xl">
              {copy.howWeMove.h2}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{copy.howWeMove.lead}</p>
          </div>

          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {copy.howWeMove.flowLabel}
          </p>

          <div className="relative">
            <div
              className="absolute left-[12%] right-[12%] top-[2.75rem] hidden h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-accent/40 lg:block"
              aria-hidden
            />
            <ol className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3 lg:gap-8">
              {homeOperatingModel.map((item) => {
                const Icon = pillarIcons[item.id];
                return (
                  <li key={item.id}>
                    <Link
                      to={item.link}
                      className={cn(
                        "group flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-md",
                        "transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl",
                      )}
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-heading font-bold text-primary-foreground ring-4 ring-white">
                          {item.step}
                        </span>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon size={24} />
                        </div>
                      </div>
                      <h3 className="mb-2 text-xl font-heading font-bold text-navy group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      <span className="inline-flex items-center text-sm font-semibold text-primary">
                        Learn more <ArrowRight className="ml-1.5 size-4" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* 04–08 — Service depth sections */}
      {serviceBlocks.map((block) => {
        const Icon = serviceIcons[block.id] ?? Truck;
        const onNavy = block.tone === "navy";
        const muted = onNavy ? "text-gray-300" : "text-muted-foreground";
        const heading = onNavy ? "text-white" : "text-navy";
        const accentLabel = onNavy ? "text-accent" : "text-primary";
        const panelBg = onNavy ? "border-white/15 bg-white/5" : "border-border bg-background/90";
        const checkPrimary = onNavy ? "text-accent" : "text-primary";
        const checkAccent = onNavy ? "text-accent" : "text-accent";

        return (
          <section
            key={block.id}
            id={block.id}
            aria-labelledby={`${block.id}-heading`}
            className={cn(
              "relative scroll-mt-28 overflow-hidden py-16 md:py-24",
              block.tone === "light" && "bg-white",
              block.tone === "tint" && "bg-gradient-to-br from-muted/50 via-white to-navy/[0.04]",
              block.tone === "navy" && "bg-navy text-white",
            )}
          >
            {!onNavy ? (
              <div
                className="pointer-events-none absolute -right-16 top-10 select-none font-heading text-[10rem] font-bold leading-none text-navy/[0.04] md:text-[14rem]"
                aria-hidden
              >
                {block.index}
              </div>
            ) : (
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                aria-hidden
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.25), transparent 40%)",
                }}
              />
            )}

            <div className="container relative mx-auto container-padding">
              <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
                {/* Left: display title */}
                <div className="lg:col-span-5 lg:sticky lg:top-28">
                  <div className="mb-5 flex items-center gap-3">
                    <span className={cn("font-heading text-sm font-bold tracking-[0.2em]", accentLabel)}>
                      {block.index}
                    </span>
                    <span className={cn("h-px w-10", onNavy ? "bg-white/30" : "bg-primary/30")} aria-hidden />
                    <Icon className={accentLabel} size={20} />
                  </div>
                  <h2
                    id={`${block.id}-heading`}
                    className={cn(
                      "mb-5 font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl",
                      heading,
                    )}
                  >
                    {block.title}
                  </h2>
                  <p className={cn("mb-6 text-xl font-medium leading-snug md:text-2xl", onNavy ? "text-white" : "text-navy/90")}>
                    {block.tagline}
                  </p>
                  <p className={cn("mb-4 text-base leading-relaxed md:text-lg", muted)}>{block.lead}</p>
                  <p className={cn("mb-8 text-base leading-relaxed", muted)}>{block.body}</p>
                  <Link
                    to={block.leafPath}
                    className={cn(
                      "inline-flex items-center text-sm font-semibold",
                      onNavy ? "text-accent hover:text-white" : "text-primary hover:underline",
                    )}
                  >
                    Full service page <ArrowRight className="ml-1.5" size={14} />
                  </Link>
                </div>

                {/* Right: depth panels */}
                <div className="lg:col-span-7">
                  <div className={cn("mb-6 border p-6 md:p-7", panelBg)}>
                    <p className={cn("mb-2 text-xs font-semibold uppercase tracking-widest", accentLabel)}>
                      The problem we solve
                    </p>
                    <p className={cn("text-base leading-relaxed md:text-lg", onNavy ? "text-gray-100" : "text-foreground/90")}>
                      {block.problem}
                    </p>
                  </div>

                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className={cn("border p-6", panelBg)}>
                      <h3 className={cn("mb-4 font-heading text-lg font-bold", heading)}>Who this is for</h3>
                      <ul className="space-y-3">
                        {block.whoFor.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2 className={cn("mt-0.5 shrink-0", checkPrimary)} size={18} />
                            <span className={cn("text-sm leading-relaxed", muted)}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={cn("border p-6", panelBg)}>
                      <h3 className={cn("mb-4 font-heading text-lg font-bold", heading)}>What you get</h3>
                      <ul className="space-y-3">
                        {block.outcomes.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2 className={cn("mt-0.5 shrink-0", checkAccent)} size={18} />
                            <span className={cn("text-sm leading-relaxed", muted)}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={cn("mb-8 border p-6 md:p-7", panelBg)}>
                    <h3 className={cn("mb-5 font-heading text-lg font-bold", heading)}>How we run it</h3>
                    <ol className="m-0 space-y-4 p-0">
                      {block.points.map((point, i) => (
                        <li key={point} className="flex items-start gap-4">
                          <span
                            className={cn(
                              "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center font-heading text-xs font-bold",
                              onNavy ? "bg-accent text-navy" : "bg-primary text-primary-foreground",
                            )}
                          >
                            {i + 1}
                          </span>
                          <span className={cn("leading-relaxed", muted)}>{point}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <ServiceCtas block={block} />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* 09 — Industries */}
      <section id="industries" aria-labelledby="logistics-industries-heading" className="section-padding scroll-mt-28 bg-white">
        <div className="container mx-auto container-padding">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{copy.industries.eyebrow}</p>
            <h2 id="logistics-industries-heading" className="mb-4 text-3xl font-heading font-bold text-navy md:text-5xl">
              {copy.industries.h2}
            </h2>
            <p className="text-lg text-muted-foreground">{copy.industries.lead}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homeFeaturedIndustries.map((industry) => (
              <Link
                key={industry.slug}
                to={`${paths.industries}/${industry.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <ResponsiveImage
                  src={industry.image}
                  alt={`${industry.name} transport by ZAFTYS`}
                  aspectRatio="2/1"
                  objectFit="cover"
                />
                <div className="p-4">
                  <p className="font-heading font-bold text-navy group-hover:text-primary">{industry.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link to={paths.industries} className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
              View all industries <ArrowRight className="ml-1.5" size={14} />
            </Link>
          </p>
        </div>
      </section>

      {/* 10 — Capacity clarity */}
      <section id="capacity-clarity" aria-labelledby="capacity-clarity-heading" className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            {copy.capacityClarity.eyebrow}
          </p>
          <h2 id="capacity-clarity-heading" className="mb-4 text-3xl font-heading font-bold text-navy md:text-5xl">
            {copy.capacityClarity.h2}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{copy.capacityClarity.lead}</p>
          <CTAGroup>
            <Link to={paths.fleet}>
              <Button variant="accent">
                See Our Fleet <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            <Link to={paths.network.hub}>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Explore Network
              </Button>
            </Link>
          </CTAGroup>
        </div>
      </section>

      {/* 11 — Final CTA */}
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
