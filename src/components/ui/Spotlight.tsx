import { useRef } from 'react';
import { use3DTiltEffect, useTextSplitReveal } from '../../hooks/useGsapAnimations';

function Spotlight() {
  const tiltRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Apply new GSAP hooks
  use3DTiltEffect(tiltRef);
  useTextSplitReveal(textRef);

  return (
    <section className='relative flex min-h-[900px] w-full flex-col items-center justify-center overflow-hidden bg-[#000000] py-20 border-t border-neutral-900'>
      {/* Animated Beams Background */}
      <div className='absolute inset-0 z-0 opacity-40'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size[40px_40px]'></div>
        <div className='absolute left-0 right-0 top-1/4 -z-10 m-auto h-[600px] w-[600px] rounded-full bg-blue-800 opacity-20 blur-[150px]'></div>
      </div>

      <div className='z-10 text-center px-4 w-full flex flex-col items-center'>
        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-neon-cyan text-sm font-bold mb-6 backdrop-blur-md uppercase tracking-widest font-mono-tech'>
          Deep Visibility
        </div>

        <h2 className='text-4xl md:text-7xl font-bold font-space text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]'>
          The Central{' '}
          <span className='text-neon-cyan drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]'>Command</span>
        </h2>

        <p
          ref={textRef}
          className='mx-auto mt-6 max-w-2xl text-xl text-neutral-400 leading-relaxed font-mono-tech'
        >
          Abstract away the complexity of AWS, GCP, and Azure. Manage your entire stack from a
          single, secure, transparent pane of glass.
        </p>

        {/* 3D Tilt Interactive Dashboard Preview with True Hardware Depth */}
        <div className='mt-20 w-full max-w-6xl perspective-[2000px]'>
          <div
            ref={tiltRef}
            className='group relative rounded-3xl border border-blue-900/50 bg-[#060318]/60 backdrop-blur-2xl p-4 md:p-6 shadow-[0_40px_100px_rgba(0,240,255,0.15)] mx-auto transform-style-3d will-change-transform transition-all duration-300 interactive'
          >
            {/* Inner Glow Orchestration */}
            <div className='absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,transparent_60%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(112,0,255,0.15)_0%,transparent_70%)] pointer-events-none -z-10 translate-z-[-20px]'></div>

            {/* Mock Dashboard UI Base */}
            <div className='w-full h-[500px] md:h-[700px] rounded-2xl bg-[#02010A]/80 border border-neutral-800/80 overflow-hidden relative transform-style-3d shadow-inner shadow-cyan-500/10'>
              {/* Dashboard Header Bar */}
              <div className='h-14 border-b border-neutral-800/80 bg-[#060318]/50 flex items-center px-6 gap-3 translate-z-[10px]'>
                <div className='flex gap-2'>
                  <div className='w-3.5 h-3.5 rounded-full bg-red-500/80'></div>
                  <div className='w-3.5 h-3.5 rounded-full bg-yellow-500/80'></div>
                  <div className='w-3.5 h-3.5 rounded-full bg-green-500/80'></div>
                </div>
                <div className='flex-1 flex justify-center'>
                  <div className='w-64 h-6 bg-neutral-900/80 rounded-md border border-neutral-800'></div>
                </div>
              </div>

              {/* Mock Dashboard Content area (Floating Elements) */}
              <div className='p-8 grid grid-cols-1 md:grid-cols-3 gap-8 h-[calc(100%-3.5rem)] transform-style-3d'>
                {/* Main Graph Panel */}
                <div className='col-span-2 rounded-xl bg-linear-to-br from-neutral-900/80 to-[#060318]/90 border border-blue-900/40 relative overflow-hidden transition-transform duration-500 group-hover:translate-z-[80px] shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col p-6'>
                  <div className='flex justify-between items-center w-full mb-8'>
                    <span className='text-white font-bold font-space text-xl'>
                      Global Routing Traffic
                    </span>
                    <span className='text-neon-emerald font-mono-tech bg-neon-emerald/10 px-3 py-1 rounded-full text-xs border border-neon-emerald/30 glow'>
                      +24.5% Online
                    </span>
                  </div>

                  {/* Floating Chart lines with Animated Curves */}
                  <div className='flex-1 w-full border-b border-l border-neutral-800 flex items-end relative overflow-hidden'>
                    <svg
                      className='absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]'
                      preserveAspectRatio='none'
                      viewBox='0 0 100 100'
                    >
                      <defs>
                        <linearGradient id='gradCyan' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='0%' stopColor='#00F0FF' />
                          <stop offset='100%' stopColor='transparent' />
                        </linearGradient>
                        <linearGradient id='gradPurple' x1='0' y1='0' x2='1' y2='0'>
                          <stop offset='0%' stopColor='#7000FF' />
                          <stop offset='100%' stopColor='#00F0FF' />
                        </linearGradient>
                        <style>
                          {`
                                .data-stream { stroke-dasharray: 200; animation: drawLine 4s linear infinite; }
                                .data-stream-2 { stroke-dasharray: 250; animation: drawLine 5s linear infinite reverse; }
                                .data-stream-3 { stroke-dasharray: 300; animation: drawLine 6s ease-in-out infinite; }
                                @keyframes drawLine { to { stroke-dashoffset: -400; } }
                              `}
                        </style>
                      </defs>

                      {/* Background Area Fills */}
                      <path
                        d='M0 100 C 20 80, 40 90, 60 50 S 80 40, 100 10 L 100 100 Z'
                        fill='url(#gradCyan)'
                        opacity='0.15'
                      />
                      <path
                        d='M0 100 C 30 60, 50 110, 70 40 S 90 20, 100 30 L 100 100 Z'
                        fill='url(#gradCyan)'
                        opacity='0.1'
                      />

                      {/* Animated Curvey Data Streams */}
                      <path
                        className='data-stream'
                        d='M0 100 C 20 80, 40 90, 60 50 S 80 40, 100 10'
                        fill='none'
                        stroke='#00F0FF'
                        strokeWidth='1.5'
                        strokeDashoffset='200'
                      />
                      <path
                        className='data-stream-2'
                        d='M0 100 C 30 60, 50 110, 70 40 S 90 20, 100 30'
                        fill='none'
                        stroke='url(#gradPurple)'
                        strokeWidth='2'
                        strokeDashoffset='250'
                      />
                      <path
                        className='data-stream-3'
                        d='M0 80 Q 25 10, 50 60 T 100 20'
                        fill='none'
                        stroke='#00FFA3'
                        strokeWidth='1'
                        opacity='0.7'
                        strokeDashoffset='300'
                      />
                    </svg>
                  </div>
                </div>

                {/* Side Panels */}
                <div className='flex flex-col gap-8 transform-style-3d'>
                  {/* Nodes Panel */}
                  <div className='flex-1 rounded-xl bg-linear-to-br from-neutral-900/80 to-[#060318]/90 border border-purple-900/40 flex flex-col p-6 transition-transform duration-500 group-hover:translate-z-[120px] shadow-[0_20px_40px_rgba(0,0,0,0.6)]'>
                    <span className='text-white font-bold font-space text-lg mb-4'>
                      Active Compute Nodes
                    </span>
                    <div className='flex items-end gap-2 mt-auto'>
                      <span className='text-5xl font-extrabold text-neon-cyan tracking-tighter drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]'>
                        1,402
                      </span>
                      <span className='text-neutral-500 font-mono-tech mb-1'>/ 1,500</span>
                    </div>
                  </div>

                  {/* Deployments Panel */}
                  <div className='flex-1 rounded-xl bg-linear-to-br from-neutral-900/80 to-[#060318]/90 border border-neutral-800/80 p-6 flex flex-col transition-transform duration-500 group-hover:translate-z-[60px] shadow-[0_20px_40px_rgba(0,0,0,0.6)]'>
                    <span className='text-neutral-400 font-bold font-space text-sm uppercase tracking-wider mb-4'>
                      Live Deployments
                    </span>
                    <div className='space-y-3 mt-auto'>
                      <div className='w-full h-2 bg-neutral-800 rounded-full overflow-hidden'>
                        <div className='h-full bg-neon-emerald w-3/4 rounded-full shadow-[0_0_10px_rgba(0,255,163,0.8)]'></div>
                      </div>
                      <div className='w-full h-2 bg-neutral-800 rounded-full overflow-hidden'>
                        <div className='h-full bg-neon-purple w-1/2 rounded-full shadow-[0_0_10px_rgba(112,0,255,0.8)]'></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Spotlight;
