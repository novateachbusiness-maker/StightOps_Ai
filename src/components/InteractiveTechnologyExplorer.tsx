import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight, Layers, Sliders, CheckCircle2, AlertCircle } from 'lucide-react';
import { TECHNOLOGY_EXPLORER_ITEMS, TechnologyItem } from '../data/technologies.ts';

export function InteractiveTechnologyExplorer() {
  const [selectedCategory, setSelectedCategory] = useState(TECHNOLOGY_EXPLORER_ITEMS[0].category);

  const activeItem =
    TECHNOLOGY_EXPLORER_ITEMS.find((t) => t.category === selectedCategory) ||
    TECHNOLOGY_EXPLORER_ITEMS[0];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl overflow-hidden">
      {/* Category Horizontal Buttons */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {TECHNOLOGY_EXPLORER_ITEMS.map((item) => {
            const isActive = item.category === selectedCategory;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedCategory(item.category)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#0066FF] text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span>{item.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Technology Content View */}
      <div className="p-4 sm:p-6 transition-opacity duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left: Explanations & Input/Output Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0066FF] uppercase">
                <Cpu className="w-3.5 h-3.5" />
                <span>{activeItem.category}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeItem.simpleExplanation}
              </p>
            </div>

            {/* Industrial Use Block */}
            <div className="hover-card-panel p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
              <div className="text-xs font-bold text-slate-800">
                Where It Is Used in Industrial Inspection:
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeItem.industrialUse}
              </p>
            </div>

            {/* Input & Output Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="hover-card-panel p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#087F8C]" />
                  <span>Example Input Image</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeItem.exampleInput}
                </p>
              </div>

              <div className="hover-card-panel p-3 rounded-xl bg-blue-50/70 border border-blue-200/70 space-y-1 shadow-xs">
                <div className="text-xs font-bold text-[#0066FF] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
                  <span>Resulting Inspection Output</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-mono text-[11px]">
                  {activeItem.exampleOutput}
                </p>
              </div>
            </div>

            {/* Supported Tools & Trade-offs */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-slate-700">Supported Technology Stack:</span>
                {activeItem.keyTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 italic pt-0.5">
                <span className="font-semibold text-slate-600 not-italic">Engineering Note: </span>
                {activeItem.tradeOffNotes}
              </p>
            </div>
          </div>

          {/* Right: Technology Image & Visual Demonstration (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md group">
              {activeItem.video ? (
                <video
                  key={activeItem.id}
                  src={activeItem.video}
                  poster={activeItem.videoPoster || activeItem.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-52 sm:h-60 object-cover"
                />
              ) : (
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className={`w-full h-52 sm:h-60 ${
                    activeItem.id === 'ai-deep-learning'
                      ? 'object-contain bg-slate-950'
                      : 'object-cover'
                  }`}
                />
              )}

              {activeItem.video && (
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 text-[#0066FF] border border-blue-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
                  <span>TECHNOLOGY FEED</span>
                </div>
              )}
            </div>

            {/* Caption Tag below image */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs shadow-xs">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">
                Representative Visual
              </div>
              <div className="font-semibold text-slate-800 text-xs">
                {activeItem.visualCaption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
