import React from "react";
import { Star, ShieldCheck, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TrustedClientsBadgeProps {
  className?: string;
  showSubtitle?: boolean;
}

const clientAvatars = [
  {
    name: "Sunil Mulchandani",
    role: "Managing Partner, VC Fund",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    initials: "SM",
  },
  {
    name: "Ananya Sharma",
    role: "Principal Investor",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    initials: "AS",
  },
  {
    name: "Jayesh Thakkar",
    role: "MD, Manufacturing Corp",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    initials: "JT",
  },
  {
    name: "Rajesh Singhania",
    role: "Director, Precision Engineering",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    initials: "RS",
  },
];

export const TrustedClientsBadge: React.FC<TrustedClientsBadgeProps> = ({
  className = "",
  showSubtitle = true,
}) => {
  return (
    <div
      className={`inline-flex items-center gap-3 sm:gap-4 p-2 sm:p-2.5 pr-4 sm:pr-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      {/* Overlapping Avatar Stack */}
      <div className="flex -space-x-2.5 items-center pl-0.5">
        {clientAvatars.map((client, index) => (
          <Avatar
            key={index}
            className="h-8 w-8 sm:h-9 sm:w-9 ring-2 ring-white shadow-xs transition-transform duration-200 hover:scale-110 hover:z-20"
          >
            <AvatarImage
              src={client.src}
              alt={client.name}
              className="object-cover"
              loading="lazy"
            />
            <AvatarFallback className="bg-gradient-to-br from-[#001d51] via-[#0b2b6b] to-[#00BFFF] text-white text-[10px] font-bold">
              {client.initials}
            </AvatarFallback>
          </Avatar>
        ))}

        {/* 5k+ counter pill */}
        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#001d51] to-[#00BFFF] text-[10px] sm:text-[11px] font-bold text-white ring-2 ring-white shadow-xs z-10">
          5k+
        </div>
      </div>

      {/* Trust Rating & Copy */}
      <div className="flex flex-col text-left">
        {/* Star Rating Row */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#00BFFF] fill-[#00BFFF]"
              />
            ))}
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 ml-1">
            4.9/5
          </span>
          <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60 ml-1">
            <ShieldCheck className="h-2.5 w-2.5 text-emerald-600" />
            Verified
          </span>
        </div>

        {/* Headline */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <p className="text-xs sm:text-[13.5px] font-bold text-[#001d51] tracking-tight leading-tight">
            Trusted by 5000+ Clients
          </p>
        </div>

        {/* Optional Subtext */}
        {showSubtitle && (
          <span className="text-[10px] sm:text-[11px] text-slate-500 font-normal leading-none mt-0.5">
            Pan-India Commercial Dispute Recovery
          </span>
        )}
      </div>
    </div>
  );
};

export default TrustedClientsBadge;
