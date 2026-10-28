/**
 * Industry Segments Data
 * Factual industrial challenges, inspection points, and integration notes without unverified claims.
 */

export interface Industry {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  heroSummary: string;
  inspectionChallenges: string[];
  keyApplications: {
    title: string;
    description: string;
  }[];
  suitableTechnologies: string[];
  integrationConsiderations: string[];
  image: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "electronics-pcb",
    slug: "electronics-pcb",
    title: "Electronics & PCB Manufacturing",
    tagline: "Automated optical inspection for high-density SMT and micro-soldered assemblies.",
    heroSummary:
      "Modern electronics assembly requires zero-escape quality verification for microscopic passives, fine-pitch BGA packages, and delicate solder joints running at fast line cadences.",
    image: "/src/assets/images/solution_aoi_system_1792999689778.jpg",
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
      },
      {
        title: "Solder Joint Fillet Verification",
        description: "Validating solder volume, wet angles, pin protrusion, bridging, and solder balls.",
      },
      {
        title: "Conformal Coating UV Inspection",
        description: "Verifying uniform protective coating coverage and absence of voids or pooling around sensitive pins.",
      },
    ],
    suitableTechnologies: [
      "Multi-angle RGB tiered ring illumination",
      "Telecentric optics with high depth of field",
      "CAD centroid coordinate mapping & ODB++ import",
      "Deep learning classification for ambiguous solder reflections",
    ],
    integrationConsiderations: [
      "SMEMA hardware handshakes for smooth in-line conveyor passing.",
      "Integration with rework station terminals showing operators exact defect coordinates and zoom frames.",
      "Exporting SPI (solder paste inspection) and AOI data to SPI/AOI correlation loops.",
    ],
  },
  {
    id: "automotive-metal",
    slug: "automotive-metal",
    title: "Automotive & Machined Metal",
    tagline: "100% in-line inspection for powertrain components, precision stampings, and safety-critical fasteners.",
    heroSummary:
      "Automotive component manufacturers require dependable 100% inspection to prevent catastrophic recall risks, guarantee dimensional tolerances, and verify direct part markings.",
    image: "/src/assets/images/solution_surface_defect_1792999691227.jpg",
    inspectionChallenges: [
      "Machined metal surfaces possess high specular reflectivity and directional tool marks that mask fine scratches.",
      "Oil mist, coolant splash, and heavy mechanical vibration in stamping and CNC machining bays.",
      "Extremely tight dimensional tolerances (down to single-digit microns) on sealing surfaces and bearing races.",
      "Deep cavity and blind hole thread inspection requiring specialized optical probes.",
    ],
    keyApplications: [
      {
        title: "Engine Gear & Bearing Surface Flaw Detection",
        description: "Scanning for chatter marks, grinding burns, porosity, and handling dents on bearing surfaces.",
      },
      {
        title: "Critical Fastener Dimensional Inspection",
        description: "High-speed optical sorting of bolts, studs, and pins for thread pitch, shank straightness, and head concentricity.",
      },
      {
        title: "Brake Rotor & Disc Inspection",
        description: "Verifying runout, surface finish, chamfer presence, and balanced drill hole placements.",
      },
    ],
    suitableTechnologies: [
      "Photometric stereo multi-light illumination",
      "Collimated telecentric backlighting for shadow silhouettes",
      "Coaxial strobed lighting for specular glare suppression",
      "Ruggedized IP67 camera housings and vibration-damped optical mounts",
    ],
    integrationConsiderations: [
      "Heavy-duty pneumatic or robotic high-speed diverters capable of rejecting heavy metal forgings.",
      "Integration with automotive traceability systems and laser marking stations.",
      "Automated tool-wear compensation triggers sent back to CNC controllers.",
    ],
  },
  {
    id: "pharmaceutical-medical",
    slug: "pharmaceutical-medical",
    title: "Pharmaceutical & Medical Devices",
    tagline: "Compliant vision inspection ensuring sterile seal integrity, label validation, and 21 CFR Part 11 traceability.",
    heroSummary:
      "In life sciences, inspection failures risk patient safety. Our vision solutions provide verified optical checking of vial seals, blister pockets, syringe volumes, and serialised packaging.",
    image: "/src/assets/images/solution_ocr_barcode_1792999690125.jpg",
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
      },
      {
        title: "Blister Pack Pocket & Tablet Integrity",
        description: "Detecting missing tablets, chipped pills, foreign particles, color mix-ups, and foil pinholes.",
      },
      {
        title: "Medical Syringe & Catheter Measurement",
        description: "Micro-measuring needle bevel angles, scale graduations, and cannula straightness.",
      },
    ],
    suitableTechnologies: [
      "High-speed line-scan and area-scan cameras with global shutters",
      "Polarized backlights and darkfield lighting to highlight transparent particulate",
      "Deep learning OCR algorithms with strict optical character verification (OCV)",
      "Audit logging, recipe password control, and e-signatures",
    ],
    integrationConsiderations: [
      "Validation protocols: Installation Qualification (IQ) and Operational Qualification (OQ).",
      "Fail-safe reject verification (confirming rejected cartons actually drop into locked reject bins).",
      "Cleanroom stainless steel (SS316) enclosures and IP65 washdown protection.",
    ],
  },
  {
    id: "food-beverage-packaging",
    slug: "food-beverage-packaging",
    title: "Food & Beverage Packaging",
    tagline: "High-speed cap placement, fill level verification, label alignment, and barcode tracking.",
    heroSummary:
      "High-throughput packaging lines require robust vision systems that survive washdown conditions while verifying bottle caps, label positioning, and print clarity.",
    image: "/src/assets/images/solution_ocr_barcode_1792999690125.jpg",
    inspectionChallenges: [
      "Condensation, wet environments, and washdown cleaning chemicals requiring high IP ratings.",
      "Variable bottle and container orientations on conveyors traveling at up to 1,200 units per minute.",
      "Clear plastic containers and varying liquid transparency causing refractive distortion.",
    ],
    keyApplications: [
      {
        title: "Cap Skew, Height & Tamper Ring Check",
        description: "Instant optical verification of cocked caps, loose closures, and broken security bridges.",
      },
      {
        title: "Fill Level Verification",
        description: "Non-contact inspection of liquid fill line tolerances in glass and PET containers.",
      },
      {
        title: "Label Position & Expiry Date Verification",
        description: "Checking label presence, skew, wrinkles, and legible inkjet lot/expiry codes.",
      },
    ],
    suitableTechnologies: [
      "High-intensity LED strobe lighting freezing ultra-fast motion without motion blur",
      "IP67/IP69K stainless steel food-grade enclosures",
      "Multi-camera inspection rings for full 360-degree bottle coverage",
    ],
    integrationConsiderations: [
      "High-speed pneumatic blow-off reject nozzles synchronized with downstream encoder tracking.",
      "Integration with line control systems to stop conveyors upon continuous consecutive reject thresholds.",
    ],
  },
  {
    id: "semiconductor",
    slug: "semiconductor",
    title: "Semiconductors & Electronic Components",
    tagline: "Sub-micron defect inspection for silicon dies, lead frames, and microelectronic packaging.",
    heroSummary:
      "Precision optical inspection solutions for front-end and back-end semiconductor assembly, wire bonding verification, and micro-crack detection.",
    image: "/src/assets/images/case_study_pcb_1792999691900.jpg",
    inspectionChallenges: [
      "Sub-micron feature sizes requiring extreme optical magnification and vibration-isolated setups.",
      "Fragile silicon wafers susceptible to edge chipping, micro-fractures, and scratch propagation.",
      "Complex multi-layer reflective metallization patterns producing optical diffraction.",
    ],
    keyApplications: [
      {
        title: "Die Placement & Tilt Verification",
        description: "Measuring die offset, orientation, and tilt within micron tolerances before epoxy curing.",
      },
      {
        title: "Wire Bond Loop & Ball Integrity",
        description: "Inspecting gold and copper wire bond placement, ball shape, and loop height clearances.",
      },
      {
        title: "Lead Frame Inspection",
        description: "Verifying lead coplanarity, bent pins, plating defects, and micro-burrs.",
      },
    ],
    suitableTechnologies: [
      "Microscopic objective lenses with high numerical apertures (NA)",
      "Coaxial epi-illumination and monochromatic LED light sources",
      "Sub-pixel geometric edge algorithms and phase-shifting interferometry",
    ],
    integrationConsiderations: [
      "Cleanroom class 100/1000 compatibility and anti-static ESD-safe construction.",
      "High-speed data bus connectivity for massive gigapixel image capture streams.",
    ],
  },
  {
    id: "logistics-traceability",
    slug: "logistics-traceability",
    title: "Logistics, Packaging & Traceability",
    tagline: "High-speed multi-barcode tunnel reading, parcel dimensioning, and label sorting.",
    heroSummary:
      "Automated logistics hubs and fulfillment centers rely on vision scanning tunnels to capture barcodes on all six sides of parcels at conveyor speeds exceeding 3 meters per second.",
    image: "/src/assets/images/solution_ocr_barcode_1792999690125.jpg",
    inspectionChallenges: [
      "Extreme depth-of-field requirements with parcels ranging from 5cm to 100cm tall on the same belt.",
      "Torn, crumpled, or plastic-wrapped labels with specular reflections.",
      "High conveyor velocities requiring instantaneous camera trigger synchronization.",
    ],
    keyApplications: [
      {
        title: "6-Sided Barcode Scanning Tunnels",
        description: "Capturing 1D and 2D barcodes across all parcel faces simultaneously.",
      },
      {
        title: "Optical Parcel Dimensioning (Volumetrics)",
        description: "3D time-of-flight or laser triangulation calculating legal-for-trade volume.",
      },
      {
        title: "Label Presence & Destination Routing",
        description: "Directing parcels to automated sortation diverters based on decoded zip codes.",
      },
    ],
    suitableTechnologies: [
      "High-speed line-scan sensors with auto-focus or liquid lens assemblies",
      "High-output continuous linear LED illuminators",
      "Multi-core industrial IPCs running parallel barcode decode pipelines",
    ],
    integrationConsiderations: [
      "Direct integration with Warehouse Management Systems (WMS) and sorting conveyor PLCs.",
      "Real-time image archival for misread audit logs and carrier dispute resolution.",
    ],
  },
];
