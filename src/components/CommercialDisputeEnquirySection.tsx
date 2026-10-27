import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Lock,
  ClipboardCheck,
  FileText,
  Handshake,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";

interface FormData {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  disputeType: string;
  approximateAmount: string;
  disputeDescription: string;
  privacyConsent: boolean;
}

interface FormErrors {
  fullName?: string;
  businessEmail?: string;
  phoneNumber?: string;
  disputeType?: string;
  disputeDescription?: string;
  privacyConsent?: string;
}

const DISPUTE_TYPES = [
  { value: "unpaid-invoices", label: "Unpaid Invoices & Commercial Recovery" },
  { value: "contract-breach", label: "Contract Breach / Commercial Breach" },
  { value: "trapped-liquidity", label: "Delayed Recovery & Trapped Liquidity" },
  { value: "partnership-dispute", label: "Partnership / Shareholder Dispute" },
  { value: "supplier-vendor", label: "Supplier / Vendor Disagreement" },
  { value: "ip-infringement", label: "IP & Commercial Infringement" },
  { value: "other", label: "Other Commercial Dispute" },
];

const DISPUTE_AMOUNTS = [
  { value: "under-10l", label: "Under ₹10 Lakhs" },
  { value: "10l-25l", label: "₹10 Lakhs – ₹25 Lakhs" },
  { value: "25l-50l", label: "₹25 Lakhs – ₹50 Lakhs" },
  { value: "50l-1cr", label: "₹50 Lakhs – ₹1 Crore" },
  { value: "1cr-5cr", label: "₹1 Crore – ₹5 Crores" },
  { value: "above-5cr", label: "Above ₹5 Crores" },
];

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzoR8djwnvKksctY5kKm9_w_D50WeP-O6wTB5NVnklC8UktMuniS3NECCqw62c3a9y8GQ/exec";

