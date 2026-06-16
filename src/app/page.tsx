import Link from 'next/link';
import { Container } from '@/components/Container';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { ProductCard } from '@/components/ProductCard';
import { UseCaseCard } from '@/components/UseCaseCard';
import { ProductImage } from '@/components/ProductImage';
import { RecipeCard } from '@/components/RecipeCard';
import { Aurora } from '@/components/Aurora';
import { Stats } from '@/components/Stats';
import { SearchTrigger } from '@/components/SearchTrigger';
import { Icon } from '@/components/Icon';
import { featuredProducts, products, productsByUseCase } from '@/data/products';
import { useCases } from '@/data/useCases';
import { featuredRecipes, recipes } from '@/data/recipes';

export const metadata = { alternates: { canonical: '/' } };

const fichaIncluye = [
  'Qué es y de dónde viene',
  'Composición y nutrientes',
  'Usos tradicionales',
  'Cómo se consume',
  'Precauciones y contraindicaciones',
  'Preguntas frecuentes y fuentes',
];

export default function HomePage() {
  const featured = featuredProducts().slice(0, 3);
  const collage = featuredProducts().slice(0, 4);
  // Subconjunto para la tira: con todo el catálogo el marquee quedaba demasiado rápido.
  const marquee = products.slice(0, 24).map((p) => p.nombre);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative isolate overflow-hidden pt-12 sm:pt-16">
        <Aurora className="opacity-90" />
        <Container width="wide" className="relative">
          <div className="grid items-center gap-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-ink-soft backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                  <span className="font-mono uppercase tracking-[0.14em]">
                    {products.length} productos · {recipes.length} recetas
                  </span>
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-5 font-display text-[2.8rem] font-medium leading-[1.02] tracking-[-0.025em] text-ink sm:text-6xl lg:text-[4.25rem]">
                  La guía <em className="italic text-brand">clara</em> de los productos naturales.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                  Qué es cada producto, su composición, sus usos tradicionales y las precauciones.
                  Información, no venta.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8">
                  <SearchTrigger variant="hero" />
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted">Buscá por necesidad:</span>
                  {[
                    { slug: 'descanso', label: 'Descanso' },
                    { slug: 'energia', label: 'Energía' },
                    { slug: 'digestion', label: 'Digestión' },
                    { slug: 'defensas', label: 'Defensas' },
                  ].map((q) => (
                    <Link key={q.slug} href={`/usos/${q.slug}`} className="chip">
                      {q.label}
                    </Link>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <MagneticButton href="/productos" variant="primary">
                    Ver productos
                    <Icon name="ArrowRight" size={18} />
                  </MagneticButton>
                  <Link href="/recetas" className="btn btn-ghost">
                    Ver recetas
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="relative">
              <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4 sm:gap-5">
                <div className="flex flex-col gap-4 sm:gap-5">
                  <div className="animate-float overflow-hidden rounded-xl border border-line bg-surface-2 shadow-lift">
                    <div className="relative aspect-square">
                      {collage[0] && <ProductImage product={collage[0]} priority />}
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-line bg-surface-2 shadow-lift">
                    <div className="relative aspect-square">
                      {collage[3] && <ProductImage product={collage[3]} />}
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:gap-5">
                  <div className="overflow-hidden rounded-xl border border-line bg-surface-2 shadow-lift">
                    <div className="relative aspect-square">
                      {collage[1] && <ProductImage product={collage[1]} priority />}
                    </div>
                  </div>
                  <div className="animate-float overflow-hidden rounded-xl border border-line bg-surface-2 shadow-lift" style={{ animationDelay: '1.2s' }}>
                    <div className="relative aspect-square">
                      {collage[2] && <ProductImage product={collage[2]} />}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* tira marquee */}
        <div className="relative overflow-hidden border-y border-line bg-surface-2/40 py-4">
          <div className="flex w-max animate-marquee items-center gap-10 pr-10">
            {[...marquee, ...marquee].map((w, i) => (
              <span
                key={i}
                className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.18em] text-muted"
              >
                {w}
                <span className="h-1 w-1 rounded-full bg-brand/60" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EN NÚMEROS ============ */}
      <section className="py-14 sm:py-16">
        <Container width="wide">
          <Reveal>
            <Stats
              stats={[
                { value: products.length, label: 'Productos explicados', icon: 'Leaf', hue: 150 },
                { value: useCases.length, label: 'Casos de uso', icon: 'Sparkle', hue: 75 },
                { value: recipes.length, label: 'Recetas para probar', icon: 'BowlFood', hue: 165 },
              ]}
            />
          </Reveal>
        </Container>
      </section>

      {/* ============ BANDA DE CONFIANZA ============ */}
      <section className="border-y border-line bg-surface-2/60 py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-[2.5rem]">
                Cada ficha está pensada para que decidas con información, no con marketing.
              </h2>
              <p className="mt-5 max-w-prose text-ink-soft">
                Reunimos lo que se sabe de cada producto en lenguaje simple y prudente. No vendemos
                nada y no damos consejo médico: la idea es que llegues con buenas preguntas a la
                dietética y a tu profesional de salud.
              </p>
            </Reveal>
            <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {fichaIncluye.map((item) => (
                <RevealItem key={item} className="flex items-center gap-3 border-b border-line py-3 text-ink">
                  <span className="text-brand">
                    <Icon name="Leaf" size={18} weight="fill" />
                  </span>
                  <span className="text-[0.97rem] font-medium">{item}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* ============ CASOS DE USO ============ */}
      <section className="py-20 sm:py-28">
        <Container width="wide">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Explorar por necesidad</span>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-[2.5rem]">
              Encontrá productos según lo que te interesa cuidar
            </h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <RevealItem key={u.slug} className={i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                <UseCaseCard useCase={u} count={productsByUseCase(u.slug).length} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ============ PRODUCTOS DESTACADOS ============ */}
      <section className="pb-24">
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-[2.5rem]">Los más conocidos para empezar</h2>
              <p className="mt-3 max-w-prose text-ink-soft">
                Una primera selección. Vamos sumando productos por caso de uso.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <Link
                href="/productos"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-deep"
              >
                Ver todos los productos
                <Icon name="ArrowRight" size={16} />
              </Link>
            </Reveal>
          </div>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <RevealItem key={p.slug}>
                <ProductCard product={p} priority />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ============ RECETAS (carrusel) ============ */}
      <section className="border-t border-line bg-surface-2/40 py-20 sm:py-24">
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <span className="eyebrow">Cocina natural</span>
              <h2 className="mt-4 font-display text-3xl text-ink sm:text-[2.5rem]">
                Recetas para aprovecharlos
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <Link
                href="/recetas"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-deep"
              >
                Ver todas las recetas
                <Icon name="ArrowRight" size={16} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {featuredRecipes().map((r, i) => (
              <div key={r.slug} className="w-[290px] shrink-0 snap-start sm:w-[340px]">
                <RecipeCard recipe={r} priority={i < 3} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ CTA ============ */}
      <section className="pb-4 pt-20">
        <Container width="wide">
          <Reveal>
            <div className="relative overflow-hidden rounded-xl bg-brand-deep px-6 py-16 text-center text-on-brand sm:px-12 sm:py-20">
              <Aurora className="opacity-40" />
              <h2 className="relative mx-auto max-w-2xl font-display text-3xl leading-tight text-on-brand sm:text-[2.6rem]">
                {products.length} productos explicados con claridad, y sumando.
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-on-brand-soft">
                Explorá las fichas, conocé usos y precauciones, y llegá mejor informado a tu próxima
                compra en la dietética.
              </p>
              <div className="relative mt-8 flex justify-center">
                <MagneticButton href="/productos" variant="accent">
                  Explorar el catálogo
                  <Icon name="ArrowRight" size={18} />
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
