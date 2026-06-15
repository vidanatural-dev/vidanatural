import type { Recipe, RecipeType } from './types';
import { products } from './products';
import { generateAllRecipes } from './recipeEngine';

/**
 * Recetas generadas en build a partir de los productos (5 por producto).
 * Determinista e idempotente: el slug es estable (producto + receta), así no
 * hay duplicados aunque se regenere. Cubre productos futuros automáticamente.
 */
export const recipes: Recipe[] = generateAllRecipes(products);

export const allRecipeSlugs = (): string[] => recipes.map((r) => r.slug);

export const getRecipe = (slug: string): Recipe | undefined =>
  recipes.find((r) => r.slug === slug);

export const recipesByProduct = (productSlug: string): Recipe[] =>
  recipes.filter((r) => r.productos.includes(productSlug));

export const relatedRecipes = (recipe: Recipe, limit = 3): Recipe[] => {
  const sameProduct = recipes.filter((r) => r.slug !== recipe.slug && r.producto === recipe.producto);
  const sameType = recipes.filter(
    (r) => r.slug !== recipe.slug && r.producto !== recipe.producto && r.tipo === recipe.tipo
  );
  return [...sameProduct, ...sameType].slice(0, limit);
};

const FEATURED_PRODUCTS = ['chia', 'avena', 'quinoa', 'cacao', 'garbanzos', 'curcuma', 'te-verde', 'granola'];

export const featuredRecipes = (): Recipe[] =>
  FEATURED_PRODUCTS.map((slug) => recipes.find((r) => r.producto === slug)).filter(
    (r): r is Recipe => Boolean(r)
  );

export const recipeTypeLabel: Record<RecipeType, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  cena: 'Cena',
  snack: 'Snack',
  postre: 'Postre',
  bebida: 'Bebida',
  panificado: 'Panificado',
  ensalada: 'Ensalada',
  guarnicion: 'Guarnición',
};

export const allRecipeTypes: RecipeType[] = [
  'desayuno',
  'almuerzo',
  'cena',
  'snack',
  'postre',
  'bebida',
  'panificado',
  'ensalada',
  'guarnicion',
];

// Etiquetas usadas como filtros principales en /recetas.
export const filterTags = ['Vegano', 'Sin TACC', 'Sin azúcar agregada', 'Alto en fibra', 'Proteico', 'Energético'];
