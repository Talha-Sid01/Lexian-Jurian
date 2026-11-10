import React, { useState, useRef, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Linkedin,
  Mail,
  Users,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import siddharthImg from "@/assets/Siddharth.webp";
import sayaliImg from "@/assets/Sayali.webp";

// =========================================================================
// 1. CENTRALIZED TEAM MEMBER DATA STRUCTURE
// =========================================================================
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "Founding Partner" | "Legal Head";
  image: string;
  imagePosition?: string;
  bio: string;
  linkedin: string;
  email: string;
  initials: string;
  specialization: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "siddharth",
    name: "Mr. Siddharth Lokhande",
    role: "Founding Partner",
    category: "Founding Partner",
    image: siddharthImg,
    imagePosition: "object-[center_15%]",
    bio: "With over 5 years of experience in commercial dispute litigation, Siddharth has successfully recovered more than 1.5 millions for clients across various industries.",
    linkedin: "https://www.linkedin.com/in/siddharth-lokhande-938377213/",
    email: "ceo@lexianandjurian.com",
    initials: "SL",
    specialization: "Commercial Dispute Litigation & Strategic Claims",
  },
  {
    id: "sayali",
    name: "Adv. Sayali Kadam",
    role: "Legal Head",
    category: "Legal Head",
    image: sayaliImg,
    imagePosition: "object-[center_15%]",
    bio: "Sayali specializes in complex commercial disputes and has a track record of 95% success rate in contract breach and partnership dissolution cases.",
    linkedin: "https://www.linkedin.com/in/",
    email: "info@lexianandjurian.com",
    initials: "SK",
    specialization: "Complex Commercial Disputes & Contract Breach",
  },
];

