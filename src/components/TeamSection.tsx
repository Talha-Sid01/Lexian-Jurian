import { useState, useRef, useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail, Users, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Expert Jury Slider Component (Premium Refined)
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
      {/* Subtle top edge specular catchlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      
      {/* Subtle top ambient radial glow */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#00BFFF]/10 blur-2xl pointer-events-none rounded-full" />

      <div className="flex flex-col items-center text-center relative z-10">
        {/* Elegant Translucent Circular Icon Container */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/15 ring-2 ring-[#00BFFF]/25 flex items-center justify-center relative shadow-inner mb-3 transition-transform duration-300 group-hover:scale-105 group-hover:ring-[#00BFFF]/45">
          <Users className="w-5 h-5 text-white" />
          <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#00BFFF] ring-2 ring-[#001d51]" />
        </div>

        {/* Heading & Supporting Text */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Our Expert Jury
        </h3>
        <p className="text-xs sm:text-sm text-slate-300/90 font-normal leading-relaxed max-w-sm mx-auto mt-1">
          Meet industry leaders and professionals who evaluate and guide excellence.
        </p>

        {/* Slider Track Container */}
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
            {/* Subtle Progress Fill */}
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00BFFF]/15 via-[#00BFFF]/30 to-[#00BFFF]/45 rounded-full pointer-events-none transition-all duration-75"
              style={{ width: `${Math.max(10, sliderProgress * 100)}%` }}
            />
            
            {/* Centered Track Text Label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span 
                className="text-xs sm:text-sm font-semibold tracking-wide text-white/80 flex items-center gap-1.5 transition-opacity duration-200"
                style={{ opacity: Math.max(0.15, 1 - sliderProgress * 1.6) }}
              >
                Slide to Learn More
                <ChevronRight className="w-4 h-4 text-[#00BFFF]" />
              </span>
            </div>
            
            {/* Draggable Cyan Handle */}
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

const TeamSection = () => {
  const navigate = useNavigate();
  
  const teamMembers = [
    {
      name: "Mr. Siddharth Lokhande",
      position: "Founding Partner",
      bio: "With over 5 years of experience in commercial dispute litigation, Siddharth has successfully recovered more than 1.5 millions for clients across various industries.",
      linkedin: "https://www.linkedin.com/in/siddharth-lokhande-938377213/",
      email: "ceo@lexianandjurian.com"
    },
    {
      name: "Adv. Sayali Kadam",
      position: "Legal Head", 
      bio: "Sayali specializes in complex commercial disputes and has a track record of 95% success rate in contract breach and partnership dissolution cases.",
      linkedin: "https://www.linkedin.com/in/",
      email: "info@lexianandjurian.com"
    },
    {
      name: "Adv. Rajesh Kumar",
      position: "Partner",
      bio: "Rajesh brings 15 years of expertise in investor disputes and intellectual property cases, with a focus on technology and startup sectors.",
      linkedin: "https://www.linkedin.com/in/rajeshrkumar/",
      email: "info@lexianandjurian.com"
    },
    {
      name: "Adv. Abhay Raj",
      position: "Senior Associate",
      bio: "Abhay specializes in commercial disputes and brings 5 years of expertise in contract breach and partnership dissolution cases.",
      linkedin: "https://www.linkedin.com/",
      email: "info@lexianandjurian.com"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeMember = teamMembers[activeIndex];

  return (
    <section className="py-12 md:py-16 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12 scroll-animate">
          <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-4 py-1">
            Our Team
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 md:mb-4">
            Meet Our Legal Experts
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Meet the experienced legal professionals dedicated to resolving your commercial disputes with expertise and dedication.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 scroll-animate px-2">
          {teamMembers.map((member, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`px-3.5 md:px-5 py-2 md:py-2.5 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm md:text-base ${
                activeIndex === index
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
              }`}
            >
              {member.position}
            </button>
          ))}
        </div>

        {/* Profile Display */}
        <div className="max-w-3xl mx-auto scroll-animate">
          <div className="bg-background border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <div className="text-center space-y-4 md:space-y-5">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-1">
                  {activeMember.name}
                </h3>
                <p className="text-sm md:text-base text-accent font-semibold">
                  {activeMember.position}
                </p>
              </div>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
                "{activeMember.bio}"
              </p>

              <div className="flex items-center justify-center gap-4 pt-4">
                <a 
                  href={activeMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                </a>
                <a 
                  href={`mailto:${activeMember.email}`}
                  className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Jury Card with Slider */}
        <div className="mt-12 flex justify-center scroll-animate ">
          <ExpertJurySlider />
        </div>


      </div>
    </section>
  );
};

export default TeamSection;
