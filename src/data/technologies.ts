/**
 * Technology Categories Data (Redesigned Interactive Explorer Structure)
 * Categories:
 * 1. AI & Deep Learning
 * 2. Object Detection & Segmentation
 * 3. OCR & Barcode Recognition
 * 4. Image Processing & Measurement
 * 5. Camera & Vision Hardware
 * 6. Model Training & Deployment
 */

export interface TechnologyItem {
  id: string;
  category: string;
  title: string;
  simpleExplanation: string;
  industrialUse: string;
  exampleInput: string;
  exampleOutput: string;
  image: string;
  visualCaption: string;
  keyTools: string[];
  tradeOffNotes: string;
}

export const TECHNOLOGY_EXPLORER_ITEMS: TechnologyItem[] = [
  {
    id: "ai-deep-learning",
    category: "AI & Deep Learning",
    title: "Deep Learning & Neural Network Anomaly Detection",
    simpleExplanation:
      "Deep learning uses neural networks trained on thousands of surface examples to identify subtle flaws—like fine cracks, casting voids, and weave distortions—that are too irregular for rigid mathematical rules to catch.",
    industrialUse:
      "Used for aesthetic and cosmetic surface quality control on brushed metals, textured plastics, glass panels, carbon fiber weaves, and automotive engine castings where acceptable natural variation exists.",
    exampleInput:
      "High-resolution 12MP image of a cast aluminum cylinder head with natural surface pebble texture and casting lines.",
    exampleOutput:
      "Pixel-level anomaly heatmap highlighting a 0.35mm porosity pit with a 98.4% defect confidence score, triggering an automated diverter signal.",
    image: "/assets/aistudio/image_2430292c_75e78aa8.jpg",
    visualCaption: "Deep learning neural network architecture with hidden layers for real-time anomaly identification and classification",
    keyTools: ["TensorRT FP16/INT8", "PyTorch Anomaly Networks", "Vision Transformers (ViT)", "Unsupervised PatchCore"],
    tradeOffNotes:
      "Requires representative good and defect workpiece samples for training; higher compute requirements compared to classical rule-based filtering.",
  },
  {
    id: "object-detection-segmentation",
    category: "Object Detection & Segmentation",
    title: "Object Detection & Semantic Pixel Segmentation",
    simpleExplanation:
      "Object detection identifies what and where components are using bounding boxes, while segmentation marks the exact pixel boundary of every part or defect.",
    industrialUse:
      "Used in SMT circuit board assembly verification (finding missing 0201 chips), robotic pick-and-place guidance, weld bead geometry verification, and multi-part subassembly checks.",
    exampleInput:
      "Multi-angle RGB image of a populated PCB assembly with dozens of ICs, capacitors, and connector pins.",
    exampleOutput:
      "Bounding boxes around all components with labels ('IC_U4: PRESENT', 'C14: TOMBSTONED') and exact XY millimeter coordinates passed to the assembly controller.",
    image: "/assets/electronics/solution_aoi_system_1792999689778.jpg",
    visualCaption: "Automated optical inspection head locating component coordinates on PCB assembly",
    keyTools: ["YOLOv8 / YOLOv11 Edge Architectures", "Mask R-CNN / SegNet", "NVIDIA DeepStream", "C++ ONNX Runtime"],
    tradeOffNotes:
      "Bounding boxes provide high-speed localization (15ms), while full semantic segmentation yields contour boundaries at slightly higher inference latency (35ms).",
  },
  {
    id: "ocr-barcode-recognition",
    category: "OCR & Barcode Recognition",
    title: "Optical Character Recognition & 2D Symbology Decoding",
    simpleExplanation:
      "High-speed machine vision algorithms that locate, read, and verify printed or laser-etched letters, numbers, 1D barcodes, and 2D DataMatrix codes at production speeds.",
    industrialUse:
      "Used across pharmaceutical carton serialization, automotive direct-part-mark (DPM) tracking, consumer packaging expiry date checks, and PCB micro-QR tracking.",
    exampleInput:
      "Coaxial strobed image of a dot-peened 2D DataMatrix code on a curved stainless steel automotive shaft moving at 120 parts per minute.",
    exampleOutput:
      "Decoded serial payload ('SN: 1048-5739-9214') verified against the MES database with an ISO/IEC 15415 print quality verification grade (Grade A / 4.0).",
    image: "/assets/applications/pharma-inspection.jpg",
    visualCaption: "High-speed 2D DataMatrix and serial text verification on conveyor line",
    keyTools: ["Deep Learning Character OCR", "ISO/IEC 15415/15416 Graders", "GS1 Syntax Parsers", "Direct Part Mark (DPM) Filters"],
    tradeOffNotes:
      "Direct part marks on rough or specular metal require specialized multi-directional darkfield lighting to cast clear shadows inside dot indentations.",
  },
  {
    id: "image-processing-measurement",
    category: "Image Processing & Measurement",
    title: "Precision Metrology & Classical Image Processing",
    simpleExplanation:
      "Mathematical image filters that detect edges down to fractions of a pixel to measure diameters, lengths, angles, and runout with sub-micron precision.",
    industrialUse:
      "Used for turned shafts, precision screws, medical needles, stamped metal connector pins, and brake discs where strict engineering drawing tolerances must be verified 100%.",
    exampleInput:
      "Silhouette image of a precision turned steel pin captured with a collimated blue telecentric backlight and bi-telecentric lens.",
    exampleOutput:
      "Outer diameter measurement of 12.003 mm against nominal 12.000 ± 0.008 mm, with automated SPC trend logging and CNC tool offset compensation.",
    image: "/assets/applications/shaft-metrology.jpg",
    visualCaption: "Sub-pixel telecentric edge measurement verifying tolerances without perspective error",
    keyTools: ["OpenCV / Halcon Metrology", "Sub-Pixel Canny & Sobel Kernels", "Bi-Telecentric Optics", "NIST Calibration Grids"],
    tradeOffNotes:
      "Superior to AI for dimensional tolerances and deterministic sub-millisecond execution, but requires controlled, high-contrast backlighting.",
  },
  {
    id: "camera-vision-hardware",
    category: "Camera & Vision Hardware",
    title: "Industrial Cameras, Telecentric Optics & Strobe Lighting",
    simpleExplanation:
      "The physical hardware foundation—industrial global-shutter sensors, distortion-free telecentric lenses, and microsecond LED strobes that freeze fast factory conveyor motion.",
    industrialUse:
      "Selecting the exact camera resolution (5MP to 65MP), sensor interface (GigE Vision or USB3 Vision), and lighting geometry (coaxial, dome, darkfield) for each specific customer application.",
    exampleInput:
      "Parts moving at 2.5 meters per second on an automated conveyor line with ambient factory overhead fluorescent flicker.",
    exampleOutput:
      "Crystal-clear, zero-blur image captured with a 200-microsecond high-intensity LED strobe pulse triggered by a shaft encoder signal.",
    image: "/src/assets/images/hero_pcb_inspection_1792999689695.jpg",
    visualCaption: "Industrial camera with telecentric lens and integrated ring illuminator over inspection station",
    keyTools: ["GigE Vision & USB3 Vision SDKs", "Global Shutter CMOS Sensors", "Collimated & Coaxial LED Strobes", "IP67 Protective Housings"],
    tradeOffNotes:
      "Software cannot fix poor lighting. Proper optical and illumination selection represents 80% of total vision inspection reliability.",
  },
  {
    id: "model-training-deployment",
    category: "Model Training & Deployment",
    title: "Model Training, Active Learning & Edge Deployment",
    simpleExplanation:
      "The end-to-end software pipeline that annotates images, trains custom inspection models on real plant data, and deploys optimized inference engines to fanless industrial PCs.",
    industrialUse:
      "Ensuring vision systems continuously adapt when new part variants are introduced, while running reliably 24/7 on factory floors without internet connectivity.",
    exampleInput:
      "A batch of 150 workpiece images collected during new product introduction (NPI) on the customer's assembly line.",
    exampleOutput:
      "A quantized, production-ready TensorRT model running locally on an industrial PC with sub-25ms inference latency and zero cloud dependency.",
    image: "/assets/electronics/clean_edge_ipc_1793174610127.jpg",
    visualCaption: "Edge GPU vision controller and processing computer mounted in industrial automation enclosure",
    keyTools: ["Active Learning Annotation", "TensorRT Engine Compiler", "Local Industrial IPC Runtime", "OPC-UA / MQTT Factory Gateways"],
    tradeOffNotes:
      "All inspection models run strictly on-premises on local factory edge hardware, ensuring total intellectual property confidentiality and zero cloud latency.",
  },
];
