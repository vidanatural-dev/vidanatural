'use client';

import { useEffect, useRef } from 'react';
import { observeCounter } from '@/lib/animations/counter';

interface Props {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  to,
  suffix = '',
  prefix = '',
  duration = 1400,
  decimals = 0,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Set initial value immediately for SSR/no-JS parity
    ref.current.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
    return observeCounter(ref.current, { to, suffix, prefix, duration, decimals, from: 0 });
  }, [to, suffix, prefix, duration, decimals]);

  return (
    <span ref={ref} aria-live="off" className={className}>
      {prefix}{to.toFixed(decimals)}{suffix}
    </span>
  );
}
