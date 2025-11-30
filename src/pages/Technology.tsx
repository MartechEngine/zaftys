import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, BarChart3, Clock, Shield, FileText, Bell, 
  Smartphone, Lock, Zap, TrendingUp, ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import heroTech from "@/assets/hero-technology.jpg";
import SEO from "@/components/SEO";

const Technology = () => {
  const features = [
    {
      icon: MapPin,
      title: "Real-Time GPS Tracking",
      description: "Live location updates, dynamic ETAs, and route deviation alerts on an interactive map.",
    },
    {
      icon: Clock,
      title: "Automated Trip Management",
      description: "One-click trip creation, assignment, and monitoring with automated status notifications.",
    },
    {
      icon: Smartphone,
      title: "Driver Mobile App",
      description: "Drivers get routes, load details, and upload digital proof of delivery (ePOD) instantly.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Deep dive into delay analysis, fuel consumption patterns, and cost-per-mile metrics.",
    },
    {
      icon: Zap,
      title: "Route Optimization",
      description: "AI algorithms suggest the fastest, most fuel-efficient routes based on traffic and weather.",
    },
    {
      icon: FileText,
      title: "Digital Documentation",
      description: "Secure cloud storage for all compliance docs, invoices, and bills of lading.",
    },
  ];

  const benefits = [
    { stat: "15%", label: "Cost Reduction", icon: TrendingUp },
    { stat: "30%", label: "Faster Response", icon: Zap },
    { stat: "100%", label: "Visibility", icon: Shield },
    { stat: "Zero", label: "Paperwork Lost", icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="Logistics Technology & TSM™ Dashboard" 
        description="Track your cargo in real-time with ZAFTYS TSM™. AI-driven route optimization, automated trip management, and digital ePODs." 
        canonical="/technology"
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[500px] flex items-center bg-navy text-white">
        <div className="absolute inset-0">
          <img src={heroTech} alt="ZAFTYS Technology Dashboard" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60"></div>
        </div>
        
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6 uppercase tracking-widest">
              ZAFTYS TSM™
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in-up">
              Intelligence in Every Shipment.
            </h1>
            <p className="text-xl text-gray-300 animate-fade-in-up max-w-2xl font-light leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Our proprietary Transport Management System (TSM) puts you in the driver's seat. Monitor, manage, and optimize your entire supply chain from a single dashboard.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="bg-white text-navy hover:bg-gray-100 font-bold text-lg px-8">
                Request a Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Login to Portal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview / Intro */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 animate-fade-in-up">
              <h2 className="text-4xl font-heading font-bold mb-6 text-navy">The Engine of Efficiency</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                ZAFTYS TSM isn't just a tracking tool; it's an operating system for modern logistics. 
                Built in-house by our engineering team, it bridges the gap between fleet owners, drivers, and clients.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Eliminate the "black box" of transportation. With TSM, you know exactly when a truck arrives, 
                how much fuel was used, and when your invoice is generated - all automatically.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border">
                    <benefit.icon className="text-primary mb-2" size={24} />
                    <div className="text-2xl font-heading font-bold text-navy">{benefit.stat}</div>
                    <div className="text-sm text-muted-foreground">{benefit.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="rounded-xl overflow-hidden shadow-2xl border border-border bg-navy aspect-video relative group">
                 {/* Abstract Dashboard Representation */}
                 <div className="absolute inset-0 bg-gradient-to-br from-navy to-primary/50"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                       <BarChart3 className="mx-auto text-accent mb-4 opacity-80" size={64} />
                       <p className="text-white font-heading text-2xl tracking-widest opacity-80">DASHBOARD PREVIEW</p>
                    </div>
                 </div>
                 {/* Floating Interactions */}
                 <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Capabilities Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">System Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your logistics, in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3 text-navy">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"></div>
        <div className="container mx-auto container-padding relative z-10 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 animate-fade-in-up">
            See TSM in Action
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Schedule a personalized demo to see how our technology can save you 15% on logistics costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent-light text-white px-10 py-6 h-auto font-bold text-lg">
                Book a Demo
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 px-10 py-6 h-auto text-lg"
            >
              Download Feature Sheet
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;
