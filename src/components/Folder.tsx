import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Folder as FolderIcon,
  FolderOpen,
  TrendingUp,
  Clock,
  Target,
  ArrowRight,
  X,
  ChevronRight,
  ShieldCheck,
  FileText,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FolderItem {
  id: string;
  title: string;
  description: string;
  recovered: string;
  duration: string;
  successRate: string;
  category?: string;
  [key: string]: any;
}

export interface FolderProps {
  label?: string;
  items: FolderItem[];
  onItemClick?: (item: FolderItem, index: number) => void;
  mode?: "book" | "fan" | "accordion";
  variant?: "glass" | "solid" | "minimal";
  color?: string; // Default: "#7aa7ff"
  className?: string;
}

export const Folder: React.FC<FolderProps> = ({
  label = "Proven Results",
  items = [],
  onItemClick,
  mode = "book",
  variant = "glass",
  color = "#7aa7ff",
  className = "",
}) => {
  const navigate = useNavigate();
  const total = items.length;

  // Folder states: "closed" | "fanned" | "selected"
  const [folderState, setFolderState] = useState<"closed" | "fanned" | "selected">("fanned");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive tracker
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize, { passive: true });

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Handle document selection
  const handleSelectDoc = (index: number) => {
    setSelectedIndex(index);
    setFolderState("selected");
  };

  const handleCloseSelected = () => {
    setSelectedIndex(null);
    setFolderState("fanned");
  };

  const handleToggleFolder = () => {
    if (folderState === "closed") {
      setFolderState("fanned");
    } else if (folderState === "fanned") {
      setFolderState("closed");
      setSelectedIndex(null);
    } else {
      setFolderState("fanned");
      setSelectedIndex(null);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelectDoc(index);
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCloseSelected();
    }
  };

  // Calculate transform for each document card based on state
  const getDocTransform = (index: number) => {
    if (prefersReducedMotion) {
      return { transform: "none", zIndex: 1, opacity: 1 };
    }

    // 1. CLOSED STATE: documents partially tucked inside folder
    if (folderState === "closed") {
      const staggerY = index * -4;
      const staggerX = (index - (total - 1) / 2) * 8;
      return {
        transform: `translate3d(calc(-50% + ${staggerX}px), calc(-50% + ${staggerY}px), 0px) scale(0.92)`,
        zIndex: index + 2,
        opacity: 0.85,
      };
    }

    // 2. SELECTED STATE
    if (folderState === "selected" && selectedIndex !== null) {
      if (index === selectedIndex) {
        // Active selected card: lifted forward and centered
        return {
          transform: isMobile
            ? "translate3d(-50%, calc(-50% - 25px), 40px) scale(1.0)"
            : "translate3d(-50%, calc(-50% - 40px), 60px) scale(1.03)",
          zIndex: 40,
          opacity: 1,
        };
      } else {
        // Remaining cards: positioned as background file tabs
        const offsetFromSelected = index - selectedIndex;
        const sideShift = offsetFromSelected * (isMobile ? 18 : 36);
        const depthStep = Math.abs(offsetFromSelected);
        return {
          transform: `translate3d(calc(-50% + ${sideShift}px), calc(-50% - ${
            60 + depthStep * 6
          }px), -${depthStep * 30}px) scale(${0.92 - depthStep * 0.04})`,
          zIndex: 20 - depthStep,
          opacity: 0.45,
        };
      }
    }

    // 3. FANNED / OPEN STATE: elegant radial spread of case files
    if (!isMobile) {
      const centerIndex = (total - 1) / 2;
      const distFromCenter = index - centerIndex; // e.g. for 4 items: -1.5, -0.5, 0.5, 1.5

      // Horizontal spread: comfortable spacing showing titles and metrics
      const spreadX = isTablet ? 120 : 155;
      const x = distFromCenter * spreadX;

      // Vertical parabolic arc
      const arcY = -Math.abs(distFromCenter) * 10 - 45;

      // Gentle rotation angles (-7deg, -2.5deg, +2.5deg, +7deg)
      const rotationDeg = distFromCenter * (isTablet ? 4.0 : 5.0);

      // Lift on hover
      const isHovered = hoveredIndex === index;
      const hoverLift = isHovered ? -16 : 0;
      const hoverScale = isHovered ? 1.04 : 0.97;

      return {
        transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${
          arcY + hoverLift
        }px), 0px) rotate(${rotationDeg}deg) scale(${hoverScale})`,
        zIndex: isHovered ? 30 : index + 5,
        opacity: 1,
      };
    } else {
      // Mobile spread: compact vertical/diagonal cascade
      const yOffset = (index - (total - 1) / 2) * 32 - 35;
      const xOffset = (index % 2 === 0 ? -1 : 1) * 12;
      const rot = (index - 1.5) * 3;
      return {
        transform: `translate3d(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px), 0px) rotate(${rot}deg) scale(0.95)`,
        zIndex: index + 5,
        opacity: 1,
      };
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-5xl mx-auto select-none ${className}`}
      aria-label={`${label} Interactive Folder`}
    >
      {/* ======================================================== */}
      {/* TOP CONTROLS & FOLDER STATUS BAR                         */}
      {/* ======================================================== */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 px-2">
        {/* Folder Tab Indicator */}
        <button
          type="button"
          onClick={handleToggleFolder}
          className="group inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs hover:border-[#00BFFF]/50 hover:shadow-sm transition-all text-xs font-semibold text-primary"
        >
          {folderState === "closed" ? (
            <FolderIcon className="w-4 h-4 text-[#00BFFF]" />
          ) : (
            <FolderOpen className="w-4 h-4 text-[#00BFFF]" />
          )}
          <span>{label}</span>
          <span className="text-[11px] text-slate-400 font-normal">
            ({total} Case Files)
          </span>
          <span className="text-[10px] text-[#0082c3] bg-[#00BFFF]/10 px-2 py-0.5 rounded-full font-medium ml-1">
            {folderState === "closed"
              ? "Click to open"
              : folderState === "selected"
              ? "Inspecting File"
              : "Click file to open"}
          </span>
        </button>

        {/* Quick Reset / Action button */}
        {folderState === "selected" ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCloseSelected}
            className="text-xs text-slate-600 hover:text-primary hover:bg-slate-100/80 rounded-lg gap-1.5 h-8 px-2.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#00BFFF]" />
            <span>Return to Folder</span>
          </Button>
        ) : (
          <button
            type="button"
            onClick={handleToggleFolder}
            className="text-xs text-slate-500 hover:text-primary transition-colors font-medium flex items-center gap-1"
          >
            <span>{folderState === "closed" ? "Spread Files" : "Fold Files"}</span>
            <ChevronRight
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                folderState === "fanned" ? "rotate-90" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* ======================================================== */}
      {/* 3D FOLDER STAGE                                          */}
      {/* ======================================================== */}
      <div
        className="relative w-full h-[400px] sm:h-[430px] md:h-[460px] flex items-center justify-center"
        style={{
          perspective: "1200px",
        }}
      >
        {/* Folder Back Cover */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl transition-all duration-500 pointer-events-none"
          style={{
            width: isMobile ? "92%" : isTablet ? "560px" : "680px",
            height: isMobile ? "300px" : "345px",
            backgroundColor: "#507ecc",
            transform: "translate3d(-50%, calc(-50% + 25px), -40px) rotateX(10deg)",
            boxShadow: "0 24px 60px -15px rgba(10, 30, 80, 0.25)",
          }}
        >
          {/* Back Tab Header */}
          <div
            className="absolute -top-7 left-8 px-5 py-2 rounded-t-xl text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs"
            style={{
              backgroundColor: "#507ecc",
            }}
          >
            <FileText className="w-3.5 h-3.5 text-white/80" />
            <span>LEXIAN & JURIAN • COMMERCIAL CASE DOSSIERS</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DOCUMENT CARDS (CASE STUDIES)                            */}
        {/* ======================================================== */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, index) => {
            const isSelected = selectedIndex === index;
            const cardTransform = getDocTransform(index);

            return (
              <div
                key={item.id || index}
                tabIndex={0}
                role="button"
                aria-label={`Case Study: ${item.title}`}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onClick={() => {
                  if (folderState !== "selected") {
                    handleSelectDoc(index);
                  } else if (!isSelected) {
                    handleSelectDoc(index);
                  }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`absolute top-[44%] left-1/2 transition-all duration-500 ease-out outline-none cursor-pointer ${
                  isSelected ? "cursor-default" : "hover:-translate-y-2"
                }`}
                style={{
                  width: isMobile
                    ? "min(310px, 86vw)"
                    : isTablet
                    ? "310px"
                    : isSelected
                    ? "430px"
                    : "310px",
                  ...cardTransform,
                }}
              >
                {/* Physical Document File Container */}
                <div
                  className={`relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md transition-all duration-300 ${
                    isSelected
                      ? "border-2 border-[#00BFFF] shadow-[0_20px_50px_-12px_rgba(0,191,255,0.3)] p-5 sm:p-5.5"
                      : "border border-slate-200/90 shadow-xl shadow-slate-300/40 hover:border-[#00BFFF]/60 hover:shadow-2xl p-4"
                  }`}
                >
                  {/* Top Document File Tab */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                          isSelected
                            ? "bg-[#00BFFF]/15 text-[#0082c3] border border-[#00BFFF]/20"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <ShieldCheck className="w-3 h-3 text-[#00BFFF]" />
                        {item.category || "Commercial Dispute"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-semibold">
                        FILE #0{index + 1}
                      </span>
                      {isSelected && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCloseSelected();
                          }}
                          aria-label="Close document preview"
                          className="p-1 rounded-md text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Document Title & Description */}
                  <div className="mb-2.5">
                    <h3
                      className={`font-serif font-bold text-primary leading-snug mb-1 ${
                        isSelected
                          ? "text-lg sm:text-xl"
                          : "text-sm sm:text-base line-clamp-1"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-slate-600 leading-relaxed ${
                        isSelected
                          ? "text-xs sm:text-sm line-clamp-3"
                          : "text-xs line-clamp-2 min-h-[32px]"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Verified Recovery Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {/* Recovered */}
                    <div className="text-center p-2 rounded-xl bg-sky-50/80 border border-sky-100/70">
                      <TrendingUp className="mx-auto mb-1 h-3.5 w-3.5 text-[#00BFFF]" />
                      <div className="font-bold text-primary text-xs sm:text-sm truncate">
                        {item.recovered}
                      </div>
                      <div className="text-[9px] text-slate-500 font-medium">Recovered</div>
                    </div>

                    {/* Duration */}
                    <div className="text-center p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <Clock className="mx-auto mb-1 h-3.5 w-3.5 text-primary" />
                      <div className="font-bold text-primary text-xs sm:text-sm truncate">
                        {item.duration}
                      </div>
                      <div className="text-[9px] text-slate-500 font-medium">Duration</div>
                    </div>

                    {/* Success Rate */}
                    <div className="text-center p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                      <Target className="mx-auto mb-1 h-3.5 w-3.5 text-emerald-600" />
                      <div className="font-bold text-emerald-600 text-xs sm:text-sm truncate">
                        {item.successRate}
                      </div>
                      <div className="text-[9px] text-emerald-700/70 font-medium">Success</div>
                    </div>
                  </div>

                  {/* Document Actions */}
                  {isSelected ? (
                    <div className="flex items-center gap-2 pt-0.5">
                      <Button
                        className="flex-1 bg-[#001d51] hover:bg-[#002b7a] text-white rounded-xl text-xs sm:text-sm font-semibold h-9 sm:h-9.5 shadow-sm hover:shadow transition-all group border border-[#00BFFF]/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onItemClick) {
                            onItemClick(item, index);
                          } else {
                            navigate(`/proven-results/${item.id}`);
                          }
                        }}
                      >
                        <span>View Full Case Study</span>
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-[#00BFFF] transition-transform duration-200 group-hover:translate-x-1" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseSelected();
                        }}
                        className="text-xs text-slate-600 hover:text-primary rounded-xl h-9 px-3 border-slate-200"
                      >
                        Done
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-0.5 text-center">
                      <span className="text-[11px] font-medium text-[#0082c3] group-hover:text-[#00BFFF] inline-flex items-center gap-1">
                        <span>Click to inspect file</span>
                        <ChevronRight className="w-3 h-3 text-[#00BFFF]" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* FOLDER FRONT COVER (With 3D Folding Flap)                */}
        {/* ======================================================== */}
        <div
          onClick={handleToggleFolder}
          className={`absolute left-1/2 bottom-[10px] sm:bottom-[15px] -translate-x-1/2 rounded-3xl cursor-pointer transition-all duration-500 ease-out ${
            folderState === "selected" ? "pointer-events-none opacity-40" : "hover:brightness-105"
          }`}
          style={{
            width: isMobile ? "94%" : isTablet ? "580px" : "700px",
            height: isMobile ? "135px" : "165px",
            backgroundColor: color, // "#7aa7ff"
            backgroundImage:
              variant === "glass"
                ? "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(122,167,255,0.88) 50%, rgba(90,140,240,0.96) 100%)"
                : undefined,
            backdropFilter: variant === "glass" ? "blur(12px)" : undefined,
            border: "1.5px solid rgba(255, 255, 255, 0.65)",
            transform:
              folderState === "closed"
                ? "translate3d(-50%, 0px, 40px) rotateX(0deg)"
                : folderState === "selected"
                ? "translate3d(-50%, 35px, -10px) rotateX(-50deg)"
                : "translate3d(-50%, 15px, 20px) rotateX(-35deg)",
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
            boxShadow:
              "0 20px 50px -10px rgba(70, 120, 220, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.7)",
            zIndex: 35,
          }}
        >
          {/* Front Cover Header Tab Badge */}
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/35 backdrop-blur-sm border border-white/50 flex items-center justify-center text-primary shadow-xs">
                {folderState === "closed" ? (
                  <FolderIcon className="w-4 h-4 text-[#001d51]" />
                ) : (
                  <FolderOpen className="w-4 h-4 text-[#001d51]" />
                )}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#001d51] leading-tight">
                  Lexian & Jurian Case Archive
                </h4>
                <p className="text-[10px] text-white/95 font-medium">
                  Confidential Commercial Records
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-[#001d51] bg-white/40 px-3 py-1 rounded-full border border-white/50 shadow-xs">
              <span>{folderState === "closed" ? "Closed File" : "Active Archive"}</span>
            </div>
          </div>

          {/* Folder Grip / Stitching line */}
          <div className="absolute bottom-4 left-8 right-8 h-0.5 border-b border-white/40 border-dashed" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* QUICK SWITCHER TABS (When a document is selected)        */}
      {/* ======================================================== */}
      {folderState === "selected" && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 px-2 animate-in fade-in duration-300">
          <span className="text-xs text-slate-500 font-medium mr-1">Switch File:</span>
          {items.map((it, idx) => (
            <button
              key={it.id || idx}
              type="button"
              onClick={() => handleSelectDoc(idx)}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedIndex === idx
                  ? "bg-[#001d51] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-[#00BFFF] hover:text-primary"
              }`}
            >
              0{idx + 1}. {it.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
