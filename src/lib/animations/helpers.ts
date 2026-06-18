'use client';

export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

// Easings que usan las animaciones (cubic-bezier strings para anime.js)
export const EASE = {
  outExpo: 'cubicBezier(0.16, 1, 0.3, 1)',
  outQuart: 'cubicBezier(0.25, 1, 0.5, 1)',
  outCubic: 'cubicBezier(0.33, 1, 0.68, 1)',
  inOutSine: 'cubicBezier(0.37, 0, 0.63, 1)',
} as const;

// Duraciones en ms
export const DUR = {
  micro: 160,
  fast: 280,
  base: 480,
  hero: 750,
  float: 8000,
} as const;
