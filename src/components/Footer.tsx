import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoFooter from "@/assets/logo-footer.png";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Fleet", path: "/fleet" },
    { name: "Technology", path: "/technology" },
    { name: "Careers", path: "/careers" },
  ];

  const services = [
    { name: "FTL Transport", path: "/services" },
    { name: "Mining Logistics", path: "/services" },
    { name: "Project Cargo", path: "/services" },
    { name: "Supply Chain", path: "/services" },
  ];

  const legal = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/privacy#cookies" },
  ];

  return (
    <footer className="bg-[#0B1120] text-white border-t border-white/5 font-sans">
      {/* Top Section: Newsletter & Brand */}
      <div className="container mx-auto container-padding pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16 border-b border-white/10 pb-12">
          <div>
            <img src={logoFooter} alt="ZAFTYS Logistics" className="h-14 w-auto mb-6" loading="lazy" />
            <p className="text-gray-400 max-w-md text-lg leading-relaxed">
              Powering India's industrial growth with reliable, tech-enabled logistics solutions. 
              Three generations of trust, delivered daily.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Get the latest industry insights and company news.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="Enter your email address" 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12" 
              />
              <Button className="bg-accent hover:bg-accent-light h-12 px-8 font-bold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors">
                <MapPin className="mt-1 text-accent shrink-0" size={18} />
                <span>World Trade Center, Kharadi<br/>Pune, India - 411014</span>
              </li>
              <li>
                <a href="tel:+919270923581" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors">
                  <Phone className="text-accent shrink-0" size={18} />
                  <span>+91-927-092-3581</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@zaftys.com" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors">
                  <Mail className="text-accent shrink-0" size={18} />
                  <span>contact@zaftys.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-accent hover:translate-x-1 transition-all inline-flex items-center">
                    <ArrowRight size={14} className="mr-2 opacity-0 hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-accent hover:translate-x-1 transition-all inline-flex items-center">
                    <ArrowRight size={14} className="mr-2 opacity-0 hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-4">
              {[
                { Icon: Twitter, href: "https://twitter.com/zaftys" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/zaftys" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container mx-auto container-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ZAFTYS Logistics Pvt Ltd. All rights reserved.
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
