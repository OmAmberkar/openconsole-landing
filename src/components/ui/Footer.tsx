import { useRef } from 'react';
import { Github, Twitter, Linkedin, Mail, Send, Infinity as InfinityIcon } from 'lucide-react';
import { useFooterStagger, useGlitchShimmer } from '../../hooks/useGsapAnimations';

// ==============================
// 1. DATA & CONFIGURATION
// ==============================
const footerLinks = {
  project: [
    { label: 'Dashboard Demo', href: '#demo' },
    { label: 'Features Overview', href: '#features' },
    { label: 'API Documentation', href: '#docs' },
    { label: 'Roadmap (Future)', href: '#roadmap' },
  ],
  community: [
    { label: 'GitHub Discussions', href: '#' },
    { label: 'Contribute', href: 'https://github.com/openconsole-cloud' },
    { label: 'Meet the Team', href: '#' },
    { label: 'Support', href: 'mailto:support@openconsole.cloud' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Security Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: 'https://github.com/openconsole-cloud', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

// ==============================
// 2. SUB-COMPONENTS
// ==============================
const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  // The 'gsap-footer-col' class is used by useFooterStagger
  <div className='gsap-footer-col flex flex-col gap-6 text-center sm:text-left items-center sm:items-start'>
    <h4 className='text-sm font-bold text-white uppercase tracking-widest border-b border-neon-cyan/50 pb-2 w-fit font-mono-tech'>
      {title}
    </h4>
    <ul className='flex flex-col gap-3'>
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className='text-sm text-neutral-400 font-mono-tech hover:text-neon-cyan transition-colors duration-200 inline-block relative group interactive'
          >
            {link.label}
            <span className='absolute left-0 bottom-0 h-px w-0 bg-neon-cyan transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(0,240,255,0.8)]'></span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// ==============================
// 3. MAIN FOOTER COMPONENT
// ==============================
const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Custom GSAP Animation Refs
  const footerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);

  useFooterStagger(footerRef, '.gsap-footer-col');
  useGlitchShimmer(logoRef);

  return (
    <footer
      ref={footerRef}
      className='pt-16 md:pt-24 relative z-10 overflow-hidden bg-[#000000] border-t border-t-neutral-900'
    >
      {/* Black Hole Ambient Glow */}
      <div className='absolute inset-0 z-0 opacity-10 pointer-events-none'>
        <div className='w-full h-full bg-[radial-gradient(100%_100%_at_center_bottom,rgba(0,240,255,0.2)_0%,transparent_70%)]'></div>
      </div>

      {/* Bottom Anchoring Glow */}
      <div className='absolute bottom-0 inset-x-0 h-40 bg-[linear-gradient(to_top,rgba(112,0,255,0.1)_0%,transparent_100%)] pointer-events-none'></div>

      {/* Main Footer Content */}
      <div className='container mx-auto px-4 relative z-10 max-w-7xl'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-8 lg:gap-12 mb-12 md:mb-16 border-b border-neutral-900 pb-12 md:pb-16'>
          {/* Column 1: Brand & Newsletter */}
          <div className='gsap-footer-col md:col-span-4 lg:col-span-5 flex flex-col gap-6 text-center md:text-left items-center md:items-start'>
            {/* Brand Logo - Glitch/Shimmer applied via hook */}
            <div>
              <h3
                ref={logoRef}
                className='text-3xl font-extrabold text-white tracking-tight mb-4 cursor-pointer inline-block interactive font-space select-none'
              >
                Open
                <span className='text-neon-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]'>
                  Console
                </span>{' '}
                <InfinityIcon className='w-6 h-6 text-neon-purple inline-block ml-1 drop-shadow-[0_0_8px_rgba(112,0,255,0.8)]' />
              </h3>
              <p className='text-neutral-500 font-mono-tech text-sm leading-relaxed max-w-sm mx-auto md:mx-0'>
                A unified cloud intelligence layer built for engineering standards of the future.
                Simplify complexity, trace deployments, and optimize infrastructure automatically.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className='mt-2 w-full max-w-sm mx-auto md:mx-0'>
              <h4 className='text-sm font-bold text-neutral-400 mb-4 flex items-center justify-center md:justify-start gap-2 uppercase tracking-widest font-mono-tech'>
                <Mail className='w-4 h-4 text-neon-cyan' /> Join the Waitlist
              </h4>
              <form className='flex gap-2 relative'>
                <input
                  type='email'
                  placeholder='terminal@domain.com'
                  className='w-full bg-[#02010A] border border-neutral-800 rounded-xl pl-4 pr-4 py-3 text-sm text-white font-mono-tech placeholder:text-neutral-700 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all'
                  required
                />
                <button
                  type='submit'
                  className='interactive bg-[#060318] hover:bg-[#0a0528] border border-neon-cyan/50 text-neon-cyan hover:text-white p-3 rounded-xl transition-colors duration-200 shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)]'
                  aria-label='Subscribe'
                >
                  <Send className='w-5 h-5' />
                </button>
              </form>
            </div>
          </div>

          {/* Columns 2, 3, 4: Link Sections */}
          <div className='md:col-span-8 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8'>
            <FooterColumn title='Framework' links={footerLinks.project} />
            <FooterColumn title='Ecosystem' links={footerLinks.community} />
            <FooterColumn title='Compliance' links={footerLinks.legal} />
          </div>
        </div>

        {/* Sub-Footer: Copyright & Socials */}
        <div className='gsap-footer-col pt-4 pb-12 flex flex-col-reverse md:flex-row justify-between items-center gap-8'>
          <p className='text-sm text-neutral-600 font-mono-tech text-center md:text-left tracking-wide'>
            System Kernel Built by BEIT Group 5 • Atharva College of Engineering • © {currentYear}{' '}
            OpenConsole
          </p>

          <div className='flex gap-4'>
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='interactive p-3 rounded-full bg-[#02010A] text-neutral-500 hover:text-neon-cyan transition-all duration-300 border border-neutral-800 hover:border-neon-cyan shadow-md hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  aria-label={social.label}
                >
                  <Icon className='w-5 h-5' />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
