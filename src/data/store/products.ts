import type { StoreProduct } from './types';
import catalog from '../dieteticasCatalog.json';

interface CatalogEntry {
  slug: string;
  nombre: string;
  precioOrigen: number;
  precio: number;
  imagen: string;
  categoria: string;
  urlOrigen: string;
}

function inferCategoria(nombre: string): string {
  const n = nombre.toLowerCase();
  if (/\b(aceite|óleo|oleo)\b/.test(n)) return 'Aceites';
  if (/\b(harina|premezcla|fecula|fécula|almidón|almidon)\b/.test(n)) return 'Harinas y cereales';
  if (/\b(semilla|chia|lino|girasol|sésamo|sesamo|amapola|mostaza)\b/.test(n)) return 'Semillas';
  if (/\b(fruto seco|almendra|nuez|mani|maní|avellana|castaña|caju|pistacho|macadamia|pecan)\b/.test(n)) return 'Frutos secos';
  if (/\b(te |té |yerba|infusion|infusión|hibiscus|manzanilla|boldo|menta|rooibos)\b/.test(n)) return 'Infusiones';
  if (/\b(hierba|tintura|flor de|raíz|raiz)\b/.test(n)) return 'Herboristería';
  if (/\b(suplemento|comprimido|cápsula|capsula|proteína|proteina|colágeno|colageno|vitamina|magnesio|omega)\b/.test(n)) return 'Suplementos';
  if (/\b(especia|condimento|pimienta|canela|comino|curry|pimentón|pimenton|oregano|romero)\b/.test(n)) return 'Condimentos';
  if (/\b(legumbre|lenteja|garbanzo|poroto|arveja|soja)\b/.test(n)) return 'Legumbres';
  if (/\b(arroz|avena|quinoa|mijo|trigo|cebada|polenta|fideo|pasta)\b/.test(n)) return 'Cereales y fideos';
  if (/\b(miel|stevia|azúcar|azucar|mascabo|endulzante|jarabe)\b/.test(n)) return 'Endulzantes';
  if (/\b(galletita|alfajor|barrita|chocolate|snack|galleta)\b/.test(n)) return 'Snacks y dulces';
  if (/\b(cosmética|cosmetica|jabón|jabon|shampoo|crema|serum)\b/.test(n)) return 'Cosmética natural';
  if (/\b(combo)\b/.test(n)) return 'Combos';
  return 'Otros';
}

const entries = (catalog as CatalogEntry[]).map((e) => ({
  ...e,
  categoria: inferCategoria(e.nombre),
}));

export const storeProducts: StoreProduct[] = entries;

export const storeProductCount = storeProducts.length;

export const storeCategories = (): string[] =>
  [...new Set(storeProducts.map((p) => p.categoria))].sort((a, b) => a.localeCompare(b, 'es'));

export const allStoreSlugs = (): string[] => storeProducts.map((p) => p.slug);

export const getStoreProduct = (slug: string): StoreProduct | undefined =>
  storeProducts.find((p) => p.slug === slug);

export const relatedStoreProducts = (product: StoreProduct, limit = 4): StoreProduct[] =>
  storeProducts
    .filter((p) => p.slug !== product.slug && p.categoria === product.categoria)
    .slice(0, limit);
