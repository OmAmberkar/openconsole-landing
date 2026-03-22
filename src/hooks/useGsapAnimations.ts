import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 1. Parallax Background Grid
export const useGridParallax = (gridRef: React.RefObject<HTMLDivElement | null>) => {
  useGSAP(
    () => {
      if (!gridRef.current) return;

      gsap.to(gridRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    },
    { scope: gridRef },
  );
};

// 2. Text Scramble / Reveal for H1
export const useTextReveal = (textRef: React.RefObject<HTMLHeadingElement | null>) => {
  useGSAP(
    () => {
      if (!textRef.current) return;
      const chars = textRef.current.textContent.split('');
      textRef.current.textContent = '';

      chars.forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        textRef.current?.appendChild(span);
      });

      gsap.to(textRef.current.children, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.05,
        ease: 'power4.out',
        duration: 1,
        delay: 0.2,
      });

      // Initial state setup for children
      gsap.set(textRef.current.children, { opacity: 0, y: 50, rotateX: 90 });
    },
    { scope: textRef },
  );
};

// 3. Magnetic Button
export const useMagneticButton = (
  buttonRef: React.RefObject<HTMLElement | null>,
  radius: number = 50,
) => {
  useGSAP(
    () => {
      if (!buttonRef.current) return;
      const button = buttonRef.current;

      const xTo = gsap.quickTo(button, 'x', { duration: 0.4, ease: 'power4.out' });
      const yTo = gsap.quickTo(button, 'y', { duration: 0.4, ease: 'power4.out' });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = button.getBoundingClientRect();
        const hw = width / 2;
        const hh = height / 2;
        const cx = left + hw;
        const cy = top + hh;
        const dist = Math.sqrt(Math.pow(clientX - cx, 2) + Math.pow(clientY - cy, 2));

        if (dist < radius) {
          const x = clientX - cx;
          const y = clientY - cy;
          xTo(x * 0.4);
          yTo(y * 0.4);
        } else {
          xTo(0);
          yTo(0);
        }
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      window.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: buttonRef },
  );
};

// 4. Feature Cards Staggered Pop-in
export const useFeaturesStagger = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  cardSelector: string,
) => {
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll(cardSelector);
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 50, scale: 0.9 });

      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            overwrite: true,
          });
        },
        onLeaveBack: (elements) => {
          gsap.set(elements, { opacity: 0, y: 50, scale: 0.9 });
        },
      });
    },
    { scope: containerRef },
  );
};

// 5. SVG Path Animation (Connectors)
export const useSvgPathAnimation = (
  svgRef: React.RefObject<SVGSVGElement | null>,
  pathSelector: string,
) => {
  useGSAP(
    () => {
      if (!svgRef.current) return;

      const paths = svgRef.current.querySelectorAll(pathSelector) as NodeListOf<SVGPathElement>;
      if (!paths.length) return;

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 80%',
            end: 'bottom 30%',
            scrub: true,
          },
        });
      });
    },
    { scope: svgRef },
  );
};

// --- REQUIRED NEW HOOKS FOR SPOTLIGHT, CTA, AND FOOTER ---

// 6. 3D Tilt Effect
export const use3DTiltEffect = (tiltRef: React.RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      if (!tiltRef.current) return;
      const el = tiltRef.current;

      // Use quickTo for smoother mapping
      const rotateXTo = gsap.quickTo(el, 'rotateX', { duration: 0.5, ease: 'power3.out' });
      const rotateYTo = gsap.quickTo(el, 'rotateY', { duration: 0.5, ease: 'power3.out' });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        // Calculate mouse position relative to center of element (-1 to 1)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        // Multiply by maximum tilt angle (e.g. 15 degrees)
        rotateXTo(-y * 15);
        rotateYTo(x * 15);
      };

      const handleMouseLeave = () => {
        rotateXTo(0);
        rotateYTo(0);
      };

      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: tiltRef },
  );
};

// 7. Text Split Reveal (fade-and-slide staggered lines/words)
export const useTextSplitReveal = (textRef: React.RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      if (!textRef.current) return;
      const textEl = textRef.current;

      const content = textEl.textContent || "";
const words = content.split(' ');
      textEl.innerHTML = '';

      words.forEach((word) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        textEl.appendChild(span);
      });

      gsap.set(textEl.children, { y: 20, opacity: 0 });

      gsap.to(textEl.children, {
        scrollTrigger: {
          trigger: textEl,
          start: 'top 90%',
        },
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: textRef },
  );
};

// 8. Neon Aura Pulse (breathing scale/opacity)
export const useNeonAuraPulse = (auraRef: React.RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      if (!auraRef.current) return;
      gsap.to(auraRef.current, {
        scale: 1.15,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: auraRef },
  );
};

// 9. Background Particle Drift
export const useConstellation = (containerRef: React.RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      // Generate some particles
      const particleCount = 40;

      for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'absolute rounded-full bg-blue-300';
        const size = Math.random() * 3 + 1;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.opacity = (Math.random() * 0.5 + 0.1).toString();
        container.appendChild(p);

        // Random drift
        gsap.to(p, {
          y: '-=100',
          x: '+=' + (Math.random() * 50 - 25),
          opacity: Math.random() * 0.8 + 0.2, // intensifies
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef },
  );
};

// 10. Footer Stagger Reveal
export const useFooterStagger = (
  footerRef: React.RefObject<HTMLElement | null>,
  colSelector: string,
) => {
  useGSAP(
    () => {
      if (!footerRef.current) return;
      const cols = footerRef.current.querySelectorAll(colSelector);
      if (!cols.length) return;

      gsap.set(cols, { opacity: 0, y: 30 });

      ScrollTrigger.batch(cols, {
        start: 'top 95%',
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power3.out',
            overwrite: true,
          });
        },
      });
    },
    { scope: footerRef },
  );
};

// 11. Glitch / Shimmer effect
import { CustomEase } from 'gsap/CustomEase';
import { RoughEase } from 'gsap/EasePack';
gsap.registerPlugin(CustomEase, RoughEase);

export const useGlitchShimmer = (logoRef: React.RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      if (!logoRef.current) return;
      const el = logoRef.current;

      const handleMouseEnter = () => {
        gsap.to(el, {
          x: () => Math.random() * 4 - 2,
          y: () => Math.random() * 4 - 2,
          opacity: 0.8,
          filter: 'hue-rotate(90deg) brightness(1.5)',
          duration: 0.3,
          ease: 'rough({ template: none.out, strength: 2, points: 20, taper: none, randomize: true, clamp: false })',
          onComplete: () => {
            gsap.set(el, { x: 0, y: 0, opacity: 1, filter: 'hue-rotate(0deg) brightness(1)' });
          },
        });
      };

      el.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        el.removeEventListener('mouseenter', handleMouseEnter);
      };
    },
    { scope: logoRef },
  );
};
