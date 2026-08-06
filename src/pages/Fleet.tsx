import { Button } from "@/components/ui/button";
import { MapPin, Gauge, Shield, Wrench, Leaf, Radio, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { pageHeroImages } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import ImageContentCard from "@/components/ImageContentCard";
import { truckTypes } from "@/lib/constants";
import { pageSeo } from "@/lib/page-seo";
import { truckImageForId } from "@/lib/services-images";

const Fleet = () => {
  const features = [
    { icon: MapPin, title: "Operational visibility", desc: "Shipment progress connected through ZAFTYS TMS on active lanes." },
    { icon: Gauge, title: "Fleet readiness", desc: "Structured inspections and dispatch planning before every journey." },
    { icon: Wrench, title: "Preventive maintenance", desc: "Planned maintenance to support availability and continuity." },
    { icon: Shield, title: "Safety discipline", desc: "Standardized procedures across planning, loading, transit, and delivery." },
    { icon: Leaf, title: "Efficient planning", desc: "Better routing and utilization to reduce unnecessary empty miles." },
    { icon: Radio, title: "TMS™ connected", desc: "Vehicles integrated with dispatch, documentation, and client visibility." },
  ];

  const fleetHighlights = [
    { title: "Company operated fleet", desc: "Owned assets on key industrial corridors with standardized operating procedures." },
    { title: "Verified partner network", desc: "TranZfort capacity when demand exceeds owned fleet  -  still through ZAFTYS." },
    { title: "Industrial ready assets", desc: "Configurations matched to bulk, heavy-haul, and scheduled industrial freight." },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.fleet.title}
        description={pageSeo.fleet.description}
        canonical="/fleet"
      />

      <PageHero
        badge="Fleet & Capacity"
        title="Company Fleet For Heavy-Haul Industrial Freight."
        description="Company-operated tippers, flatbeds, and multi-axle assets on industrial corridors across India  -  with TranZfort surge capacity and ZAFTYS TMS visibility when your lanes need to scale."
        imageSrc={pageHeroImages.fleet.src}
        imageAlt={pageHeroImages.fleet.alt}
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
        <div className="container mx-auto container-padding max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-heading font-bold mb-4 text-navy">More Than Vehicles</h2>
          <p className="text-muted-foreground leading-relaxed">
            Owning trucks does not automatically create dependable logistics. Professional transport requires disciplined planning, standardized procedures, experienced people, and continuous improvement  -  every shipment follows the same operational standard.
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
          <h2 className="text-4xl font-heading font-bold mb-4 text-navy">The Right Truck for the Job</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Body type, payload, and material must align before dispatch  -  the same discipline on every industrial lane.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {truckTypes.map((truck) => {
            const img = truckImageForId(truck.id);
            return (
              <ImageContentCard
                key={truck.id}
                imageSrc={img.src}
                imageAlt={img.alt}
                title={truck.title}
                tagline={truck.tagline}
                description={truck.description}
                darkImageBg
              />
            );
          })}
        </div>
      </section>

      <section className="section-padding bg-navy text-white">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Operational Capability</h2>
              <p className="text-gray-400 text-sm max-w-xl">Fleet size matters. Operational capability matters more.</p>
            </div>
            <Link to="/technology">
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
          <h2 className="text-3xl font-heading font-bold mb-4 text-navy">Ready When Your Business Grows</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            When demand exceeds our own fleet, ZAFTYS expands through the verified TranZfort network  -  one relationship, one communication channel, one operational standard.
          </p>
          <Link to="/network">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              About the Network <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto container-padding">
          <h2 className="text-4xl font-heading font-bold mb-6">Need Reliable Fleet Capacity?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light">
            Recurring industrial transport, dedicated programs, or surge capacity  -  our team will recommend the right fleet strategy for your business.
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
