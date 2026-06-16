import Image from 'next/image';
import { ProductArt } from './ProductArt';
import { glyphForCategory } from '@/lib/glyph';
import type { Product } from '@/data/types';

/**
 * Muestra la foto real del producto si existe (next/image), o el visual
 * generativo como respaldo. Pensado para llenar su contenedor (usar relative + aspect).
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
  if (product.imagen) {
    const fit = className.includes('object-') ? '' : 'object-cover';
    return (
      <Image
        src={product.imagen}
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
