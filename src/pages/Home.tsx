import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Truck, MapPin, BarChart3, Shield, Clock, Star, UserCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import StatCounter from "@/components/StatCounter";
import ServiceCard from "@/components/ServiceCard";
import FeatureCard from "@/components/FeatureCard";
import heroImage from "@/assets/hero-home.jpg";
import SEO from "@/components/SEO";

const Home = () => {
  const services = [
    {
      icon: Truck,
      title: "Full Truckload (FTL)",
      description: "Moving bulk loads like coal, cement, and steel? We ensure high-capacity transport with zero delays.",
      link: "/services#ftl"
    },
    {
      icon: MapPin,
      title: "Mining Logistics",
      description: "Rugged terrain specialists. We transport raw materials from mines to plants safely and efficiently.",
      link: "/services#mining"
    },
    {
      icon: TrendingUp,
      title: "Route Optimization",
      description: "Stop paying for empty miles. Our smart algorithms plan the most efficient path for your cargo.",
      link: "/services#optimization"
    },
    {
      icon: Shield,
      title: "Contract Logistics",
      description: "Long-term fleet management solutions that guarantee availability and predictable pricing.",
      link: "/services#contract"
    },
  ];

  const industries = [
    "Cement & Construction",
    "Coal & Mining",
    "Steel & Metal",
    "Industrial Goods",
    "FMCG & Retail",
    "Agriculture",
  ];

  const features = [
    { icon: MapPin, title: "Live GPS Tracking", desc: "Know exactly where your shipment is, every second." },
    { icon: BarChart3, title: "Cost Analytics", desc: "Granular insights to help you cut logistics spend." },
    { icon: Clock, title: "24/7 Dispatch", desc: "Round-the-clock support for critical deliveries." },
    { icon: UserCheck, title: "Verified Drivers", desc: "Background checks and safety training for every pilot." },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "LogisticsService",
    "name": "ZAFTYS Logistics",
    "image": "https://zaftys.com/og-image.svg",
    "description": "Premier logistics partner for India's heavy industries.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "World Trade Center, Kharadi",
      "addressLocality": "Pune",
      "addressRegion": "MH",
      "postalCode": "411014",
      "addressCountry": "IN"
    },
    "telephone": "+91-927-092-3581",
    "openingHours": "Mo-Su 00:00-24:00",
    "priceRange": "$$"
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SEO 
        title="Industrial Trucking & Supply Chain Experts" 
        description="Premier logistics partner for India's heavy industries. FTL, Mining, and Project Cargo with real-time TSM™ tracking. Get a quote today." 
        canonical="/"
        schema={schema}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden min-h-[700px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="ZAFTYS Logistics Trucks" className="w-full h-full object-cover" />
          {/* Darker overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40"></div>
        </div>
        
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-4xl text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 animate-fade-in-up leading-tight">
              We Move Your Heavy Loads. <br/>
              <span className="text-accent">On Time. Every Time.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light animate-fade-in-up max-w-2xl" style={{ animationDelay: "0.2s" }}>
              ZAFTYS Logistics combines 60 years of experience with modern tech to eliminate delays and provide total visibility for your supply chain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="bg-accent hover:bg-accent-light text-white text-lg px-10 py-6 h-auto hover-lift font-semibold tracking-wide uppercase shadow-lg shadow-accent/20">
                Get a Free Quote <ArrowRight className="ml-2" size={20} />
              </Button>
              <Link to="/technology">
                <Button size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white/40 hover:border-white text-lg px-10 py-6 h-auto backdrop-blur-sm">
                  How We Track It
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="py-12 bg-white border-b border-border relative -mt-10 mx-4 md:mx-8 lg:mx-16 rounded-xl shadow-xl z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-6 md:px-12">
          {[
            { stat: "60", suffix: "+", label: "Years Experience", color: "text-primary" },
            { stat: "500", suffix: "+", label: "Active Clients", color: "text-accent" },
            { stat: "98", suffix: "%", label: "On-Time Delivery", color: "text-success" },
            { stat: "10", suffix: "M+", label: "Tons Moved", color: "text-primary" },
            { stat: "20", suffix: "+", label: "States Covered", color: "text-secondary" },
            { stat: "24", suffix: "/7", label: "Support", color: "text-accent" },
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className={`text-3xl md:text-4xl font-heading font-bold ${item.color} mb-1 group-hover:scale-110 transition-transform duration-300`}>
                <StatCounter end={parseInt(item.stat)} suffix={item.suffix} />
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Services */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-4 text-primary">
              Logistics Solutions Built for Industry
            </h2>
            <p className="text-lg text-muted-foreground">
              From raw material transport to last-mile distribution, we handle the heavy lifting so you can focus on production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
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

      {/* Technology Advantage - "Show, Don't Tell" */}
      <section className="section-padding bg-navy text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtNGgtMnY0aC0ydjRoMnY0aDJ2LTRoMnYtNGgtMnpNMzYgMzRWMzRoNDB2MmgtNDB2LTJ6bTAgMHYtMmgydjJ4LTIyek02IDZ2MmgyVjZINnptMCA0aDJ2MmgtMlYxMHptMCA0aDJ2MmgtMlYxNHptMCA0aDJ2MmgtMlYxOHoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+')]"></div>
        
        <div className="container mx-auto container-padding relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Content Side */}
            <div className="lg:w-1/2">
              <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-semibold mb-6 border border-orange-200">
                ZAFTYS TSM™ TECHNOLOGY
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                Complete Control Over Your Cargo.
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Stop guessing where your trucks are. Our proprietary Transport Management System (TSM) gives you a live command center for your entire supply chain.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <feature.icon className="text-accent" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/technology">
                <Button className="bg-white text-navy hover:bg-gray-100 font-bold px-8 py-6 h-auto text-lg">
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Visual Side - Dashboard Mockup */}
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-navy-light animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                {/* Placeholder for Dashboard Image - In a real scenario, use an actual screenshot */}
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative p-4 flex flex-col">
                  {/* Fake UI Elements */}
                  <div className="h-8 w-full border-b border-white/10 flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 flex gap-4">
                    <div className="w-1/4 bg-white/5 rounded h-full"></div>
                    <div className="flex-1 bg-white/5 rounded h-full relative overflow-hidden">
                       <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-white/50 font-heading text-2xl uppercase font-bold">Live Map View</p>
                       </div>
                       {/* Animated Dots */}
                       <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_15px_rgba(255,100,0,0.8)]"></div>
                       <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-success rounded-full animate-pulse shadow-[0_0_15px_rgba(0,255,100,0.8)]" style={{ animationDelay: "1s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl max-w-xs animate-float hidden md:block">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Truck size={20} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Shipment #4092</p>
                      <p className="text-sm font-bold text-navy">Arrived at Destination</p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-primary">
              Industries We Serve
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Specialized handling for every sector of the economy.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <Card key={index} className="hover:border-primary/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-muted/10">
                <CardContent className="p-6 text-center flex items-center justify-center h-full min-h-[100px]">
                  <p className="font-semibold text-navy">{industry}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Added Trust Signals */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-primary">
              What Our Partners Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: "ZAFTYS reduced our dispatch downtime by 40%. The visibility we get across our 5 cement plants is something we haven't seen with other transporters.",
                author: "Rajesh Kumar",
                role: "Supply Chain Head",
                company: "UltraTech Cement (Region North)",
              },
              {
                text: "Reliability was our biggest issue with unorganized fleet owners. ZAFTYS brought structure, safety compliance, and real-time tracking that our compliance team loves.",
                author: "Amitabh Verma",
                role: "Logistics Director",
                company: "Jindal Steel & Power",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md bg-white">
                <CardContent className="p-10">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow fill-yellow" size={20} />
                    ))}
                  </div>
                  <p className="text-xl mb-8 text-foreground italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-navy text-lg">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, <span className="font-semibold">{testimonial.company}</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto container-padding text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Optimize Your Supply Chain?
          </h2>
          <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Join 500+ companies that trust ZAFTYS for reliable, tech-enabled logistics.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent-light text-white text-lg px-12 py-6 h-auto font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                Request a Quote
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-transparent hover:bg-white/10 border-white text-white text-lg px-12 py-6 h-auto">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
