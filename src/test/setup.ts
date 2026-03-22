import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// 1. Mock matchMedia (CRITICAL for GSAP & ScrollTrigger)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// 2. Mock IntersectionObserver (For Framer Motion 'whileInView')
class IntersectionObserverMock {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  constructor() {}
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn();
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// 3. Mock ResizeObserver (For responsive UI tracking)
class ResizeObserverMock {
  constructor() {}
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// 4. Mock SVG geometry methods (Essential for Workflow.tsx path animations)
const mockSVGMethods = () => {
  const fn = () => 1000;
  const pointFn = () => ({ x: 0, y: 0, alpha: 0, beta: 0 });

  // Apply to base SVGElement
  (SVGElement.prototype as any).getTotalLength = fn;
  (SVGElement.prototype as any).getPointAtLength = pointFn;

  // Explicitly apply to SVGPathElement for JSDOM consistency
  if (typeof SVGPathElement !== 'undefined') {
    (SVGPathElement.prototype as any).getTotalLength = fn;
    (SVGPathElement.prototype as any).getPointAtLength = pointFn;
  }
};
mockSVGMethods();

// 5. Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });

afterEach(() => {
  cleanup();
});