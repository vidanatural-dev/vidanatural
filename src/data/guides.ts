import { guiasLote1 } from './guias-lote1';
import { guiasLote2 } from './guias-lote2';
import { guiasLote3 } from './guias-lote3';

export interface GuideQuestion {
  q: string;
  a: string;
}

export interface Guide {
  slug: string;
  titulo: string;
  intro: string;
  descripcion: string; // max 155 chars para meta description
  faq: GuideQuestion[];
  categoria: string;
  productosRelacionados: string[];
}

export const allGuides: Guide[] = [
  ...(guiasLote1 as Guide[]),
  ...(guiasLote2 as Guide[]),
  ...(guiasLote3 as Guide[]),
];

export function getGuide(slug: string): Guide | undefined {
  return allGuides.find((g) => g.slug === slug);
}

export function allGuideSlugs(): string[] {
  return allGuides.map((g) => g.slug);
}
