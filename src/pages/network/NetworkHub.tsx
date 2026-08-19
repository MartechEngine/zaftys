import { Link } from "react-router-dom";
import { ArrowRight, Network, Users, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import { CTAGroup } from "@/components/CTAGroup";
import { paths } from "@/lib/site-paths";
import { pageSeo } from "@/lib/page-seo";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import heroNetwork from "@/assets/hero-network.jpg";

const networkCards = [
  {
    icon: Network,
    title: "Tranzfort",
    description: "Digital freight network connecting freight demand with transportation capacity.",
    link: paths.network.tranzfort,
  },
  {
    icon: Users,
    title: "Transporter Network",
    description: "Verified carriers and third-party truck capacity with onboarding checks.",
    link: paths.network.transporterNetwork,
  },
  {
    icon: Truck,
    title: "Truck Capacity",
    description: "Source owned or partner capacity through one ZAFTYS relationship.",
    link: paths.network.truckCapacity,
  },
];

const NetworkHub = () => (
  <div className="min-h-screen bg-background font-sans">
    <SEO
      title={pageSeo.networkHub.title}
      description={pageSeo.networkHub.description}
      canonical={paths.network.hub}
      schema={[
        organizationSchema,
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Network", path: paths.network.hub },
        ]),
      ]}
    />
    <PageHero
      badge={pageHeroCopy.networkHub.badge}
      title={pageHeroCopy.networkHub.h1}
      description={pageHeroCopy.networkHub.lead}
      imageSrc={heroNetwork}
      imageAlt="ZAFTYS transportation network"
    >
      <CTAGroup className="justify-start sm:justify-start">
        <Link to={paths.network.tranzfort}>
          <Button size="lg" variant="accent">Explore Tranzfort <ArrowRight className="ml-2" size={20} /></Button>
        </Link>
        <Link to={paths.partner}>
          <Button size="lg" variant="on-dark-outline">Become a Partner</Button>
        </Link>
      </CTAGroup>
    </PageHero>

    <section className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl font-heading font-bold mb-4 text-primary">ZAFTYS operates. Tranzfort connects.</h2>
          <p className="text-lg text-muted-foreground">
            ZAFTYS operates transportation. Tranzfort connects the broader transportation network.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {networkCards.map((card, index) => (
            <ServiceCard
              key={card.link}
              icon={card.icon}
              title={card.title}
              description={card.description}
              link={card.link}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-navy text-white">
      <div className="container mx-auto container-padding text-center">
        <h2 className="text-3xl font-heading font-bold mb-6">Need more capacity on your lane?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Combine owned fleet with verified partner capacity. Same desk, same GST billing on contracted trips.
        </p>
        <CTAGroup>
          <Link to={paths.network.truckCapacity}>
            <Button variant="accent">Source Truck Capacity</Button>
          </Link>
          <Link to={paths.logistics.hub}>
            <Button variant="on-dark-outline">View Logistics Services</Button>
          </Link>
        </CTAGroup>
      </div>
    </section>
  </div>
);

export default NetworkHub;
