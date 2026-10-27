import React, { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  FileWarning,
  TrendingDown,
  Scale,
  Hourglass,
  Briefcase,
} from "lucide-react";
import indianBusinessmanCutout from "@/assets/indian-businessman-cutout.png";
import ThoughtBubble from "./ThoughtBubble";

export interface DisputeCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  baseRotation: number;
  phaseOffset: number; // in radians (0 to 2*PI)
}

export const DISPUTE_CARDS: DisputeCard[] = [
  {
    id: "unpaid-invoices",
    tag: "Overdue Receivables",
    title: "Unpaid Invoices",
    description: "Payments delayed. Cash flow under pressure.",
    icon: AlertCircle,
    accentColor: "#00BFFF",
    baseRotation: -2.0,
    phaseOffset: 0, // 0 deg
  },
  {
    id: "contract-disputes",
    tag: "Commercial Breach",
    title: "Contract Disputes",
    description: "Agreements contested. Business plans disrupted.",
    icon: FileWarning,
    accentColor: "#001d51",
    baseRotation: 2.2,
    phaseOffset: Math.PI / 3, // 60 deg
  },
  {
    id: "financial-burden",
    tag: "Capital Strain",
    title: "Financial Burden",
    description: "Outstanding dues creating uncertainty.",
    icon: TrendingDown,
    accentColor: "#00BFFF",
    baseRotation: -1.8,
    phaseOffset: (2 * Math.PI) / 3, // 120 deg
  },
  {
    id: "legal-uncertainty",
    tag: "Advisory Risk",
    title: "Legal Uncertainty",
    description: "Unresolved disputes. Difficult next steps.",
    icon: Scale,
    accentColor: "#001d51",
    baseRotation: 1.6,
    phaseOffset: Math.PI, // 180 deg
  },
  {
    id: "delayed-recovery",
    tag: "Trapped Liquidity",
    title: "Delayed Recovery",
    description: "Funds tied up while operations continue.",
    icon: Hourglass,
    accentColor: "#00BFFF",
    baseRotation: -2.2,
    phaseOffset: (4 * Math.PI) / 3, // 240 deg
  },
  {
    id: "business-continuity",
    tag: "Core Focus",
    title: "Business Continuity",
    description: "Protecting time, resources, and business focus.",
    icon: Briefcase,
    accentColor: "#001d51",
    baseRotation: 1.8,
    phaseOffset: (5 * Math.PI) / 3, // 300 deg
  },
];

interface OrbitingDisputeCardsProps {
  isPausedExternal?: boolean;
}

