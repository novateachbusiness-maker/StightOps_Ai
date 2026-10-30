import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES } from '../data/industries.ts';

const SECTOR_DESCRIPTIONS: Record<string, string> = {
  'automotive': 'Precision inspection of components, assemblies, and surface defects.',
  'pcba-electronics': 'PCB inspection, component verification, and OCR.',
  'food-packaging': 'Product quality, packaging, and label inspection.',
  'logistics': 'Barcode reading, product identification, and tracking.',
  'pharmaceuticals': 'Packaging, labeling, and product verification.',
};

export function InteractiveIndustryExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentIndustry = INDUSTRIES[selectedIndex];
  const conciseDesc =
    SECTOR_DESCRIPTIONS[currentIndustry.slug] ?? currentIndustry.tagline;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl overflow-hidden">
      {/* Horizontal tab navigation */}
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

      {/* Detail panel — compact */}
      <div className="p-4 sm:p-6 transition-opacity duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left: title + one-liner + CTAs */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0066FF] uppercase">
                <span>Sector Focus</span>
                <span aria-hidden="true">·</span>
                <span>0{selectedIndex + 1} of 0{INDUSTRIES.length}</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {currentIndustry.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {conciseDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/industries/${currentIndustry.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow-sm"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/contact?industry=${encodeURIComponent(currentIndustry.title)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors"
              >
                <span>Get a Quote</span>
              </Link>
            </div>
          </div>

          {/* Right: sector image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md">
              <img
                src={currentIndustry.image}
                alt={currentIndustry.title}
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
