'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { StoreProduct } from '@/data/store/types';

export function StoreProductGallery({
  product,
  priority = false,
}: {
  product: StoreProduct;
  priority?: boolean;
}) {
  const images = product.imagenes?.length ? product.imagenes : [product.imagen];
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
        <div className="absolute inset-[8%]">
          <Image
            key={current}
            src={current}
            alt={`${product.nombre} — foto ${active + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={priority}
            className="object-contain object-center"
          />
        </div>
      </div>

      {images.length > 1 && (
        <>
          <p className="text-sm font-medium text-muted">
            {images.length} fotos — tocá para ampliar
          </p>
          <div
            className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5"
            role="tablist"
            aria-label="Galería de fotos del producto"
          >
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Foto ${i + 1}`}
                onClick={() => setActive(i)}
                className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-white transition-[border-color,opacity,transform] hover:scale-[1.02] ${
                  i === active
                    ? 'border-amber-500 ring-2 ring-amber-500/30'
                    : 'border-line opacity-90 hover:border-amber-500/50'
                }`}
              >
                <div className="absolute inset-[10%]">
                  <Image src={src} alt="" fill sizes="120px" className="object-contain object-center" />
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
