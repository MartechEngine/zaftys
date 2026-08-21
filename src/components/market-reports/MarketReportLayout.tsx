import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CTAGroup } from "@/components/CTAGroup";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ReportCover } from "@/components/market-reports/ReportCover";
import { ReportDownloadGate } from "@/components/market-reports/ReportDownloadGate";
import {
  type MarketReport,
  type ReportTocItem,
  REPORT_SEGMENT_LABEL,
  formatReportDate,
  relatedReports,
} from "@/lib/market-reports-data";
import { getPostBySlug } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

type MarketReportLayoutProps = {
  report: MarketReport;
};

function ReportCta({ report }: { report: MarketReport }) {
  const cta = report.cta;
  if ("to" in cta) {
    return (
      <Link to={cta.to}>
        <Button size="lg" variant="on-dark">
          {cta.label} <ArrowRight className="ml-2" size={16} />
        </Button>
      </Link>
    );
  }
  return <WhatsAppButton label={cta.label} />;
}

function reportKpis(report: MarketReport) {
  if (report.kpis && report.kpis.length > 0) return report.kpis;
  return report.snapshot.slice(0, 3).map((item) => ({
    label: item.label,
    value: item.value,
    note: item.note,
  }));
}

function reportToc(report: MarketReport): readonly ReportTocItem[] {
  if (report.toc && report.toc.length > 0) return report.toc;
  return report.tableOfContents.map((title) => ({ title }));
}

function reportTrust(report: MarketReport) {
  if (report.trustSignals && report.trustSignals.length > 0) return report.trustSignals;
  return [
    { label: "Shipper-facing", detail: "Built for industrial freight decisions" },
    { label: "Ops context", detail: "Corridor notes grounded in live lanes" },
    { label: "Email unlock", detail: "Company email unlocks download and online reading" },
  ] as const;
}

function DownloadButtons({
  report,
  className,
  accent = true,
  onDark = false,
}: {
  report: MarketReport;
  className?: string;
  accent?: boolean;
  onDark?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <ReportDownloadGate
      reportSlug={report.slug}
      reportTitle={report.title}
      onUnlockedRead={() => navigate(`/reports/${report.slug}/read`)}
    >
      {({ requestDownload, requestRead }) => (
        <CTAGroup className={cn("justify-start", className)}>
          <Button
            type="button"
            size="lg"
            variant={accent ? "accent" : onDark ? "on-dark-outline" : "secondary"}
            onClick={requestDownload}
          >
            <Download className="mr-2" size={18} /> Download PDF
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className={
              onDark
                ? "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                : accent
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : undefined
            }
            onClick={requestRead}
          >
            <BookOpen className="mr-2" size={18} /> Read online
          </Button>
        </CTAGroup>
      )}
    </ReportDownloadGate>
  );
}

