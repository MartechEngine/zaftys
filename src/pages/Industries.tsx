import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { pageHeroImages } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import ResponsiveImage from "@/components/ResponsiveImage";
import { pageSeo } from "@/lib/page-seo";
import { industryHubCards } from "@/lib/industries-data";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const Industries = () => {
  const industries = industryHubCards();

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.industries.title}
        description={pageSeo.industries.description}
        canonical="/industries"
        schema={[
          organizationSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
          ]),
        ]}
      />

      <PageHero
        badge="Industries"
        title="Industrial Logistics For Cement, Steel, Mining & Bulk Freight."
        description="Each vertical needs different assets, documentation, and timing. ZAFTYS builds transport programs around those realities  -  company-operated fleet first, TranZfort capacity when demand spikes, and TMS visibility on active lanes across India."
        imageSrc={pageHeroImages.industries.src}
        imageAlt={pageHeroImages.industries.alt}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label="Discuss Your Industry Needs"
            subject={heroMailSubjects.industryHub}
            body={heroMailBodies.industryHub}
          />
          <Link to="/services">
            <Button size="lg" variant="on-dark-outline">Explore Services</Button>
          </Link>
        </CTAGroup>
      </PageHero>

      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-navy">Specialized by Vertical</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each industry runs on the same ZAFTYS stack  -  own fleet, TranZfort network, and TMS™ visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry) => (
              <Link key={industry.slug} to={`/industries/${industry.slug}`}>
                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-white overflow-hidden flex flex-col h-full">
                  <ResponsiveImage
                    src={industry.image}
                    alt={industry.title}
                    aspectRatio="2/1"
                    objectFit="cover"
                    imgClassName="object-center"
                  />
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-lg font-heading font-bold mb-2 text-navy group-hover:text-primary transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">{industry.description}</p>
                    <div className="space-y-2 mb-4 pt-4 border-t border-border/50">
                      {industry.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle className="text-accent mt-0.5 shrink-0" size={14} />
                          <span className="text-xs text-foreground font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-2 text-center flex items-center justify-center gap-1">
                      <span className="font-bold text-primary text-xs">{industry.highlight}</span>
                      <ArrowRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Compliance Ready", desc: "Structured documentation, ePOD, and regulatory awareness on active lanes." },
              { title: "Scalable Capacity", desc: "Own fleet for core lanes; TranZfort network for surge and spot overflow." },
              { title: "Full Visibility", desc: "ZAFTYS TMS™ tracking for shippers who need real-time shipment status." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-lg border border-border bg-muted/10">
                <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto container-padding">
          <h2 className="text-4xl font-heading font-bold mb-6">Get a Quote for Your Industry</h2>
          <p className="text-gray-200 mb-8 max-w-xl mx-auto">Tell us your corridor, load type, and volume on WhatsApp.</p>
          <CTAGroup>
            <WhatsAppButton label="Chat on WhatsApp" />
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default Industries;
