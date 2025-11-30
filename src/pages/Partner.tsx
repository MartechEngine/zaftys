import { useState, type ChangeEvent, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network, TrendingUp, Shield, Zap, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";

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
    { step: "01", title: "Register", desc: "Submit your fleet details online." },
    { step: "02", title: "Verify", desc: "Quick compliance and safety check." },
    { step: "03", title: "Onboard", desc: "Get access to the TSM platform." },
    { step: "04", title: "Earn", desc: "Start accepting loads immediately." },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="Partner With Us - Fleet Owners & Transporters" 
        description="Join the ZAFTYS network. Guaranteed loads, timely payments, and free TSM technology for fleet owners. Register your vehicles today." 
        canonical="/partner"
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[450px] flex items-center bg-navy text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy"></div>
        
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6 uppercase tracking-widest">
              Fleet Owners
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in-up">
              Grow with ZAFTYS.
            </h1>
            <p className="text-xl text-gray-300 animate-fade-in-up max-w-2xl mx-auto font-light leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Join India's most transparent logistics network. Consistent loads, timely payments, and technology that works for you.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Network, title: "Nationwide Access", desc: "Connect with clients across 20+ states." },
              { icon: TrendingUp, title: "High Utilization", desc: "Reduce empty return trips with backhaul matching." },
              { icon: Shield, title: "Timely Payments", desc: "Transparent billing and guaranteed payment cycles." },
              { icon: Zap, title: "Free Tech", desc: "Zero cost access to our TSM platform." },
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
            <h2 className="text-3xl font-heading font-bold mb-4 text-navy">Simple Onboarding</h2>
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
      <section className="py-20 bg-navy text-white">
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

                  <Button size="lg" className="w-full bg-accent hover:bg-accent-light text-white font-bold" disabled={isSubmitting}>
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
    </div>
  );
};

export default Partner;
