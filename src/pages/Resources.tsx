import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { CTAGroup } from "@/components/CTAGroup";
import heroResources from "@/assets/hero-resources.jpg";
import { pageHeroAlts } from "@/lib/page-heroes";
import { pageSeo } from "@/lib/page-seo";
import { breadcrumbSchema, resourcesHubSchema } from "@/lib/schema";
import { listReports } from "@/lib/market-reports-data";
import { listPosts } from "@/lib/blog-data";

const Resources = () => {
  const reportCount = listReports().length;
  const postCount = listPosts().length;

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.resources.title}
        description={pageSeo.resources.description}
        canonical="/resources"
        schema={[
          resourcesHubSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
          ]),
        ]}
      />

      <PageHero
        badge="Resources"
        title="ZAFTYS Logistics Resources  -  Blog & Market Reports."
        description="Practical corridor guides and logistics & supply chain market reports from ZAFTYS Logistics operations across industrial India."
        imageSrc={heroResources}
        imageAlt={pageHeroAlts.resources}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <Link to="/resources/reports">
            <Button size="lg" variant="accent">
              Market Reports <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
          <Link to="/blog">
            <Button size="lg" variant="on-dark-outline">
              Read the Blog
            </Button>
          </Link>
        </CTAGroup>
      </PageHero>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 md:p-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <FileText size={24} />
                </div>
                <h2 className="text-2xl font-heading font-bold text-navy mb-3">Market Reports</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                  Logistics &amp; supply chain intelligence for industrial shippers  -  sneak peeks with ToC,
                  methodology, and downloadable PDFs. {reportCount} reports available.
                </p>
                <Link to="/resources/reports">
                  <Button variant="accent" className="w-full sm:w-auto">
                    Browse reports <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 md:p-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-2xl font-heading font-bold text-navy mb-3">Blog</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                  Practical guides on plant windows, steel and cement freight, empty miles, and TMS for
                  heavy-haul operations. {postCount} articles published.
                </p>
                <Link to="/blog">
                  <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white">
                    Open blog <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
