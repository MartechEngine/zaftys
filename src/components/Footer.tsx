import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoFooter from "@/assets/logo-footer.png";
import { useToast } from "@/hooks/use-toast";
import { footerColumns } from "@/lib/nav-config";
import { externalLinks, whatsappUrl, companyAddress, legalEntity, COMPANY_EMAIL, SUBSCRIBERS_EMAIL } from "@/lib/constants";
import { subscribeNewsletter } from "@/lib/newsletter";
import { trackEvent } from "@/lib/analytics";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    try {
      const result = await subscribeNewsletter(email, "footer");

      if (result.success) {
        toast({
          title: "Subscribed",
          description: "You have been added to our newsletter list.",
        });
        setEmail("");
      } else {
        throw new Error(result.error || "Subscription failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not subscribe you right now. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const legal = [
    { name: "Terms of Use", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Legal Notice", path: "/legal-notice" },
  ];

  return (
    <footer className="border-t border-white/5 bg-navy font-sans text-white">
      <div className="container mx-auto container-padding pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16 border-b border-white/10 pb-12">
          <div>
            <img src={logoFooter} alt="ZAFTYS Logistics" className="h-14 w-auto mb-6" loading="lazy" />
            <p className="text-gray-400 max-w-md text-lg leading-relaxed">
              Technology-enabled transportation and logistics. Owned fleet, contract logistics, verified partner network, and ZAFTYS TMS from Amravati, Maharashtra.
            </p>
            <a
              href={externalLinks.tranzfort}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_tranzfort", { placement: "footer" })}
              className="inline-flex items-center gap-2 mt-4 text-accent hover:text-accent-light text-sm font-semibold transition-colors"
            >
              Explore TranZfort marketplace <ArrowRight size={14} />
            </a>
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Stay updated</h3>
            <p className="text-gray-400 mb-4">Occasional operational notes and company updates. No spam.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12"
                value={email}
                onChange={handleChange}
                required
              />
              <Button type="submit" variant="accent" className="h-12 px-8 shrink-0" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-gray-500 text-xs mt-3">
              Unsubscribe anytime at {SUBSCRIBERS_EMAIL}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-10 mb-12">
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6 font-heading uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="mt-1 text-accent shrink-0" size={18} />
                <span>
                  {companyAddress.line1}
                  <br />
                  {companyAddress.line2}
                  <br />
                  {companyAddress.line3}
                </span>
              </li>
              <li>
                <a
                  href="tel:+919270923581"
                  className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors"
                  onClick={() => trackEvent("cta_call", { placement: "footer" })}
                >
                  <Phone className="text-accent shrink-0" size={18} />
                  <span>+91-927-092-3581</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-[#25D366] transition-colors"
                  onClick={() => trackEvent("cta_whatsapp", { placement: "footer" })}
                >
                  <MessageCircle className="text-[#25D366] shrink-0" size={18} />
                  <span>WhatsApp us</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors"
                  onClick={() => trackEvent("cta_mailto", { placement: "footer" })}
                >
                  <Mail className="text-accent shrink-0" size={18} />
                  <span>{COMPANY_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>

          {footerColumns.map((column, index) => (
            <div key={column.title}>
              <h4 className="text-lg font-bold text-white mb-6 font-heading uppercase tracking-wider">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-accent transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
                {column.title === "Network" ? (
                  <li>
                    <a
                      href={externalLinks.tranzfort}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-accent transition-colors"
                      onClick={() => trackEvent("cta_tranzfort", { placement: "footer-links" })}
                    >
                      tranzfort.com
                    </a>
                  </li>
                ) : null}
              </ul>
              {index === footerColumns.length - 1 ? (
                <a
                  href={externalLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all duration-300"
                  aria-label="ZAFTYS on LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 bg-black/20">
        <div className="container mx-auto container-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {legalEntity.name}. {legalEntity.credentialsLong}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              {legal.map((item) => (
                <Link key={item.name} to={item.path} className="hover:text-white transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
