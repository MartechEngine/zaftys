import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Network,
  Smartphone,
  Mic,
  Shield,
  Route,
  Users,
  ArrowRight,
  CheckCircle2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import { externalLinks, networkHighlights } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { pageSeo } from "@/lib/page-seo";
import heroNetwork from "@/assets/hero-network.jpg";
import { pageHeroAlts } from "@/lib/page-heroes";
import { PageHero } from "@/components/PageHero";
import {
  AppDemoFrame,
  LazyMatchFlowDemo,
  LazyPersonaTabDemo,
  DemoDisclaimer,
} from "@/components/tranzfort-demo";
import "@/styles/tranzfort-demo.css";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const highlightIcons = [Route, Mic, Smartphone, Shield, Network, Users] as const;

const highlightLinks: (string | null)[] = [
  "#booking-flow",
  "#explore-demo",
  null,
  "/partner",
  "#booking-flow",
  "#compare",
];

const pulseItems = [
  { label: "Verified partners", sublabel: "Structured onboarding" },
  { label: "Industrial corridors", sublabel: "Pan-India reach" },
  { label: "Central coordination", sublabel: "Through ZAFTYS" },
  { label: "GST compliant", sublabel: "Formal billing" },
];

const flowSteps = [
  { title: "Customer requirement", desc: "Share shipment details, timelines, and cargo with ZAFTYS." },
  { title: "Operational planning", desc: "We evaluate fleet availability, routes, and delivery priorities." },
  { title: "Capacity assessment", desc: "Own fleet first; TranZfort network when additional vehicles are needed." },
  { title: "Verified allocation", desc: "Suitable partners matched to operational and documentation standards." },
  { title: "Centralized coordination", desc: "You continue working with ZAFTYS  -  not ad-hoc carriers." },
  { title: "Shipment visibility", desc: "Progress monitored through ZAFTYS TMS throughout the trip." },
  { title: "Delivery & documentation", desc: "Structured completion with standardized communication." },
];

const networkBenefits = [
  { title: "Flexible capacity", desc: "Scale transport without rebuilding your logistics process every time demand increases." },
  { title: "One operational team", desc: "Continue with one logistics partner instead of coordinating multiple providers." },
  { title: "Consistent communication", desc: "Shipment updates stay centralized through execution." },
  { title: "Verified network", desc: "Partners complete structured onboarding before joining." },
  { title: "Digital visibility", desc: "Operational information connected through ZAFTYS TMS." },
  { title: "Faster response", desc: "Additional resources arranged when business conditions change." },
];

const audienceCards = [
  {
    title: "For suppliers",
    accent: "text-[#0E8C84]",
    bullets: [
      "Share load requirements through structured channels",
      "Capacity coordinated centrally through ZAFTYS",
      "Visibility through ZAFTYS TMS on active shipments",
    ],
  },
  {
    title: "For transport partners",
    accent: "text-accent",
    bullets: [
      "Access verified industrial loads on matched corridors",
      "Structured onboarding before joining the network",
      "Payments and coordination through ZAFTYS Logistics",
    ],
  },
  {
    title: "For ZAFTYS clients",
    accent: "text-primary",
    bullets: [
      "You still contract with ZAFTYS Logistics only",
      "We scale capacity through the network when our fleet is full",
      "Same dispatch discipline, documentation, and accountability",
    ],
  },
];

function HighlightCard({
  index,
  item,
  Icon,
}: {
  index: number;
  item: (typeof networkHighlights)[number];
  Icon: (typeof highlightIcons)[number];
}) {
  const link = highlightLinks[index];
  const isRoute = link?.startsWith("/");
  const card = (
    <Card className="border-none shadow-sm hover:shadow-lg transition-all bg-white h-full">
      <CardContent className="p-6">
        <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
          <Icon size={22} />
        </div>
        <h3 className="text-base font-heading font-bold text-navy mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
        {link && (
          <p className="text-xs text-accent font-semibold mt-4">{isRoute ? "Learn more →" : "See demo →"}</p>
        )}
      </CardContent>
    </Card>
  );

  if (!link) {
    return <div className="h-full">{card}</div>;
  }

  const className =
    "block rounded-xl h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  if (isRoute) {
    return (
      <Link to={link} className={className}>
        {card}
      </Link>
    );
  }

  return (
    <a href={link} className={className}>
      {card}
    </a>
  );
}

