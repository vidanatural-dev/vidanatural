'use client';

import { shouldReduceMotion, isMobile } from './helpers';

interface FloatOpts {
  x?: number;       // amplitud horizontal px
  y?: number;       // amplitud vertical px
  rotate?: number;  // grados max de rotación
  duration?: number; // ms de un ciclo completo
  delay?: number;
}

// Anima un elemento con flotación suave usando Web Animations API
// (más liviano que anime.js para loops infinitos)
export function floatElement(el: HTMLElement, opts: FloatOpts = {}): () => void {
  if (shouldReduceMotion() || isMobile()) return () => {};

  const {
    x = 6,
    y = 8,
    rotate = 4,
    duration = 9000,
    delay = 0,
  } = opts;

  const anim = el.animate(
    [
      { transform: `translate(0px, 0px) rotate(0deg)` },
      { transform: `translate(${x}px, ${-y}px) rotate(${rotate / 2}deg)` },
      { transform: `translate(${x / 2}px, ${-y * 1.2}px) rotate(${rotate}deg)` },
      { transform: `translate(${-x / 3}px, ${-y / 2}px) rotate(${rotate * 0.6}deg)` },
      { transform: `translate(0px, 0px) rotate(0deg)` },
    ],
    {
      duration,
      delay,
      iterations: Infinity,
      easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
      fill: 'none',
    }
  );

  return () => anim.cancel();
}

// Aplica floatElement a múltiples elementos con delays escalonados
export function floatGroup(
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  baseOpts: FloatOpts = {}
): () => void {
  if (shouldReduceMotion() || isMobile()) return () => {};

  const arr = Array.from(elements);
  const cleanups = arr.map((el, i) =>
    floatElement(el, {
      ...baseOpts,
      delay: (baseOpts.delay ?? 0) + i * 900,
      x: (baseOpts.x ?? 6) * (0.7 + i * 0.15),
      y: (baseOpts.y ?? 8) * (0.8 + i * 0.1),
      rotate: (baseOpts.rotate ?? 4) * (0.8 + i * 0.12),
      duration: (baseOpts.duration ?? 9000) + i * 1200,
    })
  );

  return () => cleanups.forEach((fn) => fn());
}
