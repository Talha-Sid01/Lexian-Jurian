import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FolderArchive, Layers } from "lucide-react";
import Folder, { FolderItem } from "./Folder";

// =========================================================================
// 1. FOLDER CASE DATA
// =========================================================================

// Commercial Cases (Preserves all 4 original verified records)
const COMMERCIAL_CASES: FolderItem[] = [
  {
    id: "contract-breach-recovery",
    title: "Contract Breach Recovery",
    description:
      "Successful recovery from supplier who failed to deliver critical components on schedule.",
    recovered: "₹56 Lakhs",
    duration: "8 Months",
    successRate: "95%",
    category: "Commercial Breach",
  },
  {
    id: "investor-misrepresentation",
    title: "Investor Misrepresentation",
    description:
      "Recovery for investors who were misled about a company's financial position prior to investment.",
    recovered: "₹42 Lakhs",
    duration: "14 Months",
    successRate: "100%",
    category: "Capital Protection",
  },
  {
    id: "ip-infringement",
    title: "Token Refund Resolution",
    description: "Real Estate Booking Dispute – Lodha Group Project",
    recovered: "₹45 Lakhs",
    duration: "3 Months",
    successRate: "98%",
    category: "Real Estate Dispute",
  },
  {
    id: "partnership-dissolution",
    title: "Partnership Dissolution",
    description:
      "Complex partnership dispute involving asset division and business valuation.",
    recovered: "₹18 Lakhs",
    duration: "13 Months",
    successRate: "Settlement",
    category: "Partnership Exit",
  },
];

// Arbitration Cases (Authentic empty-state archive records under seal / NDA)
const ARBITRATION_CASES: FolderItem[] = [
  {
    id: "arbitration-confidential-01",
    title: "Institutional Arbitration Proceedings",
    description:
      "International cross-border dispute resolution conducted under institutional arbitration rules. Full records held under confidentiality order.",
    recovered: "Under Seal",
    duration: "In Enforcement",
    successRate: "Confidential",
    category: "Arbitration Archive",
    metric1Label: "STATUS",
    metric2Label: "TIMELINE",
    timelineSub: "Statutory Seal",
    isPlaceholder: true,
  },
  {
    id: "arbitration-confidential-02",
    title: "Commercial Arbitration Award",
    description:
      "Domestic institutional proceedings under Arbitration & Conciliation Act. Redacted award summary pending final court decree registration.",
    recovered: "Restricted",
    duration: "Award Granted",
    successRate: "NDA Protected",
    category: "Arbitration Archive",
    metric1Label: "STATUS",
    metric2Label: "PROTOCOL",
    timelineSub: "Award Registry",
    isPlaceholder: true,
  },
];

// Corporate Cases (Authentic empty-state archive records under seal / NDA)
const CORPORATE_CASES: FolderItem[] = [
  {
    id: "corporate-confidential-01",
    title: "Corporate Governance Dispute",
    description:
      "Shareholder rights and director liability dispute subject to statutory non-disclosure. Verified resolution archived upon formal decree.",
    recovered: "Under Seal",
    duration: "NDA Compliant",
    successRate: "Confidential",
    category: "Corporate Archive",
    metric1Label: "STATUS",
    metric2Label: "PROTOCOL",
    timelineSub: "Board Privacy",
    isPlaceholder: true,
  },
  {
    id: "corporate-confidential-02",
    title: "M&A Warranty & Indemnity Claim",
    description:
      "Post-acquisition indemnification settlement between private corporate entities. Commercial terms protected by confidentiality covenants.",
    recovered: "Restricted",
    duration: "Settlement",
    successRate: "NDA Protected",
    category: "Corporate Archive",
    metric1Label: "STATUS",
    metric2Label: "TIMELINE",
    timelineSub: "Private Seal",
    isPlaceholder: true,
  },
];

type FolderId = "arbitration" | "commercial" | "corporate";
type ArchiveState = "stacked" | "expanded" | "folder-open";

interface FolderDefinition {
  id: FolderId;
  label: string;
  tabPosition: "left" | "center" | "right";
  items: FolderItem[];
}

