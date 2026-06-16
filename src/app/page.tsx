import Link from 'next/link';
import { Container } from '@/components/Container';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { ProductCard } from '@/components/ProductCard';
import { UseCaseCard } from '@/components/UseCaseCard';
import { ProductImage } from '@/components/ProductImage';
import { RecipeCard } from '@/components/RecipeCard';
import { Aurora } from '@/components/Aurora';
import { ProductMarquee } from '@/components/ProductMarquee';
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
  const lead = featured[0];

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
                <h1 className="mt-5 font-display text-display font-semibold text-ink">
                  La guía <em className="italic text-brand">clara</em> de los productos naturales.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-lead text-ink-soft">
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

            {/* Collage editorial asimétrico (aspectos mezclados, un solo gesto flotante) */}
            <Reveal delay={0.2} className="relative">
              <div className="relative mx-auto flex max-w-md gap-4 sm:gap-5">
                <div className="flex w-[58%] flex-col gap-4 sm:gap-5">
                  <div className="animate-float overflow-hidden rounded-xl border border-line bg-surface-2 shadow-lift">
                    <div className="relative aspect-[4/5]">
                      {collage[0] && <ProductImage product={collage[0]} priority />}
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-line bg-surface-2 shadow-card">
                    <div className="relative aspect-square">
                      {collage[2] && <ProductImage product={collage[2]} />}
                    </div>
                  </div>
                </div>
                <div className="mt-9 flex w-[42%] flex-col gap-4 sm:gap-5">
                  <div className="overflow-hidden rounded-xl border border-line bg-surface-2 shadow-card">
                    <div className="relative aspect-square">
                      {collage[1] && <ProductImage product={collage[1]} priority />}
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-line bg-surface-2 shadow-card">
                    <div className="relative aspect-[3/4]">
                      {collage[3] && <ProductImage product={collage[3]} />}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* tira viva de productos (doble fila, fotos reales, sentidos opuestos) */}
        <div className="border-y border-line bg-surface-2/40 py-5">
          <ProductMarquee />
        </div>
      </section>

      {/* ============ BANDA DE CONFIANZA ============ */}
      <section className="border-b border-line bg-surface-2/60 py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-h2 text-ink">
                Cada ficha está pensada para que decidas con información, no con marketing.
              </h2>
              <p className="mt-5 max-w-prose text-ink-soft">
                Reunimos lo que se sabe de cada producto en lenguaje simple y prudente. No vendemos
                nada y no damos consejo médico: la idea es que llegues con buenas preguntas a la
                dietética y a tu profesional de salud.
              </p>
              <p className="mt-6 text-sm text-ink-soft">
                Ya son {products.length} productos explicados, {useCases.length} casos de uso y{' '}
                {recipes.length} recetas para probar, y vamos sumando.
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
            <h2 className="font-display text-h2 text-ink">
              Encontrá productos según lo que te interesa cuidar
            </h2>
            <p className="mt-4 max-w-prose text-ink-soft">
              Agrupamos el catálogo por aquello que la tradición y la nutrición asocian a cada
              necesidad. Una guía para orientarte, no una recomendación médica.
            </p>
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

      {/* ============ PRODUCTOS DESTACADOS (feature + stack asimétrico) ============ */}
      <section className="pb-24">
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <h2 className="font-display text-h2 text-ink">Los más conocidos para empezar</h2>
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

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {lead && (
              <Reveal className="lg:col-span-2">
                <Link
                  href={`/productos/${lead.slug}`}
                  className="group relative flex h-full transform-gpu flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-card transition-[transform,box-shadow,border-color] duration-[250ms] ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift active:scale-[0.99] lg:flex-row"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 lg:aspect-auto lg:w-[52%]">
                    <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                      <ProductImage product={lead} priority sizes="(max-width: 1024px) 100vw, 45vw" />
                    </div>
                    <span className="badge absolute left-3 top-3 z-10 bg-surface/90 backdrop-blur-sm">
                      {lead.categoria}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                    <h3 className="font-display text-h3 text-ink sm:text-[1.9rem]">{lead.nombre}</h3>
                    {lead.nombreCientifico && (
                      <p className="mt-1 font-mono text-xs italic text-muted">{lead.nombreCientifico}</p>
                    )}
                    <p className="mt-3 max-w-prose text-ink-soft">{lead.resumen}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors group-hover:text-brand-deep">
                      Ver ficha
                      <Icon
                        name="ArrowRight"
                        size={16}
                        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )}
            <Reveal delay={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {featured.slice(1, 3).map((p) => (
                <ProductCard key={p.slug} product={p} priority />
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ============ RECETAS (carrusel) ============ */}
      <section className="border-t border-line bg-surface-2/40 py-20 sm:py-24">
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <span className="eyebrow">Cocina natural</span>
              <h2 className="mt-4 font-display text-h2 text-ink">Recetas para aprovecharlos</h2>
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
              <h2 className="relative mx-auto max-w-2xl font-display text-h2 text-on-brand">
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
