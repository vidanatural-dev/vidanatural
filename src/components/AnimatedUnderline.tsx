'use client';

import { useEffect, useRef } from 'react';
import { observeUnderline } from '@/lib/animations/svgPath';

interface Props {
  children: React.ReactNode;
  color?: string;   // CSS color value
  duration?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

// Titulo con subrayado SVG que se dibuja al entrar en viewport
export function AnimatedUnderline({
  children,
  color = 'var(--brand)',
  duration = 650,
  className = '',
  as: Tag = 'span',
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    return observeUnderline(svgRef.current, duration);
  }, [duration]);

  return (
    <Tag className={`relative inline-block ${className}`}>
      {children}
      <svg
        ref={svgRef}
        aria-hidden
        className="pointer-events-none absolute -bottom-[3px] left-0 w-full overflow-visible"
        viewBox="0 0 200 6"
        preserveAspectRatio="none"
        height="6"
      >
        <path
          d="M0 3 Q50 0.5 100 3 Q150 5.5 200 3"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </Tag>
  );
}
