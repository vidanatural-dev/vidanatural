import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { Disclaimer } from '@/components/Disclaimer';
import { FAQ } from '@/components/FAQ';
import { Icon } from '@/components/Icon';
import { useCases, useCaseBySlug } from '@/data/useCases';
import { productsByUseCase } from '@/data/products';
import type { UseCaseSlug } from '@/data/types';

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const u = useCaseBySlug(params.slug as UseCaseSlug);
  if (!u) return {};
  return {
    title: `${u.nombre}: productos naturales`,
    description: u.descripcion,
    alternates: { canonical: `/usos/${params.slug}` },
  };
}

export default function UseCasePage({ params }: { params: { slug: string } }) {
  const useCase = useCaseBySlug(params.slug as UseCaseSlug);
  if (!useCase) notFound();

  const items = productsByUseCase(useCase.slug);

  return (
    <div className="pt-10 sm:pt-12">
      <Container width="wide">
        <nav className="flex items-center gap-1.5 text-sm text-muted" aria-label="Migas de pan">
          <Link href="/" className="transition-colors hover:text-ink">Inicio</Link>
          <Icon name="CaretDown" size={13} className="-rotate-90" />
          <Link href="/usos" className="transition-colors hover:text-ink">Por uso</Link>
          <Icon name="CaretDown" size={13} className="-rotate-90" />
          <span className="text-ink-soft">{useCase.nombre}</span>
        </nav>

        {useCase.imagen ? (
          <Reveal className="relative mt-6 aspect-[21/9] w-full overflow-hidden rounded-xl border border-line sm:aspect-[3/1]">
            <Image
              src={useCase.imagen}
              alt={useCase.nombre}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" aria-hidden />
            <div className="absolute bottom-0 left-0 right-0 flex items-end gap-4 p-6 sm:p-8">
              <span
                className="inline-grid h-14 w-14 shrink-0 place-items-center rounded-lg ring-1 ring-white/25 backdrop-blur-sm"
                style={{ background: `oklch(0.93 0.05 ${useCase.hue} / 0.92)`, color: `oklch(0.34 0.1 ${useCase.hue})` }}
                aria-hidden
              >
                <Icon name={useCase.icon} size={28} weight="duotone" />
              </span>
              <div>
                <h1 className="font-display text-4xl text-white drop-shadow sm:text-5xl">{useCase.nombre}</h1>
                <p className="mt-2 max-w-prose text-sm text-white/85 sm:text-base">{useCase.descripcion}</p>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal className="mt-6 flex items-start gap-5">
            <span
              className="inline-grid h-16 w-16 shrink-0 place-items-center rounded-lg"
              style={{ background: `oklch(0.93 0.05 ${useCase.hue})`, color: `oklch(0.36 0.09 ${useCase.hue})` }}
            >
              <Icon name={useCase.icon} size={32} weight="duotone" />
            </span>
            <div>
              <h1 className="font-display text-4xl text-ink sm:text-5xl">{useCase.nombre}</h1>
              <p className="mt-3 max-w-prose text-lg text-ink-soft">{useCase.descripcion}</p>
            </div>
          </Reveal>
        )}

        {useCase.intro ? (
          <Reveal className="mt-8 max-w-3xl">
            <p className="text-lg leading-relaxed text-ink-soft">{useCase.intro}</p>
          </Reveal>
        ) : null}

        {(useCase.alimentos || useCase.consejos) && (
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {useCase.alimentos ? (
              <Reveal className="rounded-xl border border-line bg-surface p-6 sm:p-7">
                <div className="flex items-center gap-2.5">
                  <span className="text-brand"><Icon name="Leaf" size={20} weight="duotone" /></span>
                  <h2 className="font-display text-xl text-ink">Alimentos y nutrientes que se asocian</h2>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {useCase.alimentos.map((a) => (
                    <li key={a} className="flex gap-2.5 text-[0.97rem] leading-relaxed text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70" aria-hidden />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
            {useCase.consejos ? (
              <Reveal className="rounded-xl border border-line bg-surface p-6 sm:p-7">
                <div className="flex items-center gap-2.5">
                  <span className="text-brand"><Icon name="Sparkle" size={20} weight="duotone" /></span>
                  <h2 className="font-display text-xl text-ink">Hábitos que ayudan</h2>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {useCase.consejos.map((c) => (
                    <li key={c} className="flex gap-2.5 text-[0.97rem] leading-relaxed text-ink-soft">
                      <span className="mt-1 shrink-0 text-brand"><Icon name="Check" size={16} weight="bold" /></span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        )}

        <Reveal className="mt-14">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Productos para {useCase.nombre.toLowerCase()}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {items.length} {items.length === 1 ? 'producto relacionado' : 'productos relacionados'}.
          </p>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 3} />
          ))}
        </div>

        {useCase.faq && useCase.faq.length > 0 ? (
          <div className="mt-16 max-w-3xl">
            <Reveal>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">Preguntas frecuentes</h2>
            </Reveal>
            <Reveal className="mt-5">
              <FAQ items={useCase.faq} />
            </Reveal>
          </div>
        ) : null}

        <Disclaimer className="my-16" />
      </Container>
    </div>
  );
}
