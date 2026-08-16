import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { getReportBySlug } from "@/lib/market-reports-data";
import NotFound from "@/pages/NotFound";
import { trackEvent } from "@/lib/analytics";
import { ReportDownloadGate } from "@/components/market-reports/ReportDownloadGate";
import { gatedReportPdfUrl, hasReportAccess } from "@/lib/report-access";

const ReportPdfReader = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const report = slug ? getReportBySlug(slug) : undefined;
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!report) return;
    if (hasReportAccess()) {
      const url = gatedReportPdfUrl(report.slug);
      setPdfUrl(url);
      trackEvent("report_pdf_open", { page: report.slug });
    } else {
      setPdfUrl(null);
    }
  }, [report?.slug]);

  if (!report) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <SEO
        title={report.seoTitle}
        description={report.seoDescription}
        canonical={`/reports/${report.slug}`}
        noindex
        robots="noindex, follow"
      />

      <div className="border-b border-border bg-white sticky top-0 z-20">
        <div className="container mx-auto container-padding py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/reports/${report.slug}`}
              className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
            >
              <ArrowLeft size={16} /> Back to sneak peek
            </Link>
            <p className="text-sm text-muted-foreground truncate mt-1">{report.title}</p>
          </div>
          {pdfUrl ? (
            <Button asChild variant="accent" size="sm">
              <a href={gatedReportPdfUrl(report.slug, { download: true }) ?? pdfUrl}>
                <Download className="mr-2" size={16} /> Download PDF
              </a>
            </Button>
          ) : null}
        </div>
      </div>

      {pdfUrl ? (
        <div className="flex-1 bg-muted/40">
          <iframe
            title={`${report.title} PDF`}
            src={pdfUrl}
            className="w-full min-h-[calc(100vh-5rem)] border-0"
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-6 bg-muted/30">
          <div className="w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-3">
              <span className="rounded-md bg-navy/5 p-2 text-navy">
                <Lock size={18} />
              </span>
              <div>
                <h1 className="font-heading text-xl font-bold text-navy">Unlock to read online</h1>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Company email required before the full PDF opens in the browser.
                </p>
              </div>
            </div>
            <ReportDownloadGate
              reportSlug={report.slug}
              reportTitle={report.title}
              autoOpen
              onUnlockedRead={() => {
                const url = gatedReportPdfUrl(report.slug);
                setPdfUrl(url);
                if (url) trackEvent("report_pdf_open", { page: report.slug });
              }}
              onUnlockedDownload={(url) => {
                window.location.assign(url);
              }}
            >
              {({ requestRead }) => (
                <div className="space-y-3">
                  <Button type="button" variant="accent" className="w-full" onClick={requestRead}>
                    Unlock full report
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={() => navigate(`/reports/${report.slug}`)}>
                    Back to sneak peek
                  </Button>
                </div>
              )}
            </ReportDownloadGate>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportPdfReader;
