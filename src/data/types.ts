export type UseCaseSlug =
  | 'digestion'
  | 'energia'
  | 'defensas'
  | 'descanso'
  | 'articulaciones'
  | 'mente'
  | 'piel-cabello'
  | 'circulacion'
  | 'control-peso'
  | 'huesos';

export interface UseCase {
  slug: UseCaseSlug;
  nombre: string;
  descripcion: string;
  icon: string; // clave de icono Phosphor (ver components/Icon.tsx)
  hue: number; // tono OKLCH para el arte generativo
  imagen?: string; // foto temática (banner de la categoría)
  intro?: string; // párrafo introductorio con contexto útil
  alimentos?: string[]; // alimentos y nutrientes que se asocian a esta necesidad
  consejos?: string[]; // hábitos generales que ayudan (no son indicaciones médicas)
  faq?: FAQItem[]; // preguntas frecuentes (informativas)
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface Fuente {
  nombre: string;
  url?: string;
}

export interface FormaDeConsumo {
  forma: string;
  detalle: string;
}

export interface Product {
  slug: string;
  nombre: string;
  nombreCientifico?: string;
  categoria: string; // Raíz, Alga, Mineral, Ácido graso, Apícola...
  tagline: string;
  resumen: string;
  queEs: string;
  composicion: string[];
  usosTradicionales: string[];
  comoSeConsume: FormaDeConsumo[];
  precauciones: string[];
  contraindicaciones: string;
  faq: FAQItem[];
  fuentes: Fuente[];
  casosDeUso: UseCaseSlug[];
  destacado?: boolean;
  hue: number; // tono OKLCH para el arte generativo del producto
  imagen?: string; // URL de foto real (opcional)
}

export type Dificultad = 'Fácil' | 'Media' | 'Avanzada';

export type RecipeType =
  | 'desayuno'
  | 'almuerzo'
  | 'cena'
  | 'snack'
  | 'postre'
  | 'bebida'
  | 'panificado'
  | 'ensalada'
  | 'guarnicion';

export interface Recipe {
  slug: string;
  titulo: string;
  descripcion: string;
  tipo: RecipeType;
  prepMin: number;
  cookMin: number;
  tiempoMin: number; // prep + cocción (compatibilidad con tarjetas)
  porciones: string;
  dificultad: Dificultad;
  ingredientes: string[];
  pasos: string[];
  tags: string[];
  producto: string; // slug del producto principal
  productos: string[]; // slugs de productos usados (incluye el principal)
  casoDeUso?: UseCaseSlug;
  seoTitle: string;
  seoDescription: string;
  faq: FAQItem[];
  tip?: string;
  destacado?: boolean;
  hue: number;
  imagen?: string;
}
