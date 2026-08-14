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
import { externalLinks } from "@/lib/constants";
import { pageSeo } from "@/lib/page-seo";
import { LazyTmsTripPeek, TmsDemoDisclaimer } from "@/components/tms-demo";
import "@/styles/tms-demo.css";
import {
  softwareApplicationSchema,
  organizationSchema,
  websiteSchema,
  faqPageSchema,
} from "@/lib/schema";

const liveToday = [
  "Dispatch & trip lifecycle in production at app.zaftys.com",
  "Client portal for shipment visibility and ePOD",
  "Fleet, driver, and document records on one system",
  "Built for industrial freight  -  plant windows, multi-axle, weighbridge reality",
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
      "Industrial shippers who need shipment visibility, and fleet operators who want dispatch, fleet records, documentation, and trip reporting in one platform.",
  },
  {
    question: "How is this different from generic TMS tools?",
    answer:
      "ZAFTYS TMS is shaped by heavy-haul operations  -  multi-axle assets, plant loading windows, weighbridge loops, and scaling capacity through TranZfort when owned fleet is full.",
  },
] as const;

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
        canonical="/zaftys-tms"
        schema={[
          organizationSchema,
          websiteSchema,
          softwareApplicationSchema,
          faqPageSchema(technologyFaqs),
        ]}
      />

      <PageHero
        badge="ZAFTYS TMS™ · Live"
        title="ZAFTYS Logistics TMS  -  Transport Management For Industrial Freight."
        description="ZAFTYS TMS is live  -  dispatch, fleet, driver, documentation, and customer visibility in one platform. We run it every day on our own fleet and offer the same operational discipline to shippers and operators."
        imageSrc={heroTechnology}
        imageAlt={pageHeroAlts.technology}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <Button asChild size="lg" variant="accent">
            <a href={externalLinks.app} target="_blank" rel="noopener noreferrer">
              Login to Portal <ArrowRight className="ml-2" size={18} />
            </a>
          </Button>
          <HeroEmailButton
            label="Request a Demo"
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
              <h2 className="text-4xl font-heading font-bold mb-6 text-navy">In Production Today</h2>
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
              <LazyTmsTripPeek density="full" className="min-h-[360px] rounded-xl shadow-2xl" />
              <TmsDemoDisclaimer className="mt-3" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">ZAFTYS TMS Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage heavy freight operations, in one place.
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
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">Who It&apos;s For</h2>
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
          <h2 className="text-4xl font-heading font-bold mb-6">Start With The Live Portal</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Log in at app.zaftys.com, or request a guided demo for your operations team.
          </p>
          <CTAGroup>
            <Button asChild size="lg" variant="accent">
              <a href={externalLinks.app} target="_blank" rel="noopener noreferrer">
                Login to app.zaftys.com
              </a>
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="on-dark-outline">Book a Demo</Button>
            </Link>
          </CTAGroup>
          <p className="mt-8 text-sm text-gray-300">
            Related:{" "}
            <Link to="/services" className="underline hover:text-white">services</Link>
            {" · "}
            <Link to="/tranzfort-network" className="underline hover:text-white">TranZfort network</Link>
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
