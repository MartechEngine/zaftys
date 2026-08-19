import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { paths } from "@/lib/site-paths";
import { pageSeo } from "@/lib/page-seo";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import heroServices from "@/assets/hero-services.jpg";
import { Truck, Factory, Route, Anchor } from "lucide-react";

const serviceCards = [
  {
    icon: Truck,
    title: "3PL Transportation",
    description: "Transportation execution combining owned vehicles, contracted capacity, and verified partners.",
    link: paths.logistics.threePl,
  },
  {
    icon: Factory,
    title: "Contract Logistics",
    description: "Dedicated transportation programs for recurring freight with SLA management.",
    link: paths.logistics.contract,
  },
  {
    icon: Route,
    title: "Dedicated Fleet",
    description: "Assigned trucks and drivers on plant, mill, or DC programs.",
    link: paths.logistics.dedicated,
  },
  {
    icon: Anchor,
    title: "Industrial Freight",
    description: "Heavy freight for steel, cement, mining, manufacturing, and project cargo.",
    link: paths.logistics.industrial,
  },
  {
    icon: Anchor,
    title: "Container Transportation",
    description: "Port-to-market, port-to-city, and factory-to-port container movements.",
    link: paths.logistics.container,
  },
  {
    icon: Truck,
    title: "Our Fleet",
    description: "Owned heavy-vehicle capacity from LCV through ODC.",
    link: paths.fleet,
  },
];

const LogisticsHub = () => (
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
      badge={pageHeroCopy.logistics.badge}
      title={pageHeroCopy.logistics.h1}
      description={pageHeroCopy.logistics.lead}
      imageSrc={heroServices}
      imageAlt="ZAFTYS logistics and transportation services"
    >
      <CTAGroup className="justify-start sm:justify-start">
        <HeroEmailButton
          label="Request Transportation"
          subject="Freight quote request"
          body="Hi ZAFTYS,\n\nI'd like to request transportation capacity.\n\nFrom:\nTo:\nLoad type:\nTimeline:\n\n"
        />
        <WhatsAppButton label="Chat on WhatsApp" />
        <Link to={paths.fleet}>
          <Button size="lg" variant="on-dark-outline">Our Fleet</Button>
        </Link>
      </CTAGroup>
    </PageHero>

    <section className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl font-heading font-bold mb-4 text-primary">Transportation built around your freight</h2>
          <p className="text-lg text-muted-foreground">
            We operate real transportation. Owned fleet, contract logistics, and verified partner capacity on one desk.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((card, index) => (
            <ServiceCard
              key={card.link}
              icon={card.icon}
              title={card.title}
              description={card.description}
              link={card.link}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-muted/30">
      <div className="container mx-auto container-padding max-w-3xl text-center">
        <h2 className="text-3xl font-heading font-bold text-navy mb-6">Our fleet. Our network. Your freight.</h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          ZAFTYS combines owned heavy-vehicle capacity with verified third-party transportation partners.
          Owned fleet and partner network are always labeled clearly.
        </p>
        <CTAGroup>
          <Link to={paths.fleet}>
            <Button variant="accent">See Our Fleet <ArrowRight className="ml-2" size={18} /></Button>
          </Link>
          <Link to={paths.network.hub}>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Explore Network
            </Button>
          </Link>
        </CTAGroup>
      </div>
    </section>

    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto container-padding text-center">
        <h2 className="text-3xl font-heading font-bold mb-6">Ready to move your freight?</h2>
        <CTAGroup>
          <HeroEmailButton
            label="Request Transportation"
            subject="Freight quote request"
            body="Hi ZAFTYS,\n\nI'd like to request transportation capacity.\n\n"
          />
          <WhatsAppButton label="Chat on WhatsApp" />
        </CTAGroup>
      </div>
    </section>
  </div>
);

export default LogisticsHub;
