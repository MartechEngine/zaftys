import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import heroAbout from "@/assets/hero-about.jpg";
import { pageHeroAlts } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import { pageSeo } from "@/lib/page-seo";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { organizationSchema, localBusinessSchema, breadcrumbSchema } from "@/lib/schema";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Integrity",
      description: "We do what we say. Honest dealings on every contracted trip.",
    },
    {
      icon: Target,
      title: "Precision",
      description: "Gates, papers, and timing. The TMS exists so those details are not lost in a chat.",
    },
    {
      icon: Eye,
      title: "Client focus",
      description: "Your production window is the schedule. We match truck class and dispatch to it.",
    },
    {
      icon: Leaf,
      title: "Fuel-sensible routing",
      description: "Fewer empty kilometres on lanes we run often. Better for cost and for fuel.",
    },
  ];

  const milestones = [
    { year: "1960s", title: "The Foundation", desc: "Started as a family trucking operation moving freight in India's industrial heartlands." },
    { year: "1990s", title: "National Corridors", desc: "Expanded across cross-country routes as India's infrastructure and industry grew." },
    { year: "2010s", title: "Wider fleet", desc: "Heavy load stayed. Distribution, tanker, and container work sat next to it." },
    { year: "2020s", title: "TMS and marketplace", desc: "GST-compliant billing. TranZfort as a marketplace. ZAFTYS TMS opened to shippers and operators." },
  ];

  const todayPillars = [
    { title: "Transport", desc: "Company fleet, LCV to bulker, on contracted lanes." },
    { title: "ZAFTYS TMS", desc: "The dispatch system at app.zaftys.com. We use it. You can too." },
    { title: "TranZfort", desc: "Post and search are free. AI-powered matching. Broker fee to truckers on booked loads." },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.about.title}
        description={pageSeo.about.description}
        canonical="/about"
        schema={[
          organizationSchema,
          localBusinessSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <PageHero
        badge={pageHeroCopy.about.badge}
        title={pageHeroCopy.about.h1}
        description={pageHeroCopy.about.lead}
        imageSrc={heroAbout}
        imageAlt={pageHeroAlts.about}
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
              <h2 className="text-4xl font-heading font-bold mb-6 text-primary">From family lanes to a GST desk</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  ZAFTYS started as a family trucking operation on Indian corridors. Hands-on dispatch. Showing up when it mattered. That is still how the yard works.
                </p>
                <p>
                  The cargo got wider than cement and steel. So did the company: commercial LCV, container, tanker, and bulker, plus the TMS we dispatch on, plus TranZfort.
                </p>
                <p>
                  Formal operations mean <strong className="text-foreground">GST-compliant billing and structured documentation</strong> on trips contracted through us. Own fleet when we have the truck. Marketplace when you need to post or find. Same Amravati desk.
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
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">What we do today</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Three equal products under one GST-compliant company.</p>
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
                  To move commercial freight in India with our own trucks, a TMS people actually log into, and a marketplace that does not charge truckers to look for work.
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
                  To be the company a shipper can hire for the truck, the software, or the load board, without three different vendors.
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
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We do what we say. We match the truck to the window. We cut empty kilometres where we can.
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
            Ready to work with the same desk?
          </h2>
          <p className="text-xl mb-10 text-gray-200 max-w-2xl mx-auto font-light">
            Quote the freight. Demo the TMS. Or put trucks on TranZfort.
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
