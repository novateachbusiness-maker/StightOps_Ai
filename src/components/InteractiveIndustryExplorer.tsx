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
    <div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: 'rgba(8, 25, 55, 0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(56, 189, 248, 0.22)',
      }}
    >
      {/* Horizontal tab navigation */}
      <div
        className="p-3 overflow-x-auto scrollbar-none"
        style={{ background: 'rgba(2, 8, 23, 0.65)', borderBottom: '1px solid rgba(56, 189, 248, 0.15)' }}
      >
        <div className="flex items-center gap-1.5 min-w-max">
          {INDUSTRIES.map((ind, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <div key={ind.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2`}
                  style={
                    isSelected
                      ? { background: '#2563EB', color: '#ffffff', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.45)' }
                      : { background: 'rgba(56, 189, 248, 0.08)', color: '#CBD5E1', border: '1px solid rgba(56, 189, 248, 0.15)' }
                  }
                >
                  <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
                  <span>{ind.title}</span>
                </button>
                {idx < INDUSTRIES.length - 1 && (
                  <div className="w-4 flex items-center justify-center select-none" style={{ color: 'rgba(56, 189, 248, 0.3)' }}>
                    ·
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div className="p-4 sm:p-6 transition-opacity duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left: title + one-liner + CTAs */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase" style={{ color: '#00E5FF' }}>
                <span>Sector Focus</span>
                <span aria-hidden="true">·</span>
                <span>0{selectedIndex + 1} of 0{INDUSTRIES.length}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                {currentIndustry.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {conciseDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/industries/${currentIndustry.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white rounded-lg transition-all shadow-md"
                style={{ background: '#2563EB' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#2563EB')}
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/contact?industry=${encodeURIComponent(currentIndustry.title)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white rounded-lg transition-colors"
                style={{
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  background: 'rgba(56, 189, 248, 0.08)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(56, 189, 248, 0.18)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(56, 189, 248, 0.08)')}
              >
                <span>Get a Quote</span>
              </Link>
            </div>
          </div>

          {/* Right: sector image */}
          <div className="lg:col-span-5">
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl"
              style={{ border: '1px solid rgba(56, 189, 248, 0.25)', background: '#020817' }}
            >
              <img
                src={currentIndustry.image}
                alt={currentIndustry.title}
                className="w-full h-64 sm:h-72 object-cover"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(2, 8, 23, 0.65) 0%, transparent 55%)',
                }}
              />
              {/* Sector badge */}
              <div
                className="absolute bottom-3 left-3 px-3 py-1 rounded-lg text-xs font-mono font-bold"
                style={{
                  background: 'rgba(2, 8, 23, 0.80)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  color: '#00E5FF',
                }}
              >
                {currentIndustry.title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
