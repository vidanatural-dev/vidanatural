import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { UseCaseCard } from '@/components/UseCaseCard';
import { Disclaimer } from '@/components/Disclaimer';
import { useCases } from '@/data/useCases';
import { productsByUseCase } from '@/data/products';

export const metadata: Metadata = {
  title: 'Productos por caso de uso',
  description:
    'Explorá productos naturales agrupados por aquello que querés cuidar: digestión, energía, defensas, descanso, articulaciones y mente.',
};

export default function UsosPage() {
  return (
    <div className="pt-12 sm:pt-16">
      <Container width="wide">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Explorar por necesidad</span>
          <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">Por caso de uso</h1>
          <p className="mt-4 text-lg text-ink-soft">
            Agrupamos los productos según aquello que la tradición y la nutrición asocian a cada
            necesidad. Es una guía para orientarte, no una recomendación médica.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => (
            <RevealItem key={u.slug}>
              <UseCaseCard useCase={u} count={productsByUseCase(u.slug).length} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>

        <Disclaimer className="my-16" />
      </Container>
    </div>
  );
}