export function MarketReportLayout({ report }: MarketReportLayoutProps) {
  const related = relatedReports(report);
  const relatedBlog = report.relatedBlogSlugs
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean);
  const kpis = reportKpis(report);
  const toc = reportToc(report);
  const trust = reportTrust(report);
  const overview =
    report.overview && report.overview.length > 0 ? report.overview : [report.summary];

  return (
    <>
      <section className="relative bg-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 80% 20%, hsl(25 100% 55% / 0.35), transparent 50%), linear-gradient(135deg, transparent 40%, hsl(220 60% 10% / 0.8) 100%)",
          }}
          aria-hidden
        />
        <div className="container mx-auto container-padding relative py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/reports" className="hover:text-white transition-colors">
                  Reports
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90 font-medium line-clamp-1">{report.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/15 uppercase tracking-wide text-[10px]">
                {REPORT_SEGMENT_LABEL}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-bold leading-tight mb-3">
                {report.title}
              </h1>
              {report.subtitle ? (
                <p className="text-base md:text-lg text-white/75 leading-relaxed mb-5 max-w-3xl">
                  {report.subtitle}
                </p>
              ) : (
                <p className="text-base md:text-lg text-white/75 leading-relaxed mb-5 max-w-3xl">
                  {report.summary}
                </p>
              )}

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/60 mb-8">
                {report.reportId ? (
                  <>
                    <span>
                      Report ID: <span className="text-white/90 font-medium">{report.reportId}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                  </>
                ) : null}
                <time dateTime={report.publishedAt}>Published {formatReportDate(report.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span>{report.pageCount} page PDF</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">{kpi.label}</p>
                    <p className="font-heading font-bold text-xl text-white leading-snug">{kpi.value}</p>
                    {kpi.note ? <p className="text-xs text-white/45 mt-1">{kpi.note}</p> : null}
                  </div>
                ))}
              </div>

              <DownloadButtons report={report} />
            </div>

            <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-4 w-full max-w-xl mx-auto lg:max-w-none">
              <div className="border border-white/15 bg-white text-foreground shadow-xl overflow-hidden">
                {report.coverImage ? (
                  <ReportCover
                    src={report.coverImage}
                    alt={`${report.title} report cover`}
                    className="border-b border-border"
                  />
                ) : (
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
                    <FileText className="text-primary shrink-0" size={22} />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Full report</p>
                      <p className="font-heading font-bold text-navy text-sm">{report.pageCount} pages · PDF</p>
                    </div>
                  </div>
                )}
                <div className="p-5 space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Unlock the {report.pageCount}-page PDF with your company email, then download or read in your browser.
                  </p>
                  <ReportDownloadGate
                    reportSlug={report.slug}
                    reportTitle={report.title}
                    onUnlockedRead={() => {
                      window.location.assign(`/reports/${report.slug}/read`);
                    }}
                  >
                    {({ requestDownload, requestRead }) => (
                      <div className="space-y-3">
                        <Button type="button" size="lg" variant="accent" className="w-full" onClick={requestDownload}>
                          <Download className="mr-2" size={18} /> Download PDF
                        </Button>
                        <Button
                          type="button"
                          size="lg"
                          variant="outline"
                          className="w-full border-primary text-primary"
                          onClick={requestRead}
                        >
                          <BookOpen className="mr-2" size={18} /> Read online
                        </Button>
                      </div>
                    )}
                  </ReportDownloadGate>
                  {"whatsapp" in report.cta ? (
                    <div className="pt-1">
                      <WhatsAppButton label="Discuss on WhatsApp" className="w-full" />
                    </div>
                  ) : (
                    <Link to={report.cta.to} className="block">
                      <Button size="lg" variant="secondary" className="w-full">
                        {report.cta.label}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="container mx-auto container-padding py-6">
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trust.map((item, index) => (
              <li key={item.label} className="flex gap-3">
                <span className="font-heading font-bold text-accent text-lg leading-none pt-0.5">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-heading font-bold text-navy text-sm">{item.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <article className="section-padding bg-white">
        <div className="container mx-auto container-padding max-w-4xl">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full h-auto flex flex-wrap justify-start gap-1 bg-muted/60 p-1 mb-8">
              <TabsTrigger value="overview" className="flex-1 min-w-[7rem]">
                Overview
              </TabsTrigger>
              <TabsTrigger value="toc" className="flex-1 min-w-[7rem]">
                Table of contents
              </TabsTrigger>
              <TabsTrigger value="methodology" className="flex-1 min-w-[7rem]">
                Methodology
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-10 mt-0">
              <section>
                <h2 className="text-2xl font-heading font-bold text-navy mb-4">Description</h2>
                <div className="space-y-4">
                  {overview.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="text-muted-foreground leading-relaxed text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-navy mb-4">Market snapshot</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {report.snapshot.map((item) => (
                    <div key={item.label} className="border border-border bg-surface p-4">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-heading font-bold text-navy text-lg leading-snug">{item.value}</p>
                      {item.note ? <p className="text-xs text-muted-foreground mt-1">{item.note}</p> : null}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-navy mb-4">Coverage</h2>
                <ul className="flex flex-wrap gap-2">
                  {report.coverage.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-navy mb-4">Key takeaways</h2>
                <ul className="space-y-3">
                  {report.takeaways.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg bg-surface border border-border p-4 text-foreground leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </TabsContent>

            <TabsContent value="toc" className="mt-0">
              <h2 className="text-2xl font-heading font-bold text-navy mb-6">Table of contents</h2>
              <ol className="space-y-5">
                {toc.map((chapter, index) => (
                  <li key={chapter.title} className="border-b border-border pb-4 last:border-0">
                    <p className="font-heading font-bold text-navy">
                      <span className="text-muted-foreground font-normal mr-2">{index + 1}.</span>
                      {chapter.title}
                    </p>
                    {chapter.children && chapter.children.length > 0 ? (
                      <ul className="mt-2 ml-6 space-y-1.5">
                        {chapter.children.map((child) => (
                          <li key={child} className="text-sm text-muted-foreground leading-relaxed list-disc">
                            {child}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ol>
            </TabsContent>

            <TabsContent value="methodology" className="mt-0 space-y-8">
              <section>
                <h2 className="text-2xl font-heading font-bold text-navy mb-4">Methodology</h2>
                <ul className="space-y-3">
                  {report.methodology.map((item) => (
                    <li
                      key={item}
                      className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-accent/40"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {report.sources && report.sources.length > 0 ? (
                <section>
                  <h2 className="text-xl font-heading font-bold text-navy mb-3">Sources</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {report.sources.map((source) => (
                      <li key={source.label}>
                        {source.url ? (
                          <a
                            href={source.url}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {source.label}
                          </a>
                        ) : (
                          source.label
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </TabsContent>
          </Tabs>

          <div className="mt-12 pt-8 border-t border-border">
            <DownloadButtons report={report} />
          </div>
        </div>
      </article>

      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto container-padding max-w-3xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Need this applied to your lanes?</h2>
          <p className="text-gray-300 mb-8">
            Share your corridor and load type. ZAFTYS Logistics will recommend a practical transport approach.
          </p>
          <CTAGroup>
            <ReportCta report={report} />
          </CTAGroup>
        </div>
      </section>

      {(related.length > 0 || relatedBlog.length > 0) && (
        <section className="section-padding bg-surface">
          <div className="container mx-auto container-padding max-w-4xl">
            {related.length > 0 ? (
              <div className="mb-10">
                <h2 className="text-2xl font-heading font-bold text-navy mb-6">Related reports</h2>
                <ul className="space-y-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/reports/${item.slug}`}
                        className="text-primary font-semibold hover:underline inline-flex items-center gap-2"
                      >
                        {item.title} <ArrowRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {relatedBlog.length > 0 ? (
              <div>
                <h2 className="text-2xl font-heading font-bold text-navy mb-6">Related blog posts</h2>
                <ul className="space-y-3">
                  {relatedBlog.map((post) =>
                    post ? (
                      <li key={post.slug}>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-primary font-semibold hover:underline inline-flex items-center gap-2"
                        >
                          {post.title} <ArrowRight size={14} />
                        </Link>
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      )}
    </>
  );
}
