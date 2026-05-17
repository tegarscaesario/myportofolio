import React, { useRef, useState } from 'react';

export default function TiltCard({ children }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Position of mouse inside the element
    let x, y;
    
    if (e.touches && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    // Calculate rotation (-10 to 10 degrees for a subtle tilt)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
    
    // Glare position in percentages
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div 
      className="w-full max-w-[420px]"
      style={{ 
        perspective: '1200px',
        animation: 'animationIn 0.8s ease-out 0.6s both' 
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleMouseMove}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
        className={`relative w-full aspect-[4/5] rounded-[30px] overflow-hidden border border-[#374151] shadow-[2.0px_4.0px_20px_-5px_rgba(0,0,0,0.8)] bg-[#000000] will-change-transform ${
          isHovering ? 'transition-none cursor-grab' : 'transition-all duration-500 ease-out cursor-default'
        }`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovering ? 1.02 : 1}, ${isHovering ? 1.02 : 1}, 1)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* The Card Content */}
        {children}

        {/* Glare/Spiral effect overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)`,
            zIndex: 20
          }}
        />
      </div>
    </div>
  );
}
