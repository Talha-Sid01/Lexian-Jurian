import { useState, useRef, useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail, Users, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Expert Jury Slider Component
const ExpertJurySlider = () => {
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderProgress, setSliderProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const calculateProgress = useCallback((clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const thumbWidth = 64;
    const maxTravel = rect.width - thumbWidth - 8;
    const startX = rect.left + 4;
    const currentX = Math.max(0, Math.min(clientX - startX - thumbWidth / 2, maxTravel));
    return currentX / maxTravel;
  }, []);

  const handleStart = useCallback((clientX: number) => {
    if (hasTriggered) return;
    setIsDragging(true);
    const progress = calculateProgress(clientX);
    setSliderProgress(progress);
  }, [hasTriggered, calculateProgress]);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || hasTriggered) return;
    const progress = calculateProgress(clientX);
    setSliderProgress(progress);
    
    if (progress >= 0.85) {
      setHasTriggered(true);
      setSliderProgress(1);
      setTimeout(() => navigate("/expert-jury"), 200);
    }
  }, [isDragging, hasTriggered, calculateProgress, navigate]);

  const handleEnd = useCallback(() => {
    if (!hasTriggered) {
      setSliderProgress(0);
    }
    setIsDragging(false);
  }, [hasTriggered]);

  useEffect(() => {
    if (!isDragging) return;
    
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onEnd = () => handleEnd();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  const thumbPosition = sliderRef.current 
    ? sliderProgress * (sliderRef.current.offsetWidth - 72) 
    : sliderProgress * 200;

  return (
    <div className="w-full max-w-3xl lg:max-w-5xl rounded-2xl bg-gradient-primary px-6 md:px-10 py-6 md:py-8 text-primary-foreground shadow-xl">
      <div className="flex flex-col gap-6 text-center">
        {/* Content */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/15 flex-shrink-0">
            <Users className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Our Expert Jury
            </h3>
            <p className="text-sm md:text-base text-primary-foreground/80 max-w-md mt-1">
              Meet industry leaders and professionals who evaluate and guide excellence.
            </p>
          </div>
        </div>

        {/* Slider */}
        <div 
          ref={sliderRef}
          className="relative h-16 bg-white/10 rounded-full overflow-hidden cursor-pointer select-none"
          onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX); }}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        >
          {/* Progress fill */}
          <div 
            className="absolute inset-y-0 left-0 bg-[#00BFFF]/30 rounded-full transition-all duration-75"
            style={{ width: `${sliderProgress * 100}%` }}
          />
          
          {/* Track text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className={`text-sm md:text-base font-medium transition-opacity duration-300 ${sliderProgress > 0.3 ? 'opacity-0' : 'opacity-70'}`}>
              Slide to Learn More
            </span>
            <ChevronRight className={`h-5 w-5 ml-1 transition-opacity duration-300 ${sliderProgress > 0.3 ? 'opacity-0' : 'opacity-70'}`} />
          </div>
          
          {/* Thumb */}
          <div
            className={`absolute top-1 bottom-1 left-1 w-14 md:w-16 bg-[#00BFFF] rounded-full flex items-center justify-center shadow-lg transition-all ${isDragging ? 'scale-105' : ''}`}
            style={{ 
              transform: `translateX(${thumbPosition}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            <ChevronRight className="h-6 w-6 text-primary" />
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
