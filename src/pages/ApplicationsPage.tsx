import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, AlertTriangle, CheckCircle2, ArrowRight, Layers, Sliders, Check, X, ShieldAlert } from 'lucide-react';
import { APPLICATIONS, ApplicationCase } from '../data/applications.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [activeOverlays, setActiveOverlays] = useState<Record<string, boolean>>({
    'pcb-smt-component-assembly': true,
    'automotive-gear-surface-scratch-inspection': true,
    'pharma-vial-blister-ocr-inspection': true,
    'turned-shaft-telecentric-metrology': true,
  });

  const industries = [
    'All',
    'Electronics & PCB Inspection',
    'Automotive Vision Inspection',
    'Pharmaceutical Inspection',
  ];

  function toggleOverlay(id: string) {
    setActiveOverlays((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  const filteredApplications = APPLICATIONS.filter((app) => {
    const matchesIndustry = selectedIndustry === 'All' || app.industry === selectedIndustry;
    const matchesSearch =
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.customerProblem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.inspectedProduct.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SeoHead
        title="Industrial Vision Applications & Case Benchmarks | SightOps AI"
        description="Explore SightOps AI engineering application benchmarks: PCB AOI, automotive transmission defect detection, pharmaceutical serialization, and telecentric shaft metrology."
        canonicalPath="/applications"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Applications', path: '/applications' }]} />

        {/* Header */}
        <div className="space-y-4 mb-10 max-w-3xl">
          <div className="text-xs font-semibold text-[#0066FF] font-mono uppercase tracking-wider">
            Customer Problems & Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Inspection Application Benchmarks
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every application is structured around real customer manufacturing problems, 5-stage optical workflows, and measurable business value.
          </p>
        </div>

        {/* Engineering Benchmark Disclaimer Banner */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 mb-8 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold">Illustrative Engineering Benchmarks:</span> The examples below demonstrate optical methodology and algorithmic results under IPC-A-610, GS1, and ISO/IEC 15415 standards. They illustrate technical capability and do not claim unverified specific customer deployments.
          </div>
        </div>

        {/* Search & Filter Tabs */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
            {industries.map((ind) => (
              <button
                key={ind}
                type="button"
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedIndustry === ind
                    ? 'bg-[#0066FF] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by part, code, or defect..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
            />
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-12">
          {filteredApplications.map((app) => {
            const isOverlayOn = activeOverlays[app.id] ?? true;

            return (
              <div
                key={app.id}
                id={app.slug}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm scroll-mt-24"
              >
                {/* Application Header Bar */}
                <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono font-semibold text-[#00D2FF] uppercase">
                      {app.industry} · {app.inspectedProduct}
                    </div>
                    <h2 className="text-xl font-bold text-white">{app.title}</h2>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono px-2 py-1 bg-white/10 text-slate-300 rounded border border-white/15">
                      Benchmark Case
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  {/* Two-Column: Visual Viewport with Overlays (5 cols) & Customer Problem (7 cols) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Visual Viewport with Annotations (5 cols) */}
                    <div className="lg:col-span-5 relative bg-slate-950 rounded-xl overflow-hidden min-h-[300px] flex items-center justify-center border border-slate-200 select-none">
                      <img
                        src={app.image}
                        alt={app.title}
                        className="w-full h-full object-cover max-h-[340px]"
                      />

                      {/* Bounding box overlays */}
                      {isOverlayOn &&
                        app.boundingOverlays.map((ov, oIdx) => (
                          <div
                            key={oIdx}
                            className="absolute transition-all duration-200"
                            style={{
                              left: `${ov.x}%`,
                              top: `${ov.y}%`,
                              width: `${ov.width}%`,
                              height: `${ov.height}%`,
                            }}
                          >
                            <div
                              className={`w-full h-full border-2 rounded ${
                                ov.status === 'pass'
                                  ? 'border-emerald-400 bg-emerald-500/10'
                                  : 'border-rose-500 bg-rose-500/20'
                              }`}
                            >
                              <div
                                className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded -mt-5 inline-block text-white shadow ${
                                  ov.status === 'pass' ? 'bg-emerald-600' : 'bg-rose-600'
                                }`}
                              >
                                {ov.label}
                              </div>
                            </div>
                          </div>
                        ))}

                      {/* Overlay Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleOverlay(app.id)}
                        className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-semibold bg-black/70 hover:bg-black text-white rounded backdrop-blur-sm border border-white/20 transition-colors flex items-center gap-1.5 z-10 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#00D2FF]" />
                        <span>{isOverlayOn ? 'Hide Annotations' : 'Show Annotations'}</span>
                      </button>
                    </div>

                    {/* Customer Problem & Inspected Product (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4 text-amber-600" />
                          <span>The Customer's Problem:</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {app.customerProblem}
                        </p>
                      </div>

                      {/* Input vs Output Description */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-lg border border-slate-200 space-y-1">
                          <span className="font-semibold text-slate-700">Example Input:</span>
                          <p className="text-slate-600 leading-relaxed text-[11px]">
                            {app.exampleInputDescription}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-lg border border-slate-200 bg-blue-50/60 space-y-1">
                          <span className="font-semibold text-[#0066FF]">Example Inspection Output:</span>
                          <p className="text-slate-700 leading-relaxed text-[11px] font-mono">
                            {app.exampleOutputDescription}
                          </p>
                        </div>
                      </div>

                      {/* Accepted vs Rejected Criteria */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/60 space-y-1">
                          <span className="font-semibold text-emerald-800 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Accepted Criteria:</span>
                          </span>
                          <p className="text-slate-700 text-[11px]">
                            {app.acceptedVsRejectedDetails.acceptedCriteria}
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-200/60 space-y-1">
                          <span className="font-semibold text-rose-800 flex items-center gap-1">
                            <X className="w-3.5 h-3.5" />
                            <span>Rejected Criteria:</span>
                          </span>
                          <p className="text-slate-700 text-[11px]">
                            {app.acceptedVsRejectedDetails.rejectedCriteria}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5-Step Inspection Process Workflow Bar */}
                  <div className="pt-6 border-t border-slate-200 space-y-3">
                    <div className="text-xs font-mono font-bold text-[#0066FF] uppercase">
                      The 5-Stage Inspection Process Workflow
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                      {app.inspectionProcess.map((step) => (
                        <div
                          key={step.stepNumber}
                          className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-xs"
                        >
                          <div className="text-[10px] font-mono font-bold text-[#0066FF]">
                            Stage {step.stepNumber}
                          </div>
                          <div className="font-bold text-slate-800 text-[11px]">
                            {step.name}
                          </div>
                          <p className="text-[10px] text-slate-500 leading-snug">
                            {step.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expected Business Value & CTA Bar */}
                  <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5 flex-1">
                      <div className="text-xs font-semibold text-slate-800">
                        Expected Business Value Delivered:
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                        {app.expectedBusinessValue.map((val, vIdx) => (
                          <div key={vIdx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={`/contact?application=${encodeURIComponent(app.title)}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
                    >
                      <span>Discuss a Custom Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
