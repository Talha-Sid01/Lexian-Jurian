import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import OrbitingDisputeCards from "./OrbitingDisputeCards";
import TrustedClientsBadge from "./TrustedClientsBadge";

const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden min-h-[calc(100vh-6.75rem)] flex flex-col justify-center">
      {/* Subtle Ambient Radial Backlight */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 75% 40%, rgba(0, 191, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 20% 30%, rgba(0, 29, 81, 0.02) 0%, transparent 50%), #ffffff",
        }}
      />

      {/* Main 2-Column Split Hero Stage */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 flex-1 flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 xl:gap-8 items-center">
          
          {/* ============================================================== */}
          {/* LEFT COLUMN: Editorial Typography, Benefits & Primary Action    */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5 text-left animate-fade-in-up">
            {/* Editorial Headline */}
            <h1 className="font-serif font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] text-[#001d51] leading-[1.14] tracking-tight">
              Is Your Payment{" "}
              <span className="font-serif italic font-semibold text-[#00BFFF]">
                Defaulted?
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base md:text-[1.05rem] lg:text-[1.125rem] text-slate-600 max-w-[500px] leading-relaxed font-normal">
              Specialist legal representation for businesses. We cover all costs and only get paid when you recover funds.
            </p>

            {/* Benefit Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-medium text-slate-700">
              <span className="inline-flex items-center px-3 py-1 bg-white/95 rounded-full border border-slate-200/80 shadow-xs">
                Minimal Upfront Cost
              </span>
              <span className="text-[#00BFFF] font-bold">·</span>
              <span className="inline-flex items-center px-3 py-1 bg-white/95 rounded-full border border-slate-200/80 shadow-xs">
                We Win When You Win
              </span>
              <span className="text-[#00BFFF] font-bold">·</span>
              <span className="inline-flex items-center px-3 py-1 bg-white/95 rounded-full border border-slate-200/80 shadow-xs">
                Just Results
              </span>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2 sm:pt-3">
              <a href="#contact" className="inline-block">
                <Button
                  className="
                    bg-[#00BFFF] text-[#001d51]
                    hover:bg-[#26cbff]
                    border-0 shadow-sm hover:shadow-md
                    transition-all duration-200 hover:-translate-y-0.5
                    text-xs sm:text-[13.5px]
                    px-6 sm:px-7
                    h-10 sm:h-11
                    font-semibold
                    rounded-full
                    flex items-center
                  "
                >
                  <span>Get Free Case Assessment</span>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </a>
            </div>

            {/* Trust Proof Component: Trusted by 5000+ Clients */}
            <div className="pt-2 sm:pt-3">
              <TrustedClientsBadge />
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: 3D Orbital Carousel Around Indian Businessman     */}
          {/* ============================================================== */}
          <div
            className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <OrbitingDisputeCards />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