const FOLDERS: FolderDefinition[] = [
  {
    id: "arbitration",
    label: "Arbitration Cases",
    tabPosition: "left",
    items: ARBITRATION_CASES,
  },
  {
    id: "commercial",
    label: "Commercial Cases",
    tabPosition: "center",
    items: COMMERCIAL_CASES,
  },
  {
    id: "corporate",
    label: "Corporate Cases",
    tabPosition: "right",
    items: CORPORATE_CASES,
  },
];

const CaseStudiesSection: React.FC = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // State Management for Archive
  const [archiveState, setArchiveState] = useState<ArchiveState>("stacked");
  const [activeFolderId, setActiveFolderId] = useState<FolderId | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isSmallDesktop = windowWidth >= 1024 && windowWidth < 1360;

  // Folder scale: 1.25x more bigger as requested (desktop: 1.53 * 1.25 = 1.91)
  const folderSize = isMobile
    ? 1.54
    : isTablet
      ? 1.70
      : isSmallDesktop
        ? 1.82
        : 1.91;

  // Spread distance for clean separation without colliding at 1.91x scale
  const spreadX = isTablet
    ? Math.min(340, Math.floor((windowWidth - 80) / 2.2))
    : isSmallDesktop
      ? 435
      : 475;

  // =========================================================================
  // 2. INTERACTION HANDLERS
  // =========================================================================

  // Handle clicking on any folder
  const handleFolderClick = (folderId: FolderId, e: React.MouseEvent) => {
    e.stopPropagation();

    // 1. Initial State -> First Click: ONLY expand into horizontal arrangement.
    // Do NOT open folder documents on this first click!
    if (archiveState === "stacked") {
      setArchiveState("expanded");
      setActiveFolderId(null);
      return;
    }

    // 2. Expanded State -> Click individual folder to open it
    if (archiveState === "expanded") {
      setActiveFolderId(folderId);
      setArchiveState("folder-open");
      return;
    }

    // 3. Folder-Open State
    if (archiveState === "folder-open") {
      if (activeFolderId === folderId) {
        // Clicking the currently open folder closes it back to expanded view
        setActiveFolderId(null);
        setArchiveState("expanded");
      } else {
        // Clicking a different folder immediately opens that folder
        setActiveFolderId(folderId);
      }
    }
  };

  // Background overview click: returns to previous level
  const handleBackgroundClick = () => {
    if (archiveState === "folder-open") {
      setActiveFolderId(null);
      setArchiveState("expanded");
    } else if (archiveState === "expanded") {
      setArchiveState("stacked");
      setActiveFolderId(null);
    }
  };

  // Open change from Folder component internals
  const handleOpenChange = (folderId: FolderId, requestedOpen: boolean) => {
    if (archiveState === "stacked") {
      // Ignore open request, purely trigger expansion
      setArchiveState("expanded");
      setActiveFolderId(null);
      return;
    }

    if (!requestedOpen && activeFolderId === folderId) {
      setActiveFolderId(null);
      setArchiveState("expanded");
    } else if (requestedOpen) {
      setActiveFolderId(folderId);
      setArchiveState("folder-open");
    }
  };

  // =========================================================================
  // 3. MOTION & POSITION COORDINATES
  // =========================================================================
  const getFolderMotion = (folderId: FolderId) => {
    // -------------------------------------------------------------
    // A. INITIAL STACKED STATE (Layered 3-Folder Physical Archive)
    // -------------------------------------------------------------
    if (archiveState === "stacked") {
      if (folderId === "commercial") {
        // Foreground center folder
        return {
          x: 0,
          y: 0,
          z: 30,
          rotate: 0,
          scale: 1,
          opacity: 1,
          filter: "drop-shadow(0 18px 30px rgba(0, 29, 81, 0.16))",
          zIndex: 30,
        };
      }
      if (folderId === "arbitration") {
        // Behind on the left, tab positioned on left and clearly visible
        const offsetLeft = isMobile ? -45 : isTablet ? -72 : -88;
        const offsetUp = isMobile ? -12 : -20;
        return {
          x: offsetLeft,
          y: offsetUp,
          z: 10,
          rotate: -2.5,
          scale: 0.96,
          opacity: 0.98,
          filter: "drop-shadow(0 14px 22px rgba(0, 29, 81, 0.13))",
          zIndex: 10,
        };
      }
      if (folderId === "corporate") {
        // Behind on the right, tab positioned on right and clearly visible
        const offsetRight = isMobile ? 45 : isTablet ? 72 : 88;
        const offsetUp = isMobile ? -12 : -20;
        return {
          x: offsetRight,
          y: offsetUp,
          z: 10,
          rotate: 2.5,
          scale: 0.96,
          opacity: 0.98,
          filter: "drop-shadow(0 14px 22px rgba(0, 29, 81, 0.13))",
          zIndex: 10,
        };
      }
    }

    // -------------------------------------------------------------
    // B. EXPANDED STATE (Clean Horizontal / Stepped 3-Folder Layout)
    // -------------------------------------------------------------
    if (archiveState === "expanded") {
      if (isMobile) {
        // Mobile compact vertical stack with accessible tabs & zero overflow
        const yOffset =
          folderId === "arbitration"
            ? -105
            : folderId === "commercial"
              ? 0
              : 105;
        const zIdx =
          folderId === "arbitration"
            ? 10
            : folderId === "commercial"
              ? 20
              : 30;
        return {
          x: 0,
          y: yOffset,
          z: zIdx,
          rotate: 0,
          scale: 1,
          opacity: 1,
          filter: "drop-shadow(0 12px 24px rgba(0, 29, 81, 0.12))",
          zIndex: zIdx,
        };
      }

      // Desktop & Tablet: Balanced horizontal distribution with zero collision
      const xPos =
        folderId === "arbitration"
          ? -spreadX
          : folderId === "commercial"
            ? 0
            : spreadX;

      return {
        x: xPos,
        y: 0,
        z: 20,
        rotate: 0,
        scale: 1,
        opacity: 1,
        filter: "drop-shadow(0 16px 28px rgba(0, 29, 81, 0.13))",
        zIndex: 20,
      };
    }

    // -------------------------------------------------------------
    // C. FOLDER-OPEN STATE (Selected Folder Centers & Fans Out)
    // -------------------------------------------------------------
    if (archiveState === "folder-open") {
      const isActive = activeFolderId === folderId;

      if (isActive) {
        // The active folder moves into primary center stage
        return {
          x: 0,
          y: 0,
          z: 50,
          rotate: 0,
          scale: 1.06,
          opacity: 1,
          filter: "drop-shadow(0 26px 44px rgba(0, 29, 81, 0.22))",
          zIndex: 50,
        };
      }

      // Inactive folders step aside to allow full breathing room for fanning
      if (isMobile) {
        return {
          x: folderId === "arbitration" ? -85 : 85,
          y: 190,
          z: 5,
          rotate: 0,
          scale: 0.75,
          opacity: 0.18,
          filter: "none",
          zIndex: 5,
        };
      }

      const flankX = spreadX + 130;
      const xPos = folderId === "arbitration" ? -flankX : flankX;

      return {
        x: xPos,
        y: 0,
        z: 10,
        rotate: 0,
        scale: 0.8,
        opacity: 0.35,
        filter: "drop-shadow(0 8px 16px rgba(0, 29, 81, 0.08))",
        zIndex: 10,
      };
    }

    return {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      zIndex: 10,
    };
  };

  return (
    <section
      id="case-studies"
      aria-label="Proven Results - Interactive Case Study Archive"
      className="relative py-8 sm:py-10 md:py-12 bg-gradient-to-b from-[#F9FBFE] via-white to-[#F2F7FD] overflow-hidden select-none"
      onClick={handleBackgroundClick}
    >
      {/* Ambient background glows for spatial depth */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[960px] h-[460px] rounded-full bg-gradient-to-tr from-[#00BFFF]/10 via-[#001d51]/5 to-transparent blur-3xl opacity-75" />
        <div className="absolute right-[8%] top-[25%] w-[300px] h-[300px] rounded-full bg-[#00BFFF]/5 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-5 md:mb-6">
          <Badge className="mb-2 sm:mb-2.5 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-4 py-1 rounded-full font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#00BFFF]" />
            Case Studies
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-1.5 sm:mb-2 tracking-tight">
            Proven Results
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Real cases, real recoveries. Explore our commercial, arbitration,
            and corporate case archives through strategic litigation finance.
          </p>
        </div>

        {/* Dynamic Context Pill / Mode Indicator */}
        <div className="flex justify-center mb-2.5 sm:mb-3 md:mb-4">
          <AnimatePresence mode="wait">
            {archiveState === "stacked" && (
              <motion.div
                key="pill-stacked"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setArchiveState("expanded");
                }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#001d51] bg-[#00BFFF]/10 border border-[#00BFFF]/30 hover:bg-[#00BFFF]/20 transition-all shadow-xs cursor-pointer group"
              >
                <Layers className="w-3.5 h-3.5 text-[#00BFFF] group-hover:scale-110 transition-transform" />
                <span>3 Case Archives Stacked · Click to Expand Folders</span>
              </motion.div>
            )}

            {archiveState === "expanded" && (
              <motion.div
                key="pill-expanded"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setArchiveState("stacked");
                }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#001d51] bg-[#00BFFF]/10 border border-[#00BFFF]/30 hover:bg-[#00BFFF]/20 transition-all shadow-xs cursor-pointer group"
              >
                <FolderArchive className="w-3.5 h-3.5 text-[#00BFFF] group-hover:scale-110 transition-transform" />
                <span>Select Any Folder to Open · Click Stage to Restack</span>
              </motion.div>
            )}

            {archiveState === "folder-open" && (
              <motion.div
                key="pill-open"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFolderId(null);
                  setArchiveState("expanded");
                }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#001d51] bg-[#00BFFF]/10 border border-[#00BFFF]/30 hover:bg-[#00BFFF]/20 transition-all shadow-xs cursor-pointer group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {FOLDERS.find((f) => f.id === activeFolderId)?.label} Open ·
                  Click to Close Folder
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* THREE INTERACTIVE ARCHIVE FOLDERS STAGE                  */}
        {/* ======================================================== */}
        <div
          className={`relative flex justify-center items-center overflow-visible select-none transition-all duration-300 ${
            archiveState === "expanded" && isMobile
              ? "min-h-[440px] py-3 sm:py-4"
              : "min-h-[390px] sm:min-h-[430px] md:min-h-[470px] py-1.5 sm:py-2 md:py-3"
          }`}
        >
          {FOLDERS.map((folder, idx) => {
            const isOpen =
              archiveState === "folder-open" && activeFolderId === folder.id;
            const motionProps = getFolderMotion(folder.id);

            // Stagger timing for natural physical separation
            const staggerDelay =
              archiveState === "expanded"
                ? folder.id === "arbitration"
                  ? 0
                  : folder.id === "commercial"
                    ? 0.05
                    : 0.1
                : 0;

            return (
              <motion.div
                key={folder.id}
                initial={false}
                animate={{
                  x: motionProps.x,
                  y: motionProps.y,
                  rotate: motionProps.rotate,
                  scale: motionProps.scale,
                  opacity: motionProps.opacity,
                  filter: motionProps.filter,
                  zIndex: motionProps.zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 24,
                  mass: 0.95,
                  delay: staggerDelay,
                }}
                style={{
                  position: "absolute",
                  transformOrigin: "center center",
                  cursor: "pointer",
                }}
                onClick={(e) => handleFolderClick(folder.id, e)}
              >
                <Folder
                  label={folder.label}
                  items={folder.items}
                  mode="flap"
                  variant="solid"
                  color="#00BFFF"
                  paperColor="#ffffff"
                  tabPosition={folder.tabPosition}
                  layout={isMobile ? "stack" : "spread"}
                  size={folderSize}
                  open={isOpen}
                  onOpenChange={(next) => handleOpenChange(folder.id, next)}
                  zoomOnClick={true}
                  draggable={false}
                  closeOnOutsideClick={true}
                  theme="light"
                />
              </motion.div>
            );
          })}
        </div>

        {/* View More Results Button */}
        <div className="text-center mt-3 sm:mt-4 md:mt-5">
          <Button
            size="lg"
            variant="outline"
            className="text-xs sm:text-sm md:text-base font-semibold px-6 py-2.5 h-10 sm:h-11 md:h-12 rounded-xl border-slate-300 hover:border-[#00BFFF] hover:bg-primary/5 text-primary transition-all duration-200 shadow-xs"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/proven-results");
            }}
          >
            Explore All Proven Results
            <ArrowRight className="ml-2 h-4 w-4 text-[#00BFFF]" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;