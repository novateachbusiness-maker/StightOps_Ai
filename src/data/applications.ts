/**
 * Illustrative Applications & Technical Demonstration Data
 * Clearly designated as representative engineering demonstrations.
 */

export interface InspectionOverlay {
  type: "bounding-box" | "ocr-text" | "dimension" | "segmentation";
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width?: number; // percentage
  height?: number; // percentage
  label: string;
  status: "pass" | "fail" | "warning";
  measurementValue?: string;
  nominalValue?: string;
}

export interface ApplicationCase {
  id: string;
  title: string;
  category: "PCB & Electronics" | "Machined Metal" | "Packaging & Traceability" | "Precision Metrology";
  tag: string;
  objective: string;
  inspectionMethod: string;
  expectedOutput: string;
  knownLimitations: string;
  image: string;
  demonstrationNotes: string;
  overlays: InspectionOverlay[];
}

export const APPLICATIONS: ApplicationCase[] = [
  {
    id: "pcb-missing-smt-components",
    title: "Detecting Missing, Shifted, and Polarized SMT Components",
    category: "PCB & Electronics",
    tag: "Electronics AOI",
    objective:
      "Verify the 100% presence, exact alignment (within ±25µm), and polarity orientation of surface-mount components (0402 passives, SOIC-8, and QFN ICs) post pick-and-place.",
    inspectionMethod:
      "Telecentric optics with tiered tri-color RGB ring illumination. Golden pattern correlation with secondary deep learning classification filters out solder shine anomalies.",
    expectedOutput:
      "Coordinates of missing parts, offset values (dX, dY, dTheta), IPC-A-610 solder wet status, and reject signal to SMT line buffer conveyor.",
    knownLimitations:
      "Components placed tightly against tall electrolytic capacitors or tall inductor shields may suffer partial illumination shadowing.",
    image: "/src/assets/images/solution_aoi_system_1792999689778.jpg",
    demonstrationNotes:
      "Representative engineering demonstration based on IPC-A-610 standards. Final deployment repeatability depends on board warp fixturing and feeder accuracy.",
    overlays: [
      {
        type: "bounding-box",
        x: 34,
        y: 42,
        width: 18,
        height: 14,
        label: "IC_U4 (QFN-32): ALIGNED",
        status: "pass",
        measurementValue: "Offset: X+4µm, Y-2µm, Rot: 0.1°",
        nominalValue: "Max allowable offset: ±25µm",
      },
      {
        type: "bounding-box",
        x: 62,
        y: 38,
        width: 8,
        height: 6,
        label: "C14 (0402): TOMBSTONE DEFECT",
        status: "fail",
        measurementValue: "Fillet lift: 82µm",
        nominalValue: "Fillet coplanarity: < 15µm",
      },
      {
        type: "bounding-box",
        x: 22,
        y: 58,
        width: 10,
        height: 7,
        label: "R28 (0603): PASS",
        status: "pass",
        measurementValue: "Nominal 10kΩ Marking",
      },
    ],
  },
  {
    id: "metal-surface-scratch-porosity",
    title: "Detecting Surface Scratches & Casting Porosity on Machined Metal",
    category: "Machined Metal",
    tag: "Surface Defect Detection",
    objective:
      "Identify micro-scratches (> 0.2mm length, > 25µm depth) and gas porosity pits on CNC-milled automotive transmission sealing faces.",
    inspectionMethod:
      "Photometric stereo illumination utilizing four quadrant strobed LED bars to decouple 3D surface relief from cosmetic machining cutter swirl patterns.",
    expectedOutput:
      "Defect classification (scratch vs. pit vs. chatter), defect surface area in square millimeters, depth estimate, and pass/rework routing.",
    knownLimitations:
      "Heavy liquid coolant or mineral oil pooling on the part face masks true geometric defects unless washed or dried by an air knife before the inspection station.",
    image: "/src/assets/images/solution_surface_defect_1792999691227.jpg",
    demonstrationNotes:
      "Representative laboratory trial on automotive transmission flanges. Defect contrast relies on surface dryness and controlled part presentation.",
    overlays: [
      {
        type: "segmentation",
        x: 48,
        y: 52,
        width: 14,
        height: 12,
        label: "DEFECT: Scratch on Sealing Face",
        status: "fail",
        measurementValue: "Length: 1.42mm, Depth: ~38µm",
        nominalValue: "Max permissible scratch: 0.50mm",
      },
      {
        type: "segmentation",
        x: 65,
        y: 44,
        width: 9,
        height: 9,
        label: "Porosity Pit in Chamfer",
        status: "fail",
        measurementValue: "Diameter: 0.35mm",
        nominalValue: "Max permissible pit: 0.20mm",
      },
    ],
  },
  {
    id: "pharma-vial-ocr-datamatrix",
    title: "Reading Direct-Part-Marked Serial Numbers & 2D DataMatrix on Packaging",
    category: "Packaging & Traceability",
    tag: "OCR & Barcode",
    objective:
      "Read laser-etched and inkjet-printed 2D DataMatrix ECC 200 codes and alphanumeric batch/expiry text on pharmaceutical packaging at 450 units/minute.",
    inspectionMethod:
      "High-intensity polarized coaxial strobe lighting with deep neural network OCR tuned for dot-matrix fonts and low-contrast glossy substrates.",
    expectedOutput:
      "Decoded GS1 string, ISO/IEC 15415 print quality verification metrics (symbol contrast, modulation), and real-time mismatch alarm against MES database.",
    knownLimitations:
      "Codes physically abraded or smudged past the Reed-Solomon error correction threshold (typically > 25% damaged modules) cannot be recovered.",
    image: "/src/assets/images/solution_ocr_barcode_1792999690125.jpg",
    demonstrationNotes:
      "Representative pharmaceutical packaging demonstration. Complies with GS1 serialization architecture and 21 CFR Part 11 audit logging frameworks.",
    overlays: [
      {
        type: "ocr-text",
        x: 42,
        y: 62,
        width: 28,
        height: 16,
        label: "2D DataMatrix: GRADE A (4.0)",
        status: "pass",
        measurementValue: "SN: 1048 5739 9214 0678",
        nominalValue: "GS1 Verified & Match DB",
      },
      {
        type: "ocr-text",
        x: 42,
        y: 80,
        width: 28,
        height: 10,
        label: "LOT/EXP OCV: MATCH",
        status: "pass",
        measurementValue: "LOT: ABC1230 / EXP: 10/2026",
      },
    ],
  },
  {
    id: "telecentric-precision-shaft-measurement",
    title: "High-Accuracy Dimensional Metrology for Precision Turned Shafts",
    category: "Precision Metrology",
    tag: "Dimensional Inspection",
    objective:
      "Measure outer diameters, step lengths, concentricity, and thread pitch on precision stainless steel shafts with repeatabilities within ±2.5µm.",
    inspectionMethod:
      "Collimated blue telecentric backlight paired with bi-telecentric lens and sub-pixel edge polynomial regression fitting.",
    expectedOutput:
      "Continuous SPC measurements for outer diameters (OD1, OD2), runout, length, and automated feedback offset values to CNC lathe.",
    knownLimitations:
      "Part thermal expansion (e.g. freshly machined hot parts > 45°C) requires mathematical temperature compensation to yield accurate 20°C standard dimensions.",
    image: "/src/assets/images/case_study_pcb_1792999691900.jpg",
    demonstrationNotes:
      "Representative metrology demonstration. NIST-traceable optical calibration grid applied prior to measurement series.",
    overlays: [
      {
        type: "dimension",
        x: 28,
        y: 35,
        width: 44,
        height: 22,
        label: "Outer Diameter OD1",
        status: "pass",
        measurementValue: "12.003 mm",
        nominalValue: "12.000 ± 0.008 mm",
      },
      {
        type: "dimension",
        x: 32,
        y: 60,
        width: 36,
        height: 20,
        label: "Concentricity Runout",
        status: "pass",
        measurementValue: "3.2 µm",
        nominalValue: "Max runout: 5.0 µm",
      },
    ],
  },
  {
    id: "component-assembly-verification",
    title: "Multi-Part Assembly & Clip Presence Verification",
    category: "Machined Metal",
    tag: "Assembly Verification",
    objective:
      "Verify that all rubber O-rings, circlips, and fasteners are seated properly inside complex sub-assemblies before shipping to final powertrain integration.",
    inspectionMethod:
      "Multi-camera synchronous triggering with color segmentation and geometric pattern matching under diffuse dome illumination.",
    expectedOutput:
      "Binary present/absent confirmation for each sub-component, seating depth check, and interlocking assembly lock signal.",
    knownLimitations:
      "Components recessed deep inside dark blind bores require fiber-optic spot lighting to prevent shadowed blind spots.",
    image: "/src/assets/images/hero_pcb_inspection_1792999689695.jpg",
    demonstrationNotes:
      "Representative automotive subassembly check. Hardware interlocking prevents uninspected components from indexing downstream.",
    overlays: [
      {
        type: "bounding-box",
        x: 30,
        y: 40,
        width: 16,
        height: 16,
        label: "O-Ring Seating: VERIFIED",
        status: "pass",
        measurementValue: "Seated Depth: 2.1mm",
        nominalValue: "2.0 - 2.3mm",
      },
      {
        type: "bounding-box",
        x: 55,
        y: 45,
        width: 14,
        height: 14,
        label: "Retaining Clip: PRESENT",
        status: "pass",
        measurementValue: "Engagement Angle: 0°",
      },
    ],
  },
  {
    id: "packaging-fill-cap-inspection",
    title: "Container Fill Level, Cap Skew & Tamper Band Inspection",
    category: "Packaging & Traceability",
    tag: "Packaging Inspection",
    objective:
      "Inspect bottle cap height, tilt angle, tamper-evident security bridge integrity, and liquid fill level on high-speed bottling lines (900 bottles/minute).",
    inspectionMethod:
      "Backlit silhouette profile imaging combined with synchronized high-speed strobe illumination to eliminate fluid meniscus agitation motion blur.",
    expectedOutput:
      "Fill height in millimeters, cap skew angle in degrees, tamper ring intactness, and trigger to high-speed pneumatic reject finger.",
    knownLimitations:
      "Foaming liquids require IR wavelength transmission illumination or specialized sensor gating to inspect through foam.",
    image: "/src/assets/images/solution_ocr_barcode_1792999690125.jpg",
    demonstrationNotes:
      "Representative bottling line quality control setup. High-speed strobes prevent motion blur at linear speeds exceeding 2.5 m/s.",
    overlays: [
      {
        type: "dimension",
        x: 40,
        y: 25,
        width: 20,
        height: 15,
        label: "Cap Tilt Angle",
        status: "pass",
        measurementValue: "0.4° Skew",
        nominalValue: "Max allowable: 1.5°",
      },
      {
        type: "dimension",
        x: 35,
        y: 50,
        width: 30,
        height: 18,
        label: "Liquid Fill Height",
        status: "pass",
        measurementValue: "Fill: 142.2 mm",
        nominalValue: "140.0 - 145.0 mm",
      },
    ],
  },
];