// =========================================================================
// 2. EXPERT JURY SLIDER COMPONENT (Preserved)
// =========================================================================
const ExpertJurySlider = () => {
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderProgress, setSliderProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [trackWidth, setTrackWidth] = useState(360);

  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        setTrackWidth(sliderRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth, { passive: true });
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const calculateProgress = useCallback((clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const thumbWidth = window.innerWidth >= 640 ? 48 : 44;
    const maxTravel = Math.max(1, rect.width - thumbWidth - 8);
    const startX = rect.left + 4;
    const currentX = Math.max(0, Math.min(clientX - startX - thumbWidth / 2, maxTravel));
    return currentX / maxTravel;
  }, []);

  const triggerCompletion = useCallback(() => {
    if (hasTriggered) return;
    setHasTriggered(true);
    setSliderProgress(1);
    setTimeout(() => navigate("/expert-jury"), 240);
  }, [hasTriggered, navigate]);

  const handleStart = useCallback((clientX: number) => {
    if (hasTriggered) return;
    setIsDragging(true);
    const progress = calculateProgress(clientX);
    setSliderProgress(progress);
    if (progress >= 0.88) {
      triggerCompletion();
    }
  }, [hasTriggered, calculateProgress, triggerCompletion]);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || hasTriggered) return;
    const progress = calculateProgress(clientX);
    setSliderProgress(progress);
    
    if (progress >= 0.88) {
      triggerCompletion();
    }
  }, [isDragging, hasTriggered, calculateProgress, triggerCompletion]);

  const handleEnd = useCallback(() => {
    if (!hasTriggered) {
      setSliderProgress(0);
    }
    setIsDragging(false);
  }, [hasTriggered]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (hasTriggered) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextProgress = Math.min(1, sliderProgress + 0.25);
      setSliderProgress(nextProgress);
      if (nextProgress >= 0.88) {
        triggerCompletion();
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderProgress((prev) => Math.max(0, prev - 0.25));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerCompletion();
    }
  }, [hasTriggered, sliderProgress, triggerCompletion]);

  useEffect(() => {
    if (!isDragging) return;
    
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX);
    };
    const onEnd = () => handleEnd();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  const thumbWidth = typeof window !== 'undefined' && window.innerWidth >= 640 ? 48 : 44;
  const maxTravel = Math.max(0, trackWidth - thumbWidth - 8);
  const thumbPosition = sliderProgress * maxTravel;

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-gradient-to-b from-[#001d51] via-[#001744] to-[#001235] border border-white/10 shadow-[0_16px_45px_-12px_rgba(0,29,81,0.45)] px-4 sm:px-8 py-5 sm:py-7 text-white transition-all duration-300 hover:shadow-[0_22px_55px_-10px_rgba(0,29,81,0.55)] relative overflow-hidden group select-none">
      {/* Subtle top edge catchlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      <div className="flex flex-col items-center text-center relative z-10">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/15 ring-2 ring-[#00BFFF]/25 flex items-center justify-center relative shadow-inner mb-3 transition-transform duration-300 group-hover:scale-105 group-hover:ring-[#00BFFF]/45">
          <Users className="w-5 h-5 text-white" />
          <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#00BFFF] ring-2 ring-[#001d51]" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Our Expert Jury
        </h3>
        <p className="text-xs sm:text-sm text-slate-300/90 font-normal leading-relaxed max-w-sm mx-auto mt-1">
          Meet industry leaders and professionals who evaluate and guide excellence.
        </p>

        <div className="w-full max-w-md mx-auto mt-5">
          <div 
            ref={sliderRef}
            role="slider"
            tabIndex={0}
            aria-label="Slide to learn more about our Expert Jury"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderProgress * 100)}
            onKeyDown={handleKeyDown}
            className="relative h-13 sm:h-14 bg-white/[0.07] border border-white/15 rounded-full overflow-hidden cursor-pointer select-none backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF] touch-none"
            onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX); }}
            onTouchStart={(e) => { handleStart(e.touches[0].clientX); }}
          >
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00BFFF]/15 via-[#00BFFF]/30 to-[#00BFFF]/45 rounded-full pointer-events-none transition-all duration-75"
              style={{ width: `${Math.max(10, sliderProgress * 100)}%` }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span 
                className="text-xs sm:text-sm font-semibold tracking-wide text-white/80 flex items-center gap-1.5 transition-opacity duration-200"
                style={{ opacity: Math.max(0.15, 1 - sliderProgress * 1.6) }}
              >
                Slide to Learn More
                <ChevronRight className="w-4 h-4 text-[#00BFFF]" />
              </span>
            </div>
            
            <div
              className={`absolute top-1 bottom-1 left-1 w-11 sm:w-12 bg-[#00BFFF] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,191,255,0.45)] transition-transform duration-200 cursor-grab active:cursor-grabbing hover:scale-105 active:scale-95 ${isDragging ? 'scale-105' : ''}`}
              style={{ 
                transform: `translateX(${thumbPosition}px)`,
                transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {hasTriggered ? (
                <ArrowRight className="w-5 h-5 text-[#001d51] stroke-[2.5]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#001d51] stroke-[2.5]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. MAIN TEAM SECTION WITH BALANCED 2-EXPERT SHOWCASE
// =========================================================================
export const TeamSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredMembers =
    selectedCategory === "all"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.category === selectedCategory);

  return (
    <section id="team" className="py-14 md:py-20 bg-[#F8FAFC] text-slate-900 relative select-none overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2.5 sm:space-y-3">
          <Badge className="bg-sky-50 text-[#001d51] border border-[#00BFFF]/30 text-xs sm:text-sm px-4 py-1.5 rounded-full font-semibold inline-flex items-center gap-1.5 shadow-none hover:bg-sky-100 transition-colors">
            <Users className="w-3.5 h-3.5 text-[#00BFFF]" />
            Leadership &amp; Funding Experts
          </Badge>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001d51] tracking-tight">
            Meet Our Experts
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Experienced legal professionals dedicated to resolving your commercial disputes with strategic insight and decisive advocacy.
          </p>
        </div>

        {/* ======================================================== */}
        {/* ROLE NAVIGATION SWITCHER                                 */}
        {/* ======================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10 px-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 ${
              selectedCategory === "all"
                ? "bg-[#001d51] text-white border-[#001d51] shadow-sm shadow-[#001d51]/20 scale-105"
                : "bg-white text-slate-700 border-slate-200 hover:border-[#00BFFF]/60 hover:text-[#001d51] hover:bg-sky-50/50"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                selectedCategory === "all" ? "bg-[#00BFFF]" : "bg-slate-300"
              }`}
            />
            <span>All Experts</span>
          </button>
          {TEAM_MEMBERS.map((member) => {
            const isSelected = selectedCategory === member.category;
            return (
              <button
                key={member.id}
                onClick={() => setSelectedCategory(member.category)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#001d51] text-white border-[#001d51] shadow-sm shadow-[#001d51]/20 scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:border-[#00BFFF]/60 hover:text-[#001d51] hover:bg-sky-50/50"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-[#00BFFF]" : "bg-slate-300"
                  }`}
                />
                <span>{member.category}</span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* BALANCED 2-EXPERT SHOWCASE (Side-by-side on desktop)      */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="w-full max-w-[390px] mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_32px_-8px_rgba(0,29,81,0.08)] hover:shadow-[0_16px_36px_-6px_rgba(0,29,81,0.14)] transition-all duration-300 overflow-hidden p-3.5 sm:p-4.5 flex flex-col justify-between group"
            >
              <div>
                {/* Portrait Container */}
                <div className="relative h-[270px] sm:h-[300px] lg:h-[320px] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover grayscale contrast-[1.05] ${
                      member.imagePosition || "object-[center_15%]"
                    } transition-transform duration-500 group-hover:scale-105`}
                  />

                  {/* Role Overlay Tag */}
                  <div className="absolute top-2.5 left-2.5 bg-[#001d51]/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]" />
                    <span>{member.role}</span>
                  </div>

                  {/* Verified Tag */}
                  <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-md border border-slate-200/80 text-[#001d51] text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                    Funding Expert
                  </div>
                </div>

                {/* Profile Information */}
                <div className="pt-3.5 sm:pt-4 space-y-2 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#001d51] tracking-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#007ba8] mt-0.5">
                        {member.specialization}
                      </p>
                    </div>

                    {/* Social & Contact Actions */}
                    <div className="flex items-center justify-center sm:justify-end gap-1.5 pt-1 sm:pt-0 shrink-0">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`LinkedIn profile for ${member.name}`}
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#001d51] text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all duration-200"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          aria-label={`Send email to ${member.name}`}
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#001d51] text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all duration-200"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 font-normal leading-relaxed border-t border-slate-100 pt-2.5 line-clamp-3">
                    "{member.bio}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* EXPERT JURY SLIDER (Preserved at Section Base)            */}
        {/* ======================================================== */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <ExpertJurySlider />
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
