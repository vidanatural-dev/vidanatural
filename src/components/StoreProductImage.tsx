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

export function hasLocalGallery(product: StoreProduct): boolean {
  return Boolean(product.imagenes?.length) || product.imagen.startsWith('/');
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

/** Contenedor cuadrado que fuerza la imagen a llenar todo el espacio. */
export function StoreProductMedia({
  product,
  priority = false,
  sizes,
  className = '',
  fit,
}: {
  product: StoreProduct;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fit?: 'cover' | 'contain';
}) {
  const useContain = fit === 'contain' || (!hasLocalGallery(product) && fit !== 'cover');

  return (
    <div className={`store-product-media relative aspect-square w-full overflow-hidden ${className}`}>
      <StoreProductImage
        product={product}
        priority={priority}
        sizes={sizes}
        fit={useContain ? 'contain' : 'cover'}
      />
    </div>
  );
}
