import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, AlertTriangle, CheckCircle2, ArrowRight, Layers, Sliders } from 'lucide-react';
import { APPLICATIONS, ApplicationCase } from '../data/applications.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeOverlays, setActiveOverlays] = useState<Record<string, boolean>>({
    'pcb-missing-smt-components': true,
    'metal-surface-scratch-porosity': true,
    'pharma-vial-ocr-datamatrix': true,
    'telecentric-precision-shaft-measurement': true,
  });

  const categories = [
    'All',
    'PCB & Electronics',
    'Machined Metal',
    'Packaging & Traceability',
    'Precision Metrology',
  ];

  function toggleOverlay(id: string) {
    setActiveOverlays((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  const filteredApplications = APPLICATIONS.filter((app) => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesSearch =
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.inspectionMethod.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-[#F4F8F8] min-h-screen">
      <SeoHead
        title="Inspection Applications & Technical Demonstrations"
        description="Searchable gallery of illustrative vision inspection benchmarks: PCB AOI, metal scratch detection, serialized OCR, and telecentric shaft metrology."
        canonicalPath="/applications"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Applications', path: '/applications' }]} />

        {/* Header */}
        <div className="space-y-4 mb-10 max-w-3xl">
          <div className="text-xs font-semibold text-[#087F8C] font-mono uppercase tracking-wider">
            Case Studies & Demonstrations
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E52] tracking-tight">
            Application Demonstrations Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Examine representative inspection benchmarks. Each example demonstrates the optical methodology, inspection algorithm, expected data outputs, and physical limitations.
          </p>
        </div>

        {/* Demonstration Disclaimer Banner */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 mb-8 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold">Illustrative Engineering Benchmarks:</span> The examples below are verified laboratory simulations and optical demonstrations based on industrial standards (such as IPC-A-610 and ISO/IEC 15415). They are not claims of specific named client deployments.
          </div>
        </div>

        {/* Search & Filter Tabs */}
        <div className="bg-white p-4 rounded-xl border border-[#DCE7E8] shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#064E52] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
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
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#DCE7E8] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#087F8C] focus:ring-1 focus:ring-[#087F8C]"
            />
          </div>
        </div>

        {/* Applications Gallery Grid */}
        <div className="space-y-10">
          {filteredApplications.map((app) => {
            const isOverlayOn = activeOverlays[app.id] ?? true;

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-[#DCE7E8] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Visual Viewport with Interactive Reticle Overlay (5 cols) */}
                <div className="lg:col-span-5 relative bg-slate-950 flex items-center justify-center min-h-[300px] lg:min-h-[380px] overflow-hidden select-none">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover max-h-[380px]"
                  />

                  {/* Simulated Overlays */}
                  {isOverlayOn &&
                    app.overlays.map((ov, idx) => (
                      <div
                        key={idx}
                        className="absolute transition-all duration-200"
                        style={{
                          left: `${ov.x}%`,
                          top: `${ov.y}%`,
                          width: ov.width ? `${ov.width}%` : 'auto',
                          height: ov.height ? `${ov.height}%` : 'auto',
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
                            className={`text-[9px] font-mono font-bold px-1 py-0.5 rounded -mt-5 inline-block text-white shadow ${
                              ov.status === 'pass' ? 'bg-emerald-600' : 'bg-rose-600'
                            }`}
                          >
                            {ov.label}
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Overlay Toggle Control in corner */}
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      type="button"
                      onClick={() => toggleOverlay(app.id)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-black/70 hover:bg-black text-white rounded backdrop-blur-sm border border-white/20 transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#18B6A4]" />
                      <span>{isOverlayOn ? 'Hide Annotations' : 'Show Annotations'}</span>
                    </button>
                  </div>

                  {/* Category Pill on bottom */}
                  <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-300 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10">
                    {app.tag} · {app.category}
                  </div>
                </div>

                {/* Technical Specifications (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <span className="font-semibold text-[#087F8C]">{app.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Benchmarked in Bengaluru Lab</span>
                    </div>

                    <h2 className="text-xl font-bold text-[#172B32]">{app.title}</h2>

                    <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                      <div>
                        <span className="font-bold text-[#064E52]">Inspection Objective: </span>
                        <span>{app.objective}</span>
                      </div>

                      <div>
                        <span className="font-bold text-[#064E52]">Optical & Algorithmic Method: </span>
                        <span>{app.inspectionMethod}</span>
                      </div>

                      <div>
                        <span className="font-bold text-[#064E52]">Deterministic Output: </span>
                        <span>{app.expectedOutput}</span>
                      </div>

                      <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/50 text-amber-900">
                        <span className="font-bold text-amber-800">Physical Limitation: </span>
                        <span>{app.knownLimitations}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-[11px] text-slate-500">
                      Have a similar component on your production line?
                    </div>

                    <Link
                      to={`/contact?application=${encodeURIComponent(app.title)}`}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#064E52] hover:bg-[#087F8C] rounded-lg transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Discuss Similar Application</span>
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
