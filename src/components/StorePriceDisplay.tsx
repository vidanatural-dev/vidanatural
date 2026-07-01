import type { StoreProduct } from '@/data/store/types';
import { formatPrice } from '@/lib/price';
import { offerDiscountPercent } from '@/lib/storePricing';

export function StorePriceDisplay({
  product,
  size = 'md',
}: {
  product: StoreProduct;
  size?: 'sm' | 'md' | 'lg';
}) {
  const onOffer = product.precioOferta != null && product.precioOferta < product.precio;
  const pct = offerDiscountPercent(product);

  const priceClass =
    size === 'lg'
      ? 'font-mono text-4xl font-bold'
      : size === 'sm'
        ? 'font-mono text-lg font-bold'
        : 'font-mono text-2xl font-bold';

  const oldClass =
    size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm';

  if (!onOffer) {
    return (
      <p className={`${priceClass} text-amber-600 dark:text-amber-400`}>
        {formatPrice(product.precio)}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-end gap-2">
      <p className={`${priceClass} text-amber-600 dark:text-amber-400`}>
        {formatPrice(product.precioOferta!)}
      </p>
      <p className={`${oldClass} pb-0.5 text-muted line-through`}>{formatPrice(product.precio)}</p>
      {pct != null && (
        <span className="mb-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-red-600 dark:text-red-400">
          −{pct}%
        </span>
      )}
    </div>
  );
}
