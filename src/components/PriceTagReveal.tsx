import React, { useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck } from "lucide-react";

interface PriceTagRevealProps {
  price: string;
  priceNote: string;
  planName?: string;
  popular?: boolean;
  index?: number;
}

export const PriceTagReveal: React.FC<PriceTagRevealProps> = ({
  price,
  priceNote,
  planName,
  popular = false,
  index = 0,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative py-2 min-h-[82px] flex items-center justify-center overflow-visible select-none"
      style={{
        perspective: 1200,
      }}
    >
      {/* ======================================================== */}
      {/* 1. ACTUAL UNDERLYING PRICE (Hidden until revealed)       */}
      {/* ======================================================== */}
      <motion.div
        className="text-center w-full relative z-10"
        initial={
          shouldReduceMotion
            ? { opacity: 1, filter: "none", scale: 1 }
            : { opacity: 0, filter: "blur(8px)", scale: 0.95 }
        }
        animate={
          isRevealed || shouldReduceMotion
            ? { opacity: 1, filter: "blur(0px)", scale: 1 }
            : { opacity: 0, filter: "blur(8px)", scale: 0.95 }
        }
        transition={{
          duration: 0.65,
          delay: shouldReduceMotion ? 0 : 0.22,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="text-3xl md:text-4xl font-bold text-primary tracking-tight font-serif">
          {price}
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-sans">
          {priceNote}
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 2. FLOATING 3D GOLD METALLIC PRICE TICKET (NO AMOUNT)    */}
      {/* ======================================================== */}
      {!shouldReduceMotion && (
        <motion.div
          role="button"
          tabIndex={isRevealed ? -1 : 0}
          aria-label={isRevealed ? undefined : `Click to reveal pricing for ${planName || "plan"}`}
          onClick={handleReveal}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleReveal();
            }
          }}
          className={`absolute inset-0 m-auto w-full max-w-[245px] h-[74px] sm:h-[78px] rounded-xl flex items-center justify-between px-3 z-20 border border-white/80 transition-shadow ${
            isRevealed ? "pointer-events-none select-none" : "cursor-pointer group shadow-lg hover:shadow-xl"
          }`}
          style={{
            background:
              "linear-gradient(135deg, #FFFDF5 0%, #F8E7B6 18%, #DFBA67 40%, #FFFDF7 54%, #C79A34 76%, #F2DB95 100%)",
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transformOrigin: "center center",
          }}
          whileHover={
            !isRevealed
              ? {
                  scale: 1.03,
                  y: -2,
                  boxShadow:
                    "0 14px 28px -4px rgba(180, 130, 20, 0.45), 0 6px 14px -2px rgba(0, 29, 81, 0.16), inset 0 1px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(125, 90, 18, 0.35)",
                  transition: { duration: 0.18 },
                }
              : {}
          }
          whileTap={!isRevealed ? { scale: 0.98 } : {}}
          initial={{
            opacity: 1,
            x: 0,
            y: 0,
            z: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            boxShadow:
              "0 8px 20px -4px rgba(180, 130, 20, 0.3), 0 3px 8px -2px rgba(0, 29, 81, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(125, 90, 18, 0.3)",
          }}
          animate={
            isRevealed
              ? {
                  // Phase 1 (0 -> 0.28): Lift diagonally & float with expanding soft shadow
                  // Phase 2 (0.28 -> 1.0): 3D Flip around Y-axis with Z tilt & smooth dissolve
                  x: [0, 4, 44],
                  y: [0, -8, -22],
                  z: [0, 32, 70],
                  rotateY: [0, -14, -115],
                  rotateZ: [0, -2, -8],
                  opacity: [1, 1, 0],
                  scale: [1, 1.03, 0.88],
                  boxShadow: [
                    "0 8px 20px -4px rgba(180, 130, 20, 0.3), 0 3px 8px -2px rgba(0, 29, 81, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(125, 90, 18, 0.3)",
                    "0 22px 42px -6px rgba(180, 130, 20, 0.45), 0 10px 20px -4px rgba(0, 29, 81, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(125, 90, 18, 0.35)",
                    "0 30px 60px -10px rgba(180, 130, 20, 0), 0 15px 30px -5px rgba(0, 29, 81, 0), inset 0 1px 2px rgba(255, 255, 255, 0), inset 0 -1px 2px rgba(125, 90, 18, 0)",
                  ],
                }
              : {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  z: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  scale: 1,
                  boxShadow:
                    "0 8px 20px -4px rgba(180, 130, 20, 0.3), 0 3px 8px -2px rgba(0, 29, 81, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(125, 90, 18, 0.3)",
                }
          }
          transition={{
            duration: 1.15,
            delay: 0,
            times: [0, 0.28, 1],
            ease: ["easeInOut", "easeOut"],
          }}
        >
          {/* Ticket Eyelet / Punch Hole (Left end) */}
          <div className="flex items-center pl-0.5 pr-2 border-r border-dashed border-[#9e741c]/45 h-[50px] relative">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#dfba67] via-[#b8860b] to-[#7c5a14] p-[1.5px] shadow-sm flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#fdf9ee] flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-[#001d51]/30" />
              </div>
            </div>
          </div>

          {/* Ticket Core Content (Center: Clean Click to Reveal only) */}
          <div className="flex-1 px-2 text-center flex flex-col items-center justify-center overflow-hidden">
            <div className="font-serif font-bold text-base sm:text-lg text-[#001d51] tracking-widest leading-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] uppercase">
              CLICK TO<br />REVEAL
            </div>
          </div>

          {/* Ticket Right Seal / Accent Notch */}
          <div className="pl-1.5 pr-0.5 flex flex-col items-center justify-center text-[#9e741c]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9e741c]/80" />
            <span className="text-[7px] font-bold tracking-widest text-[#735011]/80 mt-0.5 uppercase">
              LEGAL
            </span>
          </div>

          {/* Dynamic Light Sheen Glint across ticket surface */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={
              isRevealed
                ? {
                    opacity: [0, 0.9, 0],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: 0.7,
              delay: 0.05,
              ease: "easeInOut",
            }}
          >
            <div className="w-[180%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -rotate-45 translate-x-[-120%] animate-pulse" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PriceTagReveal;
