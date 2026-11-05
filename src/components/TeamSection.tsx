import React, { useState, useRef, useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Mail,
  Users,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Scale,
  Camera,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

import siddharthImg from "@/assets/Siddharth.jpeg";
import sayaliImg from "@/assets/Sayali.jpeg";

// =========================================================================
// 1. CENTRALIZED TEAM MEMBER DATA STRUCTURE
// =========================================================================
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "Founding Partner" | "Legal Head" | "Partner" | "Senior Associate";
  image: string | null;
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
    bio: "Sayali specializes in complex commercial disputes and has a track record of 95% success rate in contract breach and partnership dissolution cases.",
    linkedin: "https://www.linkedin.com/in/",
    email: "info@lexianandjurian.com",
    initials: "SK",
    specialization: "Complex Commercial Disputes & Contract Breach",
  },
  {
    id: "partner",
    name: "Adv. Rajesh Kumar",
    role: "Partner",
    category: "Partner",
    image: null, // Ready for future photograph upload
    bio: "Rajesh brings 15 years of expertise in investor disputes and intellectual property cases, with a focus on technology and startup sectors.",
    linkedin: "https://www.linkedin.com/in/rajeshrkumar/",
    email: "info@lexianandjurian.com",
    initials: "RK",
    specialization: "Investor Disputes & Intellectual Property Claims",
  },
  {
    id: "senior-associate",
    name: "Adv. Abhay Raj",
    role: "Senior Associate",
    category: "Senior Associate",
    image: null, // Ready for future photograph upload
    bio: "Abhay specializes in commercial disputes and brings 5 years of expertise in contract breach and partnership dissolution cases.",
    linkedin: "https://www.linkedin.com/",
    email: "info@lexianandjurian.com",
    initials: "AR",
    specialization: "Commercial Disputes & Dissolution Settlements",
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
  const trackWidth = sliderRef.current ? sliderRef.current.offsetWidth : 360;
  const maxTravel = Math.max(0, trackWidth - thumbWidth - 8);
  const thumbPosition = sliderProgress * maxTravel;

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-gradient-to-b from-[#001d51] via-[#001744] to-[#001235] border border-white/10 shadow-[0_16px_45px_-12px_rgba(0,29,81,0.45)] px-6 sm:px-8 py-6 sm:py-7 text-white transition-all duration-300 hover:shadow-[0_22px_55px_-10px_rgba(0,29,81,0.55)] relative overflow-hidden group select-none">
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
            className="relative h-13 sm:h-14 bg-white/[0.07] border border-white/15 rounded-full overflow-hidden cursor-pointer select-none backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF]"
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
// 3. MAIN TEAM SECTION WITH SOPHISTICATED EDITORIAL CAROUSEL
// =========================================================================
export const TeamSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const totalMembers = TEAM_MEMBERS.length;
  const activeMember = TEAM_MEMBERS[currentIndex];
  const prevIndex = (currentIndex - 1 + totalMembers) % totalMembers;
  const nextIndex = (currentIndex + 1) % totalMembers;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalMembers) % totalMembers);
  }, [totalMembers]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalMembers);
  }, [totalMembers]);

  const handleSelect = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC] text-slate-900 relative select-none overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-7xl">
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3 sm:space-y-4">
          <Badge className="bg-sky-50 text-[#001d51] border border-[#00BFFF]/30 text-xs sm:text-sm px-4 py-1.5 rounded-full font-semibold inline-flex items-center gap-1.5 shadow-none hover:bg-sky-100 transition-colors">
            <Users className="w-3.5 h-3.5 text-[#00BFFF]" />
            Leadership &amp; Legal Experts
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001d51] tracking-tight">
            Meet Our Legal Experts
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Experienced legal professionals dedicated to resolving your commercial disputes with strategic insight and decisive advocacy.
          </p>
        </div>

        {/* ======================================================== */}
        {/* ROLE NAVIGATION SWITCHER (Integrated Compact Role Bar)   */}
        {/* ======================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12 px-2">
          {TEAM_MEMBERS.map((member, index) => {
            const isSelected = currentIndex === index;
            return (
              <button
                key={member.id}
                onClick={() => handleSelect(index)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border flex items-center gap-2 ${
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
        {/* HORIZONTAL PROFILE CAROUSEL STAGE                        */}
        {/* ======================================================== */}
        <div
          className="relative max-w-6xl mx-auto px-2 sm:px-6"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main 3-Item Carousel Deck */}
          <div className="relative flex items-center justify-center min-h-[580px] sm:min-h-[620px] md:min-h-[660px]">
            {/* 1. LEFT NEIGHBOR PREVIEW (Desktop / Tablet) */}
            <div
              onClick={handlePrev}
              className="hidden lg:block absolute left-0 w-[280px] xl:w-[320px] z-10 transition-all duration-300 cursor-pointer opacity-50 hover:opacity-80 scale-90 -translate-x-6 xl:-translate-x-10"
              title={`View ${TEAM_MEMBERS[prevIndex].name}`}
            >
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-3.5 pointer-events-none">
                <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                  {TEAM_MEMBERS[prevIndex].image ? (
                    <img
                      src={TEAM_MEMBERS[prevIndex].image}
                      alt={TEAM_MEMBERS[prevIndex].name}
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-[#001d51] to-[#001130] flex flex-col items-center justify-center text-white p-4">
                      <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-lg">
                        {TEAM_MEMBERS[prevIndex].initials}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 text-center">
                  <h4 className="text-sm font-bold text-[#001d51] truncate">
                    {TEAM_MEMBERS[prevIndex].name}
                  </h4>
                  <p className="text-xs text-[#007ba8] font-medium">
                    {TEAM_MEMBERS[prevIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. ACTIVE CENTER PROFILE CARD (Hero Focus) */}
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMember.id}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_16px_40px_-12px_rgba(0,29,81,0.09)] overflow-hidden p-4 sm:p-6"
                >
                  {/* Portrait Container */}
                  <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
                    {activeMember.image ? (
                      <img
                        src={activeMember.image}
                        alt={activeMember.name}
                        className="w-full h-full object-cover object-[center_20%] sm:object-top transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      /* Elegant Initials Placeholder for Future Integration */
                      <div className="w-full h-full bg-gradient-to-b from-[#001d51] via-[#001a47] to-[#00102e] flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
                        <Scale className="w-48 h-48 text-white/[0.03] absolute -bottom-8 -right-8 pointer-events-none" />
                        
                        <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-3xl tracking-widest shadow-inner mb-4">
                          {activeMember.initials}
                        </div>

                        <Badge className="bg-white/10 text-slate-200 border border-white/20 text-xs px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-[#00BFFF]" />
                          Official Portrait in Session
                        </Badge>
                      </div>
                    )}

                    {/* Role Overlay Tag */}
                    <div className="absolute top-3.5 left-3.5 bg-[#001d51]/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]" />
                      <span>{activeMember.role}</span>
                    </div>

                    {/* Verified Credentials Tag */}
                    <div className="absolute bottom-3.5 right-3.5 bg-white/90 backdrop-blur-md border border-slate-200/80 text-[#001d51] text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                      Legal Expert
                    </div>
                  </div>

                  {/* Profile Information */}
                  <div className="pt-5 sm:pt-6 space-y-3 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#001d51] tracking-tight">
                          {activeMember.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-[#007ba8] mt-0.5">
                          {activeMember.specialization}
                        </p>
                      </div>

                      {/* Verified Social & Email Action Icons */}
                      <div className="flex items-center justify-center sm:justify-end gap-2 pt-2 sm:pt-0">
                        {activeMember.linkedin && (
                          <a
                            href={activeMember.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`LinkedIn profile for ${activeMember.name}`}
                            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#001d51] text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all duration-200"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {activeMember.email && (
                          <a
                            href={`mailto:${activeMember.email}`}
                            aria-label={`Send email to ${activeMember.name}`}
                            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#001d51] text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all duration-200"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Profile Description */}
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100 pt-3">
                      "{activeMember.bio}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3. RIGHT NEIGHBOR PREVIEW (Desktop / Tablet) */}
            <div
              onClick={handleNext}
              className="hidden lg:block absolute right-0 w-[280px] xl:w-[320px] z-10 transition-all duration-300 cursor-pointer opacity-50 hover:opacity-80 scale-90 translate-x-6 xl:translate-x-10"
              title={`View ${TEAM_MEMBERS[nextIndex].name}`}
            >
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-3.5 pointer-events-none">
                <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                  {TEAM_MEMBERS[nextIndex].image ? (
                    <img
                      src={TEAM_MEMBERS[nextIndex].image}
                      alt={TEAM_MEMBERS[nextIndex].name}
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-[#001d51] to-[#001130] flex flex-col items-center justify-center text-white p-4">
                      <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-lg">
                        {TEAM_MEMBERS[nextIndex].initials}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 text-center">
                  <h4 className="text-sm font-bold text-[#001d51] truncate">
                    {TEAM_MEMBERS[nextIndex].name}
                  </h4>
                  <p className="text-xs text-[#007ba8] font-medium">
                    {TEAM_MEMBERS[nextIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CAROUSEL CONTROLS (Arrows, Dots, Counter)                 */}
          {/* ======================================================== */}
          <div className="flex items-center justify-between max-w-md mx-auto mt-6 pt-2">
            <Button
              onClick={handlePrev}
              variant="outline"
              size="icon"
              aria-label="Previous legal expert"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-slate-200 text-[#001d51] hover:bg-[#001d51] hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Profile Dots & Numeric Counter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {TEAM_MEMBERS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => handleSelect(dotIdx)}
                    aria-label={`Jump to profile ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === dotIdx
                        ? "w-7 bg-[#001d51]"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500">
                0{currentIndex + 1} / 0{totalMembers}
              </span>
            </div>

            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              aria-label="Next legal expert"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-slate-200 text-[#001d51] hover:bg-[#001d51] hover:text-white transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* EXPERT JURY SLIDER (Preserved at Section Base)            */}
        {/* ======================================================== */}
        <div className="mt-14 sm:mt-18 flex justify-center">
          <ExpertJurySlider />
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
