import Link from 'next/link';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { ProductImage } from '@/components/ProductImage';
import { RecipeImage } from '@/components/RecipeImage';
import { ProductMarquee } from '@/components/ProductMarquee';
import { Aurora } from '@/components/Aurora';
import { SearchTrigger } from '@/components/SearchTrigger';
import { Icon } from '@/components/Icon';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { AnimatedUnderline } from '@/components/AnimatedUnderline';
import { FloatingLeaves } from '@/components/FloatingLeaves';
import { featuredProducts, products, getProduct } from '@/data/products';
import { featuredRecipes, recipes } from '@/data/recipes';
import type { Product } from '@/data/types';

export const metadata = { alternates: { canonical: '/' } };

const needChips = [
  { label: 'Digestión', icon: 'Leaf', href: '/usos/digestion' },
  { label: 'Energía', icon: 'Lightning', href: '/usos/energia' },
  { label: 'Descanso', icon: 'Moon', href: '/usos/descanso' },
  { label: 'Defensas', icon: 'ShieldCheck', href: '/usos/defensas' },
  { label: 'Recetas', icon: 'BowlFood', href: '/recetas' },
  { label: 'Precauciones', icon: 'Warning', href: '/sobre' },
];

const needTiles = [
  { label: 'Energía', icon: 'Lightning', href: '/usos/energia' },
  { label: 'Descanso', icon: 'Moon', href: '/usos/descanso' },
  { label: 'Digestión', icon: 'Leaf', href: '/usos/digestion' },
  { label: 'Cocina saludable', icon: 'CookingPot', href: '/recetas' },
  { label: 'Infusiones', icon: 'Coffee', href: '/productos' },
  { label: 'Sin TACC', icon: 'Plant', href: '/recetas' },
  { label: 'Alto en fibra', icon: 'Carrot', href: '/usos/digestion' },
  { label: 'Proteínas vegetales', icon: 'Barbell', href: '/usos/energia' },
];

const infoImportante = [
  { icon: 'BookOpen', title: 'Uso tradicional', text: 'Conocé cómo se usan habitualmente los productos naturales.' },
  { icon: 'Warning', title: 'Precauciones', text: 'Recomendaciones importantes a tener en cuenta antes de consumir.' },
  { icon: 'PersonSimpleWalk', title: 'Consultar profesional', text: 'Ante dudas o tratamientos, consultá siempre con un profesional de la salud.' },
];

const confianza = [
  { icon: 'ShieldCheck', title: 'Información clara y confiable', text: 'Contenido basado en fuentes confiables y en el uso tradicional.' },
  { icon: 'Storefront', title: 'Sin venta de productos', text: 'No vendemos nada. Solo información educativa e imparcial.' },
  { icon: 'ArrowsClockwise', title: 'Actualizaciones constantes', text: 'Sumamos productos, recetas y guías nuevas cada semana.' },
  { icon: 'Heart', title: 'Hecho con cariño en Argentina', text: 'Contenido pensado para nuestra comunidad.' },
];

