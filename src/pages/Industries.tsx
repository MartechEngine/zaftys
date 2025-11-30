import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Mountain, Factory, Package, ShoppingCart, Wheat, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroIndustries from "@/assets/hero-industries.jpg";
import SEO from "@/components/SEO";

const Industries = () => {
  const industries = [
    {
      icon: Building2,
      title: "Cement & Construction",
      description: "Just-in-time delivery for high-volume, dust-prone loads. We handle seasonal surges with ease.",
      features: ["Dust-control vehicles", "20-40 ton capacity", "Multi-plant coordination"],
      stat: "25% Delay Reduction",
    },
    {
      icon: Mountain,
      title: "Coal & Mining",
      description: "Rugged transport for raw materials. Our fleet is built for tough terrains and hazardous conditions.",
      features: ["Heavy-duty tippers", "DGMS compliant", "24/7 site operations"],
      stat: "10M+ Tons/Year",
    },
    {
      icon: Factory,
      title: "Steel & Metal",
      description: "Secure, heavy-haul transport for coils, pipes, and plates. Damage-free delivery guaranteed.",
      features: ["Reinforced flatbeds", "Secure tie-down systems", "Express lanes"],
      stat: "99% Damage-Free",
    },
    {
      icon: Package,
      title: "Industrial Goods",
      description: "Flexible logistics for machinery and parts. From factory floor to assembly line.",
      features: ["Custom crating", "Multi-stop routing", "Insurance coverage"],
      stat: "20% Fuel Savings",
    },
    {
      icon: ShoppingCart,
      title: "FMCG & Retail",
      description: "Speed and traceability for fast-moving goods. Keep your shelves stocked and customers happy.",
      features: ["Temperature control", "Fast-track delivery", "Inventory sync"],
      stat: "24/7 Tracking",
    },
    {
      icon: Wheat,
      title: "Agriculture",
      description: "Seasonal support for bulk commodities. We scale up when you harvest.",
      features: ["Grain-safe interiors", "Weather-adaptive scheduling", "Mandi networks"],
      stat: "Scalable Capacity",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="Industries We Serve - Mining, Steel & FMCG" 
        description="Specialized logistics for Cement, Coal, Steel, and Retail sectors. Heavy-haul capabilities for India's toughest industrial requirements." 
        canonical="/industries"
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[500px] flex items-center bg-navy text-white">
        <div className="absolute inset-0">
          <img src={heroIndustries} alt="Mining Operations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60"></div>
        </div>
        
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-sm font-semibold mb-6 uppercase tracking-widest">
              Sectors
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in-up">
              Powering India's Key Industries
            </h1>
            <p className="text-xl text-gray-300 animate-fade-in-up max-w-2xl font-light leading-relaxed" style={{ animationDelay: "0.2s" }}>
              From the mines of Jharkhand to the construction sites of Mumbai, we deliver specialized logistics for every sector.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">Specialized Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand the unique challenges of your industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-white">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-lg bg-primary/5 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <industry.icon size={28} />
                  </div>
                  
                  <h3 className="text-2xl font-heading font-bold mb-3 text-navy group-hover:text-primary transition-colors">
                    {industry.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">{industry.description}</p>
                  
                  <div className="space-y-3 mb-6 pt-6 border-t border-border/50">
                    {industry.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <CheckCircle className="text-accent mt-0.5" size={16} />
                        <span className="text-sm text-foreground font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Impact</span>
                    <span className="font-bold text-primary">{industry.stat}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-6 text-navy">Why Industry Leaders Trust Us</h2>
            <p className="text-lg text-muted-foreground">
              We don't just move cargo; we optimize value chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Compliance Ready", desc: "We navigate complex regulations and permits so you don't have to." },
              { title: "Scalable Fleet", desc: "From 10 trucks to 100, we scale our operations to match your seasonal demand." },
              { title: "Tech Integrated", desc: "Our API connects directly with your ERP for seamless data flow." },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-border bg-muted/10">
                <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto container-padding">
          <h2 className="text-4xl font-heading font-bold mb-6">Ready to Streamline Your Supply Chain?</h2>
          <Link to="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent-light text-white font-bold px-8 py-6 h-auto text-lg shadow-lg">
              Get a Quote for Your Industry
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Industries;
