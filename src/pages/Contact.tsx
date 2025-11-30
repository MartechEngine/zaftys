import { useState, type ChangeEvent, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Controlled form state, including honeypot field "website"
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
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
        toast({
          title: "Message Sent!",
          description: "We've received your inquiry and will get back to you shortly.",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          interest: "",
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
      details: ["World Trade Center, Kharadi", "Pune, India - 411014"],
    },
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91-927-092-3581", "+91-989-092-3581"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["contact@zaftys.com"],
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="Contact Us - Get a Freight Quote" 
        description="Speak to our dispatch team. 24/7 support for your supply chain needs. Located in Pune. Call +91-927-092-3581." 
        canonical="/contact"
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-navy text-white overflow-hidden min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"></div>
        
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in-up">
              Let's Move Forward Together
            </h1>
            <p className="text-xl text-gray-300 animate-fade-in-up max-w-2xl mx-auto font-light">
              Have a question or need a quote? Our team is ready to help you optimize your logistics.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-16 bg-white border-b border-border relative -mt-10 mx-4 md:mx-8 lg:mx-16 rounded-xl shadow-lg z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="text-center group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary group-hover:scale-110 transition-transform">
                <info.icon size={24} />
              </div>
              <h3 className="text-lg font-heading font-bold text-navy mb-2">{info.title}</h3>
              {info.details.map((detail, dIndex) => (
                <p key={dIndex} className="text-muted-foreground">{detail}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container mx-auto container-padding">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center animate-fade-in-up">Find Us</h2>
            <Card className="overflow-hidden animate-scale-in border-none shadow-2xl">
              <div className="w-full h-96 bg-white/10 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-20"></div>
                <div className="text-center relative z-10">
                  <MapPin className="mx-auto mb-4 text-accent" size={48} />
                  <p className="text-lg font-semibold text-white mb-2">World Trade Center, Kharadi</p>
                  <p className="text-gray-300">Pune, India</p>
                  <Button className="mt-6 bg-white text-navy hover:bg-gray-100 font-bold">
                    Get Directions
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Form */}
            <Card className="border-none shadow-lg bg-white animate-fade-in-up">
              <CardContent className="p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-heading font-bold mb-2 text-navy">Send a Message</h2>
                  <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
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

                  <div className="space-y-2">
                    <Label htmlFor="interest">I'm interested in...</Label>
                    <Select value={formData.interest} onValueChange={handleSelectChange}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quote">Getting a Quote</SelectItem>
                        <SelectItem value="demo">TSM Demo</SelectItem>
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

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary-light transition-colors"
                    disabled={isSubmitting}
                  >
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
            <div className="space-y-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div>
                <h3 className="text-2xl font-heading font-bold mb-6 text-navy">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                    <h4 className="font-bold text-navy mb-2 flex items-center gap-2">
                      <Clock size={18} className="text-accent" /> What are your operating hours?
                    </h4>
                    <p className="text-muted-foreground">
                      Our office is open Mon-Sat, 9 AM to 6 PM. However, our operations and dispatch teams work 24/7 to ensure your shipments keep moving.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                    <h4 className="font-bold text-navy mb-2 flex items-center gap-2">
                      <MessageSquare size={18} className="text-accent" /> How quickly can I get a quote?
                    </h4>
                    <p className="text-muted-foreground">
                      For standard FTL routes, we usually provide a quote within 2 hours. For specialized or project cargo, please allow up to 24 hours for a detailed assessment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-navy text-white p-8 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <MessageSquare size={100} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Need Urgent Support?</h3>
                <p className="text-gray-300 mb-6">
                  Existing clients can reach our priority dispatch desk directly.
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 w-full"
                >
                  Call Priority Line: +91-989-092-3581
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
