'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { StoreProductImage } from './StoreProductImage';
import { StorePriceDisplay } from './StorePriceDisplay';
import { AddToCartControl } from './AddToCartControl';
import type { StoreProduct } from '@/data/store/types';

export function StoreProductCard({
  product,
  priority = false,
}: {
  product: StoreProduct;
  priority?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  function onMove(e: React.PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      className="group relative flex h-full transform-gpu flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-[transform,box-shadow,border-color] duration-[250ms] ease-out hover:-translate-y-1.5 hover:border-amber-500/50 hover:shadow-lift"
    >
      <span
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(240px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklch, var(--accent) 18%, transparent), transparent 72%)',
        }}
        aria-hidden
      />

      <Link href={`/comprar/${product.slug}`} className="relative z-20 flex flex-1 flex-col">
        <div className="relative aspect-square w-full overflow-hidden bg-white">
          <StoreProductImage
            product={product}
            priority={priority}
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>

        <div className="flex min-h-[148px] flex-1 flex-col p-5">
          <span className="mb-2 w-fit rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
            {product.categoria}
          </span>
          <h3 className="line-clamp-2 min-h-[2.75rem] font-display text-xl leading-tight text-ink">
            {product.nombre}
          </h3>
          <div className="mt-auto pt-3">
            <StorePriceDisplay product={product} />
          </div>
        </div>
      </Link>

      <div className="relative z-20 border-t border-line bg-surface px-5 py-4">
        <AddToCartControl product={product} compact />
      </div>
    </article>
  );
}
