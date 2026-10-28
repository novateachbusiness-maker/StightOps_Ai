/**
 * Technology Architecture Data
 * Detailed engineering breakdown of optics, rule-based algorithms, deep learning, edge hardware, and PLC interfaces.
 */

export interface TechnologyItem {
  id: string;
  title: string;
  category: "Optics & Sensing" | "Algorithm & AI" | "Industrial Computing" | "Factory Integration";
  overview: string;
  whenToUse: string;
  whenSimplerMethodSuffices: string;
  keySpecifications: string[];
  tradeOffs: string;
}

export const TECHNOLOGIES: TechnologyItem[] = [
  {
    id: "industrial-optics-lighting",
    title: "Industrial Optics, Lighting & Calibration",
    category: "Optics & Sensing",
    overview:
      "The physical foundation of any machine vision system. High-quality illumination (coaxial, dome, darkfield, low-angle, telecentric) and low-distortion lenses isolate target features before pixel data ever reaches software.",
    whenToUse:
      "Every single vision inspection system requires intentional lighting and lens matching. Poor lighting cannot be resolved by software or AI.",
    whenSimplerMethodSuffices:
      "Standard C-mount fixed focal length lenses with basic LED bar lights are adequate for general orientation checks or high-contrast label presences.",
    keySpecifications: [
      "Bi-telecentric lenses (< 0.05% optical distortion)",
      "Coaxial, polarized, darkfield, and diffuse dome LED illuminators",
      "Wavelength-matched narrow-band pass optical filters (e.g., 470nm Blue, 630nm Red, 850nm IR)",
      "NIST-traceable dot-grid distortion and pixel-to-millimeter calibration plates",
    ],
    tradeOffs:
      "Telecentric lenses provide flawless zero-perspective measurement but have fixed working distances and front element sizes matching the part field of view.",
  },
  {
    id: "rule-based-vision",
    title: "Rule-Based Vision & Classical Image Processing",
    category: "Algorithm & AI",
    overview:
      "Deterministic algorithms including edge detection (Sobel, Canny), morphological transformations, blob analysis, geometric template matching, and Fourier transforms.",
    whenToUse:
      "High-precision metrology, gauge measurement, hole diameter verification, high-contrast part presence, and tasks requiring sub-millisecond execution with mathematically provable bounds.",
    whenSimplerMethodSuffices:
      "A photoelectric or proximity sensor suffices if only checking whether an object exists at a single point without dimensional validation.",
    keySpecifications: [
      "Sub-pixel edge interpolation down to 1/20th of a pixel",
      "Deterministic run-time (typically 2ms to 10ms on standard CPUs)",
      "OpenCV, Halcon, and custom optimized C++ / Rust kernels",
      "Normalized Cross-Correlation (NCC) and shape-based geometric matching",
    ],
    tradeOffs:
      "Extremely fast and repeatable, but brittle when part geometry has natural aesthetic variations, shifting ambient shadows, or rough organic textures.",
  },
  {
    id: "deep-learning-inspection",
    title: "Deep Learning & AI-Based Defect Segmentation",
    category: "Algorithm & AI",
    overview:
      "Convolutional Neural Networks (CNNs) and Vision Transformers (ViTs) trained for anomaly detection, feature classification, and semantic pixel-level segmentation.",
    whenToUse:
      "Complex cosmetic surface inspections (scratches on cast iron, stains on textiles, weld bead consistency, wood grain flaws) where defects have unpredictable shapes.",
    whenSimplerMethodSuffices:
      "Classical rule-based thresholding or blob analysis should always be preferred for dimensional tolerances, barcode reading, and simple geometric alignment.",
    keySpecifications: [
      "Few-shot unsupervised anomaly models & supervised semantic segmentation",
      "TensorRT-optimized FP16/INT8 inference engines",
      "Inference latency: 15ms–45ms per frame on industrial edge GPUs",
      "Integrated active learning loop for continuous model fine-tuning",
    ],
    tradeOffs:
      "Tolerates natural surface variability, but requires curating representative training datasets and demands dedicated GPU hardware.",
  },
  {
    id: "ocr-ocv-decoding",
    title: "Industrial OCR, OCV & Barcode Decoding",
    category: "Algorithm & AI",
    overview:
      "Specialized algorithms for locating, segmenting, and decoding 1D barcodes (Code 128, UPC), 2D matrix symbologies (DataMatrix, QR, DotCode), and direct-part-marked (DPM) alphanumeric text.",
    whenToUse:
      "Packaging lot/expiry date validation, serialized automotive part tracking, pharmaceutical compliance, and traceability across supply chains.",
    whenSimplerMethodSuffices:
      "Handheld optical laser scanners are sufficient for static warehouse inventory where items do not move on automated high-speed conveyors.",
    keySpecifications: [
      "ISO/IEC 15415 & 15416 print quality grading",
      "Font-independent deep learning character recognition for dot-peen and laser marks",
      "Decoding rates exceeding 60 reads per second at conveyor speeds up to 4 m/s",
    ],
    tradeOffs:
      "High-speed reading requires synchronized strobe lighting to eliminate motion blur.",
  },
  {
    id: "edge-gpu-computing",
    title: "Edge Computing & Industrial IPC Platforms",
    category: "Industrial Computing",
    overview:
      "Fanless, ruggedized industrial PCs (IPCs) and embedded GPU systems (NVIDIA Jetson, Intel Core/Xeon with RTX GPUs) designed for 24/7 continuous factory operation in harsh environments.",
    whenToUse:
      "High-speed in-line inspection where latency must be deterministic (< 50ms) and images cannot be sent to remote cloud servers due to line speeds or security policies.",
    whenSimplerMethodSuffices:
      "Compact all-in-one smart cameras with onboard microprocessors are sufficient for low-complexity presence checks under 100 parts per minute.",
    keySpecifications: [
      "Operating temperature: -20°C to +60°C fanless conduction cooling",
      "GigE Vision (PoE) and USB3 Vision camera interfaces with dedicated PCIe frame grabbers",
      "DIN-rail or cabinet mounting with 24V DC industrial power input",
      "Hardware watchdog timers and RAID solid-state storage",
    ],
    tradeOffs:
      "Industrial PCs have a higher upfront cost than smart cameras, but offer complete flexibility for multi-camera synchronization and GPU model upgrades.",
  },
  {
    id: "plc-factory-integration",
    title: "PLC, Industrial I/O & MES Connectivity",
    category: "Factory Integration",
    overview:
      "Real-time deterministic communication bridges between the vision processor, programmable logic controllers (PLCs), high-speed pneumatic reject mechanisms, and Manufacturing Execution Systems (MES).",
    whenToUse:
      "All automated in-line inspection systems that must reject bad parts, synchronize with conveyor encoders, or store traceability records.",
    whenSimplerMethodSuffices:
      "Standalone benchtop offline inspection stations with manual part loading by an operator only require a simple touch screen display.",
    keySpecifications: [
      "Optically isolated 24V DC discrete inputs/outputs (optical trigger, Pass/Fail, system ready)",
      "Industrial Ethernet protocols: EtherNet/IP, PROFINET, Modbus TCP, EtherCAT",
      "MES/SCADA telemetry via OPC-UA and MQTT over TLS",
      "Shaft encoder tracking for millisecond-accurate reject diverter timing",
    ],
    tradeOffs:
      "Fieldbus protocols provide rich diagnostic telemetry but require coordination with plant automation and controls engineers during commissioning.",
  },
];
