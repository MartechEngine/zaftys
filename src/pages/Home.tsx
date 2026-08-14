import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Truck,
  BarChart3,
  Shield,
  Network,
} from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";
import ResponsiveImage from "@/components/ResponsiveImage";
import { LazyTranZfortScreensCarousel } from "@/components/LazyTranZfortScreensCarousel";
import SEO from "@/components/SEO";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import { externalLinks, homeProducts, homeIndustries, vehicleClasses, homeTrustStrip, whatsappUrl } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { pageSeo } from "@/lib/page-seo";
import { logisticsServiceSchema, organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/schema";
import { LazyTmsTripPeek, TmsDemoDisclaimer } from "@/components/tms-demo";
import { LazyHomeReportsTeasers } from "@/components/LazyHomeReportsTeasers";
import { LazyHomeBlogTeasers } from "@/components/LazyHomeBlogTeasers";
import type { LucideIcon } from "lucide-react";

const productIcons: Record<string, LucideIcon> = {
  transport: Truck,
  tms: BarChart3,
  marketplace: Network,
};

const classIcons: Record<string, LucideIcon> = {
  lcv: Truck,
  heavy: Truck,
  container: Truck,
  tanker: Truck,
  bulker: Truck,
  contract: Shield,
};

const Home = () => {
  const schema = [organizationSchema, websiteSchema, localBusinessSchema, logisticsServiceSchema];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SEO
        title={pageSeo.home.title}
        description={pageSeo.home.description}
        canonical="/"
        schema={schema}
      />

      <section className="relative pt-32 pb-24 overflow-hidden min-h-[700px] flex items-center">
        <div className="absolute inset-0">
          <picture>
            <source
              type="image/webp"
              srcSet="/images/lcp/hero-home-640.webp 640w, /images/lcp/hero-home-960.webp 960w, /images/lcp/hero-home-1280.webp 1280w, /images/lcp/hero-home-1920.webp 1920w"
              sizes="(max-width: 768px) 100vw, 1280px"
            />
            <img
              src="/images/lcp/hero-home-960.jpg"
              alt="ZAFTYS commercial trucks for freight transport across India"
              className="w-full h-full object-cover"
              width={1280}
              height={720}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        </div>
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-4xl text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 animate-fade-in-up leading-tight">
              Hire the truck.
              <br />
              Run the TMS.
              <br />
              Post a load for free.
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light animate-fade-in-up max-w-2xl" style={{ animationDelay: "0.2s" }}>
              Company trucks from LCV through ODC. A live TMS for dispatch and e-POD. Listing and search on TranZfort are free.
            </p>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <CTAGroup className="justify-start sm:justify-start">
                <Button asChild size="lg" variant="accent" className="uppercase tracking-wide shadow-lg shadow-accent/20">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("cta_whatsapp", { placement: "hero", intent: "quote" })}
                  >
                    Get a freight quote <ArrowRight className="ml-2" size={20} />
                  </a>
                </Button>
                <Link to="/zaftys-tms">
                  <Button size="lg" variant="on-dark-outline">
                    See ZAFTYS TMS
                  </Button>
                </Link>
                <Link to="/tranzfort-network">
                  <Button size="lg" variant="on-dark-outline">
                    Open TranZfort
                  </Button>
                </Link>
              </CTAGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-border relative -mt-10 mx-5 sm:mx-8 lg:mx-12 xl:mx-16 rounded-xl shadow-xl z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 container-padding">
          {homeTrustStrip.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-heading font-bold text-primary mb-1">{item.label}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{item.sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-4 text-primary">Three products. One GST-compliant company.</h2>
            <p className="text-lg text-muted-foreground">
              Hire us for the truck, log into the TMS we dispatch on, or post a load on TranZfort.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeProducts.map((product, index) => (
              <ServiceCard
                key={product.id}
                icon={productIcons[product.id] ?? Truck}
                title={product.title}
                description={product.description}
                link={product.link}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-4 text-primary">The right truck for the cargo</h2>
            <p className="text-lg text-muted-foreground">
              LCV, heavy load, container, tanker, and bulker, plus contract fleet. The full TranZfort type list, including trailer, tipper, reefer, parcel, and ODC, is on Fleet.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleClasses.map((item, index) => (
              <ServiceCard
                key={item.id}
                icon={classIcons[item.id] ?? Truck}
                title={item.title}
                description={item.description}
                link={item.link}
                delay={index * 0.05}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                View transport services <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy text-white relative overflow-hidden">
        <div className="container mx-auto container-padding relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-block px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-semibold mb-6 uppercase tracking-widest">
                Marketplace · live
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">TranZfort is our freight marketplace.</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Shippers post loads. Truckers book them. Matching is AI-powered. Listing and search are free. We charge a broker fee to truckers on booked loads. Trips contracted through ZAFTYS are billed with GST.
              </p>
              <CTAGroup>
                <Button asChild variant="accent">
                  <a
                    href={externalLinks.tranzfort}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("cta_tranzfort", { placement: "home" })}
                  >
                    Download TranZfort
                  </a>
                </Button>
                <Link to="/tranzfort-network">
                  <Button variant="on-dark-outline">How matching works</Button>
                </Link>
              </CTAGroup>
            </div>
            <div className="lg:w-1/2 order-first lg:order-none">
              <LazyTranZfortScreensCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1 w-full">
              <LazyTmsTripPeek density="compact" className="min-h-[280px] rounded-xl shadow-2xl" />
              <TmsDemoDisclaimer className="mt-3" />
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
                ZAFTYS TMS™
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-navy leading-tight">
                A transport management system we actually dispatch on.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                ZAFTYS TMS is live at app.zaftys.com: dispatch, GPS, e-POD, fleet records, and a shipper portal. Built next to real gates, not only a map pin.
              </p>
              <CTAGroup>
                <Link to="/zaftys-tms">
                  <Button variant="accent">See ZAFTYS TMS</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Request a demo
                  </Button>
                </Link>
              </CTAGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-primary">Industries we haul for</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Different cargo, different truck. Same three products: transport, TMS, and TranZfort.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeIndustries.map((industry) => (
              <Link key={industry.slug} to={`/industries/${industry.slug}`}>
                <Card className="overflow-hidden hover:border-primary/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white h-full border-none shadow-md group flex flex-col">
                  <ResponsiveImage
                    src={industry.image}
                    alt={`${industry.name} transport by ZAFTYS Logistics`}
                    aspectRatio="2/1"
                    objectFit="cover"
                    imgClassName="object-center"
                  />
                  <CardContent className="p-5">
                    <p className="font-heading font-bold text-navy group-hover:text-primary transition-colors">{industry.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            <Link to="/industries" className="text-primary font-semibold hover:underline">
              View all industries
            </Link>
            {" · "}
            <Link to="/services" className="text-primary font-semibold hover:underline">
              Transport services
            </Link>
            {" · "}
            <Link to="/partner" className="text-primary font-semibold hover:underline">
              Partner
            </Link>
            {" · "}
            <Link to="/contact" className="text-primary font-semibold hover:underline">
              Contact
            </Link>
          </p>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-navy">Built on corridor work, then the software.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                ZAFTYS is based in Amravati. Family lanes, then GST-compliant billing, then TMS and TranZfort. We still move cement and steel. We also move distribution freight, tanker cargo, and container loads, and we sell the system we use.
              </p>
              <Link to="/about">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Our Story <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
            <ResponsiveImage
              src="/images/marketing/logistics-experience.jpg"
              alt="ZAFTYS dispatch yard and commercial freight operations"
              aspectRatio="16/10"
              objectFit="cover"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>

      <LazyHomeReportsTeasers />

      <LazyHomeBlogTeasers />

      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="container mx-auto container-padding text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Start with a quote, a demo, or the marketplace.</h2>
          <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            WhatsApp for freight. A walkthrough for ZAFTYS TMS. TranZfort to post or find a load.
          </p>
          <CTAGroup>
            <WhatsAppButton label="Chat on WhatsApp" />
            <Link to="/zaftys-tms">
              <Button size="lg" variant="on-dark-outline">See ZAFTYS TMS</Button>
            </Link>
            <Link to="/tranzfort-network">
              <Button size="lg" variant="on-dark-outline">Open TranZfort</Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default Home;
