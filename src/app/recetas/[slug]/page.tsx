import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { RecipeImage } from '@/components/RecipeImage';
import { RecipeCard } from '@/components/RecipeCard';
import { FAQ } from '@/components/FAQ';
import { Icon } from '@/components/Icon';
import { allRecipeSlugs, getRecipe, relatedRecipes, recipeTypeLabel } from '@/data/recipes';
import { getProduct } from '@/data/products';

export function generateStaticParams() {
  return allRecipeSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getRecipe(params.slug);
  if (!r) return {};
  return {
    title: r.seoTitle,
    description: r.seoDescription,
    alternates: { canonical: `/recetas/${params.slug}` },
    openGraph: { title: r.titulo, description: r.seoDescription, type: 'article' },
  };
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = getRecipe(params.slug);
  if (!recipe) notFound();

  const producto = getProduct(recipe.producto);
  const related = relatedRecipes(recipe);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Recipe',
        name: recipe.titulo,
        description: recipe.seoDescription,
        recipeCategory: recipeTypeLabel[recipe.tipo],
        recipeYield: recipe.porciones,
        prepTime: `PT${recipe.prepMin}M`,
        ...(recipe.cookMin > 0 ? { cookTime: `PT${recipe.cookMin}M` } : {}),
        totalTime: `PT${recipe.tiempoMin}M`,
        keywords: recipe.tags.join(', '),
        recipeIngredient: recipe.ingredientes,
        recipeInstructions: recipe.pasos.map((p) => ({ '@type': 'HowToStep', text: p })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: recipe.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <article className="pt-8 sm:pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Container width="wide">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted" aria-label="Migas de pan">
          <Link href="/" className="transition-colors hover:text-ink">Inicio</Link>
          <Icon name="CaretDown" size={13} className="-rotate-90" />
          <Link href="/recetas" className="transition-colors hover:text-ink">Recetas</Link>
          <Icon name="CaretDown" size={13} className="-rotate-90" />
          <span className="text-ink-soft">{recipe.titulo}</span>
        </nav>

        <div className="mt-6 grid gap-8 pb-10 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
          <Reveal>
            <span className="badge">{recipeTypeLabel[recipe.tipo]}</span>
            <h1 className="mt-4 font-display text-4xl leading-[1.06] text-ink sm:text-5xl">{recipe.titulo}</h1>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">{recipe.descripcion}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip"><Icon name="Clock" size={15} weight="bold" />{recipe.tiempoMin} min</span>
              <span className="chip"><Icon name="ForkKnife" size={15} weight="bold" />{recipe.porciones}</span>
              <span className="chip"><Icon name="Fire" size={15} weight="bold" />{recipe.dificultad}</span>
            </div>

            {recipe.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {recipe.tags.map((t) => (
                  <span key={t} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-deep">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {producto && (
              <Link
                href={`/productos/${producto.slug}`}
                className="mt-6 inline-flex items-center gap-3 rounded-lg border border-line bg-surface p-3 pr-5 transition-colors hover:border-brand/40"
              >
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-2">
                  <RecipeImage recipe={{ ...recipe, imagen: producto.imagen }} sizes="48px" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Producto principal</span>
                  <span className="block font-display text-lg text-ink">{producto.nombre}</span>
                </span>
                <Icon name="ArrowRight" size={16} className="ml-auto text-brand" />
              </Link>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface-2 shadow-lift">
              <RecipeImage recipe={recipe} priority sizes="(max-width: 1024px) 100vw, 45vw" />
            </div>
          </Reveal>
        </div>
      </Container>

      <Container width="wide" className="pb-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <h2 className="font-display text-2xl text-ink">Ingredientes</h2>
              <ul className="mt-5 space-y-3">
                {recipe.ingredientes.map((ing, i) => (
                  <li key={i} className="flex gap-3 text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">
                Las cantidades son orientativas. Ajustá a tu gusto y a las porciones que necesites.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl text-ink">Preparación</h2>
            <ol className="mt-5 space-y-5">
              {recipe.pasos.map((paso, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft font-display text-lg text-brand">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-[1.02rem] leading-relaxed text-ink-soft">{paso}</p>
                </li>
              ))}
            </ol>

            {recipe.faq.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl text-ink">Preguntas frecuentes</h2>
                <div className="mt-5">
                  <FAQ items={recipe.faq} />
                </div>
              </div>
            )}

            {producto && (
              <Link
                href={`/productos/${producto.slug}`}
                className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-deep"
              >
                <Icon name="ArrowRight" size={16} className="rotate-180" />
                Volver a {producto.nombre}
              </Link>
            )}
          </Reveal>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="border-t border-line bg-surface-2/50 py-16">
          <Container width="wide">
            <h2 className="font-display text-3xl text-ink">Recetas relacionadas</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
