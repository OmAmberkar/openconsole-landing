import { useRef } from 'react';
import { Network, Search, Zap, Shield, Database, LayoutTemplate } from 'lucide-react';
import { useFeaturesStagger } from '../../hooks/useGsapAnimations';

const features = [
  {
    icon: LayoutTemplate,
    title: 'Multi-Cloud Dashboard',
    description: 'Control AWS, GCP, and Azure from a single pane of glass with unified IAM handling.',
  },
  {
    icon: Zap,
    title: 'Lightning Provisioning',
    description: 'Deploy complex infrastructure stacks across regions in under 60 seconds relying on Edge architecture.',
  },
  {
    icon: Search,
    title: 'Global Resource Search',
    description: 'Instantly locate any server, database, or lambda function across all your connected clouds.',
  },
  {
    icon: Shield,
    title: 'Unified Complaince',
    description: 'Enforce SOC2, HIPAA, and custom security policies natively across every provider automatically.',
  },
  {
    icon: Database,
    title: 'Cost Intelligence',
    description: 'Identify unattached EBS volumes, idle DBs, and wasted resources with AI-driven insights.',
  },
  {
    icon: Network,
    title: 'VPC Peering Automized',
    description: 'Connect VPCs across different cloud providers with single-click dedicated networking.',
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Re-use GSAP batching for stagger
  useFeaturesStagger(containerRef, '.gsap-feature-card');

  return (
    <section id="features" ref={containerRef} className="relative py-24 md:py-32 w-full bg-[#000000] overflow-hidden">
      
      {/* Background Matrix/Grid Overlay */}
      <div className="absolute inset-0 bg-[#02010A] z-0"></div>
      <div className="absolute inset-0 z-0 opacity-10 blur-3xl pointer-events-none">
         <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-neon-purple rounded-full"></div>
         <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-neon-cyan rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-neon-cyan text-sm font-bold mb-6 backdrop-blur-md uppercase tracking-widest font-mono-tech">
             Core Capabilities
           </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 font-space text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] tracking-tight">
             Beyond Standard <span className="text-neon-cyan">Operations</span>
          </h2>
          <p className="text-xl text-neutral-400 font-mono-tech max-w-2xl mx-auto">
            Everything you need to scale infrastructure dynamically without the AWS Management Console headache.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="gsap-feature-card group relative h-full interactive"
              >
                {/* 
                  Using the liquid-border from index.css for an extreme Sci-Fi look.
                  The liquid-border class manages the spinning conic gradient mask. 
                */}
                <div className="liquid-border rounded-2xl h-full p-px">
                   <div className="relative h-full bg-[#060318]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] p-8 flex flex-col z-10">
                     
                     <div className="w-14 h-14 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                       <Icon className="w-7 h-7 text-neon-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                     </div>
                     
                     <h3 className="text-2xl font-bold font-space text-white mb-3 group-hover:text-neon-cyan transition-colors">
                       {feature.title}
                     </h3>
                     
                     <p className="text-neutral-400 font-mono-tech leading-relaxed grow">
                       {feature.description}
                     </p>

                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
