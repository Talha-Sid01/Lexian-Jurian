import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  ClipboardCheck,
  Scale,
  MessageCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  isCta?: boolean;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Submission of Case",
    description:
      "Submit your case details and documentation for preliminary review by our expert legal team.",
    icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BFFF]" />,
    badge: "Initial Step",
  },
  {
    number: "02",
    title: "Jury Report Preparation",
    description:
      "Our panel of experts conducts comprehensive evaluation and prepares a detailed assessment report.",
    icon: <ClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BFFF]" />,
    badge: "Expert Evaluation",
  },
  {
    number: "03",
    title: "Resolution",
    description:
      "Strategic dispute resolution through negotiation, mediation, or litigation to achieve favorable outcomes.",
    icon: <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BFFF]" />,
    badge: "Strategic Advocacy",
  },
  {
    number: "04",
    title: "Stay Connected",
    description:
      "Subscribe to receive updates on your case progress and get personalized legal insights.",
    icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BFFF]" />,
    badge: "Ongoing Support",
    isCta: true,
  },
];

interface Metric {
  value: string;
  label: string;
  subtext: string;
  icon: React.ReactNode;
}

const METRICS: Metric[] = [
  {
    value: "1%",
    label: "Minimal Upfront Cost",
    subtext: "Pay only when you recover",
    icon: <ShieldCheck className="w-4 h-4 text-[#00BFFF]" />,
  },
  {
    value: "48–72 hrs",
    label: "Quick Assessment",
    subtext: "Fast, comprehensive review",
    icon: <Clock className="w-4 h-4 text-[#00BFFF]" />,
  },
  {
    value: "100%",
    label: "Full Transparency",
    subtext: "Clear terms and no hidden fees",
    icon: <CheckCircle2 className="w-4 h-4 text-[#00BFFF]" />,
  },
];

const ProcessJourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    // Scroll trigger observer for sequential reveal
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, []);

  // Staggered activation of steps upon section entry
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      if (isVisible) setActiveStep(STEPS.length);
      return;
    }

    const intervals: NodeJS.Timeout[] = [];
    STEPS.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setActiveStep(idx + 1);
      }, 300 + idx * 240);
      intervals.push(timer);
    });

    return () => {
      intervals.forEach(clearTimeout);
    };
  }, [isVisible, prefersReducedMotion]);

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="processjourney"
      aria-label="Our Process - Your Funding Journey"
      className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-b from-[#001338] via-[#001d51] to-[#001438] text-white overflow-hidden select-none"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20 transition-all duration-700 ease-out ${
            isVisible || prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {/* Compact Pill Label: OUR PROCESS */}
          <Badge
            className="inline-flex items-center gap-1.5 mb-3 sm:mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/30 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00BFFF]" />
            <span>OUR PROCESS</span>
          </Badge>

          {/* Main Heading: Your Funding Journey */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-3 sm:mb-4">
            Your Funding Journey
          </h2>

          {/* Supporting Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A transparent, step-by-step journey to provide you with the support needed to pursue justice.
          </p>
        </div>

        {/* ======================================================== */}
        {/* FOUR-STEP VERTICAL TIMELINE                              */}
        {/* ======================================================== */}
        <div className="relative max-w-3xl lg:max-w-4xl mx-auto">
          {/* Vertical Timeline Track Line */}
          <div
            className="absolute left-[22px] sm:left-[28px] md:left-[35px] top-[28px] sm:top-[32px] bottom-[28px] sm:bottom-[32px] w-[2px] pointer-events-none"
            aria-hidden="true"
          >
            {/* Background inactive line */}
            <div className="w-full h-full bg-white/10 rounded-full" />
            
            {/* Active line that fills down */}
            <div
              className="absolute top-0 left-0 w-full bg-[#00BFFF] rounded-full transition-all duration-1000 ease-out"
              style={{
                height:
                  prefersReducedMotion || activeStep >= 4
                    ? "100%"
                    : activeStep <= 1
                    ? "0%"
                    : `${((activeStep - 1) / (STEPS.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Timeline Step Items */}
          <div className="space-y-5 sm:space-y-8 md:space-y-10">
            {STEPS.map((step, idx) => {
              const isStepActive = prefersReducedMotion || activeStep >= idx + 1;
              const delayMs = prefersReducedMotion ? 0 : idx * 180;

              return (
                <div
                  key={step.number}
                  className={`relative flex items-start gap-3 sm:gap-6 md:gap-8 transition-all duration-700 ease-out ${
                    isStepActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${delayMs}ms`,
                  }}
                >
                  {/* Numbered Cyan Circle Indicator */}
                  <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
                    <div
                      className={`w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] md:w-[70px] md:h-[70px] rounded-full flex items-center justify-center font-sans font-bold text-sm sm:text-lg md:text-xl transition-all duration-500 ease-out ${
                        isStepActive
                          ? "bg-[#00BFFF] text-[#001d51] shadow-md scale-100"
                          : "bg-[#031d4d] text-slate-400 border border-white/20 scale-95"
                      }`}
                    >
                      <span>{step.number}</span>
                    </div>

                    {/* Horizontal Connector Line between circle and card */}
                    <div
                      className={`hidden sm:block absolute left-full w-4 sm:w-6 md:w-8 h-[2px] transition-all duration-500 pointer-events-none ${
                        isStepActive
                          ? "bg-[#00BFFF]/40"
                          : "bg-white/10"
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Process Card to the Right */}
                  <div
                    className={`flex-1 rounded-2xl p-4 sm:p-6 md:p-8 bg-[#031d4d]/80 backdrop-blur-md border transition-all duration-300 ease-out group ${
                      isStepActive
                        ? "border-white/10 shadow-lg hover:border-[#00BFFF]/40 hover:-translate-y-0.5"
                        : "border-white/10 opacity-70"
                    }`}
                  >
                    {/* Card Header Row: Icon + Title + Stage Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Compact Cyan-Tinted Icon Box */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#00BFFF]/15 border border-[#00BFFF]/30 flex items-center justify-center text-[#00BFFF] shadow-inner flex-shrink-0 group-hover:scale-105 group-hover:bg-[#00BFFF]/20 transition-all duration-300">
                          {step.icon}
                        </div>

                        <div>
                          <span className="block font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-[#00BFFF] uppercase">
                            STEP {step.number}
                          </span>
                          <h3 className="font-serif font-bold text-lg sm:text-xl md:text-2xl text-white group-hover:text-[#00BFFF] transition-colors duration-200">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Optional Stage Tag */}
                      {step.badge && (
                        <span className="self-start sm:self-auto text-[10px] sm:text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                          {step.badge}
                        </span>
                      )}
                    </div>

                    {/* Step Description */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed pl-0 sm:pl-[64px]">
                      {step.description}
                    </p>

                    {/* Optional Interactive CTA for Step 04 */}
                    {step.isCta && (
                      <div className="mt-5 pl-0 sm:pl-[64px]">
                        <button
                          type="button"
                          onClick={handleContactClick}
                          className="inline-flex items-center gap-2 bg-[#00BFFF] hover:bg-[#33ccff] text-[#001d51] px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group/btn"
                        >
                          <span>Connect With Legal Team</span>
                          <ArrowRight className="w-4 h-4 text-[#001d51] transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* THREE KEY METRICS ROW                                    */}
        {/* ======================================================== */}
        <div
          className={`mt-14 sm:mt-18 md:mt-24 max-w-4xl mx-auto transition-all duration-700 ease-out ${
            isVisible || prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: prefersReducedMotion ? "0ms" : "700ms",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl p-6 sm:p-7 md:p-8 bg-[#031d4d]/75 backdrop-blur-md border border-white/10 text-center hover:border-[#00BFFF]/40 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Decorative Top Accent Tag */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-medium text-slate-300 mb-3">
                  {metric.icon}
                  <span>Verified Metric</span>
                </div>

                {/* Large Cyan Metric Figure */}
                <div className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#00BFFF] tracking-tight group-hover:scale-105 transition-transform duration-200">
                  {metric.value}
                </div>

                {/* Primary Metric Label */}
                <h4 className="text-white font-serif font-bold text-sm sm:text-base md:text-lg mt-2">
                  {metric.label}
                </h4>

                {/* Subtext description */}
                <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-normal">
                  {metric.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessJourneySection;
