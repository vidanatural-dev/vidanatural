'use client';

import { useEffect, useRef } from 'react';
import { floatGroup } from '@/lib/animations/floating';
import { animConfig } from '@/lib/animations/config';

// SVG de hoja/semilla minimalistas para decoración del hero
const LEAF_PATHS = [
  // hoja simple
  'M10 2 C10 2 16 6 16 12 C16 18 10 22 10 22 C10 22 4 18 4 12 C4 6 10 2 10 2Z',
  // semilla ovalada
  'M12 2 C17 4 20 9 18 14 C16 19 10 22 6 20 C2 18 1 12 4 7 C7 2 12 2 12 2Z',
  // hojita pequeña
  'M8 1 C12 3 14 8 12 13 C10 17 5 18 3 14 C1 10 3 4 8 1Z',
];

const LEAVES = [
  { size: 28, opacity: 0.13, top: '12%', left: '3%', pathIdx: 0, rotate: -20 },
  { size: 20, opacity: 0.10, top: '28%', left: '8%', pathIdx: 2, rotate: 35 },
  { size: 32, opacity: 0.08, top: '60%', left: '2%', pathIdx: 1, rotate: -10 },
  { size: 22, opacity: 0.11, top: '8%',  right: '4%', pathIdx: 2, rotate: 15 },
  { size: 36, opacity: 0.07, top: '45%', right: '2%', pathIdx: 0, rotate: 40 },
  { size: 18, opacity: 0.09, top: '72%', right: '6%', pathIdx: 1, rotate: -30 },
];

export function FloatingLeaves() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animConfig.floatingElements || !containerRef.current) return;
    const els = containerRef.current.querySelectorAll<HTMLElement>('[data-leaf]');
    return floatGroup(els, { x: 5, y: 7, rotate: 5, duration: 9000 });
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {LEAVES.map((leaf, i) => (
        <div
          key={i}
          data-leaf
          className="absolute"
          style={{
            width: leaf.size,
            height: leaf.size,
            top: leaf.top,
            left: 'left' in leaf ? leaf.left : undefined,
            right: 'right' in leaf ? (leaf as { right: string }).right : undefined,
            opacity: leaf.opacity,
            transform: `rotate(${leaf.rotate}deg)`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="var(--brand)" xmlns="http://www.w3.org/2000/svg">
            <path d={LEAF_PATHS[leaf.pathIdx]} />
          </svg>
        </div>
      ))}
    </div>
  );
}
