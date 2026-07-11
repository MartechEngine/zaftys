import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { pageHeroImages } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import { pageSeo } from "@/lib/page-seo";

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
    { year: "1960s", title: "The Foundation", desc: "Started as a family trucking operation moving freight in India's industrial heartlands." },
    { year: "1990s", title: "National Corridors", desc: "Expanded across cross-country routes as India's infrastructure and industry grew." },
    { year: "2010s", title: "Modern Heavy-Haul Fleet", desc: "Upgraded to multi-axle and tipper assets built for cement, steel, and mining loads." },
    { year: "2020s", title: "Company & Platform", desc: "Formal operations with GST-compliant billing; launched TranZfort network and ZAFTYS TSM." },
  ];

  const todayPillars = [
    { title: "Own Fleet", desc: "Company-owned heavy-haul trucks for direct suppliers and transporters." },
    { title: "TranZfort", desc: "Verified logistics network scaling capacity across India  -  all through ZAFTYS." },
    { title: "ZAFTYS TSM™", desc: "Transport & fleet management platform  -  internal ops and client product." },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.about.title}
        description={pageSeo.about.description}
        canonical="/about"
      />
      <PageHero
        badge="Our Story"
        title={
          <>
            Built On Real Logistics Experience.
            <br />
            <span className="text-accent">Designed For The Future Of Supply Chains.</span>
          </>
        }
        description="ZAFTYS combines transport operations, intelligent technology, and a verified logistics network into one connected ecosystem  -  helping businesses move freight with greater confidence."
        imageSrc={pageHeroImages.about.src}
        imageAlt={pageHeroImages.about.alt}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label="Work With ZAFTYS"
            subject={heroMailSubjects.about}
            body={heroMailBodies.about}
          />
          <Link to="/services">
            <Button size="lg" variant="on-dark-outline">Explore Services</Button>
          </Link>
        </CTAGroup>
      </PageHero>

      {/* Our Story & Timeline */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Text Content */}
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-heading font-bold mb-6 text-primary">Decades of Trust</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  ZAFTYS embodies six decades of family-operated freight experience  -  moving steel, cement, coal, and bulk cargo across India's industrial corridors.
                </p>
                <p>
                  For most of our history we operated in the traditional truck-owner category: hands-on dispatch, corridor relationships, and a reputation for showing up when it mattered. That operational DNA still defines how we work.
                </p>
                <p>
                  We built formal operations with <strong className="text-foreground">GST-compliant billing and structured documentation</strong> to serve direct suppliers and large transporters  -  with own fleet, TranZfort network capacity, and ZAFTYS TSM powering every trip.
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

      {/* Today */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">What We Do Today</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Transport operator and technology company  -  under one formal, GST-compliant operation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {todayPillars.map((pillar, index) => (
              <Card key={index} className="border-none shadow-md text-center">
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading font-bold text-navy mb-3">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-10">
                <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-navy">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To move India's industrial freight with reliability, transparency, and scale  -  through own fleet, TranZfort network, and TSM™ technology. Every transaction runs through ZAFTYS.
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
                  To be India's most trusted heavy-transport operator  -  combining decades of corridor experience with a national digital freight network and world-class operations software.
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
            Partner with a team that has moved freight for three generations.
          </p>
          <CTAGroup>
            <WhatsAppButton label="Chat on WhatsApp" />
            <Link to="/careers">
              <Button size="lg" variant="on-dark-outline">Careers</Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default About;
