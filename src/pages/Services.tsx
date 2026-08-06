import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Mountain, Factory, Route, Building, Network, ArrowRight, CheckCircle2, MapPin, BarChart3, Clock, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import ImageContentCard from "@/components/ImageContentCard";
import ResponsiveImage from "@/components/ResponsiveImage";
import { AppDemoFrame, MatchFlowDemo, DemoDisclaimer } from "@/components/tranzfort-demo";
import { externalLinks, truckTypes, materialTypes, tsmCapabilities } from "@/lib/constants";
import { pageSeo } from "@/lib/page-seo";
import { TransportationExplorer } from "@/components/TransportationExplorer";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { PageHero } from "@/components/PageHero";
import { pageHeroImages } from "@/lib/page-heroes";
import { truckingServiceSchema, organizationSchema } from "@/lib/schema";
import { truckImageForId, materialImageForId, pillarImages } from "@/lib/services-images";

const Services = () => {
  const detailedServices = [
    {
      id: "ftl",
      icon: Truck,
      title: "Full Truckload (FTL) Transport",
      description: "Dedicated trucks for large-volume heavy shipments with nationwide corridor coverage and TMS™ tracking.",
      features: ["Heavy-haul multi-axle vehicles", "Pan-India industrial corridors", "Real-time TMS™ tracking", "Dedicated fleet assignment"],
      highlight: "Dispatch discipline built over decades",
    },
    {
      id: "mining",
      icon: Mountain,
      title: "Mining & Raw Material Logistics",
      description: "Heavy-haul expertise for ores, aggregates, and raw materials with certified safety protocols.",
      features: ["Reinforced heavy-duty tippers", "DGMS safety compliance", "Rugged terrain expertise", "24/7 site operations"],
      highlight: "Built for mines, plants, and industrial sites",
    },
    {
      id: "contract",
      icon: Factory,
      title: "Industrial Contract Logistics",
      description: "Long-term dedicated support for direct suppliers and transporters with customized fleet programs.",
      features: ["Customized fleet solutions", "Predictive scheduling", "Performance SLAs", "Dedicated account management"],
      highlight: "Reliable capacity on repeat corridors",
    },
    {
      id: "optimization",
      icon: Route,
      title: "Smart Route & Load Optimization",
      description: "Intelligent route planning and load balancing to cut empty miles on your active lanes.",
      features: ["Corridor-based routing", "Return-load optimization", "Fuel efficiency monitoring", "Dynamic load balancing"],
      highlight: "Cut empty miles on industrial lanes",
    },
    {
      id: "enterprise",
      icon: Building,
      title: "Enterprise Client Services",
      description: "Holistic partnerships for large transporters with visibility, SLAs, and scalable capacity.",
      features: ["Client tracking portal", "Dedicated support", "TranZfort overflow capacity", "Structured documentation"],
      highlight: "Trusted by leading industrial shippers",
    },
    {
      id: "overflow",
      icon: Network,
      title: "TranZfort Network Overflow",
      description: "When our fleet is at capacity, verified partners on TranZfort fulfil loads  -  all coordinated through ZAFTYS.",
      features: ["Verified operator network", "Structured load matching", "Same ZAFTYS accountability", "TMS™ visibility on every trip"],
      highlight: "Scale without losing control",
    },
  ];

  const tsmIcons = [MapPin, Clock, BarChart3, FileText, Truck, Shield];

  const schema = [truckingServiceSchema, organizationSchema];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.services.title}
        description={pageSeo.services.description}
        canonical="/services"
        schema={schema}
      />

      <PageHero
        badge="Industrial Trucking"
        title="FTL, Contract & Heavy-Haul Logistics Across India."
        description="Transport programs for industrial cargo, plant windows, and compliance needs  -  company fleet, TranZfort overflow, and live ZAFTYS TMS visibility on every lane."
        imageSrc={pageHeroImages.services.src}
        imageAlt={pageHeroImages.services.alt}
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
      <section id="transportation-explorer" className="section-padding bg-muted/30 scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-navy">Match The Right Asset To Your Cargo</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Pick a truck type or material to see typical pairings  -  the same discipline we use before every industrial dispatch.
            </p>
          </div>
          <TransportationExplorer />
        </div>
      </section>

      {/* Truck types  -  6 cards, 3×2 */}
      <section id="trucks" className="section-padding bg-white scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">Truck Types We Deploy</h2>
            <p className="text-lg text-muted-foreground">
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
        </div>
      </section>

      {/* Materials  -  6 cards, 3×2 */}
      <section id="materials" className="section-padding bg-muted/30 scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">Materials We Move</h2>
            <p className="text-lg text-muted-foreground">
              Industrial commodities across mining, construction, metals, energy, FMCG, and agriculture on corridors across India.
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
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">Curated Service Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">How ZAFTYS packages capacity for direct suppliers and transporters.</p>
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
                <Card className={`border-none shadow-lg bg-muted/20 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <CardContent className="p-8">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Every program includes</p>
                    {["Registered ZAFTYS contracts", "Own fleet + TranZfort overflow", "TMS™ tracking on active lanes"].map((line, i) => (
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

      {/* TMS  -  6 cards, 3×2 */}
      <section id="operations" className="section-padding bg-muted/30 scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-4 text-navy">ZAFTYS TMS™ Operations</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The dispatch and visibility layer behind every move  -  live at app.zaftys.com for our fleet and for shippers and operators who want the same discipline.
              </p>
            </div>
            <ResponsiveImage
              src={pillarImages.operations.src}
              alt={pillarImages.operations.alt}
              aspectRatio="2/1"
              objectFit="contain"
              className="rounded-xl shadow-xl"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tsmCapabilities.map((item, index) => {
              const Icon = tsmIcons[index] ?? MapPin;
              return (
                <Card key={index} className="border-none shadow-sm bg-white">
                  <CardContent className="p-6">
                    <Icon className="text-primary mb-3" size={24} />
                    <h3 className="font-heading font-bold text-navy mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/technology">
              <Button variant="accent">See Full Platform <ArrowRight className="ml-2" size={16} /></Button>
            </Link>
            <Link to="/blog/planning-industrial-shipments" className="text-primary font-semibold hover:underline text-sm">
              Read more: planning industrial shipments
            </Link>
          </div>
        </div>
      </section>

      {/* TranZfort  -  interactive flow */}
      <section id="tranzfort" className="section-padding bg-navy text-white scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-4">TranZfort Capacity Layer</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                When our fleet is full, TranZfort connects verified transport partners to industrial loads  -  all fulfilled through ZAFTYS coordination and accountability.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { step: "1", title: "Post the load", desc: "Capacity published on TranZfort when needed." },
                  { step: "2", title: "Truckers book", desc: "Verified operators on matched corridors." },
                  { step: "3", title: "ZAFTYS delivers", desc: "Every trip through ZAFTYS accountability." },
                ].map((item) => (
                  <div key={item.step} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-accent font-bold text-sm mb-1">Step {item.step}</div>
                    <h3 className="font-heading font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <AppDemoFrame
              variant="panel"
              title="Booking flow"
              screen="app"
              className="max-w-md mx-auto lg:ml-auto min-h-[280px] sm:min-h-[340px] md:min-h-[380px]"
            >
              <MatchFlowDemo theme="app" />
            </AppDemoFrame>
            <DemoDisclaimer variant="on-dark" className="mt-3 max-w-md mx-auto lg:ml-auto" />
          </div>
          <CTAGroup>
            <Button asChild size="lg" variant="accent">
              <a href={externalLinks.tranzfort} target="_blank" rel="noopener noreferrer">Explore TranZfort</a>
            </Button>
            <Link to="/network">
              <Button size="lg" variant="on-dark-outline">Network Page</Button>
            </Link>
            <Link to="/technology">
              <Button size="lg" variant="on-dark-outline">ZAFTYS TMS</Button>
            </Link>
          </CTAGroup>
          <p className="mt-6 text-sm text-gray-400">
            Also see{" "}
            <Link to="/partner" className="text-accent hover:underline font-semibold">
              partner program
            </Link>
            {" · "}
            <Link to="/blog/planning-industrial-shipments" className="text-accent hover:underline font-semibold">
              shipment planning guide
            </Link>
            {" · "}
            <Link to="/blog/reduce-empty-return-trips" className="text-accent hover:underline font-semibold">
              empty miles guide
            </Link>
          </p>
        </div>
      </section>

      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto container-padding">
          <h2 className="text-4xl font-heading font-bold mb-6">Ready to Move Your Freight?</h2>
          <p className="text-xl mb-10 text-gray-200 max-w-2xl mx-auto">Get a quote on WhatsApp  -  tell us your corridor, load type, and volume.</p>
          <CTAGroup>
            <WhatsAppButton label="Get a Quote on WhatsApp" />
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default Services;
