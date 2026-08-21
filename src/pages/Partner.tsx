import { useState, type ChangeEvent, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network, TrendingUp, Shield, Zap, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import heroPartner from "@/assets/hero-partner.jpg";
import { pageHeroAlts } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CTAGroup } from "@/components/CTAGroup";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { externalLinks } from "@/lib/constants";
import { pageSeo } from "@/lib/page-seo";
import { breadcrumbSchema } from "@/lib/schema";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { paths } from "@/lib/site-paths";
import { Link } from "react-router-dom";

const Partner = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    phone: "",
    fleet: "",
    website: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFleetChange = (value: string) => {
    setFormData((prev) => ({ ...prev, fleet: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/partner.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        trackEvent("form_partner_success", { placement: "partner-form" });
        toast({
          title: "Application received",
          description: "Our fleet team will contact you for verification and next steps.",
        });
        setFormData({
          company: "",
          contact: "",
          phone: "",
          fleet: "",
          website: "",
        });
        (e.currentTarget as HTMLFormElement).reset();
      } else {
        throw new Error(result.error || "Failed to submit application");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { step: "01", title: "Register", desc: "Submit company details, contact information, fleet size, and primary corridors." },
    { step: "02", title: "Verify", desc: "Our fleet team reviews registration, documentation, insurance, and operational readiness." },
    { step: "03", title: "Onboard", desc: "Orientation on communication standards, TranZfort app usage, and ZAFTYS workflows." },
    { step: "04", title: "Take loads", desc: "Accept matched loads on your routes. Payments for ZAFTYS trips come through ZAFTYS." },
  ];

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
      >
        <CTAGroup className="justify-start sm:justify-start">
          <Button asChild size="lg" variant="accent">
            <a href="#partner-form">Register Your Fleet</a>
          </Button>
          <HeroEmailButton
            label="Partner Inquiry"
            variant="on-dark-outline"
            subject={heroMailSubjects.partner}
            body={heroMailBodies.partner}
          />
        </CTAGroup>
      </PageHero>

      {/* Benefits Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Network, title: "Loads on your corridors", desc: "Commercial freight matched to lanes you already run. Search is free. Broker fee on booked loads." },
              { icon: TrendingUp, title: "Fewer empty returns", desc: "Find a load for the way back instead of deadheading the corridor." },
              { icon: Shield, title: "Payments via ZAFTYS", desc: "GST-compliant billing through ZAFTYS on trips we contract." },
              { icon: Zap, title: "TMS on ZAFTYS trips", desc: "Contracted work can sit in ZAFTYS TMS for status and close-out." },
            ].map((item, index) => (
              <Card key={index} className="border border-border bg-white text-center shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-primary/35 hover:shadow-md">
                <CardContent className="p-8">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-border bg-surface text-primary shadow-sm">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-surface">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4 text-navy">Simple onboarding. Clear standards.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <div key={item.step} className="group relative">
                <Card className="h-full border border-border bg-white text-center shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-primary/35 hover:shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 font-heading text-4xl font-bold text-accent/25 transition-colors group-hover:text-accent">
                      {item.step}
                    </div>
                    <h3 className="mb-2 font-bold text-navy">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
                {index < 3 ? (
                  <div className="absolute top-1/2 right-[-12px] z-10 hidden h-[2px] w-6 bg-border md:block" aria-hidden />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="partner-form" className="section-padding scroll-mt-28 bg-navy text-white">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold mb-4">Register your fleet</h2>
              <p className="text-gray-300">
                Papers, insurance, and corridors. Then the app.
              </p>
            </div>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Honeypot field - hidden from real users */}
                  <div className="hidden">
                    <input
                      type="text"
                      id="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-200">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Transporter Name"
                        className="bg-white/10 border-white/20 text-white"
                        value={formData.company}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact" className="text-gray-200">Contact Person</Label>
                      <Input
                        id="contact"
                        placeholder="Full Name"
                        className="bg-white/10 border-white/20 text-white"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-200">Mobile Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91"
                        className="bg-white/10 border-white/20 text-white"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fleet" className="text-gray-200">Fleet Size</Label>
                      <Select value={formData.fleet} onValueChange={handleFleetChange}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 Vehicles</SelectItem>
                          <SelectItem value="6-20">6-20 Vehicles</SelectItem>
                          <SelectItem value="20+">20+ Vehicles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button size="lg" variant="accent" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Processing... <Loader2 className="ml-2 h-4 w-4 animate-spin" /></>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="final-cta-band text-center">
        <div className="container mx-auto container-padding">
          <h2 className="text-3xl font-heading font-bold mb-4">Prefer to talk first?</h2>
          <p className="text-gray-200 mb-8 max-w-xl mx-auto">
            Reach our fleet team on WhatsApp, open TranZfort, or read how Network capacity works.
          </p>
          <CTAGroup>
            <WhatsAppButton label="WhatsApp Our Fleet Team" />
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
            <Link to={paths.network.hub} className="underline hover:text-white">Network</Link>
            {", "}
            <Link to={paths.network.tranzfort} className="underline hover:text-white">TranZfort</Link>
            {", "}
            <Link to={paths.technology.tms} className="underline hover:text-white">ZAFTYS TMS</Link>
            {", or "}
            <Link to={paths.contact} className="underline hover:text-white">contact the desk</Link>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Partner;
