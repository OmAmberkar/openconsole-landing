import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DatabaseZap, Rocket, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: DatabaseZap,
    title: '1. Connect Environments',
    desc: 'Instantly link your AWS, GCP, and Azure accounts via secure IAM roles without deploying local agents.',
    color: 'text-purple-400',
    border: 'border-purple-500/30 glow',
  },
  {
    icon: ShieldCheck,
    title: '2. Normalize Security',
    desc: 'The platform scans and maps every resource, applying unified compliance standards across all regions.',
    color: 'text-cyan-400',
    border: 'border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]',
  },
  {
    icon: Rocket,
    title: '3. Deploy & Monitor',
    desc: 'Provision new resources globally using standardized templates and track performance in a single pane.',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
  },
];

export default function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate SVG Line Fill based on scroll
      if (pathRef.current) {
        const length =
          typeof pathRef.current.getTotalLength === 'function'
            ? pathRef.current.getTotalLength()
            : 1000; // Fallback for JSDOM

        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1, // Smooth scrubbing
          },
        });
      }

      // Stagger Steps entrance
      gsap.from('.workflow-step', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className='py-24 relative overflow-hidden bg-[#060318]'>
      <div className='container mx-auto px-4 max-w-5xl relative z-10'>
        <div className='text-center mb-20'>
          <h2 className='text-4xl md:text-5xl font-extrabold mb-4 font-space drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]'>
            How It Works
          </h2>
          <p className='text-xl text-neutral-400 font-mono-tech max-w-2xl mx-auto'>
            A seamless integration pipeline designed for multi-cloud parity.
          </p>
        </div>

        <div className='relative'>
          {/* Animated Connecting SVG Path (Hidden on Mobile) */}
          <div className='hidden md:block absolute left-12.5 top-10 bottom-10 w-2 z-0'>
            <svg className='w-full h-full' preserveAspectRatio='none' viewBox='0 0 10 1000'>
              {/* Background Track */}
              <path d='M5 0 L5 1000' stroke='rgba(255,255,255,0.05)' strokeWidth='2' fill='none' />
              {/* Animated Neon Line */}
              <path
                ref={pathRef}
                d='M5 0 L5 1000'
                stroke='#00F0FF'
                strokeWidth='4'
                fill='none'
                className='drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]'
              />
            </svg>
          </div>

          <div className='flex flex-col gap-16 relative z-10'>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className='workflow-step flex flex-col md:flex-row items-center gap-8 md:gap-12'
                >
                  {/* Icon Node */}
                  <div
                    className={`shrink-0 w-24 h-24 rounded-full flex items-center justify-center bg-[#0a0528] border ${step.border} z-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] interactive`}
                  >
                    <Icon className={`w-10 h-10 ${step.color}`} />
                  </div>

                  {/* Content Glass Pane */}
                  <div className='glass-pane p-8 rounded-2xl w-full max-w-xl group hover:border-cyan-500/50 transition-colors duration-500'>
                    <h3 className='text-2xl font-bold font-space text-white mb-3 group-hover:text-cyan-400 transition-colors'>
                      {step.title}
                    </h3>
                    <p className='text-neutral-400 font-mono-tech leading-relaxed'>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
