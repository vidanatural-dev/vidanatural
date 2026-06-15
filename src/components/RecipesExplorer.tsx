'use client';

import { useMemo, useState } from 'react';
import { RecipeCard } from './RecipeCard';
import { Icon } from './Icon';
import type { Recipe, RecipeType } from '@/data/types';

interface ProductoOpt {
  slug: string;
  nombre: string;
}

const selectClass =
  'rounded-full border border-line-strong bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand';

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

export function RecipesExplorer({
  recipes,
  productos,
  tipos,
  tipoLabel,
  tags,
}: {
  recipes: Recipe[];
  productos: ProductoOpt[];
  tipos: RecipeType[];
  tipoLabel: Record<RecipeType, string>;
  tags: string[];
}) {
  const [q, setQ] = useState('');
  const [producto, setProducto] = useState('todos');
  const [tipo, setTipo] = useState<'todos' | RecipeType>('todos');
  const [dificultad, setDificultad] = useState('todas');
  const [tiempo, setTiempo] = useState(0);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [limit, setLimit] = useState(48);

  function toggleTag(t: string) {
    setActiveTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));
    setLimit(48);
  }

  const results = useMemo(() => {
    const nq = norm(q.trim());
    return recipes.filter((r) => {
      if (producto !== 'todos' && r.producto !== producto) return false;
      if (tipo !== 'todos' && r.tipo !== tipo) return false;
      if (dificultad !== 'todas' && r.dificultad !== dificultad) return false;
      if (tiempo > 0 && r.tiempoMin > tiempo) return false;
      if (activeTags.length > 0 && !activeTags.every((t) => r.tags.includes(t))) return false;
      if (nq && !norm(r.titulo + ' ' + r.descripcion).includes(nq)) return false;
      return true;
    });
  }, [recipes, q, producto, tipo, dificultad, tiempo, activeTags]);

  const visible = results.slice(0, limit);

  function clearAll() {
    setQ('');
    setProducto('todos');
    setTipo('todos');
    setDificultad('todas');
    setTiempo(0);
    setActiveTags([]);
    setLimit(48);
  }

  return (
    <div>
      <div className="rounded-xl border border-line bg-surface-2/50 p-4 sm:p-5">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            <Icon name="MagnifyingGlass" size={18} />
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setLimit(48);
            }}
            placeholder="Buscar receta por nombre..."
            aria-label="Buscar receta"
            className="search-input w-full rounded-full border border-line-strong bg-surface py-3 pl-11 pr-4 text-sm text-ink outline-none placeholder:text-muted focus:border-brand"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <select
            value={producto}
            onChange={(e) => { setProducto(e.target.value); setLimit(48); }}
            className={selectClass}
            aria-label="Filtrar por producto"
          >
            <option value="todos">Todos los productos</option>
            {productos.map((p) => (
              <option key={p.slug} value={p.slug}>{p.nombre}</option>
            ))}
          </select>

          <select
            value={tipo}
            onChange={(e) => { setTipo(e.target.value as RecipeType | 'todos'); setLimit(48); }}
            className={selectClass}
            aria-label="Filtrar por tipo de comida"
          >
            <option value="todos">Todos los tipos</option>
            {tipos.map((t) => (
              <option key={t} value={t}>{tipoLabel[t]}</option>
            ))}
          </select>

          <select
            value={dificultad}
            onChange={(e) => { setDificultad(e.target.value); setLimit(48); }}
            className={selectClass}
            aria-label="Filtrar por dificultad"
          >
            <option value="todas">Cualquier dificultad</option>
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Avanzada">Avanzada</option>
          </select>

          <select
            value={tiempo}
            onChange={(e) => { setTiempo(Number(e.target.value)); setLimit(48); }}
            className={selectClass}
            aria-label="Filtrar por tiempo"
          >
            <option value={0}>Cualquier tiempo</option>
            <option value={15}>Hasta 15 min</option>
            <option value={30}>Hasta 30 min</option>
            <option value={45}>Hasta 45 min</option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button key={t} type="button" className="chip" data-active={activeTags.includes(t)} onClick={() => toggleTag(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          {results.length} {results.length === 1 ? 'receta' : 'recetas'}
        </p>
        {(q || producto !== 'todos' || tipo !== 'todos' || dificultad !== 'todas' || tiempo > 0 || activeTags.length > 0) && (
          <button type="button" onClick={clearAll} className="text-sm font-medium text-brand transition-colors hover:text-brand-deep">
            Limpiar filtros
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((r, i) => (
              <RecipeCard key={r.slug} recipe={r} priority={i < 3} />
            ))}
          </div>
          {results.length > visible.length && (
            <div className="mt-10 flex justify-center">
              <button type="button" onClick={() => setLimit((l) => l + 48)} className="btn btn-ghost">
                Mostrar más recetas
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-4 grid place-items-center rounded-lg border border-dashed border-line-strong bg-surface-2 px-6 py-16 text-center">
          <span className="text-brand">
            <Icon name="BowlFood" size={32} weight="duotone" />
          </span>
          <p className="mt-3 font-display text-xl text-ink">Sin recetas con esos filtros</p>
          <p className="mt-1 max-w-sm text-sm text-ink-soft">Probá quitar algún filtro o buscar por otro nombre.</p>
          <button type="button" onClick={clearAll} className="btn btn-ghost mt-5 py-2 text-sm">Limpiar filtros</button>
        </div>
      )}
    </div>
  );
}
