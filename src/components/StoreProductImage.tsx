import Image from 'next/image';
import { ProductArt } from './ProductArt';
import { glyphForCategory } from '@/lib/glyph';
import type { StoreProduct } from '@/data/store/types';
import { isPoorStoreImage, upgradeStoreImageUrl } from '@/lib/productImagery';

function hueFromSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 360;
  return h;
}

export function StoreProductImage({
  product,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 33vw',
  className = '',
}: {
  product: StoreProduct;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const raw = product.imagen;
  const src = raw && !isPoorStoreImage(raw) ? upgradeStoreImageUrl(raw) : undefined;

  if (src) {
    const fit = className.includes('object-') ? '' : 'object-contain';
    return (
      <Image
        src={src}
        alt={product.nombre}
        fill
        sizes={sizes}
        priority={priority}
        className={`${fit} p-3 ${className}`.trim()}
      />
    );
  }

  return (
    <ProductArt
      hue={hueFromSlug(product.slug)}
      glyph={glyphForCategory(product.categoria)}
      className={className}
    />
  );
}
