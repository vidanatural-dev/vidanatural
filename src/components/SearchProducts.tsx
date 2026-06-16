'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from './ProductCard';
import { Icon } from './Icon';
import type { Product, UseCase, UseCaseSlug } from '@/data/types';

export function SearchProducts({
  products,
  useCases,
}: {
  products: Product[];
  useCases: UseCase[];
}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<UseCaseSlug | 'todos'>('todos');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchUse = filter === 'todos' || p.casosDeUso.includes(filter);
      const matchText =
        q === '' ||
        p.nombre.toLowerCase().includes(q) ||
        p.nombreCientifico?.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q);
      return matchUse && matchText;
    });
  }, [products, query, filter]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="relative max-w-md">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            <Icon name="MagnifyingGlass" size={18} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto, categoría o nombre científico"
            aria-label="Buscar productos"
            className="search-input w-full rounded-full border border-line-strong bg-surface py-3 pl-11 pr-4 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-brand"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="chip"
            data-active={filter === 'todos'}
            aria-pressed={filter === 'todos'}
            onClick={() => setFilter('todos')}
          >
            Todos
          </button>
          {useCases.map((u) => (
            <button
              key={u.slug}
              type="button"
              className="chip"
              data-active={filter === u.slug}
              aria-pressed={filter === u.slug}
              onClick={() => setFilter(u.slug)}
            >
              <Icon name={u.icon} size={15} weight="bold" />
              {u.nombre}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? 'producto' : 'productos'}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid place-items-center rounded-lg border border-dashed border-line-strong bg-surface-2 px-6 py-16 text-center">
          <span className="text-brand">
            <Icon name="Leaf" size={32} weight="duotone" />
          </span>
          <p className="mt-3 font-display text-xl text-ink">Sin resultados</p>
          <p className="mt-1 max-w-sm text-sm text-ink-soft">
            No encontramos productos con esos filtros. Probá con otra palabra o quitá el filtro de
            uso.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setFilter('todos');
            }}
            className="btn btn-ghost mt-5 py-2 text-sm"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
