import { useState } from 'react';
import { Eye } from 'lucide-react';

export interface BoundingTarget {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  boxes: {
    id: string;
    label: string;
    type: 'Defect Detected' | 'Component Detected' | 'OCR Region' | 'Inspection Area';
    status: 'pass' | 'fail' | 'warning';
    x: number; // percentage
    y: number; // percentage
    width: number; // percentage
    height: number; // percentage
    confidence: string;
    measurement: string;
    details: string;
  }[];
}

const INSPECTION_TARGETS: BoundingTarget[] = [
  {
    id: 'robotic-automotive',
    name: 'Automotive Robotic Flange Inspection',
    category: 'Automotive Vision',
    image: '/src/assets/images/solution_surface_defect_1792999691227.jpg',
    description: 'Robotic arm with laser profilometer inspecting CNC machined gear flanges for surface porosity and tool chatter.',
    boxes: [
      {
        id: 'box-gear-teeth',
        label: 'Gear Tooth Root Fillet',
        type: 'Inspection Area',
        status: 'pass',
        x: 42,
        y: 48,
        width: 22,
        height: 20,
        confidence: '99.2%',
        measurement: 'Radius: 2.45mm (Nominal 2.40-2.50mm)',
        details: 'Verified free of machining chatter marks',
      },
      {
        id: 'box-porosity',
        label: 'Sealing Face Porosity Pit',
        type: 'Defect Detected',
        status: 'fail',
        x: 68,
        y: 52,
        width: 14,
        height: 12,
        confidence: '97.8%',
        measurement: 'Pit Diameter: 0.38mm (Max allowed: 0.20mm)',
        details: 'Functional reject triggered to line PLC diverter',
      },
      {
        id: 'box-bore',
        label: 'Center Bore Concentricity',
        type: 'Inspection Area',
        status: 'pass',
        x: 28,
        y: 54,
        width: 16,
        height: 18,
        confidence: '99.5%',
        measurement: 'Concentricity Runout: 3.8µm',
        details: 'Within GD&T tolerance of 5.0µm',
      },
    ],
  },
  {
    id: 'pcb-aoi',
    name: 'High-Density SMT Circuit Assembly',
    category: 'Electronics & PCB',
    image: '/src/assets/images/case_study_pcb_1792999691900.jpg',
    description: 'Multi-angle RGB telecentric inspection verifying 0201 chip presence, solder fillet angles, and IC alignment.',
    boxes: [
      {
        id: 'box-qfn',
        label: 'IC_U4 (QFN-32)',
        type: 'Component Detected',
        status: 'pass',
        x: 36,
        y: 34,
        width: 24,
        height: 20,
        confidence: '99.6%',
        measurement: 'Offset: X+3µm, Y-2µm, Rot: 0.2°',
        details: 'Full lead coplanarity verified to IPC-A-610',
      },
      {
        id: 'box-tombstone',
        label: 'Capacitor C14 (0402)',
        type: 'Defect Detected',
        status: 'fail',
        x: 63,
        y: 33,
        width: 11,
        height: 10,
        confidence: '98.4%',
        measurement: 'Fillet Wet Angle: 82° (Tombstone)',
        details: 'Component lifted off pad during reflow phase',
      },
      {
        id: 'box-resistors',
        label: 'Resistor Network R12-R18',
        type: 'Component Detected',
        status: 'pass',
        x: 24,
        y: 54,
        width: 16,
        height: 12,
        confidence: '99.1%',
        measurement: 'Marking: 10kΩ 1% (Matched BOM)',
        details: 'Correct component polarity and value confirmed',
      },
    ],
  },
  {
    id: 'pharma-serialized',
    name: 'Pharmaceutical Serialization & Labeling',
    category: 'Pharmaceutical',
    image: '/assets/applications/pharma-inspection.jpg',
    description: 'Polarized coaxial strobe camera decoding 2D DataMatrix and serialized expiry codes on cartons at 450 ppm.',
    boxes: [
      {
        id: 'box-datamatrix',
        label: 'GS1 2D DataMatrix ECC 200',
        type: 'OCR Region',
        status: 'pass',
        x: 43,
        y: 63,
        width: 24,
        height: 16,
        confidence: '100%',
        measurement: 'ISO Grade: A (4.0/4.0) | Contrast: 84%',
        details: 'Payload: (01)00312345678906(21)SN10485739',
      },
      {
        id: 'box-lot-exp',
        label: 'Batch LOT & EXP Date OCV',
        type: 'OCR Region',
        status: 'pass',
        x: 42,
        y: 78,
        width: 30,
        height: 11,
        confidence: '99.4%',
        measurement: 'LOT: ABC1230 / EXP: 10/2026',
        details: 'Characters matched against active MES batch record',
      },
    ],
  },
];

export function InteractiveBoundingBoxViewer() {
  const [selectedTargetIndex, setSelectedTargetIndex] = useState(0);
  const [activeBoxId, setActiveBoxId] = useState<string | null>(null);

  const target = INSPECTION_TARGETS[selectedTargetIndex];
  const activeBox = target.boxes.find((b) => b.id === activeBoxId) || target.boxes[0];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 overflow-hidden shadow-xl">
      {/* Target Selector Tabs */}
      <div className="bg-slate-900 text-white px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#00D2FF]" />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
            Interactive Inspection System Explorer
          </span>
        </div>

        {/* Target Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {INSPECTION_TARGETS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setSelectedTargetIndex(idx);
                setActiveBoxId(null);
              }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                selectedTargetIndex === idx
                  ? 'bg-[#0066FF] text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Viewport - Clean Unannotated Industrial Image (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 relative min-h-[360px] sm:min-h-[460px] flex items-center justify-center overflow-hidden select-none">
          <img
            src={target.image}
            alt={target.name}
            className="w-full h-full object-cover max-h-[500px]"
          />
        </div>

        {/* Right Inspection Telemetry Panel (4 cols) */}
        <div className="lg:col-span-4 p-6 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-mono font-bold text-[#0066FF] uppercase tracking-wider">
                Inspection Detail
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">{target.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">{target.description}</p>
            </div>

            {/* List of Detected Bounding Regions */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="text-xs font-semibold text-slate-700">Detected Regions & Features:</div>
              <div className="space-y-1.5">
                {target.boxes.map((box) => {
                  const isSelected = activeBox.id === box.id;
                  const isDefect = box.status === 'fail';

                  return (
                    <button
                      key={box.id}
                      type="button"
                      onClick={() => setActiveBoxId(box.id)}
                      onMouseEnter={() => setActiveBoxId(box.id)}
                      className={`hover-card-interactive w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                        isSelected
                          ? isDefect
                            ? 'bg-rose-50 border-rose-300 ring-1 ring-rose-400'
                            : 'bg-white border-[#0066FF] ring-1 ring-[#0066FF]'
                          : 'bg-white/80 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-slate-800">{box.label}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{box.type}</div>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isDefect ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {box.status.toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Box Telemetry Card */}
            <div className="hover-card-panel p-3.5 bg-white rounded-lg border border-slate-200 shadow-xs space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">{activeBox.label}</span>
                <span className="font-mono text-[11px] text-[#0066FF] font-bold">
                  Conf: {activeBox.confidence}
                </span>
              </div>
              <div className="font-mono text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                {activeBox.measurement}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{activeBox.details}</p>
            </div>
          </div>

          {/* Honest Engineering Disclaimer */}
          <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-500">Representative Visual Demonstration: </span>
            The inspection parameters and classification criteria above demonstrate object localization and defect detection workflows. Production models are trained on customer-provided golden samples and defect catalogs.
          </div>
        </div>
      </div>
    </div>
  );
}
