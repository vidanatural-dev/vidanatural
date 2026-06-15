import { products } from '@/data/products';
import { recipes } from '@/data/recipes';
import { useCases } from '@/data/useCases';
import { glyphForCategory } from './glyph';
import type { UseCaseSlug } from '@/data/types';

export type SearchType = 'producto' | 'receta' | 'uso';

export interface SearchItem {
  id: string;
  type: SearchType;
  title: string;
  subtitle: string;
  href: string;
  icon: string;
  hue: number;
  image?: string;
  haystack: string;
  normTitle: string;
}

export const typeLabel: Record<SearchType, string> = {
  producto: 'Productos',
  receta: 'Recetas',
  uso: 'Necesidades',
};

/**
 * Sinónimos / palabras por necesidad (afecciones y temas frecuentes).
 * Son ayudas de búsqueda para orientar a contenido informativo, no
 * recomendaciones médicas.
 */
const usoSinonimos: Record<UseCaseSlug, string[]> = {
  digestion: ['digestion', 'estomago', 'intestino', 'fibra', 'transito', 'hinchazon', 'pesadez', 'estreñimiento', 'constipacion'],
  energia: ['energia', 'cansancio', 'fatiga', 'vitalidad', 'rendimiento', 'deporte', 'desayuno', 'animo'],
  defensas: ['defensas', 'inmunidad', 'resfrio', 'gripe', 'invierno', 'vitaminas', 'antioxidantes'],
  descanso: ['descanso', 'sueño', 'dormir', 'insomnio', 'relax', 'estres', 'calma', 'nervios', 'ansiedad'],
  articulaciones: ['articulaciones', 'huesos', 'musculos', 'movilidad', 'dolor', 'deporte', 'recuperacion'],
  mente: ['mente', 'memoria', 'concentracion', 'foco', 'cerebro', 'estudio', 'animo'],
};

const norm = (s: string): string =>
  s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const p of products) {
    const usoWords = p.casosDeUso.flatMap((c) => usoSinonimos[c] ?? []);
    items.push({
      id: `producto-${p.slug}`,
      type: 'producto',
      title: p.nombre,
      subtitle: p.categoria,
      href: `/productos/${p.slug}`,
      icon: glyphForCategory(p.categoria),
      hue: p.hue,
      image: p.imagen,
      normTitle: norm(p.nombre),
      haystack: norm(
        [p.nombre, p.nombreCientifico ?? '', p.categoria, p.tagline, p.resumen, ...p.usosTradicionales, ...usoWords].join(' ')
      ),
    });
  }

  for (const r of recipes) {
    const prodNames = r.productos
      .map((slug) => products.find((p) => p.slug === slug)?.nombre ?? '')
      .join(' ');
    const usoWords = r.casoDeUso ? usoSinonimos[r.casoDeUso] ?? [] : [];
    items.push({
      id: `receta-${r.slug}`,
      type: 'receta',
      title: r.titulo,
      subtitle: `${r.tiempoMin} min · ${r.dificultad}`,
      href: `/recetas/${r.slug}`,
      icon: 'BowlFood',
      hue: r.hue,
      image: r.imagen,
      normTitle: norm(r.titulo),
      haystack: norm([r.titulo, r.descripcion, prodNames, r.tipo, ...r.tags, ...usoWords].join(' ')),
    });
  }

  for (const u of useCases) {
    items.push({
      id: `uso-${u.slug}`,
      type: 'uso',
      title: u.nombre,
      subtitle: 'Necesidad',
      href: `/usos/${u.slug}`,
      icon: u.icon,
      hue: u.hue,
      normTitle: norm(u.nombre),
      haystack: norm([u.nombre, u.descripcion, ...(usoSinonimos[u.slug] ?? [])].join(' ')),
    });
  }

  return items;
}

const INDEX = buildIndex();

const typeWeight: Record<SearchType, number> = { uso: 0.5, producto: 0.4, receta: 0.3 };

export function searchAll(query: string, limit = 12): SearchItem[] {
  const q = norm(query.trim());
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  return INDEX.map((item) => {
    let score = 0;
    for (const t of tokens) {
      if (!item.haystack.includes(t)) return { item, score: 0 };
      score += item.normTitle.includes(t) ? 3 : 1;
      if (item.normTitle.startsWith(t)) score += 2;
    }
    return { item, score: score + typeWeight[item.type] };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.item);
}

/** Sugerencias para el estado inicial del buscador (sin texto). */
export function searchSuggestions(): string[] {
  return ['Para dormir', 'Energía', 'Digestión', 'Defensas', 'Chía', 'Recetas'];
}
