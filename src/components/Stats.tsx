'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { Icon } from './Icon';

interface Stat {
  value: number;
  label: string;
  icon: string;
  hue: number;
  suffix?: string;
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = `${to}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.1,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, reduce]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-4 bg-surface p-6 sm:p-8">
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-md"
            style={{ background: `oklch(0.92 0.06 ${s.hue})`, color: `oklch(0.35 0.1 ${s.hue})` }}
          >
            <Icon name={s.icon} size={24} weight="duotone" />
          </span>
          <div>
            <p className="font-display text-4xl leading-none text-ink">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1.5 text-sm text-muted">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
