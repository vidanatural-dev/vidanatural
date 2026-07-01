'use client';

import { Icon } from './Icon';

export function QuantityControl({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}) {
  const btn =
    size === 'sm'
      ? 'grid h-8 w-8 place-items-center rounded-lg'
      : 'grid h-10 w-10 place-items-center rounded-lg';
  const text = size === 'sm' ? 'w-8 text-sm' : 'w-10 text-base';

  function dec() {
    onChange(Math.max(min, value - 1));
  }

  function inc() {
    onChange(Math.min(max, value + 1));
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-line bg-surface p-1">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Menos cantidad"
        className={`${btn} text-ink transition-colors hover:bg-surface-2 disabled:opacity-40`}
      >
        <Icon name="Minus" size={size === 'sm' ? 14 : 16} weight="bold" />
      </button>
      <span className={`${text} text-center font-mono font-semibold tabular-nums text-ink`}>
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Más cantidad"
        className={`${btn} text-ink transition-colors hover:bg-surface-2 disabled:opacity-40`}
      >
        <Icon name="Plus" size={size === 'sm' ? 14 : 16} weight="bold" />
      </button>
    </div>
  );
}
