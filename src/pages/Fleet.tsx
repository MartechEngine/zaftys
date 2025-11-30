import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, Gauge, Shield, Wrench, Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroFleet from "@/assets/hero-fleet.jpg";
import SEO from "@/components/SEO";

const Fleet = () => {
  const trucks = [
    {
      name: "Heavy Haul Multi-Axle",
      capacity: "25-40 Tons",
      type: "Long Haul",
      features: ["Euro VI Compliant", "GPS Enabled", "High Payload"],
      ideal: "Cement, Steel, Coils",
    },
    {
      name: "Rigid Container Trucks",
      capacity: "10-20 Tons",
      type: "Regional",
      features: ["Weather Proof", "Fast Turnaround", "City Access"],
      ideal: "FMCG, Retail Goods",
    },
    {
      name: "Mining Tippers",
      capacity: "30+ Tons",
      type: "Off-Road",
      features: ["Reinforced Chassis", "High Ground Clearance", "Dust Seal"],
      ideal: "Coal, Iron Ore, Aggregates",
    },
  ];

  const features = [
    { icon: MapPin, title: "Live Tracking", desc: "Dual GPS systems for redundancy." },
    { icon: Gauge, title: "Telematics", desc: "Real-time fuel and driving behavior monitoring." },
    { icon: Wrench, title: "Proactive Maintenance", desc: "Predictive alerts to prevent breakdowns." },
    { icon: Shield, title: "Safety First", desc: "ABS, speed limiters, and driver fatigue alarms." },
    { icon: Leaf, title: "Eco-Friendly", desc: "Route optimization to minimize carbon footprint." },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[500px] flex items-center bg-navy text-white">
        <div className="absolute inset-0">
          <img src={heroFleet} alt="ZAFTYS Fleet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60"></div>
        </div>
        
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6 uppercase tracking-widest">
              Our Assets
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in-up">
              Engineered for Reliability.
            </h1>
            <p className="text-xl text-gray-300 animate-fade-in-up max-w-2xl font-light leading-relaxed" style={{ animationDelay: "0.2s" }}>
              A modern, diverse fleet of 200+ vehicles, maintained to the highest standards and integrated with smart technology.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">The Right Truck for the Job</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Diverse configurations to handle any cargo type safely and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trucks.map((truck, index) => (
              <Card key={index} className="border-none shadow-lg overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 bg-muted/20 flex items-center justify-center relative group-hover:bg-muted/30 transition-colors">
                  <Truck className="text-primary opacity-20 w-32 h-32" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Image Placeholder</span>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-heading font-bold mb-2 text-navy">{truck.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{truck.type}</p>
                  
                  <div className="flex items-center justify-between mb-6 p-3 bg-secondary/30 rounded-lg">
                    <span className="text-sm font-semibold text-muted-foreground">Capacity</span>
                    <span className="text-lg font-bold text-primary">{truck.capacity}</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {truck.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Best For</p>
                    <p className="font-medium text-navy">{truck.ideal}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Specs / Features */}
      <section className="section-padding bg-navy text-white">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <h2 className="text-3xl font-heading font-bold">Smart Fleet Capabilities</h2>
            <Link to="/technology">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 mt-4 md:mt-0"
              >
                View Our Tech Stack
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center">
                <feature.icon className="mx-auto text-accent mb-4" size={28} />
                <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto container-padding">
          <h2 className="text-4xl font-heading font-bold mb-6">Need Reliable Transport?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light">
            Our fleet is ready to roll. Get in touch for immediate availability.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent-light text-white font-bold px-10 py-6 h-auto text-lg shadow-lg">
              Request Vehicles
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Fleet;
