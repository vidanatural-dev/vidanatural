import Image from 'next/image';
import { ProductArt } from './ProductArt';
import { glyphForCategory } from '@/lib/glyph';
import type { Product } from '@/data/types';
import { isMarketingPackshot } from '@/lib/productImagery';

/**
 * Foto limpia del producto o arte generativo (sin packshots con texto incrustado).
 */
export function ProductImage({
  product,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 33vw',
  className = '',
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const src = product.imagen && !isMarketingPackshot(product.imagen) ? product.imagen : undefined;

  if (src) {
    const fit = className.includes('object-') ? '' : 'object-cover';
    return (
      <Image
        src={src}
        alt={`${product.nombre}${product.nombreCientifico ? ` (${product.nombreCientifico})` : ''}`}
        fill
        sizes={sizes}
        priority={priority}
        className={`${fit} ${className}`.trim()}
      />
    );
  }
  return (
    <ProductArt
      hue={product.hue}
      glyph={glyphForCategory(product.categoria)}
      className={className}
    />
  );
}
