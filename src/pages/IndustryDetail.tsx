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
import { getIndustryBySlug, industries } from "@/lib/industries-data";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";

const IndustryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? getIndustryBySlug(slug) : undefined;

  if (!industry) {
    return <NotFound />;
  }

  const related = industries.filter((item) => item.slug !== industry.slug).slice(0, 3);

  const schema = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Industries", path: "/industries" },
      { name: industry.title, path: `/industries/${industry.slug}` },
    ]),
    faqPageSchema(industry.faqs),
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={industry.seoTitle}
        description={industry.seoDescription}
        canonical={`/industries/${industry.slug}`}
        schema={schema}
      />

      <PageHero
        badge={industry.title}
        title={industry.seoH1}
        description={industry.description}
        imageSrc={industry.image}
        imageAlt={`${industry.title} freight by ZAFTYS`}
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

            <TabsContent value="overview" forceMount className="space-y-8 data-[state=inactive]:hidden">
              <div>
                <h2 className="text-2xl font-heading font-bold text-navy mb-6">Operational challenges</h2>
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

            <TabsContent value="operations" forceMount className="data-[state=inactive]:hidden">
              <h2 className="text-2xl font-heading font-bold text-navy mb-4">How ZAFTYS supports this vertical</h2>
              <p className="text-muted-foreground mb-8">
                Company trucks when we have the class. TranZfort to post or find a load. ZAFTYS TMS on trips we run.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {industry.howZaftysHelps.map((item) => (
                  <div key={item} className="p-6 rounded-xl bg-muted/30 border border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="equipment" forceMount className="data-[state=inactive]:hidden">
              <h2 className="text-2xl font-heading font-bold text-navy mb-8">Typical corridors and equipment</h2>
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

          <div className="mt-16 pt-10 border-t border-border">
            <h2 className="text-xl font-heading font-bold text-navy mb-6">Frequently asked questions</h2>
            <div className="space-y-4 mb-12">
              {industry.faqs.map((faq) => (
                <div key={faq.question} className="p-5 rounded-xl bg-muted/30 border border-border">
                  <h3 className="font-heading font-bold text-navy mb-2 text-sm">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-heading font-bold text-navy mb-6">Related industries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/industries/${item.slug}`}
                  className="p-4 rounded-lg border border-border hover:border-primary/40 transition-colors"
                >
                  <span className="font-heading font-semibold text-navy">{item.title}</span>
                  <span className="block text-xs text-muted-foreground mt-1">{item.highlight}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link to="/services" className="text-primary font-semibold hover:underline">
                Explore services
              </Link>
              <Link to="/tranzfort-network" className="text-primary font-semibold hover:underline">
                TranZfort marketplace
              </Link>
              <Link to="/zaftys-tms" className="text-primary font-semibold hover:underline">
                ZAFTYS TMS
              </Link>
              <Link to="/partner" className="text-primary font-semibold hover:underline">
                Become a partner
              </Link>
              <Link to="/contact" className="text-primary font-semibold hover:underline">
                Contact
              </Link>
              {industry.slug === "cement" ? (
                <>
                  <Link to="/blog/cement-plant-loading-windows" className="text-primary font-semibold hover:underline">
                    Read more: plant loading windows
                  </Link>
                  <Link to="/blog/india-axle-load-gvw-limits-heavy-freight" className="text-primary font-semibold hover:underline">
                    Read more: axle load and GVW limits
                  </Link>
                  <Link to="/blog/plant-detention-tat-yard-gate-india" className="text-primary font-semibold hover:underline">
                    Read more: plant detention and TAT
                  </Link>
                  <Link to="/blog/epod-fastag-eway-bill-billing-india" className="text-primary font-semibold hover:underline">
                    Read more: ePOD and e-Way Bill billing
                  </Link>
                </>
              ) : null}
              {industry.slug === "steel-metals" ? (
                <>
                  <Link to="/blog/steel-coil-transport-basics" className="text-primary font-semibold hover:underline">
                    Read more: coil transport basics
                  </Link>
                  <Link to="/blog/india-axle-load-gvw-limits-heavy-freight" className="text-primary font-semibold hover:underline">
                    Read more: axle load and GVW limits
                  </Link>
                  <Link to="/blog/spot-market-vs-dedicated-fleet-india" className="text-primary font-semibold hover:underline">
                    Read more: spot vs dedicated fleets
                  </Link>
                  <Link to="/blog/plant-detention-tat-yard-gate-india" className="text-primary font-semibold hover:underline">
                    Read more: plant detention and TAT
                  </Link>
                  <Link to="/blog/epod-fastag-eway-bill-billing-india" className="text-primary font-semibold hover:underline">
                    Read more: ePOD and e-Way Bill billing
                  </Link>
                </>
              ) : null}
              {industry.slug === "coal-mining" || industry.slug === "industrial-logistics" ? (
                <Link to="/blog/planning-industrial-shipments" className="text-primary font-semibold hover:underline">
                  Read more: planning commercial shipments
                </Link>
              ) : null}
              {industry.slug === "manufacturing" ? (
                <>
                  <Link to="/blog/tms-evaluation-guide-indian-manufacturers" className="text-primary font-semibold hover:underline">
                    Read more: TMS evaluation for manufacturers
                  </Link>
                  <Link to="/blog/spot-market-vs-dedicated-fleet-india" className="text-primary font-semibold hover:underline">
                    Read more: spot vs dedicated fleets
                  </Link>
                  <Link to="/blog/plant-detention-tat-yard-gate-india" className="text-primary font-semibold hover:underline">
                    Read more: plant detention and TAT
                  </Link>
                  <Link to="/blog/epod-fastag-eway-bill-billing-india" className="text-primary font-semibold hover:underline">
                    Read more: ePOD and e-Way Bill billing
                  </Link>
                  <Link to="/blog/container-trucking-logistics-india" className="text-primary font-semibold hover:underline">
                    Read more: container trucking deep research
                  </Link>
                </>
              ) : null}
              {industry.slug === "chemicals" ? (
                <>
                  <Link to="/blog/planning-industrial-shipments" className="text-primary font-semibold hover:underline">
                    Read more: body type, payload, and plant windows
                  </Link>
                  <Link to="/blog/plant-detention-tat-yard-gate-india" className="text-primary font-semibold hover:underline">
                    Read more: plant detention and TAT
                  </Link>
                </>
              ) : null}
              {industry.slug === "fmcg" || industry.slug === "retail-distribution" ? (
                <>
                  <Link to="/blog/reduce-empty-return-trips" className="text-primary font-semibold hover:underline">
                    Read more: empty return trips on FTL
                  </Link>
                  <Link to="/blog/spot-market-vs-dedicated-fleet-india" className="text-primary font-semibold hover:underline">
                    Read more: spot vs dedicated fleets
                  </Link>
                  <Link to="/blog/epod-fastag-eway-bill-billing-india" className="text-primary font-semibold hover:underline">
                    Read more: ePOD and e-Way Bill billing
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy text-white">
        <div className="container mx-auto container-padding max-w-3xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Get a quote for {industry.title}</h2>
          <p className="text-gray-300 mb-8">
            WhatsApp the corridor, load type, and vehicle class. We quote company fleet, or you can post on TranZfort.
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
