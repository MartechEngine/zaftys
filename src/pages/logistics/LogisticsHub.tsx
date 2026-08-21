import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Container, Factory, Route, Shield, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import ResponsiveImage from "@/components/ResponsiveImage";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LogisticsServiceTeaser } from "@/components/logistics/LogisticsServiceSection";
import { paths } from "@/lib/site-paths";
import { pageSeo } from "@/lib/page-seo";
import {
  logisticsHubCopy,
  logisticsHubQuote,
  logisticsServiceIndex,
} from "@/lib/logistics-hub-copy";
import { homeFeaturedIndustries } from "@/lib/constants";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import heroServices from "@/assets/hero-services.webp";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, LucideIcon> = {
  "three-pl": Truck,
  contract: Shield,
  dedicated: Route,
  industrial: Factory,
  container: Container,
};

const serviceTeasers = [
  { service: logisticsHubCopy.container, path: paths.logistics.container },
  { service: logisticsHubCopy.threePl, path: paths.logistics.threePl },
  { service: logisticsHubCopy.industrial, path: paths.logistics.industrial },
  { service: logisticsHubCopy.contract, path: paths.logistics.contract },
  { service: logisticsHubCopy.dedicated, path: paths.logistics.dedicated },
] as const;

const LogisticsHub = () => {
  const { hash } = useLocation();
  const copy = logisticsHubCopy;
  const strip = copy.capacityStrip;

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
        className="relative scroll-mt-28 border-b border-border bg-surface"
      >
        <div className="container relative mx-auto container-padding py-14 md:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
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
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={cn(
                      "group flex h-full flex-col border border-border bg-white p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md",
                    )}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-heading text-2xl font-bold text-primary">{item.index}</span>
                      <Icon className="text-muted-foreground transition-colors group-hover:text-primary" size={22} />
                    </div>
                    <span className="mb-2 font-heading text-lg font-bold leading-snug text-navy md:text-xl">
                      {item.title}
                    </span>
                    <span className="mt-auto text-sm leading-relaxed text-muted-foreground">{item.blurb}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

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
              <Link to={strip.contract.path} className="font-heading font-bold text-navy hover:text-primary">
                {strip.contract.label}
              </Link>
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

      {serviceTeasers.map(({ service, path }) => (
        <LogisticsServiceTeaser key={service.id} service={service} path={path} />
      ))}

      <section id="industries" aria-labelledby="logistics-industries-heading" className="scroll-mt-28 bg-white py-12 md:py-16">
        <div className="container mx-auto container-padding">
          <div className="mb-8 text-center md:mb-10">
            <div className="mx-auto max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{copy.industries.eyebrow}</p>
              <h2 id="logistics-industries-heading" className="font-heading text-2xl font-bold text-navy md:text-3xl">
                {copy.industries.h2}
              </h2>
              <p className="mt-2 text-muted-foreground">{copy.industries.lead}</p>
            </div>
            <Link to={paths.industries} className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:underline">
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

      <section id="final-cta" aria-labelledby="logistics-final-cta-heading" className="final-cta-band">
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
