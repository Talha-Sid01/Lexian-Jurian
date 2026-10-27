import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowUpRight } from "lucide-react";
import lexianandjurianheader from "@/assets/lexianandjurianheader.png";
import AnnouncementBar from "./AnnouncementBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  // Active section tracker & scroll state on scroll
  useEffect(() => {
    if (location.pathname === "/services") {
      setActiveSection("services");
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }

    if (location.pathname !== "/") {
      setActiveSection("");
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        if (item.id === "services") continue;
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);

    if (sectionId === "services") {
      setActiveSection("services");
      navigate("/services");
      return;
    }

    setActiveSection(sectionId);

    const performScroll = () => {
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const element = document.getElementById(sectionId);
      if (element) {
        const headerEl = document.querySelector("header");
        const headerHeight = headerEl ? headerEl.offsetHeight : 108;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const targetPosition = Math.max(0, elementPosition - headerHeight - 16);

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(performScroll, 120);
    } else {
      performScroll();
    }
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm"
          : "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs"
      }`}
    >
      <AnnouncementBar />
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        {/* Balanced 3-column grid to ensure exact viewport centering */}
        <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center">
          {/* Left Column: Brand Logo */}
          <div
            className="flex items-center justify-start cursor-pointer transition-opacity duration-200 hover:opacity-90"
            onClick={() => scrollToSection("home")}
          >
            <img
              src={lexianandjurianheader}
              alt="Lexian & Jurian Logo"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            />
          </div>

          {/* Center Column: Genuinely Centered Navigation Links with Clean Minimal Hover */}
          <div className="hidden md:flex items-center justify-center">
            <div className="flex items-center space-x-7 lg:space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      text-sm lg:text-[15px] font-medium select-none
                      tracking-normal hover:tracking-[0.1em]
                      transition-all duration-300 ease-out
                      ${
                        isActive
                          ? "text-[#001d51] font-semibold"
                          : "text-slate-700 hover:text-[#00BFFF]"
                      }
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF] rounded px-1 py-0.5
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Primary CTA & Mobile Toggle */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              onClick={() => window.open("https://crm.lexianandjurian.com", "_blank")}
              size="sm"
              className="
                hidden sm:inline-flex items-center gap-1.5
                bg-[#001d51] hover:bg-[#002766] text-white hover:text-white
                border border-[#001d51] hover:border-[#00BFFF]
                font-medium text-xs sm:text-sm rounded-full
                px-5 sm:px-6 py-2.5 h-10
                shadow-xs hover:shadow-md
                transition-all duration-300 ease-out hover:-translate-y-0.5
                group
              "
            >
              <span className="transition-all duration-300 ease-out group-hover:tracking-wider">
                Login / Signup
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00BFFF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              className="md:hidden p-2 text-[#001d51] hover:text-[#00BFFF] transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-[#00BFFF]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-slate-100 space-y-2 animate-fade-in-up">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  block w-full text-left py-2 px-3 text-base font-medium rounded-lg transition-colors
                  ${activeSection === item.id ? "bg-slate-100 text-[#001d51] font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-[#00BFFF]"}
                `}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                  window.open("https://crm.lexianandjurian.com", "_blank");
                }}
                className="w-full bg-[#00BFFF] hover:bg-[#26cbff] text-[#001d51] font-semibold py-2.5 rounded-full shadow-sm"
              >
                Login / Signup
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
