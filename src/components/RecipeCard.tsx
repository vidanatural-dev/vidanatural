'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { RecipeImage } from './RecipeImage';
import { Icon } from './Icon';
import type { Recipe } from '@/data/types';

export function RecipeCard({ recipe, priority = false }: { recipe: Recipe; priority?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  return (
    <Link
      ref={ref}
      href={`/recetas/${recipe.slug}`}
      onPointerMove={onMove}
      className="group relative flex transform-gpu flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-card transition-[transform,box-shadow,border-color] duration-[250ms] ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift active:scale-[0.985]"
    >
      <span
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(240px circle at var(--mx, 50%) var(--my, 0%), var(--card-glow), transparent 72%)',
        }}
        aria-hidden
      />
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.05]">
          <RecipeImage recipe={recipe} priority={priority} />
        </div>
        <span className="badge absolute left-3 top-3 z-20 bg-surface/90 backdrop-blur-sm">
          <Icon name="Clock" size={13} weight="bold" />
          {recipe.tiempoMin} min
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl leading-tight text-ink">{recipe.titulo}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{recipe.descripcion}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="ForkKnife" size={14} weight="bold" />
            {recipe.porciones}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Fire" size={14} weight="bold" />
            {recipe.dificultad}
          </span>
        </div>
      </div>
    </Link>
  );
}
