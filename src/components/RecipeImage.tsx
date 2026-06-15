import Image from 'next/image';
import { ProductArt } from './ProductArt';
import type { Recipe, RecipeType } from '@/data/types';

// Glifo según el tipo de plato (referencia visual a lo que se cocina).
const tipoGlyph: Record<RecipeType, string> = {
  desayuno: 'BowlFood',
  almuerzo: 'CookingPot',
  cena: 'CookingPot',
  snack: 'Cookie',
  postre: 'Cake',
  bebida: 'Coffee',
  panificado: 'Bread',
  ensalada: 'Leaf',
  guarnicion: 'ForkKnife',
};

export function RecipeImage({
  recipe,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 33vw',
}: {
  recipe: Recipe;
  priority?: boolean;
  sizes?: string;
}) {
  if (recipe.imagen) {
    return (
      <Image
        src={recipe.imagen}
        alt={recipe.titulo}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    );
  }
  return <ProductArt hue={recipe.hue} glyph={tipoGlyph[recipe.tipo] ?? 'BowlFood'} glyphSize={76} />;
}
