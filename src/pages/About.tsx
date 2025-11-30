import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Leaf, ArrowRight, History, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroAbout from "@/assets/hero-about.jpg";
import SEO from "@/components/SEO";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Integrity",
      description: "We do what we say. Honest dealings and ethical practices are the bedrock of our 60-year legacy.",
    },
    {
      icon: Target,
      title: "Precision",
      description: "Logistics is about details. We leverage technology to ensure every shipment is tracked and timely.",
    },
    {
      icon: Eye,
      title: "Client Focus",
      description: "Your business goals are ours. We tailor our fleet and schedules to match your production cycles.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Optimizing routes to reduce fuel consumption and building a greener supply chain for India.",
    },
  ];

  const milestones = [
    { year: "1960", title: "The Foundation", desc: "Established as a local trucking firm for mining logistics." },
    { year: "1995", title: "National Expansion", desc: "Expanded fleet to cover cross-country routes across 10 states." },
    { year: "2010", title: "Modernization", desc: "Fleet upgraded to heavy-duty multi-axle vehicles for industrial loads." },
    { year: "2022", title: "Digital Transformation", desc: "Launched ZAFTYS TSM™ for real-time client visibility." },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="About ZAFTYS - 60 Years of Transport Excellence" 
        description="Three generations of trust. Learn about our journey from a local trucking firm to a tech-enabled logistics powerhouse." 
        canonical="/about"
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroAbout} alt="ZAFTYS Warehouse Operations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50"></div>
        </div>
        
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-4xl text-white">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-6 uppercase tracking-widest">
              Our Story
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in-up leading-tight">
              Legacy on Wheels. <br/><span className="text-accent">Innovation in Motion.</span>
            </h1>
            <p className="text-xl text-gray-200 animate-fade-in-up max-w-2xl font-light" style={{ animationDelay: "0.2s" }}>
              Three generations of family-owned excellence, now powered by cutting-edge technology to serve India's industrial backbone.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story & Timeline */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Text Content */}
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-heading font-bold mb-6 text-primary">Decades of Trust</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  ZAFTYS Logistics embodies the perfect blend of time-honored tradition and forward-thinking transformation. 
                  As a third-generation family-owned enterprise, our roots trace back over 60 years to the bustling 
                  industrial heartlands of India.
                </p>
                <p>
                  Founded in the 1960s, we started with a single truck and a commitment to reliability. Through the 
                  economic reforms of the 90s and the infrastructure boom of the 2000s, we evolved. We didn't just 
                  move goods; we moved with the times.
                </p>
                <p>
                  Today, the third generation - armed with deep industry knowledge and modern tech - has digitized our ecosystem. 
                  We've replaced manual logs with AI-driven dashboards, ensuring that while our values remain old-school, 
                  our operations are cutting-edge.
                </p>
              </div>
              
              <div className="mt-10 flex gap-8">
                <div>
                    <p className="text-4xl font-heading font-bold text-accent">60+</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">Years</p>
                </div>
                <div>
                    <p className="text-4xl font-heading font-bold text-accent">3rd</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">Generation</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="animate-fade-in-up relative" style={{ animationDelay: "0.2s" }}>
              <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-border"></div>
              <div className="space-y-12 relative">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6 relative">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 border-primary flex items-center justify-center z-10 shadow-sm">
                      <span className="text-sm font-bold text-primary">{milestone.year}</span>
                    </div>
                    <div className="pt-3">
                      <h4 className="text-xl font-heading font-bold text-navy mb-2">{milestone.title}</h4>
                      <p className="text-muted-foreground">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-10">
                <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-navy">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower clients with real-time visibility, data-informed decisions, and seamless logistics 
                  that drive business growth. We leverage technology to eliminate inefficiencies while maintaining 
                  the personal touch of family service.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-10">
                <div className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="text-accent" size={24} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-navy">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To emerge as India's premier tech-enabled logistics provider by 2030, setting new standards in 
                  transparency and efficiency. We envision a future where every shipment is traceable, predictable, 
                  and sustainable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"></div>
        
        <div className="container mx-auto container-padding relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Principles that guide every mile we travel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/5 p-8 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded bg-accent/20 flex items-center justify-center mb-6 text-accent">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3 text-white">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto container-padding text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 animate-fade-in-up">
            Ready to Move With Us?
          </h2>
          <p className="text-xl mb-10 text-gray-200 max-w-2xl mx-auto font-light">
            Partner with a team that treats your cargo like their own.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent-light text-white font-bold text-lg px-10 py-6 h-auto shadow-lg hover:shadow-xl transition-all">
              Start a Conversation <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
