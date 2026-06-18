'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export interface TocItem {
  id: string;
  label: string;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');
  const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number } | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (reduce || !listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>('[data-id="' + active + '"]');
    if (!activeEl) return;
    const listTop = listRef.current.getBoundingClientRect().top;
    const elRect = activeEl.getBoundingClientRect();
    setIndicatorStyle({ top: elRect.top - listTop, height: elRect.height });
  }, [active, reduce]);

  return (
    <nav aria-label="En esta pagina" className="text-sm">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">En esta ficha</p>
      <div className="relative mt-4 border-l border-line">
        {!reduce && indicatorStyle && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 w-0.5 rounded-full bg-brand"
            style={{
              top: indicatorStyle.top,
              height: indicatorStyle.height,
              transition: 'top 0.28s cubic-bezier(0.16, 1, 0.3, 1), height 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        )}
        <ul ref={listRef} className="space-y-1">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <li key={it.id}>
                <a
                  href={'#' + it.id}
                  data-id={it.id}
                  className={'-ml-px block border-l-2 border-transparent py-1.5 pl-4 transition-colors duration-200 ' + (isActive ? 'font-medium text-brand-deep' : 'text-ink-soft hover:text-ink')}
                >
                  {it.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
