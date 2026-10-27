"use client";

import React, { useRef, useMemo } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export interface BlurTextProps {
  text: string;
  effect?: "blur";
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  staggerFrom?: "start" | "center" | "end" | number;
  trigger?: "view" | "mount";
  delay?: number; // in milliseconds
  stepDuration?: number; // in seconds
  blur?: number | string;
  distance?: number;
  className?: string;
  as?: React.ElementType;
  onAnimationComplete?: () => void;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  effect = "blur",
  animateBy = "words",
  direction = "bottom",
  staggerFrom = "start",
  trigger = "view",
  delay = 100,
  stepDuration = 0.35,
  blur = 6,
  distance = 20,
  className = "",
  as: Component = "p",
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(containerRef, { once: true, amount: 0.15 });

  const elements = useMemo(() => {
    if (!text) return [];
    if (animateBy === "letters") {
      return text.split("");
    }
    return text.split(" ");
  }, [text, animateBy]);

  const blurPx = typeof blur === "number" ? `${blur}px` : blur;
  const initialY = direction === "top" ? -distance : distance;

  // Calculate stagger offset based on staggerFrom
  const getStaggerDelay = (index: number, total: number) => {
    let position = index;
    if (staggerFrom === "end" || staggerFrom === "last") {
      position = total - 1 - index;
    } else if (staggerFrom === "center") {
      const center = Math.floor(total / 2);
      position = Math.abs(center - index);
    } else if (typeof staggerFrom === "number") {
      position = Math.abs(staggerFrom - index);
    }

    return (delay / 1000) + position * (stepDuration * 0.35);
  };

  const isTriggered = trigger === "mount" ? true : inView;

  // Accessible: render screen-reader only text if needed, while visual text has animated spans
  return (
    <Component
      ref={containerRef as any}
      className={className}
      style={{
        display: "inline-block",
        willChange: "transform, filter, opacity",
      }}
    >
      {elements.map((item, index) => {
        const itemDelay = getStaggerDelay(index, elements.length);

        if (shouldReduceMotion) {
          return (
            <React.Fragment key={index}>
              <span className="inline-block">{item}</span>
              {animateBy === "words" && index < elements.length - 1 && " "}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            <motion.span
              className="inline-block"
              initial={{
                filter: `blur(${blurPx})`,
                opacity: 0,
                y: initialY,
              }}
              animate={
                isTriggered
                  ? {
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      filter: `blur(${blurPx})`,
                      opacity: 0,
                      y: initialY,
                    }
              }
              transition={{
                duration: stepDuration,
                delay: itemDelay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onAnimationComplete={
                index === elements.length - 1 ? onAnimationComplete : undefined
              }
              style={{
                display: "inline-block",
                whiteSpace: "pre-wrap",
              }}
            >
              {item}
            </motion.span>
            {animateBy === "words" && index < elements.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </Component>
  );
};

export default BlurText;
