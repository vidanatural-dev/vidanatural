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
  fit = 'cover',
}: {
  product: StoreProduct;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** cover = llena el contenedor sin bordes; contain = entra completa con posible margen */
  fit?: 'cover' | 'contain';
}) {
  const local = product.imagenes?.[0] ?? (product.imagen.startsWith('/') ? product.imagen : undefined);
  const raw = local ?? product.imagen;
  const src =
    local ??
    (raw && !isPoorStoreImage(raw) ? upgradeStoreImageUrl(raw) : undefined);

  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  if (src) {
    return (
      <Image
        src={src}
        alt={product.nombre}
        fill
        sizes={sizes}
        priority={priority}
        className={`${fitClass} object-center ${className}`.trim()}
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
