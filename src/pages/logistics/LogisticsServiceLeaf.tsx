import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LogisticsServiceBody, LogisticsServiceCtas } from "@/components/logistics/LogisticsServiceSection";
import {
  logisticsContainerInquiry,
  logisticsContractInquiry,
  logisticsHubQuote,
} from "@/lib/logistics-hub-copy";
import {
  logisticsLeafBreadcrumbs,
  type LogisticsServiceLeafDef,
} from "@/lib/logistics-service-leaves";
import { paths } from "@/lib/site-paths";
import { breadcrumbSchema, logisticsServiceLeafSchema, organizationSchema } from "@/lib/schema";
import heroServices from "@/assets/hero-services.webp";

type Props = {
  leaf: LogisticsServiceLeafDef;
};

export function LogisticsServiceLeaf({ leaf }: Props) {
  const { service, cta, seo, path, related } = leaf;
  const breadcrumbs = logisticsLeafBreadcrumbs(leaf);

  const primary =
    cta === "contract"
      ? logisticsContractInquiry
      : cta === "container"
        ? logisticsContainerInquiry
        : logisticsHubQuote;

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={path}
        schema={[
          organizationSchema,
          breadcrumbSchema(breadcrumbs),
          logisticsServiceLeafSchema({
            name: `ZAFTYS ${service.title}`,
            description: seo.description,
            url: path,
            serviceType: service.title,
          }),
        ]}
      />

      <PageHero
        badge={service.title}
        title={service.tagline}
        description={service.lead}
        imageSrc={service.image || heroServices}
        imageAlt={service.imageAlt}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton label={primary.label} subject={primary.subject} body={primary.body} />
          {cta !== "contract" ? (
            <WhatsAppButton label="Chat on WhatsApp" placement={`logistics-leaf-${service.id}-hero`} />
          ) : null}
          <Link to={paths.logistics.hub}>
            <Button size="lg" variant="on-dark-outline">
              All logistics
            </Button>
          </Link>
        </CTAGroup>
      </PageHero>

      <div className="border-b border-border bg-surface">
        <LogisticsServiceBody service={service} cta={cta} echoHero={false} />
      </div>

      <section aria-labelledby="related-services-heading" className="border-t border-border bg-white py-12 md:py-16">
        <div className="container mx-auto container-padding">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Also on this desk</p>
            <h2 id="related-services-heading" className="font-heading text-2xl font-bold text-navy md:text-3xl">
              Related services
            </h2>
          </div>
          <ul className="mx-auto grid max-w-4xl list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="group flex items-center justify-between border border-border bg-surface px-5 py-4 transition-colors hover:border-primary/40"
                >
                  <span className="font-heading font-bold text-navy group-hover:text-primary">{item.name}</span>
                  <ArrowRight className="shrink-0 text-muted-foreground group-hover:text-primary" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="leaf-final-cta-heading" className="final-cta-band">
        <div className="container mx-auto container-padding text-center">
          <h2 id="leaf-final-cta-heading" className="mb-4 text-3xl font-heading font-bold md:text-4xl">
            Ready to move this freight?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-300">
            Same Amravati desk on WhatsApp or email - owned capacity first, labeled overflow when you need it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <LogisticsServiceCtas
              serviceId={`${service.id}-footer`}
              cta={cta}
              secondary={{ label: "All logistics", path: paths.logistics.hub }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
