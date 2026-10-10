import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import heroPartner from "@/assets/hero-partner.webp";
import { pageHeroAlts } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import { PartnerEnquiryForm } from "@/components/partner/PartnerEnquiryForm";
import { trackEvent } from "@/lib/analytics";
import { externalLinks, WHATSAPP_PARTNER_MESSAGE } from "@/lib/constants";
import { pageSeo } from "@/lib/page-seo";
import { breadcrumbSchema } from "@/lib/schema";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import {
  closeCopy,
  fleetCard,
  formCopy,
  ownershipCard,
  partnerFaqs,
  type PartnerPath,
} from "@/lib/partner-page-copy";
import { paths } from "@/lib/site-paths";

const Partner = () => {
  const location = useLocation();
  const [path, setPath] = useState<PartnerPath>("fleet");

  useEffect(() => {
    if (location.hash === "#ownership-partner") setPath("first-truck");
    if (location.hash === "#fleet-partner") setPath("fleet");
  }, [location.hash]);

  const choose = (next: PartnerPath, placement: string) => {
    setPath(next);
    trackEvent("cta_partner", {
      placement,
      intent: next === "first-truck" ? "ownership" : "fleet",
    });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.partner.title}
        description={pageSeo.partner.description}
        canonical="/partner"
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Become a Partner", path: "/partner" },
        ])}
      />
      <PageHero
        badge={pageHeroCopy.partner.badge}
        title={pageHeroCopy.partner.h1}
        description={pageHeroCopy.partner.lead}
        imageSrc={heroPartner}
        imageAlt={pageHeroAlts.partner}
        className="motion-reduce:[&_.animate-fade-in-up]:animate-none"
      >
        <CTAGroup className="justify-start sm:justify-start">
          <Button asChild size="lg" variant="accent">
            <a href="#partner-form" onClick={() => choose("fleet", "partner-hero")}>
              I already own trucks
            </a>
          </Button>
          <Button asChild size="lg" variant="on-dark-outline">
            <a href="#partner-form" onClick={() => choose("first-truck", "partner-hero")}>
              Explore truck ownership
            </a>
          </Button>
        </CTAGroup>
      </PageHero>

      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <h2 className="mb-8 font-heading text-3xl font-bold text-navy">Choose a partnership path</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PathCard
              id={fleetCard.id}
              title={fleetCard.title}
              lead={fleetCard.lead}
              bullets={fleetCard.bullets}
              steps={fleetCard.steps}
              cta={fleetCard.cta}
              href="#partner-form"
              variant="accent"
              onChoose={() => choose("fleet", "partner-card")}
            />
            <PathCard
              id={ownershipCard.id}
              title={ownershipCard.title}
              lead={ownershipCard.lead}
              bullets={ownershipCard.bullets}
              steps={ownershipCard.steps}
              money={ownershipCard.money}
              cta={ownershipCard.cta}
              href="#partner-form"
              variant="outline-brand"
              surface
              onChoose={() => choose("first-truck", "partner-card")}
            />
          </div>
        </div>
      </section>

      <section id="partner-form" className="section-padding scroll-mt-32 bg-surface">
        <div className="container mx-auto container-padding">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center font-heading text-3xl font-bold text-navy">{formCopy.title}</h2>
            <p className="mb-8 text-center text-muted-foreground">{formCopy.lead}</p>
            <Card className="border border-border bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <PartnerEnquiryForm path={path} onPathChange={setPath} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="questions" className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <h2 className="mb-10 font-heading text-3xl font-bold text-navy">Questions</h2>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <FaqGroup title={partnerFaqs.fleetTitle} items={partnerFaqs.fleet} />
            <FaqGroup title={partnerFaqs.ownershipTitle} items={partnerFaqs.ownership} />
          </div>
        </div>
      </section>

      <section className="final-cta-band text-center">
        <div className="container mx-auto container-padding">
          <h2 className="mb-4 font-heading text-3xl font-bold">{closeCopy.h2}</h2>
          <p className="mx-auto mb-8 max-w-xl text-gray-200">{closeCopy.lead}</p>
          <CTAGroup>
            <WhatsAppButton
              label="WhatsApp Our Fleet Team"
              message={WHATSAPP_PARTNER_MESSAGE}
              placement="partner"
              intent="partner"
            />
            <HeroEmailButton
              label="Partner Inquiry"
              variant="on-dark-outline"
              subject={heroMailSubjects.partner}
              body={heroMailBodies.partner}
            />
            <Button asChild size="lg" variant="on-dark-outline">
              <a
                href={externalLinks.tranzfort}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_tranzfort", { placement: "partner" })}
              >
                Open TranZfort
              </a>
            </Button>
          </CTAGroup>
          <p className="mt-8 text-sm text-gray-300">
            Learn about{" "}
            <Link to={paths.network.hub} className="underline hover:text-white">
              Network
            </Link>
            {", "}
            <Link to={paths.technology.tms} className="underline hover:text-white">
              ZAFTYS TMS
            </Link>
            {", or "}
            <Link to={paths.contact} className="underline hover:text-white">
              contact the desk
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

function PathCard({
  id,
  title,
  lead,
  bullets,
  steps,
  money,
  cta,
  href,
  variant,
  surface,
  onChoose,
}: {
  id: string;
  title: string;
  lead: string;
  bullets: readonly string[];
  steps: readonly string[];
  money?: string;
  cta: string;
  href: string;
  variant: "accent" | "outline-brand";
  surface?: boolean;
  onChoose: () => void;
}) {
  return (
    <Card
      id={id}
      className={`scroll-mt-32 border border-border shadow-sm ${surface ? "bg-surface" : "bg-white"}`}
    >
      <CardContent className="flex h-full flex-col p-8">
        <h3 className="mb-3 font-heading text-2xl font-bold text-navy">{title}</h3>
        <p className="mb-4 text-muted-foreground">{lead}</p>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mb-4 text-sm font-semibold text-navy">{steps.join(" → ")}</p>
        {money ? <p className="mb-6 text-sm text-muted-foreground">{money}</p> : null}
        <Button asChild variant={variant} className="mt-auto w-full sm:w-auto">
          <a href={href} onClick={onChoose}>
            {cta}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

function FaqGroup({ title, items }: { title: string; items: readonly { q: string; a: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 font-heading text-xl font-bold text-navy">{title}</h3>
      <div className="divide-y divide-border rounded-lg border border-border bg-white">
        {items.map((item) => (
          <details key={item.q} className="group px-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span>{item.q}</span>
              <span aria-hidden className="mt-0.5 text-accent group-open:hidden">
                +
              </span>
              <span aria-hidden className="mt-0.5 hidden text-accent group-open:inline">
                -
              </span>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export default Partner;
