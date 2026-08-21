import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import heroIndustries from "@/assets/hero-industries.jpg";
import { pageHeroAlts } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import { pageSeo } from "@/lib/page-seo";
import { industryHubCardsOrdered } from "@/lib/industries-data";
import { industriesHubCopy, industriesHubFeaturedSlugs, industriesHubIndexOrder } from "@/lib/industries-hub-copy";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import { paths } from "@/lib/site-paths";
import { cn } from "@/lib/utils";

const Industries = () => {
  const all = industryHubCardsOrdered(industriesHubIndexOrder);
  const featured = industriesHubFeaturedSlugs
    .map((slug) => all.find((i) => i.slug === slug))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));
  const copy = industriesHubCopy;

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.industries.title}
        description={pageSeo.industries.description}
        canonical={paths.industries}
        schema={[
          organizationSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: paths.industries },
          ]),
        ]}
      />

      <PageHero
        badge={copy.hero.badge}
        title={copy.hero.h1}
        description={copy.hero.lead}
        imageSrc={heroIndustries}
        imageAlt={pageHeroAlts.industries}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <HeroEmailButton
            label="Discuss Your Industry Needs"
            subject={heroMailSubjects.industryHub}
            body={heroMailBodies.industryHub}
          />
          <Link to={paths.logistics.hub}>
            <Button size="lg" variant="on-dark-outline">
              Transportation
            </Button>
          </Link>
        </CTAGroup>
      </PageHero>

      {featured.map((industry, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={industry.slug} className="border-t border-border bg-surface">
            <div
              className={cn(
                "mx-auto grid max-w-7xl items-stretch lg:grid-cols-2",
                flip && "lg:[&>*:first-child]:order-2",
              )}
            >
              <div className="relative min-h-[220px] lg:min-h-[300px]">
                <img
                  src={industry.image}
                  alt={`${industry.title} logistics by ZAFTYS`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-navy/10 to-transparent" />
                <p className="absolute bottom-5 left-5 font-heading text-sm font-bold tracking-[0.2em] text-white drop-shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <div className="flex flex-col justify-center px-6 py-10 md:px-10">
                <h2 className="mb-3 font-heading text-3xl font-bold text-navy">{industry.title}</h2>
                <p className="mb-4 text-muted-foreground">{industry.description}</p>
                <ul className="mb-5 space-y-2">
                  {industry.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`${paths.industries}/${industry.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                >
                  {industry.highlight} <ArrowRight className="ml-1.5" size={14} />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-white px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 font-heading text-3xl font-bold text-navy">{copy.all.h2}</h2>
          <p className="mb-8 max-w-2xl text-muted-foreground">{copy.all.lead}</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {all.map((industry) => (
              <Link
                key={industry.slug}
                to={`${paths.industries}/${industry.slug}`}
                className="group overflow-hidden border border-border bg-surface transition-colors hover:border-primary/40 hover:bg-white"
              >
                <div className="relative h-24 overflow-hidden sm:h-28">
                  <img
                    src={industry.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                </div>
                <div className="p-3 md:p-4">
                  <p className="font-heading text-sm font-bold text-navy md:text-base">{industry.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{industry.highlight}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to={paths.logistics.hub}
              className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
            >
              Transportation services <ArrowRight className="ml-1.5" size={14} />
            </Link>
            <Link to={paths.fleet} className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
              Own + Network Fleet <ArrowRight className="ml-1.5" size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="final-cta-band text-center">
        <div className="container mx-auto container-padding">
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">{copy.finalCta.h2}</h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-200">{copy.finalCta.lead}</p>
          <CTAGroup>
            <HeroEmailButton
              label="Discuss Your Industry Needs"
              subject={heroMailSubjects.industryHub}
              body={heroMailBodies.industryHub}
            />
            <WhatsAppButton label="Chat on WhatsApp" placement="industries-hub-cta" />
            <Link to={paths.logistics.hub}>
              <Button size="lg" variant="on-dark-outline">
                Transportation
              </Button>
            </Link>
          </CTAGroup>
        </div>
      </section>
    </div>
  );
};

export default Industries;
