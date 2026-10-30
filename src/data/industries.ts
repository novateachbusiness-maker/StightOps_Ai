/**
 * Industry Categories Data (Consolidated per Client Requirements)
 * 1. Automotive Vision Inspection
 * 2. Electronics & PCB Inspection (combines PCB, SMT & semiconductor components)
 * 3. Food & Packaging Inspection
 * 4. Logistics & Product Inspection
 * 5. Pharmaceutical Inspection
 */

export interface Industry {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  heroSummary: string;
  customerChallenge: string;
  proposedSolution: string;
  inspectionChallenges: string[];
  keyApplications: {
    title: string;
    description: string;
    image?: string;
    inspectionFocus?: string;
    benefit?: string;
  }[];
  suitableTechnologies: string[];
  expectedBenefits: string[];
  integrationConsiderations: string[];
  image: string;
  productCutout?: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "automotive-vision-inspection",
    slug: "automotive-vision-inspection",
    title: "Automotive Vision Inspection",
    tagline: "100% in-line visual inspection for powertrain components, precision stampings, and safety fasteners.",
    heroSummary:
      "High-speed machine vision systems engineered to detect micro-cracks, machining burrs, casting porosity, and weld defects on automotive production lines before parts reach assembly.",
    customerChallenge:
      "Automotive component manufacturers face zero-defect mandates from tier-1 OEMs. Specular reflections from machined metals, oil mist in CNC bays, and rapid 60+ ppm cycle times make manual inspection error-prone and fatigue-heavy.",
    proposedSolution:
      "SightOpsAi provides multi-camera stations with photometric stereo and polarized coaxial illumination that isolate 3D surface topography from oil stains and reflections, delivering deterministic pass/fail triggers to line PLCs.",
    inspectionChallenges: [
      "Machined metal surfaces possess high specular reflectivity and directional tool marks that mask fine scratches.",
      "Oil mist, coolant splash, and heavy mechanical vibration in stamping and CNC machining bays.",
      "Extremely tight dimensional tolerances (down to single-digit microns) on sealing surfaces and bearing races.",
      "Deep cavity and blind hole thread inspection requiring specialized optical probes.",
    ],
    keyApplications: [
      {
        title: "Engine Components Inspection",
        description: "Automated scanning of cylinder bores, valve seats, piston crowns, and connecting rods.",
        image: "/assets/automotive/engine-components.jpg",
        inspectionFocus: "Inspects cylinder liners, valve seat concentricity, and journals for micro-porosity, chatter marks, and hairline casting flaws.",
        benefit: "Eliminates engine seizure risks and ensures precise compression sealing prior to block assembly.",
      },
      {
        title: "Automotive Castings & Housings",
        description: "Surface and internal cavity quality inspection for aluminum die-cast transmission cases and steering knuckles.",
        image: "/assets/automotive/automotive-castings.jpg",
        inspectionFocus: "Inspects parting lines, bolt bosses, and core passages for cold shuts, blowholes, and flash burrs.",
        benefit: "Guarantees structural strength under dynamic mechanical loads and prevents hydraulic fluid leakage.",
      },
      {
        title: "Gears & Mechanical Drive Components",
        description: "High-precision geometric profiling and root inspection for transmission gears, pinions, and splines.",
        image: "/assets/automotive/gears-mechanical.jpg",
        inspectionFocus: "Inspects gear tooth flanks, root fillets, bevel contact patterns, and pitch circle runout.",
        benefit: "Eliminates gear whine, tooth spalling, and costly transmission warranty recalls.",
      },
      {
        title: "Brake Discs & Friction Components",
        description: "100% in-line verification of brake rotor runout, surface finish, and ventilation vane clearances.",
        image: "/assets/automotive/brake-components.jpg",
        inspectionFocus: "Inspects disc friction faces, chamfers, balance drill holes, and friction pad bonding integrity.",
        benefit: "Ensures critical braking safety compliance and prevents brake shudder and uneven wear.",
      },
      {
        title: "Metal Surface Defect Detection",
        description: "Real-time surface scanning of stamped body panels, chassis brackets, and deep-drawn metal stampings.",
        image: "/assets/automotive/metal-surface-inspection.jpg",
        inspectionFocus: "Detects tool chatter, scratches, pits, draw wrinkles, and edge burrs on brushed and rolled metals.",
        benefit: "Prevents defective stampings from reaching painting and robotic welding lines.",
      },
      {
        title: "Automotive Assembly & Sub-Assembly Verification",
        description: "Multi-angle optical check of assembled subsystems, brackets, clips, and torque witness marks.",
        image: "/assets/automotive/automotive-assembly.jpg",
        inspectionFocus: "Verifies clip seating, wiring harness routing, hose clamp alignment, and fastener torque marks.",
        benefit: "100% verification that no missing or misaligned assembly items escape to downstream vehicle stations.",
      },
      {
        title: "Precision Dimensional Metrology & Defect Sorting",
        description: "Sub-micron optical measurement of outer diameters, thread pitches, and GD&T tolerances.",
        image: "/assets/automotive/dimensional-defect-inspection.jpg",
        inspectionFocus: "Measures lengths, diameters, concentricity, and thread form using bi-telecentric optics.",
        benefit: "Replaces slow coordinate measuring machines (CMMs) with real-time 100% in-line dimensional sorting.",
      },
    ],
    suitableTechnologies: [
      "Photometric Stereo 3D Topography",
      "Collimated Telecentric Backlighting",
      "Coaxial Strobe LED Illumination",
      "Ruggedized IP67 Industrial Cameras",
      "24V Discrete PLC Reject Handshakes",
    ],
    expectedBenefits: [
      "Elimination of customer line stoppages from defective fasteners and components",
      "100% automated inspection records with serialized timestamping for ISO/TS audit trails",
      "Reduction in false rejects caused by cosmetic cutter marks vs. real functional cracks",
    ],
    integrationConsiderations: [
      "Heavy-duty pneumatic or robotic high-speed diverters capable of rejecting heavy metal forgings.",
      "Integration with automotive traceability systems and laser marking stations.",
      "Automated tool-wear compensation triggers sent back to CNC controllers.",
    ],
    image: "/assets/industries/automotive-inspection.jpg",
  },
  {
    id: "electronics-pcb-inspection",
    slug: "electronics-pcb-inspection",
    title: "Electronics & PCB Inspection",
    tagline: "Automated optical inspection (AOI) for high-density SMT, micro-soldering, and semiconductor packaging.",
    heroSummary:
      "High-resolution automated optical inspection verifying component presence, orientation, polarity, solder fillet curvature, and micro-BGA alignment on surface-mount assembly lines.",
    customerChallenge:
      "With sub-millimeter passives (0201 and 01005) and multi-pin QFN/BGA packages, manual microscope inspection is impossible at production speeds. Reworking defective boards post-reflow costs up to 10x more than catching flaws immediately.",
    proposedSolution:
      "Multi-angle RGB tiered ring illumination transforms 3D solder curvature into distinct color gradients (shape-from-shading). Coupled with sub-pixel CAD centroid matching and deep learning classification, SightOpsAi catches defects before final potting or boxing.",
    inspectionChallenges: [
      "Sub-millimeter components (0201 and 01005 chips) prone to skew and tombstoning during reflow.",
      "Highly reflective solder joints requiring multi-angle chromatic lighting to avoid false bridging calls.",
      "Inspection speeds must keep pace with pick-and-place lines running over 60,000 components per hour.",
      "Board warpage and variable substrate colors interfering with focus depth and contrast.",
    ],
    keyApplications: [
      {
        title: "SMT Component Presence, Value & Polarity",
        description: "Checking IC orientation, resistor/capacitor presence, and component rotation against CAD centroids.",
        image: "/assets/electronics/smt-presence-polarity.jpg",
        inspectionFocus: "Inspects 0201/01005 passives, IC orientation notches, pin-1 markers, and package rotation.",
        benefit: "Eliminates placement errors and missing components prior to reflow soldering.",
      },
      {
        title: "Solder Joint Fillet Verification",
        description: "Validating solder volume, wetting angles, pin protrusion, bridging, and solder balls to IPC-A-610 standards.",
        image: "/assets/electronics/solder-joint-fillet.jpg",
        inspectionFocus: "Multi-angle chromatic ring lighting checks meniscus wetting angles, tombstoning, and bridging.",
        benefit: "Guarantees IPC-A-610 Class 3 compliance for mission-critical automotive and industrial PCBs.",
      },
      {
        title: "Semiconductor Die & Wire Bond Integrity",
        description: "Verifying die placement, coplanarity, lead frame alignment, and conformal coating coverage under UV light.",
        image: "/assets/electronics/semiconductor-die-wirebond.jpg",
        inspectionFocus: "Inspects wire loop heights, die attach fillets, lead coplanarity, and conformal coating voids.",
        benefit: "Prevents microelectronic bond detachment and ensures long-term thermal packaging reliability.",
      },
    ],
    suitableTechnologies: [
      "Multi-angle RGB Tiered Ring Illumination",
      "Bi-Telecentric Optics (< 0.05% Distortion)",
      "CAD Centroid & ODB++ Importer",
      "Deep Learning Solder Anomaly Models",
      "SMEMA Conveyor Interface Protocol",
    ],
    expectedBenefits: [
      "Drastic reduction in post-reflow board scrap and manual inspection bottlenecks",
      "Rapid recipe creation directly from Gerber / CAD centroid files within minutes",
      "Real-time alerts to pick-and-place operators when component feeders drift",
    ],
    integrationConsiderations: [
      "SMEMA hardware handshakes for smooth in-line conveyor passing.",
      "Integration with rework station terminals showing operators exact defect coordinates and zoom frames.",
      "Exporting SPI (solder paste inspection) and AOI data to SPI/AOI correlation loops.",
    ],
    image: "/src/assets/images/solution_aoi_system_1792999689778.jpg",
  },
  {
    id: "food-packaging-inspection",
    slug: "food-packaging-inspection",
    title: "Food & Packaging Inspection",
    tagline: "High-speed cap placement, fill level verification, label alignment, and tamper seal checks.",
    heroSummary:
      "Reliable visual inspection for food, beverage, and consumer packaged goods running at speeds up to 1,200 units per minute under wet and washdown environments.",
    customerChallenge:
      "High line speeds, shifting container orientations, variable liquid transparency, and splash environments cause frequent misalignments, loose caps, and missing expiry dates that lead to costly retailer fines.",
    proposedSolution:
      "SightOpsAi deploys IP67 washdown vision systems with synchronized high-intensity LED strobes that freeze fast movement without motion blur, verifying cap height, tilt, seal ring intactness, and fill lines simultaneously.",
    inspectionChallenges: [
      "Condensation, wet environments, and washdown cleaning chemicals requiring high IP ratings.",
      "Variable bottle and container orientations on conveyors traveling at up to 1,200 units per minute.",
      "Clear plastic containers and varying liquid transparency causing refractive distortion.",
      "Continuous verification of lot codes and expiration stamps across textured carton boards.",
    ],
    keyApplications: [
      {
        title: "Cap Skew, Height & Tamper Ring Check",
        description: "Instant optical verification of cocked caps, loose closures, and broken security bridges.",
        image: "/assets/packaging/cap-skew-tamper-ring.jpg",
        inspectionFocus: "Dual-camera profile station checks bottle cap seating depth, thread engagement, and tamper bridges.",
        benefit: "Prevents leaking containers and maintains product sterility on high-speed bottling lines.",
      },
      {
        title: "Liquid Fill Level Verification",
        description: "Non-contact inspection of liquid fill line tolerances in glass and PET containers.",
        image: "/assets/packaging/liquid-fill-level.jpg",
        inspectionFocus: "High-contrast backlighting measures liquid meniscus levels against minimum/maximum bounds.",
        benefit: "Prevents under-fill customer disputes and over-fill packaging spills.",
      },
      {
        title: "Label Position & Expiry Date Verification",
        description: "Checking label presence, skew, wrinkles, and legible inkjet lot/expiry codes.",
        image: "/assets/packaging/label-expiry-verification.jpg",
        inspectionFocus: "360-degree optical verification of label alignment, bubble-free adhesion, and OCR date codes.",
        benefit: "Ensures retail traceability compliance and eliminates distributor chargebacks.",
      },
    ],
    suitableTechnologies: [
      "High-Intensity Strobe Illumination",
      "IP67 / IP69K Stainless Steel Enclosures",
      "Infrared Meniscus Gating for Foaming Liquids",
      "High-Speed Pneumatic Blow-off Reject Ejectors",
    ],
    expectedBenefits: [
      "Zero unsealed or under-filled containers reaching distribution centers",
      "Continuous line inspection at up to 1,200 units per minute with zero operator fatigue",
      "Immediate machine pause when recurring packaging defects are detected",
    ],
    integrationConsiderations: [
      "High-speed pneumatic blow-off reject nozzles synchronized with downstream encoder tracking.",
      "Integration with line control systems to stop conveyors upon continuous consecutive reject thresholds.",
    ],
    image: "/assets/industries/packaging-inspection.jpg",
  },
  {
    id: "logistics-product-inspection",
    slug: "logistics-product-inspection",
    title: "Logistics & Product Inspection",
    tagline: "Multi-sided barcode reading tunnels, parcel dimensioning, and automated routing verification.",
    heroSummary:
      "Automated optical scanning tunnels and dimensioning systems that capture 1D/2D barcodes, verify parcel integrity, and calculate volumetric weights at conveyor speeds over 3 m/s.",
    customerChallenge:
      "Fulfillment centers handle variable parcel sizes with damaged, crumpled, or plastic-wrapped labels. Misreads cause sorting re-circulation and manual barcode re-handling bottlenecks.",
    proposedSolution:
      "SightOpsAi provides 5-sided and 6-sided vision scanning tunnels utilizing high-speed line-scan cameras with autofocus and wide dynamic range lighting to decode 1D/2D barcodes and measure legal-for-trade box volumes.",
    inspectionChallenges: [
      "Extreme depth-of-field requirements with parcels ranging from 5cm to 100cm tall on the same belt.",
      "Torn, crumpled, or plastic-wrapped labels with specular reflections.",
      "High conveyor velocities requiring instantaneous camera trigger synchronization.",
    ],
    keyApplications: [
      {
        title: "6-Sided Barcode Scanning Tunnels",
        description: "Capturing 1D and 2D barcodes across all parcel faces simultaneously.",
        image: "/assets/logistics/barcode-scanning-tunnel.jpg",
        inspectionFocus: "Multi-camera array decodes Code 128, GS1, and 2D DataMatrix on high-speed sorting belts.",
        benefit: "Achieves 99.9%+ read rates on sorting conveyors, eliminating parcel recirculation.",
      },
      {
        title: "Optical Parcel Dimensioning (Volumetrics)",
        description: "3D time-of-flight or laser triangulation calculating legal-for-trade volume.",
        image: "/assets/logistics/parcel-dimensioning.jpg",
        inspectionFocus: "3D laser profilers capture exact length, width, height, and cubic volume in milliseconds.",
        benefit: "Automates freight density billing and maximizes cargo space utilization.",
      },
      {
        title: "Label Presence & Destination Routing",
        description: "Directing parcels to automated sortation diverters based on decoded zip codes.",
        image: "/assets/logistics/label-routing-verification.jpg",
        inspectionFocus: "Verifies shipping label presence, print contrast, and barcode readability before routing shoes.",
        benefit: "Prevents misrouted shipments and reduces manual sorting intervention.",
      },
    ],
    suitableTechnologies: [
      "Line-Scan Sensors with Dynamic Focus Optics",
      "Multi-Code Decoding Engine (Code 128, DataMatrix, QR)",
      "Time-of-Flight 3D Surface Profilers",
      "Industrial Ethernet Interfacing with WMS / PLC",
    ],
    expectedBenefits: [
      "Near-perfect read rates on high-speed distribution sorters",
      "Automated parcel dimension capture eliminating billing weight disputes",
      "Direct integration with Warehouse Management Systems (WMS) in real time",
    ],
    integrationConsiderations: [
      "Direct integration with Warehouse Management Systems (WMS) and sorting conveyor PLCs.",
      "Real-time image archival for misread audit logs and carrier dispute resolution.",
    ],
    image: "/assets/industries/logistics-tunnel.jpg",
  },
  {
    id: "pharmaceutical-inspection",
    slug: "pharmaceutical-inspection",
    title: "Pharmaceutical Inspection",
    tagline: "Compliant vision inspection ensuring sterile seal integrity, label validation, and 21 CFR Part 11 traceability.",
    heroSummary:
      "Life-sciences visual inspection verifying vial crimp integrity, blister pack pocket fills, particulate absence, and serialized optical character verification (OCV).",
    customerChallenge:
      "Pharmaceutical manufacturers operate under strict regulatory scrutiny where a missing pill or illegible lot number can cause major recalls. Glass reflections and transparent vials challenge traditional sensors.",
    proposedSolution:
      "SightOpsAi engineers polarized darkfield inspection stations and deep-learning OCR modules that verify vial crimp seals, detect particulate in liquids, and validate lot codes against GS1 compliance databases.",
    inspectionChallenges: [
      "Transparent glass and liquid inspection with particulate detection and bubble differentiation.",
      "Rigorous regulatory requirements including 21 CFR Part 11 audit trails and validated CSV documentation.",
      "Extremely high packaging line speeds (up to 800 blister packs or vials per minute).",
      "Direct verification of micro-serialized GS1 DataMatrix codes and tamper-evident seals.",
    ],
    keyApplications: [
      {
        title: "Vial Cap & Crimping Integrity",
        description: "360-degree inspection of aluminum crimp seals, flip-off caps, stopper seating, and neck cracks.",
        image: "/assets/pharma/vial-crimp-integrity.jpg",
        inspectionFocus: "High-resolution rotational imaging inspects crimp circumference, skirt overhang, and stopper position.",
        benefit: "Guarantees container closure integrity (CCI) and prevents parenteral drug contamination.",
      },
      {
        title: "Blister Pack Pocket & Tablet Integrity",
        description: "Detecting missing tablets, chipped pills, foreign particles, color mix-ups, and foil pinholes.",
        image: "/assets/pharma/blister-tablet-integrity.jpg",
        inspectionFocus: "Color area cameras inspect blister cavity fills, detecting broken tablets, empty pockets, and rogue pills.",
        benefit: "100% blister verification eliminating batch recalls and FDA 483 citations.",
      },
      {
        title: "Medical Syringe & Needle Measurement",
        description: "Micro-measuring needle bevel angles, scale graduations, and cannula straightness.",
        image: "/assets/pharma/syringe-needle-measurement.jpg",
        inspectionFocus: "Telecentric optical metrology measures needle bevel tip geometry, scale markings, and barrel concentricity.",
        benefit: "Ensures precise dosage delivery and pain-free needle insertion compliance.",
      },
    ],
    suitableTechnologies: [
      "Polarized Darkfield Illumination",
      "Global Shutter Area-Scan Cameras",
      "Deep Learning OCR with Strict OCV Match",
      "21 CFR Part 11 Audit Trail & E-Signatures",
    ],
    expectedBenefits: [
      "100% compliance with global serialization regulations and FDA / GMP guidelines",
      "Immediate detection of broken blister seals or empty pockets before carton packaging",
      "Tamper-proof audit logs and inspection image storage for regulatory review",
    ],
    integrationConsiderations: [
      "Validation protocols: Installation Qualification (IQ) and Operational Qualification (OQ).",
      "Fail-safe reject verification (confirming rejected cartons actually drop into locked reject bins).",
      "Cleanroom stainless steel (SS316) enclosures and IP65 washdown protection.",
    ],
    image: "/assets/applications/pharma-inspection.jpg",
  },
];
