'use client';

import { shouldReduceMotion } from './helpers';

interface CounterOpts {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  onUpdate?: (value: string) => void;
  onComplete?: () => void;
}

export function animateCounter(
  element: HTMLElement,
  opts: CounterOpts
): () => void {
  const { from = 0, to, duration = 1400, suffix = '', prefix = '', decimals = 0 } = opts;

  if (shouldReduceMotion()) {
    element.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
    opts.onComplete?.();
    return () => {};
  }

  let start: number | null = null;
  let raf: number;
  const ease = (t: number) => 1 - Math.pow(1 - t, 4); // ease-out-quart

  function step(ts: number) {
    if (!start) start = ts;
    const elapsed = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = ease(progress);
    const current = from + (to - from) * eased;
    const formatted = current.toFixed(decimals);
    element.textContent = `${prefix}${formatted}${suffix}`;
    opts.onUpdate?.(`${prefix}${formatted}${suffix}`);
    if (progress < 1) {
      raf = requestAnimationFrame(step);
    } else {
      opts.onComplete?.();
    }
  }

  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

export function observeCounter(element: HTMLElement, opts: CounterOpts): () => void {
  let cleanup = () => {};
  let triggered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !triggered) {
        triggered = true;
        cleanup = animateCounter(element, opts);
        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(element);
  return () => {
    observer.disconnect();
    cleanup();
  };
}
