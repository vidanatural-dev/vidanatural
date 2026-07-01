'use client';

import { AddToCartControl } from '@/components/AddToCartControl';
import { Icon } from '@/components/Icon';
import type { StoreProduct } from '@/data/store/types';
import Link from 'next/link';

export function StoreProductActions({ product }: { product: StoreProduct }) {
  return (
    <div className="space-y-4">
      <AddToCartControl product={product} />
      <Link
        href="/comprar/carrito"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line-strong bg-surface px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:border-amber-500 hover:text-amber-600"
      >
        <Icon name="ShoppingCart" size={20} weight="fill" />
        Ver carrito
      </Link>
    </div>
  );
}
