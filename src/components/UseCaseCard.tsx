import Link from 'next/link';
import Image from 'next/image';
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
      className={`group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift ${className}`}
    >
      {useCase.imagen ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={useCase.imagen}
            alt={useCase.nombre}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" aria-hidden />
          <span
            className="absolute left-4 top-4 inline-grid h-10 w-10 place-items-center rounded-md ring-1 ring-white/25 backdrop-blur-sm"
            style={{ background: `oklch(0.93 0.05 ${useCase.hue} / 0.92)`, color: `oklch(0.34 0.1 ${useCase.hue})` }}
            aria-hidden
          >
            <Icon name={useCase.icon} size={20} weight="duotone" />
          </span>
          <h3 className="absolute bottom-3 left-4 right-4 font-display text-xl text-white drop-shadow-sm">
            {useCase.nombre}
          </h3>
        </div>
      ) : null}

      <div className="relative flex flex-1 flex-col p-6 pt-5">
        {!useCase.imagen ? (
          <>
            <span
              className="inline-grid h-12 w-12 place-items-center rounded-md"
              style={{ background: `oklch(0.93 0.05 ${useCase.hue})`, color: `oklch(0.36 0.09 ${useCase.hue})` }}
            >
              <Icon name={useCase.icon} size={24} weight="duotone" />
            </span>
            <h3 className="mt-4 font-display text-xl text-ink">{useCase.nombre}</h3>
          </>
        ) : null}
        <p className="text-sm leading-relaxed text-ink-soft">{useCase.descripcion}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-xs font-medium text-muted">
            {count} {count === 1 ? 'producto' : 'productos'}
          </span>
          <Icon
            name="ArrowUpRight"
            size={18}
            className="text-brand transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
