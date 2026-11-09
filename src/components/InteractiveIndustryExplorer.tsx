import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Pause } from 'lucide-react';
import { INDUSTRIES } from '../data/industries.ts';

const SECTOR_DESCRIPTIONS: Record<string, string> = {
  'automotive-vision-inspection': 'Robotic welding assembly, machined powertrain scanning, and micro-defect detection at line cadence.',
  'electronics-pcb-inspection': 'High-density SMT verification, component orientation, battery assembly, and micro-BGA alignment.',
  'food-packaging-inspection': 'Automated high-speed liquid packaging, rotary capping, fill levels, and tamper seal verification.',
  'logistics-product-inspection': 'Multi-sided barcode scanning tunnels, parcel volumetrics, and aerospace cleanroom robotic assembly.',
  'pharmaceutical-inspection': 'Vial crimp closure integrity, sterile liquid fill inspection, and serialized blister pack verification.',
};

export function InteractiveIndustryExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentIndustry = INDUSTRIES[selectedIndex];
  const conciseDesc =
    SECTOR_DESCRIPTIONS[currentIndustry.slug] ?? currentIndustry.tagline;

  // Reset error state and start playback when tab changes
  useEffect(() => {
    setVideoError(false);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [selectedIndex]);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

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
                  className="px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
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
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                <span>Sector Focus</span>
                <span aria-hidden="true">·</span>
                <span>0{selectedIndex + 1} of 0{INDUSTRIES.length}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
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

          {/* Right: Interactive Sector Video Player */}
          <div className="lg:col-span-5">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl group"
              style={{ border: '1px solid rgba(56, 189, 248, 0.25)', background: '#020817' }}
            >
              {currentIndustry.video && !videoError ? (
                <video
                  ref={videoRef}
                  key={currentIndustry.id}
                  src={currentIndustry.video}
                  poster={currentIndustry.videoPoster || currentIndustry.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onError={() => setVideoError(true)}
                  className="w-full h-64 sm:h-72 object-cover"
                />
              ) : (
                <img
                  src={currentIndustry.videoPoster || currentIndustry.image}
                  alt={currentIndustry.title}
                  className="w-full h-64 sm:h-72 object-cover"
                />
              )}

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(2, 8, 23, 0.75) 0%, transparent 50%)',
                }}
              />

              {/* Top HUD: Inspection Feed Indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold"
                style={{
                  background: 'rgba(2, 8, 23, 0.85)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#00E5FF',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                <span>AI FEED · 100% IN-LINE</span>
              </div>

              {/* Top Right: Play / Pause toggle */}
              {currentIndustry.video && !videoError && (
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
                  style={{
                    background: 'rgba(2, 8, 23, 0.80)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                  }}
                  aria-label={isPlaying ? 'Pause inspection video' : 'Play inspection video'}
                  title={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* Bottom Sector badge */}
              <div
                className="absolute bottom-3 left-3 px-3 py-1 rounded-lg text-xs font-mono font-bold"
                style={{
                  background: 'rgba(2, 8, 23, 0.85)',
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
