'use client';

import { shouldReduceMotion } from './helpers';

// Dibuja un path SVG (strokeDashoffset) al hacer scroll-in
export function animateUnderline(svgEl: SVGElement, duration = 600): () => void {
  if (shouldReduceMotion()) {
    const paths = svgEl.querySelectorAll<SVGPathElement>('path, line, polyline');
    paths.forEach((p) => {
      p.style.strokeDashoffset = '0';
    });
    return () => {};
  }

  const paths = Array.from(svgEl.querySelectorAll<SVGPathElement>('path, line, polyline'));

  paths.forEach((p) => {
    const len = p.getTotalLength?.() ?? 200;
    p.style.strokeDasharray = String(len);
    p.style.strokeDashoffset = String(len);
    p.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
  });

  // Trigger en next frame
  const raf = requestAnimationFrame(() => {
    paths.forEach((p) => {
      p.style.strokeDashoffset = '0';
    });
  });

  return () => cancelAnimationFrame(raf);
}

export function observeUnderline(svgEl: SVGElement, duration?: number): () => void {
  let triggered = false;
  const cleanup = { fn: () => {} };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !triggered) {
        triggered = true;
        cleanup.fn = animateUnderline(svgEl, duration);
        observer.disconnect();
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(svgEl);
  return () => {
    observer.disconnect();
    cleanup.fn();
  };
}
