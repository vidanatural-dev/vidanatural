'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { StoreProductImage } from './StoreProductImage';
import { Icon } from './Icon';
import type { StoreProduct } from '@/data/store/types';
import { formatPrice } from '@/lib/price';

export function StoreProductCard({
  product,
  priority = false,
}: {
  product: StoreProduct;
  priority?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

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
      href={`/comprar/${product.slug}`}
      onPointerMove={onMove}
      className="group relative flex transform-gpu flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-[transform,box-shadow,border-color] duration-[250ms] ease-out hover:-translate-y-1.5 hover:border-amber-500/50 hover:shadow-lift active:scale-[0.985]"
    >
      <span
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(240px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklch, var(--accent) 18%, transparent), transparent 72%)',
        }}
        aria-hidden
      />
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <StoreProductImage
          product={product}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 w-fit rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
          {product.categoria}
        </span>
        <h3 className="line-clamp-2 font-display text-xl leading-tight text-ink">{product.nombre}</h3>
        <p className="mt-3 font-mono text-2xl font-bold text-amber-600 dark:text-amber-400">
          {formatPrice(product.precio)}
        </p>
        <span className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-[background-color,transform] group-hover:bg-amber-600 group-active:scale-[0.98]">
          <Icon name="Storefront" size={18} weight="fill" />
          Comprar
        </span>
      </div>
    </Link>
  );
}
