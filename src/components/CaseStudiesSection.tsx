import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Folder, { FolderItem } from "./Folder";

const CASE_STUDIES: FolderItem[] = [
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
    title: "Long-Pending Token Refund Resolution",
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

const CaseStudiesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCaseStudyClick = (item: FolderItem, _index: number) => {
    navigate(`/proven-results/${item.id}`);
  };

  return (
    <section
      id="case-studies"
      aria-label="Proven Results - Interactive Case Study Folder"
      className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#F9FBFE] via-white to-[#F2F7FD] overflow-hidden select-none"
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
        <div className="text-center mb-6 sm:mb-8">
          <Badge className="mb-2.5 sm:mb-3 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-4 py-1 rounded-full font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#00BFFF]" />
            Case Studies
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-2 sm:mb-2.5 tracking-tight">
            Proven Results
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Real cases, real recoveries. See how we've helped businesses recover substantial amounts through strategic litigation finance.
          </p>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE FOLDER COMPONENT                             */}
        {/* ======================================================== */}
        <Folder
          label="Proven Results"
          items={CASE_STUDIES}
          onItemClick={(item, index) => handleCaseStudyClick(item, index)}
          mode="book"
          variant="glass"
          color="#7aa7ff"
        />

        {/* View More Results Button */}
        <div className="text-center mt-6 sm:mt-8">
          <Button
            size="lg"
            variant="outline"
            className="text-xs sm:text-sm md:text-base font-semibold px-6 py-2.5 h-10 sm:h-11 md:h-12 rounded-xl border-slate-300 hover:border-[#00BFFF] hover:bg-primary/5 text-primary transition-all duration-200 shadow-xs"
            onClick={() => navigate("/proven-results")}
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