function HeroTile({
  product,
  className = '',
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/productos/${product.slug}`}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.05]">
        <ProductImage product={product} priority={priority} sizes="(max-width: 1024px) 45vw, 24vw" />
      </div>
      <span className="sr-only">{product.nombre}</span>
    </Link>
  );
}

function ConsultadoCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group flex w-[300px] shrink-0 snap-start gap-4 rounded-xl border border-line bg-surface p-3 shadow-card transition-[transform,box-shadow,border-color] duration-[250ms] ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift active:scale-[0.99]"
    >
      <span className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-lg bg-surface-2">
        <ProductImage product={product} sizes="88px" />
      </span>
      <div className="flex min-w-0 flex-col">
        <h3 className="truncate font-display text-lg leading-tight text-ink">{product.nombre}</h3>
        <p className="text-xs text-muted">{product.categoria}</p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-soft">{product.tagline}</p>
        <span className="mt-auto inline-flex w-fit items-center gap-1 pt-2 text-sm font-semibold text-brand transition-colors group-hover:text-brand-deep">
          Ver guía
          <Icon name="ArrowRight" size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const heroPicks = (['chia', 'avena', 'quinoa', 'almendras'].map(getProduct).filter(Boolean) as Product[]).filter(
    (p) => p.imagen
  );
  const bento = (heroPicks.length >= 4 ? heroPicks : featuredProducts().filter((p) => p.imagen)).slice(0, 4);
  const consultados = featuredProducts()
    .filter((p) => p.imagen)
    .slice(0, 8);
  const receta = featuredRecipes()[0];
  const prods600 = Math.floor(products.length / 100) * 100;
  const recetas1000 = Math.floor(recipes.length / 1000) * 1000;

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative isolate overflow-hidden pt-10 sm:pt-14">
        <Aurora className="opacity-80" />
        <FloatingLeaves />
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(110% 80% at 82% -10%, var(--brand-soft), transparent 55%)' }}
          aria-hidden
        />
        <Container width="wide" className="relative">
          <div className="grid items-center gap-10 pb-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:pb-20">
            {/* ----- Columna texto ----- */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1.5 text-xs font-medium text-brand">
                  <Icon name="Leaf" size={13} weight="fill" />
                  <span className="font-mono uppercase tracking-[0.12em]">
                    +<AnimatedCounter to={prods600} suffix=" productos" duration={1200} /> · +<AnimatedCounter to={recetas1000} suffix=" recetas" duration={1400} /> · información confiable
                  </span>
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-5 font-sans text-display font-bold tracking-[-0.03em] text-ink">
                  Descubrí para qué se usan los productos{' '}
                  <AnimatedUnderline as="span" className="text-brand">naturales.</AnimatedUnderline>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-xl text-lead text-ink-soft">
                  Guías claras sobre alimentos, hierbas, semillas, harinas y suplementos. Cómo se
                  consumen, para qué sirven y qué precauciones tener.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-7">
                  <SearchTrigger variant="hero" />
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-4 flex flex-wrap gap-2">
                  {needChips.map((c) => (
                    <Link key={c.label} href={c.href} className="chip">
                      <Icon name={c.icon} size={14} weight="bold" />
                      {c.label}
                    </Link>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <MagneticButton href="/productos" variant="primary">
                    Buscar un producto natural
                    <Icon name="ArrowRight" size={18} />
                  </MagneticButton>
                  <Link href="/usos" className="btn btn-ghost">
                    Ver guías por necesidad
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.26}>
                <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted">
                  <Icon name="ShieldCheck" size={16} weight="fill" className="text-brand" />
                  Contenido educativo. No reemplaza la consulta con un profesional de la salud.
                </p>
              </Reveal>
            </div>

            {/* ----- Bento de productos ----- */}
            <Reveal delay={0.2} className="relative">
              <div className="relative grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  {bento[0] && <HeroTile product={bento[0]} className="aspect-[5/6]" priority />}
                  {bento[2] && <HeroTile product={bento[2]} className="aspect-square" />}
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  {bento[1] && <HeroTile product={bento[1]} className="aspect-square" priority />}
                  {bento[3] && <HeroTile product={bento[3]} className="aspect-[5/6]" />}
                </div>
                {/* badge central */}
                <div className="absolute left-1/2 top-1/2 z-20 hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand/40 bg-brand-deep p-3 text-center shadow-lift sm:grid">
                  <span className="text-[0.7rem] font-medium leading-snug text-on-brand">
                    <Icon name="Leaf" size={16} weight="fill" className="mx-auto mb-1 text-on-brand" />
                    Guías simples y confiables
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* tira viva de productos */}
        <div className="border-y border-line bg-surface-2/40 py-5">
          <ProductMarquee />
        </div>
      </section>

      {/* ============ PRODUCTOS MÁS CONSULTADOS ============ */}
      <section className="py-16 sm:py-20">
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <h2 className="font-display text-h2 text-ink">Productos más consultados</h2>
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
          <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {consultados.map((p) => (
              <ConsultadoCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* ============ NECESIDADES · RECETAS · INFO (3 columnas) ============ */}
      <section className="pb-20">
        <Container width="wide">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr_0.9fr]">
            {/* Buscá por necesidad */}
            <Reveal className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <h2 className="font-display text-2xl text-ink">Buscá por necesidad</h2>
              <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {needTiles.map((t) => (
                  <Link
                    key={t.label}
                    href={t.href}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-line bg-surface-2/60 px-2 py-4 text-center transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand/40 hover:bg-surface-2"
                  >
                    <span className="text-brand transition-transform duration-200 ease-out group-hover:scale-110">
                      <Icon name={t.icon} size={22} weight="duotone" />
                    </span>
                    <span className="text-xs font-medium leading-tight text-ink-soft">{t.label}</span>
                  </Link>
                ))}
              </div>
              <Link
                href="/usos"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-deep"
              >
                Ver todas las necesidades
                <Icon name="ArrowRight" size={16} />
              </Link>
            </Reveal>

            {/* Recetas saludables */}
            <Reveal delay={0.05} className="flex flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl text-ink">Recetas saludables</h2>
                <Link href="/recetas" className="text-sm font-semibold text-brand transition-colors hover:text-brand-deep">
                  Ver todas
                </Link>
              </div>
              {receta && (
                <Link href={`/recetas/${receta.slug}`} className="group mt-5 flex flex-1 flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-2">
                    <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.05]">
                      <RecipeImage recipe={receta} sizes="(max-width: 1024px) 100vw, 33vw" />
                    </div>
                    <span className="badge absolute left-3 top-3 bg-surface/90 capitalize backdrop-blur-sm">
                      {receta.tipo}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl leading-tight text-ink">{receta.titulo}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{receta.descripcion}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors group-hover:text-brand-deep">
                    Ver receta
                    <Icon name="ArrowRight" size={15} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )}
            </Reveal>

            {/* Información importante */}
            <Reveal delay={0.1} className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <h2 className="font-display text-2xl text-ink">Información importante</h2>
              <ul className="mt-5 space-y-5">
                {infoImportante.map((it) => (
                  <li key={it.title} className="flex gap-3.5">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-deep">
                      <Icon name={it.icon} size={18} weight="duotone" />
                    </span>
                    <div>
                      <p className="font-medium text-ink">{it.title}</p>
                      <p className="mt-0.5 text-[0.85rem] leading-relaxed text-ink-soft">{it.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ============ BARRA DE CONFIANZA ============ */}
      <section className="border-t border-line bg-surface-2/40 py-12">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {confianza.map((c) => (
              <div key={c.title} className="flex gap-3.5">
                <span className="mt-0.5 shrink-0 text-brand">
                  <Icon name={c.icon} size={24} weight="duotone" />
                </span>
                <div>
                  <p className="font-medium text-ink">{c.title}</p>
                  <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-soft">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
