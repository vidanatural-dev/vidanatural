'use client';

import Link from 'next/link';
import { StoreProductImage } from './StoreProductImage';
import { StorePriceDisplay } from './StorePriceDisplay';
import { AddToCartControl } from './AddToCartControl';
import { offerDiscountPercent } from '@/lib/storePricing';
import type { StoreProduct } from '@/data/store/types';

export function ComboCarouselCard({ product }: { product: StoreProduct }) {
  const pct = offerDiscountPercent(product);

  return (
    <article className="flex h-full w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-amber-500/25 bg-surface shadow-card sm:w-[280px]">
      <Link href={`/comprar/${product.slug}`} className="relative flex flex-1 flex-col">
        {pct != null && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
            Oferta −{pct}%
          </span>
        )}
        <div className="relative aspect-square w-full overflow-hidden bg-white">
          <StoreProductImage product={product} sizes="280px" />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <span className="mb-1.5 w-fit rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
            Combo
          </span>
          <h3 className="line-clamp-2 min-h-[2.5rem] font-display text-base leading-snug text-ink">
            {product.nombre}
          </h3>
          <div className="mt-auto pt-3">
            <StorePriceDisplay product={product} size="sm" />
          </div>
        </div>
      </Link>
      <div className="border-t border-line px-4 py-3">
        <AddToCartControl product={product} compact />
      </div>
    </article>
  );
}
