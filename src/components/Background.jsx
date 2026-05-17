import React, { useEffect, useState } from 'react'

export default function Background() {
  // Disable UnicornStudio on mobile — too GPU-intensive
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent))
  );

  useEffect(() => {
    if (isMobile) return; // Skip on mobile

    // Delay initialization to let main content render first
    const timer = setTimeout(() => {
      if (!window.UnicornStudio) {
        window.UnicornStudio = { isInitialized: false };
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
        script.onload = () => {
          if (!window.UnicornStudio.isInitialized) {
            window.UnicornStudio.init();
            window.UnicornStudio.isInitialized = true;
          }
        };
        document.body.appendChild(script);
      } else if (window.UnicornStudio && window.UnicornStudio.init && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    }, 2000); // 2s delay

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <>
      <div className="fixed inset-0 -z-30 bg-[#000000]" />
      
      {isMobile ? (
        /* ── Mobile: Lightweight CSS-only animated aura ── */
        <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
          {/* Blob 1 — blue glow top-left */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '-30%',
              width: '80vw',
              height: '80vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(56,189,248,0.04) 40%, transparent 70%)',
              animation: 'blobFloat1 12s ease-in-out infinite',
              willChange: 'transform',
            }}
          />
          {/* Blob 2 — purple glow center-right */}
          <div
            style={{
              position: 'absolute',
              top: '30%',
              right: '-20%',
              width: '70vw',
              height: '70vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(99,102,241,0.03) 40%, transparent 70%)',
              animation: 'blobFloat2 15s ease-in-out infinite',
              willChange: 'transform',
            }}
          />
          {/* Blob 3 — cyan glow bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '-10%',
              left: '10%',
              width: '60vw',
              height: '60vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(56,189,248,0.02) 40%, transparent 70%)',
              animation: 'blobFloat3 18s ease-in-out infinite',
              willChange: 'transform',
            }}
          />
        </div>
      ) : (
        /* ── Desktop: UnicornStudio WebGL background ── */
        <div 
          className="fixed top-0 w-full h-screen -z-20 saturate-50 blur-md brightness-75 mix-blend-screen opacity-30 pointer-events-none" 
          data-alpha-mask="80" 
          style={{ 
            maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)' 
          }}
        >
          <div 
            className="top-0 w-full h-screen -z-20 absolute saturate-150 pointer-events-none" 
            data-alpha-mask="80" 
            style={{
              maskImage: 'linear-gradient(transparent, black 0%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(transparent, black 0%, black 80%, transparent)'
            }}
          >
            <div data-us-project="vi5SxDwDvEJMwkyTdyH8" className="absolute top-0 left-0 -z-20 w-full h-full pointer-events-none"></div>
          </div>
        </div>
      )}
    </>
  )
}
