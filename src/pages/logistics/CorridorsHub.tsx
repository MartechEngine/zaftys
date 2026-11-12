import { Link } from "react-router-dom";
import { ArrowRight, MapPinned, Route, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  corridorQuote,
  corridorUrl,
  corridors,
  corridorsHubCopy,
  gbpServiceCities,
  gbpServiceStates,
} from "@/lib/corridors-data";
import { pageSeo } from "@/lib/page-seo";
import { paths } from "@/lib/site-paths";
import {
  breadcrumbSchema,
  corridorsHubCollectionSchema,
  logisticsServiceSchema,
  organizationSchema,
} from "@/lib/schema";
import heroServices from "@/assets/hero-services.webp";

const CorridorsHub = () => {
  const copy = corridorsHubCopy;

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.corridors.title}
        description={pageSeo.corridors.description}
        canonical={paths.logistics.corridors}
        schema={[
          organizationSchema,
          logisticsServiceSchema,
          corridorsHubCollectionSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Logistics", path: paths.logistics.hub },
            { name: "Routes & Corridors", path: paths.logistics.corridors },
          ]),
        ]}
      />

      <PageHero
        badge={copy.badge}
        title={copy.h1}
        description={copy.lead}
        imageSrc={heroServices}
        imageAlt={copy.imageAlt}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label={corridorQuote.label}
            subject={corridorQuote.subject}
            body={corridorQuote.body}
          />
          <WhatsAppButton label="Chat on WhatsApp" placement="corridors-hub-hero" />
          <Link to={paths.logistics.hub}>
            <Button size="lg" variant="on-dark-outline">
              All logistics
            </Button>
          </Link>
        </CTAGroup>
      </PageHero>

      <section
        aria-labelledby="areas-heading"
        className="border-b border-border bg-white"
      >
        <div className="container mx-auto container-padding py-14 md:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              {copy.areasEyebrow}
            </p>
            <h2 id="areas-heading" className="font-heading text-2xl font-bold text-navy md:text-3xl">
              {copy.areasH2}
            </h2>
            <p className="mt-3 text-muted-foreground">{copy.areasLead}</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="border border-border bg-surface p-6">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <MapPinned size={20} />
                <h3 className="font-heading text-lg font-bold text-navy">Cities & districts</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {gbpServiceCities.map((city) => (
                  <li
                    key={city}
                    className="border border-border bg-white px-3 py-1.5 text-sm text-navy"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border bg-surface p-6">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <Route size={20} />
                <h3 className="font-heading text-lg font-bold text-navy">States</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {gbpServiceStates.map((state) => (
                  <li
                    key={state}
                    className="border border-border bg-white px-3 py-1.5 text-sm text-navy"
                  >
                    {state}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Plus pan-India industrial corridors via labeled TranZfort network capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="honesty-heading"
        className="border-b border-border bg-surface"
      >
        <div className="container mx-auto container-padding py-14 md:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              {copy.honestyEyebrow}
            </p>
            <h2 id="honesty-heading" className="font-heading text-2xl font-bold text-navy md:text-3xl">
              {copy.honestyH2}
            </h2>
            <p className="mt-3 text-muted-foreground">{copy.honestyLead}</p>
          </div>
          <ul className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
            {copy.honestyPoints.map((point) => (
              <li key={point.title} className="border border-border bg-white p-6">
                <div className="mb-3 text-primary">
                  <Truck size={22} />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-navy">{point.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="corridors"
        aria-labelledby="corridors-index-heading"
        className="border-b border-border bg-white"
      >
        <div className="container mx-auto container-padding py-14 md:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              {copy.indexEyebrow}
            </p>
            <h2
              id="corridors-index-heading"
              className="font-heading text-2xl font-bold text-navy md:text-3xl"
            >
              {copy.indexH2}
            </h2>
            <p className="mt-3 text-muted-foreground">{copy.indexLead}</p>
          </div>
          <ul className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
            {corridors.map((corridor) => (
              <li key={corridor.slug}>
                <Link
                  to={corridorUrl(corridor.slug)}
                  className="group flex h-full flex-col justify-between border border-border bg-surface p-6 transition-colors hover:border-primary/40"
                >
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                      {corridor.badge}
                    </p>
                    <h3 className="mb-2 font-heading text-xl font-bold text-navy group-hover:text-primary">
                      {corridor.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{corridor.lead}</p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    View corridor <ArrowRight size={14} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="corridors-final-cta" className="final-cta-band">
        <div className="container mx-auto container-padding text-center">
          <h2 id="corridors-final-cta" className="mb-4 text-3xl font-heading font-bold md:text-4xl">
            {copy.ctaH2}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-300">{copy.ctaLead}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <WhatsAppButton label="WhatsApp the desk" placement="corridors-hub-footer" />
            <Link to={paths.contact}>
              <Button size="lg" variant="on-dark-outline">
                Contact form
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorridorsHub;
