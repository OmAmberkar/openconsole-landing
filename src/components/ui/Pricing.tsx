import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Hobby',
    price: '$0',
    description: 'Perfect for exploring the platform and personal projects.',
    features: ['1 User', 'Basic Analytics', 'Community Support', 'Deploy up to 3 Nodes'],
    buttonText: 'Start for Free',
    isPopular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/mo',
    description: 'Advanced features for growing teams and startups.',
    features: ['Up to 10 Users', 'Advanced Analytics', 'Priority Email Support', 'Custom Deployments', 'Audit Logs'],
    buttonText: 'Upgrade to Pro',
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Dedicated support and infrastructure for large organizations.',
    features: ['Unlimited Users', 'Dedicated Success Manager', '24/7 Phone Support', 'Custom Integrations', 'SLA 99.99%', 'SSO & SAML'],
    buttonText: 'Contact Sales',
    isPopular: false,
  },
];

export default function Pricing() {
  // We attach the magnetic effect individually or let MetallicCursor handle it natively.
  // We'll let MetallicCursor handle hover tracking inherently via the `.interactive` class mapping.

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#000000]">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(112,0,255,0.15),transparent_70%)] rounded-[100%] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm font-bold mb-6 backdrop-blur-md uppercase tracking-widest font-mono-tech">
             Pricing Options
           </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 font-space text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Simple, Transparent Scaling
          </h2>
          <p className="text-xl text-neutral-400 font-mono-tech max-w-2xl mx-auto">
            Choose the perfect plan for your infrastructure needs. No hidden fees, ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-12">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`relative group rounded-3xl ${tier.isPopular ? 'liquid-border p-[2px] md:-translate-y-4 shadow-[0_20px_40px_rgba(112,0,255,0.15)] hover:shadow-[0_40px_80px_rgba(0,240,255,0.3)]' : 'glass-pane border border-neutral-800 p-px hover:border-cyan-500/50 hover:shadow-[0_20px_60px_rgba(0,240,255,0.1)]'} transition-all duration-500 interactive hover:scale-[1.02] hover:-translate-y-2 z-10 hover:z-20`}
            >
               {tier.isPopular && (
                 <div className="absolute -top-4 w-40 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-neon-cyan text-black font-bold text-sm rounded-full shadow-[0_0_20px_rgba(0,240,255,0.8)] z-20 font-mono-tech uppercase text-center animate-pulse tracking-widest">
                   Most Popular
                 </div>
               )}
               
               <div className={`h-full bg-[#060318] rounded-[calc(1.5rem-2px)] p-8 flex flex-col ${tier.isPopular ? 'shadow-[0_0_30px_rgba(112,0,255,0.2)]' : ''}`}>
                 
                 <h3 className="text-2xl font-bold font-space text-white mb-2">{tier.name}</h3>
                 <p className="text-sm text-neutral-400 font-mono-tech h-10">{tier.description}</p>
                 
                 <div className="my-8">
                   <span className="text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{tier.price}</span>
                   {tier.period && <span className="text-neutral-500 font-mono-tech ml-2">{tier.period}</span>}
                 </div>
                 
                 <ul className="flex flex-col gap-4 mb-10 grow">
                   {tier.features.map((feature, idx) => (
                     <li key={idx} className="flex items-start gap-3">
                       <Check className="w-5 h-5 text-neon-emerald shrink-0 mt-0.5 drop-shadow-[0_0_5px_rgba(0,255,163,0.5)]" />
                       <span className="text-neutral-300 font-mono-tech text-sm leading-relaxed">{feature}</span>
                     </li>
                   ))}
                 </ul>
                 
                 <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 font-space tracking-wide
                   ${tier.isPopular 
                     ? 'bg-white text-black hover:bg-neon-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-[1.02]' 
                     : 'bg-neutral-900 border border-neutral-700 text-white hover:border-white hover:bg-neutral-800'
                   }
                 `}>
                   {tier.buttonText}
                 </button>

               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
