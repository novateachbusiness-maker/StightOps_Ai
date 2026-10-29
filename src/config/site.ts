/**
 * SightOps AI - Central Site & Brand Configuration
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
  name: "SightOps AI",
  shortName: "SightOps",
  tagline: "See Better. Inspect Smarter. Think Ahead.",
  pillars: ["Vision", "Intelligence", "Cutting-Edge Technology"],
  headline: "AI-Powered Vision Systems for Smarter Industrial Inspection",
  subheadline:
    "We engineer industrial machine vision, automated visual inspection, and edge AI systems that help manufacturing plants detect defects, verify assemblies, inspect markings, and maintain zero-defect standards.",

  // Approved Brand Logo Assets
  logo: {
    main: "/assets/branding/sightops-logo.jpeg",
    alt: "SightOps AI - See Better. Inspect Smarter. Think Ahead.",
  },

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

  // WhatsApp Business Integration
  whatsapp: {
    number: "919876543210", // Configurable WhatsApp business phone number
    displayPhone: "+91 98765 43210",
    prefillMessage: "Hello SightOps AI, I would like to discuss an industrial vision inspection solution.",
    chatUrl: "https://wa.me/919876543210?text=Hello%20SightOps%20AI%2C%20I%20would%20like%20to%20discuss%20an%20industrial%20vision%20inspection%20solution.",
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
    title: "Solutions",
    href: "/solutions",
    children: [
      {
        title: "AI-Based Visual Inspection",
        href: "/solutions/ai-visual-inspection",
        description: "Deep learning models for complex defect detection and classification on irregular surfaces.",
      },
      {
        title: "Automated PCB Inspection (AOI)",
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
