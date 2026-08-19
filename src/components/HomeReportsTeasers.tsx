import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { latestReports } from "@/lib/market-reports-data";
import { cn } from "@/lib/utils";

type HomeReportsTeasersProps = {
  /** Omit outer section wrapper and H2 when nested inside Home insights block */
  embedded?: boolean;
};

/** Isolated so Home can lazy-load report covers off the critical path. */
export default function HomeReportsTeasers({ embedded = false }: HomeReportsTeasersProps) {
  const reports = latestReports(embedded ? 4 : 6);
  if (reports.length === 0) return null;

  const unit =
    reports.length === 1 ? reports : [...reports, ...reports, ...reports];
  const track = reports.length === 1 ? reports : [...unit, ...unit];

  const gradientFrom = embedded ? "from-white" : "from-muted/30";

  const carousel = (
    <div className="relative overflow-hidden">
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r ${gradientFrom} to-transparent`}
          aria-hidden
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l ${gradientFrom} to-transparent`}
          aria-hidden
        />

        <div
          className={cn(
            "flex w-max gap-5 px-5 sm:px-8 lg:px-12 xl:px-16",
            reports.length > 1 &&
              "animate-scroll-ltr hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none",
          )}
          aria-label="Latest research reports"
        >
          {track.map((report, index) => (
            <Link
              key={`${report.slug}-${index}`}
              to={`/reports/${report.slug}`}
              className="group w-64 shrink-0 rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="bg-[#061a33] h-36 flex items-center justify-center">
                {report.coverImage ? (
                  <img
                    src={report.coverImage}
                    alt=""
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </div>
              <p className="px-3 py-2.5 text-sm font-heading font-semibold text-navy leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {report.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
  );

  if (embedded) {
    return (
      <div aria-labelledby="home-reports-heading">
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <h3 id="home-reports-heading" className="text-lg font-heading font-bold text-navy">
            Market reports
          </h3>
          <Link to="/reports" className="text-sm text-primary font-semibold hover:underline inline-flex items-center shrink-0">
            All reports <ArrowRight className="ml-1.5" size={14} />
          </Link>
        </div>
        {carousel}
      </div>
    );
  }

  return (
    <section className="py-12 bg-muted/30" aria-labelledby="home-reports-heading">
      <div className="container mx-auto container-padding">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h2 id="home-reports-heading" className="text-3xl font-heading font-bold text-navy">
            Our research reports
          </h2>
          <Link to="/reports" className="text-sm text-primary font-semibold hover:underline inline-flex items-center shrink-0">
            All reports <ArrowRight className="ml-1.5" size={14} />
          </Link>
        </div>
      </div>
      {carousel}
    </section>
  );
}
