/**
 * Applications & Case Studies Data
 * Structured around Customer Problem -> Solution Workflow -> Inputs/Outputs -> Business Value
 */

export interface InspectionStep {
  stepNumber: string;
  name: string;
  detail: string;
}

export interface ApplicationCase {
  id: string;
  slug: string;
  title: string;
  industry: string;
  inspectedProduct: string;
  customerProblem: string;
  inspectionProcess: InspectionStep[];
  image: string;
  technologiesUsed: string[];
  exampleInputDescription: string;
  exampleOutputDescription: string;
  acceptedVsRejectedDetails: {
    acceptedCriteria: string;
    rejectedCriteria: string;
  };
  expectedBusinessValue: string[];
  isDemonstrationBenchmark: boolean;
  demonstrationDisclaimer: string;
  boundingOverlays: {
    label: string;
    type: "defect" | "component" | "ocr" | "dimension";
    status: "pass" | "fail";
    x: number; // percentage
    y: number; // percentage
    width: number;
    height: number;
    metric: string;
  }[];
}

export const APPLICATIONS: ApplicationCase[] = [
  {
    id: "pcb-smt-component-assembly",
    slug: "pcb-smt-component-assembly",
    title: "High-Speed SMT Component Presence, Polarity & Solder Inspection",
    industry: "Electronics & PCB Inspection",
    inspectedProduct: "Surface-Mount Printed Circuit Boards (0201 chips, QFP-64, BGA)",
    customerProblem:
      "A fast-paced SMT assembly line running over 45,000 components per hour experienced intermittent field escapes due to tombstoned 0201 passives, missing chips, and skewed ICs. Manual microscope audit sampled only 1 in 50 boards, allowing defect batches to pass through to conformal coating.",
    inspectionProcess: [
      {
        stepNumber: "01",
        name: "Image Capture",
        detail: "Board fiducial marks are locked in 4ms using a 20MP global-shutter camera and multi-tier RGB ring lighting.",
      },
      {
        stepNumber: "02",
        name: "Image Preprocessing",
        detail: "Shape-from-shading separates solder fillet curvature angles into distinct red, green, and blue optical color bands.",
      },
      {
        stepNumber: "03",
        name: "AI & Geometric Detection",
        detail: "YOLO-based component detectors locate each part against CAD BOM coordinates, while edge algorithms measure lead offsets.",
      },
      {
        stepNumber: "04",
        name: "Result Classification",
        detail: "Components are classified into Pass, Missing, Skewed, or Solder Bridge according to IPC-A-610 Class 3 specifications.",
      },
      {
        stepNumber: "05",
        name: "System Integration",
        detail: "Pass/Fail decision is dispatched to the SMEMA conveyor buffer, and rework zoom coordinates are sent to the operator repair station.",
      },
    ],
    image: "/src/assets/images/solution_aoi_system_1792999689778.jpg",
    technologiesUsed: [
      "Multi-angle RGB Shape-from-Shading",
      "Telecentric Macro Optics",
      "CAD Centroid Coordinate Matching",
      "YOLOv8 Edge Anomaly Classifier",
      "SMEMA Conveyor Protocol",
    ],
    exampleInputDescription:
      "20MP multi-channel color capture of a 150mm x 100mm circuit board entering post-reflow inspection.",
    exampleOutputDescription:
      "Full board diagnostic map showing 248 components verified, with 1 tombstoned capacitor (C14) flagged with exact XY coordinates and zoom frame.",
    acceptedVsRejectedDetails: {
      acceptedCriteria: "Component present within ±20µm of CAD centroid, rotation < 1.0°, solder wetting angle < 30°.",
      rejectedCriteria: "Tombstoning, missing component, solder bridging across adjacent leads, reversed diode polarity.",
    },
    expectedBusinessValue: [
      "Near-complete elimination of post-potting scrap and customer warranty field returns",
      "Rapid recipe creation directly from Gerber files within 15 minutes during product changeovers",
      "Closed-loop feedback to pick-and-place feeders when component placement starts to drift",
    ],
    isDemonstrationBenchmark: true,
    demonstrationDisclaimer:
      "Representative engineering benchmark based on IPC-A-610 standards. Actual production throughput depends on board warp fixturing and conveyor indexing.",
    boundingOverlays: [
      {
        label: "QFP-48 Lead Coplanarity",
        type: "component",
        status: "pass",
        x: 38,
        y: 35,
        width: 22,
        height: 18,
        metric: "Offset: X+2.1µm, Y-1.4µm (PASS)",
      },
      {
        label: "0402 Capacitor C14",
        type: "defect",
        status: "fail",
        x: 64,
        y: 34,
        width: 9,
        height: 8,
        metric: "Tombstone Defect (Lift: 78µm)",
      },
      {
        label: "SMD Resistor Array R14-R18",
        type: "component",
        status: "pass",
        x: 26,
        y: 55,
        width: 14,
        height: 10,
        metric: "Polarity & Value: VERIFIED",
      },
    ],
  },
  {
    id: "automotive-gear-surface-scratch-inspection",
    slug: "automotive-gear-surface-scratch-inspection",
    title: "Automotive Transmission Gear & Sealing Face Defect Detection",
    industry: "Automotive Vision Inspection",
    inspectedProduct: "Precision Machined Transmission Gears, Flanges & Sealing Races",
    customerProblem:
      "Automotive machining plants must ensure precision gear sealing faces are free from tool marks, grinding chatter, and casting porosity. Manual tactile inspection with fingernails or visual checking under fluorescent lights resulted in missed flaws and high customer return rates.",
    inspectionProcess: [
      {
        stepNumber: "01",
        name: "Image Capture",
        detail: "Part is rotated under a synchronized 4-quadrant photometric stereo strobe to capture 4 directional shadow angles in 12ms.",
      },
      {
        stepNumber: "02",
        name: "Image Preprocessing",
        detail: "Mathematical photometric gradient filtering decouples 3D surface depth from 2D cosmetic cutter swirls and oil stains.",
      },
      {
        stepNumber: "03",
        name: "AI Defect Segmentation",
        detail: "A quantized convolutional segmentation network isolates scratches deeper than 25µm and porosity pits larger than 0.2mm.",
      },
      {
        stepNumber: "04",
        name: "Result Classification",
        detail: "Flaws are categorized as Cosmetic (acceptable), Reworkable (re-grind), or Scrap (functional porosity breach).",
      },
      {
        stepNumber: "05",
        name: "System Integration",
        detail: "Discrete 24V I/O triggers pneumatic diverter finger to divert defective gears to the rework lane.",
      },
    ],
    image: "/assets/hero/robotic-hud-inspection.jpeg",
    technologiesUsed: [
      "Photometric Stereo 3D Imaging",
      "Coaxial Glare-Suppression Strobes",
      "TensorRT Defect Segmentation Engine",
      "24V Optoisolated Industrial I/O",
      "Automated Tool-Wear Drift Tracking",
    ],
    exampleInputDescription:
      "Four 5MP images of a machined gear face captured under North, South, East, and West LED strobe angles.",
    exampleOutputDescription:
      "Topographical relief map showing a 1.42mm long scratch with 38µm estimated depth on the critical sealing chamfer.",
    acceptedVsRejectedDetails: {
      acceptedCriteria: "Zero scratches exceeding 0.50mm length on primary sealing diameter; zero porosity pits > 0.20mm.",
      rejectedCriteria: "Any crack, chatter mark, deep handling gouge, or porosity opening on pressure-bearing surfaces.",
    },
    expectedBusinessValue: [
      "Elimination of oil leaks and warranty claims on assembled transmissions",
      "Distinguishes harmless oil droplets from actual metal defects, reducing false scrap rates",
      "100% inspection record archival with serialized gear barcodes for plant traceability",
    ],
    isDemonstrationBenchmark: true,
    demonstrationDisclaimer:
      "Representative automotive trial on CNC turned components. Defect contrast relies on surface dryness and controlled part presentation.",
    boundingOverlays: [
      {
        label: "Scratch on Sealing Face",
        type: "defect",
        status: "fail",
        x: 48,
        y: 52,
        width: 14,
        height: 12,
        metric: "Length: 1.42mm, Depth: ~38µm",
      },
      {
        label: "Chamfer Porosity Pit",
        type: "defect",
        status: "fail",
        x: 65,
        y: 44,
        width: 9,
        height: 9,
        metric: "Diameter: 0.35mm (Limit: 0.20mm)",
      },
    ],
  },
  {
    id: "pharma-vial-blister-ocr-inspection",
    slug: "pharma-vial-blister-ocr-inspection",
    title: "Pharmaceutical Blister Pocket, Vial Crimping & 2D DataMatrix Verification",
    industry: "Pharmaceutical Inspection",
    inspectedProduct: "Sealed Blister Packs, Glass Vials, and Serialized Cartons",
    customerProblem:
      "High-speed packaging lines running at 450 cartons per minute risk severe regulatory penalties (21 CFR Part 11) if missing tablets, unsealed blister pockets, or illegible batch expiration dates escape onto hospital supply chains.",
    inspectionProcess: [
      {
        stepNumber: "01",
        name: "Image Capture",
        detail: "Polarized coaxial strobe lighting freezes blister packs and glass vials at 450 units/min without reflection blur.",
      },
      {
        stepNumber: "02",
        name: "Image Preprocessing",
        detail: "Contrast normalization and cross-polarization eliminate specular glare from glossy aluminum foil and plastic blisters.",
      },
      {
        stepNumber: "03",
        name: "AI OCR & Code Verification",
        detail: "Deep learning transformer OCR reads dot-matrix and laser-etched text; ECC 200 grader verifies DataMatrix modulation.",
      },
      {
        stepNumber: "04",
        name: "Result Classification",
        detail: "String payload is matched in 8ms against real-time manufacturing ERP database to confirm lot and expiration accuracy.",
      },
      {
        stepNumber: "05",
        name: "System Integration",
        detail: "Fail-safe air blast rejects unverified cartons into a locked reject bin with optical drop-sensor confirmation.",
      },
    ],
    image: "/src/assets/images/solution_ocr_barcode_1792999690125.jpg",
    technologiesUsed: [
      "Polarized Coaxial Strobe Lighting",
      "Deep Learning Font-Independent OCR",
      "ISO/IEC 15415 Print Quality Verification",
      "21 CFR Part 11 Audit Trail Logging",
      "Fail-Safe Locked Bin Reject Verification",
    ],
    exampleInputDescription:
      "Strobed image of pharmaceutical carton flap showing serialized 2D DataMatrix code and inkjet lot number.",
    exampleOutputDescription:
      "Decoded serial 'SN: 1048 5739 9214' verified against batch record with ISO Grade A (4.0/4.0); LOT ABC1230 verified.",
    acceptedVsRejectedDetails: {
      acceptedCriteria: "100% characters match database batch record; 2D DataMatrix ISO verification grade >= C; all blister pockets filled.",
      rejectedCriteria: "Any missing tablet, chipped pill, illegible expiry digit, or unverified serial code.",
    },
    expectedBusinessValue: [
      "Guaranteed compliance with DSCSA and global serialization mandates",
      "Zero uninspected cartons escaping to consumer distribution channels",
      "Automated e-signature audit logs ready for FDA and GMP audits",
    ],
    isDemonstrationBenchmark: true,
    demonstrationDisclaimer:
      "Representative pharmaceutical packaging demonstration. Complies with GS1 serialization architecture and 21 CFR Part 11 audit logging frameworks.",
    boundingOverlays: [
      {
        label: "2D DataMatrix ECC 200",
        type: "ocr",
        status: "pass",
        x: 44,
        y: 64,
        width: 22,
        height: 14,
        metric: "ISO Grade: A (4.0) | GS1 Match",
      },
      {
        label: "LOT & EXP OCV Match",
        type: "ocr",
        status: "pass",
        x: 44,
        y: 79,
        width: 26,
        height: 9,
        metric: "LOT: ABC1230 / EXP: 10/2026",
      },
    ],
  },
  {
    id: "turned-shaft-telecentric-metrology",
    slug: "turned-shaft-telecentric-metrology",
    title: "Turned Shaft & Fastener Telecentric Dimensional Metrology",
    industry: "Automotive Vision Inspection",
    inspectedProduct: "Precision CNC Turned Shafts, Fasteners & Valve Pins",
    customerProblem:
      "Periodic manual CMM measurement sampled only 1 part every 2 hours. If a cutting insert chipped midway through a shift, hundreds of out-of-tolerance parts were produced before operators discovered the drift, resulting in massive scrap bins.",
    inspectionProcess: [
      {
        stepNumber: "01",
        name: "Image Capture",
        detail: "Part silhouette is projected onto a 12MP sensor using a collimated blue telecentric backlight and bi-telecentric lens.",
      },
      {
        stepNumber: "02",
        name: "Image Preprocessing",
        detail: "Narrow-band optical filters block all ambient factory lighting, creating a pristine zero-distortion edge shadow.",
      },
      {
        stepNumber: "03",
        name: "Sub-Pixel Metrology",
        detail: "Polynomial edge interpolation algorithms measure diameters, runout, and thread pitch to sub-micron accuracy.",
      },
      {
        stepNumber: "04",
        name: "Result Classification",
        detail: "Measurements are compared against nominal CAD tolerances; Cp and Cpk capability indices are calculated in real time.",
      },
      {
        stepNumber: "05",
        name: "System Integration",
        detail: "When tool wear trends exceed 75% of tolerance window, an automated tool-offset update is sent directly to the CNC lathe.",
      },
    ],
    image: "/src/assets/images/case_study_pcb_1792999691900.jpg",
    technologiesUsed: [
      "Bi-Telecentric Optics with zero magnification distortion",
      "Collimated Blue LED Telecentric Backlights",
      "Sub-Pixel Polynomial Edge Detection",
      "Real-Time SPC Analytical Trend Engine",
      "Direct CNC Controller Closed-Loop Offset Link",
    ],
    exampleInputDescription:
      "Collimated backlight silhouette of a 120mm stepped steel shaft indexed in a rotary optical chuck.",
    exampleOutputDescription:
      "Continuous dimensional readout: OD1 = 12.003mm, OD2 = 18.498mm, Concentricity = 3.2µm, all within tolerance.",
    acceptedVsRejectedDetails: {
      acceptedCriteria: "Outer diameter within ±0.008mm; concentricity runout < 5.0µm; overall length within ±0.015mm.",
      rejectedCriteria: "Any dimension breaching upper or lower tolerance thresholds, or presence of edge burrs > 0.010mm.",
    },
    expectedBusinessValue: [
      "Zero scrap produced from gradual tool wear thanks to automated CNC offset injection",
      "100% inspection of critical safety dimensions at 30 parts per minute",
      "NIST-traceable quality verification logs replacing manual caliper paperwork",
    ],
    isDemonstrationBenchmark: true,
    demonstrationDisclaimer:
      "Representative metrology demonstration. NIST-traceable optical calibration grid applied prior to measurement series.",
    boundingOverlays: [
      {
        label: "Outer Diameter OD1",
        type: "dimension",
        status: "pass",
        x: 28,
        y: 35,
        width: 44,
        height: 22,
        metric: "12.003 mm (Nominal 12.000 ± 0.008)",
      },
      {
        label: "Bore Runout",
        type: "dimension",
        status: "pass",
        x: 32,
        y: 60,
        width: 36,
        height: 20,
        metric: "Runout: 3.2 µm (Limit: 5.0 µm)",
      },
    ],
  },
];
