import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Camera, Binary, Network, CheckCircle2, AlertTriangle, Layers, Sliders, ArrowRight } from 'lucide-react';
import { TECHNOLOGIES, TechnologyItem } from '../data/technologies.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function TechnologiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Optics & Sensing',
    'Algorithm & AI',
    'Industrial Computing',
    'Factory Integration',
  ];

  const filteredTechnologies = TECHNOLOGIES.filter((t) =>
    selectedCategory === 'All' ? true : t.category === selectedCategory
  );

  return (
    <div className="py-12 bg-[#F4F8F8] min-h-screen">
      <SeoHead
        title="Vision Technologies: Optics, Algorithms, Edge AI & PLC Integration"
        description="Comprehensive technical analysis of industrial cameras, telecentric optics, traditional OpenCV algorithms vs deep learning segmentation, and PLC I/O."
        canonicalPath="/technologies"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Technologies', path: '/technologies' }]} />

        {/* Header */}
        <div className="space-y-4 mb-12 max-w-3xl">
          <div className="text-xs font-semibold text-[#087F8C] font-mono uppercase tracking-wider">
            Engineering Foundations
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E52] tracking-tight">
            Industrial Vision Technology Stack
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Industrial machine vision requires disciplined trade-offs. We choose algorithms and optics based on physics, cycle times, and repeatabilities—never forcing AI where deterministic classical filters provide superior precision and lower latency.
          </p>
        </div>

        {/* Rule-Based vs Deep Learning Comparison Matrix Banner */}
        <div className="bg-white rounded-2xl border border-[#DCE7E8] p-8 shadow-sm mb-12">
          <div className="space-y-2 mb-6">
            <div className="text-xs font-mono font-bold text-[#087F8C] uppercase tracking-wider">
              Architecture Strategy
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#064E52]">
              Rule-Based vs. AI-Based Inspection: The Technical Trade-Off
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Understanding when to deploy mathematical edge detectors vs. deep learning anomaly segmentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rule-Based Card */}
            <div className="p-6 rounded-xl bg-[#F4F8F8] border border-[#DCE7E8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#064E52]">Traditional Rule-Based Vision</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  2ms – 10ms Latency
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operates via deterministic mathematical filters: Sobel/Canny edge detection, morphology, contour tracing, and sub-pixel polynomial fitting.
              </p>
              <div className="pt-2 border-t border-[#DCE7E8] space-y-1.5 text-xs">
                <div className="font-semibold text-slate-800">Best Deployed For:</div>
                <ul className="space-y-1 text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#18B6A4] shrink-0" />
                    <span>Sub-pixel dimensional metrology and GD&T</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#18B6A4] shrink-0" />
                    <span>High-contrast presence/absence verification</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#18B6A4] shrink-0" />
                    <span>High-speed 1D/2D barcode symbol decoding</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* AI Deep Learning Card */}
            <div className="p-6 rounded-xl bg-[#F4F8F8] border border-[#DCE7E8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#064E52]">AI & Deep Learning Inspection</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#087F8C]/10 text-[#087F8C] rounded">
                  15ms – 40ms Latency
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operates via hierarchical convolutional neural networks (CNNs) and vision transformers trained on representative surface samples.
              </p>
              <div className="pt-2 border-t border-[#DCE7E8] space-y-1.5 text-xs">
                <div className="font-semibold text-slate-800">Best Deployed For:</div>
                <ul className="space-y-1 text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#18B6A4] shrink-0" />
                    <span>Organic surface defects (scratches, pits, stains)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#18B6A4] shrink-0" />
                    <span>Variable backgrounds (castings, fabric, wood grain)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#18B6A4] shrink-0" />
                    <span>Distinguishing cosmetic marks from functional cracks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#064E52] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-[#DCE7E8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredTechnologies.map((tech) => (
            <div
              key={tech.id}
              className="bg-white rounded-xl border border-[#DCE7E8] p-7 shadow-sm space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold text-[#087F8C]">
                    {tech.category}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-[#172B32]">{tech.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{tech.overview}</p>

                {/* When to use vs Simpler method */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200/50">
                    <div className="font-semibold text-emerald-800 text-[11px] mb-0.5">
                      When To Deploy:
                    </div>
                    <div className="text-slate-700">{tech.whenToUse}</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="font-semibold text-slate-700 text-[11px] mb-0.5">
                      When a Simpler Method Suffices:
                    </div>
                    <div className="text-slate-600">{tech.whenSimplerMethodSuffices}</div>
                  </div>
                </div>

                {/* Key Specs */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-semibold text-[#064E52]">
                    Technical Specifications:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {tech.keySpecifications.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#087F8C] font-bold">›</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Trade-off disclaimer */}
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
                <span className="font-semibold text-slate-600 not-italic">Trade-off: </span>
                {tech.tradeOffs}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-[#064E52] text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Need Architecture Guidance for Your Line?</h3>
            <p className="text-xs text-slate-200">
              Our vision engineers analyze your cycle times, part CAD models, and optical constraints to propose an optimal stack.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 text-xs font-bold text-[#064E52] bg-[#18B6A4] hover:bg-[#149d8d] rounded-lg transition-colors shadow whitespace-nowrap shrink-0"
          >
            Consult with Our Engineers
          </Link>
        </div>
      </div>
    </div>
  );
}
