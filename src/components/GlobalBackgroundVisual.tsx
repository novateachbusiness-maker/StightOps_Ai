import { useState, useEffect } from 'react';

export interface GlobalVisualSlide {
  id: string;
  title: string;
  badge: string;
  image: string;
  video?: string;
}

export const GLOBAL_BACKGROUND_VISUALS: GlobalVisualSlide[] = [
  {
    id: 'robotic-inspection',
    title: 'Automated Robotic & Laser In-Line Inspection',
    badge: 'Automotive & Machining Vision',
    image: '/assets/hero/clean-robotic-inspection.jpg',
  },
  {
    id: 'pcb-telecentric',
    title: 'Sub-Micron Telecentric PCB & SMT Inspection',
    badge: 'Electronics & PCB AOI',
    image: '/assets/hero/clean-pcb-inspection.jpg',
  },
  {
    id: 'edge-ai-telemetry',
    title: 'Edge AI Quality Control & Factory Telemetry',
    badge: 'Edge GPU Intelligence',
    image: '/assets/hero/clean-manufacturing-monitor.jpg',
  },
];

export function GlobalBackgroundVisual() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Detect user prefers-reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Subtle auto-transition between 3 visuals (every 8s) if not reduced motion
  useEffect(() => {
    if (isReducedMotion) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % GLOBAL_BACKGROUND_VISUALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isReducedMotion]);

  const handleVideoError = (slideId: string) => {
    setVideoErrors((prev) => ({ ...prev, [slideId]: true }));
  };

  return (
    <aside
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 2-3 Distinct High-Quality Visuals with Smooth Cross-Fade */}
      {GLOBAL_BACKGROUND_VISUALS.map((slide, sIdx) => {
        const isActive = activeSlide === sIdx;
        const hasVideoError = videoErrors[slide.id];
        const shouldRenderVideo = Boolean(slide.video && !hasVideoError && isActive && !isReducedMotion);

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {shouldRenderVideo && (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={slide.image}
                onTimeUpdate={(e) => {
                  // Guarantee: Every background video plays for at most 10 seconds per loop
                  const v = e.currentTarget;
                  if (v.currentTime >= 10.0) {
                    v.currentTime = 0;
                    v.play().catch(() => {});
                  }
                }}
                onError={() => handleVideoError(slide.id)}
                className="w-full h-full object-cover object-center"
                style={{ minWidth: '100%', minHeight: '100%' }}
              >
                <source src={slide.video} type="video/mp4" />
              </video>
            )}
          </div>
        );
      })}

      {/* Global Precision Dark Overlay Matching Reference Hero Style */}
      {/* 1. Base Darkening Layer to Mute Raw Photographic Highlights */}
      <div className="absolute inset-0 bg-slate-950/75 pointer-events-none" />

      {/* 2. Directional Gradient Overlay for Optimal Text Readability & Deep Tech Ambiance */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/30 to-slate-950/70 pointer-events-none" />

      {/* 3. Subtle Precision Industrial Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 210, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 210, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </aside>
  );
}
