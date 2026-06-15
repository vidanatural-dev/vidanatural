import Link from 'next/link';
import { Icon } from './Icon';
import type { UseCase } from '@/data/types';

export function UseCaseCard({
  useCase,
  count,
  className = '',
}: {
  useCase: UseCase;
  count: number;
  className?: string;
}) {
  return (
    <Link
      href={`/usos/${useCase.slug}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-lg border border-line bg-surface p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift ${className}`}
    >
      <div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60"
        style={{ background: `oklch(0.88 0.09 ${useCase.hue} / 0.6)` }}
        aria-hidden
      />
      <div className="relative">
        <span
          className="inline-grid h-12 w-12 place-items-center rounded-md"
          style={{ background: `oklch(0.93 0.05 ${useCase.hue})`, color: `oklch(0.36 0.09 ${useCase.hue})` }}
        >
          <Icon name={useCase.icon} size={24} weight="duotone" />
        </span>
        <h3 className="mt-4 font-display text-xl text-ink">{useCase.nombre}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{useCase.descripcion}</p>
      </div>
      <div className="relative mt-5 flex items-center justify-between">
        <span className="text-xs font-medium text-muted">
          {count} {count === 1 ? 'producto' : 'productos'}
        </span>
        <Icon
          name="ArrowUpRight"
          size={18}
          className="text-brand transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </Link>
  );
}
