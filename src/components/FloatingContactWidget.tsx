import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Phone, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { getContactChannels, ContactChannel } from "@/config/contactLinks";

// Crisp, official brand SVGs for authentic representation
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Official WhatsApp Green solid speech bubble */}
    <path
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"
      fill="#25D366"
    />
    {/* Crisp Pure White telephone handset */}
    <path
      d="M16.56 13.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.57.13.17 1.75 2.68 4.24 3.76.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.22-.16-.47-.29z"
      fill="#FFFFFF"
    />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const XTwitterIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

export const FloatingContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const channels = getContactChannels();

  // Close when clicking outside of the popup and trigger
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  // Close on Escape key press and restore focus to trigger button
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChannelClick = (
    channel: ContactChannel,
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    // If not configured, prevent broken navigation and display polite notice
    if (!channel.isConfigured) {
      event.preventDefault();
      toast.info(channel.unconfiguredNotice || `${channel.title} profile is coming soon.`);
      return;
    }
    // Allow native link action, then close popup
    setIsOpen(false);
  };

  const getChannelIcon = (id: ContactChannel["id"]) => {
    switch (id) {
      case "call":
        return <Phone className="h-4 w-4" />;
      case "whatsapp":
        return <WhatsAppIcon className="h-5 w-5" />;
      case "linkedin":
        return <LinkedInIcon className="h-4 w-4" />;
      case "twitter":
        return <XTwitterIcon className="h-3.5 w-3.5" />;
      case "instagram":
        return <InstagramIcon className="h-4 w-4" />;
      case "facebook":
        return <FacebookIcon className="h-4 w-4" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  const getIconContainerStyle = (id: ContactChannel["id"]) => {
    switch (id) {
      case "call":
        return "bg-sky-50 text-[#00BFFF] group-hover:bg-[#00BFFF] group-hover:text-white";
      case "whatsapp":
        return "bg-emerald-50 border border-emerald-100/80 group-hover:bg-emerald-100 group-hover:scale-105";
      case "linkedin":
        return "bg-blue-50 text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white";
      case "twitter":
        return "bg-slate-100 text-slate-900 group-hover:bg-slate-900 group-hover:text-white";
      case "instagram":
        return "bg-rose-50 text-[#E4405F] group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-rose-500 group-hover:to-purple-600 group-hover:text-white";
      case "facebook":
        return "bg-blue-50 text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white";
    }
  };

  return (
    <div
      ref={widgetRef}
      className="fixed z-50 pointer-events-auto"
      style={{
        right: "calc(1.5rem + env(safe-area-inset-right, 0px))",
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* POPUP MENU */}
      <div
        id="lexian-contact-popup"
        role="dialog"
        aria-modal="false"
        aria-label="Connect With Lexian & Jurian"
        className={`absolute right-0 bottom-[calc(100%+0.75rem)] w-[calc(100vw-3rem)] sm:w-[350px] max-w-[360px] 
          bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xl shadow-navy-950/20 
          transition-all duration-200 ease-out origin-bottom-right
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 translate-y-2 pointer-events-none"
          }`}
      >
        {/* Sky-Blue accent top border bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#001d51] via-[#00BFFF] to-[#001d51] rounded-t-2xl" />

        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-start justify-between pb-3 mb-3 border-b border-slate-100">
            <div>
              <h3 className="text-[15px] font-bold text-[#001d51] font-serif leading-snug tracking-tight">
                Connect With Lexian & Jurian
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose your preferred way to reach us.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 -mr-1 -mt-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF]"
              aria-label="Close contact menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* 6 Contact Options Grid */}
          <div className="grid grid-cols-2 gap-2">
            {channels.map((channel) => {
              const Content = (
                <>
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 ${getIconContainerStyle(
                      channel.id
                    )}`}
                  >
                    {getChannelIcon(channel.id)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-800 group-hover:text-[#001d51] truncate">
                        {channel.title}
                      </span>
                      {channel.isConfigured && channel.isExternal && (
                        <ArrowUpRight className="h-2.5 w-2.5 text-slate-400 group-hover:text-[#00BFFF] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-0.5" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-600 block truncate">
                      {channel.subtitle}
                    </span>
                  </div>
                </>
              );

              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  onClick={(e) => handleChannelClick(channel, e)}
                  target={channel.isExternal && channel.isConfigured ? "_blank" : undefined}
                  rel={channel.isExternal && channel.isConfigured ? "noopener noreferrer" : undefined}
                  className="group relative flex items-center gap-2.5 p-2 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-[#00BFFF]/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF] text-left cursor-pointer"
                  title={
                    channel.isConfigured
                      ? `${channel.title} — ${channel.subtitle}`
                      : `${channel.title} (Official profile coming soon)`
                  }
                >
                  {Content}
                </a>
              );
            })}
          </div>

          {/* Widget Footer Status Note */}
          <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct Commercial Assessment</span>
            </span>
            <span className="text-[10px] text-[#001d51] font-medium">Pan-India Support</span>
          </div>
        </div>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <button
        ref={triggerButtonRef}
        type="button"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls="lexian-contact-popup"
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
        className="relative group h-14 w-14 rounded-full bg-[#001d51] text-white flex items-center justify-center 
          shadow-xl shadow-navy-950/25 border border-[#00BFFF]/40 
          hover:border-[#00BFFF] hover:shadow-2xl hover:shadow-[#00BFFF]/20 hover:scale-105 active:scale-95 
          transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00BFFF]/50"
      >
        {/* Subtle pulsing accent ring when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full border border-[#00BFFF]/30 animate-ping opacity-40 pointer-events-none" />
        )}

        {/* Dynamic Icon Switch */}
        <div className="relative h-6 w-6 flex items-center justify-center">
          <MessageSquare
            className={`h-6 w-6 text-white transition-all duration-200 absolute ${
              isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            className={`h-6 w-6 text-[#00BFFF] transition-all duration-200 absolute ${
              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
            }`}
          />
        </div>
      </button>
    </div>
  );
};

export default FloatingContactWidget;
