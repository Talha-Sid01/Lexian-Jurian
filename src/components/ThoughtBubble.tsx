import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export interface ThoughtBubbleProps {
  /**
   * Array of thoughts to cycle through
   */
  thoughts?: string[];
  /**
   * Time in milliseconds to hold each thought before transitioning
   * @default 2800
   */
  displayDuration?: number;
  /**
   * Optional custom class for positioning or container overrides
   */
  className?: string;
}

const DEFAULT_THOUGHTS = [
  "Time to call a lawyer.",
  "Where’s my payment?!",
  "Cash flow… running dry.",
  "Will I recover my money?",
];

export const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({
  thoughts = DEFAULT_THOUGHTS,
  displayDuration = 2800,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!thoughts || thoughts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % thoughts.length);
    }, displayDuration);

    return () => clearInterval(interval);
  }, [thoughts, displayDuration]);

  return (
    <motion.div
      className={`relative inline-flex flex-col items-center select-none pointer-events-auto ${className}`}
      // Subtle, restrained vertical breathing motion (stationary if reduced motion)
      animate={
        shouldReduceMotion
          ? undefined
          : {
              y: [0, -3.5, 0],
            }
      }
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* ============================================================== */}
      {/* 1. MAIN PILL-SHAPED SPEECH BUBBLE (1.3x SCALE)                */}
      {/* Wide white pill, thin navy border, offset Deep Sky Blue shadow */}
      {/* ============================================================== */}
      <div
        className="
          relative z-10
          bg-white
          border-[1.8px] sm:border-2 border-[#001d51]
          rounded-full
          px-6 sm:px-8
          py-2.5 sm:py-3.5
          min-w-[250px] sm:min-w-[290px] md:min-w-[320px]
          h-[50px] sm:h-[56px] md:h-[60px]
          flex items-center justify-center
          transition-shadow duration-300
        "
        style={{
          boxShadow: "5px 5px 0px #00BFFF, 0 8px 24px rgba(0, 29, 81, 0.08)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    filter: "blur(8px)",
                    y: 4,
                    scale: 0.97,
                  }
            }
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              scale: 1,
              transition: {
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1], // easeOutQuart
              },
            }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    filter: "blur(8px)",
                    y: -4,
                    scale: 1.01,
                    transition: {
                      duration: 0.32,
                      ease: [0.4, 0, 1, 1], // easeIn
                    },
                  }
            }
            className="
              font-serif font-bold text-[#001d51]
              text-[15px] sm:text-[17px] md:text-[18.5px]
              tracking-tight leading-none text-center
              whitespace-nowrap
            "
          >
            &ldquo;{thoughts[currentIndex]}&rdquo;
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ============================================================== */}
      {/* 2. PROGRESSIVE CONNECTOR DOTS                                  */}
      {/* Fully visible, descending diagonally from bottom-right edge    */}
      {/* of the thought bubble toward the upper-right side of head      */}
      {/* ============================================================== */}
      <div className="absolute top-full left-1/2 w-0 h-0 z-20 pointer-events-none">
        {/* Dot 1 (Largest, fully visible below bottom-right edge of bubble) */}
        <div
          className="absolute w-[15px] h-[15px] sm:w-[16px] sm:h-[16px] rounded-full bg-white border-[1.8px] sm:border-2 border-[#001d51] left-[52px] sm:left-[64px] md:left-[70px] top-[7px] sm:top-[8px]"
          style={{
            boxShadow: "2.5px 2.5px 0px #00BFFF",
          }}
          aria-hidden="true"
        />

        {/* Dot 2 (Medium, middle) */}
        <div
          className="absolute w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-full bg-white border-[1.8px] sm:border-2 border-[#001d51] left-[38px] sm:left-[46px] md:left-[50px] top-[22px] sm:top-[24px]"
          style={{
            boxShadow: "2px 2px 0px #00BFFF",
          }}
          aria-hidden="true"
        />

        {/* Dot 3 (Smallest, closest to upper-right hairline) */}
        <div
          className="absolute w-[6px] h-[6px] sm:w-[7px] sm:h-[7px] rounded-full bg-white border-[1.5px] border-[#001d51] left-[26px] sm:left-[32px] md:left-[35px] top-[33px] sm:top-[36px]"
          style={{
            boxShadow: "1.5px 1.5px 0px #00BFFF",
          }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
};

export default ThoughtBubble;
