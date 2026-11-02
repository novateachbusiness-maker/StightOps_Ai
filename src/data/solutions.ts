/**
 * Solutions Catalog Data
 * Technically rigorous data covering problems, optical approaches, inputs/outputs, and limitations.
 */

export interface Solution {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  summary: string;
  image: string;
  industrialProblem: string;
  inspectionApproach: string;
  typicalInputs: string[];
  typicalOutputs: string[];
  technologiesUsed: string[];
  suitableApplications: string[];
  limitations: string[];
  faqs: { question: string; answer: string }[];
}

export const SOLUTIONS: Solution[] = [
  {
    id: "ai-visual-inspection",
    slug: "ai-visual-inspection",
    title: "AI-Based Visual Inspection Systems",
    category: "Intelligent Machine Vision",
    tagline: "Deep learning models for complex defect detection on variable and textured surfaces.",
    summary:
      "When surface texture, natural reflectivity, or manufacturing tolerance variations defeat rigid rule-based vision algorithms, our deep learning inspection models classify subtle anomalies with high repeatability.",
    image: "/src/assets/images/hero_pcb_inspection_1792999689695.jpg",
    industrialProblem:
      "Conventional thresholding and edge-detection tools struggle with organic part variances, cast surface textures, shifting ambient reflections, and complex aesthetic criteria. Manual human inspection causes fatigue, subjective variance, and bottlenecks on high-speed lines.",
    inspectionApproach:
      "Combines custom CNN/Transformer segmentation models deployed onto industrial edge GPUs (such as NVIDIA Jetson or industrial IPCs) with telecentric or diffuse structured lighting to isolate micro-defects at line speeds without false rejections.",
    typicalInputs: [
      "High-resolution monochrome or RGB area-scan images (5MP to 24MP)",
      "Triggered line-scan frames for continuous web inspection",
      "Encoder pulse synchronization signals from factory conveyors",
    ],
    typicalOutputs: [
      "Defect classification with pixel-level segmentation mask",
      "Confidence scores for each detected defect class",
      "PLC digital I/O trigger (Pass / Fail / Divert to rework lane)",
      "Structured inspection record exported to factory MES via OPC-UA / MQTT",
    ],
    technologiesUsed: [
      "PyTorch / TensorRT Edge Inference",
      "Semantic Segmentation & Anomaly Detection Networks",
      "Diffuse Dome & Coaxial LED Illuminators",
      "GigE Vision / USB3 Vision Industrial Cameras",
      "OPC-UA and Industrial Ethernet Protocols",
    ],
    suitableApplications: [
      "Automotive machined castings and cylinder wall porosity checks",
      "Stamping scratch, burr, and dent inspection",
      "Textile, composite, and carbon fiber weave flaw detection",
      "Injection molded plastic cosmetic surface quality checks",
    ],
    limitations: [
      "AI inspection models require representative training samples (both defect-free golden samples and cataloged true defects) for supervised validation.",
      "Inspection speed is constrained by GPU inference latency and image acquisition transfer rates (typically 15ms–80ms per frame).",
      "Severe shifts in ambient lighting or optical alignment require retraining or recalibration.",
    ],
    faqs: [
      {
        question: "When should we choose AI inspection over traditional rule-based algorithms?",
        answer:
          "AI vision is recommended when the defect features variable shapes (scratches, stains, dents, cracks) or when background textures have natural variation (cast iron, fabric, brushed metal). Rule-based inspection remains superior for precise dimensional measurements and high-contrast barcode decoding.",
      },
      {
        question: "Can the system be trained on few defect samples?",
        answer:
          "Yes. We employ unsupervised anomaly detection and few-shot classification techniques that model normal golden parts and flag statistical deviations, drastically reducing the initial defect sample requirement.",
      },
      {
        question: "How does the system integrate with existing plant PLCs?",
        answer:
          "We interface via standard 24V discrete optoisolated I/O for real-time reject kicker activation, and EtherNet/IP, PROFINET, or OPC-UA for bidirectional telemetry with Siemens, Allen-Bradley, and Omron controllers.",
      },
    ],
  },
  {
    id: "pcb-aoi",
    slug: "pcb-aoi",
    title: "PCB Automated Optical Inspection (AOI)",
    category: "Electronics Manufacturing",
    tagline: "High-speed SMT assembly verification, solder fillet validation, and component integrity checks.",
    summary:
      "High-resolution optical inspection tailored for high-density surface mount assemblies (SMT) and through-hole components to prevent rework and field escapes.",
    image: "/assets/electronics/solution_aoi_system_1792999689778.jpg",
    industrialProblem:
      "Modern electronics incorporate sub-millimeter components (01005 passives, micro-BGAs, QFNs) that cannot be reliably verified with manual microscopes. Solder bridges, tombstoning, polarities, and component offsets cause critical failures if not caught pre-reflow or post-reflow.",
    inspectionApproach:
      "Utilizes multi-tier RGB LED ring illumination (highlighting solder fillet curvature via color reflection angles) paired with ultra-low distortion telecentric lenses and CAD-driven coordinate programming.",
    typicalInputs: [
      "Gerber files / CAD centroid pick-and-place coordinate data",
      "High-resolution 20MP+ global shutter area scan imagery",
      "Board fiducial alignment marks",
    ],
    typicalOutputs: [
      "Board-level Pass/Fail summary with component-level drilldown",
      "Offset measurement in microns (X, Y, and rotation theta)",
      "Soldering status: Bridge, insufficient solder, void, tombstone",
      "IPC-A-610 compliance diagnostic report",
    ],
    technologiesUsed: [
      "Multi-angle RGB tiered ring lighting (shape-from-shading)",
      "Telecentric imaging optics with minimal optical distortion",
      "Sub-pixel geometric pattern matching & AI solder analysis",
      "SMEMA hardware interface for in-line conveyor control",
    ],
    suitableApplications: [
      "Pre-reflow paste inspection and component placement verification",
      "Post-reflow SMT inspection (solder bridging, voids, lifted leads)",
      "Through-hole technology (THT) wave solder joint inspection",
      "Conformal coating coverage inspection under UV illumination",
    ],
    limitations: [
      "Shadowing from tall adjacent components (e.g., electrolytic capacitors) requires careful multi-angle lighting design.",
      "Hidden solder joints beneath BGA packages require Automated X-ray Inspection (AXI) rather than optical vision alone.",
    ],
    faqs: [
      {
        question: "Does the system support imported CAD and pick-and-place files?",
        answer:
          "Yes. Our AOI software imports standard ODB++, IPC-2581, or CSV centroid files to automatically generate component bounding boxes and expected orientations.",
      },
      {
        question: "What is the typical false call rate?",
        answer:
          "By combining geometric pattern matching with secondary AI classification filters, false calls are minimized to operational benchmarks, avoiding operator review fatigue.",
      },
    ],
  },
  {
    id: "ocr-barcode-inspection",
    slug: "ocr-barcode-inspection",
    title: "OCR and Barcode Inspection Systems",
    category: "Traceability & Identification",
    tagline: "High-speed decoding and optical character verification for serialized manufacturing.",
    summary:
      "Industrial-grade 1D, 2D DataMatrix, QR, and alphanumeric Optical Character Recognition (OCR/OCV) ensuring 100% legibility and traceability across challenging substrates.",
    image: "/src/assets/images/solution_ocr_barcode_1792999690125.jpg",
    industrialProblem:
      "Laser-etched, dot-peened, inkjet-printed, or embossed codes on curved, specular, or low-contrast packaging frequently degrade during production, causing downstream supply chain rejections and regulatory non-compliance.",
    inspectionApproach:
      "Employs polarization filtering, high-intensity coaxial strobing, and transformer-based OCR algorithms trained on industrial dot-peen and dot-matrix fonts to read and verify characters against database records at line speeds exceeding 600 parts per minute.",
    typicalInputs: [
      "Strobed images of direct-part-marked (DPM) metals, labels, or plastics",
      "Expected serial ranges or GS1 database validation lists",
      "Proximity sensor or encoder hardware triggers",
    ],
    typicalOutputs: [
      "Decoded alphanumeric string and 2D code payload",
      "ISO/IEC 15415 & 15416 print quality verification grades (A through F)",
      "Optical Character Verification (OCV) match status against batch record",
      "Reject signal for unreadable or malformed lot codes",
    ],
    technologiesUsed: [
      "Coaxial and polarized directional illumination",
      "Deep learning OCR with font-independent character segmentation",
      "Direct Part Mark (DPM) reconstruction filters",
      "Database validation via REST API, SQL, or industrial fieldbus",
    ],
    suitableApplications: [
      "Pharmaceutical blister pack batch/expiry date verification (21 CFR Part 11)",
      "Automotive VIN etching and powertrain component DPM tracking",
      "FMCG packaging barcode readability grading",
      "Electronics PCB micro-QR tracking (down to 1.5mm code size)",
    ],
    limitations: [
      "Severe mechanical surface destruction that physically erodes the dot-peen indentations or barcode bars cannot be reconstituted.",
      "Requires controlled distance and angle to avoid extreme perspective distortion.",
    ],
    faqs: [
      {
        question: "Can this system read dot-peen marks on raw cast iron?",
        answer:
          "Yes. We utilize specialized multi-directional low-angle darkfield lighting that creates high-contrast shadows inside the indentations, paired with specialized DPM decoding algorithms.",
      },
      {
        question: "Does it grade barcode quality according to ISO standards?",
        answer:
          "Yes, the system measures symbol contrast, modulation, axial non-uniformity, and unused error correction, assigning ISO/IEC grades A through F.",
      },
    ],
  },
  {
    id: "surface-defect-detection",
    slug: "surface-defect-detection",
    title: "Surface Defect Detection & Classification",
    category: "Quality Assurance",
    tagline: "Automated identification of scratches, pores, tool chatter, and cosmetic flaws on precision surfaces.",
    summary:
      "Real-time optical scanning of machined metals, stamped foils, glass, and injection moldings to detect microscopic flaws before assembly.",
    image: "/src/assets/images/solution_surface_defect_1792999691227.jpg",
    industrialProblem:
      "Subtle tool marks, grinding chatter, porosity pits, and handling scratches on precision components (such as engine bearings, medical implants, and optical elements) lead to structural failure or aesthetic rejection, yet are tedious and inconsistent for manual inspectors.",
    inspectionApproach:
      "Combines photometric stereo or line-scan imaging with multi-directional lighting to separate 3D geometric surface topography from 2D cosmetic reflectivity.",
    typicalInputs: [
      "Multi-angle photometric strobe captures (4-directional illumination)",
      "High-speed line-scan camera encoder lines",
      "Calibrated background intensity baselines",
    ],
    typicalOutputs: [
      "Topographical depth gradient map separating dents from oil smudges",
      "Defect location coordinates, length, width, and surface area",
      "Classification into pits, burrs, scratches, or cosmetic discoloration",
      "Part grading into Pass, Rework, or Scrap",
    ],
    technologiesUsed: [
      "Photometric Stereo 3D Surface Reconstruction",
      "High-Resolution Line-Scan Sensors (up to 16k resolution)",
      "Deep Neural Network Defect Segmentors",
      "Real-time FPGA image preprocessing",
    ],
    suitableApplications: [
      "Automotive machined gear faces and brake disc surfaces",
      "Polished semiconductor silicon wafers and solar cells",
      "Rolled sheet metal, aluminum coils, and copper foils",
      "Consumer electronics display glass and anodized aluminum casings",
    ],
    limitations: [
      "Liquid films (e.g., cutting fluid, oil pooling) on the surface can mask true defects or create false optical artifacts unless parts are pre-blown or washed.",
    ],
    faqs: [
      {
        question: "How do you distinguish harmless oil stains from true scratches?",
        answer:
          "Using photometric stereo or polarized illumination, we separate surface slope and depth changes from pure chromatic reflections. Scratches possess 3D physical depth, while oil stains remain flat.",
      },
    ],
  },
  {
    id: "dimensional-measurement",
    slug: "dimensional-measurement",
    title: "Dimensional Inspection & Metrology",
    category: "Precision Engineering",
    tagline: "Sub-pixel telecentric measurement for critical tolerances and geometric verification.",
    summary:
      "Non-contact optical dimensioning verifying diameters, concentricity, thread pitches, pitch-circle diameters (PCD), and GD&T features at production rates.",
    image: "/src/assets/images/case_study_pcb_1792999691900.jpg",
    industrialProblem:
      "Manual vernier calipers, micrometers, and slow coordinate measuring machines (CMMs) sample only 1 in 100 parts, allowing batches of out-of-spec parts to pass undetected when cutting tools wear out.",
    inspectionApproach:
      "Employs bi-telecentric lenses with zero perspective distortion, parallel collimated backlight illumination, and sub-pixel edge detection algorithms with optical calibration grids.",
    typicalInputs: [
      "High-contrast silhouette images via green or blue collimated telecentric backlights",
      "Optical calibration parameters (NIST-traceable dot target)",
      "Geometric Dimensioning and Tolerancing (GD&T) tolerance bounds",
    ],
    typicalOutputs: [
      "Micro-millimeter dimensional measurements (OD, ID, length, angles)",
      "Geometric tolerance validation (runout, roundness, perpendicularity)",
      "Statistical Process Control (SPC) trending charts (Cp, Cpk)",
      "Automatic tool-wear offset compensation signals to CNC machines",
    ],
    technologiesUsed: [
      "Bi-Telecentric Optics with zero perspective magnification change",
      "Sub-pixel edge detection (Canny, Sobel, and polynomial curve fitting)",
      "Collimated LED telecentric backlights",
      "SPC analytical engines with automated drift alerts",
    ],
    suitableApplications: [
      "Turned pins, shafts, fasteners, and medical needles",
      "Extruded rubber profiles and metal tube outer dimensions",
      "Precision stamped lead frames and connector terminals",
      "Laser cut and CNC milled brackets",
    ],
    limitations: [
      "Measurement volume is strictly defined by the telecentric lens front optical diameter.",
      "Thermal expansion of parts during warm machining must be accounted for with temperature compensation sensors.",
    ],
    faqs: [
      {
        question: "What is the typical measurement repeatability?",
        answer:
          "Under controlled thermal conditions with bi-telecentric optics and collimated backlighting, our systems achieve sub-pixel repeatabilities down to ±1 to ±3 microns depending on field of view.",
      },
    ],
  },
  {
    id: "custom-machine-vision",
    slug: "custom-machine-vision",
    title: "Custom Machine Vision Automation",
    category: "System Integration",
    tagline: "Turnkey bespoke vision stations engineered for unique factory footprints and automation requirements.",
    summary:
      "Full-cycle engineering from optical feasibility studies and mechanical mounting fixtures to PLC programming, safety enclosures, and ERP integration.",
    image: "/assets/electronics/solution_aoi_system_1792999689778.jpg",
    industrialProblem:
      "Off-the-shelf smart cameras often fail in non-standard plant environments with tight physical space constraints, vibration, oil mist, high temperatures, or unique multi-camera inspection angles.",
    inspectionApproach:
      "We design custom mechanical brackets, IP67 camera enclosures, custom strobed lighting arrays, and tailored software pipelines tailored exactly to your cycle time and assembly line footprint.",
    typicalInputs: [
      "Factory physical CAD models & conveyor parameters",
      "Cycle time and tactile indexing specifications",
      "Target part variety and changeover frequency",
    ],
    typicalOutputs: [
      "Validated turnkey inspection station ready for line installation",
      "Integrated operator HMI touchscreen with recipe management",
      "Full electrical schematics and CE/UL safety documentation",
      "Operator training, validation reports, and warranty support",
    ],
    technologiesUsed: [
      "Multi-camera synchronous triggering systems",
      "Industrial PCs with shock/vibration isolation",
      "Custom pneumatic reject systems and blow-off diverters",
      "OPC-UA, PROFINET, Modbus TCP, EtherNet/IP communications",
    ],
    suitableApplications: [
      "High-speed bottling and packaging lines (1,200 bottles/min)",
      "Robotic pick-and-place guided vision inspection",
      "Battery cell electrode and pouch assembly lines",
      "Multi-station rotary indexing tables",
    ],
    limitations: [
      "Custom engineered systems require an initial feasibility study and part sample collection phase before final design freeze.",
    ],
    faqs: [
      {
        question: "How does the feasibility assessment work?",
        answer:
          "Customers ship representative good and defective samples to our Bengaluru optics lab. We perform optical evaluations, test lenses and illumination geometries, and deliver a detailed feasibility report with sample images and cycle time estimates.",
      },
    ],
  },
];
