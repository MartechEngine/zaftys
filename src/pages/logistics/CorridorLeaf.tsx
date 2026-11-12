import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Clock, Container, MapPin, Radio, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  corridorBreadcrumbs,
  corridorQuote,
  corridorUrl,
  corridorWhatsAppMessage,
  getCorridor,
  type CorridorDef,
} from "@/lib/corridors-data";
import { paths } from "@/lib/site-paths";
import { whatsappUrl } from "@/lib/constants";
import {
  breadcrumbSchema,
  corridorServiceSchema,
  organizationSchema,
} from "@/lib/schema";
import heroServices from "@/assets/hero-services.webp";

function capacityLabel(model: CorridorDef["capacityModel"]): string {
  if (model === "own-first") return "Owned fleet first";
  if (model === "own-and-network") return "Own + labeled network";
  return "Network-heavy (labeled)";
}

function CorridorLeafBody({ corridor }: { corridor: CorridorDef }) {
  const related = corridor.relatedSlugs
    .map((slug) => getCorridor(slug))
    .filter((c): c is CorridorDef => Boolean(c));
  const waHref = whatsappUrl(corridorWhatsAppMessage(corridor));

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={corridor.seoTitle}
        description={corridor.seoDescription}
        canonical={corridorUrl(corridor.slug)}
        schema={[
          organizationSchema,
          breadcrumbSchema(corridorBreadcrumbs(corridor)),
          corridorServiceSchema(corridor),
        ]}
      />

      <PageHero
        badge={corridor.badge}
        title={corridor.h1}
        description={corridor.lead}
        imageSrc={heroServices}
        imageAlt={`${corridor.title} industrial FTL corridor - ZAFTYS`}
        prepend={
          <Link
            to={paths.logistics.corridors}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
          >
            All routes & corridors
          </Link>
        }
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label={corridorQuote.label}
            subject={`${corridorQuote.subject}: ${corridor.shortName}`}
            body={`${corridorQuote.body}Corridor: ${corridor.title}\n`}
          />
          <Button asChild size="lg" variant="accent">
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              WhatsApp this lane
            </a>
          </Button>
          <Link to={paths.contact}>
            <Button size="lg" variant="on-dark-outline">
              Contact
            </Button>
          </Link>
        </CTAGroup>
      </PageHero>

      <section className="border-b border-border bg-white">
        <div className="container mx-auto container-padding py-10 md:py-12">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3">
            <span className="border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm font-semibold text-primary">
              {capacityLabel(corridor.capacityModel)}
            </span>
            <p className="text-sm text-muted-foreground">{corridor.capacityNote}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="lanes-heading" className="border-b border-border bg-surface">
        <div className="container mx-auto container-padding py-14 md:py-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Lanes</p>
            <h2 id="lanes-heading" className="mb-6 font-heading text-2xl font-bold text-navy md:text-3xl">
              Origins, destinations, and named lanes
            </h2>
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-border bg-white p-5">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <MapPin size={18} />
                  <h3 className="font-heading font-bold text-navy">Origins / hubs</h3>
                </div>
                <p className="text-muted-foreground">{corridor.origins.join(", ")}</p>
              </div>
              <div className="border border-border bg-white p-5">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <MapPin size={18} />
                  <h3 className="font-heading font-bold text-navy">Destinations</h3>
                </div>
                <p className="text-muted-foreground">{corridor.destinations.join(", ")}</p>
              </div>
            </div>
            <ul className="grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2">
              {corridor.lanes.map((lane) => (
                <li
                  key={lane}
                  className="border border-border bg-white px-4 py-3 text-sm font-medium text-navy"
                >
                  {lane}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="ops-heading" className="border-b border-border bg-white">
        <div className="container mx-auto container-padding py-14 md:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Operations</p>
            <h2 id="ops-heading" className="font-heading text-2xl font-bold text-navy md:text-3xl">
              Transit, dispatch, cargo, and fleet
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            <article className="border border-border bg-surface p-6">
              <div className="mb-3 flex items-center gap-2 text-primary">
                <Clock size={20} />
                <h3 className="font-heading text-lg font-bold text-navy">Transit timelines</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{corridor.transit}</p>
            </article>
            <article className="border border-border bg-surface p-6">
              <div className="mb-3 flex items-center gap-2 text-primary">
                <Truck size={20} />
                <h3 className="font-heading text-lg font-bold text-navy">Dispatch schedule</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{corridor.dispatch}</p>
            </article>
            <article className="border border-border bg-surface p-6">
              <div className="mb-3 flex items-center gap-2 text-primary">
                <Container size={20} />
                <h3 className="font-heading text-lg font-bold text-navy">Supported cargo</h3>
              </div>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {corridor.cargo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="border border-border bg-surface p-6">
              <div className="mb-3 flex items-center gap-2 text-primary">
                <Truck size={20} />
                <h3 className="font-heading text-lg font-bold text-navy">Fleet specifications</h3>
              </div>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {corridor.fleet.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="tracking-heading" className="border-b border-border bg-surface">
        <div className="container mx-auto container-padding py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Radio size={20} />
              <p className="text-sm font-semibold uppercase tracking-widest">Visibility</p>
            </div>
            <h2 id="tracking-heading" className="mb-4 font-heading text-2xl font-bold text-navy md:text-3xl">
              Digital dispatch and tracking
            </h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">{corridor.tracking}</p>
            <ul className="mb-8 list-disc space-y-2 pl-5 text-muted-foreground">
              {corridor.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link to={paths.technology.tms}>
                <Button variant="outline-brand">ZAFTYS TMS</Button>
              </Link>
              <Link to={paths.network.tranzfort}>
                <Button variant="outline-brand">TranZfort</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="related-corridors-heading" className="border-b border-border bg-white">
          <div className="container mx-auto container-padding py-12 md:py-16">
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                Related corridors
              </p>
              <h2
                id="related-corridors-heading"
                className="font-heading text-2xl font-bold text-navy md:text-3xl"
              >
                Other lanes on this desk
              </h2>
            </div>
            <ul className="mx-auto grid max-w-4xl list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={corridorUrl(item.slug)}
                    className="group flex items-center justify-between border border-border bg-surface px-5 py-4 transition-colors hover:border-primary/40"
                  >
                    <span className="font-heading font-bold text-navy group-hover:text-primary">
                      {item.shortName}
                    </span>
                    <ArrowRight className="shrink-0 text-muted-foreground group-hover:text-primary" size={16} />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={paths.logistics.corridors}
                  className="group flex items-center justify-between border border-border bg-surface px-5 py-4 transition-colors hover:border-primary/40"
                >
                  <span className="font-heading font-bold text-navy group-hover:text-primary">
                    All routes & corridors
                  </span>
                  <ArrowRight className="shrink-0 text-muted-foreground group-hover:text-primary" size={16} />
                </Link>
              </li>
            </ul>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="corridor-final-cta" className="final-cta-band">
        <div className="container mx-auto container-padding text-center">
          <h2 id="corridor-final-cta" className="mb-4 text-3xl font-heading font-bold md:text-4xl">
            Ready to indent this corridor?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-300">
            Same Amravati desk on WhatsApp or email. We confirm Own vs Network before allotment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="accent">
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                WhatsApp quote
              </a>
            </Button>
            <Link to={paths.contact}>
              <Button size="lg" variant="on-dark-outline">
                Contact form
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CorridorLeaf() {
  const { slug } = useParams<{ slug: string }>();
  const corridor = slug ? getCorridor(slug) : undefined;
  if (!corridor) {
    return <Navigate to={paths.logistics.corridors} replace />;
  }
  return <CorridorLeafBody corridor={corridor} />;
}
