import { useEffect, useState } from 'react';

const BACKGROUND_VIDEO = {
  desktop: '/assets/video/industrial-manufacturing-1080.mp4',
  mobile: '/assets/video/industrial-manufacturing-720.mp4',
  poster: '/assets/video/industrial-manufacturing-poster.jpg',
};

/**
 * One industrial manufacturing video, fixed behind every page.
 * Visitors who ask for reduced motion or Data Saver, and browsers where the
 * video cannot play, see the still poster instead.
 */
export function GlobalBackgroundVisual() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

    const chooseSource = () => {
      if (reducedMotion.matches || connection?.saveData) {
        setVideoSrc(null);
        return;
      }
      const isPhone = window.matchMedia('(max-width: 767px)').matches;
      setVideoSrc(isPhone ? BACKGROUND_VIDEO.mobile : BACKGROUND_VIDEO.desktop);
    };

    chooseSource();
    reducedMotion.addEventListener('change', chooseSource);
    return () => reducedMotion.removeEventListener('change', chooseSource);
  }, []);

  return (
    <aside
      className="fixed top-0 left-0 w-full h-lvh pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{
        backgroundColor: '#020817',
        backgroundImage: 'url(' + BACKGROUND_VIDEO.poster + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {videoSrc && (
        <video
          key={videoSrc}
          src={videoSrc}
          poster={BACKGROUND_VIDEO.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoSrc(null)}
          className="w-full h-full object-cover object-center"
        />
      )}

      {/* Premium dark overlay — keeps text readable, video visible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(2,8,23,0.80) 0%, rgba(2,10,30,0.74) 40%, rgba(2,10,30,0.72) 70%, rgba(2,8,23,0.84) 100%)',
        }}
      />

      {/* Precision grid — subtle tech aesthetic */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.12,
          backgroundImage:
            'linear-gradient(to right, rgba(56, 189, 248, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.25) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle blue vignette edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(2, 8, 23, 0.55) 100%)',
        }}
      />
    </aside>
  );
}
