import React, { useState, useEffect } from "react";
import { Cookie, X, ShieldCheck, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "lexian_cookie_consent_v1";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  date: string;
}

export const CookieConsentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    // Clear any previous dismissed state so the cookie policy pop up is visible on run
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Fallback if storage inaccessible
    }

    // Smooth entrance timer
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Support reopening via custom event
    const handleReopen = () => setIsVisible(true);
    window.addEventListener("open-cookie-banner", handleReopen);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-cookie-banner", handleReopen);
    };
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Local storage disabled fallback
    }
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      date: new Date().toISOString(),
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      date: new Date().toISOString(),
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      essential: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
      date: new Date().toISOString(),
    });
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      role="dialog"
      aria-modal="false"
      className="fixed z-50 left-4 bottom-4 sm:left-6 sm:bottom-6 w-[calc(100vw-2rem)] sm:w-[410px] max-w-[430px] animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-2xl shadow-slate-900/20">
        {/* Sky-Blue accent top border bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-[#00BFFF] to-primary" />

        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Cookie className="h-5 w-5 text-[#00BFFF]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-[15px] font-bold text-primary font-serif leading-snug">
                  Cookie Preferences
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">Lexian & Jurian</span>
              </div>
            </div>

            <button
              onClick={handleRejectNonEssential}
              type="button"
              aria-label="Close cookie banner"
              className="p-1 -mr-1 -mt-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-[#00BFFF] focus-visible:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-3">
            We use cookies to ensure website security, remember your preferences, and analyze site performance. Non-essential cookies require your consent. Review our{" "}
            <Link
              to="/cookie-policy"
              className="text-[#00BFFF] hover:underline font-medium"
            >
              Cookie Policy
            </Link>.
          </p>

          {/* Detailed Preferences Accordion (Optional) */}
          {showCustomize && (
            <div className="space-y-2.5 my-3 pt-3 border-t border-slate-100 text-xs">
              {/* Essential */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="pr-2">
                  <span className="font-semibold text-slate-800 block">Strictly Necessary</span>
                  <span className="text-[11px] text-slate-500">Security & essential website functions</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-200/70 px-2 py-0.5 rounded">
                  Required
                </span>
              </div>

              {/* Analytics */}
              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/60 transition-colors">
                <div className="pr-2">
                  <span className="font-semibold text-slate-800 block">Analytics & Performance</span>
                  <span className="text-[11px] text-slate-500">Anonymous visitor and usage analytics</span>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#00BFFF] focus:ring-[#00BFFF]"
                />
              </label>

              {/* Marketing */}
              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/60 transition-colors">
                <div className="pr-2">
                  <span className="font-semibold text-slate-800 block">Marketing & Campaigns</span>
                  <span className="text-[11px] text-slate-500">Campaign reach and advisory engagement</span>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#00BFFF] focus:ring-[#00BFFF]"
                />
              </label>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleAcceptAll}
                size="sm"
                className="flex-1 bg-primary hover:bg-[#001d51] text-white font-medium text-xs h-9 rounded-xl shadow-sm hover:shadow transition-all border border-[#00BFFF]/30"
              >
                <Check className="h-3.5 w-3.5 mr-1 text-[#00BFFF]" />
                Accept All
              </Button>

              <Button
                onClick={showCustomize ? handleSaveCustom : handleRejectNonEssential}
                variant="outline"
                size="sm"
                className="flex-1 border-slate-200 hover:bg-slate-50 text-slate-700 text-xs h-9 rounded-xl transition-all"
              >
                {showCustomize ? "Save Preferences" : "Reject Non-Essential"}
              </Button>
            </div>

            {/* Customize Toggle Link */}
            <div className="flex items-center justify-between pt-1 text-[11px]">
              <button
                type="button"
                onClick={() => setShowCustomize((prev) => !prev)}
                className="text-slate-500 hover:text-primary transition-colors inline-flex items-center gap-1 font-medium"
              >
                {showCustomize ? (
                  <>
                    <ChevronUp className="h-3 w-3 text-[#00BFFF]" />
                    Hide preferences
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 text-[#00BFFF]" />
                    Manage preferences
                  </>
                )}
              </button>

              <span className="text-slate-400 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-[#00BFFF]" />
                DPDP Act 2023 Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CookieConsentPopup;
