import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
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
      <Container width="wide">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Cocina natural</span>
          <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">Recetas</h1>
          <p className="mt-4 text-lg text-ink-soft">
            {recipes.length} recetas simples con nuestros productos. Filtrá por lo que tengas ganas
            de cocinar: tipo de comida, tiempo, dificultad y más.
          </p>
        </Reveal>

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
