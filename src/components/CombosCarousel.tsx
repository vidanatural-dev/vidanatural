'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Icon } from './Icon';
import { ComboCarouselCard } from './ComboCarouselCard';
import type { StoreProduct } from '@/data/store/types';
import { COMBO_OFFER_DISCOUNT } from '@/lib/storePricing';

export function CombosCarousel({ combos }: { combos: StoreProduct[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows, combos.length]);

  function scrollByPage(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.max(340, el.clientWidth * 0.85);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  if (combos.length === 0) return null;

  const pct = Math.round(COMBO_OFFER_DISCOUNT * 100);

  return (
    <section
      className="mb-12 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-surface to-surface p-5 sm:p-7"
      aria-labelledby="combos-carousel-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            <Icon name="Sparkle" size={12} weight="fill" />
            Ofertas
          </span>
          <h2 id="combos-carousel-title" className="mt-3 font-display text-h2 text-ink">
            Combos en promoción
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {combos.length} combos con <strong className="text-amber-700 dark:text-amber-300">{pct}% off</strong>{' '}
            en el catálogo
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            aria-label="Combos anteriores"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-amber-500 disabled:opacity-35"
          >
            <Icon name="CaretLeft" size={18} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            aria-label="Combos siguientes"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-amber-500 disabled:opacity-35"
          >
            <Icon name="CaretRight" size={18} weight="bold" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="combos-carousel mt-5 flex gap-4 overflow-x-auto pb-2 pt-1 scroll-smooth snap-x snap-mandatory"
        role="list"
      >
        {combos.map((product) => (
          <div key={product.slug} role="listitem">
            <ComboCarouselCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
