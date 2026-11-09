import { useState, useEffect, useRef } from 'react';
import { X, Cpu, ExternalLink } from 'lucide-react';

/**
 * Development status popup — shown once per browser session via sessionStorage.
 * Respects prefers-reduced-motion, closes on Escape, traps focus while open.
 */
export function DevPopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const shown = sessionStorage.getItem('sightops_dev_popup_seen');
    if (!shown) {
      // Small delay so the page renders first
      const t = setTimeout(() => {
        setMounted(true);
        setTimeout(() => {
          setVisible(true);
          sessionStorage.setItem('sightops_dev_popup_seen', '1');
          // Focus close button when popup appears
          setTimeout(() => closeRef.current?.focus(), 50);
        }, 60);
      }, 1600);
      return () => clearTimeout(t);
    }
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [visible]);

  // Trap focus inside the dialog
  useEffect(() => {
    if (!visible || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [visible]);

  function close() {
    setVisible(false);
    setTimeout(() => setMounted(false), 350);
  }

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dev-popup-title"
      aria-describedby="dev-popup-desc"
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-opacity ${
        isReducedMotion ? '' : 'duration-300'
      } ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#020817]/75 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        className={`relative max-w-md w-full rounded-2xl border border-[#38BDF8]/30 shadow-2xl shadow-black/60 overflow-hidden ${
          isReducedMotion ? '' : `transition-all duration-300 ${visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`
        }`}
        style={{
          background: 'rgba(8, 25, 55, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Top accent bar */}
        <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #2563EB 0%, #38BDF8 50%, #00E5FF 100%)' }} />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(37, 99, 235, 0.25)', border: '1px solid rgba(56, 189, 248, 0.35)' }}
            >
              <Cpu className="w-5 h-5" style={{ color: '#00E5FF' }} />
            </div>
            <div>
              <div
                className="text-[10px] font-mono font-bold uppercase tracking-widest mb-0.5"
                style={{ color: '#00E5FF' }}
              >
                System Status
              </div>
              <h2
                id="dev-popup-title"
                className="text-base font-extrabold text-white leading-tight"
              >
                SightOps AI is Under Development
              </h2>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2"
            style={{ '--tw-ring-color': '#00E5FF' } as React.CSSProperties}
            aria-label="Close notification"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div id="dev-popup-desc" className="px-6 pb-6 space-y-4">
          {/* Status indicator */}
          <div className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: '#00E5FF', boxShadow: '0 0 8px #00E5FF' }}
            />
            <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: '#38BDF8' }}>
              Active Development
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            We are actively developing and improving SightOps AI to deliver intelligent industrial AI solutions.
            The platform you see today represents our early engineering foundation.
          </p>

          {/* Attribution card */}
          <div
            className="rounded-xl p-4 space-y-2.5"
            style={{
              background: 'rgba(37, 99, 235, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
            }}
          >
            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider" style={{ color: '#38BDF8' }}>
              Development Support
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00E5FF' }} />
                <span className="text-sm font-bold text-white">Shah Tishy</span>
              </div>
              <span className="hidden sm:block text-slate-500">·</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#3B82F6' }} />
                <span className="text-sm font-bold text-white">Python Community India</span>
              </div>
            </div>
          </div>

          {/* Action row */}
          <div className="flex items-center justify-between pt-1">
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: '#38BDF8' }}
              onClick={close}
            >
              <span>Contact our team</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 text-xs font-bold text-white rounded-lg transition-colors"
              style={{ background: 'rgba(37, 99, 235, 0.8)', border: '1px solid rgba(56, 189, 248, 0.4)' }}
            >
              Continue to Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
