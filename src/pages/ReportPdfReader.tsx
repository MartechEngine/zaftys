import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { getReportBySlug } from "@/lib/market-reports-data";
import NotFound from "@/pages/NotFound";
import { trackEvent } from "@/lib/analytics";

const ReportPdfReader = () => {
  const { slug } = useParams<{ slug: string }>();
  const report = slug ? getReportBySlug(slug) : undefined;

  useEffect(() => {
    if (report) {
      trackEvent("report_pdf_open", { page: report.slug });
    }
  }, [report?.slug]);

  if (!report) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <SEO
        title={`Read  -  ${report.seoTitle}`}
        description={report.seoDescription}
        canonical={`/resources/reports/${report.slug}/read`}
        robots="noindex, follow"
      />

      <div className="border-b border-border bg-white sticky top-0 z-20">
        <div className="container mx-auto container-padding py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/resources/reports/${report.slug}`}
              className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
            >
              <ArrowLeft size={16} /> Back to sneak peek
            </Link>
            <p className="text-sm text-muted-foreground truncate mt-1">{report.title}</p>
          </div>
          <Button asChild variant="accent" size="sm">
            <a href={report.pdfPath} download>
              <Download className="mr-2" size={16} /> Download PDF
            </a>
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-muted/40">
        <iframe
          title={`${report.title} PDF`}
          src={report.pdfPath}
          className="w-full min-h-[calc(100vh-5rem)] border-0"
        />
      </div>
    </div>
  );
};

export default ReportPdfReader;
