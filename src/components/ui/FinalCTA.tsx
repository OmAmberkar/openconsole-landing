import { useRef } from 'react';
import { ArrowRight, Github, LayoutDashboard } from 'lucide-react';
import { useSound } from '../../hooks/useSound';
import {
  useNeonAuraPulse,
  useConstellation,
  useMagneticButton,
} from '../../hooks/useGsapAnimations';

export default function FinalCTA() {
  const { playClick } = useSound();

  // GSAP Refs
  const auraRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);

  // Apply Animation Hooks
  useNeonAuraPulse(auraRef);
  useConstellation(constellationRef);
  useMagneticButton(primaryBtnRef, 50);
  useMagneticButton(secondaryBtnRef, 50);

  return (
    <section
      className='relative py-20 md:py-24 w-full md:rounded-[4rem] rounded-4xl'
      ref={constellationRef}
    >
      <div className='absolute inset-0 z-0 overflow-hidden md:rounded-[4rem] rounded-4xl pointer-events-none'>
        {/* Crazy Spinning Conic Gradient */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(0,240,255,0.4)_360deg)] animate-[spin_4s_linear_infinite] opacity-50 mix-blend-screen'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(112,0,255,0.4)_360deg)] animate-[spin_3s_linear_infinite_reverse] opacity-50 mix-blend-screen'></div>
      </div>

      {/* GSAP Neon Aura & Glitch Overlay */}
      <div
        ref={auraRef}
        className='absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-full h-full rounded-full bg-blue-600/30 blur-[120px] pointer-events-none z-0 mix-blend-screen'
      ></div>

      {/* Main Container */}
      <div className='relative z-10 text-center max-w-5xl mx-auto px-4 bg-[#060318]/60 border-2 border-x-neon-cyan/80 border-y-neon-purple/50 shadow-[0_0_100px_rgba(0,240,255,0.25)] md:rounded-[4rem] rounded-4xl pt-20 pb-24 backdrop-blur-2xl overflow-hidden group'>
        {/* Inner Glitch Scanline active on hover */}
        <div className='absolute inset-0 w-full h-full bg-[linear-gradient(transparent_0%,rgba(0,240,255,0.1)_50%,transparent_100%)] bg-size[100%_4px] opacity-0 group-hover:opacity-100 group-hover:animate-[ping_2s_linear_infinite] pointer-events-none mix-blend-screen'></div>

        {/* Headline */}
        <h2 className='text-5xl md:text-7xl font-extrabold text-white mb-8 shadow-black drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] font-space tracking-tight leading-tight relative glow'>
          Ready to Experience <br className='hidden md:block' />
          <span className='text-transparent bg-clip-text bg-linear-to-r from-neon-cyan via-white to-neon-purple drop-shadow-[0_0_25px_rgba(0,240,255,0.8)] animate-pulse'>
            Unified Operations?
          </span>
        </h2>

        {/* Description Text */}
        <p className='text-2xl text-neutral-300 mb-14 max-w-3xl mx-auto font-mono-tech leading-relaxed'>
          Jump straight into the system dashboard to see real-time metrics, automated deployments,
          and anomaly detection in action. No credit card required.
        </p>

        {/* Buttons Container */}
        <div className='flex flex-col md:flex-row justify-center gap-6 items-center'>
          {/* Primary Button - Magnetic & Liquid */}
          <a
            ref={primaryBtnRef}
            href='https://openconsole-console.pages.dev/sign-in'
            target='_blank'
            rel='noreferrer'
            onClick={playClick}
            className='inline-block interactive shadow-[0_0_25px_rgba(0,240,255,0.3)] rounded-full liquid-border p-[2px]'
          >
            <button className='group w-full md:w-auto px-10 py-5 rounded-full bg-[#02010A] text-white font-space font-bold transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]'>
              <LayoutDashboard size={20} className='text-neon-cyan' />
              <span className='tracking-wide'>Deploy Playground</span>
              <ArrowRight
                size={20}
                className='text-neon-cyan group-hover:translate-x-1 transition-transform'
              />
            </button>
          </a>

          {/* Secondary Button - Magnetic */}
          <a
            ref={secondaryBtnRef}
            href='https://github.com/openconsole-cloud/openconsole-workspace'
            target='_blank'
            rel='noreferrer'
            onClick={playClick}
            className='inline-block interactive rounded-full outline-hidden'
          >
            <button className='group w-full md:w-auto px-10 py-5 rounded-full border border-neutral-700 bg-neutral-800/50 text-neutral-300 font-mono-tech font-bold hover:bg-neutral-700 hover:border-purple-500 hover:text-white hover:shadow-[0_0_20px_rgba(112,0,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer no-underline uppercase tracking-wider text-sm'>
              <Github
                size={20}
                className='group-hover:rotate-12 transition-transform text-neon-purple'
              />
              [ View Source ]
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
