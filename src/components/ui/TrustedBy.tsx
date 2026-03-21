import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Cloud, Database, Network, Server, Shield, Terminal, Code2, Cpu } from 'lucide-react';

const logos = [
  { name: 'DevFlux', icon: Cloud },
  { name: 'QuantumHost', icon: Server },
  { name: 'SysCore', icon: Cpu },
  { name: 'GridShield', icon: Shield },
  { name: 'DataStream', icon: Database },
  { name: 'NodeLink', icon: Network },
  { name: 'OmniTerminal', icon: Terminal },
  { name: 'BuildGrid', icon: Code2 },
];

export default function TrustedBy() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a seamless infinite marquee effect
      gsap.to('.marquee-track', {
        xPercent: -50,
        repeat: -1,
        duration: 30, // Slow, steady pace
        ease: 'linear',
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={marqueeRef}
      className='py-16 md:py-24 border-y border-neutral-900 bg-[#02010A] overflow-hidden'
    >
      <div className='container mx-auto px-4 mb-10'>
        <h3 className='text-center text-sm font-bold tracking-widest text-neutral-500 uppercase font-mono-tech'>
          Powering Infrastructure For
        </h3>
      </div>

      {/* Marquee Container */}
      <div className='relative w-full overflow-hidden flex whitespace-nowrap mask-edges'>
        {/* Left and Right Fade Masks */}
        <div className='absolute top-0 left-0 w-32 md:w-64 h-full bg-linear-to-r from-[#02010A] to-transparent z-10 pointer-events-none'></div>
        <div className='absolute top-0 right-0 w-32 md:w-64 h-full bg-linear-to-l from-[#02010A] to-transparent z-10 pointer-events-none'></div>

        {/* Moving Track */}
        <div className='marquee-track flex gap-12 md:gap-24 items-center pl-12 md:pl-24 w-max'>
          {/* Double the array to allow for seamless looping (-50% transform jumps perfectly) */}
          {[...logos, ...logos].map((logo, index) => {
            const Icon = logo.icon;
            return (
              <div
                key={index}
                className='flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0 interactive group cursor-pointer'
              >
                <Icon className='w-8 h-8 md:w-10 md:h-10 text-neutral-400 group-hover:text-neon-cyan transition-colors' />
                <span className='text-xl md:text-2xl font-bold font-space text-neutral-400 group-hover:text-white transition-colors'>
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
