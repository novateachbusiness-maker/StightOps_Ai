import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ShieldCheck, Factory } from 'lucide-react';
import { INDUSTRIES } from '../data/industries.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function IndustriesPage() {
  return (
    <div className="py-12 bg-[#F4F8F8] min-h-screen">
      <SeoHead
        title="Manufacturing Industries Served"
        description="Industrial machine vision solutions engineered for electronics & PCB assembly, automotive components, pharmaceutical packaging, semiconductors, and logistics."
        canonicalPath="/industries"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Industries', path: '/industries' }]} />

        {/* Header */}
        <div className="space-y-4 mb-12 max-w-3xl">
          <div className="text-xs font-semibold text-[#087F8C] font-mono uppercase tracking-wider">
            Sector Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E52] tracking-tight">
            Industries & Manufacturing Applications
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every production environment brings distinct mechanical challenges: oil mist in automotive machining, washdown chemicals in bottling, electrostatic risks in electronics, or 21 CFR Part 11 audit trails in pharmaceutical packaging.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.id}
              className="bg-white rounded-xl border border-[#DCE7E8] overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#087F8C] transition-all group"
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

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="text-[11px] font-semibold text-[#064E52]">
                      Typical Inspection Points:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {industry.keyApplications.slice(0, 2).map((app, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#087F8C] font-bold">›</span>
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
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#064E52] group-hover:bg-[#087F8C] rounded-lg transition-colors text-center shadow-sm"
                >
                  <span>Explore Industry Challenges</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Box */}
        <div className="mt-16 bg-white p-6 rounded-xl border border-[#DCE7E8] text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#064E52] text-sm">
            <ShieldCheck className="w-4 h-4 text-[#087F8C]" />
            <span>Industrial Engineering Integrity</span>
          </div>
          <p className="leading-relaxed">
            Stightops Ai presents verified engineering principles and optical testing methodologies. We do not claim client names, proprietary installations, or unverified performance figures without formal contractual authorization.
          </p>
        </div>
      </div>
    </div>
  );
}
