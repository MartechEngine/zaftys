import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import { heroMailSubjects } from "@/lib/hero-ctas";
import NotFound from "@/pages/NotFound";
import { getIndustryBySlug } from "@/lib/industries-data";

const IndustryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? getIndustryBySlug(slug) : undefined;

  if (!industry) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={industry.seoTitle}
        description={industry.seoDescription}
        canonical={`/industries/${industry.slug}`}
      />

      <PageHero
        badge={industry.title}
        title={industry.heroHeadline}
        description={industry.description}
        imageSrc={industry.image}
        imageAlt={industry.title}
        prepend={
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-8 transition-colors relative z-10"
          >
            <ArrowLeft size={16} /> All industries
          </Link>
        }
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label="Get a Quote"
            subject={heroMailSubjects.industryQuote(industry.title)}
            body={
              industry.whatsappPrefill
                ? `Hi ZAFTYS,\n\n${industry.whatsappPrefill}\n\n`
                : `Hi ZAFTYS,\n\nI'd like a quote for ${industry.title} logistics.\n\nCorridor:\nLoad type:\nVolume:\n\n`
            }
          />
          <Link to="/contact">
            <Button size="lg" variant="on-dark-outline">Talk to Our Team</Button>
          </Link>
        </CTAGroup>
      </PageHero>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding max-w-4xl">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="equipment">Corridors & assets</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-navy mb-6">Operational Challenges</h2>
                <ul className="space-y-4">
                  {industry.challenges.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="text-accent mt-1 shrink-0" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-muted/40 border border-border text-center">
                <span className="text-sm font-semibold text-primary">{industry.highlight}</span>
              </div>
            </TabsContent>

            <TabsContent value="operations">
              <h2 className="text-2xl font-heading font-bold text-navy mb-4">How ZAFTYS Supports This Vertical</h2>
              <p className="text-muted-foreground mb-8">
                Own fleet first. Verified TranZfort network when demand exceeds capacity. Visibility through ZAFTYS TSM  -  one partner throughout.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {industry.howZaftysHelps.map((item) => (
                  <div key={item} className="p-6 rounded-xl bg-muted/30 border border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="equipment">
              <h2 className="text-2xl font-heading font-bold text-navy mb-8">Typical Corridors & Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-heading font-bold text-navy mb-4">Corridors we plan for</h3>
                  <ul className="space-y-3">
                    {industry.corridors.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-accent font-bold">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-navy mb-4">Equipment fit</h3>
                  <ul className="space-y-3">
                    {industry.equipment.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary font-bold">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="section-padding bg-navy text-white">
        <div className="container mx-auto container-padding max-w-3xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Get a Quote for {industry.title}</h2>
          <p className="text-gray-300 mb-8">
            Share your corridor, load type, and volume on WhatsApp  -  our team will recommend a suitable transport approach.
          </p>
          <CTAGroup>
            <WhatsAppButton label="Chat on WhatsApp" message={industry.whatsappPrefill} />
            <Link to="/services">
              <Button size="lg" variant="on-dark-outline">
                Explore Services <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default IndustryDetail;
