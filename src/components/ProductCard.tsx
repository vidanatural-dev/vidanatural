'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ProductImage } from './ProductImage';
import { Icon } from './Icon';
import type { Product } from '@/data/types';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Spotlight siguiendo el cursor sin re-render (set directo de variables CSS).
  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  return (
    <Link
      ref={ref}
      href={`/productos/${product.slug}`}
      onPointerMove={onMove}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
    >
      {/* spotlight */}
      <span
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(220px circle at var(--mx, 50%) var(--my, 0%), oklch(0.6 0.12 90 / 0.12), transparent 70%)',
        }}
        aria-hidden
      />
      <div className="relative aspect-square w-full overflow-hidden bg-surface-2">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          <ProductImage product={product} priority={priority} />
        </div>
        <span className="badge absolute left-3 top-3 z-20 bg-surface/90 backdrop-blur-sm">
          {product.categoria}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl leading-tight text-ink">{product.nombre}</h3>
        {product.nombreCientifico && (
          <p className="mt-0.5 font-mono text-xs italic text-muted">{product.nombreCientifico}</p>
        )}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{product.tagline}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors">
          Ver ficha
          <Icon name="ArrowRight" size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
