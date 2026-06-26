import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div 
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gray-900 pointer-events-none z-[10000] flex items-center justify-center transition-all duration-100 ease-out mix-blend-difference"
      style={{ 
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        opacity: position.x > 0 ? 1 : 0,
        borderColor: 'rgba(255, 255, 255, 0.8)' // white border for mix-blend-difference
      }}
    >
      <div 
        className="w-1.5 h-1.5 rounded-full" 
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      />
    </div>
  );
}
