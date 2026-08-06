import { useState, type ChangeEvent, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Users, Code, TrendingUp, Heart, Trophy, ArrowRight, Briefcase, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { pageHeroImages } from "@/lib/page-heroes";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { CTAGroup } from "@/components/CTAGroup";
import { useToast } from "@/hooks/use-toast";
import { pageSeo } from "@/lib/page-seo";

const Careers = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    resumeFileName: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({ ...prev, resumeFileName: file ? file.name : "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/careers.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Application Submitted",
          description: "Our HR team will review your profile and get in touch.",
        });
        setFormData({
          name: "",
          email: "",
          website: "",
          resumeFileName: "",
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
      location: "Amravati (HQ)",
      requirements: "Experience with TMS/ERP systems, strong communication skills.",
      perks: ["Career progression", "Tech training", "Competitive salary"],
    },
    {
      title: "Backend Developer (TMS)",
      type: "Remote / Hybrid",
      location: "Remote / Amravati",
      requirements: "Node.js, React, PostgreSQL experience. Logistics domain knowledge is a plus.",
      perks: ["Flexible hours", "Innovation budget", "Latest tech stack"],
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title={pageSeo.careers.title}
        description={pageSeo.careers.description}
        canonical="/careers"
      />
      <PageHero
        badge="Join Our Team"
        title="Careers In Logistics, Operations & Technology."
        description="Join ZAFTYS in Amravati and across our network  -  roles where corridor experience and transport technology solve real industrial freight problems."
        imageSrc={pageHeroImages.careers.src}
        imageAlt={pageHeroImages.careers.alt}
      >
        <CTAGroup className="justify-start sm:justify-start">
          <Button asChild size="lg" variant="on-dark">
            <a href="#open-positions">View Open Positions</a>
          </Button>
          <HeroEmailButton
            label="Email HR Team"
            variant="on-dark-outline"
            subject={heroMailSubjects.careers}
            body={heroMailBodies.careers}
          />
        </CTAGroup>
      </PageHero>

      {/* Why Join Us */}
      <section className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-6 text-navy">More Than A Job Title.</h2>
            <p className="text-lg text-muted-foreground">
              Whether you are behind the wheel, on the dispatch floor, or building software, your work directly supports businesses that depend on predictable logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Wellness", desc: "Health and safety support appropriate to role  -  details communicated during hiring." },
              { icon: TrendingUp, title: "Growth", desc: "Clear paths to develop skills in operations, coordination, and technology." },
              { icon: Trophy, title: "Rewards", desc: "Performance and safety recognition where applicable  -  structured through HR policy." },
              { icon: Users, title: "Culture", desc: "A supportive environment rooted in operational discipline and family values." },
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
      <section id="open-positions" className="section-padding bg-muted/30 scroll-mt-28">
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
      <section id="careers-form" className="py-20 bg-navy text-white scroll-mt-28">
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
                      <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Jane Doe"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-200">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resume" className="text-gray-200">Upload Resume / CV</Label>
                    <Input
                      id="resume"
                      type="file"
                      className="bg-white/10 border-white/20 text-white file:text-white file:bg-accent file:border-0 file:mr-4 file:px-4 file:rounded-sm hover:file:bg-accent-light cursor-pointer"
                      onChange={handleFileChange}
                      required
                    />
                  </div>

                  <Button size="lg" variant="accent" className="w-full" disabled={isSubmitting}>
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