const CommercialDisputeEnquirySection: React.FC = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    businessEmail: "",
    phoneNumber: "",
    disputeType: "",
    approximateAmount: "",
    disputeDescription: "",
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const validateField = (name: keyof FormData, value: any): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value || typeof value !== "string" || !value.trim()) {
          return "Full name is required.";
        }
        if (value.trim().length < 2) {
          return "Full name must be at least 2 characters.";
        }
        return undefined;

      case "businessEmail":
        if (!value || typeof value !== "string" || !value.trim()) {
          return "Business email is required.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address.";
        }
        return undefined;

      case "phoneNumber":
        if (!value || typeof value !== "string" || !value.trim()) {
          return "Phone number is required.";
        }
        if (!/^[0-9+\-\s()]{10,15}$/.test(value.trim())) {
          return "Please enter a valid phone number (min 10 digits).";
        }
        return undefined;

      case "disputeType":
        if (!value) {
          return "Please select a dispute type.";
        }
        return undefined;

      case "disputeDescription":
        if (!value || typeof value !== "string" || !value.trim()) {
          return "Brief description of the dispute is required.";
        }
        if (value.trim().length < 15) {
          return "Please provide at least 15 characters describing the dispute.";
        }
        return undefined;

      case "privacyConsent":
        if (!value) {
          return "You must consent to the privacy policy to submit an enquiry.";
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    const keys: (keyof FormData)[] = [
      "fullName",
      "businessEmail",
      "phoneNumber",
      "disputeType",
      "disputeDescription",
      "privacyConsent",
    ];

    keys.forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, privacyConsent: checked }));
    setTouched((prev) => ({ ...prev, privacyConsent: true }));
    const error = validateField("privacyConsent", checked);
    setErrors((prev) => ({ ...prev, privacyConsent: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {
      fullName: true,
      companyName: true,
      businessEmail: true,
      phoneNumber: true,
      disputeType: true,
      approximateAmount: true,
      disputeDescription: true,
      privacyConsent: true,
    };
    setTouched(allTouched);

    if (!validateAll()) {
      toast({
        title: "Incomplete Details",
        description: "Please resolve the highlighted fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "Commercial Dispute Enquiry",
          fullName: formData.fullName.trim(),
          companyName: formData.companyName.trim() || "Not Specified",
          businessEmail: formData.businessEmail.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          disputeType: formData.disputeType,
          approximateAmount: formData.approximateAmount || "Not Specified",
          disputeDescription: formData.disputeDescription.trim(),
          submittedAt: new Date().toISOString(),
          source: window.location.href,
        }),
      });

      setIsSubmitted(true);
      toast({
        title: "Enquiry Submitted",
        description:
          "Thank you. Our dispute assessment team will review your enquiry and contact you within 24–48 hours.",
      });
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setSubmissionError(
        "We could not process your submission right now. Please verify your connection or email us directly at info@lexianandjurian.com."
      );
      toast({
        title: "Submission Issue",
        description: "Unable to submit enquiry. Please try again or reach out directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      companyName: "",
      businessEmail: "",
      phoneNumber: "",
      disputeType: "",
      approximateAmount: "",
      disputeDescription: "",
      privacyConsent: false,
    });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
    setSubmissionError(null);
  };

  return (
    <section
      id="enquiry"
      className="py-14 sm:py-18 md:py-20 lg:py-24 bg-gradient-surface relative overflow-hidden"
    >
      {/* Decorative Subtle Background Accents */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 191, 255, 0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 29, 81, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12 xl:gap-16">
          
          {/* ======================================================== */}
          {/* 1. LEFT COLUMN — ENQUIRY FORM (Approx 48% on desktop)     */}
          {/* ======================================================== */}
          <div className="w-full lg:w-[48%] xl:w-[47%] shrink-0 order-2 lg:order-1">
            <div className="bg-white rounded-tl-2xl md:rounded-tl-3xl rounded-tr-none rounded-br-2xl md:rounded-br-3xl rounded-bl-none shadow-xl shadow-slate-200/60 border-2 sm:border-[3px] border-[#00BFFF] p-5 sm:p-6 lg:p-6 relative">
              
              {/* Form Card Header */}
              <div className="mb-3.5 pb-3 border-b border-slate-100">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#001d51] leading-tight">
                  Let's Discuss Your{" "}
                  <span className="text-[#00BFFF]">Commercial Dispute</span>
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed font-normal">
                  Tell us about your business dispute. Our team will review your
                  enquiry and help you understand the next steps.
                </p>
              </div>

              {isSubmitted ? (
                /* Success State */
                <div className="py-8 sm:py-10 text-center max-w-md mx-auto space-y-3.5 animate-fade-in-up">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/30 text-[#00BFFF] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>

                  <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#001d51]">
                    Enquiry Received
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Thank you for reaching out. Our commercial dispute evaluation
                    panel has logged your case details. A dispute specialist will
                    examine your submission and contact you within{" "}
                    <span className="font-semibold text-[#001d51]">24 to 48 hours</span>.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="w-full sm:w-auto rounded-full px-4 py-1.5 text-xs font-medium border-slate-200 hover:border-[#00BFFF] text-[#001d51]"
                    >
                      Submit Another Enquiry
                    </Button>
                    <Link to="/services" className="w-full sm:w-auto">
                      <Button className="w-full bg-[#00BFFF] text-[#001d51] hover:bg-[#26cbff] rounded-full px-4 py-1.5 text-xs font-semibold shadow-xs">
                        Explore Our Services
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                /* Active Form State */
                <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-3.5">
                  {submissionError && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Submission Failed</p>
                        <p className="text-[11px] mt-0.5">{submissionError}</p>
                      </div>
                    </div>
                  )}

                  {/* Row 1: Full Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold text-[#001d51] mb-1"
                      >
                        Full Name <span className="text-[#00BFFF]">*</span>
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("fullName")}
                        placeholder="e.g., Rajesh Sharma"
                        disabled={isSubmitting}
                        className={`h-9 sm:h-9.5 bg-slate-50/60 border rounded-lg px-3 text-xs sm:text-sm text-[#061E49] font-medium placeholder:text-slate-400 placeholder:font-normal transition-colors focus:bg-white ${
                          errors.fullName && touched.fullName
                            ? "border-red-500 focus:ring-red-400"
                            : "border-slate-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                        }`}
                      />
                      {errors.fullName && touched.fullName && (
                        <p className="text-[11px] text-red-600 mt-0.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-xs font-semibold text-[#001d51] mb-1"
                      >
                        Company Name <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <Input
                        id="companyName"
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g., Apex Global Pvt Ltd"
                        disabled={isSubmitting}
                        className="h-9 sm:h-9.5 bg-slate-50/60 border border-slate-200 rounded-lg px-3 text-xs sm:text-sm text-[#061E49] font-medium placeholder:text-slate-400 placeholder:font-normal transition-colors focus:bg-white focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                      />
                    </div>
                  </div>

                  {/* Row 2: Business Email & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label
                        htmlFor="businessEmail"
                        className="block text-xs font-semibold text-[#001d51] mb-1"
                      >
                        Business Email <span className="text-[#00BFFF]">*</span>
                      </label>
                      <Input
                        id="businessEmail"
                        name="businessEmail"
                        type="email"
                        value={formData.businessEmail}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("businessEmail")}
                        placeholder="e.g., rajesh@apexglobal.in"
                        disabled={isSubmitting}
                        className={`h-9 sm:h-9.5 bg-slate-50/60 border rounded-lg px-3 text-xs sm:text-sm text-[#061E49] font-medium placeholder:text-slate-400 placeholder:font-normal transition-colors focus:bg-white ${
                          errors.businessEmail && touched.businessEmail
                            ? "border-red-500 focus:ring-red-400"
                            : "border-slate-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                        }`}
                      />
                      {errors.businessEmail && touched.businessEmail && (
                        <p className="text-[11px] text-red-600 mt-0.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.businessEmail}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-xs font-semibold text-[#001d51] mb-1"
                      >
                        Phone Number <span className="text-[#00BFFF]">*</span>
                      </label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("phoneNumber")}
                        placeholder="e.g., +91 98765 43210"
                        disabled={isSubmitting}
                        className={`h-9 sm:h-9.5 bg-slate-50/60 border rounded-lg px-3 text-xs sm:text-sm text-[#061E49] font-medium placeholder:text-slate-400 placeholder:font-normal transition-colors focus:bg-white ${
                          errors.phoneNumber && touched.phoneNumber
                            ? "border-red-500 focus:ring-red-400"
                            : "border-slate-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                        }`}
                      />
                      {errors.phoneNumber && touched.phoneNumber && (
                        <p className="text-[11px] text-red-600 mt-0.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Dispute Type & Approximate Dispute Amount */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label
                        htmlFor="disputeType"
                        className="block text-xs font-semibold text-[#001d51] mb-1"
                      >
                        Dispute Type <span className="text-[#00BFFF]">*</span>
                      </label>
                      <Select
                        value={formData.disputeType}
                        onValueChange={(val) => handleSelectChange("disputeType", val)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger
                          id="disputeType"
                          className={`h-9 sm:h-9.5 bg-slate-50/60 border rounded-lg px-3 text-xs sm:text-sm text-[#061E49] font-medium [&[data-placeholder]]:text-slate-400 [&[data-placeholder]]:font-normal transition-colors focus:bg-white ${
                            errors.disputeType && touched.disputeType
                              ? "border-red-500 focus:ring-red-400"
                              : "border-slate-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                          }`}
                        >
                          <SelectValue placeholder="Select dispute category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-slate-200/90 shadow-xl rounded-xl z-50 text-[#061E49]">
                          {DISPUTE_TYPES.map((type) => (
                            <SelectItem
                              key={type.value}
                              value={type.value}
                              className="cursor-pointer text-xs sm:text-sm py-2 text-[#061E49] font-medium hover:bg-[#00BFFF]/10 hover:text-[#061E49] focus:bg-[#00BFFF]/10 focus:text-[#061E49] data-[highlighted]:bg-[#00BFFF]/10 data-[highlighted]:text-[#061E49] data-[state=checked]:bg-[#00BFFF]/15 data-[state=checked]:text-[#061E49] data-[state=checked]:font-semibold"
                            >
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.disputeType && touched.disputeType && (
                        <p className="text-[11px] text-red-600 mt-0.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.disputeType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="approximateAmount"
                        className="block text-xs font-semibold text-[#001d51] mb-1"
                      >
                        Approximate Amount <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <Select
                        value={formData.approximateAmount}
                        onValueChange={(val) => handleSelectChange("approximateAmount", val)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger
                          id="approximateAmount"
                          className="h-9 sm:h-9.5 bg-slate-50/60 border border-slate-200 rounded-lg px-3 text-xs sm:text-sm text-[#061E49] font-medium [&[data-placeholder]]:text-slate-400 [&[data-placeholder]]:font-normal transition-colors focus:bg-white focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                        >
                          <SelectValue placeholder="Select claim value" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-slate-200/90 shadow-xl rounded-xl z-50 text-[#061E49]">
                          {DISPUTE_AMOUNTS.map((amt) => (
                            <SelectItem
                              key={amt.value}
                              value={amt.value}
                              className="cursor-pointer text-xs sm:text-sm py-2 text-[#061E49] font-medium hover:bg-[#00BFFF]/10 hover:text-[#061E49] focus:bg-[#00BFFF]/10 focus:text-[#061E49] data-[highlighted]:bg-[#00BFFF]/10 data-[highlighted]:text-[#061E49] data-[state=checked]:bg-[#00BFFF]/15 data-[state=checked]:text-[#061E49] data-[state=checked]:font-semibold"
                            >
                              {amt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Row 4: Brief Description of the Dispute */}
                  <div>
                    <label
                      htmlFor="disputeDescription"
                      className="block text-xs font-semibold text-[#001d51] mb-1"
                    >
                      Brief Description of the Dispute <span className="text-[#00BFFF]">*</span>
                    </label>
                    <Textarea
                      id="disputeDescription"
                      name="disputeDescription"
                      rows={2}
                      value={formData.disputeDescription}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("disputeDescription")}
                      placeholder="Outline the core facts: What transaction took place? What contract or invoice was breached? Current amount stalled..."
                      disabled={isSubmitting}
                      className={`bg-slate-50/60 border rounded-lg p-2.5 min-h-[58px] text-xs sm:text-sm text-[#061E49] font-medium placeholder:text-slate-400 placeholder:font-normal transition-colors focus:bg-white leading-relaxed resize-none ${
                        errors.disputeDescription && touched.disputeDescription
                          ? "border-red-500 focus:ring-red-400"
                          : "border-slate-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                      }`}
                    />
                    {errors.disputeDescription && touched.disputeDescription && (
                      <p className="text-[11px] text-red-600 mt-0.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.disputeDescription}
                      </p>
                    )}
                  </div>

                  {/* Row 5: Privacy Policy Consent */}
                  <div className="pt-0">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="privacyConsent"
                        checked={formData.privacyConsent}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(Boolean(checked))
                        }
                        disabled={isSubmitting}
                        className="mt-0.5 border-slate-300 data-[state=checked]:bg-[#001d51] data-[state=checked]:border-[#001d51] h-3.5 w-3.5"
                      />
                      <label
                        htmlFor="privacyConsent"
                        className="text-[11px] text-slate-600 leading-tight cursor-pointer select-none"
                      >
                        I consent to Lexian & Jurian collecting and processing my
                        submitted details in accordance with the{" "}
                        <Link
                          to="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#001d51] underline font-medium hover:text-[#00BFFF] transition-colors"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </label>
                    </div>
                    {errors.privacyConsent && touched.privacyConsent && (
                      <p className="text-[11px] text-red-600 mt-0.5 flex items-center gap-1 font-medium ml-5">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.privacyConsent}
                      </p>
                    )}
                  </div>

                  {/* Submit CTA Button & Confidentiality */}
                  <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>Strict NDA & confidentiality</span>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="
                        w-full sm:w-auto
                        bg-[#00BFFF] text-[#001d51] hover:bg-[#26cbff]
                        font-semibold text-xs
                        px-6 py-2 h-9 sm:h-9.5
                        rounded-full shadow-sm hover:shadow-md
                        transition-all duration-200 hover:-translate-y-0.5
                        flex items-center justify-center gap-1.5
                        min-w-[155px]
                      "
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <Send className="w-3 h-3" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. RIGHT COLUMN — PERSUASIVE CONTENT (Approx 52% on desktop) */}
          {/* ======================================================== */}
          <div className="w-full lg:w-[52%] xl:w-[53%] order-1 lg:order-2 space-y-6 sm:space-y-7 lg:pt-2">
            
            {/* Header Block */}
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/80 shadow-xs text-xs font-semibold text-[#001d51]">
                <span className="w-2 h-2 rounded-full bg-[#00BFFF]" />
                <span>
                  <span className="text-[#00BFFF]">Commercial Dispute</span> Advisory
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-5xl text-[#001d51] leading-[1.16] tracking-tight">
                Get Your Money Back,{" "}
                <span className="text-[#00BFFF]">The Legal Way</span>
              </h2>

              {/* Subheading */}
              <p className="text-base sm:text-lg lg:text-xl font-semibold text-[#001d51] leading-snug pt-1">
                Customer not paying? We help you recover your money.
              </p>
            </div>

            {/* Supporting Paragraphs */}
            <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                You delivered on time, but your customer won't pay. Despite repeated calls and reminders, your money remains stuck—and waiting longer only makes recovery harder.
              </p>
              <p>
                Lexian and Jurian can help. Our lawyers will look at your case,
                send a legal notice, and talk to the customer to settle. If
                needed, we will take the case to court.
              </p>
            </div>

            {/* Trust and Process Points */}
            <div className="pt-2 sm:pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                
                {/* Point 1: Free case check */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs hover:border-[#00BFFF]/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#001d51]/5 border border-[#00BFFF]/30 flex items-center justify-center shrink-0">
                    <ClipboardCheck className="w-5 h-5 text-[#00BFFF]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#001d51] leading-tight">
                    Free case check
                  </span>
                </div>

                {/* Point 2: Legal notice sent by lawyers */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs hover:border-[#00BFFF]/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#001d51]/5 border border-[#00BFFF]/30 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#00BFFF]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#001d51] leading-tight">
                    Legal notice sent by lawyers
                  </span>
                </div>

                {/* Point 3: Settlement first, court only if needed */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs hover:border-[#00BFFF]/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#001d51]/5 border border-[#00BFFF]/30 flex items-center justify-center shrink-0">
                    <Handshake className="w-5 h-5 text-[#00BFFF]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#001d51] leading-tight">
                    Settlement first, court only if needed
                  </span>
                </div>

                {/* Point 4: Your details stay private */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs hover:border-[#00BFFF]/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#001d51]/5 border border-[#00BFFF]/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#00BFFF]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#001d51] leading-tight">
                    Your details stay private
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CommercialDisputeEnquirySection;
