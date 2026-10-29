import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Cpu, CheckCircle2, ChevronRight, Layers, Sparkles, Binary, Sliders, Shield, Play, Pause } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.ts';
import { SOLUTIONS } from '../data/solutions.ts';
import { INDUSTRIES } from '../data/industries.ts';
import { APPLICATIONS } from '../data/applications.ts';
import { RESOURCE_ARTICLES } from '../data/resources.ts';
import { InteractiveBoundingBoxViewer } from '../components/InteractiveBoundingBoxViewer.tsx';
import { InteractiveIndustryExplorer } from '../components/InteractiveIndustryExplorer.tsx';
import { InteractiveTechnologyExplorer } from '../components/InteractiveTechnologyExplorer.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { generateOrganizationSchema } from '../utils/seo.ts';

interface HeroSlide {
  id: string;
  image: string;
  video?: string;
  title: string;
  subtitle: string;
  badge: string;
  telemetry: {
    sensor: string;
    cadence: string;
    precision: string;
  };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "robotic-inspection",
    image: "/assets/hero/clean-robotic-inspection.jpg",
    title: "Automated Robotic & Laser In-Line Inspection",
    subtitle: "Real-time 3D defect detection on high-speed CNC and automotive assembly lines",
    badge: "Automotive & Machining",
    telemetry: {
      sensor: "Photometric Stereo 3D",
      cadence: "450 Units/Min",
      precision: "25µm Defect Limit",
    },
  },
  {
    id: "pcb-telecentric",
    image: "/assets/hero/clean-pcb-inspection.jpg",
    title: "Sub-Micron Telecentric PCB & SMT Inspection",
    subtitle: "Bi-telecentric optics with multi-tier RGB ring lighting verifying 0201 passives and micro-BGAs",
    badge: "Electronics & PCB",
    telemetry: {
      sensor: "20MP Global Shutter",
      cadence: "45,000 Parts/Hr",
      precision: "±20µm Placement",
    },
  },
  {
    id: "edge-ai-telemetry",
    image: "/assets/hero/clean-manufacturing-monitor.jpg",
    title: "Edge AI Quality Control & Telemetry",
    subtitle: "Plant engineers monitoring automated pass/fail decisions and SPC drift alerts in real time",
    badge: "Edge GPU Intelligence",
    telemetry: {
      sensor: "Edge TensorRT GPU",
      cadence: "Deterministic <15ms",
      precision: "99.98% Verification",
    },
  },
];

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const orgSchema = generateOrganizationSchema();

  // Reduced motion preference detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Gentle auto-transition between hero visual assets (every 7s)
  useEffect(() => {
    if (isPaused || isReducedMotion) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, isReducedMotion]);

  const handleVideoError = (slideId: string) => {
    setVideoErrors((prev) => ({ ...prev, [slideId]: true }));
  };

  const coreSolutionCards = [
    {
      title: "AI-Based Visual Inspection Systems",
      description: "Deep learning models for complex defect detection on irregular cast, brushed, or textured surfaces.",
      href: "/solutions/ai-visual-inspection",
      tag: "AI Inspection",
    },
    {
      title: "Automated PCB Inspection (AOI)",
      description: "High-speed SMT verification, component presence/absence, solder fillet angles, and polarity checks.",
      href: "/solutions/pcb-aoi",
      tag: "Electronics AOI",
    },
    {
      title: "Industrial Machine Vision",
      description: "Deterministic edge-detection, sub-pixel metrology, and blob analysis for high-cadence production lines.",
      href: "/technologies",
      tag: "Deterministic Vision",
    },
    {
      title: "OCR & Barcode Recognition",
      description: "High-speed reading of 1D/2D DataMatrix codes, serialized alphanumeric text, and DPM laser markings.",
      href: "/solutions/ocr-barcode-inspection",
      tag: "Traceability",
    },
    {
      title: "Surface Defect Detection & Classification",
      description: "Classifying surface scratches, porosity pits, and tool chatter in under 30ms on edge GPUs.",
      href: "/solutions/surface-defect-detection",
      tag: "Quality Control",
    },
    {
      title: "Dimensional Measurement & Metrology",
      description: "Telecentric optical metrology with sub-pixel edge detection for micron-level tolerance verification.",
      href: "/solutions/dimensional-measurement",
      tag: "Metrology",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Image Acquisition",
      description: "Matched telecentric optics, monochromatic filters, and microsecond strobes freeze line movement without motion blur.",
    },
    {
      step: "02",
      title: "Optical Preprocessing",
      description: "Polarization and cross-reflection filtering isolate critical features from ambient factory lighting and surface glare.",
    },
    {
      step: "03",
      title: "AI or Rule-Based Analysis",
      description: "Sub-pixel algorithms evaluate dimensions while TensorRT-optimized neural networks classify surface anomalies.",
    },
    {
      step: "04",
      title: "Deterministic Rejection",
      description: "Real-time 24V discrete I/O or industrial Ethernet triggers pneumatic divert gates or robotic reject mechanisms.",
    },
    {
      step: "05",
      title: "MES & Traceability Reporting",
      description: "Inspection data, defect images, and SPC trend metrics stream to factory MES via OPC-UA and MQTT.",
    },
  ];

  return (
    <div>
      <SeoHead
        title="AI-Powered Vision Systems for Smarter Industrial Inspection"
        description="SightOpsAi engineers industrial machine vision systems, automated optical inspection (AOI), PCB inspection, OCR, and defect classification for modern manufacturing."
        canonicalPath="/"
        jsonLd={orgSchema}
      />

      {/* Hero Section with Multi-Asset Visual Transition */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 text-white border-b border-white/10 overflow-hidden bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00D2FF]">
                <span className="font-mono tracking-wider uppercase">SightOpsAi · Vision Platform</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">See Better. Inspect Smarter. Think Ahead.</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
                AI-Powered Vision Systems for Smarter Industrial Inspection
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                We engineer intelligent machine vision solutions, automated visual inspection systems, and edge AI that help manufacturers detect microscopic defects, verify assemblies, inspect markings, and maintain zero-defect standards.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/solutions"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow-md text-center"
                >
                  <span>Explore Our Solutions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors text-center"
                >
                  <span>Contact Our Team</span>
                </Link>
              </div>

              {/* Technical Trust Strip */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-xs text-slate-300">
                <div>
                  <div className="font-bold text-[#00D2FF] text-sm font-mono">100% In-Line</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Automated Visual Inspection</div>
                </div>
                <div>
                  <div className="font-bold text-[#00D2FF] text-sm font-mono">Sub-Pixel</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Micron Metrology Precision</div>
                </div>
                <div>
                  <div className="font-bold text-[#00D2FF] text-sm font-mono">Edge GPU</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Deterministic Real-Time I/O</div>
                </div>
              </div>
            </div>

            {/* Right Multi-Asset Visual Hero Showcase (5 cols) - Clean Unannotated Images */}
            <div className="lg:col-span-5 space-y-3 relative z-10">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950 min-h-[340px] sm:min-h-[380px] flex items-center justify-center">
                {HERO_SLIDES.map((slide, sIdx) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      activeSlide === sIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Live Inspection Telemetry HUD Strip at Top */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 text-[10px] font-mono text-[#00D2FF]">
                  <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
                  <span className="truncate max-w-[190px] sm:max-w-none">
                    LIVE FEED · {HERO_SLIDES[activeSlide].telemetry.sensor}
                  </span>
                </div>

                {/* Controls at Top Right: Motion Pause/Play & Manual Thumbnail Switcher */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1 rounded-lg border border-white/15">
                  <button
                    type="button"
                    onClick={() => setIsPaused((prev) => !prev)}
                    className="p-1 rounded text-slate-300 hover:text-white transition-colors cursor-pointer"
                    aria-label={isPaused ? 'Resume background rotation' : 'Pause background rotation'}
                    title={isPaused ? 'Resume rotation' : 'Pause rotation'}
                  >
                    {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  </button>
                  <div className="w-px h-3 bg-white/20" />
                  {HERO_SLIDES.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setActiveSlide(dotIdx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        activeSlide === dotIdx ? 'bg-[#00D2FF] w-6' : 'bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Switch to visual slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                {/* Bottom Optical Metric Bar on Preview Box */}
                <div className="absolute bottom-3 inset-x-3 z-20 bg-black/75 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex items-center justify-between text-[11px] font-mono text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Cadence:</span>
                    <span className="text-white font-bold">{HERO_SLIDES[activeSlide].telemetry.cadence}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Tolerance:</span>
                    <span className="text-[#00D2FF] font-bold">{HERO_SLIDES[activeSlide].telemetry.precision}</span>
                  </div>
                </div>
              </div>

              {/* Clean Slide Information Panel Below Image */}
              <div className="hover-card-dark-panel bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#00D2FF] uppercase">
                    {HERO_SLIDES[activeSlide].badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    0{activeSlide + 1} / 0{HERO_SLIDES.length}
                  </span>
                </div>
                <div className="font-bold text-white text-xs">{HERO_SLIDES[activeSlide].title}</div>
                <p className="text-[11px] text-slate-300 leading-snug">{HERO_SLIDES[activeSlide].subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Inspection System Experience */}
      <section className="py-20 bg-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00D2FF] font-mono uppercase bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              <Eye className="w-4 h-4" />
              <span>Interactive Machine Vision Experience</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
              Interactive Machine Vision Inspection Explorer
            </h2>
            <p className="text-sm text-slate-300">
              Select inspection targets below to evaluate object localization criteria, defect classifications, OCR readings, and dimension tolerances with clean visual clarity.
            </p>
          </div>

          <InteractiveBoundingBoxViewer />
        </div>
      </section>

      {/* Section 5: Industry Navigation Transition & Consolidated 5 Industries */}
      <section className="py-20 bg-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-10 max-w-3xl">
            <div className="text-xs font-semibold text-[#00D2FF] uppercase tracking-wider font-mono bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 w-fit">
              Consolidated Sector Explorer
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
              Explore Our 5 Core Manufacturing Sectors
            </h2>
            <p className="text-sm text-slate-300">
              Use the horizontal navigation buttons below to explore inspection challenges, proposed vision solutions, and expected business benefits across key manufacturing industries.
            </p>
          </div>

          <InteractiveIndustryExplorer />
        </div>
      </section>

      {/* Section 6 & 7: Redesigned Interactive Technology Explorer */}
      <section className="py-20 bg-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-10 max-w-3xl">
            <div className="text-xs font-semibold text-[#00D2FF] uppercase tracking-wider font-mono bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 w-fit">
              Technology Explorer
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
              Interactive Machine Vision & AI Technology Stack
            </h2>
            <p className="text-sm text-slate-300">
              Explore our core capabilities: deep learning, object detection, OCR & barcode decoding, precision metrology, industrial cameras, and on-premises edge model deployment.
            </p>
          </div>

          <InteractiveTechnologyExplorer />
        </div>
      </section>

      {/* Core Solutions Bento Grid */}
      <section className="py-20 bg-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <div className="text-xs font-semibold text-[#00D2FF] uppercase tracking-wider font-mono bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 w-fit">
              Core Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
              Industrial Vision Solutions for Manufacturing Lines
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              From sub-micron electronics assembly to heavy automotive forgings, our inspection solutions are engineered to prevent defects from escaping to downstream customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreSolutionCards.map((card) => (
              <Link
                key={card.title}
                to={card.href}
                className="hover-card-interactive group p-6 rounded-xl border border-white/30 bg-white/95 backdrop-blur-md shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono font-semibold text-[#0066FF]">
                    {card.tag}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-800 group-hover:text-[#0066FF]">
                  <span>Technical Details</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#00D2FF] hover:underline bg-slate-900/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/15"
            >
              <span>View In-Depth Specifications for All Solutions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5-Stage Engineering Workflow */}
      <section className="py-20 bg-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-14">
            <div className="text-xs font-semibold text-[#00D2FF] uppercase tracking-wider font-mono bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 w-fit">
              System Engineering
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
              How Our Industrial Vision Systems Work
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Reliable machine vision combines optics, microsecond strobe timing, edge inference, and deterministic PLC handshakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {workflowSteps.map((ws) => (
              <div
                key={ws.step}
                className="hover-card-panel p-5 rounded-xl border border-white/30 bg-white/95 backdrop-blur-md space-y-3 shadow-md"
              >
                <div className="text-2xl font-black font-mono text-[#0066FF]">
                  {ws.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{ws.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ws.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Gallery Preview */}
      <section className="py-20 bg-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#00D2FF] uppercase tracking-wider font-mono bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 w-fit">
                Technical Case Studies
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
                Demonstrated Application Examples
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Representative engineering benchmarks detailing customer problems, 5-stage workflows, example inputs/outputs, and business value.
              </p>
            </div>
            <Link
              to="/applications"
              className="text-xs font-bold text-[#00D2FF] hover:underline flex items-center gap-1.5 shrink-0 bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/15"
            >
              <span>View All Applications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPLICATIONS.slice(0, 3).map((app) => (
              <div
                key={app.id}
                className="hover-card-panel p-6 rounded-xl border border-white/30 bg-white/95 backdrop-blur-md shadow-md space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono text-[#0066FF] font-semibold">
                    {app.industry}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{app.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {app.customerProblem}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-mono">Demonstration</span>
                  <Link
                    to={`/applications#${app.slug}`}
                    className="font-semibold text-[#0066FF] hover:underline"
                  >
                    Inspect Workflow &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Action Banner */}
      <section className="py-20 bg-slate-950/60 backdrop-blur-sm text-white border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00D2FF] font-mono uppercase tracking-wider">
            Optical Feasibility Testing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Evaluate Your Components in Our Bengaluru Vision Lab
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Ship representative pass/fail parts to our laboratory. We test optical geometries, telecentric lenses, and algorithmic feasibility, delivering a detailed report with cycle time and repeatability estimates.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow-md"
            >
              Request Optical Feasibility Trial
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 text-xs font-bold text-white border border-white/20 hover:border-white rounded-lg transition-colors"
            >
              Our Engineering Approach
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
