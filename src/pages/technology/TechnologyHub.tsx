import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, MapPin, Truck, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { paths } from "@/lib/site-paths";
import { pageSeo } from "@/lib/page-seo";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import heroTechnology from "@/assets/hero-technology.jpg";

const techCards = [
  {
    icon: BarChart3,
    title: "ZAFTYS TMS",
    description: "Plan, dispatch, track, and close out transportation from one operational system.",
    link: paths.technology.tms,
  },
  {
    icon: Truck,
    title: "Fleet Management",
    description: "Vehicle registry, drivers, documents, and maintenance in the same TMS stack.",
    link: paths.technology.fleetManagement,
  },
  {
    icon: MapPin,
    title: "Tracking & Visibility",
    description: "Live GPS, shipper portal, and digital e-POD on contracted trips.",
    link: paths.technology.tracking,
  },
  {
    icon: Code,
    title: "Logistics APIs",
    description: "Connect trip and fleet data with ERP and operational systems.",
    link: paths.technology.apis,
  },
];

const workflowSteps = [
  "Order",
  "Load planning",
  "Capacity sourcing",
  "Vehicle allocation",
  "Dispatch",
  "Tracking",
  "Delivery",
  "POD",
  "Billing",
  "Analytics",
];

const TechnologyHub = () => (
  <div className="min-h-screen bg-background font-sans">
    <SEO
      title={pageSeo.technologyHub.title}
      description={pageSeo.technologyHub.description}
      canonical={paths.technology.hub}
      schema={[
        organizationSchema,
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Technology", path: paths.technology.hub },
        ]),
      ]}
    />
    <PageHero
      badge={pageHeroCopy.technologyHub.badge}
      title={pageHeroCopy.technologyHub.h1}
      description={pageHeroCopy.technologyHub.lead}
      imageSrc={heroTechnology}
      imageAlt="ZAFTYS transportation technology"
    >
      <CTAGroup className="justify-start sm:justify-start">
        <HeroEmailButton
          label="Book a TMS Demo"
          subject="ZAFTYS TMS demo request"
          body="Hi ZAFTYS,\n\nI'd like to book a demo of ZAFTYS TMS.\n\nCompany:\nRole:\n\n"
        />
        <Link to={paths.technology.tms}>
          <Button size="lg" variant="on-dark-outline">See ZAFTYS TMS</Button>
        </Link>
      </CTAGroup>
    </PageHero>

    <section className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl font-heading font-bold mb-4 text-primary">One connected workflow</h2>
          <p className="text-lg text-muted-foreground">
            From freight requirement to final delivery and analysis. Technology we dispatch on every day.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {workflowSteps.map((step, i) => (
            <span key={step} className="inline-flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">{step}</span>
              {i < workflowSteps.length - 1 ? <ArrowRight size={14} className="text-muted-foreground hidden sm:block" /> : null}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techCards.map((card, index) => (
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

    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto container-padding text-center">
        <h2 className="text-3xl font-heading font-bold mb-6">The TMS we dispatch on every day</h2>
        <CTAGroup>
          <Link to={paths.technology.tms}>
            <Button variant="accent">Explore ZAFTYS TMS</Button>
          </Link>
          <Link to={paths.login}>
            <Button variant="on-dark-outline">Login at app.zaftys.com</Button>
          </Link>
        </CTAGroup>
      </div>
    </section>
  </div>
);

export default TechnologyHub;
