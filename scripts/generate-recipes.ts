/**
 * Generador / backfill de recetas.
 * Recorre los productos y genera 5 recetas por cada uno (vía recipeEngine),
 * verifica que no haya slugs duplicados y escribe un snapshot JSON.
 *
 * Es idempotente: los slugs son estables (producto + receta), así que
 * re-ejecutarlo produce exactamente el mismo resultado, sin duplicar nada.
 *
 * Uso:  npm run recipes:generate
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { products } from '../src/data/products';
import { generateAllRecipes } from '../src/data/recipeEngine';

const here = dirname(fileURLToPath(import.meta.url));
const recipes = generateAllRecipes(products);

// Verificación de duplicados por slug.
const seen = new Set<string>();
const duplicados: string[] = [];
for (const r of recipes) {
  if (seen.has(r.slug)) duplicados.push(r.slug);
  seen.add(r.slug);
}

const outPath = join(here, '..', 'src', 'data', 'recipes.generated.json');
writeFileSync(outPath, JSON.stringify(recipes, null, 2) + '\n', 'utf8');

const porProducto = (recipes.length / Math.max(products.length, 1)).toFixed(1);
console.log('--- Generación de recetas ---');
console.log(`Productos:           ${products.length}`);
console.log(`Recetas generadas:   ${recipes.length} (${porProducto} por producto)`);
console.log(`Slugs duplicados:    ${duplicados.length}`);
if (duplicados.length) console.log('  ->', duplicados.join(', '));
console.log(`Snapshot escrito en: ${outPath}`);
