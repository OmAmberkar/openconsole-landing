import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';


export const MetallicCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Hide default cursor across the entire page
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    style.id = 'metallic-cursor-style';
    document.head.appendChild(style);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // We'll use GSAP quickTo for 60fps ultra-smooth cursor tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    const scaleTo = gsap.quickTo(cursor, "scale", { duration: 0.3, ease: "power4.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering something interactive
      if (
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('.interactive')
      ) {
        setIsHovering(true);
        scaleTo(1.5);
        if (svgRef.current) {
          gsap.to(svgRef.current, { filter: 'drop-shadow(0 0 10px #3b82f6) hue-rotate(90deg)', duration: 0.3 });
        }
      } else {
        setIsHovering(false);
        scaleTo(1);
        if (svgRef.current) {
          gsap.to(svgRef.current, { filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.5)) hue-rotate(0deg)', duration: 0.3 });
        }
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      const existingStyle = document.getElementById('metallic-cursor-style');
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className='fixed top-0 left-0 z-9999 pointer-events-none hidden md:block'
      style={{
        transform: 'translate(-2px, -2px)',
        transformOrigin: 'center center'
      }}
    >
      <svg
        ref={svgRef}
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{ transition: 'filter 0.3s ease' }}
      >
        <defs>
          <linearGradient id='metalGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#FFFFFF' />
            <stop offset='50%' stopColor='#E2E2E2' />
            <stop offset='100%' stopColor='#9CA3AF' />
          </linearGradient>

          <linearGradient id='metalShine' x1='100%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#FFFFFF' stopOpacity='0.8' />
            <stop offset='100%' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
        </defs>

        <path
          d='M2 2L10.5 26L14.5 16.5L24 12.5L2 2Z'
          fill='url(#metalGradient)'
          stroke={isHovering ? '#3b82f6' : 'white'}
          strokeWidth='1'
        />

        <path d='M4.5 5L10.5 21L13.5 14.5L20 11.5L4.5 5Z' fill='url(#metalShine)' />
      </svg>
    </div>
  );
};

export default MetallicCursor;
