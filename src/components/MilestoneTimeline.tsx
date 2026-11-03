import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useInView, useReducedMotion } from "motion/react";
import {
  Building2,
  TrendingUp,
  Globe,
  Cpu,
  Award,
  Calendar,
  Sparkles,
  LucideIcon,
} from "lucide-react";

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
  tag: string;
  icon: LucideIcon;
}

const milestones: MilestoneItem[] = [
  {
    year: "2008",
    title: "Foundation",
    description:
      "Established in Mumbai with a vision to transform litigation finance in India.",
    tag: "Genesis & Foundation",
    icon: Building2,
  },
  {
    year: "2012",
    title: "Major Expansion",
    description:
      "Funded our first ₹50 crore+ case, establishing credibility in high-value disputes.",
    tag: "₹50 Cr+ Landmark Case",
    icon: TrendingUp,
  },
  {
    year: "2016",
    title: "International Recognition",
    description:
      "Expanded services to cross-border disputes and international arbitration.",
    tag: "Cross-Border Arbitration",
    icon: Globe,
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description:
      "Launched digital case assessment platform, making legal finance more accessible.",
    tag: "Digital Legal-Tech Platform",
    icon: Cpu,
  },
  {
    year: "2024",
    title: "Industry Leadership",
    description:
      "Over ₹500 crores in successful recoveries, serving 200+ clients across industries.",
    tag: "₹500+ Cr Recoveries · 200+ Clients",
    icon: Award,
  },
];

interface MilestoneCardProps {
  item: MilestoneItem;
  index: number;
  isEven: boolean;
  reducedMotion: boolean;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
  item,
  index,
  isEven,
  reducedMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    once: false,
    margin: "-15% 0px -15% 0px",
  });

  const Icon = item.icon;

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col md:flex-row items-start md:items-center w-full mb-12 sm:mb-16 md:mb-20 last:mb-0 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* ============================================================ */}
      {/* DESKTOP OPPOSITE SIDE: Large Year & Tag Marker               */}
      {/* ============================================================ */}
      <div
        className={`hidden md:flex w-1/2 ${
          isEven
            ? "justify-start pl-12 lg:pl-16 text-left"
            : "justify-end pr-12 lg:pr-16 text-right"
        }`}
      >
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={
            reducedMotion
              ? { opacity: 1 }
              : isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0.45, y: 10 }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-1"
        >
          <div className="flex items-center gap-2 font-serif text-3xl lg:text-4xl font-bold text-[#001338]">
            {isEven ? null : (
              <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#00BFFF]">
                {item.tag}
              </span>
            )}
            <span
              className={`transition-colors duration-300 ${
                isInView ? "text-[#00BFFF]" : "text-[#001d51]"
              }`}
            >
              {item.year}
            </span>
            {isEven ? (
              <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#00BFFF]">
                {item.tag}
              </span>
            ) : null}
          </div>
          <div className="text-xs sm:text-sm text-slate-500 font-medium">
            Milestone {index + 1} of 5
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* TIMELINE CENTER NODE / MARKER                                */}
      {/* ============================================================ */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <div className="relative flex items-center justify-center">
          {/* Animated glow halo when active */}
          <motion.div
            animate={
              isInView
                ? {
                    scale: [1, 1.45, 1],
                    opacity: [0.7, 0.2, 0.7],
                  }
                : { scale: 1, opacity: 0 }
            }
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00BFFF]/25 pointer-events-none"
          />

          {/* Core circle */}
          <motion.div
            animate={
              isInView
                ? {
                    backgroundColor: "#00BFFF",
                    borderColor: "#001d51",
                    scale: 1.1,
                  }
                : {
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                    scale: 1,
                  }
            }
            transition={{ duration: 0.3 }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center shadow-sm cursor-default"
          >
            <Icon
              className={`h-4 w-4 transition-colors duration-300 ${
                isInView ? "text-[#001d51]" : "text-slate-400"
              }`}
            />
          </motion.div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MILESTONE CARD: Content Block                                */}
      {/* ============================================================ */}
      <div
        className={`w-full md:w-1/2 pl-16 md:pl-0 ${
          isEven ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"
        }`}
      >
        <motion.div
          initial={
            reducedMotion
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  x: isEven ? -25 : 25,
                  y: 10,
                }
          }
          animate={
            reducedMotion
              ? { opacity: 1 }
              : isInView
              ? {
                  opacity: 1,
                  x: 0,
                  y: 0,
                }
              : {
                  opacity: 0.5,
                  x: 0,
                  y: 0,
                }
          }
          transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
          className={`group relative rounded-2xl bg-white p-6 sm:p-7 border transition-all duration-300 shadow-sm hover:shadow-md ${
            isInView
              ? "border-[#00BFFF]/50 shadow-sky-900/5 ring-1 ring-[#00BFFF]/20"
              : "border-slate-200/90 hover:border-slate-300"
          }`}
        >
          {/* Subtle top indicator bar */}
          <div
            className={`absolute top-0 left-6 right-6 h-1 rounded-b transition-colors duration-300 ${
              isInView ? "bg-[#00BFFF]" : "bg-transparent group-hover:bg-slate-200"
            }`}
          />

          {/* Mobile Year & Tag Header (visible only on mobile/small tablet) */}
          <div className="flex md:hidden items-center justify-between gap-2 mb-3">
            <span className="text-2xl font-serif font-bold text-[#001d51]">
              {item.year}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#007ba8] bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full">
              {item.tag}
            </span>
          </div>

          {/* Milestone Title */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-[#001338] tracking-tight group-hover:text-[#007ba8] transition-colors">
              {item.year} &mdash; {item.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {item.description}
          </p>

          {/* Subtle bottom meta */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 font-medium text-slate-500">
              <Calendar className="h-3 w-3 text-[#00BFFF]" />
              {item.year} Initiative
            </span>
            <span className="font-semibold text-[#001d51] group-hover:text-[#00BFFF] transition-colors">
              Verified Track Record &rarr;
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const MilestoneTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  // Track scroll progress along the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 65%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const scaleY = reducedMotion ? 1 : smoothProgress;

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto py-6 sm:py-10">
      {/* ============================================================ */}
      {/* CONTINUOUS VERTICAL CONNECTOR LINE                           */}
      {/* ============================================================ */}
      <div className="absolute left-6 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-1">
        {/* Background inactive track */}
        <div className="w-full h-full bg-slate-200 rounded-full" />

        {/* Animated active filled line */}
        <motion.div
          style={{
            scaleY,
            originY: 0,
          }}
          className="absolute inset-0 w-full bg-gradient-to-b from-[#00BFFF] via-[#007ba8] to-[#001d51] rounded-full shadow-[0_0_12px_rgba(0,191,255,0.5)]"
        />
      </div>

      {/* ============================================================ */}
      {/* MILESTONE LIST                                               */}
      {/* ============================================================ */}
      <div className="relative z-10">
        {milestones.map((item, index) => (
          <MilestoneCard
            key={item.year}
            item={item}
            index={index}
            isEven={index % 2 === 1}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </div>
  );
};

export default MilestoneTimeline;

