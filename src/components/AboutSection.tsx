import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Building,
  Globe,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";
import OrbitalType from "./OrbitalType";

const AboutSection = () => {
  const achievements = [
    {
      icon: Award,
      title: "Industry Leader",
      description: "15+ years of litigation finance excellence",
    },
    {
      icon: Building,
      title: "Global Presence",
      description: "Offices in New York, London, and Singapore",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "50+ legal and finance professionals",
    },
    {
      icon: Globe,
      title: "International Reach",
      description: "Cases funded across 25+ countries",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white text-slate-900 relative overflow-hidden select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* ======================================================== */}
        {/* 2-COLUMN GRID: Left = Text Section, Right = 3D Globe     */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* LEFT: Text Content, Rating, and CTA */}
          <div className="space-y-6 text-left">
            <div>
              <Badge className="mb-4 bg-sky-50 text-[#001d51] border border-[#00BFFF]/30 text-xs sm:text-sm px-4 py-1.5 rounded-full font-semibold inline-flex items-center gap-1.5 shadow-none hover:bg-sky-100 transition-colors">
                About Lexian &amp; Jurian
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#001338] tracking-tight leading-tight mb-4">
                Pioneering Legal Finance Innovation
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4">
                Founded by seasoned legal and financial experts, Lexian &amp; Jurian has established itself as the premier
                litigation finance firm, combining deep legal expertise with sophisticated financial modeling to deliver
                exceptional results.
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Our commitment to transparency, innovation, and client success has made us the trusted partner for law firms,
                corporations, and individuals seeking strategic litigation funding solutions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-[#00BFFF] fill-current" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">
                  4.9/5 Client Satisfaction Rating
                </span>
              </div>

              <Button
                onClick={() => (window.location.href = "/our-story")}
                className="bg-[#00BFFF] hover:bg-[#33ccff] text-[#001d51] text-xs sm:text-sm font-semibold px-5 py-2.5 h-10 rounded-xl shadow-sm transition-all duration-200 inline-flex items-center"
              >
                Our Story
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* RIGHT: Interactive 3D Typography Globe (Orbital Type) */}
          <div className="relative flex items-center justify-center">
            {/* Soft cyan ambient illumination behind the globe */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[360px] md:w-[420px] h-[280px] sm:h-[360px] md:h-[420px] bg-[#00BFFF]/[0.08] blur-[80px] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            {/* Orbital Type container */}
            <div className="relative w-full max-w-[280px] sm:max-w-[420px] lg:max-w-[480px] h-[280px] sm:h-[400px] lg:h-[460px] mx-auto flex items-center justify-center">
              <OrbitalType />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM: Four Information Points as a Compact Strip       */}
        {/* ======================================================== */}
        <div className="mt-14 md:mt-16 pt-8 border-t border-slate-200 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center ${
                    index > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""
                  }`}
                >
                  <div className="p-2.5 bg-sky-50 border border-sky-100 rounded-xl w-fit mb-3 text-[#007ba8]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-[#001338] mb-1 text-sm md:text-base">
                    {achievement.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[220px]">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
