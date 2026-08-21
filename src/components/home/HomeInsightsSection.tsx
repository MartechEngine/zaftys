import { BarChart3, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { LazyHomeReportsTeasers } from "@/components/LazyHomeReportsTeasers";
import { LazyHomeBlogTeasers } from "@/components/LazyHomeBlogTeasers";
import { MarketingEyebrow, MarketingTile } from "@/components/marketing/MarketingChrome";
import { homeCopy } from "@/lib/home-copy";
import { paths } from "@/lib/site-paths";

export function HomeInsightsSection() {
  const { insights } = homeCopy;

  return (
    <section id="insights" aria-labelledby="insights-heading" className="section-band bg-surface">
      <div className="section-band-inner">
        <div className="mb-10 max-w-2xl">
          <MarketingEyebrow>{insights.eyebrow}</MarketingEyebrow>
          <h2 id="insights-heading" className="font-heading text-3xl font-bold text-navy md:text-4xl">
            {insights.h2}
          </h2>
          <p className="mt-3 text-muted-foreground">{insights.lead}</p>
        </div>

        <div className="mb-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          <Link to={paths.intelligence.hub} className="group block">
            <MarketingTile className="h-full transition-colors group-hover:border-primary/40">
              <div className="flex gap-4">
                <Brain className="mt-0.5 shrink-0 text-accent" size={22} />
                <div>
                  <p className="font-heading font-bold text-navy">{insights.intelligence.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{insights.intelligence.description}</p>
                </div>
              </div>
            </MarketingTile>
          </Link>
          <Link to={paths.reports} className="group block">
            <MarketingTile className="h-full transition-colors group-hover:border-primary/40">
              <div className="flex gap-4">
                <BarChart3 className="mt-0.5 shrink-0 text-accent" size={22} />
                <div>
                  <p className="font-heading font-bold text-navy">{insights.reports.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{insights.reports.description}</p>
                </div>
              </div>
            </MarketingTile>
          </Link>
        </div>

        <div className="space-y-10">
          <LazyHomeReportsTeasers embedded />
          <LazyHomeBlogTeasers embedded />
        </div>
      </div>
    </section>
  );
}
