import React, { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface TestimonialItem {
  id: string;
  text: string;
  author: string;
  position: string;
  company?: string;
  initials: string;
  rating: number;
  recoveryAmount?: string;
  caseType?: string;
  highlight?: string;
}

interface ConcaveTestimonialCarouselProps {
  testimonials: TestimonialItem[];
  autoplayInterval?: number;
}

export const ConcaveTestimonialCarousel: React.FC<ConcaveTestimonialCarouselProps> = ({
  testimonials,
  autoplayInterval = 5500,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const isHorizontalDragRef = useRef<boolean | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Track window resize for responsive 3D curve parameters
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const total = testimonials.length;

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Autoplay management
  useEffect(() => {
    if (isHovered || isDragging || prefersReducedMotion || autoplayInterval <= 0) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      goToNext();
    }, autoplayInterval);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isHovered, isDragging, prefersReducedMotion, autoplayInterval, goToNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  };

  // Responsive geometry parameters for the concave cylindrical wall
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const cardWidth = isMobile
    ? Math.min(windowWidth * 0.84, 300)
    : isTablet
    ? 350
    : 400;

  const cardHeight = isMobile ? 330 : isTablet ? 365 : 385;

  // Stride (pixel displacement needed to change 1 full card during drag)
  const dragStride = isMobile ? 180 : 280;

  // Cylinder radius and angular step for concave curvature
  const radius = isMobile ? 480 : isTablet ? 720 : 920;
  const angleStep = isMobile ? 22 : isTablet ? 20 : 18; // degrees per offset
  const depthFactor = isMobile ? 30 : isTablet ? 45 : 55; // additional receding in -Z

  // Unified Pointer Handlers (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (prefersReducedMotion) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;

    dragStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    isHorizontalDragRef.current = null;
    setIsDragging(true);
    setDragOffset(0);

    if (containerRef.current) {
      try {
        containerRef.current.setPointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    if (isHorizontalDragRef.current === null) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          isHorizontalDragRef.current = true;
        } else {
          isHorizontalDragRef.current = false;
          setIsDragging(false);
          setDragOffset(0);
          return;
        }
      }
    }

    if (isHorizontalDragRef.current) {
      setDragOffset(deltaX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaTime = Date.now() - dragStartRef.current.time;
    const velocity = Math.abs(deltaX) / Math.max(deltaTime, 1);

    const threshold = dragStride * 0.22;
    const isFlick = velocity > 0.45 && Math.abs(deltaX) > 25;

    if (Math.abs(deltaX) > threshold || isFlick) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    isHorizontalDragRef.current = null;

    if (containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    setIsDragging(false);
    setDragOffset(0);
    isHorizontalDragRef.current = null;
    if (containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  // Calculate dynamic 3D transformation for each card
  const getCardStyle = (index: number) => {
    if (prefersReducedMotion) {
      const isActive = index === activeIndex;
      return {
        display: isActive ? "block" : "none",
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        left: "50%",
        top: "50%",
        marginLeft: `-${cardWidth / 2}px`,
        marginTop: `-${cardHeight / 2}px`,
        transform: "none",
        opacity: 1,
        zIndex: 10,
        position: "absolute" as const,
      };
    }

    // Continuous fractional offset including real-time dragging
    const dragFraction = dragOffset / dragStride;
    let offset = index - activeIndex - dragFraction;

    // Handle wrap-around shortest path for smooth carousel loop
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const absOffset = Math.abs(offset);

    // Concave Cylinder Mathematics:
    const thetaDeg = offset * angleStep;
    const thetaRad = (thetaDeg * Math.PI) / 180;

    // Horizontal position along cylinder
    const x = radius * Math.sin(thetaRad);

    // Depth: curves backward into the screen (concave around viewer)
    const z = -radius * (1 - Math.cos(thetaRad)) - Math.pow(absOffset, 1.25) * depthFactor;

    // Orientation: tangent to cylinder, facing inward towards central viewer
    const rotateY = -thetaDeg;

    // Scale recedes slightly with distance from center
    const scale = Math.max(0.75, 1 - absOffset * 0.08);

    // Visual stacking and fading
    const zIndex = Math.round(100 - absOffset * 10);
    const opacity = Math.max(0, 1 - absOffset * 0.28);

    // Hide cards far outside viewport
    const isVisible = absOffset < (isMobile ? 2.2 : isTablet ? 3.0 : 3.8);

    const transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`;

    return {
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      left: "50%",
      top: "50%",
      marginLeft: `-${cardWidth / 2}px`,
      marginTop: `-${cardHeight / 2}px`,
      transformOrigin: "center center",
      transform,
      zIndex,
      opacity: isVisible ? opacity : 0,
      visibility: isVisible ? ("visible" as const) : ("hidden" as const),
      transition: isDragging
        ? "none"
        : "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease, box-shadow 0.65s ease",
    };
  };

  return (
    <div
      className="relative w-full select-none outline-none py-2"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client Testimonials Concave Carousel"
    >
      {/* 3D Perspective Stage Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{
          perspective: isMobile ? "900px" : isTablet ? "1100px" : "1300px",
          perspectiveOrigin: "50% 50%",
          touchAction: "pan-y",
        }}
        className="relative w-full h-[420px] sm:h-[460px] md:h-[490px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Soft radial background depth vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,191,255,0.035)_0%,transparent_70%)]" />

        {/* 3D Stage with preserve-3d */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {testimonials.map((testimonial, index) => {
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;
            const isCenter = Math.abs(offset) < 0.45;
            const cardStyle = getCardStyle(index);

            return (
              <div
                key={testimonial.id || index}
                onClick={() => {
                  if (!isCenter && !isDragging) {
                    goToIndex(index);
                  }
                }}
                style={cardStyle}
                className={`absolute will-change-transform ${
                  !isCenter ? "cursor-pointer group" : ""
                }`}
                aria-hidden={!isCenter}
              >
                <div
                  className={`relative flex flex-col justify-between w-full h-full rounded-2xl p-5 sm:p-7 md:p-8 bg-white border transition-all duration-300 ${
                    isCenter
                      ? "border-[#00BFFF]/50 shadow-[0_24px_55px_-12px_rgba(0,191,255,0.22),0_12px_28px_-6px_rgba(15,23,42,0.1)] ring-1 ring-[#00BFFF]/25"
                      : "border-slate-200/80 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.08)] group-hover:border-[#00BFFF]/30 group-hover:shadow-[0_16px_36px_-6px_rgba(0,191,255,0.12)]"
                  }`}
                >
                  {/* Active Card Top Cyan Accent Line */}
                  {isCenter && (
                    <div className="absolute top-0 left-6 right-6 h-[3px] bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent rounded-full" />
                  )}

                  {/* Header Row: Stars & Case Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
                      {/* Star Rating */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                              star <= testimonial.rating
                                ? "text-[#00BFFF] fill-[#00BFFF]"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Dispute / Case Type Tag */}
                      {testimonial.caseType && (
                        <Badge
                          variant="outline"
                          className="text-[10px] sm:text-[11px] font-medium bg-slate-50 text-slate-600 border-slate-200/90 py-0.5 px-2.5 rounded-full"
                        >
                          {testimonial.caseType}
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <div className="relative mb-2 sm:mb-3">
                      <p className="text-slate-700 text-xs sm:text-[13px] md:text-[14px] leading-relaxed line-clamp-4 sm:line-clamp-5 font-normal">
                        "{testimonial.text}"
                      </p>
                    </div>
                  </div>

                  {/* Footer Section: Recovery Tag & Client Identity */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5 mt-auto">
                    {/* Recovery Highlight Pill */}
                    {testimonial.recoveryAmount && (
                      <div className="flex items-center justify-between text-[11px] sm:text-xs bg-slate-50/80 border border-slate-100 px-3 py-1.5 rounded-lg">
                        <span className="text-slate-500 font-medium flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-[#00BFFF]" />
                          {testimonial.highlight || "Verified Recovery"}
                        </span>
                        <span className="font-semibold text-primary">
                          {testimonial.recoveryAmount}
                        </span>
                      </div>
                    )}

                    {/* Author Profile */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-[#0f233f] to-[#00BFFF] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm flex-shrink-0">
                        {testimonial.initials}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-1">
                          <h4 className="font-bold text-primary text-xs sm:text-sm truncate">
                            {testimonial.author}
                          </h4>
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#00BFFF] flex-shrink-0" />
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                          {testimonial.position}
                          {testimonial.company ? ` • ${testimonial.company}` : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Gentle Depth Overlay on Side Cards */}
                  {!isCenter && (
                    <div className="absolute inset-0 rounded-2xl bg-slate-900/[0.025] transition-opacity duration-300 group-hover:bg-transparent pointer-events-none" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Left & Right Edge Vignette Gradient to blend seamlessly into background */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-background via-background/40 to-transparent z-40" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-background via-background/40 to-transparent z-40" />
      </div>

      {/* Navigation Controls Dock */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 md:mt-5">
        {/* Previous Button */}
        <button
          onClick={goToPrev}
          type="button"
          aria-label="Previous testimonial"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-primary flex items-center justify-center shadow-sm hover:shadow transition-all duration-200 hover:border-[#00BFFF]/50 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#00BFFF] focus-visible:outline-none"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? "true" : "false"}
                className={`transition-all duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-[#00BFFF] focus-visible:outline-none ${
                  isActive
                    ? "w-8 h-2.5 bg-gradient-to-r from-[#00BFFF] to-primary shadow-sm"
                    : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          type="button"
          aria-label="Next testimonial"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-primary flex items-center justify-center shadow-sm hover:shadow transition-all duration-200 hover:border-[#00BFFF]/50 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#00BFFF] focus-visible:outline-none"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Swipe / Drag Helper Cue for Mobile/Tablet */}
      <div className="text-center mt-2.5 sm:mt-3">
        <span className="text-[11px] sm:text-xs text-slate-400 font-normal tracking-wide inline-flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-[#00BFFF]" />
          Drag or click side cards to explore client stories
        </span>
      </div>
    </div>
  );
};

export default ConcaveTestimonialCarousel;