export const OrbitingDisputeCards: React.FC<OrbitingDisputeCardsProps> = ({
  isPausedExternal = false,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const angleRef = useRef<number>(0);
  const speedFactorRef = useRef<number>(1);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Calculate dynamic 3D orbital radii so cards revolve across the chest/lapels, keeping the person's face fully visible
    const getRadii = () => {
      const w = window.innerWidth;
      if (w >= 1440) {
        return { rx: 245, ry: 52, yOffset: 55, tilt: 10 };
      }
      if (w >= 1024) {
        return { rx: 215, ry: 48, yOffset: 50, tilt: 9 };
      }
      if (w >= 768) {
        return { rx: 235, ry: 50, yOffset: 50, tilt: 9 };
      }
      if (w >= 480) {
        return { rx: 145, ry: 36, yOffset: 38, tilt: 7 };
      }
      // Narrow mobile (320px - 479px)
      return { rx: 115, ry: 30, yOffset: 32, tilt: 5 };
    };

    let radii = getRadii();
    const handleResize = () => {
      radii = getRadii();
    };
    window.addEventListener("resize", handleResize);

    const ORBIT_DURATION = 24000; // 24 seconds for complete smooth 360-degree orbital rotation

    const updateCardsPosition = () => {
      const currentAngle = angleRef.current;
      const isMobile = window.innerWidth < 768;

      DISPUTE_CARDS.forEach((card, index) => {
        const el = cardRefs.current[index];
        if (!el) return;

        // Angle along orbital ellipse
        const angle = prefersReducedMotion
          ? card.phaseOffset
          : currentAngle + card.phaseOffset;

        // Trigonometric orbital coordinates
        // sinVal: -1 (left flank) to +1 (right flank)
        // cosVal: +1 (closest foreground, front) to -1 (deepest background, rear)
        const sinVal = Math.sin(angle);
        const cosVal = Math.cos(angle);

        // x coordinate: sweeps from -rx to +rx
        const x = sinVal * radii.rx;

        // z coordinate: depth axis (-1 to +1)
        // cosVal > 0 means the card is in the front half (closer to camera)
        // cosVal <= 0 means the card is in the rear half (farther from camera)
        const z = cosVal;

        // y coordinate: tilted orbital ring
        // Foreground cards (cosVal > 0) glide across chest, tie, and suit lapels
        // Rear cards (cosVal < 0) glide behind crown, temples, and neck
        const y = radii.yOffset + cosVal * radii.ry - sinVal * (radii.tilt * 0.4);

        const isHovered = hoveredCardId === card.id;

        // Normalized depth: 0 (deepest back) to 1 (frontmost)
        const depthNorm = (z + 1) / 2;

        // Dynamic 3D depth scaling: cards closer to camera are naturally larger, no popping out on hover
        const scale = isMobile
          ? 0.78 + depthNorm * 0.22
          : 0.88 + depthNorm * 0.20;

        // Dynamic depth opacity: rear cards fade softly, front cards fully opaque
        const opacity = isHovered ? 1.0 : 0.75 + depthNorm * 0.25;

        // DYNAMIC Z-INDEX:
        // Central Businessman cutout sits at z-index: 12.
        // FRONT HALF OF ORBIT (z > 0): z-index 20 to 30 -> VISIBLY IN FRONT OF BUSINESSMAN!
        // REAR HALF OF ORBIT (z <= 0): z-index 4 to 8 -> STRICTLY BEHIND BUSINESSMAN AT ALL TIMES!
        // Hovering NEVER elevates a rear card above the image (stays at max z-index 8 < 12).
        let zIndex: number;
        if (z > 0) {
          // Front half: in front of businessman (12)
          zIndex = isHovered ? 30 : 20 + Math.round(depthNorm * 10);
        } else {
          // Rear half: strictly behind businessman (12), even when hovered
          zIndex = isHovered ? 8 : 4 + Math.round(depthNorm * 4);
        }

        // 3D Perspective Rotation facing slightly toward viewer
        const rotY = -sinVal * (isMobile ? 8 : 13);
        const rotZ = card.baseRotation + sinVal * 2.2;
        const rotX = -cosVal * (isMobile ? 3 : 5);

        el.style.transform = `translate3d(${x}px, ${y}px, 0px) scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
        el.style.zIndex = `${zIndex}`;
        el.style.opacity = `${opacity}`;

        // Dynamic depth shadow (subtle hover glow without popping out)
        if (z > 0) {
          el.style.boxShadow = isHovered
            ? "0 16px 36px rgba(0, 191, 255, 0.22), 0 2px 8px rgba(0, 29, 81, 0.10)"
            : "0 14px 32px rgba(0, 29, 81, 0.12), 0 2px 8px rgba(0, 191, 255, 0.08)";
        } else {
          el.style.boxShadow = isHovered
            ? "0 6px 18px rgba(0, 191, 255, 0.16)"
            : "0 4px 14px rgba(0, 29, 81, 0.05)";
        }
      });
    };

    if (prefersReducedMotion) {
      updateCardsPosition();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // When hovered, decelerate smoothly to 5% speed (almost paused to allow easy reading)
      const targetSpeedFactor = hoveredCardId || isPausedExternal ? 0.05 : 1.0;
      speedFactorRef.current +=
        (targetSpeedFactor - speedFactorRef.current) * 0.08;

      const angularVelocity =
        ((2 * Math.PI) / ORBIT_DURATION) * speedFactorRef.current;
      angleRef.current =
        (angleRef.current + angularVelocity * delta) % (2 * Math.PI);

      updateCardsPosition();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hoveredCardId, isPausedExternal]);

  return (
    <div
      ref={stageRef}
      className="relative w-full max-w-[560px] lg:max-w-none h-[380px] sm:h-[420px] md:h-[450px] lg:h-[460px] flex items-center justify-center overflow-visible select-none"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient Radial Backlight Glow Behind Portrait */}
      <div
        className="absolute w-[300px] sm:w-[380px] md:w-[440px] h-[300px] sm:h-[380px] md:h-[440px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 191, 255, 0.10) 0%, rgba(0, 29, 81, 0.02) 45%, transparent 70%)",
        }}
      />

      {/* Subtle Architectural Connecting Curves & Orbital Guide Path (z-index: 2, behind all cards & portrait) */}
      <svg
        className="absolute w-[620px] h-[380px] pointer-events-none z-[2]"
        viewBox="0 0 620 380"
        fill="none"
        aria-hidden="true"
      >
        {/* Subtle Elliptical Orbit Track */}
        <ellipse
          cx="310"
          cy="232"
          rx="240"
          ry="52"
          stroke="#e2e8f0"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.65"
        />

        {/* Outer Left Curved Lead Line */}
        <path
          d="M 75 165 C 140 150, 190 190, 240 220"
          stroke="#cbd5e1"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          opacity="0.55"
        />
        <circle cx="75" cy="165" r="3" fill="#00BFFF" opacity="0.85" />

        {/* Outer Right Curved Lead Line */}
        <path
          d="M 545 165 C 480 150, 430 190, 380 220"
          stroke="#cbd5e1"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          opacity="0.55"
        />
        <circle cx="545" cy="165" r="3" fill="#00BFFF" opacity="0.85" />
      </svg>

      {/* ============================================================== */}
      {/* CENTRAL BUSINESSMAN PORTRAIT (FIXED AT Z-INDEX: 12)             */}
      {/* Cards on rear half pass behind (z: 4-8)                         */}
      {/* Cards on front half pass across chest/suit, leaving face clear  */}
      {/* ============================================================== */}
      <div
        className="absolute z-[12] pointer-events-none select-none flex items-end justify-center"
        style={{
          bottom: "6px",
          width: "clamp(200px, 24vw, 300px)",
          transform: "scale(1.44)",
          transformOrigin: "center 74%",
        }}
      >
        <img
          src={indianBusinessmanCutout}
          alt="Commercial Dispute Resolution — Stressed Businessman"
          className="w-full h-auto object-contain grayscale contrast-[1.04] brightness-[1.01]"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* ============================================================== */}
      {/* ANIMATED THOUGHT BUBBLE (FIXED AT Z-INDEX: 26)                 */}
      {/* Positioned directly above businessman's head with dots trail   */}
      {/* ============================================================== */}
      <div className="absolute z-[26] pointer-events-auto left-1/2 -translate-x-1/2 top-1 sm:top-2 md:top-2.5 lg:top-3">
        <ThoughtBubble />
      </div>

      {/* ============================================================== */}
      {/* 6 ORBITING DISPUTE CARDS                                       */}
      {/* Continuous 360-degree elliptical ring revolving around subject */}
      {/* Thin sky blue border (#00BFFF) on all cards                     */}
      {/* ============================================================== */}
      {DISPUTE_CARDS.map((card, index) => {
        const IconComponent = card.icon;
        const isHovered = hoveredCardId === card.id;

        return (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseEnter={() => setHoveredCardId(card.id)}
            onMouseLeave={() => setHoveredCardId(null)}
            className={`
              absolute pointer-events-auto cursor-pointer
              w-[145px] sm:w-[165px] md:w-[175px] lg:w-[185px] xl:w-[195px]
              rounded-2xl p-2.5 sm:p-3
              bg-white/95 backdrop-blur-md
              border border-[#00BFFF] transition-[border-color,background-color] duration-200 ease-out select-none
              ${
                isHovered
                  ? "bg-white shadow-[0_0_14px_rgba(0,191,255,0.35)]"
                  : ""
              }
            `}
            style={{
              willChange: "transform, opacity, z-index",
              transformOrigin: "center center",
            }}
          >
            {/* Top Row: Tag + Icon */}
            <div className="flex items-center justify-between gap-1.5 mb-1 sm:mb-1.5">
              <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9.5px] font-bold tracking-wider uppercase text-[#001d51]/75 truncate">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: card.accentColor }}
                />
                <span className="truncate">{card.tag}</span>
              </span>
              <div
                className={`
                  w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200
                  ${
                    isHovered
                      ? "bg-[#00BFFF]/15 text-[#0082c3]"
                      : "bg-slate-100 text-slate-600"
                  }
                `}
              >
                <IconComponent className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>

            {/* Title */}
            <h4
              className={`
                text-[11px] sm:text-[12.5px] md:text-[13px] font-bold leading-tight transition-colors duration-200 truncate
                ${isHovered ? "text-[#0082c3]" : "text-[#001d51]"}
              `}
            >
              {card.title}
            </h4>

            {/* Description */}
            <p className="text-[9.5px] sm:text-[10.5px] md:text-[11px] text-slate-500 leading-snug mt-0.5 sm:mt-1 font-normal line-clamp-2">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default OrbitingDisputeCards;
