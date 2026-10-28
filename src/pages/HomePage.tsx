import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Cpu, CheckCircle2, ChevronRight, Layers, Sparkles, Binary, Sliders, Shield } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.ts';
import { SOLUTIONS } from '../data/solutions.ts';
import { INDUSTRIES } from '../data/industries.ts';
import { APPLICATIONS } from '../data/applications.ts';
import { RESOURCE_ARTICLES } from '../data/resources.ts';
import { InteractiveInspectionDemo } from '../components/InteractiveInspectionDemo.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { generateOrganizationSchema } from '../utils/seo.ts';

export function HomePage() {
  const orgSchema = generateOrganizationSchema();

  const coreSolutionCards = [
    {
      title: "AI-Based Visual Inspection Systems",
      description: "Deep learning segmentation to detect subtle scratches, dents, and texture anomalies on irregular cast and machined surfaces.",
      href: "/solutions/ai-visual-inspection",
      tag: "AI Inspection",
    },
    {
      title: "Automated Optical Inspection (AOI)",
      description: "High-speed multi-angle RGB illumination and telecentric imaging for sub-millimeter component and assembly verification.",
      href: "/solutions/pcb-aoi",
      tag: "Electronics AOI",
    },
    {
      title: "Industrial Machine Vision",
      description: "Deterministic edge-detection, pattern matching, and blob analysis engineered for high-cadence production lines.",
      href: "/technologies",
      tag: "Classical Vision",
    },
    {
      title: "PCB Inspection Systems",
      description: "100% SMT placement verification, solder fillet coplanarity, solder bridging detection, and polarity checks.",
      href: "/solutions/pcb-aoi",
      tag: "SMT & THT",
    },
    {
      title: "OCR & Barcode Inspection",
      description: "High-speed reading and verification of 1D barcodes, 2D DataMatrix codes, and serialized direct-part marks.",
      href: "/solutions/ocr-barcode-inspection",
      tag: "Traceability",
    },
    {
      title: "Defect Detection & Classification",
      description: "Classifying surface flaws into functional vs. cosmetic categories using edge GPU inference in under 30ms.",
      href: "/solutions/surface-defect-detection",
      tag: "Quality Control",
    },
    {
      title: "Dimensional Measurement",
      description: "Non-contact telecentric optical metrology with sub-pixel edge detection for micron-level tolerance verification.",
      href: "/solutions/dimensional-measurement",
      tag: "Metrology",
    },
    {
      title: "Custom Vision Automation",
      description: "Bespoke optical enclosures, multi-camera synchronization, PLC handshakes, and pneumatic reject stations.",
      href: "/solutions/custom-machine-vision",
      tag: "System Integration",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Image Acquisition & Optics",
      description: "Matched telecentric lenses, monochromatic narrow-band filters, and strobed illumination freeze movement without motion blur.",
    },
    {
      step: "02",
      title: "Optical Preprocessing",
      description: "Polarization and cross-reflection filtering isolate critical features from ambient factory lighting and surface glare.",
    },
    {
      step: "03",
      title: "AI or Rule-Based Analysis",
      description: "Sub-pixel algorithms evaluate dimensions while TensorRT-optimized neural networks classify surface texture defects.",
    },
    {
      step: "04",
      title: "Deterministic Rejection",
      description: "Real-time 24V discrete I/O or industrial Ethernet triggers pneumatic divert gates or robotic reject mechanisms.",
    },
    {
      step: "05",
      title: "MES & SPC Reporting",
      description: "Inspection data, defect images, and Cp/Cpk trend metrics stream to factory MES via OPC-UA and MQTT.",
    },
  ];

  return (
    <div>
      <SeoHead
        title="AI-Powered Vision Systems for Smarter Industrial Inspection"
        description="Stightops Ai engineers industrial machine vision systems, automated optical inspection (AOI), PCB inspection, OCR, and defect classification for modern manufacturing."
        canonicalPath="/"
        jsonLd={orgSchema}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#F4F8F8] border-b border-[#DCE7E8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#087F8C]">
                <span className="font-mono tracking-wider uppercase">Industrial Machine Vision & AOI</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-600">Zero-Escape Quality Control</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#064E52] tracking-tight leading-[1.15] text-balance">
                AI-Powered Vision Systems for Smarter Industrial Inspection
              </h1>

              <p className="text-base sm:text-lg text-[#172B32]/85 leading-relaxed max-w-2xl">
                We engineer intelligent machine vision solutions, automated optical inspection (AOI), and edge AI systems that help manufacturing plants automate visual quality checks, identify microscopic defects, verify serial codes, and maintain zero-defect standards.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#064E52] hover:bg-[#087F8C] rounded-lg transition-colors shadow-sm text-center"
                >
                  <span>Discuss Your Application</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/solutions"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#064E52] hover:text-[#087F8C] bg-white border border-[#DCE7E8] hover:border-[#087F8C] rounded-lg transition-colors text-center"
                >
                  <span>Explore Our Solutions</span>
                </Link>
              </div>

              {/* Technical Trust Strip */}
              <div className="pt-6 border-t border-[#DCE7E8] grid grid-cols-3 gap-4 text-xs text-slate-600">
                <div>
                  <div className="font-bold text-[#064E52] text-sm font-mono">100% In-Line</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Automated Optical Inspection</div>
                </div>
                <div>
                  <div className="font-bold text-[#064E52] text-sm font-mono">Sub-Pixel</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Micron Metrology Precision</div>
                </div>
                <div>
                  <div className="font-bold text-[#064E52] text-sm font-mono">Edge GPU</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Deterministic Real-Time I/O</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual with realistic inspection reticles */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#DCE7E8] shadow-md bg-slate-900 group">
                <img
                  src="/src/assets/images/hero_pcb_inspection_1792999689695.jpg"
                  alt="Industrial machine vision camera inspecting PCB assembly under telecentric illumination"
                  className="w-full h-[400px] object-cover"
                />

                {/* Inspection Overlays on Hero Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Reticle bounding box */}
                <div className="absolute top-1/3 left-1/4 w-28 h-20 border-2 border-emerald-400 rounded bg-emerald-500/10 pointer-events-none">
                  <div className="text-[9px] font-mono font-bold text-white bg-emerald-600 px-1.5 py-0.5 rounded -mt-4 w-fit shadow">
                    AOI: BGA-64 VERIFIED
                  </div>
                </div>

                {/* Subtitle Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-lg border border-white/20 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#064E52]">Automated SMT Inspection Station</div>
                    <div className="text-[10px] text-slate-500">Global shutter camera · Bi-telecentric optics</div>
                  </div>
                  <div className="px-2 py-1 bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold rounded">
                    PASS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Solutions Bento Grid */}
      <section className="py-20 bg-white border-b border-[#DCE7E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <div className="text-xs font-semibold text-[#087F8C] uppercase tracking-wider font-mono">
              Core Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#064E52]">
              Industrial Vision Solutions for Manufacturing Lines
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              From sub-micron electronics assembly to heavy automotive forgings, our inspection solutions are engineered to prevent defects from escaping the plant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreSolutionCards.map((card) => (
              <Link
                key={card.title}
                to={card.href}
                className="group p-6 rounded-xl border border-[#DCE7E8] bg-[#F4F8F8]/50 hover:bg-white hover:border-[#087F8C] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono font-semibold text-[#087F8C]">
                    {card.tag}
                  </div>
                  <h3 className="text-base font-bold text-[#172B32] group-hover:text-[#087F8C] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#DCE7E8]/60 flex items-center justify-between text-xs font-semibold text-[#064E52] group-hover:text-[#087F8C]">
                  <span>Technical Details</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#087F8C] hover:underline"
            >
              <span>View In-Depth Specifications for All Solutions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Vision Demonstration Section */}
      <section className="py-20 bg-[#F4F8F8] border-b border-[#DCE7E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#087F8C] font-mono uppercase">
              <Eye className="w-4 h-4" />
              <span>Interactive Demonstration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#064E52]">
              Experience Our Vision System Controller Interface
            </h2>
            <p className="text-sm text-slate-600">
              Toggle between SMT component checks, telecentric precision metrology, and high-speed OCR decoding. Adjust illumination exposure and inspect automated finding overlays in real time.
            </p>
          </div>

          <InteractiveInspectionDemo />
        </div>
      </section>

      {/* How Our Vision System Works: 5-Stage Engineering Architecture */}
      <section className="py-20 bg-white border-b border-[#DCE7E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-14">
            <div className="text-xs font-semibold text-[#087F8C] uppercase tracking-wider font-mono">
              System Engineering
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#064E52]">
              How Our Industrial Vision Systems Work
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Reliable machine vision is an integrated optical and mechanical discipline, combining optics, strobe timing, edge inference, and deterministic PLC handshakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {workflowSteps.map((ws) => (
              <div
                key={ws.step}
                className="p-5 rounded-xl border border-[#DCE7E8] bg-[#F4F8F8]/40 space-y-3"
              >
                <div className="text-2xl font-black font-mono text-[#18B6A4]">
                  {ws.step}
                </div>
                <h3 className="text-sm font-bold text-[#172B32]">{ws.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ws.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served Preview */}
      <section className="py-20 bg-[#F4F8F8] border-b border-[#DCE7E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#087F8C] uppercase tracking-wider font-mono">
                Target Sectors
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#064E52]">
                Industries Where We Solve Inspection Challenges
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                Tailored vision solutions engineered for the specific physical and regulatory demands of modern manufacturing.
              </p>
            </div>
            <Link
              to="/industries"
              className="text-xs font-bold text-[#064E52] hover:text-[#087F8C] flex items-center gap-1.5 shrink-0"
            >
              <span>Explore All Industries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INDUSTRIES.slice(0, 3).map((ind) => (
              <div
                key={ind.id}
                className="rounded-xl border border-[#DCE7E8] bg-white overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white text-sm font-bold">
                    {ind.title}
                  </div>
                </div>

                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ind.heroSummary}
                  </p>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="text-xs font-semibold text-[#087F8C] hover:underline flex items-center gap-1"
                  >
                    <span>View Inspection Challenges</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Gallery Preview */}
      <section className="py-20 bg-white border-b border-[#DCE7E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#087F8C] uppercase tracking-wider font-mono">
                Technical Case Studies
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#064E52]">
                Demonstrated Application Examples
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                Representative engineering benchmarks detailing objectives, optical methods, expected outputs, and known limitations.
              </p>
            </div>
            <Link
              to="/applications"
              className="text-xs font-bold text-[#064E52] hover:text-[#087F8C] flex items-center gap-1.5 shrink-0"
            >
              <span>View Full Applications Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPLICATIONS.slice(0, 3).map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-xl border border-[#DCE7E8] bg-[#F4F8F8]/40 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono text-[#087F8C] font-semibold">
                    {app.tag}
                  </div>
                  <h3 className="text-sm font-bold text-[#172B32]">{app.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {app.objective}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#DCE7E8] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-mono">Demo Benchmark</span>
                  <Link
                    to="/applications"
                    className="font-semibold text-[#087F8C] hover:underline"
                  >
                    Inspect Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Resources Section */}
      <section className="py-20 bg-[#F4F8F8] border-b border-[#DCE7E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <div className="text-xs font-semibold text-[#087F8C] uppercase tracking-wider font-mono">
              Engineering Knowledge Base
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#064E52]">
              Technical Guides & Vision Fundamentals
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Practical engineering articles addressing optical geometry, telecentric lenses, deep learning trade-offs, and factory PLC integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCE_ARTICLES.slice(0, 3).map((art) => (
              <Link
                key={art.id}
                to={`/resources/${art.slug}`}
                className="p-6 rounded-xl border border-[#DCE7E8] bg-white hover:border-[#087F8C] transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-[#087F8C]">{art.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.readingTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#172B32] group-hover:text-[#087F8C] transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#064E52]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Action Banner */}
      <section className="py-20 bg-[#064E52] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#18B6A4] font-mono uppercase tracking-wider">
            Optical Feasibility Testing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Evaluate Your Components in Our Vision Lab
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Ship your representative pass/fail parts to our Bengaluru laboratory. We test optical geometries, lenses, and algorithmic feasibility, delivering a detailed report with sample images and cycle time estimates.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 text-xs font-bold text-[#064E52] bg-[#18B6A4] hover:bg-[#149d8d] rounded-lg transition-colors shadow-md"
            >
              Request Optical Feasibility Trial
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 text-xs font-bold text-white border border-white/20 hover:border-white rounded-lg transition-colors"
            >
              Our Engineering Process
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
