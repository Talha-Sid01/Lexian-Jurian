import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone,
  MapPin,
  Instagram,
  Facebook
} from "lucide-react";
import { CONTACT_CONFIG } from "@/config/contactLinks";
import { useNavigate, useLocation } from "react-router-dom";
import blueLogo from "@/assets/bluelogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
    }
  };

  const footerSections = [
    {
      title: "Services",
      links: [
        { label: "Legal Funding", action: () => navigate('/services') },
        { label: "Case Management", action: () => navigate('/services') },
        { label: "Portfolio Services", action: () => navigate('/services') },
        { label: "Risk Assessment", action: () => navigate('/risk-assessment') },
        { label: "Strategic Consulting", action: () => scrollToSection('contact') }
      ]
    },
    {
      title: "Company", 
      links: [
        { label: "About Us", action: () => scrollToSection('about') },
        { label: "Our Team", action: () => scrollToSection('team') },
        { label: "Case Studies", action: () => scrollToSection('case-studies') },
        { label: "FAQ", action: () => scrollToSection('faq') },
        { label: "Contact", action: () => scrollToSection('contact') }
      ]
    }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div 
                className="flex items-center space-x-3 mb-4 cursor-pointer"
                onClick={() => scrollToSection('home')}
              >
                <img src={blueLogo} alt="Lexian & Jurian Logo" className="h-12 w-12" />
                <div>
                  <h3 className="text-2xl font-bold">Lexian & Jurian</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    A Smart Dispute Resolution Platform
                  </p>
                </div>
              </div>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                Specialist legal representation for businesses. We cover all costs and only get paid when you recover funds.
Minimal Upfront Cost, We Win When You Win and Just Results.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">F-4,Palkhi Aura, Borivali East, Mumbai-400066</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">+91 77150 91827</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary-foreground/60 mt-0.5 shrink-0" />
                <div className="flex flex-col space-y-1">
                  <a href="mailto:info@lexianandjurian.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">info@lexianandjurian.com</a>
                  <a href="mailto:ceo@lexianandjurian.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">ceo@lexianandjurian.com</a>
                </div>
              </div>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button 
                      onClick={link.action}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 bg-primary-foreground/20" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-primary-foreground/70 text-sm">
            Lexian and Jurian Facilitation Services LLP is not a law firm, broker-dealer, lender, investment advisor, or money transfer service, and does not provide legal advice or legal services. All services are limited to facilitation, case management, and process support. Any legal or professional services are provided solely by independent third-party professionals.

By accessing or using this website or services, you agree to our Terms & Conditions and Privacy Policy. Lexian and Jurian Facilitation Services LLP and any Special Purpose Vehicle (SPV) or LLP formed for specific engagements are separate legal entities. Participation involves risk, and outcomes or recoveries are not guaranteed.
          </div>
        </div>
        <Separator className="my-12 bg-primary-foreground/20" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-primary-foreground/70 text-sm">
            © {currentYear} Lexian & Jurian. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <a href={CONTACT_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
              <a href={CONTACT_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                  <Instagram className="h-4 w-4" />
                </Button>
              </a>
              <a href={CONTACT_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                  <Facebook className="h-4 w-4" />
                </Button>
              </a>
              <a href={CONTACT_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                  <Twitter className="h-4 w-4" />
                </Button>
              </a>
              <a href="mailto:info@lexianandjurian.com" aria-label="Email">
                <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                  <Mail className="h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/70">
              <button onClick={() => navigate('/privacy-policy')} className="hover:text-primary-foreground transition-colors">Privacy Policy</button>
              <button onClick={() => navigate('/terms-of-service')} className="hover:text-primary-foreground transition-colors">Terms of Service</button>
              <button onClick={() => navigate('/cookie-policy')} className="hover:text-primary-foreground transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
