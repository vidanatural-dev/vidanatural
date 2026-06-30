import type { Product, UseCaseSlug } from './types';
import { buildProduct } from './productEngine';
import type { SeedProduct } from './productEngine';
import catalog from './dieteticasCatalog.json';

interface CatalogEntry {
  slug: string;
  nombre: string;
  precioOrigen: number;
  precio: number;
  imagen: string;
  categoria: string;
  urlOrigen: string;
}

/** Inferir categoría interna a partir del nombre del producto. */
function inferCategoria(nombre: string): string {
  const n = nombre.toLowerCase();
  if (/\b(aceite|óleo|oleo)\b/.test(n)) return 'Aceite';
  if (/\b(harina|premezcla|fecula|fécula|almidón|almidon)\b/.test(n)) return 'Harina';
  if (/\b(semilla|chia|lino|girasol|sésamo|sesamo|amapola|mostaza)\b/.test(n)) return 'Semilla';
  if (/\b(fruto seco|almendra|nuez|mani|maní|avellana|castaña|caju|pistacho|macadamia|pecan)\b/.test(n)) return 'Fruto seco';
  if (/\b(te |té |yerba|infusion|infusión|hibiscus|manzanilla|boldo|menta|rooibos)\b/.test(n)) return 'Infusión';
  if (/\b(hierba|tintura|flor de|raíz|raiz)\b/.test(n)) return 'Hierba';
  if (/\b(suplemento|comprimido|cápsula|capsula|proteína|proteina|colágeno|colageno|vitamina|magnesio|omega)\b/.test(n)) return 'Superalimento';
  if (/\b(especia|condimento|pimienta|canela|comino|curry|pimentón|pimenton|oregano|romero)\b/.test(n)) return 'Especia';
  if (/\b(legumbre|lenteja|garbanzo|poroto|arveja|soja)\b/.test(n)) return 'Legumbre';
  if (/\b(arroz|avena|quinoa|mijo|trigo|cebada|polenta|fideo|pasta)\b/.test(n)) return 'Cereal';
  if (/\b(miel|stevia|azúcar|azucar|mascabo|endulzante|jarabe)\b/.test(n)) return 'Endulzante';
  if (/\b(galletita|alfajor|barrita|chocolate|snack|galleta)\b/.test(n)) return 'Snack';
  if (/\b(cosmética|cosmetica|jabón|jabon|shampoo|crema|serum)\b/.test(n)) return 'Otro';
  return 'Otro';
}

const CASOS_DEFAULT: UseCaseSlug[] = ['digestion'];

const CASOS_BY_CAT: Record<string, UseCaseSlug[]> = {
  Aceite: ['circulacion', 'piel-cabello'],
  Harina: ['digestion', 'control-peso'],
  Semilla: ['digestion', 'energia'],
  'Fruto seco': ['energia', 'huesos'],
  Infusión: ['descanso', 'digestion'],
  Hierba: ['digestion', 'defensas'],
  Superalimento: ['energia', 'defensas'],
  Especia: ['digestion', 'circulacion'],
  Legumbre: ['digestion', 'control-peso'],
  Cereal: ['energia', 'digestion'],
  Endulzante: ['control-peso'],
  Snack: ['energia'],
  Otro: CASOS_DEFAULT,
};

function hueFromSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 360;
  return h;
}

function toSeed(entry: CatalogEntry): SeedProduct {
  const categoria = inferCategoria(entry.nombre);
  return {
    slug: entry.slug,
    nombre: entry.nombre,
    categoria,
    hue: hueFromSlug(entry.slug),
    casosDeUso: CASOS_BY_CAT[categoria] ?? CASOS_DEFAULT,
    tagline: `${entry.nombre} — disponible en nuestra tienda.`,
  };
}

/** Productos importados de dieteticasnaturalmente.com.ar con precio +50%. */
export function buildDieteticasProducts(): Product[] {
  return (catalog as CatalogEntry[]).map((entry) => {
    const base = buildProduct(toSeed(entry));
    return {
      ...base,
      imagen: entry.imagen,
      precio: entry.precio,
      precioOrigen: entry.precioOrigen,
      urlOrigen: entry.urlOrigen,
      tienda: true,
    };
  });
}

export const dieteticasCount = (catalog as CatalogEntry[]).length;
