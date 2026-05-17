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
      
      {/* Background (component) added by Aura / UnicornStudio */}
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
    </>
  )
}
