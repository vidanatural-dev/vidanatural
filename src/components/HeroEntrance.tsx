'use client';

import { useEffect, useRef } from 'react';
import { shouldReduceMotion } from '@/lib/animations/helpers';
import { animConfig } from '@/lib/animations/config';

interface Props {
  children: React.ReactNode;
  delay?: number;      // ms antes de empezar la secuencia
  stagger?: number;    // ms entre cada hijo directo
  y?: number;          // translateY inicial en px
  className?: string;
}

// Envuelve hijos directos y los hace entrar en stagger al montar
// Cada hijo directo recibe su propio delay
export function HeroEntrance({
  children,
  delay = 120,
  stagger = 90,
  y = 18,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animConfig.heroAnimations || !ref.current) return;
    if (shouldReduceMotion()) return;

    const items = Array.from(ref.current.children) as HTMLElement[];

    // Estado inicial
    items.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = `translateY(${y}px)`;
      el.style.transition = 'none';
    });

    // Disparar con delays escalonados
    const timers = items.map((el, i) =>
      setTimeout(() => {
        el.style.transition = `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0px)';
      }, delay + i * stagger)
    );

    return () => timers.forEach(clearTimeout);
  }, [delay, stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
