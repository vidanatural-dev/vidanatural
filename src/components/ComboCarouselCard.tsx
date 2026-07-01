'use client';

import Link from 'next/link';
import { StoreProductMedia } from './StoreProductImage';
import { StorePriceDisplay } from './StorePriceDisplay';
import { AddToCartControl } from './AddToCartControl';
import { offerDiscountPercent } from '@/lib/storePricing';
import type { StoreProduct } from '@/data/store/types';

export function ComboCarouselCard({ product }: { product: StoreProduct }) {
  const pct = offerDiscountPercent(product);

  return (
    <article className="flex h-full w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-amber-500/25 bg-surface shadow-card sm:w-[340px]">
      <Link href={`/comprar/${product.slug}`} className="block">
        <div className="relative">
          {pct != null && (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
              Oferta −{pct}%
            </span>
          )}
          <StoreProductMedia product={product} sizes="340px" fit="cover" />
        </div>
        <div className="flex flex-col p-4">
          <span className="mb-1.5 w-fit rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
            Combo
          </span>
          <h3 className="line-clamp-2 min-h-[2.5rem] font-display text-base leading-snug text-ink">
            {product.nombre}
          </h3>
          <div className="mt-3">
            <StorePriceDisplay product={product} size="sm" />
          </div>
        </div>
      </Link>
      <div className="mt-auto border-t border-line px-4 py-3">
        <AddToCartControl product={product} compact />
      </div>
    </article>
  );
}
