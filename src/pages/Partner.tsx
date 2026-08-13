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
          title: "Application Received!",
          description: "Our fleet manager will contact you within 24 hours for verification.",
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
    { step: "04", title: "Operate & Earn", desc: "Begin accepting loads matched to your routes  -  with ongoing operations support." },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.partner.title}
        description={pageSeo.partner.description}
        canonical="/partner"
      />
      <PageHero
        badge="Fleet Owners"
        title="Join TranZfort  -  Industrial Loads With ZAFTYS Logistics."
        description="Verified transport partners get structured industrial freight coordinated through ZAFTYS Logistics  -  clear payments, professional onboarding, and tools as you scale across India."
        imageSrc={heroPartner}
        imageAlt={pageHeroAlts.partner}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <Button asChild size="lg" variant="on-dark">
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
              { icon: Network, title: "Verified Network", desc: "Industrial freight opportunities on corridors where ZAFTYS operates." },
              { icon: TrendingUp, title: "Better Utilization", desc: "Reduce empty return trips with backhaul-friendly matching." },
              { icon: Shield, title: "Payments via ZAFTYS", desc: "Transparent GST-compliant billing through ZAFTYS Logistics." },
              { icon: Zap, title: "TMS™ Access", desc: "Operational tools as your volume scales with ZAFTYS." },
            ].map((item, index) => (
              <Card key={index} className="text-center border-none shadow-lg hover:-translate-y-1 transition-transform duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/5 flex items-center justify-center mx-auto mb-4 text-primary">
                    <item.icon size={32} />
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
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4 text-navy">Simple Onboarding. Clear Standards.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <div key={index} className="relative group">
                <Card className="h-full border-none shadow-sm bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-heading font-bold text-accent/20 mb-4 group-hover:text-accent transition-colors">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
                {/* Connector Line (Desktop) */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-[-12px] w-6 h-[2px] bg-border z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="partner-form" className="py-20 bg-navy text-white scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold mb-4">Register Your Fleet</h2>
              <p className="text-gray-300">
                Start your journey with ZAFTYS today.
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
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto container-padding">
          <h2 className="text-3xl font-heading font-bold mb-4">Prefer to Talk First?</h2>
          <p className="text-gray-200 mb-8 max-w-xl mx-auto">Reach our fleet team on WhatsApp or download the TranZfort app.</p>
          <CTAGroup>
            <WhatsAppButton label="WhatsApp Our Fleet Team" />
            <Button asChild size="lg" variant="on-dark-outline">
              <a
                href={externalLinks.tranzfort}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_tranzfort", { placement: "partner" })}
              >
                Download TranZfort App
              </a>
            </Button>
          </CTAGroup>
          <p className="mt-8 text-sm text-gray-300">
            Learn about{" "}
            <Link to="/network" className="underline hover:text-white">TranZfort network</Link>
            {", "}
            <Link to="/technology" className="underline hover:text-white">ZAFTYS TMS</Link>
            {", or "}
            <Link to="/contact" className="underline hover:text-white">contact ZAFTYS Logistics</Link>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Partner;
