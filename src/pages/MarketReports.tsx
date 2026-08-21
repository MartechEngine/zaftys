import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { ReportCover } from "@/components/market-reports/ReportCover";
import heroResources from "@/assets/hero-resources.webp";
import { pageHeroAlts } from "@/lib/page-heroes";
import { pageSeo } from "@/lib/page-seo";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { breadcrumbSchema, reportsCollectionSchema } from "@/lib/schema";
import {
  REPORT_SEGMENT_LABEL,
  formatReportDate,
  listReports,
} from "@/lib/market-reports-data";

const MarketReports = () => {
  const reports = listReports();

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.reports.title}
        description={pageSeo.reports.description}
        canonical="/reports"
        schema={[
          reportsCollectionSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: "Reports", path: "/reports" },
          ]),
        ]}
      />

      <PageHero
        badge={pageHeroCopy.reports.badge}
        title={pageHeroCopy.reports.h1}
        description={pageHeroCopy.reports.lead}
        imageSrc={heroResources}
        imageAlt={pageHeroAlts.reports}
      >
        <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20">
          {REPORT_SEGMENT_LABEL}
        </Badge>
      </PageHero>

      <section className="section-padding bg-surface">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-heading font-bold text-navy mb-2">All reports</h2>
              <p className="text-muted-foreground">{reports.length} published in logistics &amp; supply chain</p>
            </div>
            <Link to="/resources" className="text-primary font-semibold hover:underline text-sm">
              Back to Resources
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {reports.map((report) => (
              <Card
                key={report.slug}
                className="border border-border transition-all bg-white overflow-hidden flex flex-col w-full"
              >
                {report.coverImage ? (
                  <Link
                    to={`/reports/${report.slug}`}
                    className="block shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ReportCover src={report.coverImage} alt="" decorative />
                  </Link>
                ) : null}
                <CardContent className="p-6 flex flex-col flex-1 min-h-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                      {REPORT_SEGMENT_LABEL}
                    </Badge>
                    <time dateTime={report.publishedAt}>{formatReportDate(report.publishedAt)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{report.pageCount} pages</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy mb-3 leading-snug text-lg">
                    <Link
                      to={`/reports/${report.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {report.title}
                    </Link>
                  </h3>
                  {report.kpis && report.kpis.length > 0 ? (
                    <p className="text-xs text-navy/80 font-medium mb-3 leading-snug">
                      {report.kpis.map((k) => `${k.label}: ${k.value}`).join("  ·  ")}
                    </p>
                  ) : null}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{report.summary}</p>
                  <Link to={`/reports/${report.slug}`} className="mt-auto">
                    <Button variant="accent" className="w-full">
                      View report <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketReports;
