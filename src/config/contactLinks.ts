/**
 * Centralized Contact and Social Media Configuration for Lexian & Jurian
 * 
 * Verified against official project records & user-provided official links:
 * - Phone: +91 77150 91827 (Direct line)
 * - WhatsApp: +91 98921 91827 (Company WhatsApp)
 * - LinkedIn: https://www.linkedin.com/company/lexian-and-jurian-facilitation-services-llp/
 * - Twitter / X: https://www.x.com/lexianadnjurian
 * - Instagram: https://www.instagram.com/lexianandjurian?dlrf=OHFjdDlwYWUyd3Yy&utm_source=qr
 * - Facebook: https://www.facebook.com/share/17hU9K6rnR/?mibextid=wwXIfr
 */

export interface ContactChannel {
  id: "call" | "whatsapp" | "linkedin" | "twitter" | "instagram" | "facebook";
  title: string;
  subtitle: string;
  href: string;
  isExternal: boolean;
  isConfigured: boolean;
  unconfiguredNotice?: string;
  brandColor?: string;
}

export const CONTACT_CONFIG = {
  // Verified Telephone (Direct Line)
  phone: {
    display: "+91 77150 91827",
    raw: "+917715091827",
    telHref: "tel:+917715091827",
  },

  // Company WhatsApp Number (9892191827)
  whatsapp: {
    display: "+91 98921 91827",
    number: "919892191827",
    defaultMessage: "Hello Lexian & Jurian, I would like to inquire about commercial dispute assessment.",
    get href(): string {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.defaultMessage)}`;
    },
  },

  // Official Social Profiles
  social: {
    // Official LinkedIn Company Page
    linkedin: "https://www.linkedin.com/company/lexian-and-jurian-facilitation-services-llp/",

    // Official X (Twitter) profile
    twitter: "https://www.x.com/lexianadnjurian",

    // Official Instagram profile
    instagram: "https://www.instagram.com/lexianandjurian?dlrf=OHFjdDlwYWUyd3Yy&utm_source=qr",

    // Official Facebook page
    facebook: "https://www.facebook.com/share/17hU9K6rnR/?mibextid=wwXIfr",
  },
};

/**
 * Ordered list of channels displayed inside the Floating Contact Widget
 */
export const getContactChannels = (): ContactChannel[] => [
  {
    id: "call",
    title: "Call Us",
    subtitle: "+91 77150 91827",
    href: CONTACT_CONFIG.phone.telHref,
    isExternal: false,
    isConfigured: true,
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    subtitle: "+91 98921 91827",
    href: CONTACT_CONFIG.whatsapp.href,
    isExternal: true,
    isConfigured: true,
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    subtitle: "Company Page",
    href: CONTACT_CONFIG.social.linkedin,
    isExternal: true,
    isConfigured: true,
  },
  {
    id: "twitter",
    title: "Twitter / X",
    subtitle: "@lexianadnjurian",
    href: CONTACT_CONFIG.social.twitter,
    isExternal: true,
    isConfigured: true,
  },
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "@lexianandjurian",
    href: CONTACT_CONFIG.social.instagram,
    isExternal: true,
    isConfigured: true,
  },
  {
    id: "facebook",
    title: "Facebook",
    subtitle: "Official Page",
    href: CONTACT_CONFIG.social.facebook,
    isExternal: true,
    isConfigured: true,
  },
];
