import React, { useEffect } from 'react'

export default function Background() {
  useEffect(() => {
    // Load UnicornStudio script if it doesn't exist
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
  }, []);

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
