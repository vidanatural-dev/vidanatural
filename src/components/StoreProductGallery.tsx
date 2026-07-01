'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { StoreProduct } from '@/data/store/types';
import { sortImageUrls } from '@/lib/imageOrder';

export function StoreProductGallery({
  product,
  priority = false,
}: {
  product: StoreProduct;
  priority?: boolean;
}) {
  const images = useMemo(() => {
    const list = product.imagenes?.length ? product.imagenes : [product.imagen];
    return sortImageUrls(list);
  }, [product.imagen, product.imagenes]);

  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  const total = images.length;

  return (
    <div className="space-y-4">
      <div className="store-product-media relative aspect-square overflow-hidden rounded-2xl border border-line shadow-lift">
        {total > 1 && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-ink/75 px-2.5 py-1 font-mono text-xs font-semibold tabular-nums text-white backdrop-blur-sm">
            {active + 1}/{total}
          </span>
        )}
        <Image
          key={current}
          src={current}
          alt={`${product.nombre} — foto ${active + 1} de ${total}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
          className="object-cover object-center"
        />
      </div>

      {total > 1 && (
        <>
          <p className="text-sm font-medium text-muted">
            {total} fotos en orden — tocá para ver cada una
          </p>
          <div
            className="grid grid-cols-5 gap-2"
            role="tablist"
            aria-label="Galería de fotos del producto"
          >
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Foto ${i + 1} de ${total}`}
                onClick={() => setActive(i)}
                className={`store-product-media relative aspect-square overflow-hidden rounded-xl border-2 transition-[border-color,opacity,transform] hover:scale-[1.02] ${
                  i === active
                    ? 'border-amber-500 ring-2 ring-amber-500/30'
                    : 'border-line opacity-90 hover:border-amber-500/50'
                }`}
              >
                <span className="absolute left-1 top-1 z-10 rounded bg-ink/70 px-1 font-mono text-[9px] font-bold text-white">
                  {i + 1}
                </span>
                <Image src={src} alt="" fill sizes="120px" className="object-cover object-center" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
