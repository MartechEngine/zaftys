import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  BarChart3,
  Clock,
  Shield,
  FileText,
  Smartphone,
  Truck,
  Users,
  ArrowRight,
} from "lucide-react";
import { CTAGroup } from "@/components/CTAGroup";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { pageHeroImages } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { externalLinks } from "@/lib/constants";
import { pageSeo } from "@/lib/page-seo";
import { softwareApplicationSchema, organizationSchema } from "@/lib/schema";

const Technology = () => {
  const features = [
    {
      icon: MapPin,
      title: "Real-Time GPS Tracking",
      description: "Live location updates, dynamic ETAs, and route deviation alerts on an interactive map.",
    },
    {
      icon: Clock,
      title: "Dispatch & Trip Management",
      description: "Create, assign, and monitor trips with automated status updates across your operation.",
    },
    {
      icon: Smartphone,
      title: "Driver Mobile App",
      description: "Drivers receive routes, load details, and upload digital proof of delivery (ePOD) instantly.",
    },
    {
      icon: Truck,
      title: "Fleet Management",
      description: "Vehicle registry, driver records, document expiry alerts, and maintenance scheduling.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Lane costs, utilization, delay analysis, and operational reporting for smarter decisions.",
    },
    {
      icon: FileText,
      title: "Digital Documentation",
      description: "Secure storage for compliance docs, invoices, LR copies, and bills of lading.",
    },
  ];

  const buyerPaths = [
    {
      icon: Users,
      title: "For Shippers & Transporters",
      description: "Outsource freight with full visibility  -  track every shipment through the client portal in real time.",
      bullets: ["Live shipment tracking", "ePOD and document access", "Lane performance reports"],
    },
    {
      icon: Truck,
      title: "For Fleet Operators",
      description: "Run dispatch, fleet, and billing on one platform  -  the same tools ZAFTYS uses internally.",
      bullets: ["Dispatch dashboard", "Driver & vehicle management", "Trip lifecycle & billing"],
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.technology.title}
        description={pageSeo.technology.description}
        canonical="/technology"
        schema={[softwareApplicationSchema, organizationSchema]}
      />

      <PageHero
        badge="ZAFTYS TSM™"
        title="Operations Become Easier When Everyone Sees The Same Information."
        description="ZAFTYS TSM brings dispatch, fleet, driver, documentation, and customer visibility into one connected operational environment  -  built to run our fleet and offered to businesses that want the same discipline."
        imageSrc={pageHeroImages.technology.src}
        imageAlt={pageHeroImages.technology.alt}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label="Request a Demo"
            subject={heroMailSubjects.demo}
            body={heroMailBodies.demo}
          />
          <Button asChild size="lg" variant="on-dark-outline">
            <a href={externalLinks.app} target="_blank" rel="noopener noreferrer">
              Login to Portal
            </a>
          </Button>
        </CTAGroup>
      </PageHero>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-heading font-bold mb-6 text-navy">The Operational Backbone Behind Every Shipment.</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                ZAFTYS TSM connects planning, dispatch, fleet records, driver activity, documentation, and customer visibility throughout the shipment lifecycle  -  not a slide-deck product, but the platform that runs our dispatch floor every day.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We built it because generic tools could not handle heavy freight reality: multi-axle assets, plant windows, weighbridge loops, and scaling via TranZfort when our fleet is full.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Full visibility" },
                  { icon: Clock, label: "24/7 dispatch" },
                  { icon: FileText, label: "Digital ePOD" },
                  { icon: BarChart3, label: "Lane analytics" },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border flex items-center gap-3">
                    <item.icon className="text-primary shrink-0" size={22} />
                    <span className="font-semibold text-navy text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-border bg-navy aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-br from-navy to-primary/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="mx-auto text-accent mb-4 opacity-80" size={64} />
                    <p className="text-white font-heading text-2xl tracking-widest opacity-80">TSM™ DASHBOARD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">Platform Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage heavy freight operations, in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-lg transition-all group bg-white">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3 text-navy">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">Who It's For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {buyerPaths.map((path, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-10">
                  <path.icon className="text-primary mb-4" size={36} />
                  <h3 className="text-2xl font-heading font-bold text-navy mb-3">{path.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{path.description}</p>
                  <ul className="space-y-2">
                    {path.bullets.map((bullet, i) => (
                      <li key={i} className="text-sm text-foreground flex items-center gap-2">
                        <ArrowRight className="text-accent shrink-0" size={14} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]" />
        <div className="container mx-auto container-padding relative z-10 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">See TSM in Action</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Request a demo or log in to the client and team portal.
          </p>
          <CTAGroup>
            <Link to="/contact">
              <Button size="lg" variant="accent">Book a Demo</Button>
            </Link>
            <Button asChild size="lg" variant="on-dark-outline">
              <a href={externalLinks.app} target="_blank" rel="noopener noreferrer">
                Login to app.zaftys.com
              </a>
            </Button>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default Technology;
