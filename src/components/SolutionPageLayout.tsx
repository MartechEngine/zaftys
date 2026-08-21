import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MarketingEyebrow, MarketingFinalCta, MarketingTile } from "@/components/marketing/MarketingChrome";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import heroServices from "@/assets/hero-services.jpg";

export type SolutionPageProps = {
  seo: { title: string; description: string };
  canonical: string;
  badge: string;
  h1: string;
  lead: string;
  breadcrumbs: { name: string; path: string }[];
  heroImage?: string;
  heroImageAlt?: string;
  features: readonly { title: string; description: string }[];
  highlights?: readonly string[];
  relatedLinks?: readonly { name: string; path: string }[];
  primaryCta: "quote" | "contract" | "container" | "demo" | "network" | "intelligence" | "partner";
  secondaryLink?: { label: string; path: string };
  children?: ReactNode;
};

const ctaConfig = {
  quote: {
    label: "Request Transportation",
    subject: "Freight quote request",
    body: "Hi ZAFTYS,\n\nI'd like to request transportation capacity.\n\nFrom:\nTo:\nLoad type:\nTimeline:\n\n",
    whatsapp: true,
  },
  contract: {
    label: "Discuss Your Contract Requirement",
    subject: "Contract logistics inquiry",
    body: "Hi ZAFTYS,\n\nI'd like to discuss a contract logistics requirement.\n\nCompany:\nCorridor / lanes:\nVolume:\nTimeline:\n\n",
    whatsapp: false,
  },
  container: {
    label: "Request Container Capacity",
    subject: "Container transportation inquiry",
    body: "Hi ZAFTYS,\n\nI'd like to request container transportation capacity.\n\nOrigin:\nDestination:\nContainer type:\nTimeline:\n\n",
    whatsapp: true,
  },
  demo: {
    label: "Book a TMS Demo",
    subject: "ZAFTYS TMS demo request",
    body: "Hi ZAFTYS,\n\nI'd like to book a demo of ZAFTYS TMS.\n\nCompany:\nRole:\nBest time to connect:\n\n",
    whatsapp: false,
  },
  network: {
    label: "Join the Network",
    subject: "TranZfort network inquiry",
    body: "Hi ZAFTYS,\n\nI'd like to learn about joining the transportation network.\n\nCompany:\nFleet size:\nCorridors:\n\n",
    whatsapp: false,
  },
  intelligence: {
    label: "Explore Logistics Intelligence",
    subject: "Logistics intelligence inquiry",
    body: "Hi ZAFTYS,\n\nI'd like to explore ZAFTYS logistics intelligence.\n\nCompany:\nUse case:\n\n",
    whatsapp: false,
  },
  partner: {
    label: "Register as Transport Partner",
    subject: "TranZfort partner inquiry",
    body: "Hi ZAFTYS,\n\nI'd like to register as a transport partner.\n\nCompany:\nFleet size:\nCorridors:\n\n",
    whatsapp: false,
  },
} as const;

export function SolutionPageLayout({
  seo,
  canonical,
  badge,
  h1,
  lead,
  breadcrumbs,
  heroImage = heroServices,
  heroImageAlt,
  features,
  highlights,
  relatedLinks,
  primaryCta,
  secondaryLink,
  children,
}: SolutionPageProps) {
  const cta = ctaConfig[primaryCta];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={canonical}
        schema={[organizationSchema, breadcrumbSchema(breadcrumbs)]}
      />

      <PageHero
        badge={badge}
        title={h1}
        description={lead}
        imageSrc={heroImage}
        imageAlt={heroImageAlt ?? h1}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton label={cta.label} subject={cta.subject} body={cta.body} />
          {cta.whatsapp ? <WhatsAppButton label="Chat on WhatsApp" /> : null}
          {secondaryLink ? (
            <Link to={secondaryLink.path}>
              <Button size="lg" variant="on-dark-outline">
                {secondaryLink.label}
              </Button>
            </Link>
          ) : null}
        </CTAGroup>
      </PageHero>

      <section className="section-band bg-white">
        <div className="section-band-inner">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <MarketingTile key={feature.title}>
                <p className="mb-3 font-heading text-xs font-bold tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-lg font-bold text-navy">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </MarketingTile>
            ))}
          </div>
        </div>
      </section>

      {highlights && highlights.length > 0 ? (
        <section className="section-band bg-surface">
          <div className="section-band-inner max-w-3xl">
            <MarketingEyebrow>What you get</MarketingEyebrow>
            <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">Included on this program</h2>
            <ul className="mt-8 space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={20} />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {children}

      {relatedLinks && relatedLinks.length > 0 ? (
        <section className="section-band bg-white">
          <div className="section-band-inner">
            <h2 className="mb-6 font-heading text-2xl font-bold text-navy">Related</h2>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <Button variant="outline-brand">
                    {link.name} <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <MarketingFinalCta>
        <h2 className="mb-6 font-heading text-3xl font-bold">Ready to move your freight?</h2>
        <CTAGroup>
          <HeroEmailButton label={cta.label} subject={cta.subject} body={cta.body} />
          {cta.whatsapp ? <WhatsAppButton label="Chat on WhatsApp" /> : null}
        </CTAGroup>
      </MarketingFinalCta>
    </div>
  );
}
