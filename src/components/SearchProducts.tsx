'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ProductCard } from './ProductCard';
import { Icon } from './Icon';
import type { Product, UseCase, UseCaseSlug } from '@/data/types';

const EASE = [0.16, 1, 0.3, 1] as const;

export function SearchProducts({
  products,
  useCases,
}: {
  products: Product[];
  useCases: UseCase[];
}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<UseCaseSlug | 'todos'>('todos');
  const reduce = useReducedMotion();

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

  // Key changes when filter/query change, triggering AnimatePresence exit+enter
  const gridKey = `${filter}::${query}`;

  return (
    <div>
      <div className="flex flex-col gap-5">
        {/* Search input */}
        <div className="relative max-w-md">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            <Icon name="MagnifyingGlass" size={18} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto, categoria o nombre cientifico"
            aria-label="Buscar productos"
            className="search-input w-full rounded-full border border-line-strong bg-surface py-3 pl-11 pr-4 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-brand focus:shadow-[0_0_0_3px_var(--brand-soft)]"
          />
        </div>

        {/* Filter chips */}
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

      <AnimatePresence mode="wait">
        {results.length > 0 ? (
          <motion.div
            key={gridKey}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? {} : { opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {results.map((p, i) => (
              reduce ? (
                <ProductCard key={p.slug} product={p} priority={i < 3} />
              ) : (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: Math.min(i * 0.04, 0.4), ease: EASE }}
                >
                  <ProductCard product={p} priority={i < 3} />
                </motion.div>
              )
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? {} : { opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-4 grid place-items-center rounded-lg border border-dashed border-line-strong bg-surface-2 px-6 py-16 text-center"
          >
            <span className="text-brand">
              <Icon name="Leaf" size={32} weight="duotone" />
            </span>
            <p className="mt-3 font-display text-xl text-ink">Sin resultados</p>
            <p className="mt-1 max-w-sm text-sm text-ink-soft">
              No encontramos productos con esos filtros. Proba con otra palabra o quita el filtro de
              uso.
            </p>
            <button
              type="button"
              onClick={() => { setQuery(''); setFilter('todos'); }}
              className="btn btn-ghost mt-5 py-2 text-sm"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
