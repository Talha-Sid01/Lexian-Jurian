import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CommercialDisputeEnquirySection from "@/components/CommercialDisputeEnquirySection";
import AboutSection from "@/components/AboutSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ServicesMarquee from "@/components/ServicesMarquee";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProcessJourneySection from "@/components/ProcessJourneySection";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import PricingSection from "@/components/PricingSection";
import LogoMarquee from "@/components/LogoMarquee";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ClickSparkWrapper from "@/components/ClickSparkWrapper";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Scroll animation observer
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <ClickSparkWrapper />
      <Header />
      <main>
        <div id="home" className="scroll-mt-28">
          <HeroSection />
        </div>
        <LogoMarquee />
        <div id="enquiry" className="scroll-mt-28">
          <CommercialDisputeEnquirySection />
        </div>
        <div id="case-studies" className="scroll-mt-28">
          <CaseStudiesSection />
        </div>
        <WhyChooseUsSection />
        <ServicesMarquee />
        <div id="testimonials" className="scroll-mt-28">
          <TestimonialsSection />
        </div>
        <ProcessJourneySection />
        <div id="about" className="scroll-mt-28">
          <AboutSection />
        </div>
        <div id="team" className="scroll-mt-28">
          <TeamSection />
        </div>
        <div id="pricing" className="scroll-mt-28">
          <PricingSection />
        </div>
        <div id="faq" className="scroll-mt-28">
          <FAQSection />
        </div>
        <div id="contact" className="scroll-mt-28">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
