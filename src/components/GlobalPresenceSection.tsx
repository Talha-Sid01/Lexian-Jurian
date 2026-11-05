import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe2,
  MapPin,
  ShieldCheck,
  Scale,
  ArrowRight,
  Compass,
} from "lucide-react";
import {
  WORLD_CONTINENTS_PATH,
  GLOBAL_DESTINATIONS,
} from "@/data/worldMapData";

export const GlobalPresenceSection: React.FC = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>("india");
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);

  const activeCountryId = hoveredCountryId || selectedCountryId;
  const activeCountry =
    GLOBAL_DESTINATIONS.find((d) => d.id === activeCountryId) ||
    GLOBAL_DESTINATIONS[GLOBAL_DESTINATIONS.length - 1];

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="global-presence"
      className="py-16 md:py-24 bg-white text-slate-900 relative select-none"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-7xl">
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-sky-50 text-[#001d51] border border-[#00BFFF]/30 text-xs sm:text-sm px-4 py-1.5 rounded-full font-semibold inline-flex items-center gap-1.5 shadow-none hover:bg-sky-100 transition-colors">
              <Globe2 className="w-3.5 h-3.5 text-[#00BFFF]" />
              Our Global Presence
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001d51] tracking-tight"
          >
            Connecting Businesses Across Borders
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Lexian &amp; Jurian supports businesses navigating commercial disputes
            and recovery challenges across international markets.
          </motion.p>
        </div>

        {/* ======================================================== */}
        {/* QUICK REGION FILTER PILLS (Mobile & Desktop Accessible)   */}
        {/* ======================================================== */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none px-2">
          {GLOBAL_DESTINATIONS.map((dest) => {
            const isSelected = activeCountryId === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => setSelectedCountryId(dest.id)}
                onMouseEnter={() => setHoveredCountryId(dest.id)}
                onMouseLeave={() => setHoveredCountryId(null)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#001d51] text-white border-[#001d51] shadow-sm shadow-[#001d51]/20 scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:border-[#00BFFF]/60 hover:text-[#001d51] hover:bg-sky-50/50"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-[#00BFFF]" : "bg-slate-300"
                  }`}
                />
                {dest.name}
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 3D EMBOSSED WORLD MAP CONTAINER                           */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC] to-[#F1F5F9] rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(0,29,81,0.06)] overflow-hidden p-3 sm:p-6 lg:p-8"
        >
          {/* Subtle cartographic grid / compass badge */}
          <div className="absolute top-4 left-5 flex items-center gap-2 text-[11px] font-mono tracking-wider text-slate-400 select-none">
            <Compass className="w-3.5 h-3.5 text-[#00BFFF]" />
            <span>GLOBAL JURISDICTION ATLAS • 8 STRATEGIC HUBS</span>
          </div>

          

          {/* SVG Canvas for 3D Embossed Continents & Markers */}
          <div className="relative w-full aspect-[2/1] min-h-[300px] max-h-[640px] mt-4">
            <svg
              viewBox="0 20 1000 420"
              className="w-full h-full"
              style={{ overflow: "visible" }}
            >
              <defs>
                {/* 3D Ambient Occlusion Shadow Filter */}
                <filter
                  id="continent-emboss-shadow"
                  x="-15%"
                  y="-15%"
                  width="135%"
                  height="145%"
                >
                  <feDropShadow
                    dx="0"
                    dy="8"
                    stdDeviation="9"
                    floodColor="#001d51"
                    floodOpacity="0.10"
                  />
                  <feDropShadow
                    dx="0"
                    dy="2.5"
                    stdDeviation="3"
                    floodColor="#001d51"
                    floodOpacity="0.08"
                  />
                </filter>

                {/* Continental Top Surface Light Gradient */}
                <linearGradient
                  id="continent-white-surface"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="45%" stopColor="#FDFEFE" />
                  <stop offset="100%" stopColor="#F1F5F9" />
                </linearGradient>

                {/* 3D Relief Bevel / Extrusion Edge Gradient */}
                <linearGradient
                  id="continent-relief-bevel"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#CBD5E1" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>

                {/* Marker Radial Glow (Static) */}
                <radialGradient id="cyan-pin-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.85" />
                  <stop offset="40%" stopColor="#00BFFF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00BFFF" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Cartographic Graticule Grid Lines (Subtle & Static) */}
              <g className="opacity-40" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="3 6">
                {/* Latitudes */}
                <line x1="20" y1="100" x2="980" y2="100" />
                <line x1="20" y1="165" x2="980" y2="165" />
                <line x1="20" y1="230" x2="980" y2="230" />
                <line x1="20" y1="295" x2="980" y2="295" />
                <line x1="20" y1="360" x2="980" y2="360" />

                {/* Longitudes */}
                <line x1="200" y1="40" x2="200" y2="400" />
                <line x1="350" y1="40" x2="350" y2="400" />
                <line x1="500" y1="40" x2="500" y2="400" stroke="#001d51" strokeOpacity="0.2" />
                <line x1="650" y1="40" x2="650" y2="400" />
                <line x1="800" y1="40" x2="800" y2="400" />
              </g>

              {/* ==================================================== */}
              {/* 3D EMBOSSED CONTINENTS (Static Multi-Layered Relief)  */}
              {/* ==================================================== */}
              <g className="continents-group">
                {/* Layer 1: Ambient Drop Shadow beneath the landmass */}
                <path
                  d={WORLD_CONTINENTS_PATH}
                  fill="#94A3B8"
                  filter="url(#continent-emboss-shadow)"
                  opacity="0.5"
                />

                {/* Layer 2: 3D Extrusion Bevel Rim (Simulating sculpted thickness) */}
                <path
                  d={WORLD_CONTINENTS_PATH}
                  transform="translate(0, 3.8)"
                  fill="url(#continent-relief-bevel)"
                  stroke="#94A3B8"
                  strokeWidth="0.4"
                />

                {/* Layer 3: Intermediate Shelf Rim */}
                <path
                  d={WORLD_CONTINENTS_PATH}
                  transform="translate(0, 1.8)"
                  fill="#E2E8F0"
                  stroke="#CBD5E1"
                  strokeWidth="0.4"
                />

                {/* Layer 4: Sculpted White Continent Top Surface */}
                <path
                  d={WORLD_CONTINENTS_PATH}
                  fill="url(#continent-white-surface)"
                  stroke="rgba(255, 255, 255, 0.95)"
                  strokeWidth="1.2"
                />

                {/* Layer 5: Fine Continental Contour Line */}
                <path
                  d={WORLD_CONTINENTS_PATH}
                  fill="none"
                  stroke="rgba(203, 213, 225, 0.75)"
                  strokeWidth="0.6"
                />
              </g>

              {/* ==================================================== */}
              {/* EIGHT LOCATION PINS (Static Elegance & Clean Accents)*/}
              {/* ==================================================== */}
              <g className="location-pins">
                {GLOBAL_DESTINATIONS.map((dest) => {
                  const isSelected = activeCountryId === dest.id;

                  // Label positions
                  const labelX = dest.x + dest.labelDx;
                  const labelY = dest.y + dest.labelDy;

                  return (
                    <g
                      key={dest.id}
                      className="cursor-pointer group"
                      onClick={() => setSelectedCountryId(dest.id)}
                      onMouseEnter={() => setHoveredCountryId(dest.id)}
                      onMouseLeave={() => setHoveredCountryId(null)}
                    >
                      {/* Connecting stem from pin to label */}
                      <line
                        x1={dest.x}
                        y1={dest.y}
                        x2={labelX}
                        y2={labelY}
                        stroke={isSelected ? "#00BFFF" : "#94A3B8"}
                        strokeWidth={isSelected ? 1.2 : 0.75}
                        strokeDasharray={isSelected ? "none" : "2 2"}
                        strokeOpacity={isSelected ? 0.9 : 0.5}
                        className="transition-colors duration-200"
                      />

                      {/* Static soft cyan halo ring */}
                      <circle
                        cx={dest.x}
                        cy={dest.y}
                        r={isSelected ? 14 : 10}
                        fill="url(#cyan-pin-glow)"
                        className="transition-all duration-200"
                      />

                      {/* Pin Drop Shadow (Static) */}
                      <ellipse
                        cx={dest.x}
                        cy={dest.y + 2.5}
                        rx={5}
                        ry={2.5}
                        fill="#001d51"
                        opacity={0.25}
                      />

                      {/* Pin Central Disc (Deep Navy #001d51) */}
                      <circle
                        cx={dest.x}
                        cy={dest.y}
                        r={isSelected ? 6.2 : 5}
                        fill="#001d51"
                        stroke="#FFFFFF"
                        strokeWidth={1.5}
                        className="transition-all duration-200 drop-shadow-sm"
                      />

                      {/* Pin Core (Bright Sky Blue #00BFFF) */}
                      <circle
                        cx={dest.x}
                        cy={dest.y}
                        r={isSelected ? 3 : 2.2}
                        fill="#00BFFF"
                        className="transition-all duration-200"
                      />

                      {/* Country Label Pill */}
                      <g transform={`translate(${labelX}, ${labelY})`}>
                        {/* Background pill */}
                        <rect
                          x={dest.labelPos === "left" ? -64 : -6}
                          y={-10}
                          width={70}
                          height={20}
                          rx={10}
                          fill={isSelected ? "#001d51" : "rgba(255, 255, 255, 0.95)"}
                          stroke={isSelected ? "#00BFFF" : "rgba(203, 213, 225, 0.9)"}
                          strokeWidth={isSelected ? 1.5 : 0.8}
                          className="transition-all duration-200 drop-shadow-sm"
                        />

                        {/* Status dot in label */}
                        <circle
                          cx={dest.labelPos === "left" ? -55 : 3}
                          cy={0}
                          r={2}
                          fill={isSelected ? "#00BFFF" : "#001d51"}
                        />

                        {/* Text */}
                        <text
                          x={dest.labelPos === "left" ? -48 : 9}
                          y={3.5}
                          fill={isSelected ? "#FFFFFF" : "#001d51"}
                          fontSize="9.5"
                          fontWeight={isSelected ? "700" : "600"}
                          fontFamily="sans-serif"
                          className="transition-colors duration-200 select-none"
                        >
                          {dest.name}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* ======================================================== */}
          {/* INTERACTIVE COUNTRY DETAIL CARD (Static & Refined)       */}
          {/* ======================================================== */}
          <div className="mt-6 pt-6 border-t border-slate-200/80">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCountry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#001d51] to-[#002f82] flex items-center justify-center text-white shrink-0 shadow-sm shadow-[#001d51]/20">
                    <MapPin className="w-5 h-5 text-[#00BFFF]" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#001d51]">
                        {activeCountry.name}
                      </h3>
                      <Badge className="bg-sky-50 text-[#001d51] border border-[#00BFFF]/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {activeCountry.region}
                      </Badge>
                      <span className="text-xs text-slate-500 font-medium">
                        • {activeCountry.market}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 font-medium max-w-3xl leading-relaxed">
                      {activeCountry.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1 font-semibold text-[#001d51]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#00BFFF]" />
                        Dispute Focus:
                      </span>
                      <span>{activeCountry.focus}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Button
                    onClick={scrollToContact}
                    className="w-full sm:w-auto bg-[#001d51] hover:bg-[#002b7a] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl inline-flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Inquire for Dispute Support</span>
                    <ArrowRight className="w-4 h-4 text-[#00BFFF]" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* EXECUTIVE VALUE PROPOSITIONS STRIP                        */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200/70 p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-100/70 flex items-center justify-center text-[#001d51] shrink-0">
              <Scale className="w-5 h-5 text-[#00BFFF]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#001d51]">
                Multi-Jurisdictional Alignment
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Coordinated litigation finance and commercial settlement strategies across domestic and foreign legal forums.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-2xl border border-slate-200/70 p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-100/70 flex items-center justify-center text-[#001d51] shrink-0">
              <Globe2 className="w-5 h-5 text-[#00BFFF]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#001d51]">
                Cross-Border Claim Recovery
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Comprehensive advisory for breach of contract, international trade disputes, and foreign asset enforcement.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-2xl border border-slate-200/70 p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-100/70 flex items-center justify-center text-[#001d51] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#00BFFF]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#001d51]">
                Non-Recourse Funding Framework
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Zero client financial liability in the event of an unsuccessful dispute outcome across all represented markets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
