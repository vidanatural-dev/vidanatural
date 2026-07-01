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
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
        <Image
          key={current}
          src={current}
          alt={`${product.nombre} — foto ${active + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
          className="object-contain p-4"
        />
      </div>

      {images.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-1"
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
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-[border-color,opacity] ${
                i === active
                  ? 'border-amber-500 opacity-100'
                  : 'border-line opacity-70 hover:border-amber-500/50 hover:opacity-100'
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
