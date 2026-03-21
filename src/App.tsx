import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight, Terminal } from 'lucide-react';
import { SiGooglecloud} from 'react-icons/si';
import { FaAws } from "react-icons/fa6";
import { VscAzure } from "react-icons/vsc";

// UI Components
import Features from './components/ui/Features';
import Spotlight from './components/ui/Spotlight';
import FinalCTA from './components/ui/FinalCTA';
import Footer from './components/ui/Footer';
import TrustedBy from './components/ui/TrustedBy';
import Workflow from './components/ui/Workflow';
import Pricing from './components/ui/Pricing';
import MetallicCursor from './components/customeCursor/MetallicCursor';
import Preloader from './components/ui/Preloader';

// Custom Hooks
import { useGridParallax, useMagneticButton } from './hooks/useGsapAnimations';

function App() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const secondaryGridRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLAnchorElement>(null);
  const mouseSpotlightRef = useRef<HTMLDivElement>(null);

  // 1. Parallax & Magnetic Hooks
  useGridParallax(gridRef);
  useMagneticButton(heroCtaRef, 40);

  // 2. Global Mouse Spotlight Effect (The "Flashlight" feel)
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1 }); // Start after preloader roughly

  tl.from("header div", {
    width: 0,
    opacity: 0,
    duration: 1.2,
    ease: "expo.out"
  })
  .from("header a", {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    ease: "back.out(2)",
    duration: 0.8
  }, "-=0.6");
  
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(mouseSpotlightRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });
  

  return (
    <div ref={containerRef} className="relative bg-[#000000] selection:bg-cyan-500/30">
      <MetallicCursor />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {/* 3. Texture Layer: Film Grain/Noise */}
      <div className="fixed inset-0 z-100 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* 4. Global Mouse Follower Glow */}
      <div 
        ref={mouseSpotlightRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] -ml-[300px] -mt-[300px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none z-1 mix-blend-screen"
      />

      <div className="min-h-screen text-white overflow-hidden font-space relative">
        
        {/* 5. Layered Parallax Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Primary Grid */}
          <div ref={gridRef} className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size[60px_60px]"></div>
          
          {/* Secondary Faster Grid (Depth) */}
          <div ref={secondaryGridRef} className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size[120px_120px] transform scale-150"></div>
          
          {/* Ambient Purple Wash */}
          <div className="absolute top-0 right-0 w-[80%] h-[60%] bg-purple-900/10 blur-[160px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
        </div>

        <div className="relative z-10">
         
          


<header className="absolute top-8 left-1/2 -translate-x-1/2 z-100 border rounded-full drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">
  <div className="flex items-center gap-6 px-8 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
    
    {/* AWS Logo */}
    <a 
      href="#aws" 
      className="group relative flex items-center justify-center w-10 h-10 transition-all duration-300"
    >
      <FaAws className="text-neutral-500 group-hover:text-[#FF9900] group-hover:drop-shadow-[0_0_8px_rgba(255,153,0,0.6)] w-6 h-6 transition-all" />
      <div className="absolute -bottom-12 px-2 py-1 bg-black/80 border border-white/10 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
        AWS_NODE
      </div>
    </a>

    <div className="w-px h-4 bg-white/10" />

    {/* GCP Logo */}
    <a 
      href="#gcp" 
      className="group relative flex items-center justify-center w-10 h-10 transition-all duration-300"
    >
      <SiGooglecloud className="text-neutral-500 group-hover:text-[#4285F4] group-hover:drop-shadow-[0_0_8px_rgba(66,133,244,0.6)] w-6 h-6 transition-all" />
      <div className="absolute -bottom-12 px-2 py-1 bg-black/80 border border-white/10 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
        GCP_CORE
      </div>
    </a>

    <div className="w-px h-4 bg-white/10" />

    {/* Azure Logo */}
    <a 
      href="#azure" 
      className="group relative flex items-center justify-center w-10 h-10 transition-all duration-300"
    >
      <VscAzure className="text-neutral-500 group-hover:text-[#0078D4] group-hover:drop-shadow-[0_0_8px_rgba(0,120,212,0.6)] w-6 h-6 transition-all" />
      <div className="absolute -bottom-12 px-2 py-1 bg-black/80 border border-white/10 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
        AZURE_SATELLITE
      </div>
    </a>

    {/* Status Indicator at the end of the cluster */}
    <div className="ml-4 flex items-center gap-2 pl-4 border-l border-white/10">
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
      <span className="text-[10px] font-mono text-cyan-400/70 tracking-tighter">LINK_STABLE</span>
    </div>
  </div>
</header>

          <main className="relative pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen">
            
            {/* 7. Enhanced Core Reactor (Orbital Path) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square pointer-events-none -z-10">
               <div className="absolute inset-0 rounded-full border border-cyan-500/5 rotate-12 animate-[pulse_4s_ease-in-out_infinite]"></div>
               <div className="absolute inset-20 rounded-full border border-purple-500/10 -rotate-12"></div>
               <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_#00f0ff] animate-[ping_3s_linear_infinite]"></div>
            </div>

            <div className="text-center">
              <div className="group relative inline-flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-900/50 border border-white/10 text-xs font-mono mb-12 hover:border-cyan-500/50 transition-all cursor-help">
                <Terminal size={14} className="text-cyan-400" />
                <span className="text-neutral-400 tracking-[0.2em] uppercase">Status: </span>
                <span className="text-cyan-400 font-bold">Protocol v2.0 Engaged</span>
                <div className="absolute inset-0 rounded-full bg-cyan-500/5 blur-md group-hover:bg-cyan-500/10 transition-all"></div>
              </div>

              <h1 className="text-6xl md:text-[10rem] font-bold tracking-tighter mb-8 leading-[0.85] text-white">
                ORCHESTRATE <br />
                <span className="italic font-light text-neutral-500">THE</span> 
                <span className="bg-linear-to-r from-cyan-400 via-white to-purple-500 text-transparent bg-clip-text"> CLOUD</span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-xl mx-auto font-light leading-relaxed tracking-tight">
                A high-performance control plane for <span className="text-white border-b border-white/20">multi-cloud</span> environments. Zero latency. Infinite scale.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <a 
                  ref={heroCtaRef}
                  href='https://openconsole-console.pages.dev/sign-in'
            target='_blank'
            rel='noreferrer'
                  className="group relative px-10 py-5 bg-white text-black rounded-full font-bold overflow-hidden transition-transform active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2 uppercase tracking-tighter">
                    Initialize Core <ArrowRight size={18} />
                  </span>
                  <div className="absolute inset-0 bg-cyan-400 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></div>
                </a>
                
                <div className="flex gap-6 items-center">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-neutral-800" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Join 2k+ Engineers</span>
                </div>
              </div>
            </div>
          </main>

          {/* 8. Content Sections with consistent spacing */}
          <div className="space-y-64 pb-32">
            <TrustedBy />
            <Features />
            <Workflow />
            <Spotlight />
            <Pricing />
            <FinalCTA />
          </div>
          
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;