import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { MarketReportLayout } from "@/components/market-reports/MarketReportLayout";
import { getReportBySlug, reportModifiedAt, reportShareImage } from "@/lib/market-reports-data";
import { breadcrumbSchema, faqPageSchema, marketReportSchema } from "@/lib/schema";
import NotFound from "@/pages/NotFound";
import { trackEvent } from "@/lib/analytics";

const MarketReport = () => {
  const { slug } = useParams<{ slug: string }>();
  const report = slug ? getReportBySlug(slug) : undefined;

  useEffect(() => {
    if (report) {
      trackEvent("report_view", { page: report.slug });
    }
  }, [report?.slug]);

  if (!report) {
    return <NotFound />;
  }

  const schema = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources" },
      { name: "Reports", path: "/reports" },
      { name: report.title, path: `/reports/${report.slug}` },
    ]),
    marketReportSchema(report),
    ...(report.faq && report.faq.length > 0 ? [faqPageSchema(report.faq)] : []),
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={report.seoTitle}
        description={report.seoDescription}
        canonical={`/reports/${report.slug}`}
        image={reportShareImage(report)}
        type="article"
        publishedTime={report.publishedAt}
        modifiedTime={reportModifiedAt(report)}
        schema={schema}
      />
      <MarketReportLayout report={report} />
    </div>
  );
};

export default MarketReport;
