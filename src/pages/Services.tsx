import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Factory, Route, Network, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import ImageContentCard from "@/components/ImageContentCard";
import { LazyTmsScreensCarousel } from "@/components/LazyTmsScreensCarousel";
import { LazyTranZfortScreensCarousel } from "@/components/LazyTranZfortScreensCarousel";
import { externalLinks, vehicleClasses, materialTypes } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { pageSeo } from "@/lib/page-seo";
import { TransportationExplorer } from "@/components/TransportationExplorer";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { PageHero } from "@/components/PageHero";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import heroServices from "@/assets/hero-services.jpg";
import { pageHeroAlts } from "@/lib/page-heroes";
import { truckingServiceSchema, organizationSchema, breadcrumbSchema } from "@/lib/schema";
import { truckImageForId, materialImageForId } from "@/lib/services-images";

const Services = () => {
  const detailedServices = [
    {
      id: "ftl",
      icon: Truck,
      title: "Full truckload (FTL)",
      description:
        "One dedicated truck, one cargo, one corridor. Any class: LCV, heavy load, container, tanker, or bulker.",
      features: ["Any of the five vehicle classes", "Pan-India commercial corridors", "TMS tracking on contracted trips", "GST-compliant billing"],
      highlight: "The truck matches the cargo, not the other way around",
    },
    {
      id: "contract",
      icon: Factory,
      title: "Contract fleet",
      description:
        "Assigned trucks and drivers on a plant, mill, or DC program. A season or a year. The class follows the lane.",
      features: ["Dedicated vehicles on repeat windows", "Account desk that knows the gate", "Performance on the lane, not a one-off rate", "TMS visibility for the shipper"],
      highlight: "Assigned capacity on corridors you run every week",
    },
    {
      id: "optimization",
      icon: Route,
      title: "Route and return-load planning",
      description:
        "Fewer empty kilometres on lanes we already run. Corridor planning, not a generic routing slogan.",
      features: ["Return-load thinking on repeat lanes", "Plant and DC window awareness", "Fuel-sensible routing", "TranZfort when the return needs a posted load"],
      highlight: "Cut empty returns on corridors we know",
    },
    {
      id: "marketplace",
      icon: Network,
      title: "TranZfort marketplace cover",
      description:
        "Post the load on TranZfort when you need a truck we do not have that day. Listing and search are free. We charge a broker fee to truckers on booked loads. Trips contracted through ZAFTYS stay on GST billing.",
      features: ["Free to post and find", "AI-powered matching", "Broker fee on trucker bookings", "TMS visibility on ZAFTYS trips"],
      highlight: "Extra trucks on the same ZAFTYS contract",
    },
  ];

  const schema = [
    truckingServiceSchema,
    organizationSchema,
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.services.title}
        description={pageSeo.services.description}
        canonical="/services"
        schema={schema}
      />

      <PageHero
        badge={pageHeroCopy.services.badge}
        title={pageHeroCopy.services.h1}
        description={pageHeroCopy.services.lead}
        imageSrc={heroServices}
        imageAlt={pageHeroAlts.services}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label="Get a Freight Quote"
            subject={heroMailSubjects.quote}
            body={heroMailBodies.quote}
          />
          <a href="#transportation-explorer">
            <Button size="lg" variant="on-dark-outline">Match Truck &amp; Material</Button>
          </a>
        </CTAGroup>
      </PageHero>

      {/* Transportation explorer  -  truck × material matrix */}
      <section id="transportation-explorer" className="section-padding bg-surface scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-navy">Match the right asset to the cargo</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Pick a body type or material. LCV pairs with FMCG factory-to-DC. Tippers and open body pair with bulk. Tankers pair with energy and chemicals.
            </p>
          </div>
          <TransportationExplorer />
        </div>
      </section>

      {/* Truck classes  -  5 classes + contract program, 3x2 */}
      <section id="trucks" className="section-padding bg-white scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">Truck classes we run</h2>
            <p className="text-lg text-muted-foreground">
              LCV, heavy load, container, tanker, and bulker, plus contract fleet. The full TranZfort type list is on Fleet.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicleClasses.map((item) => {
              const img = truckImageForId(item.id);
              return (
                <div key={item.id} id={item.kind === "class" ? item.id : undefined} className="scroll-mt-28 h-full">
                  <ImageContentCard
                    imageSrc={img.src}
                    imageAlt={img.alt}
                    title={item.title}
                    tagline={item.tagline}
                    description={item.description}
                    darkImageBg
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Materials  -  6 cards, 3×2 */}
      <section id="materials" className="section-padding bg-surface scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">Materials we move</h2>
            <p className="text-lg text-muted-foreground">
              Bulk, metals, chemicals, packaged cargo, and harvest freight. The truck class follows the material.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {materialTypes.map((material) => {
              const img = materialImageForId(material.id);
              return (
                <ImageContentCard
                  key={material.id}
                  imageSrc={img.src}
                  imageAlt={img.alt}
                  title={material.title}
                  description={material.description}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Service detail  -  alternating rows (not a card grid) */}
      <section id="transportation" className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">How we package the work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">FTL, contract fleet, return-load planning, and TranZfort when you need more trucks.</p>
          </div>
          <div className="space-y-20">
            {detailedServices.map((service, index) => (
              <div key={service.id} id={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-28 ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="w-14 h-14 rounded bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4 text-navy">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="text-accent mt-0.5 shrink-0" size={16} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-block px-4 py-2 bg-muted rounded text-sm font-semibold text-primary">{service.highlight}</span>
                </div>
                <Card
                  className={`border border-border bg-white shadow-sm ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
                >
                  <CardContent className="p-8">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Every program includes</p>
                    {["Registered ZAFTYS contracts", "Own fleet plus TranZfort marketplace", "TMS tracking on active lanes"].map((line, i) => (
                      <div key={i} className="flex gap-3 mb-3 last:mb-0">
                        <CheckCircle2 className="text-primary shrink-0" size={18} />
                        <span className="text-sm">{line}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="operations" className="section-padding bg-surface scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-4 text-navy">See the trip in ZAFTYS TMS</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Dispatch, GPS, and e-POD on contracted work. Full product detail lives on the TMS page.
              </p>
              <Link to="/login">
                <Button variant="accent">See ZAFTYS TMS <ArrowRight className="ml-2" size={16} /></Button>
              </Link>
            </div>
            <div className="w-full">
              <LazyTmsScreensCarousel />
            </div>
          </div>
        </div>
      </section>

      <section id="tranzfort" className="section-padding bg-navy text-white scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-4">Need a truck we do not have today?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Post on TranZfort. Listing and search are free. We charge a broker fee to truckers on booked loads. Matching is AI-powered.
              </p>
              <CTAGroup>
                <Button asChild size="lg" variant="accent">
                  <a
                    href={externalLinks.tranzfort}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("cta_tranzfort", { placement: "services" })}
                  >
                    Download TranZfort
                  </a>
                </Button>
                <Link to="/tranzfort-network">
                  <Button size="lg" variant="on-dark-outline">How matching works</Button>
                </Link>
              </CTAGroup>
            </div>
            <div className="min-w-0">
              <LazyTranZfortScreensCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta-band text-center">
        <div className="container mx-auto container-padding">
          <h2 className="text-4xl font-heading font-bold mb-6">Need a truck for this corridor?</h2>
          <p className="text-xl mb-10 text-gray-200 max-w-2xl mx-auto">WhatsApp the origin, destination, and vehicle class. We quote company fleet first.</p>
          <CTAGroup>
            <WhatsAppButton label="Get a Quote on WhatsApp" />
            <Link to="/tranzfort-network">
              <Button size="lg" variant="on-dark-outline">Open TranZfort</Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default Services;
