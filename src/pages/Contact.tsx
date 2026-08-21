import { useState, type ChangeEvent, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import heroContact from "@/assets/hero-contact.webp";
import { pageHeroAlts } from "@/lib/page-heroes";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { CTAGroup } from "@/components/CTAGroup";
import {
  companyAddress,
  COMPANY_PHONE_DISPLAY,
  COMPANY_PHONE_ALT_DISPLAY,
  CONTACT_FORM_EMAIL,
} from "@/lib/constants";
import { pageSeo } from "@/lib/page-seo";
import { pageHeroCopy } from "@/lib/page-hero-copy";
import { organizationSchema, localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import { paths } from "@/lib/site-paths";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Controlled form state, including honeypot field "website"
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    city: "",
    pin: "",
    message: "",
    website: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interest: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        trackEvent("form_contact_success", { intent: formData.interest || "general" });
        toast({
          title: "Message Sent!",
          description: "We've received your inquiry and will get back to you shortly.",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          interest: "",
          city: "",
          pin: "",
          message: "",
          website: "",
        });
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Headquarters",
      details: [companyAddress.line1, `${companyAddress.line2}, ${companyAddress.line3}`],
    },
    {
      icon: Phone,
      title: "Phone Support",
      details: [COMPANY_PHONE_DISPLAY, COMPANY_PHONE_ALT_DISPLAY],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [CONTACT_FORM_EMAIL],
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.contact.title}
        description={pageSeo.contact.description}
        canonical="/contact"
        schema={[
          organizationSchema,
          localBusinessSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <PageHero
        badge={pageHeroCopy.contact.badge}
        title={pageHeroCopy.contact.h1}
        description={pageHeroCopy.contact.lead}
        imageSrc={heroContact}
        imageAlt={pageHeroAlts.contact}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <WhatsAppButton label="Get a freight quote" placement="hero" intent="quote" />
          <Button asChild size="lg" variant="on-dark-outline">
            <a href="#contact-form">Send a message</a>
          </Button>
        </CTAGroup>
      </PageHero>

      {/* Contact Info Grid */}
      <section className="section-band bg-white">
        <div className="section-band-inner">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {contactInfo.map((info, index) => (
            <div key={index} className="border border-border bg-surface p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-border bg-white text-primary">
                <info.icon size={22} />
              </div>
              <h3 className="mb-2 font-heading text-lg font-bold text-navy">{info.title}</h3>
              {info.details.map((detail, dIndex) => (
                <p key={dIndex} className="text-muted-foreground">{detail}</p>
              ))}
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container mx-auto container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-3 font-heading text-3xl font-bold md:text-4xl">Find Us</h2>
              <p className="text-gray-300">
                {companyAddress.line1}, {companyAddress.line2}, {companyAddress.line3}
              </p>
            </div>
            <Card className="overflow-hidden border border-border bg-white">
              <div className="relative h-96 w-full bg-surface">
                <iframe
                  title="ZAFTYS Logistics Amravati office location"
                  src={companyAddress.mapsEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="flex flex-col items-center justify-between gap-4 border-t border-border bg-surface px-6 py-4 sm:flex-row">
                <div className="flex items-start gap-3 text-sm text-navy">
                  <MapPin className="mt-0.5 shrink-0 text-accent" size={18} />
                  <span>
                    {companyAddress.line1}
                    <br />
                    {companyAddress.line2}, {companyAddress.line3}
                  </span>
                </div>
                <Button asChild variant="outline-brand" className="shrink-0">
                  <a
                    href={companyAddress.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section id="contact-form" className="section-padding bg-surface scroll-mt-28">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Form */}
            <Card className="border border-border bg-white">
              <CardContent className="p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-heading font-bold mb-2 text-navy">Send a Message</h2>
                  <p className="text-muted-foreground">Tell us what you need. The desk will follow up.</p>
                </div>

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
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="h-12"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className="h-12"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      className="h-12"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City (optional)</Label>
                      <Input
                        id="city"
                        placeholder="Pune"
                        className="h-12"
                        value={formData.city}
                        onChange={handleChange}
                        autoComplete="address-level2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pin">PIN code (optional)</Label>
                      <Input
                        id="pin"
                        inputMode="numeric"
                        placeholder="411001"
                        className="h-12"
                        value={formData.pin}
                        onChange={handleChange}
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest">I'm interested in...</Label>
                    <Select value={formData.interest} onValueChange={handleSelectChange}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quote">Freight quote (any truck class)</SelectItem>
                        <SelectItem value="demo">ZAFTYS TMS demo</SelectItem>
                        <SelectItem value="network-partner">Network partner / fleet registration</SelectItem>
                        <SelectItem value="tranzfort-post">TranZfort (post loads)</SelectItem>
                        <SelectItem value="tranzfort-find">TranZfort (find loads)</SelectItem>
                        <SelectItem value="careers">Careers</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your load requirements..."
                      className="min-h-[150px] resize-none p-4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" variant="accent" className="w-full h-14 text-lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        Sending...
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2" size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ / Additional Info */}
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-6 text-navy">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div className="border border-border bg-white p-6">
                    <h4 className="font-bold text-navy mb-2 flex items-center gap-2">
                      <Clock size={18} className="text-accent" /> What are your operating hours?
                    </h4>
                    <p className="text-muted-foreground">
                      Our office is open Mon-Sat, 9 AM to 6 PM. However, our operations and dispatch teams work 24/7 to ensure your shipments keep moving.
                    </p>
                  </div>
                  <div className="border border-border bg-white p-6">
                    <h4 className="font-bold text-navy mb-2 flex items-center gap-2">
                      <MessageSquare size={18} className="text-accent" /> How quickly can I get a quote?
                    </h4>
                    <p className="text-muted-foreground">
                      For standard FTL corridors, we typically respond during business hours. Specialized or project cargo may need more time for a proper assessment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden border border-border bg-navy p-8 text-white">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <MessageSquare size={100} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Need Urgent Support?</h3>
                <p className="text-gray-300 mb-6">
                  Existing clients can reach our priority dispatch desk directly.
                </p>
                <WhatsAppButton label="WhatsApp Priority Line" className="w-full" placement="contact-priority" />
              </div>

              <div className="border border-border bg-surface p-6">
                <h3 className="text-lg font-heading font-bold text-navy mb-3">Explore ZAFTYS</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to={paths.logistics.hub} className="text-primary hover:underline">Logistics and transportation</Link></li>
                  <li><Link to={paths.network.hub} className="text-primary hover:underline">Network and TranZfort</Link></li>
                  <li><Link to={paths.technology.tms} className="text-primary hover:underline">ZAFTYS TMS</Link></li>
                  <li><Link to={paths.partner} className="text-primary hover:underline">Become a partner</Link></li>
                  <li><Link to={paths.industries} className="text-primary hover:underline">Industries we serve</Link></li>
                  <li><Link to={paths.about} className="text-primary hover:underline">About ZAFTYS</Link></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
