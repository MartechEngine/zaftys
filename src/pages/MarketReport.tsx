import { useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { MarketReportLayout } from "@/components/market-reports/MarketReportLayout";
import { getReportBySlug, reportModifiedAt } from "@/lib/market-reports-data";
import { breadcrumbSchema, marketReportSchema } from "@/lib/schema";
import NotFound from "@/pages/NotFound";

const MarketReport = () => {
  const { slug } = useParams<{ slug: string }>();
  const report = slug ? getReportBySlug(slug) : undefined;

  if (!report) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={report.seoTitle}
        description={report.seoDescription}
        canonical={`/resources/reports/${report.slug}`}
        type="article"
        publishedTime={report.publishedAt}
        modifiedTime={reportModifiedAt(report)}
        schema={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: "Reports", path: "/resources/reports" },
            { name: report.title, path: `/resources/reports/${report.slug}` },
          ]),
          marketReportSchema(report),
        ]}
      />
      <MarketReportLayout report={report} />
    </div>
  );
};

export default MarketReport;
