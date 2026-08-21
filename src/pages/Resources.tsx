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
import { pageHeroCopy } from "@/lib/page-hero-copy";
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
        badge={pageHeroCopy.resources.badge}
        title={pageHeroCopy.resources.h1}
        description={pageHeroCopy.resources.lead}
        imageSrc={heroResources}
        imageAlt={pageHeroAlts.resources}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <Link to="/reports">
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
            <Card className="border border-border bg-white shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-primary/35 hover:shadow-md">
              <CardContent className="flex h-full flex-col p-8 md:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center border border-border bg-surface text-primary shadow-sm">
                  <FileText size={24} />
                </div>
                <h2 className="text-2xl font-heading font-bold text-navy mb-3">Market Reports</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                  Institutional market reports on global logistics and digital freight matching: size, forecast, ToC, methodology, and gated PDF downloads (company email required). {reportCount} reports available.
                </p>
                <Link to="/reports">
                  <Button variant="accent" className="w-full sm:w-auto">
                    Browse reports <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-border bg-white shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-primary/35 hover:shadow-md">
              <CardContent className="flex h-full flex-col p-8 md:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center border border-border bg-surface text-primary shadow-sm">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-2xl font-heading font-bold text-navy mb-3">Blog</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                  Practical guides on plant windows, FTL, empty kilometres, TMS, and the marketplace.
                  {postCount} articles published.
                </p>
                <Link to="/blog">
                  <Button variant="outline-brand" className="w-full sm:w-auto">
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
