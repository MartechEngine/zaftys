import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Users, Code, TrendingUp, Heart, Trophy, ArrowRight, Briefcase, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";

const Careers = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Submitted",
        description: "Our HR team will review your profile and get in touch.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const positions = [
    {
      title: "Senior Fleet Driver",
      type: "Full-time",
      location: "Multiple Locations",
      requirements: "Valid commercial license, 5+ years experience, GPS proficiency.",
      perks: ["Performance bonuses", "Health insurance", "Paid leave"],
    },
    {
      title: "Logistics Coordinator",
      type: "Full-time",
      location: "Pune (HQ)",
      requirements: "Experience with TSM/ERP systems, strong communication skills.",
      perks: ["Career progression", "Tech training", "Competitive salary"],
    },
    {
      title: "Backend Developer (TSM)",
      type: "Remote / Hybrid",
      location: "Remote / Pune",
      requirements: "Node.js, React, PostgreSQL experience. Logistics domain knowledge is a plus.",
      perks: ["Flexible hours", "Innovation budget", "Latest tech stack"],
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="Careers at ZAFTYS - Join Our Logistics Team" 
        description="Build your career with India's leading logistics company. Openings for Senior Drivers, Logistics Coordinators, and TSM Developers." 
        canonical="/careers"
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[450px] flex items-center bg-navy text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy"></div>
        
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6 uppercase tracking-widest">
              Join Our Team
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in-up">
              Drive With Purpose.
            </h1>
            <p className="text-xl text-gray-300 animate-fade-in-up max-w-2xl mx-auto font-light leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Build your career with India's most forward-thinking logistics company. We value talent, integrity, and ambition.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-6 text-navy">More Than Just a Job</h2>
            <p className="text-lg text-muted-foreground">
              At ZAFTYS, we invest in our people. Whether you're behind the wheel or behind a screen, you're a vital part of our journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Wellness", desc: "Comprehensive health coverage for you and your family." },
              { icon: TrendingUp, title: "Growth", desc: "Clear career paths and regular skill development workshops." },
              { icon: Trophy, title: "Rewards", desc: "Performance-based bonuses and safety incentives." },
              { icon: Users, title: "Culture", desc: "A supportive, inclusive environment rooted in family values." },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:-translate-y-1 transition-transform duration-300 border-none shadow-lg bg-muted/10">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-navy">Current Openings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {positions.map((job, index) => (
              <Card key={index} className="flex flex-col h-full border-none shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">{job.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                    <Briefcase size={14} /> {job.location}
                  </p>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {job.requirements}
                  </p>
                  
                  <div className="space-y-2 mb-6 pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-navy">Perks:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.perks.map((perk, pIndex) => (
                        <span key={pIndex} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary-light mt-auto">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto container-padding">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold mb-4">Don't See Your Role?</h2>
              <p className="text-gray-300">
                We're always looking for talent. Send us your details and we'll keep you on file.
              </p>
            </div>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                      <Input id="name" placeholder="Jane Doe" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-200">Email</Label>
                      <Input id="email" type="email" placeholder="jane@example.com" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resume" className="text-gray-200">Upload Resume / CV</Label>
                    <Input id="resume" type="file" className="bg-white/10 border-white/20 text-white file:text-white file:bg-accent file:border-0 file:mr-4 file:px-4 file:rounded-sm hover:file:bg-accent-light cursor-pointer" required />
                  </div>

                  <Button size="lg" className="w-full bg-accent hover:bg-accent-light text-white font-bold" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Submitting... <Loader2 className="ml-2 h-4 w-4 animate-spin" /></>
                    ) : (
                      "Submit General Application"
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

export default Careers;
