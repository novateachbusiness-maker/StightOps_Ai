/**
 * SightOpsAi - Central Site & Brand Configuration
 * 
 * Edit this single configuration file to update company details, contact information,
 * domain endpoints, social channels, and core brand messaging across the entire site.
 */

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  children?: {
    title: string;
    href: string;
    description: string;
  }[];
}

export const SITE_CONFIG = {
  // Brand identity
  name: "SightOpsAi",
  shortName: "SightOpsAi",
  tagline: "See Better. Inspect Smarter. Think Ahead.",
  pillars: ["Vision", "Intelligence", "Cutting-Edge Technology"],
  headline: "AI-Powered Vision Systems for Smarter Industrial Inspection",
  subheadline:
    "We engineer industrial machine vision, automated visual inspection, and edge AI systems that help manufacturing plants detect defects, verify assemblies, inspect markings, and maintain zero-defect standards.",

  // Approved Brand Logo Assets
  logo: {
    main: "/assets/branding/sightops-logo.png",
    alt: "SightOpsAi - See Better. Inspect Smarter. Think Ahead.",
  },

  // Contact details & editable placeholders
  domain: "[DOMAIN PENDING]",
  contactEmail: "sightopsai@gmail.com",
  phone: "+91 72591 71733",
  phoneRaw: "+917259171733",
  registeredOffice: "Flat No. L248, Second Floor, KB Ecocity, Phase 1, Kammasandra, Electronic City, Hebbagodi, Bengaluru, Karnataka - 560100",
  address: {
    line1: "Flat No. L248, Second Floor, KB Ecocity, Phase 1",
    line2: "Kammasandra, Electronic City, Hebbagodi",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560100",
    country: "India",
    full: "Flat No. L248, Second Floor, KB Ecocity, Phase 1, Kammasandra, Electronic City, Hebbagodi, Bengaluru, Karnataka - 560100",
  },
  operatingHours: "Monday – Friday: 09:00 – 18:00 IST",

  // WhatsApp Business Integration
  whatsapp: {
    number: "917259171733", // Configurable WhatsApp business phone number
    displayPhone: "+91 72591 71733",
    prefillMessage: "Hello SightOpsAi, I would like to discuss an industrial vision inspection solution.",
    chatUrl: "https://wa.me/917259171733?text=Hello%20SightOpsAi%2C%20I%20would%20like%20to%20discuss%20an%20industrial%20vision%20inspection%20solution.",
  },

  // Primary market & business model
  primaryMarket: "India & International B2B Manufacturing",
  businessModel:
    "B2B industrial inspection solutions, custom machine-vision development, camera hardware integration, optical consultation, and plant technical support.",

  // Social & professional links
  socials: {
    linkedin: "https://www.linkedin.com/company/sightops-ai", // Configurable company presence placeholder
    linkedinStatus: "Pending official company page publication",
    youtube: "https://www.youtube.com/@sightops-ai",
    github: "https://github.com/sightops-ai",
    twitter: "https://twitter.com/sightops_ai",
  },

  // Color palette tokens (Refined Blue & Industrial Slate)
  palette: {
    primaryNavy: "#0B2545",
    sightopsBlue: "#0066FF",
    techCyan: "#00D2FF",
    primaryTeal: "#087F8C",
    surfaceLight: "#F8FAFC",
    darkText: "#0F172A",
    subtleBorder: "#E2E8F0",
  },

  // Core capabilities
  mainServices: [
    "AI-Based Visual Inspection Systems",
    "Automated Visual Inspection Systems",
    "Industrial Machine Vision Systems",
    "PCB Inspection & AOI Systems",
    "OCR & Barcode Recognition",
    "Surface Defect Detection & Classification",
    "Dimensional Measurement & Metrology",
  ],
};

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Industries",
    href: "/industries",
    children: [
      {
        title: "Automotive Vision Inspection",
        href: "/industries/automotive-vision-inspection",
        description: "Powertrain components, machined surfaces, weld integrity, and safety-critical fasteners.",
      },
      {
        title: "Electronics & PCB Inspection",
        href: "/industries/electronics-pcb-inspection",
        description: "Surface mount assembly, micro-soldering, semiconductor dies, and lead frames.",
      },
      {
        title: "Food & Packaging Inspection",
        href: "/industries/food-packaging-inspection",
        description: "Cap placement, fill level verification, label alignment, and seal integrity.",
      },
      {
        title: "Logistics & Product Inspection",
        href: "/industries/logistics-product-inspection",
        description: "Multi-sided barcode reading tunnels, parcel volumetrics, and sortation.",
      },
      {
        title: "Pharmaceutical Inspection",
        href: "/industries/pharmaceutical-inspection",
        description: "Vials, blister packs, syringe graduations, and 21 CFR Part 11 serialized code tracking.",
      },
    ],
  },
  {
    title: "Technologies",
    href: "/technologies",
  },
  {
    title: "Applications",
    href: "/applications",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
