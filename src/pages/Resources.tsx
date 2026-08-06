import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { pageHeroImages } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import { pageSeo } from "@/lib/page-seo";
import { resourcesPageSchema } from "@/lib/schema";
import { resourceCategories, resourceLibrary } from "@/lib/resources-data";

const Resources = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.resources.title}
        description={pageSeo.resources.description}
        canonical="/resources"
        schema={resourcesPageSchema}
        noindex
      />

      <PageHero
        badge="Knowledge Center"
        title="Knowledge That Helps You Build Better Logistics."
        description="Practical guidance from real logistics experience  -  operations, supply chain, technology, and industry insights for teams that cannot afford guesswork."
        imageSrc={pageHeroImages.resources.src}
        imageAlt={pageHeroImages.resources.alt}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <a href="#library">
            <Button size="lg" variant="on-dark">Browse Articles</Button>
          </a>
          <HeroEmailButton
            label="Ask a Logistics Question"
            variant="on-dark-outline"
            subject={heroMailSubjects.resources}
            body={heroMailBodies.resources}
          />
        </CTAGroup>
      </PageHero>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">Sharing Experience Creates Better Supply Chains</h2>
            <p className="text-muted-foreground leading-relaxed">
              When businesses understand logistics better, they make better decisions. The ZAFTYS Knowledge Center brings together operational guidance developed from active industrial corridors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceCategories.map((cat) => (
              <Card key={cat.id} className="border-none shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6">
                  <BookOpen className="text-primary mb-3" size={24} />
                  <h3 className="font-heading font-bold text-navy mb-2">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{cat.description}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {cat.topics.slice(0, 4).map((topic) => (
                      <li key={topic}>
                        <Badge variant="secondary" className="text-[10px] font-medium">
                          {topic}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="library" className="section-padding bg-muted/30 scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-navy mb-4">Resource Library</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Articles, guides, checklists, and webinars  -  practical content for logistics professionals. New resources publish regularly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {resourceLibrary.map((item) => (
              <Card key={item.id} className="border-none shadow-sm bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wide shrink-0">
                      {item.type}
                    </Badge>
                    {item.status === "coming-soon" && (
                      <Badge className="bg-muted text-muted-foreground text-[10px]">Coming soon</Badge>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto container-padding max-w-2xl">
          <h2 className="text-4xl font-heading font-bold mb-4">Start Learning. Keep Improving.</h2>
          <p className="text-gray-200 mb-8">
            Explore insights, join our update list, or speak with our team about logistics programs for your business.
          </p>
          <CTAGroup>
            <WhatsAppButton label="Talk to Our Team" />
            <Link to="/services">
              <Button size="lg" variant="on-dark-outline">
                View Services <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default Resources;
