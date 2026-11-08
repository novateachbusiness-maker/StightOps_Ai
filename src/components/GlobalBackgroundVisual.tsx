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
        backgroundColor: '#052A5E',
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

      {/* Blue tint: keeps white and sky blue text readable over every frame of the video */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(3, 34, 86, 0.66) 0%, rgba(3, 40, 98, 0.6) 50%, rgba(3, 30, 78, 0.68) 100%)',
        }}
      />

      {/* Precision grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(37, 232, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 232, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </aside>
  );
}
