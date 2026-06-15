import Image from 'next/image';
import { ProductArt } from './ProductArt';
import type { Recipe } from '@/data/types';

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
  return <ProductArt hue={recipe.hue} glyph="BowlFood" glyphSize={80} />;
}
