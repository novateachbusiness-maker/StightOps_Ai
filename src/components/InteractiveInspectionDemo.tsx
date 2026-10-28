import { useState } from 'react';
import { Camera, CheckCircle2, XCircle, Sliders, Play, RotateCcw, Crosshair } from 'lucide-react';

interface InspectionSample {
  id: string;
  title: string;
  mode: 'ai-defect' | 'metrology' | 'ocr-barcode';
  imageUrl: string;
  partName: string;
  fov: string;
  exposureTime: string;
  cycleTime: string;
  overallStatus: 'PASS' | 'FAIL';
  overlayItems: {
    id: string;
    label: string;
    type: 'box' | 'caliper' | 'ocr' | 'crosshair';
    status: 'pass' | 'fail';
    coords: { x: number; y: number; width?: number; height?: number };
    metric: string;
    tolerance: string;
  }[];
}

const DEMO_SAMPLES: InspectionSample[] = [
  {
    id: 'pcb-smt',
    title: 'PCB Surface Mount (SMT) Assembly',
    mode: 'ai-defect',
    imageUrl: '/src/assets/images/solution_aoi_system_1792999689778.jpg',
    partName: 'Mainboard Rev 2.4 - SMT Array',
    fov: '120mm x 90mm',
    exposureTime: '1,200 µs (Strobed RGB)',
    cycleTime: '32.4 ms',
    overallStatus: 'FAIL',
    overlayItems: [
      {
        id: 'u1',
        label: 'QFP-48 Lead Coplanarity',
        type: 'box',
        status: 'pass',
        coords: { x: 38, y: 35, width: 22, height: 18 },
        metric: 'Offset: X+2.1µm, Y-1.4µm',
        tolerance: 'Limit: ±25µm',
      },
      {
        id: 'c1',
        label: '0402 Capacitor Tombstone',
        type: 'box',
        status: 'fail',
        coords: { x: 64, y: 34, width: 9, height: 8 },
        metric: 'Fillet Angle: 78° (Tombstone)',
        tolerance: 'IPC-A-610 Class 3: < 30°',
      },
      {
        id: 'r1',
        label: 'SMD Resistor Array R14-R18',
        type: 'box',
        status: 'pass',
        coords: { x: 26, y: 55, width: 14, height: 10 },
        metric: 'Polarity & Value: VERIFIED',
        tolerance: 'Match CAD BOM',
      },
    ],
  },
  {
    id: 'metal-gear',
    title: 'Automotive Precision Gear Flange',
    mode: 'metrology',
    imageUrl: '/src/assets/images/solution_surface_defect_1792999691227.jpg',
    partName: 'Transmission Output Pinion #4180',
    fov: '150mm x 150mm (Bi-telecentric)',
    exposureTime: '2,400 µs (Collimated Blue)',
    cycleTime: '18.2 ms',
    overallStatus: 'PASS',
    overlayItems: [
      {
        id: 'od',
        label: 'Outer Pitch Diameter (OD)',
        type: 'caliper',
        status: 'pass',
        coords: { x: 35, y: 32, width: 42, height: 36 },
        metric: 'Ø 124.018 mm',
        tolerance: '124.000 ± 0.025 mm',
      },
      {
        id: 'concentricity',
        label: 'Bore Concentricity Runout',
        type: 'crosshair',
        status: 'pass',
        coords: { x: 52, y: 56 },
        metric: 'Runout: 4.1 µm',
        tolerance: 'Max GD&T: 8.0 µm',
      },
    ],
  },
  {
    id: 'pharma-box',
    title: 'Pharmaceutical Serialized Label & Barcode',
    mode: 'ocr-barcode',
    imageUrl: '/src/assets/images/solution_ocr_barcode_1792999690125.jpg',
    partName: 'Carton Blister Pack Serialized Box',
    fov: '90mm x 65mm',
    exposureTime: '800 µs (Coaxial Polarized)',
    cycleTime: '14.6 ms',
    overallStatus: 'PASS',
    overlayItems: [
      {
        id: 'dm',
        label: '2D DataMatrix ECC 200',
        type: 'ocr',
        status: 'pass',
        coords: { x: 44, y: 64, width: 22, height: 14 },
        metric: 'ISO Grade: A (4.0/4.0) | GS1 Match',
        tolerance: 'Min Grade: C (2.0)',
      },
      {
        id: 'ocr',
        label: 'Batch LOT & EXP Date OCV',
        type: 'ocr',
        status: 'pass',
        coords: { x: 44, y: 79, width: 26, height: 9 },
        metric: 'LOT: ABC1230 / EXP: 10/2026',
        tolerance: 'Database Verified',
      },
    ],
  },
];

