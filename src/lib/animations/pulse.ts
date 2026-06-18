'use client';

import { shouldReduceMotion } from './helpers';

// Pulso periódico suave para CTA WhatsApp — sin loop infinito pesado
// Usa CSS animation para no bloquear el thread; anime.js solo en fallback
export function startPulse(
  element: HTMLElement,
  intervalMs = 5500
): () => void {
  if (shouldReduceMotion()) return () => {};

  let timer: ReturnType<typeof setTimeout>;

  const pulse = () => {
    element.animate(
      [
        { transform: 'scale(1)', boxShadow: '0 0 0 0px rgba(27,140,78,0.4)' },
        { transform: 'scale(1.04)', boxShadow: '0 0 0 8px rgba(27,140,78,0.12)' },
        { transform: 'scale(1)', boxShadow: '0 0 0 0px rgba(27,140,78,0)' },
      ],
      { duration: 700, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'none' }
    );
    timer = setTimeout(pulse, intervalMs);
  };

  // Primera vez con delay para no dispararse al cargar
  timer = setTimeout(pulse, 3000);

  return () => clearTimeout(timer);
}
