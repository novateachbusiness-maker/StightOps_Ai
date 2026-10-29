import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Eye, Wrench, FileCheck, Layers, HelpCircle, Cpu, Camera, Handshake, MapPin, Phone, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function AboutPage() {
  const customSoftwareWorkflow = [
    {
      step: "01",
      title: "Camera & Image Acquisition",
      description: "Evaluating suitable industrial area-scan or line-scan camera hardware (GigE Vision or USB3 Vision) tailored to project resolution and conveyor line speed.",
    },
    {
      step: "02",
      title: "Image Preprocessing",
      description: "Applying optical filtering, polarization, and contrast normalization to eliminate specular factory glare and background noise.",
    },
    {
      step: "03",
      title: "AI-Based Defect Detection",
      description: "Quantized neural networks segmenting scratches, voids, casting porosity, and cosmetic surface anomalies.",
    },
    {
      step: "04",
      title: "OCR & Barcode Recognition",
      description: "Decoding 1D/2D DataMatrix symbologies and serialized dot-peen alphanumeric text with database matching.",
    },
    {
      step: "05",
      title: "Measurement & Tolerancing",
      description: "Sub-pixel telecentric metrology verifying outer diameters, runout, step lengths, and geometric GD&T bounds.",
    },
    {
      step: "06",
      title: "Classification & Reporting",
      description: "Automated Pass/Rework/Scrap categorization with serialized image archival and SPC capability trending.",
    },
    {
      step: "07",
      title: "Factory Integration",
      description: "Direct 24V discrete I/O or fieldbus communication (EtherNet/IP, PROFINET, OPC-UA) with customer PLCs, reject gates, and MES.",
    },
  ];

  return (
    <div className="py-12 bg-transparent min-h-screen">
      <SeoHead
        title="About SightOpsAi | Industrial Machine Vision & Inspection Software"
        description="Learn about SightOpsAi, our custom inspection software engineering approach, hardware integration philosophy, and zero-defect manufacturing vision."
        canonicalPath="/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'About Us', path: '/about' }]} />

        {/* Hero Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-8 md:p-12 shadow-xl mb-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0066FF] font-mono uppercase tracking-wider">
              <span>About SightOpsAi</span>
              <span aria-hidden="true">·</span>
              <span>Bengaluru, India</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              See Better. Inspect Smarter. Think Ahead.
            </h1>
            <p className="text-base text-slate-700 leading-relaxed">
              SightOpsAi is an industrial visual inspection and machine vision engineering company. We specialize in developing customized inspection software solutions that work seamlessly with suitable industrial camera hardware supplied or selected for each project.
            </p>
          </div>
        </div>

        {/* Custom Inspection Software Positioning (Section 11) */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-8 md:p-12 shadow-xl mb-16 space-y-8">
          <div className="space-y-3 max-w-3xl">
            <div className="text-xs font-semibold text-[#0066FF] font-mono uppercase tracking-wider">
              Engineering Architecture
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Our Custom Inspection Software Approach
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              SightOpsAi develops proprietary, tailored inspection software pipelines designed to operate with suitable industrial cameras, optics, and illumination chosen for your specific part geometries. Rather than locking plants into rigid black-box hardware, we engineer flexible, modular software that integrates with your existing factory PLC automation and line conveyors.
            </p>
          </div>

          {/* 7-Step Potential Solution Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {customSoftwareWorkflow.map((step) => (
              <div
                key={step.step}
                className="hover-card-panel p-5 rounded-xl bg-white border border-slate-200 space-y-2 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-[#0066FF]">
                    Stage {step.step}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="hover-card-panel p-4 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-slate-700 flex items-start gap-3 shadow-xs">
            <Camera className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold text-[#0066FF]">Hardware Flexibility:</span> We test and integrate camera sensors, lenses, and lighting geometries based on required optical resolution, working distance, and cycle time. Hardware compatibility is established and validated on customer workpiece samples during formal feasibility testing.
            </div>
          </div>
        </div>

        {/* Verified Case Study Section (Section 15) */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-8 md:p-12 shadow-xl mb-16 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#0066FF] font-mono uppercase tracking-wider">
              Industrial Track Record
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Verified Inspection Success Study
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Documented technical results from our precision manufacturing vision trials.
            </p>
          </div>

          <div className="hover-card-panel p-6 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[11px] font-mono text-[#0066FF] font-bold">CASE STUDY #01</span>
                <h3 className="text-base font-bold text-slate-900">
                  Precision SMT Component Placement & Solder Verification
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold w-fit">
                Verified Benchmark
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
              <div className="space-y-2">
                <span className="font-bold text-slate-900">Inspection Challenge:</span>
                <p className="leading-relaxed text-slate-600">
                  Manual microscope audits sampled only 2% of printed circuit boards, resulting in missed tombstoned 0201 capacitors and solder bridges escaping to final packaging.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900">SightOpsAi Solution:</span>
                <p className="leading-relaxed text-slate-600">
                  Multi-angle RGB telecentric imaging station deployed post-reflow, importing CAD centroid coordinates directly and classifying solder meniscus wetting angles in under 40ms.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-xs">
              <span className="font-bold text-slate-900">Verified Result:</span>
              <p className="text-slate-600 leading-relaxed mt-1">
                Achieved 100% in-line inspection of all active component placements and solder joints, eliminating post-reflow board escapes and providing instant rework zoom coordinates to line repair stations.
              </p>
            </div>
          </div>
        </div>

        {/* Partners & Ecosystem Placeholders (Section 15) */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-8 shadow-xl mb-16 space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
            <Handshake className="w-5 h-5 text-[#0066FF]" />
            <span>Industrial Automation & System Integration Partners</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            SightOpsAi collaborates with automation builders, robotics system integrators, and industrial camera distributors across India and international markets. Formal partner listings and co-engineering credentials are published upon mutual authorization.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {['Industrial Camera Partner', 'Automation Integrator', 'Optics & Lighting OEM', 'Robotics Systems Partner'].map((partner, pIdx) => (
              <div
                key={pIdx}
                className="hover-card-panel p-4 rounded-xl border border-dashed border-slate-300 bg-white text-center flex flex-col items-center justify-center space-y-1 shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 font-mono text-xs">
                  P0{pIdx + 1}
                </div>
                <div className="text-xs font-semibold text-slate-700">{partner}</div>
                <div className="text-[10px] text-slate-400 italic">Pending Confirmation</div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Transparency & Anti-Slop Policy */}
        <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-6 sm:p-8 shadow-xl mb-16 space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Shield className="w-4 h-4 text-[#0066FF]" />
            <span>Transparency & Engineering Verification Policy</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            SightOpsAi operates under strict technical transparency. We do not invent company founding years, customer logos, employee numbers, or universal accuracy percentages. All engineering capabilities presented are grounded in physical optics, verified algorithms, and reproducible laboratory feasibility trials.
          </p>
        </div>

        {/* Registered Office & Corporate Details */}
        <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-6 sm:p-8 shadow-xl mb-16 space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <MapPin className="w-4 h-4 text-[#0066FF]" />
            <span>Company & Registered Office Details</span>
          </div>
          <div className="text-xs text-slate-600 leading-relaxed space-y-1.5 pt-1">
            <div>
              <span className="font-semibold text-slate-800">Entity:</span> {SITE_CONFIG.name}
            </div>
            <div>
              <span className="font-semibold text-slate-800">Registered Office:</span> {SITE_CONFIG.registeredOffice}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">Official Contact:</span>
              <a href="tel:+917259171733" className="font-mono text-[#0066FF] hover:underline flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>+91 72591 71733</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">WhatsApp:</span>
              <a
                href={SITE_CONFIG.whatsapp.chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[#0066FF] hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3 text-[#25D366]" />
                <span>{SITE_CONFIG.whatsapp.displayPhone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0B2545]/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Have an Inspection Project in Mind?</h3>
            <p className="text-xs text-slate-300">
              Schedule an introductory engineering consultation or ship workpiece samples to our Bengaluru lab.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow whitespace-nowrap shrink-0"
          >
            Start Technical Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