export function InteractiveInspectionDemo() {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [showOverlays, setShowOverlays] = useState(true);
  const [exposureLevel, setExposureLevel] = useState(1200);
  const [isSimulatingLine, setIsSimulatingLine] = useState(false);
  const [triggerCount, setTriggerCount] = useState(1482);

  const sample = DEMO_SAMPLES[selectedSampleIndex];

  function handleTrigger() {
    setTriggerCount((prev) => prev + 1);
  }

  return (
    <div className="bg-white rounded-xl border border-[#DCE7E8] overflow-hidden shadow-sm">
      {/* Top Controller Bar */}
      <div className="bg-[#064E52] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-[#087F8C]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#18B6A4]/20 text-[#18B6A4] flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#18B6A4]">
              Vision Controller Visualizer
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{sample.partName}</span>
              <span className="text-xs font-mono font-normal text-slate-300">[{sample.fov}]</span>
            </div>
          </div>
        </div>

        {/* Status Chip */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-bold tracking-wider ${
              sample.overallStatus === 'PASS'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
            }`}
          >
            {sample.overallStatus === 'PASS' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span>DECISION: {sample.overallStatus}</span>
          </div>

          <button
            onClick={handleTrigger}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 bg-[#18B6A4] hover:bg-[#149d8d] text-[#064E52] font-semibold text-xs rounded transition-colors whitespace-nowrap"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Trigger Frame #{triggerCount}</span>
          </button>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* Left: Interactive Viewport (3 cols) */}
        <div className="lg:col-span-3 bg-slate-950 relative min-h-[420px] lg:min-h-[480px] flex items-center justify-center overflow-hidden select-none">
          {/* Main Inspection Image */}
          <img
            src={sample.imageUrl}
            alt={sample.title}
            className="w-full h-full object-cover max-h-[520px] transition-all duration-200"
            style={{
              filter: `brightness(${0.7 + (exposureLevel / 3000) * 0.6}) contrast(1.05)`,
            }}
          />

          {/* Grid Overlay lines (subtle optical reticle) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(24, 182, 164, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(24, 182, 164, 0.4) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Crosshair Center Marker */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-16 h-16 border border-[#18B6A4] rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-[#18B6A4] rounded-full" />
            </div>
          </div>

          {/* Inspection Overlays */}
          {showOverlays &&
            sample.overlayItems.map((item) => (
              <div
                key={item.id}
                className="absolute transition-all duration-300"
                style={{
                  left: `${item.coords.x}%`,
                  top: `${item.coords.y}%`,
                  width: item.coords.width ? `${item.coords.width}%` : 'auto',
                  height: item.coords.height ? `${item.coords.height}%` : 'auto',
                }}
              >
                {/* Bounding Box Styling */}
                {item.type === 'box' && (
                  <div
                    className={`w-full h-full border-2 rounded ${
                      item.status === 'pass'
                        ? 'border-emerald-400 bg-emerald-500/10'
                        : 'border-rose-500 bg-rose-500/20 animate-pulse'
                    }`}
                  >
                    <div
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 whitespace-nowrap -mt-6 inline-block rounded shadow ${
                        item.status === 'pass' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {item.label}
                    </div>
                  </div>
                )}

                {/* Caliper Measurement Marker */}
                {item.type === 'caliper' && (
                  <div className="w-full h-full border-2 border-cyan-400/80 rounded-lg p-2 flex flex-col justify-between">
                    <div className="text-[10px] font-mono font-bold text-cyan-200 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40 w-fit">
                      {item.label}: <span className="text-white">{item.metric}</span>
                    </div>
                    <div className="text-[9px] font-mono text-cyan-300/80 bg-black/60 px-2 py-0.5 rounded w-fit">
                      Tol: {item.tolerance}
                    </div>
                  </div>
                )}

                {/* OCR Tag */}
                {item.type === 'ocr' && (
                  <div className="border border-emerald-400 bg-black/80 p-1.5 rounded shadow text-white font-mono text-[10px]">
                    <div className="text-emerald-300 font-bold">{item.label}</div>
                    <div className="text-slate-200">{item.metric}</div>
                  </div>
                )}

                {/* Crosshair Pinpoint */}
                {item.type === 'crosshair' && (
                  <div className="relative -ml-3 -mt-3">
                    <Crosshair className="w-6 h-6 text-emerald-400 animate-spin-slow" />
                    <div className="absolute left-7 top-0 text-[10px] font-mono bg-black/80 px-1.5 py-0.5 rounded text-white whitespace-nowrap">
                      {item.metric}
                    </div>
                  </div>
                )}
              </div>
            ))}

          {/* Telemetry Footer Badge inside viewer */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10">
            <div>
              FPS: <span className="text-[#18B6A4]">30.8</span> | Latency:{' '}
              <span className="text-white">{sample.cycleTime}</span>
            </div>
            <div className="hidden sm:block">
              Exposure: <span className="text-white">{exposureLevel} µs</span> | Shutter: Global
            </div>
            <div>
              Trigger: <span className="text-emerald-400">HARDWARE ENCODER</span>
            </div>
          </div>
        </div>

        {/* Right: Inspection Controls & Diagnostic Details (1 col) */}
        <div className="p-5 bg-white border-t lg:border-t-0 lg:border-l border-[#DCE7E8] flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Select Demonstration Target
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {DEMO_SAMPLES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSelectedSampleIndex(idx);
                      setExposureLevel(idx === 0 ? 1200 : idx === 1 ? 2400 : 800);
                    }}
                    className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      selectedSampleIndex === idx
                        ? 'bg-[#064E52] text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{s.partName}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Overlays Toggle */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Inspection Markings</span>
                <button
                  type="button"
                  onClick={() => setShowOverlays(!showOverlays)}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    showOverlays
                      ? 'bg-[#087F8C] text-white'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {showOverlays ? 'Visible' : 'Hidden'}
                </button>
              </div>

              {/* Exposure Slider */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                  <span className="flex items-center gap-1 font-medium">
                    <Sliders className="w-3 h-3 text-[#087F8C]" />
                    <span>Illumination Strobe</span>
                  </span>
                  <span className="font-mono text-[11px]">{exposureLevel} µs</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="3000"
                  step="100"
                  value={exposureLevel}
                  onChange={(e) => setExposureLevel(Number(e.target.value))}
                  className="w-full accent-[#087F8C] cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  aria-label="Exposure Strobe Slider"
                />
              </div>
            </div>

            {/* Metric Summary Card */}
            <div className="bg-[#F4F8F8] p-3 rounded-lg border border-[#DCE7E8] text-xs space-y-1.5">
              <div className="font-semibold text-[#064E52]">Inspection Findings</div>
              {sample.overlayItems.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-2 text-[11px]">
                  <span className="text-slate-600">{item.label}:</span>
                  <span
                    className={`font-mono font-medium ${
                      item.status === 'pass' ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reset / Notice */}
          <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 leading-relaxed">
            Illustrative engineering visualization based on optical parameters and algorithmic classification. Real-world validation performed on your test components.
          </div>
        </div>
      </div>
    </div>
  );
}
