'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Botón con atracción magnética sutil al cursor. Usa motion values (sin re-render).
 * Se degrada a estático con prefers-reduced-motion.
 */
export function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'ghost';
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onEnter(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduce || e.pointerType !== 'mouse') return;
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
  }
  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = rectRef.current;
    if (!r) return;
    x.set(((e.clientX - r.left) / r.width - 0.5) * 9);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 9);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ x: sx, y: sy, display: 'inline-flex' }}>
      <Link
        ref={ref}
        href={href}
        onPointerEnter={onEnter}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className={`btn btn-${variant} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
