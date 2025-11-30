import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Mountain, Factory, Route, Building, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Services = () => {
  const services = [
    {
      icon: Truck,
      title: "Full Truckload (FTL) Transport",
      description: "Dedicated trucks for large-volume shipments with nationwide coverage and TSM tracking.",
      features: [
        "20-40 tons capacity vehicles",
        "Nationwide coverage across 20+ states",
        "Real-time TSM tracking",
        "Optimized route planning",
        "Dedicated fleet assignment",
      ],
      stats: "98% on-time delivery rate",
    },
    {
      icon: Mountain,
      title: "Mining & Raw Material Logistics",
      description: "Heavy-haul expertise for ores, aggregates, and explosives with certified safety protocols.",
      features: [
        "Reinforced heavy-duty vehicles",
        "DGMS safety compliance",
        "Rapid site-to-site transfers",
        "Rugged terrain expertise",
        "24/7 operations capability",
      ],
      stats: "10M+ tons moved annually",
    },
    {
      icon: Factory,
      title: "Industrial Contract Logistics",
      description: "Long-term dedicated support with customized fleets and performance SLAs.",
      features: [
        "Customized fleet solutions",
        "Predictive scheduling",
        "Performance SLAs",
        "Monthly analytics reports",
        "Dedicated account management",
      ],
      stats: "25% cost reduction average",
    },
    {
      icon: Route,
      title: "Smart Route & Load Optimization",
      description: "Tech-driven efficiency with AI route planning and load balancing.",
      features: [
        "AI-powered route planning",
        "Dynamic load balancing",
        "Eco-friendly routing",
        "Traffic pattern analysis",
        "Fuel consumption optimization",
      ],
      stats: "Up to 15% cost savings",
    },
    {
      icon: Building,
      title: "Enterprise Client Services",
      description: "Holistic partnerships with analytics dashboards and API integrations.",
      features: [
        "Custom analytics dashboards",
        "API integrations with ERP",
        "VIP support channels",
        "Quarterly business reviews",
        "Scalable capacity management",
      ],
      stats: "500+ enterprise clients",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Trucking and Logistics",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ZAFTYS Logistics",
      "address": "Pune, India"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Logistics Services",
      "itemListElement": services.map((s, i) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.title,
          "description": s.description
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="Industrial Logistics Services - FTL, Mining & Contract Fleet" 
        description="Comprehensive logistics solutions including Full Truckload, Mining Transport, and Smart Route Optimization." 
        canonical="/services"
        schema={schema}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-navy text-white overflow-hidden min-h-[400px] flex items-center">
        {/* Abstract Pattern Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy"></div>
        
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-6 uppercase tracking-widest">
              Our Expertise
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in-up">
              Tailored Logistics Solutions
            </h1>
            <p className="text-xl text-gray-300 animate-fade-in-up max-w-2xl mx-auto font-light" style={{ animationDelay: "0.2s" }}>
              Comprehensive services designed for unmatched efficiency and reliability across India's toughest terrains.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <p className="text-lg text-muted-foreground leading-relaxed">
              At ZAFTYS, our services are designed to meet the diverse needs of India's industries, combining 
              robust infrastructure with digital intelligence. Whether you're handling bulk commodities or 
              time-sensitive deliveries, we provide end-to-end solutions backed by our TSM platform.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                
                {/* Text Content */}
                <div className={`animate-fade-in-up ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="w-16 h-16 rounded bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <service.icon size={32} />
                  </div>
                  <h2 className="text-3xl font-heading font-bold mb-4 text-navy">{service.title}</h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="text-accent mt-1" size={18} />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="px-6 py-3 bg-white rounded border border-border shadow-sm">
                      <span className="text-primary font-bold text-lg block">{service.stats}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Performance</span>
                    </div>
                  </div>
                </div>

                {/* Card Visual */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  {/* Decorative Background Element */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${index % 2 === 0 ? 'from-primary/5 to-transparent' : 'from-accent/5 to-transparent'} rounded-2xl transform rotate-3 scale-105 -z-10`}></div>
                  
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white h-full">
                    <CardContent className="p-10 flex flex-col justify-center h-full">
                      <h3 className="text-xl font-heading font-bold mb-6 text-navy border-b pb-4">Why Choose This?</h3>
                      <div className="space-y-6">
                         <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-navy font-bold">1</div>
                            <div>
                               <h4 className="font-bold text-foreground">TSM Integrated</h4>
                               <p className="text-sm text-muted-foreground">Full visibility via our Transport Management System.</p>
                            </div>
                         </div>
                         <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-navy font-bold">2</div>
                            <div>
                               <h4 className="font-bold text-foreground">Cost Efficient</h4>
                               <p className="text-sm text-muted-foreground">Optimized to reduce empty miles and fuel usage.</p>
                            </div>
                         </div>
                         <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-navy font-bold">3</div>
                            <div>
                               <h4 className="font-bold text-foreground">Scalable</h4>
                               <p className="text-sm text-muted-foreground">From one truck to a dedicated fleet, we grow with you.</p>
                            </div>
                         </div>
                      </div>
                      <div className="mt-8 pt-6 border-t">
                        <Button variant="outline" className="w-full hover:bg-navy hover:text-white transition-colors">
                           Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto container-padding text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 animate-fade-in-up">
            Ready to Optimize Your Logistics?
          </h2>
          <p className="text-xl mb-10 text-gray-200 max-w-2xl mx-auto font-light">
            Get a customized quote tailored to your specific business needs.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent-light text-white font-bold text-lg px-10 py-6 h-auto shadow-lg hover:shadow-xl transition-all">
              Get a Custom Quote <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
