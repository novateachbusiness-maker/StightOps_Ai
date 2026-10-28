/**
 * Stightops Ai - Central Site & Brand Configuration
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
  name: "Stightops Ai",
  tagline: "Intelligent Vision. Reliable Inspection.",
  headline: "AI-Powered Vision Systems for Smarter Industrial Inspection",
  subheadline:
    "We engineer industrial machine vision, automated optical inspection (AOI), and edge AI systems that help manufacturing plants detect defects, verify assemblies, inspect markings, and maintain zero-defect standards.",

  // Contact details & editable placeholders
  domain: "[DOMAIN PENDING]",
  contactEmail: "[CONTACT EMAIL]",
  phone: "+91 (0) 80 4920 1800", // Representative B2B support line placeholder
  address: {
    line1: "Industrial Automation & Vision Systems Hub",
    line2: "Electronic City Phase 1",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560100",
    country: "India",
  },
  operatingHours: "Monday – Friday: 09:00 – 18:00 IST",

  // Primary market & business model
  primaryMarket: "India & International B2B Manufacturing",
  businessModel: "B2B industrial machine vision solutions, automated optical inspection systems, custom AI model training, hardware integration, and plant technical support.",

  // Social & professional links
  socials: {
    linkedin: "https://www.linkedin.com/company/stightops-ai",
    youtube: "https://www.youtube.com/@stightops-ai",
    github: "https://github.com/stightops-ai",
    twitter: "https://twitter.com/stightops_ai",
  },

  // Color palette tokens (Peacock theme)
  palette: {
    darkTeal: "#064E52",
    primaryTeal: "#087F8C",
    turquoiseAccent: "#18B6A4",
    mutedBlue: "#537DA8",
    white: "#FFFFFF",
    surface: "#F4F8F8",
    darkText: "#172B32",
    subtleBorder: "#DCE7E8",
  },

  // Core capabilities
  mainServices: [
    "AI Visual Inspection",
    "PCB Automated Optical Inspection",
    "OCR and Barcode Inspection",
    "Industrial Machine Vision",
    "Dimensional Measurement",
    "Surface Defect Detection",
  ],
};

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Solutions",
    href: "/solutions",
    children: [
      {
        title: "AI-Based Visual Inspection",
        href: "/solutions/ai-visual-inspection",
        description: "Deep learning models for complex defect detection and classification on irregular surfaces.",
      },
      {
        title: "PCB Automated Optical Inspection",
        href: "/solutions/pcb-aoi",
        description: "High-speed SMT verification, missing component checks, and solder fillet inspection.",
      },
      {
        title: "OCR & Barcode Inspection",
        href: "/solutions/ocr-barcode-inspection",
        description: "Reliable reading of 1D/2D DataMatrix codes, lot codes, and expiration dates at line speed.",
      },
      {
        title: "Surface Defect Detection",
        href: "/solutions/surface-defect-detection",
        description: "Identifying scratches, dents, porosity, and tool marks on metal and plastic parts.",
      },
      {
        title: "Dimensional Measurement",
        href: "/solutions/dimensional-measurement",
        description: "Sub-pixel telecentric optical metrology for critical tolerances and geometric verification.",
      },
      {
        title: "Custom Machine Vision Automation",
        href: "/solutions/custom-machine-vision",
        description: "End-to-end engineered vision stations integrated with factory PLCs, robotics, and MES.",
      },
    ],
  },
  {
    title: "Industries",
    href: "/industries",
    children: [
      {
        title: "Electronics & PCB Assembly",
        href: "/industries/electronics-pcb",
        description: "Surface mount technology, micro-soldering, and PCB substrate inspection.",
      },
      {
        title: "Automotive & Machined Metal",
        href: "/industries/automotive-metal",
        description: "Precision powertrain parts, stamped metal, casting porosity, and weld checks.",
      },
      {
        title: "Pharmaceutical & Medical Devices",
        href: "/industries/pharmaceutical-medical",
        description: "Vial inspection, blister pack verification, sterile seal checks, and serialisation.",
      },
      {
        title: "Food & Beverage Packaging",
        href: "/industries/food-beverage-packaging",
        description: "Cap placement, fill level verification, label orientation, and tamper seal checks.",
      },
      {
        title: "Semiconductors & Components",
        href: "/industries/semiconductor",
        description: "Die placement, lead frame inspection, wire bonding integrity, and micro-defects.",
      },
      {
        title: "Logistics & Traceability",
        href: "/industries/logistics-traceability",
        description: "High-speed parcel sorting, multi-barcode reading, and packaging verification.",
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
