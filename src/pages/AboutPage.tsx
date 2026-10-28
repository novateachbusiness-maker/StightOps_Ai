import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Eye, Wrench, FileCheck, Layers, HelpCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function AboutPage() {
  const lifecyclePhases = [
    {
      phase: "Phase 01",
      title: "Sample Feasibility & Optical Study",
      description: "Clients ship 20 to 50 representative good and defective workpieces to our Bengaluru lab. We evaluate lens magnifications, working distances, and multi-wavelength illumination geometries to prove defect contrast before committing to hardware.",
    },
    {
      phase: "Phase 02",
      title: "Optical & Mechanical Station Design",
      description: "SolidWorks CAD modeling of camera brackets, vibration isolation mounts, lighting shrouds, and pneumatic reject gates designed to match your specific conveyor line height and footprint.",
    },
    {
      phase: "Phase 03",
      title: "Algorithm Pipeline Engineering",
      description: "Development of calibrated sub-pixel OpenCV metrology filters and TensorRT-quantized deep learning models. Benchmarking false accept rates (FAR) and false reject rates (FRR) under varied ambient conditions.",
    },
    {
      phase: "Phase 04",
      title: "Factory Acceptance Testing (FAT)",
      description: "Rigorous dry-run verification in our staging facility with client engineers present. Running consecutive test batches at 120% of rated line speed to verify heat dissipation, trigger sync, and PLC handshakes.",
    },
    {
      phase: "Phase 05",
      title: "Site Acceptance Testing (SAT) & Handoff",
      description: "On-site mechanical bolting, electrical 24V wiring, SMEMA/PLC fieldbus commissioning, recipe training for line operators, and comprehensive maintenance documentation handoff.",
    },
  ];

  return (
    <div className="py-12 bg-[#F4F8F8] min-h-screen">
      <SeoHead
        title="About Stightops Ai | Industrial Machine Vision Engineering"
        description="Learn about Stightops Ai, our optics-first engineering philosophy, turnkey solution development lifecycle, and zero-defect manufacturing mission."
        canonicalPath="/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'About Us', path: '/about' }]} />

        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-[#DCE7E8] p-8 md:p-12 shadow-sm mb-12">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-semibold text-[#087F8C] font-mono uppercase tracking-wider">
              Engineering Excellence
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E52] tracking-tight leading-tight">
              Intelligent Vision. Reliable Inspection.
            </h1>
            <p className="text-base text-slate-700 leading-relaxed">
              Stightops Ai is an industrial vision systems engineering practice based in Bengaluru, India. We design, build, and deploy automated optical inspection (AOI) systems, telecentric metrology stations, and deep-learning visual defect sorters for manufacturers who require zero escapes to downstream customers.
            </p>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl border border-[#DCE7E8] p-8 shadow-sm space-y-3">
            <div className="text-xs font-mono font-bold text-[#087F8C] uppercase">
              Our Mission
            </div>
            <h2 className="text-xl font-bold text-[#064E52]">
              Zero Escapes Through Physics-First Optical Engineering
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To eliminate manual human visual fatigue and subjective inspection errors in industrial manufacturing by providing automated optical inspection stations that combine precision optics, low-noise industrial sensors, and verifiable algorithmic decisions.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#DCE7E8] p-8 shadow-sm space-y-3">
            <div className="text-xs font-mono font-bold text-[#18B6A4] uppercase">
              Our Philosophy
            </div>
            <h2 className="text-xl font-bold text-[#064E52]">
              Lighting & Optics Precede Software Algorithms
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We never attempt to fix inadequate lighting with bloated deep learning models. If target features are not optically distinguished at the lens aperture, software reliability degrades. We invest heavily in optical feasibility, collimated wavelengths, and polarization geometry first.
            </p>
          </div>
        </div>

        {/* 5-Phase Solution Development Lifecycle */}
        <div className="bg-white rounded-2xl border border-[#DCE7E8] p-8 md:p-12 shadow-sm mb-16 space-y-8">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold text-[#087F8C] font-mono uppercase tracking-wider">
              Delivery Process
            </div>
            <h2 className="text-2xl font-bold text-[#064E52]">
              Our Turnkey Solution Development Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Every project follows an established engineering staging protocol to minimize factory downtime and ensure seamless plant floor adoption.
            </p>
          </div>

          <div className="space-y-4">
            {lifecyclePhases.map((phase) => (
              <div
                key={phase.phase}
                className="p-5 rounded-xl bg-[#F4F8F8] border border-[#DCE7E8] grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
              >
                <div className="md:col-span-3">
                  <div className="text-xs font-mono font-bold text-[#087F8C]">
                    {phase.phase}
                  </div>
                  <div className="text-sm font-bold text-[#172B32] mt-0.5">
                    {phase.title}
                  </div>
                </div>
                <div className="md:col-span-9">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Governance Notice */}
        <div className="bg-white rounded-xl border border-[#DCE7E8] p-8 shadow-sm mb-16 space-y-4">
          <div className="flex items-center gap-2 font-bold text-[#064E52] text-base">
            <Shield className="w-5 h-5 text-[#087F8C]" />
            <span>Corporate Transparency & Verification Policy</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Stightops Ai operates under a strict anti-misrepresentation code: we do not publish fabricated client names, manufactured review scores, or ungrounded accuracy statistics (such as "99.99% accuracy across all tasks"). Real industrial performance depends directly on part cleanliness, optical presentation, mechanical fixturing, and line speed. Company registration documents, audited certifications, and client non-disclosure agreements are handled directly via verified B2B engineering consultations.
          </p>
          <div className="pt-2 text-[11px] text-slate-400 font-mono">
            Configuration Source: <code className="bg-slate-100 px-1 py-0.5 rounded">src/config/site.ts</code>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#064E52] text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Have an Inspection Project in Mind?</h3>
            <p className="text-xs text-slate-200">
              Schedule an introductory engineering consultation or send parts to our Bengaluru laboratory for optical testing.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 text-xs font-bold text-[#064E52] bg-[#18B6A4] hover:bg-[#149d8d] rounded-lg transition-colors shadow whitespace-nowrap shrink-0"
          >
            Start Technical Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
