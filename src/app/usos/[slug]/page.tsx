import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { Disclaimer } from '@/components/Disclaimer';
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

        <Reveal className="mt-6 flex items-start gap-5">
          <span
            className="inline-grid h-16 w-16 shrink-0 place-items-center rounded-lg"
            style={{
              background: `oklch(0.93 0.05 ${useCase.hue})`,
              color: `oklch(0.36 0.09 ${useCase.hue})`,
            }}
          >
            <Icon name={useCase.icon} size={32} weight="duotone" />
          </span>
          <div>
            <h1 className="font-display text-4xl text-ink sm:text-5xl">{useCase.nombre}</h1>
            <p className="mt-3 max-w-prose text-lg text-ink-soft">{useCase.descripcion}</p>
          </div>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <RevealItem key={p.slug}>
              <ProductCard product={p} priority={i < 3} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Disclaimer className="my-16" />
      </Container>
    </div>
  );
}
