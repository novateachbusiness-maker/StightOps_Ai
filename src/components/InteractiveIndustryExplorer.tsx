import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, CheckCircle2, ShieldAlert, Cpu, Wrench } from 'lucide-react';
import { INDUSTRIES, Industry } from '../data/industries.ts';

export function InteractiveIndustryExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentIndustry = INDUSTRIES[selectedIndex];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Fixed Horizontal Navigation Buttons with subtle visual connector */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {INDUSTRIES.map((ind, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <div key={ind.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#0066FF] text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
                  <span>{ind.title}</span>
                </button>
                {/* Visual Connector between buttons */}
                {idx < INDUSTRIES.length - 1 && (
                  <div className="w-4 flex items-center justify-center text-slate-600 px-1 select-none">
                    ·
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Industry Detail View with subtle smooth fade transition */}
      <div className="p-6 sm:p-10 transition-opacity duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Content & Challenges (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0066FF] uppercase">
                <span>Sector Focus</span>
                <span aria-hidden="true">·</span>
                <span>0{selectedIndex + 1} of 0{INDUSTRIES.length}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentIndustry.title}
              </h3>
              <p className="text-sm font-medium text-[#0066FF]">
                {currentIndustry.tagline}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentIndustry.heroSummary}
              </p>
            </div>

            {/* Customer Challenge vs Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="hover-card-panel p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>The Inspection Challenge</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentIndustry.customerChallenge}
                </p>
              </div>

              <div className="hover-card-panel p-4 rounded-xl bg-blue-50/60 border border-blue-200/60 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0066FF]">
                  <Cpu className="w-4 h-4 text-[#0066FF] shrink-0" />
                  <span>The SightOps AI Solution</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentIndustry.proposedSolution}
                </p>
              </div>
            </div>

            {/* Expected Business Benefits */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-700">Expected Business Benefits:</div>
              <div className="space-y-1.5 text-xs text-slate-600">
                {currentIndustry.expectedBenefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Link
                to={`/industries/${currentIndustry.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow-sm"
              >
                <span>Explore Full Sector Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/contact?industry=${encodeURIComponent(currentIndustry.title)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors"
              >
                <span>Consult on this Industry</span>
              </Link>
            </div>
          </div>

          {/* Right: Representative Image (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md group">
              <img
                src={currentIndustry.image}
                alt={currentIndustry.title}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Technologies Tag strip */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-white/20 text-xs">
                <div className="text-[10px] font-mono font-bold text-[#0066FF] uppercase tracking-wider mb-1">
                  Primary Vision Technologies:
                </div>
                <div className="flex flex-wrap gap-1">
                  {currentIndustry.suitableTechnologies.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
