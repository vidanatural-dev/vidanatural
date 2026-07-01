'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { StoreProduct } from '@/data/store/types';
import { QuantityControl } from './QuantityControl';
import { Icon } from './Icon';

export function AddToCartControl({
  product,
  compact = false,
}: {
  product: StoreProduct;
  compact?: boolean;
}) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product.slug, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className={compact ? 'flex flex-col gap-2' : 'flex flex-col gap-3 sm:flex-row sm:items-center'}>
      <QuantityControl value={qty} onChange={setQty} size={compact ? 'sm' : 'md'} />
      <button
        type="button"
        onClick={handleAdd}
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 font-bold uppercase tracking-wide text-white shadow-sm transition-[background-color,transform] hover:bg-amber-600 active:scale-[0.98] ${
          compact ? 'w-full px-3 py-2 text-xs' : 'flex-1 px-6 py-3 text-sm'
        }`}
      >
        <Icon name="ShoppingCart" size={compact ? 16 : 20} weight="fill" />
        {added ? 'Agregado' : 'Agregar'}
      </button>
    </div>
  );
}
