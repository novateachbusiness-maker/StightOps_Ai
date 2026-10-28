import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ShieldCheck, Factory, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { INDUSTRIES } from '../data/industries.ts';
import { InteractiveIndustryExplorer } from '../components/InteractiveIndustryExplorer.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function IndustriesPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SeoHead
        title="Manufacturing Industries Served | SightOps AI"
        description="Explore SightOps AI machine vision systems across 5 core sectors: Automotive, Electronics & PCB, Food & Packaging, Logistics, and Pharmaceuticals."
        canonicalPath="/industries"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Industries', path: '/industries' }]} />

        {/* Header */}
        <div className="space-y-4 mb-10 max-w-3xl">
          <div className="text-xs font-semibold text-[#0066FF] font-mono uppercase tracking-wider">
            Sector Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            5 Core Manufacturing Industry Sectors
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Industrial inspection requirements vary radically by manufacturing discipline. SightOps AI designs vision stations engineered for the physical, optical, and regulatory demands of each sector.
          </p>
        </div>

        {/* Interactive Industry Transition Explorer Widget */}
        <div className="mb-16">
          <InteractiveIndustryExplorer />
        </div>

        {/* In-Depth Sector Cards */}
        <div className="space-y-3 mb-8">
          <div className="text-xs font-mono font-bold text-[#0066FF] uppercase">
            Sector Profiles & Inspection Points
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Comprehensive Industry Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#0066FF] transition-all group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white text-base font-bold">
                    {industry.title}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {industry.heroSummary}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                      <span>Inspection Challenge:</span>
                    </span>
                    <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                      {industry.customerChallenge}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-700">
                      Primary Applications:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {industry.keyApplications.slice(0, 2).map((app, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#0066FF] font-bold">›</span>
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
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors text-center shadow-sm"
                >
                  <span>Explore Sector Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Box */}
        <div className="mt-16 bg-white p-6 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#0066FF] text-sm">
            <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
            <span>Industrial Engineering Integrity</span>
          </div>
          <p className="leading-relaxed">
            SightOps AI presents verified engineering principles and optical testing methodologies. We do not claim client names, proprietary installations, or unverified performance figures without formal contractual authorization.
          </p>
        </div>
      </div>
    </div>
  );
}
