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
  CheckCircle2,
} from "lucide-react";
import { CTAGroup } from "@/components/CTAGroup";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import heroTechnology from "@/assets/hero-technology.jpg";
import { pageHeroAlts } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { pageSeo } from "@/lib/page-seo";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { LazyTmsScreensCarousel } from "@/components/LazyTmsScreensCarousel";
import {
  softwareApplicationSchema,
  organizationSchema,
  websiteSchema,
  faqPageSchema,
  breadcrumbSchema,
} from "@/lib/schema";

const liveToday = [
  "Dispatch and trip lifecycle in production at app.zaftys.com",
  "Client portal for shipment visibility and e-POD",
  "Fleet, driver, and document records on one system",
  "Built next to real gates: plant windows, weighbridge, multi-axle, LCV drops",
] as const;

const technologyFaqs = [
  {
    question: "Is ZAFTYS TMS a live product?",
    answer:
      "Yes. ZAFTYS TMS powers ZAFTYS dispatch operations daily and is available to shippers and fleet operators via app.zaftys.com. Request a demo if you want a guided walkthrough.",
  },
  {
    question: "Who should use ZAFTYS TMS?",
    answer:
      "Shippers who need shipment visibility, and fleet operators who want dispatch, fleet records, documentation, and trip reporting in one platform. It is not limited to heavy-haul work.",
  },
  {
    question: "How is this different from generic TMS tools?",
    answer:
      "ZAFTYS TMS is shaped by our own transport desk: plant loading windows, weighbridge loops, LCV drops, multi-axle work, and TranZfort when a trip needs a partner truck.",
  },
] as const;

const Technology = () => {
  const features = [
    {
      icon: MapPin,
      title: "Live GPS tracking",
      description: "Live location updates, dynamic ETAs, and route deviation alerts on the dispatch map.",
    },
    {
      icon: Clock,
      title: "Dispatch and trip management",
      description: "Create, assign, and monitor trips with automated status updates across your operation.",
    },
    {
      icon: Smartphone,
      title: "Driver mobile app",
      description: "Drivers receive routes, load details, and upload digital proof of delivery (ePOD) instantly.",
    },
    {
      icon: Truck,
      title: "Fleet management",
      description: "Vehicle registry, driver records, document expiry alerts, and maintenance scheduling.",
    },
    {
      icon: BarChart3,
      title: "Performance analytics",
      description: "Lane costs, utilization, delay analysis, and operational reporting for smarter decisions.",
    },
    {
      icon: FileText,
      title: "Digital documentation",
      description: "Secure storage for compliance docs, invoices, LR copies, and bills of lading.",
    },
  ];

  const buyerPaths = [
    {
      icon: Users,
      title: "For shippers",
      description: "See the load without calling the control room. Track shipments and pull e-POD from the client portal.",
      bullets: ["Live shipment tracking", "e-POD and document access", "Lane performance reports"],
    },
    {
      icon: Truck,
      title: "For fleet operators",
      description: "Run dispatch, fleet, and billing on the same stack ZAFTYS uses internally.",
      bullets: ["Dispatch dashboard", "Driver and vehicle management", "Trip lifecycle and billing"],
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.technology.title}
        description={pageSeo.technology.description}
        canonical="/zaftys-tms"
        schema={[
          organizationSchema,
          websiteSchema,
          softwareApplicationSchema,
          faqPageSchema(technologyFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "ZAFTYS TMS", path: "/zaftys-tms" },
          ]),
        ]}
      />

      <PageHero
        badge={pageHeroCopy.technology.badge}
        title={pageHeroCopy.technology.h1}
        description={pageHeroCopy.technology.lead}
        imageSrc={heroTechnology}
        imageAlt={pageHeroAlts.technology}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <Button asChild size="lg" variant="accent">
            <Link to="/login">
              Login to portal <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
          <HeroEmailButton
            label="Request a demo"
            variant="on-dark-outline"
            subject={heroMailSubjects.demo}
            body={heroMailBodies.demo}
          />
        </CTAGroup>
      </PageHero>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-heading font-bold mb-6 text-navy">In production today</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                ZAFTYS TMS is not a slide deck. It connects planning, dispatch, fleet records, driver activity, documentation, and customer visibility throughout the shipment lifecycle.
              </p>
              <ul className="space-y-3 mb-8">
                {liveToday.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <CheckCircle2 className="text-accent mt-0.5 shrink-0" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Full visibility" },
                  { icon: Clock, label: "24/7 dispatch" },
                  { icon: FileText, label: "Digital ePOD" },
                  { icon: BarChart3, label: "Lane analytics" },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-muted/30 rounded-lg border border-border flex items-center gap-3">
                    <item.icon className="text-primary shrink-0" size={22} />
                    <span className="font-semibold text-navy text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <LazyTmsScreensCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">What the TMS does</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dispatch, GPS, e-POD, fleet records, and shipper visibility. Written as the work, not a feature list.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="border-none shadow-sm hover:shadow-lg transition-all group bg-white">
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
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">Who it is for</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {buyerPaths.map((path) => (
              <Card key={path.title} className="border-none shadow-lg">
                <CardContent className="p-10">
                  <path.icon className="text-primary mb-4" size={36} />
                  <h3 className="text-2xl font-heading font-bold text-navy mb-3">{path.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{path.description}</p>
                  <ul className="space-y-2">
                    {path.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm text-foreground flex items-center gap-2">
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

      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-navy mb-8 text-center">TMS FAQs</h2>
          <div className="space-y-6">
            {technologyFaqs.map((faq) => (
              <div key={faq.question} className="p-6 rounded-xl bg-white border border-border">
                <h3 className="font-heading font-bold text-navy mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]" />
        <div className="container mx-auto container-padding relative z-10 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">Start with the live portal</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Log in at app.zaftys.com, or request a guided demo for your operations team.
          </p>
          <CTAGroup>
            <Button asChild size="lg" variant="accent">
              <Link to="/login">Login to portal</Link>
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="on-dark-outline">Book a demo</Button>
            </Link>
          </CTAGroup>
          <p className="mt-8 text-sm text-gray-300">
            Related:{" "}
            <Link to="/services" className="underline hover:text-white">services</Link>
            {" · "}
            <Link to="/tranzfort-network" className="underline hover:text-white">TranZfort</Link>
            {" · "}
            <Link to="/fleet" className="underline hover:text-white">company fleet</Link>
            {" · "}
            <Link to="/industries" className="underline hover:text-white">industries</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Technology;
