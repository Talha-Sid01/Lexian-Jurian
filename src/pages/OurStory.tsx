import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Users,
  Globe,
  TrendingUp,
  ShieldCheck,
  Compass,
  Sparkles,
  Scale,
  Calendar,
  Building,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import MilestoneTimeline from "@/components/MilestoneTimeline";

const OurStory = () => {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      id: "01",
      icon: Users,
      title: "Client First",
      description:
        "Every decision we make prioritizes our clients' best interests and case outcomes.",
      highlight: "Fiduciary Commitment",
    },
    {
      id: "02",
      icon: Globe,
      title: "Transparency",
      description:
        "Clear communication and honest assessment at every stage of engagement.",
      highlight: "Uncompromised Integrity",
    },
    {
      id: "03",
      icon: Award,
      title: "Excellence",
      description:
        "Uncompromising quality in case selection, legal strategy, and execution.",
      highlight: "Institutional Rigor",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#00BFFF]/20 selection:text-[#001d51]">
      <Header />

      <main className="relative">
        {/* ============================================================ */}
        {/* PHASE 1: ABOUT PAGE HERO (OUR STORY)                         */}
        {/* ============================================================ */}
        <section className="relative pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28 bg-[#001338] text-white overflow-hidden">
          {/* Subtle geometric background grid and atmospheric radial glow */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
            aria-hidden="true"
          />

          {/* Radial soft cyan ambient lighting */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] md:w-[650px] h-[340px] sm:h-[500px] md:h-[650px] bg-[#00BFFF]/[0.12] blur-[110px] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
            {/* Back to Home Button */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={() => navigate("/")}
                className="group inline-flex items-center gap-2 mb-8 sm:mb-10 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-[#00BFFF]" />
                <span>Back to Home</span>
              </button>
            </motion.div>

            {/* Hero Titles & Supporting Text */}
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <motion.div
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium tracking-wide uppercase text-[#00BFFF] bg-[#00BFFF]/10 border border-[#00BFFF]/25"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#00BFFF]" />
                <span>Corporate History &middot; Lexian &amp; Jurian</span>
              </motion.div>

              <motion.h1
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-white tracking-tight leading-tight"
              >
                Our Story
              </motion.h1>

              <motion.p
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed"
              >
                Pioneering Legal Finance Innovation Since 2008
              </motion.p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PHASE 2: THE BEGINNING: COMPANY STORYTELLING                 */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
              {/* Left Column: Heading, Founded Year Callout, History Paragraphs */}
              <motion.div
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="lg:col-span-7 space-y-6"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#007ba8] bg-sky-50 border border-sky-200/60 px-3 py-1 rounded-full mb-3">
                    Our Genesis
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#001338] tracking-tight leading-tight">
                    The Beginning
                  </h2>
                </div>

                {/* Highlighted Founding-Year Callout (2008) */}
                <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50/80 via-white to-sky-50/40 border border-sky-100 shadow-xs">
                  <div className="flex items-baseline gap-1 text-[#001d51]">
                    <span className="text-3xl sm:text-4xl font-sans font-bold tracking-tight">
                      2008
                    </span>
                  </div>
                  <div className="h-9 w-px bg-slate-200" />
                  <div className="text-xs sm:text-sm text-slate-600 font-medium leading-snug">
                    Established in Mumbai &middot; 15+ years transforming India's commercial dispute financing
                  </div>
                </div>

                {/* Original Paragraphs preserved word-for-word */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Lexian &amp; Jurian was founded in 2008 by two visionary legal professionals who recognized 
                  a critical gap in the justice system: meritorious cases were being abandoned due to 
                  lack of funding. What started as a small boutique litigation finance firm in Mumbai 
                  has grown into one of India's most trusted names in commercial dispute resolution.
                </p>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Our founders, seasoned attorneys with decades of combined experience, understood that 
                  justice delayed is justice denied. They set out to create a firm that would not only 
                  provide capital but also strategic guidance to maximize case outcomes.
                </p>
              </motion.div>

              {/* Right Column: Mission & Vision Cards */}
              <div className="lg:col-span-5 space-y-6">
                {/* Mission Card */}
                <motion.div
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className="group relative p-7 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50/70 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#00BFFF]/50 transition-all duration-300"
                >
                  <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl w-fit mb-4 text-[#00BFFF] group-hover:scale-105 group-hover:bg-[#00BFFF] group-hover:text-white transition-all duration-300">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-[#001338] mb-2.5">
                    Our Mission
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    To democratize access to justice by providing strategic litigation finance 
                    solutions that empower businesses to pursue rightful claims without financial barriers.
                  </p>
                </motion.div>

                {/* Vision Card */}
                <motion.div
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  className="group relative p-7 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50/70 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#00BFFF]/50 transition-all duration-300"
                >
                  <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl w-fit mb-4 text-[#00BFFF] group-hover:scale-105 group-hover:bg-[#00BFFF] group-hover:text-white transition-all duration-300">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-[#001338] mb-2.5">
                    Our Vision
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    To be the leading litigation finance firm globally, recognized for excellence, 
                    innovation, and unwavering commitment to our clients' success.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PHASE 3: GROWTH & MILESTONES: INTERACTIVE TIMELINE           */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 bg-slate-50/60 border-b border-slate-100 relative overflow-hidden">
          {/* Subtle background ambient glow */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00BFFF]/[0.03] blur-[120px] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
            {/* Section Header */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#007ba8] bg-sky-50 border border-sky-200/60 px-3.5 py-1 rounded-full">
                Journey of Excellence
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#001338] tracking-tight">
                Growth &amp; Milestones
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                A track record of continuous innovation, strategic expansion, and landmark dispute recoveries across fifteen years.
              </p>
            </motion.div>

            {/* Interactive Milestone Timeline Component */}
            <MilestoneTimeline />
          </div>
        </section>

        {/* ============================================================ */}
        {/* PHASE 4: OUR VALUES: PREMIUM INTERACTIVE CARDS               */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            {/* Section Header */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#007ba8] bg-sky-50 border border-sky-200/60 px-3.5 py-1 rounded-full">
                Guiding Principles
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#001338] tracking-tight">
                Our Values
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                The institutional standards that govern our investment selection, partnerships, and dispute strategy.
              </p>
            </motion.div>

            {/* 3 Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={val.title}
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: idx * 0.1,
                    }}
                    className="group relative rounded-2xl bg-gradient-to-b from-white to-slate-50/60 border border-slate-200/90 p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-sky-950/5 hover:border-[#00BFFF]/60"
                  >
                    {/* Watermark index number */}
                    <div className="absolute top-6 right-6 font-sans text-3xl font-bold text-slate-200 select-none group-hover:text-[#00BFFF]/30 transition-colors">
                      {val.id}
                    </div>

                    <div>
                      {/* Icon Container */}
                      <div className="p-3.5 bg-sky-50 border border-sky-100 rounded-xl w-fit mb-6 text-[#00BFFF] group-hover:bg-[#00BFFF] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                        <Icon className="h-6 w-6" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold font-serif text-[#001338] mb-3 group-hover:text-[#007ba8] transition-colors">
                        {val.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {val.description}
                      </p>
                    </div>

                    {/* Bottom tag */}
                    <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-medium text-slate-500">
                        Core Value
                      </span>
                      <span className="font-semibold text-[#007ba8]">
                        {val.highlight}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PHASE 5: JOIN US ON OUR JOURNEY: FINAL CTA                   */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative rounded-3xl bg-gradient-to-br from-[#001338] via-[#001a47] to-[#000d26] text-white p-10 sm:p-14 lg:p-16 text-center overflow-hidden border border-white/10 shadow-xl"
            >
              {/* Radial soft cyan illumination */}
              <div
                className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00BFFF]/[0.18] blur-[90px] rounded-full pointer-events-none"
                aria-hidden="true"
              />

              {/* Geometric subtle corner accents */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00BFFF] bg-[#00BFFF]/10 border border-[#00BFFF]/25 px-3.5 py-1 rounded-full">
                  Partner With Lexian &amp; Jurian
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
                  Join Us on Our Journey
                </h2>

                <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto pt-1 pb-4">
                  Whether you're a business facing a commercial dispute or a legal professional 
                  seeking partnership opportunities, we're here to help you succeed.
                </p>

                <div className="pt-2">
                  <Button
                    onClick={() => {
                      navigate("/");
                      setTimeout(() => {
                        const contactSection = document.getElementById("contact");
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }, 120);
                    }}
                    size="lg"
                    className="bg-white hover:bg-[#00BFFF] text-[#001338] hover:text-[#001338] font-bold text-sm sm:text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group inline-flex items-center gap-2"
                  >
                    <span>Get in Touch</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OurStory;
