import { useEffect, useState, useRef } from 'react';

const BACKGROUND_VIDEO = {
  desktop: '/assets/video/automotive-assembly.mp4',
  mobile: '/assets/video/automotive-assembly-mobile.mp4',
  poster: '/assets/video/automotive-assembly-poster.jpg',
  // Legacy paths preserved as fallback
  desktopFallback: '/assets/video/industrial-manufacturing-1080.mp4',
  mobileFallback: '/assets/video/industrial-manufacturing-720.mp4',
};

/**
 * Global Fixed Industrial Video Background
 * High-impact automotive robotic welding assembly footage fixed behind all website content.
 * Gracefully respects reduced motion and Data Saver modes by displaying the poster.
 */
export function GlobalBackgroundVisual() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Ensure DOM video properties are explicitly set so mobile Safari & Chrome never block autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || hasError) return;

    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Autoplay policy or low power mode - display poster fallback
        console.warn('Autoplay prevented by browser policy; showing poster fallback:', err);
      });
    }
  }, [videoSrc, hasError]);

  return (
    <aside
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{
        backgroundColor: '#020817',
        backgroundImage: `url(${BACKGROUND_VIDEO.poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      }}
    >
      {videoSrc && !hasError && (
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          poster={BACKGROUND_VIDEO.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => {
            // Attempt fallback to secondary path if primary fails
            if (videoSrc === BACKGROUND_VIDEO.desktop) {
              setVideoSrc(BACKGROUND_VIDEO.desktopFallback);
            } else if (videoSrc === BACKGROUND_VIDEO.mobile) {
              setVideoSrc(BACKGROUND_VIDEO.mobileFallback);
            } else {
              setHasError(true);
            }
          }}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
      )}

      {/* Dark transparent gradient overlay — maintains high contrast and readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(2,8,23,0.80) 0%, rgba(2,10,30,0.72) 40%, rgba(2,10,30,0.70) 70%, rgba(2,8,23,0.85) 100%)',
        }}
      />

      {/* Precision industrial grid HUD overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.12,
          backgroundImage:
            'linear-gradient(to right, rgba(56, 189, 248, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.25) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Radial edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(2, 8, 23, 0.65) 100%)',
        }}
      />
    </aside>
  );
}
