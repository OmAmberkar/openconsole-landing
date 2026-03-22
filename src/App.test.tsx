import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import gsap from 'gsap';

describe('App', () => {
  it('renders the main application after loading', async () => {
    render(<App />);

    // 1. Force GSAP to finish the Preloader instantly
    gsap.globalTimeline.progress(1);

    // 2. Find the heading. findByRole is the "sexiest" way to do this.
    // It combines "ORCHESTRATE", "THE", and "CLOUD" across all spans automatically.
    const heading = await screen.findByRole('heading', {
      name: /ORCHESTRATE THE CLOUD/i,
    });
    expect(heading).toBeInTheDocument();

    // 3. Check for the Status Pill
    const statusPill = await screen.findByText(/Protocol v2.0 Engaged/i);
    expect(statusPill).toBeInTheDocument();

    // 4. Find the CTA button
    const ctaButton = await screen.findByText(/Initialize Core/i);
    expect(ctaButton).toBeInTheDocument();
  });
});
