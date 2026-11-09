import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, ShieldAlert } from 'lucide-react';
import { INDUSTRIES } from '../data/industries.ts';
import { InteractiveIndustryExplorer } from '../components/InteractiveIndustryExplorer.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function IndustriesPage() {
  return (
    <div className="py-8 bg-transparent min-h-screen">
      <SeoHead
        title="Industrial Vision Solutions | 5 Core Manufacturing Sectors | SightOpsAi"
        description="Explore SightOpsAi machine vision systems across 5 core sectors: Automotive, Electronics & PCB, Food & Packaging, Logistics, and Pharmaceuticals."
        canonicalPath="/industries"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Industries', path: '/industries' }]} />

        {/* Header */}
        <div className="space-y-3 mb-8 max-w-3xl">
          <div className="text-xs font-semibold font-mono uppercase tracking-wider" style={{ color: '#00E5FF' }}>
            Sector Overview
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white drop-shadow-sm tracking-tight">
            Industrial Vision Solutions
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Engineered optical inspection and automated vision stations designed for 5 core manufacturing sectors.
          </p>
        </div>

        {/* Interactive Industry Transition Explorer Widget */}
        <div className="mb-8">
          <InteractiveIndustryExplorer />
        </div>

        {/* In-Depth Sector Cards */}
        <div className="space-y-2 mb-6">
          <div
            className="text-xs font-mono font-bold uppercase w-fit px-3 py-1 rounded-full"
            style={{ color: '#00E5FF', background: 'rgba(0, 229, 255, 0.08)', border: '1px solid rgba(0, 229, 255, 0.2)' }}
          >
            Sector Specifications
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">
            Comprehensive Sector Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.id}
              className="rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all duration-300"
              style={{
                background: 'rgba(8, 25, 55, 0.55)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(56, 189, 248, 0.22)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 229, 255, 0.5)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56, 189, 248, 0.22)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div className="relative h-48 overflow-hidden" style={{ background: '#020817' }}>
                  {industry.video ? (
                    <video
                      src={industry.video}
                      poster={industry.videoPoster || industry.image}
                      muted
                      loop
                      playsInline
                      preload="none"
                      onMouseEnter={(e) => {
                        e.currentTarget.play().catch(() => {});
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <img
                      src={industry.videoPoster || industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  )}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(2, 8, 23, 0.85) 0%, transparent 60%)' }}
                  />
                  {industry.video && (
                    <div
                      className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold pointer-events-none"
                      style={{ background: 'rgba(2, 8, 23, 0.85)', color: '#00E5FF', border: '1px solid rgba(56, 189, 248, 0.3)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                      <span>LIVE PREVIEW</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-4 text-white text-base font-bold drop-shadow-sm pointer-events-none">
                    {industry.title}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {industry.heroSummary}
                  </p>

                  <div
                    className="p-3 rounded-lg text-xs space-y-1"
                    style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}
                  >
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      <span>Inspection Challenge:</span>
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2">
                      {industry.customerChallenge}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-200">
                      Primary Applications:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {industry.keyApplications.slice(0, 2).map((app, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span style={{ color: '#00E5FF' }} className="font-bold">›</span>
                          <span className="line-clamp-1">{app.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/industries/${industry.slug}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white rounded-lg transition-colors text-center shadow-sm"
                  style={{ background: '#2563EB' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#2563EB')}
                >
                  <span>Explore Sector Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Box */}
        <div
          className="mt-8 p-5 rounded-xl text-xs text-slate-300 space-y-1.5 shadow-md"
          style={{
            background: 'rgba(8, 25, 55, 0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(56, 189, 248, 0.22)',
          }}
        >
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <ShieldCheck className="w-4 h-4" style={{ color: '#00E5FF' }} />
            <span>Industrial Engineering Integrity</span>
          </div>
          <p className="leading-relaxed">
            SightOpsAi presents verified engineering principles and optical testing methodologies. All inspection capabilities are grounded in physical optics and verified feasibility trials.
          </p>
        </div>
      </div>
    </div>
  );
}
