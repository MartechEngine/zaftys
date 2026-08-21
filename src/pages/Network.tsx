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
import { externalLinks, networkHighlights, WHATSAPP_POST_LOAD_MESSAGE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { pageSeo } from "@/lib/page-seo";
import heroNetwork from "@/assets/hero-network.jpg";
import { pageHeroAlts } from "@/lib/page-heroes";
import { PageHero } from "@/components/PageHero";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { LazyTranZfortScreensCarousel } from "@/components/LazyTranZfortScreensCarousel";
import { paths } from "@/lib/site-paths";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const highlightIcons = [Route, Mic, Smartphone, Shield, Network, Users] as const;

const highlightLinks: (string | null)[] = [
  "#how-it-works",
  "#explore-app",
  null,
  "/partner",
  "#how-it-works",
  "#compare",
];

const pulseItems = [
  { label: "Free to post", sublabel: "No listing fee" },
  { label: "Free to find", sublabel: "No search fee" },
  { label: "AI-powered matching", sublabel: "Corridor and vehicle" },
  { label: "Broker fee", sublabel: "On trucker bookings" },
];

const flowSteps = [
  { title: "Share the load or the empty truck", desc: "Post origin, destination, and vehicle class, or publish an available truck." },
  { title: "Matching suggests a fit", desc: "AI-powered matching on corridor, body type, timing, and papers." },
  { title: "You confirm", desc: "ZAFTYS coordinates trips that run through us. GST billing stays on our side." },
  { title: "Status can follow in TMS", desc: "Contracted work can sit in ZAFTYS TMS so you are not chasing WhatsApp photos." },
];

const networkBenefits = [
  { title: "Free to post and find", desc: "No listing fee. No search fee. We charge a broker fee to truckers on booked loads." },
  { title: "AI-powered matching", desc: "Suggestions use corridor, vehicle class, timing, and papers. You still confirm the booking." },
  { title: "Verified truckers", desc: "RC, insurance, and onboarding before a partner shows as available." },
  { title: "GST when we contract", desc: "Trips that run through ZAFTYS stay on our GST billing. The app listing itself is free." },
  { title: "TMS on ZAFTYS trips", desc: "Contracted work can sit in ZAFTYS TMS so status is not only a WhatsApp thread." },
  { title: "Built for the highway", desc: "Hindi and English on the road. Core features keep working when the signal drops." },
];

const audienceCards = [
  {
    title: "For shippers",
    accent: "text-[#0E8C84]",
    bullets: [
      "Post a load once. See suggested trucks.",
      "Keep one commercial relationship when ZAFTYS is on the contract.",
      "Visibility through ZAFTYS TMS on trips we run.",
    ],
  },
  {
    title: "For truck owners",
    accent: "text-accent",
    bullets: [
      "Find commercial loads on corridors you already run.",
      "Onboarding checks RC and papers.",
      "Payments for ZAFTYS trips come through ZAFTYS.",
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
    <Card className="h-full border border-border bg-white shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-primary/35 hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center border border-border bg-surface text-primary shadow-sm">
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
    "block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

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
        canonical={paths.network.tranzfort}
        schema={[
          organizationSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Network", path: paths.network.hub },
            { name: "Tranzfort", path: paths.network.tranzfort },
          ]),
        ]}
      />

      <PageHero
        badge={pageHeroCopy.network.badge}
        title={pageHeroCopy.network.h1}
        description={pageHeroCopy.network.lead}
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
          <WhatsAppButton
            label="Post a load"
            message={WHATSAPP_POST_LOAD_MESSAGE}
            placement="hero"
            intent="post_load"
          />
        </CTAGroup>
      </PageHero>

      {/* Trust pulse */}
      <section className="section-band bg-white">
        <div className="section-band-inner max-w-5xl">
          <div className="grid grid-cols-2 gap-6 border border-border bg-surface px-6 py-8 shadow-sm md:grid-cols-4 md:gap-8 md:px-10">
            {pulseItems.map((item) => (
              <div key={item.label} className="text-center">
                <div className="mb-1 font-heading text-base font-bold text-navy md:text-lg">{item.label}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground md:text-xs">
                  {item.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="explore-app" className="section-padding bg-white scroll-mt-28 pt-10 md:pt-12">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-navy">Inside the TranZfort app</h2>
            <p className="text-muted-foreground">
              Join, search, browse, and book. Download the live app when you are ready to post or find a load.
            </p>
          </div>
          <LazyTranZfortScreensCarousel surface="light" />
        </div>
      </section>

      <section id="how-it-works" className="section-padding bg-surface scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-navy">How TranZfort works</h2>
            <p className="text-muted-foreground">
              Post a load or find a truck. Matching is AI-powered. You still confirm the booking.
            </p>
          </div>

          <div className="mx-auto max-w-3xl overflow-hidden border border-border bg-white">
            <div className="p-6 md:p-8">
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
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-navy">What you get in the marketplace</h2>
            <p className="text-muted-foreground">
              Listing and search are free. AI-powered matching. We charge a broker fee to truckers on booked loads. GST billing when the trip runs through ZAFTYS.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {networkBenefits.map((item) => (
              <Card key={item.title} className="border border-border/60 shadow-sm bg-surface h-full">
                <CardContent className="p-5">
                  <h3 className="font-heading font-bold text-navy mb-2 text-sm">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audience  -  shipper + trucker only */}
      <section className="section-padding bg-surface">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-navy">Built for both sides of the load</h2>
            <p className="text-muted-foreground">
              Shippers post. Truckers book.{" "}
              <a href="#explore-app" className="text-accent font-semibold hover:underline">
                See the app screens
              </a>
              . Existing ZAFTYS transport customers use the same app when they need a truck we do not have today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {audienceCards.map((card) => (
              <Card key={card.title} className="border border-border h-full bg-white">
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
              Hindi and English on the road. Built for highway work, not city-only apps.
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
            <h2 className="text-3xl font-heading font-bold mb-3">Calling five brokers vs TranZfort</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Separate rates and WhatsApp groups, or one marketplace next to our fleet and TMS.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-full border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="font-heading font-bold text-lg mb-5 flex items-center gap-2">
                <X className="text-red-400 shrink-0" size={20} /> Calling five brokers
              </h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex gap-2"><span className="text-red-400/80">·</span> Separate rates and separate WhatsApp groups</li>
                <li className="flex gap-2"><span className="text-red-400/80">·</span> You manage multiple transporters yourself</li>
                <li className="flex gap-2"><span className="text-red-400/80">·</span> No shared tracking or one GST invoice</li>
              </ul>
            </div>
            <div className="p-6 md:p-8 rounded-xl bg-accent/10 border border-accent/30 h-full">
              <h3 className="font-heading font-bold text-lg mb-5 flex items-center gap-2">
                <CheckCircle2 className="text-accent shrink-0" size={20} /> TranZfort plus ZAFTYS
              </h3>
              <ul className="space-y-3 text-gray-200 text-sm">
                <li className="flex gap-2"><span className="text-accent">·</span> Post or find with no listing or search fee. Broker fee to truckers on booked loads</li>
                <li className="flex gap-2"><span className="text-accent">·</span> Own fleet if we have the truck</li>
                <li className="flex gap-2"><span className="text-accent">·</span> TMS on the trip we run</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta-band text-center">
        <div className="container mx-auto container-padding max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Post a load or find a truck</h2>
          <p className="text-lg text-gray-200 mb-8">
            Download TranZfort, or WhatsApp a load. Fleet owners can also{" "}
            <Link to="/partner" className="underline hover:text-white font-semibold">
              become a partner
            </Link>
            .
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
            <WhatsAppButton
              label="Post a load"
              message={WHATSAPP_POST_LOAD_MESSAGE}
              placement="cta"
              intent="post_load"
            />
          </CTAGroup>
          <p className="mt-8 text-sm text-gray-300">
            Also explore{" "}
            <Link to="/logistics" className="underline hover:text-white">logistics services</Link>
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
