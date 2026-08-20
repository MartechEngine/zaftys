import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Gauge, Shield, Wrench, Leaf, Radio, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import heroFleet from "@/assets/hero-fleet.jpg";
import { pageHeroAlts } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import ResponsiveImage from "@/components/ResponsiveImage";
import { marketplaceVehicleCatalog } from "@/lib/vehicle-catalog";
import { pageSeo } from "@/lib/page-seo";
import { breadcrumbSchema } from "@/lib/schema";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { truckImageForId } from "@/lib/services-images";

const Fleet = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  const features = [
    { icon: MapPin, title: "Operational visibility", desc: "Shipment progress connected through ZAFTYS TMS on active lanes." },
    { icon: Gauge, title: "Fleet readiness", desc: "Structured inspections and dispatch planning before every journey." },
    { icon: Wrench, title: "Preventive maintenance", desc: "Planned maintenance to support availability and continuity." },
    { icon: Shield, title: "Safety discipline", desc: "Standardized procedures across planning, loading, transit, and delivery." },
    { icon: Leaf, title: "Efficient planning", desc: "Better routing and utilization to reduce unnecessary empty miles." },
    { icon: Radio, title: "TMS™ connected", desc: "Vehicles integrated with dispatch, documentation, and client visibility." },
  ];

  const fleetHighlights = [
    { title: "Company operated fleet", desc: "Owned assets on commercial corridors with standardized operating procedures." },
    { title: "Verified marketplace", desc: "TranZfort when you need more trucks than we have that day. Still billed through ZAFTYS on contracted trips." },
    { title: "Classes we run", desc: "The same commercial types as TranZfort: LCV, open truck, trailer, container, bulker, tanker, tipper, reefer, parcel, and ODC." },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.fleet.title}
        description={pageSeo.fleet.description}
        canonical="/fleet"
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Fleet", path: "/fleet" },
        ])}
      />

      <PageHero
        badge={pageHeroCopy.fleet.badge}
        title={pageHeroCopy.fleet.h1}
        description={pageHeroCopy.fleet.lead}
        imageSrc={heroFleet}
        imageAlt={pageHeroAlts.fleet}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label="Check Fleet Availability"
            subject={heroMailSubjects.fleet}
            body={heroMailBodies.fleet}
          />
          <Link to="/services">
            <Button size="lg" variant="on-dark-outline">Explore Services</Button>
          </Link>
        </CTAGroup>
      </PageHero>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4 text-navy">More than a body type</h2>
            <p className="text-muted-foreground leading-relaxed">
              Owning trucks is not the same as running a lane. Planning, loading, papers, and close-out sit with us. Every contracted trip can report through ZAFTYS TMS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {fleetHighlights.map((item, index) => (
              <div key={index} className="p-6 rounded-xl bg-muted/20 border border-border text-center">
                <h3 className="font-heading font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">Commercial types we cover</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The same categories and body styles as TranZfort post and trucker filter. Typical sizes are the bands the app shows. Contract fleet is a program, not a body type.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {marketplaceVehicleCatalog.map((item) => {
            const img = truckImageForId(item.imageId);
            return (
              <article
                id={item.id}
                key={item.id}
                className="scroll-mt-28 grid grid-cols-1 sm:grid-cols-[11rem_1fr] overflow-hidden rounded-xl border border-border bg-white shadow-md"
              >
                <div className="bg-black">
                  <ResponsiveImage
                    src={img.src}
                    alt={img.alt}
                    aspectRatio="3/2"
                    objectFit="contain"
                    className="bg-black"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold text-navy mb-3">{item.title}</h3>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {item.bodyStyles.map((style) => (
                      <li
                        key={style}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy"
                      >
                        {style}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-navy/80 mb-2">{item.typical}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy text-white">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">How we run the trucks</h2>
              <p className="text-gray-400 text-sm max-w-xl">Fleet size matters. How the lane is run matters more.</p>
            </div>
            <Link to="/zaftys-tms">
              <Button variant="on-dark-outline" className="mt-4 md:mt-0">
                Explore ZAFTYS TMS
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center">
                <feature.icon className="mx-auto text-accent mb-4" size={28} />
                <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding text-center max-w-3xl">
          <h2 className="text-3xl font-heading font-bold mb-4 text-navy">When you need more trucks</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            When a lane needs more vehicles than we have that day, post on TranZfort. Listing and search are free. We charge a broker fee to truckers on booked loads. Matching is AI-powered.
          </p>
          <Link to="/tranzfort-network">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              About TranZfort <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto container-padding">
          <h2 className="text-4xl font-heading font-bold mb-6">Need trucks on a lane?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light">
            Recurring contract work, a one-off FTL, or a TranZfort post. Tell us the corridor and the vehicle class.
          </p>
          <CTAGroup>
            <WhatsAppButton label="Request Fleet Availability" />
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default Fleet;
