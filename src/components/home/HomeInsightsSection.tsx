import { BarChart3, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { LazyHomeReportsTeasers } from "@/components/LazyHomeReportsTeasers";
import { LazyHomeBlogTeasers } from "@/components/LazyHomeBlogTeasers";
import { homeCopy } from "@/lib/home-copy";
import { paths } from "@/lib/site-paths";

export function HomeInsightsSection() {
  const { insights } = homeCopy;

  return (
    <section id="insights" aria-labelledby="insights-heading" className="section-padding bg-muted/30">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">{insights.eyebrow}</p>
          <h2 id="insights-heading" className="text-3xl font-heading font-bold mb-4 text-navy">
            {insights.h2}
          </h2>
          <p className="text-muted-foreground">{insights.lead}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
          <Link
            to={paths.intelligence.hub}
            className="p-5 rounded-xl bg-white border border-border hover:border-primary/40 transition-colors flex gap-4 items-start"
          >
            <Brain className="text-accent shrink-0 mt-0.5" size={24} />
            <div>
              <p className="font-heading font-bold text-navy mb-1">{insights.intelligence.title}</p>
              <p className="text-sm text-muted-foreground">{insights.intelligence.description}</p>
            </div>
          </Link>
          <Link
            to={paths.reports}
            className="p-5 rounded-xl bg-white border border-border hover:border-primary/40 transition-colors flex gap-4 items-start"
          >
            <BarChart3 className="text-accent shrink-0 mt-0.5" size={24} />
            <div>
              <p className="font-heading font-bold text-navy mb-1">{insights.reports.title}</p>
              <p className="text-sm text-muted-foreground">{insights.reports.description}</p>
            </div>
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
