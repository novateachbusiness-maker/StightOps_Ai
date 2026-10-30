/**
 * Technical Knowledge Centre & Educational Resources Data
 * Rigorous, factual engineering guides written without marketing fluff or fabricated citations.
 */

export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  category: "Machine Vision Fundamentals" | "AI-Based Inspection" | "PCB Inspection" | "OCR & Barcode" | "Optics & Lighting" | "QA & Automation";
  readingTime: string;
  datePublished: string;
  summary: string;
  author: string;
  image: string;
  content: string;
  faqs?: { question: string; answer: string }[];
  tags: string[];
}

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    id: "rule-based-vs-deep-learning",
    slug: "rule-based-vs-deep-learning-machine-vision",
    title: "Rule-Based vs. AI-Based Machine Vision: When to Use Which",
    category: "AI-Based Inspection",
    readingTime: "6 min read",
    datePublished: "2026-03-15",
    author: "SightOpsAi Vision Engineering",
    image: "/assets/resources/ai-inspection.jpg",
    summary:
      "A technical comparison of classical algorithmic vision (edge detection, blob analysis, template matching) versus convolutional and transformer neural networks in manufacturing environments.",
    tags: ["Machine Vision", "Deep Learning", "Edge AI", "OpenCV", "Algorithms"],
    content: `
### Executive Summary

In contemporary industrial automation discussions, deep learning is often presented as a blanket replacement for all machine vision tasks. In production reality, each approach has distinct physical and mathematical strengths. Selecting the wrong paradigm leads to ballooning compute costs, excessive training requirements, or unacceptably fragile deployments.

### Classical Rule-Based Vision: Precision & Determinism

Traditional image processing operates on mathematical transforms applied directly to pixel matrices:
- **Gradient edge detection**: Sobel, Prewitt, and Canny filters locate boundaries where pixel brightness changes rapidly.
- **Morphology & Blob analysis**: Thresholding, erosion, and dilation segment discrete contiguous objects for count, centroid, and area verification.
- **Normalized Cross-Correlation (NCC)**: Compares template pixel intensities with search regions to find known geometric contours.

**When Rule-Based Wins:**
1. **Dimensional Metrology**: Sub-pixel edge interpolation allows measuring diameters, lengths, and angles down to fractions of a micron. Deep learning cannot match the sub-pixel precision of telecentric edge fitting.
2. **Deterministic Execution**: Classical filters run in 2 to 10 milliseconds on standard low-power x86 or ARM CPUs without requiring dedicated GPUs.
3. **Zero Dataset Requirement**: A rule-based tool is programmed with geometric rules; it does not require collecting hundreds of defect images before line startup.

### AI & Deep Learning: Handling Natural Variability

Deep neural networks (Convolutional Neural Networks and Vision Transformers) learn hierarchical visual representations directly from data:
- Low-level layers capture edges and local contrast.
- Mid-level layers synthesize texture patterns and curves.
- High-level layers represent semantic object geometry and anomaly patterns.

**When AI Wins:**
1. **Cosmetic Surface Inspection**: Scratches on brushed metal, pits in sand-cast iron, weave anomalies in carbon fiber, or stains on textiles. These defects do not possess fixed geometric contours.
2. **Ambiguous Lighting Conditions**: When parts have slight natural reflectivity variations or micro-textures that cause classical thresholding to generate false alarms.
3. **Complex Classification**: Distinguishing between an acceptable cosmetic water mark versus a functional crack.

### Hybrid Architectures: The Best Industrial Practice

The most reliable industrial vision stations combine both paradigms:
1. **Stage 1 (Classical)**: Geometric pattern matching aligns the coordinate frame and isolates regions of interest (ROI) in 4 milliseconds.
2. **Stage 2 (Classical)**: Calibrated sub-pixel tools measure critical dimensions and GD&T tolerances.
3. **Stage 3 (Deep Learning)**: The isolated surface patch is fed to a lightweight TensorRT-quantized neural network that classifies surface anomalies in 20 milliseconds.
4. **Stage 4 (Deterministic I/O)**: The unified Pass/Fail outcome triggers the PLC reject mechanism.
    `,
    faqs: [
      {
        question: "Can deep learning be used for dimensional measurements?",
        answer: "While keypoint detection networks can estimate object corners, neural networks introduce slight spatial stochasticity. For precise dimensional verification with sub-micron tolerances, telecentric optics and sub-pixel edge detection algorithms remain the industry standard."
      },
      {
        question: "What GPU is required for industrial AI inference?",
        answer: "For standard line speeds (20–60 parts per minute), compact embedded modules such as NVIDIA Jetson Orin Nano or Orin NX deliver 15ms–40ms inference latency at low thermal dissipation. High-speed lines (600+ ppm) utilize industrial IPCs with dedicated PCIe RTX accelerators."
      }
    ]
  },
  {
    id: "industrial-lighting-selection-guide",
    slug: "industrial-lighting-techniques-for-machine-vision",
    title: "Industrial Lighting Techniques: Wavelengths, Geometries & Glare Suppression",
    category: "Optics & Lighting",
    readingTime: "7 min read",
    datePublished: "2026-02-28",
    author: "SightOpsAi Optical Lab",
    image: "/assets/resources/optics-lighting.jpg",
    summary:
      "Why lighting represents 80% of vision system success. An engineering breakdown of darkfield, brightfield, coaxial, dome, and polarized illumination geometries.",
    tags: ["Optics", "Lighting", "Machine Vision", "Telecentric", "Polarization"],
    content: `
### The Cardinal Rule of Machine Vision

"You cannot inspect what the camera cannot optically distinguish."

Software algorithms, whether classical or deep learning, operate strictly on the pixel contrast created by the optical interaction between the light source, the part material, and the camera lens.

### 1. Brightfield vs. Darkfield Illumination

- **Brightfield Lighting**: Light strikes the object at a high angle (typically $> 45°$) relative to the surface plane. Specular (mirror-like) surfaces reflect light directly into the lens, making flat surfaces appear bright and surface indentations or scratches appear dark.
- **Darkfield Lighting**: Light strikes the object at a grazing low angle (typically $10°$ to $25°$). On a flat specular surface, light reflects away from the lens into dark space. Only surface disruptions—such as scratches, laser markings, edges, or burrs—scatter photons upward into the camera aperture, appearing as brilliant bright features against an inky black background.

### 2. Coaxial Illumination for Specular Metals & Silicon

Polished semiconductor wafers, mirror-finished metal pins, and glass substrates act as mirrors. Standard ring lights create a bright circular glare hotspot that blinds the sensor.

**The Coaxial Solution:**
A beam splitter is positioned at a 45-degree angle inside the optical path. Light is projected from the side, reflects down parallel to the optical axis, strikes the reflective part perpendicularly, and returns through the beam splitter to the camera. Any flat specular area appears brightly and uniformly illuminated; any non-flat defect (dent, pit, scratch) scatters light and appears black with stark contrast.

### 3. Diffuse Dome Lighting for Curved & Textured Objects

Cylindrical metal cans, machined gears, and blister pack foils have multiple reflective angles that create blinding specular hotspots under point-source lighting.

**The Dome Solution:**
A hollow hemispherical dome coated with diffuse barium sulfate reflects LED light indirectly onto the part from all 360 degrees. This provides shadow-free, omnidirectional illumination that reveals printed text and cosmetic stains without blinding glare.

### 4. Polarized Lighting to Eliminate Packaging Glare

Clear cellophane wrappers, plastic bottles, and shiny printed labels cause intense specular reflections that obscure 1D/2D barcodes.

**Cross-Polarization:**
1. A linear polarizer is mounted across the LED light source, polarizing emitted photons in one plane.
2. A second polarizing filter (analyzer) is mounted on the camera lens, oriented at 90 degrees (cross-polarized) to the light polarizer.
3. Glare reflections preserve the polarization angle and are completely extinguished by the camera filter. Only diffuse light that has scattered within the material's bulk structure passes through, revealing the label underneath with zero glare.
    `,
    faqs: [
      {
        question: "Why use blue light (470nm) instead of white light for precision measurement?",
        answer: "Shorter wavelengths of light experience less diffraction at aperture edges (Rayleigh criterion), producing sharper, crisper edge transitions. Combining blue collimated LED backlights with blue bandpass optical filters also blocks ambient overhead fluorescent factory lighting."
      }
    ]
  },
  {
    id: "pcb-solder-joint-inspection-principles",
    slug: "pcb-solder-joint-aoi-principles",
    title: "Principles of Automated Optical Inspection for High-Density SMT Soldering",
    category: "PCB Inspection",
    readingTime: "5 min read",
    datePublished: "2026-01-20",
    author: "SightOpsAi Electronics Division",
    image: "/assets/resources/pcb-inspection.jpg",
    summary:
      "How multi-tier RGB lighting and shape-from-shading verify solder fillet coplanarity, solder bridges, and wetting angles according to IPC-A-610 Class 3 standards.",
    tags: ["PCB", "SMT", "AOI", "IPC-A-610", "Soldering"],
    content: `
### SMT Soldering Challenges in Modern Assemblies

As electronic designs miniaturize to 0201 passives, 0.4mm pitch QFP leads, and ball grid arrays (BGA), inspecting solder quality becomes mathematically demanding. A cold joint, insufficient wetting, or microscopic solder ball can lead to intermittent failure during thermal cycling in automotive or aerospace service.

### Multi-Tier RGB "Shape-From-Shading" Optics

Good solder joints form a concave meniscus (fillet) with a wetting contact angle $< 30°$. Flat solder surfaces, excessive solder balls, and dewetting produce distinct surface slope angles.

Modern AOI machines utilize a tiered RGB ring light:
- **Red LED ring (Top, 60°–80° angle)**: Illuminates flat horizontal surfaces (such as component tops and board pads).
- **Green LED ring (Mid, 30°–45° angle)**: Illuminates the concave meniscus of correctly wetted solder fillets.
- **Blue LED ring (Low, 10°–25° angle)**: Illuminates vertical component leads and excessive solder bulging.

When imaged by a top-down camera:
- A perfectly wetted fillet reflects green photons back to the lens.
- An over-soldered convex joint reflects blue photons.
- An unwetted or flat pad reflects red photons.

This transforms complex 3D physical curvature into unambiguous 2D color bands, allowing high-speed deterministic verification of solder quality in milliseconds per component.
    `
  },
  {
    id: "direct-part-marking-dpm-reading",
    slug: "direct-part-marking-dpm-traceability-guide",
    title: "Direct Part Mark (DPM) Traceability: Dot-Peen & Laser Marking Decoding",
    category: "OCR & Barcode",
    readingTime: "6 min read",
    datePublished: "2025-12-10",
    author: "SightOpsAi Traceability Systems",
    image: "/assets/resources/ocr-barcode-dpm.jpg",
    summary:
      "Techniques for decoding low-contrast 2D DataMatrix codes etched directly onto cast iron, aluminum, and surgical instruments.",
    tags: ["DPM", "DataMatrix", "Traceability", "Laser Etch", "Dot-Peen"],
    content: `
### The Industrial Necessity of DPM

Adhesive paper labels cannot survive high-temperature engine bays, ultrasonic chemical washes, or lifetime autoclaving of surgical tools. Direct Part Marking (DPM) marks serial codes directly into the parent metal via fiber lasers, dot-peen indenters, or electrochemical etching.

### Optical Reading Challenges

1. **Low Intrinsic Contrast**: The dot indentation is composed of the same material and color as the surrounding metal background.
2. **Surface Texture Interference**: Cast iron and sand-blasted metals feature random micro-pits that mimic dot-peen dimples.
3. **Specular Reflections**: Freshly machined automotive aluminum reflects blinding light into the lens, blowing out the camera sensor.

### Optical Setup & Decoding Pipeline

- **Multi-directional Darkfield Illumination**: Lighting the code sequentially from North, South, East, and West casts distinct directional shadows inside the indentations.
- **Morphological Dot Reconstruction**: Specialized image filters join discrete dot-peen craters into continuous virtual modules of the DataMatrix grid.
- **Reed-Solomon ECC 200 Error Correction**: Even if up to 25% of the code modules are physically damaged by wear, the mathematical polynomial reconstructs the serial payload accurately.
    `
  },
  {
    id: "spc-and-closed-loop-quality",
    slug: "spc-closed-loop-vision-automation",
    title: "Statistical Process Control (SPC) and Closed-Loop Vision Integration",
    category: "QA & Automation",
    readingTime: "5 min read",
    datePublished: "2025-11-05",
    author: "SightOpsAi Automation Team",
    image: "/assets/resources/spc-automation.jpg",
    summary:
      "Transforming vision inspection from an end-of-line reject gate into an active feedback loop that prevents scrap before it occurs.",
    tags: ["SPC", "Industry 4.0", "Closed Loop", "Quality Control", "MES"],
    content: `
### Beyond Go / No-Go Sorting

Many manufacturing lines deploy vision systems as passive reject mechanisms: a defective part is identified and blown into a scrap bin. While this prevents non-conforming items from reaching the customer, the material, machine cycle time, and labor spent manufacturing the bad part are permanently lost.

### Closed-Loop CNC Feedback

When a vision station is equipped with sub-pixel telecentric metrology, it continuously records dimensional trends across consecutive parts:
1. **Tool Wear Detection**: As a turning tool blade gradually wears down, the outer diameter of machined shafts drifts upward by 1 to 2 microns per 50 parts.
2. **Automated Offset Injection**: Before the dimension breaches the upper tolerance limit, the vision IPC calculates the linear drift rate and transmits an offset compensation command directly to the CNC machine's Fanuc or Siemens controller via Ethernet.
3. **Scrap Prevention**: The CNC automatically adjusts its tool coordinate, maintaining the process capability index ($C_{pk} > 1.67$) with zero operator intervention and zero scrap generation.
    `
  }
];
