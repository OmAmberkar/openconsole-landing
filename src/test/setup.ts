import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// 1. Mock matchMedia (CRITICAL for GSAP/ScrollTrigger)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// 2. Mock IntersectionObserver (Class-based to support 'new IntersectionObserver()')
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

// 3. Mock ResizeObserver (Class-based)
class ResizeObserverMock {
  constructor() {}

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// 4. Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });

// Clean up after each test case
afterEach(() => {
  cleanup();
});

// Mock SVG geometry methods (Essential for Workflow.tsx and GSAP animations)
// We cast to 'any' to suppress TS2339 since JSDOM doesn't implement these geometry APIs
if (!(SVGElement.prototype as any).getTotalLength) {
  (SVGElement.prototype as any).getTotalLength = () => 1000;
}

if (!(SVGElement.prototype as any).getPointAtLength) {
  (SVGElement.prototype as any).getPointAtLength = () => ({
    x: 0,
    y: 0,
    alpha: 0,
    beta: 0,
  });
}
