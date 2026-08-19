import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, TrendingUp, FileText, Brain, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { paths } from "@/lib/site-paths";
import { pageSeo } from "@/lib/page-seo";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import heroResources from "@/assets/hero-resources.jpg";
import type { LucideIcon } from "lucide-react";

type IntelligenceModule = {
  id: string;
  icon: LucideIcon;
  title: string;
  status: string;
  statusVariant: "default" | "secondary" | "outline";
  lead: string;
  points: readonly string[];
  cta: { label: string; path: string };
};

const modules: readonly IntelligenceModule[] = [
  {
    id: "analytics",
    icon: BarChart3,
    title: "ZAFTYS Analytics",
    status: "Available",
    statusVariant: "default",
    lead: "Transportation, freight, carrier, and market data in one analytics layer built on operations ZAFTYS runs.",
    points: [
      "Lane and corridor performance",
      "Carrier and fleet performance against SLAs",
      "Cost analysis connected to trip records",
      "Operational data from ZAFTYS TMS where deployed",
    ],
    cta: { label: "Explore analytics", path: paths.intelligence.analytics },
  },
  {
    id: "freight-rates",
    icon: TrendingUp,
    title: "Freight Rate Intelligence",
    status: "Beta",
    statusVariant: "secondary",
    lead: "Lane-level freight rate context for corridors you actually run, not generic market averages.",
    points: [
      "Corridor rate movement over time",
      "Context for contract and spot decisions",
      "Linked to operational and market data",
      "Rolling out in phases with early access",
    ],
    cta: { label: "Learn about rate intelligence", path: paths.intelligence.freightRates },
  },
  {
    id: "market",
    icon: FileText,
    title: "Market Intelligence",
    status: "Available",
    statusVariant: "default",
    lead: "Institutional research on logistics markets, freight trends, and digital transportation from ZAFTYS Analytics.",
    points: [
      "Global logistics market reports",
      "Digital freight matching research",
      "Gated PDF downloads with company email",
      "Operations-informed research, not generic summaries",
    ],
    cta: { label: "Browse market reports", path: paths.reports },
  },
  {
    id: "ai",
    icon: Brain,
    title: "Supply Chain AI",
    status: "Research",
    statusVariant: "outline",
    lead: "AI capabilities designed for transportation and supply-chain workflows: exception analysis, operational queries, and decision support.",
    points: [
      "AI logistics assistant for desk workflows",
      "Exception and delay analysis",
      "Forecasting and capacity intelligence in development",
      "Each capability labeled by release status before launch",
    ],
    cta: { label: "Supply chain AI roadmap", path: paths.intelligence.ai },
  },
];

function ModuleSection({ module, reversed }: { module: IntelligenceModule; reversed?: boolean }) {
  const Icon = module.icon;
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reversed ? "lg:[direction:rtl]" : ""}`}
    >
      <div className={reversed ? "lg:[direction:ltr]" : ""}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Icon size={24} />
          </div>
          <Badge variant={module.statusVariant}>{module.status}</Badge>
        </div>
        <h2 className="text-3xl font-heading font-bold text-navy mb-4">{module.title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{module.lead}</p>
        <ul className="space-y-3 mb-8">
          {module.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18} />
              <span className="text-muted-foreground">{point}</span>
            </li>
          ))}
        </ul>
        <Link to={module.cta.path}>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            {module.cta.label} <ArrowRight className="ml-2" size={16} />
          </Button>
        </Link>
      </div>
      <div
        className={`rounded-xl border border-border bg-muted/30 p-10 min-h-[240px] flex flex-col justify-center ${reversed ? "lg:[direction:ltr]" : ""}`}
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">{module.status}</p>
        <p className="text-2xl font-heading font-bold text-navy mb-3">{module.title}</p>
        <p className="text-muted-foreground leading-relaxed">{module.lead}</p>
      </div>
    </div>
  );
}

const IntelligenceHub = () => (
  <div className="min-h-screen bg-background font-sans">
    <SEO
      title={pageSeo.intelligenceHub.title}
      description={pageSeo.intelligenceHub.description}
      canonical={paths.intelligence.hub}
      schema={[
        organizationSchema,
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Intelligence", path: paths.intelligence.hub },
        ]),
      ]}
    />
    <PageHero
      badge={pageHeroCopy.intelligenceHub.badge}
      title={pageHeroCopy.intelligenceHub.h1}
      description={pageHeroCopy.intelligenceHub.lead}
      imageSrc={heroResources}
      imageAlt="ZAFTYS logistics intelligence"
    >
      <CTAGroup className="justify-start sm:justify-start">
        <HeroEmailButton
          label="Explore Logistics Intelligence"
          subject="Logistics intelligence inquiry"
          body="Hi ZAFTYS,\n\nI'd like to explore logistics intelligence.\n\nCompany:\nUse case:\n\n"
        />
        <Link to={paths.reports}>
          <Button size="lg" variant="on-dark-outline">View Market Reports</Button>
        </Link>
      </CTAGroup>
    </PageHero>

    <section className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl font-heading font-bold mb-4 text-primary">Intelligence built on operations</h2>
          <p className="text-lg text-muted-foreground">
            Analytics, freight intelligence, market research, and AI layered on transportation ZAFTYS actually runs.
            Capabilities are labeled by availability.
          </p>
        </div>
        <div className="space-y-24">
          {modules.map((module, index) => (
            <ModuleSection key={module.id} module={module} reversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-muted/30">
      <div className="container mx-auto container-padding max-w-3xl text-center">
        <h2 className="text-3xl font-heading font-bold text-navy mb-4">Connected to ZAFTYS TMS</h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Intelligence works best when operational data flows from dispatch, fleet, and delivery close-out.
          ZAFTYS TMS is the system we run on our own trips every day.
        </p>
        <CTAGroup>
          <Link to={paths.technology.tms}>
            <Button variant="accent">See ZAFTYS TMS</Button>
          </Link>
          <Link to={paths.logistics.hub}>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Logistics services
            </Button>
          </Link>
        </CTAGroup>
      </div>
    </section>

    <section className="py-20 bg-navy text-white">
      <div className="container mx-auto container-padding text-center">
        <h2 className="text-3xl font-heading font-bold mb-6">Turn transportation data into decisions</h2>
        <CTAGroup>
          <HeroEmailButton
            label="Explore Logistics Intelligence"
            subject="Logistics intelligence inquiry"
            body="Hi ZAFTYS,\n\nI'd like to explore logistics intelligence.\n\n"
            variant="on-dark"
          />
          <Link to={paths.reports}>
            <Button variant="on-dark-outline">Browse Market Reports</Button>
          </Link>
        </CTAGroup>
      </div>
    </section>
  </div>
);

export default IntelligenceHub;
