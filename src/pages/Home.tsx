import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Truck,
  MapPin,
  BarChart3,
  Shield,
  Clock,
  UserCheck,
  TrendingUp,
  Network,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";
import ResponsiveImage from "@/components/ResponsiveImage";
import { TranZfortScreensCarousel } from "@/components/TranZfortScreensCarousel";
import SEO from "@/components/SEO";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import { externalLinks, homeHowItWorks, homeIndustries, coreServices, homeTrustStrip, whatsappUrl } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { pageSeo } from "@/lib/page-seo";
import { logisticsServiceSchema, organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/schema";
import { blogCategoryLabels, formatPostDate, latestPosts } from "@/lib/blog-data";
import { Badge } from "@/components/ui/badge";
import { LazyTmsTripPeek, TmsDemoDisclaimer } from "@/components/tms-demo";
import "@/styles/tms-demo.css";
import type { LucideIcon } from "lucide-react";

const serviceIcons: Record<string, LucideIcon> = {
  ftl: Truck,
  mining: MapPin,
  contract: Shield,
  optimization: TrendingUp,
  enterprise: Building,
  overflow: Network,
};

const Home = () => {
  const tsmFeatures = [
    { icon: MapPin, title: "Live GPS Tracking", desc: "Real-time location and ETA on every active shipment." },
    { icon: BarChart3, title: "Dispatch & Analytics", desc: "Trip management, lane costs, and performance reporting." },
    { icon: Clock, title: "24/7 Operations", desc: "Round-the-clock dispatch and exception handling." },
    { icon: UserCheck, title: "Fleet & Driver Mgmt", desc: "Vehicles, drivers, documents, and compliance in one place." },
    { icon: Shield, title: "Client Portal", desc: "Shippers track loads and access ePOD without calling dispatch." },
    { icon: TrendingUp, title: "Digital Docs", desc: "LR, invoices, and proof of delivery stored securely." },
  ];

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
              alt="ZAFTYS heavy-haul trucks for industrial freight transport across India"
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
              ZAFTYS Logistics  -  Industrial Freight Across India.
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light animate-fade-in-up max-w-2xl" style={{ animationDelay: "0.2s" }}>
              Company-operated transport, ZAFTYS TMS visibility, and TranZfort verified capacity  -  one partner for cement, steel, mining, and bulk freight.
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
                    Request a Quote <ArrowRight className="ml-2" size={20} />
                  </a>
                </Button>
                <Link to="/services">
                  <Button size="lg" variant="on-dark-outline">
                    Explore Services
                  </Button>
                </Link>
              </CTAGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-border relative -mt-10 mx-4 md:mx-8 lg:mx-16 rounded-xl shadow-xl z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-6 md:px-12">
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
            <h2 className="text-4xl font-heading font-bold mb-4 text-primary">One Logistics Ecosystem. Complete Operational Visibility.</h2>
            <p className="text-lg text-muted-foreground">
              Professional transport operations, intelligent transport management, and verified transport capacity  -  one trusted organization, one connected ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeHowItWorks.map((item, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all bg-muted/10">
                <CardContent className="p-8">
                  <div className="text-3xl font-heading font-bold text-accent/40 mb-4">{item.step}</div>
                  <h3 className="text-lg font-heading font-bold text-navy mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-4 text-primary">Logistics Built for Industry</h2>
            <p className="text-lg text-muted-foreground">
              Heavy loads for direct suppliers and large transporters  -  cement, steel, mining, and bulk freight.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                icon={serviceIcons[service.id] ?? Truck}
                title={service.title}
                description={service.description}
                link={service.link}
                delay={index * 0.1}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                View All Services <ArrowRight className="ml-2" size={18} />
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
                TranZfort Network
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">Expand Capacity Without Expanding Complexity.</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                When demand exceeds our fleet, ZAFTYS expands through the verified TranZfort network. You keep one logistics partner, one communication channel, and the same operational standards.
              </p>
              <CTAGroup>
                <Button asChild variant="accent">
                  <a
                    href={externalLinks.tranzfort}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("cta_tranzfort", { placement: "home" })}
                  >
                    Explore TranZfort
                  </a>
                </Button>
                <Link to="/network">
                  <Button variant="on-dark-outline">Learn About the Network</Button>
                </Link>
              </CTAGroup>
            </div>
            <div className="lg:w-1/2 order-first lg:order-none">
              <TranZfortScreensCarousel />
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
                Technology That Supports Every Shipment.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                ZAFTYS TMS connects dispatch, fleet records, documentation, and customer visibility in one operational platform  -  live for our fleet and for shippers and operators at app.zaftys.com.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {tsmFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/technology">
                <Button variant="accent">See the Platform</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-primary">Industries We Serve</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Specialized heavy-haul for India's core industrial verticals  -  cement, steel, mining, chemicals, and manufacturing corridors.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeIndustries.map((industry) => (
              <Link key={industry.slug} to={`/industries/${industry.slug}`}>
                <Card className="overflow-hidden hover:border-primary/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white h-full border-none shadow-md group flex flex-col">
                  <ResponsiveImage
                    src={industry.image}
                    alt={`${industry.name} logistics  -  ZAFTYS heavy freight India`}
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
            Also serving FMCG and retail distribution.{" "}
            <Link to="/industries" className="text-primary font-semibold hover:underline">
              View all industries
            </Link>
            {" · "}
            <Link to="/services" className="text-primary font-semibold hover:underline">
              Services
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
              <h2 className="text-3xl font-heading font-bold mb-6 text-navy">Built On Real Logistics Experience.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                ZAFTYS was created from decades of industrial freight experience across India's corridors  -  from family-operated lanes to GST-compliant operations based in Amravati, Maharashtra  -  combining own fleet, TranZfort network capacity, and ZAFTYS TMS for businesses that cannot afford delays.
              </p>
              <Link to="/about">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Our Story <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
            <ResponsiveImage
              src="/images/marketing/logistics-experience.jpg"
              alt="Industrial dispatch yard with ZAFTYS fleet and freight operations at loading bays"
              aspectRatio="16/10"
              objectFit="cover"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-heading font-bold text-navy mb-2">Latest from the Blog</h2>
              <p className="text-muted-foreground max-w-xl">
                Practical notes from industrial corridor operations  -  planning, plant windows, and TMS.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center shrink-0">
              <Link to="/blog" className="text-primary font-semibold hover:underline inline-flex items-center">
                View all posts <ArrowRight className="ml-2" size={16} />
              </Link>
              <Link
                to="/resources/reports"
                className="text-primary font-semibold hover:underline inline-flex items-center"
              >
                Market reports <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts(3).map((post) => (
              <Card key={post.slug} className="border-none shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                      {blogCategoryLabels[post.category]}
                    </Badge>
                    <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                  </div>
                  <h3 className="font-heading font-bold text-navy mb-2 leading-snug">
                    <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{post.summary}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary font-semibold text-sm"
                  >
                    Read more <ArrowRight className="ml-2" size={14} />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="container mx-auto container-padding text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to Move Freight With Greater Confidence?</h2>
          <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Tell us your corridor, load type, and volume on WhatsApp  -  our operations team will recommend the right logistics solution.
          </p>
          <CTAGroup>
            <WhatsAppButton label="Chat on WhatsApp" />
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default Home;