const NetworkPage = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.network.title}
        description={pageSeo.network.description}
        canonical="/tranzfort-network"
        schema={[
          organizationSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "TranZfort Network", path: "/tranzfort-network" },
          ]),
        ]}
      />

      <PageHero
        badge="TranZfort Network · Live"
        title={
          <>
            Verified Capacity Through ZAFTYS.
            <br />
            Scale Without The Complexity.
          </>
        }
        description="TranZfort is live  -  verified transport partners, centralized coordination, and ZAFTYS TMS visibility on every lane. All commercial transactions through ZAFTYS Logistics."
        imageSrc={heroNetwork}
        imageAlt={pageHeroAlts.network}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <Button asChild size="lg" variant="accent">
            <a
              href={externalLinks.tranzfort}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_tranzfort", { placement: "hero" })}
            >
              Download TranZfort <ArrowRight className="ml-2" size={18} />
            </a>
          </Button>
          <WhatsAppButton label="Request Capacity" tone="on-dark-outline" />
          <Link to="/partner">
            <Button size="lg" variant="on-dark-outline">Become a Partner</Button>
          </Link>
        </CTAGroup>
      </PageHero>

      {/* Trust pulse  -  aligned to container */}
      <section className="relative z-20 -mt-8 pb-4">
        <div className="container mx-auto container-padding">
          <div className="max-w-5xl mx-auto rounded-xl bg-white border border-border shadow-lg px-6 py-8 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {pulseItems.map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-base md:text-lg font-heading font-bold text-primary mb-1">{item.label}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{item.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore TranZfort  -  persona demo */}
      <section id="explore-demo" className="section-padding bg-white scroll-mt-28 pt-10 md:pt-12">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-navy">Try The App Flows</h2>
            <p className="text-muted-foreground">
              Preview supplier and trucker views below  -  then download the live TranZfort app to get started.
            </p>
          </div>
          <div className="max-w-md mx-auto rounded-2xl border border-border bg-muted/10 shadow-lg p-4 sm:p-6">
            <LazyPersonaTabDemo variant="panel" surface="light" showDisclaimer />
          </div>
        </div>
      </section>

      {/* How it works + booking demo  -  unified card */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-navy">How TranZfort Works</h2>
            <p className="text-muted-foreground">
              Own fleet first. Verified network when demand exceeds capacity. Tap simulate to watch a load go live.
            </p>
          </div>

          <div className="max-w-6xl mx-auto rounded-2xl border border-border bg-white shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 lg:min-h-[420px]">
              <div className="lg:col-span-3 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-border">
                <ol className="relative space-y-0">
                  {flowSteps.map((step, index) => (
                    <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
                      {index < flowSteps.length - 1 && (
                        <span
                          className="absolute left-[11px] top-7 bottom-0 w-px bg-border"
                          aria-hidden
                        />
                      )}
                      <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[11px] font-bold text-accent ring-4 ring-white">
                        {index + 1}
                      </span>
                      <div className="pt-0.5 min-w-0">
                        <h3 className="text-sm font-heading font-bold text-navy">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div
                id="booking-flow"
                className="lg:col-span-2 p-6 md:p-8 bg-muted/20 flex flex-col scroll-mt-28 lg:sticky lg:top-24 lg:self-start"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Interactive demo</p>
                <AppDemoFrame
                  variant="panel"
                  title="Booking flow"
                  screen="app"
                  className="flex-1 min-h-[260px] sm:min-h-[300px]"
                >
                  <LazyMatchFlowDemo theme="app" />
                </AppDemoFrame>
                <DemoDisclaimer className="mt-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-navy">More Capacity. Less Complexity.</h2>
            <p className="text-muted-foreground">
              TranZfort adds flexible capacity without adding vendors, communication channels, or operational risk.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {networkBenefits.map((item) => (
              <Card key={item.title} className="border border-border/60 shadow-sm bg-muted/10 h-full">
                <CardContent className="p-5">
                  <h3 className="font-heading font-bold text-navy mb-2 text-sm">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audience  -  3 equal columns */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-navy">Built for Every Side of Freight</h2>
            <p className="text-muted-foreground">
              Suppliers, transport partners, and ZAFTYS clients each get a structured experience  -  under one formal ZAFTYS operation.{" "}
              <a href="#explore-demo" className="text-accent font-semibold hover:underline">
                Try supplier &amp; trucker views ↑
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {audienceCards.map((card) => (
              <Card key={card.title} className="border-none shadow-md h-full bg-white">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-lg font-heading font-bold text-navy mb-4">{card.title}</h3>
                  <ul className="space-y-3 flex-1">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className={`${card.accent} mt-0.5 shrink-0`} size={16} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why TranZfort */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-navy">Why TranZfort</h2>
            <p className="text-muted-foreground">
              Operational tools built for Indian highways  -  not just city connectivity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {networkHighlights.map((item, index) => (
              <HighlightCard key={item.title} index={index} item={item} Icon={highlightIcons[index]} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="section-padding bg-navy text-white scroll-mt-28">
        <div className="container mx-auto container-padding max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading font-bold mb-3">Traditional Logistics vs ZAFTYS Ecosystem</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              One partner, one platform, one network  -  instead of fragmented vendors and disconnected tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 md:p-8 rounded-xl bg-white/5 border border-white/10 h-full">
              <h3 className="font-heading font-bold text-lg mb-5 flex items-center gap-2">
                <X className="text-red-400 shrink-0" size={20} /> Traditional approach
              </h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex gap-2"><span className="text-red-400/80">·</span> Different transport companies and communication methods</li>
                <li className="flex gap-2"><span className="text-red-400/80">·</span> You manage multiple transporters separately</li>
                <li className="flex gap-2"><span className="text-red-400/80">·</span> Limited unified tracking or accountability</li>
              </ul>
            </div>
            <div className="p-6 md:p-8 rounded-xl bg-accent/10 border border-accent/30 h-full">
              <h3 className="font-heading font-bold text-lg mb-5 flex items-center gap-2">
                <CheckCircle2 className="text-accent shrink-0" size={20} /> ZAFTYS + TranZfort
              </h3>
              <ul className="space-y-3 text-gray-200 text-sm">
                <li className="flex gap-2"><span className="text-accent">·</span> One logistics partner and one communication channel</li>
                <li className="flex gap-2"><span className="text-accent">·</span> Own fleet first; verified network scales when needed</li>
                <li className="flex gap-2"><span className="text-accent">·</span> Visibility through ZAFTYS TMS™ on active lanes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-primary text-white text-center">
        <div className="container mx-auto container-padding max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Need More Transport Capacity?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Download TranZfort for partners, or WhatsApp ZAFTYS for freight capacity  -  one accountable logistics relationship.
          </p>
          <CTAGroup>
            <Button asChild size="lg" variant="accent">
              <a
                href={externalLinks.tranzfort}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_tranzfort", { placement: "cta" })}
              >
                Download TranZfort <ArrowRight className="ml-2" size={18} />
              </a>
            </Button>
            <WhatsAppButton label="Get a Freight Quote" tone="on-dark-outline" />
            <Link to="/partner">
              <Button size="lg" variant="on-dark-outline">Partner with ZAFTYS</Button>
            </Link>
          </CTAGroup>
          <p className="mt-8 text-sm text-gray-300">
            Also explore{" "}
            <Link to="/services" className="underline hover:text-white">logistics services</Link>
            {", "}
            <Link to="/zaftys-tms" className="underline hover:text-white">ZAFTYS TMS</Link>
            {", and "}
            <Link to="/contact" className="underline hover:text-white">contact ZAFTYS Logistics</Link>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default NetworkPage;
