import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [loadingText, setLoadingText] = useState('Initializing OpenConsole Core...');

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = 'auto'; // restore scroll
          onComplete(); // Notify parent to show main content
        },
      });

      // Simple pseudo-terminal sequence
      setTimeout(() => setLoadingText('Connecting to Global Nodes...'), 800);
      setTimeout(() => setLoadingText('Loading GSAP Physics Engine...'), 1600);
      setTimeout(() => setLoadingText('Establishing secure uplink...'), 2400);

      // Number counter
      tl.to(
        percentRef.current,
        {
          innerHTML: 100,
          duration: 3,
          ease: 'power2.inOut',
          snap: { innerHTML: 1 },
        },
        0,
      );

      // Glitch effect on text while loading
      tl.to(
        textRef.current,
        {
          opacity: 0.5,
          duration: 0.1,
          yoyo: true,
          repeat: 10,
          ease: 'rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false })',
        },
        0,
      );

      // Final Exit Animation (Wipe UP)
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className='fixed inset-0 z-99999 flex flex-col items-center justify-center bg-[#000000] text-cyan-400 font-mono-tech'
    >
      {/* Cyberpunk Grid Overlay for Preloader */}
      <div className='absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-size[60px_60px]'></div>

      <div className='relative z-10 flex flex-col items-center gap-6'>
        <div className='relative w-24 h-24 flex items-center justify-center'>
          {/* Rotating Rings */}
          <div
            className='absolute inset-0 rounded-full border-t-2 border-l-2 border-cyan-400 animate-spin'
            style={{ animationDuration: '2s' }}
          ></div>
          <div
            className='absolute inset-2 rounded-full border-b-2 border-r-2 border-purple-500 animate-spin'
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          ></div>

          <span
            ref={percentRef}
            className='text-2xl font-bold text-white shadow-cyan-400 drop-shadow-md'
          >
            0
          </span>
          <span className='text-sm absolute -right-4 top-4'>%</span>
        </div>

        <div
          ref={textRef}
          className='text-sm tracking-widest text-center uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]'
        >
          {loadingText}
          <span className='animate-pulse'>_</span>
        </div>
      </div>
    </div>
  );
}
