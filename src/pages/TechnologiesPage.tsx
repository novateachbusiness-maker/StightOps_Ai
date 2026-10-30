import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Camera, Binary, Network, CheckCircle2, AlertTriangle, Layers, Sliders, ArrowRight } from 'lucide-react';
import { TECHNOLOGY_EXPLORER_ITEMS } from '../data/technologies.ts';
import { InteractiveTechnologyExplorer } from '../components/InteractiveTechnologyExplorer.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function TechnologiesPage() {
  return (
    <div className="py-8 bg-transparent min-h-screen">
      <SeoHead
        title="Vision Technologies: Optics, Algorithms, Edge AI & Hardware | SightOpsAi"
        description="Explore SightOpsAi machine vision technology stack: deep learning anomaly models, object detection, sub-pixel metrology, telecentric optics, and camera SDKs."
        canonicalPath="/technologies"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Technologies', path: '/technologies' }]} />

        {/* Header */}
        <div className="space-y-3 mb-8 max-w-3xl">
          <div className="text-xs font-semibold text-[#00D2FF] font-mono uppercase tracking-wider bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 w-fit">
            Engineering Foundations
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
            Industrial Vision Technology Stack
          </h1>
          <p className="text-sm text-slate-200 leading-relaxed">
            Industrial machine vision demands disciplined engineering trade-offs. We choose algorithms and optics based on physics, cycle times, and repeatabilities—never forcing AI where deterministic classical filters provide superior precision and lower latency.
          </p>
        </div>

        {/* Interactive Technology Explorer Widget */}
        <div className="mb-10">
          <InteractiveTechnologyExplorer />
        </div>

        {/* Rule-Based vs Deep Learning Comparison Matrix Banner */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-8 shadow-xl mb-16">
          <div className="space-y-2 mb-6">
            <div className="text-xs font-mono font-bold text-[#0066FF] uppercase tracking-wider">
              Architecture Strategy
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Rule-Based vs. AI-Based Inspection: The Technical Trade-Off
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Understanding when to deploy mathematical edge detectors vs. deep learning anomaly segmentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rule-Based Card */}
            <div className="hover-card-panel p-6 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">Traditional Rule-Based Vision</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  2ms – 10ms Latency
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operates via deterministic mathematical filters: Sobel/Canny edge detection, morphology, contour tracing, and sub-pixel polynomial fitting.
              </p>
              <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs">
                <div className="font-semibold text-slate-800">Best Deployed For:</div>
                <ul className="space-y-1 text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Sub-pixel dimensional metrology and GD&T tolerances</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>High-contrast presence/absence verification</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>High-speed 1D/2D barcode symbol decoding</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* AI Deep Learning Card */}
            <div className="hover-card-panel p-6 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">AI & Deep Learning Inspection</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-blue-100 text-[#0066FF] rounded">
                  15ms – 40ms Latency
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operates via hierarchical convolutional neural networks (CNNs) and vision transformers trained on representative surface samples.
              </p>
              <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs">
                <div className="font-semibold text-slate-800">Best Deployed For:</div>
                <ul className="space-y-1 text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                    <span>Organic surface defects (scratches, pits, stains, chatter)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                    <span>Variable backgrounds (castings, fabric, wood grain)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                    <span>Distinguishing cosmetic marks from functional cracks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Need Architecture Guidance for Your Line?</h3>
            <p className="text-xs text-slate-300">
              Our vision engineers analyze your cycle times, part CAD models, and optical constraints to propose an optimal stack.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow whitespace-nowrap shrink-0"
          >
            Consult with Our Engineers
          </Link>
        </div>
      </div>
    </div>
  );
}
