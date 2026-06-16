import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { Aurora } from '@/components/Aurora';
import { RecipesExplorer } from '@/components/RecipesExplorer';
import { recipes, allRecipeTypes, recipeTypeLabel, filterTags } from '@/data/recipes';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Recetas naturales',
  alternates: { canonical: '/recetas' },
  description:
    'Todas las recetas con productos naturales: filtrá por producto, tipo de comida, dificultad, tiempo, vegano, sin TACC o sin azúcar agregada.',
};

export default function RecetasPage() {
  const productos = products.map((p) => ({ slug: p.slug, nombre: p.nombre }));

  return (
    <div className="pt-12 sm:pt-16">
      <section className="relative isolate overflow-hidden">
        <Aurora className="opacity-40" />
        <Container width="wide" className="relative">
          <Reveal className="max-w-2xl">
            <h1 className="font-display text-h1 text-ink">Recetas para cocinar lo natural</h1>
            <p className="mt-4 text-lead text-ink-soft">
              {recipes.length} recetas simples con nuestros productos. Filtrá por lo que tengas ganas
              de cocinar: tipo de comida, tiempo, dificultad y más.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container width="wide">
        <div className="mt-10">
          <RecipesExplorer
            recipes={recipes}
            productos={productos}
            tipos={allRecipeTypes}
            tipoLabel={recipeTypeLabel}
            tags={filterTags}
          />
        </div>
      </Container>
    </div>
  );
}
