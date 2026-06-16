'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Icon } from './Icon';
import { searchAll, searchSuggestions, typeLabel, type SearchItem, type SearchType } from '@/lib/search';
import { trackEvent } from '@/lib/analytics';

const ORDER: SearchType[] = ['uso', 'producto', 'receta'];

function Thumb({ item }: { item: SearchItem }) {
  if (item.image) {
    return (
      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-line bg-surface-2">
        <Image src={item.image} alt="" width={56} height={56} className="h-full w-full object-cover" />
      </span>
    );
  }
  return (
    <span
      className="grid h-14 w-14 shrink-0 place-items-center rounded-lg"
      style={{ background: `oklch(0.92 0.06 ${item.hue})`, color: `oklch(0.35 0.1 ${item.hue})` }}
    >
      <Icon name={item.icon} size={26} weight="duotone" />
    </span>
  );
}

export function GlobalSearch() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchAll(query), [query]);
  const flat = useMemo(() => {
    const byType: SearchItem[] = [];
    for (const t of ORDER) byType.push(...results.filter((r) => r.type === t));
    return byType;
  }, [results]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (k === '/' && !open) {
        const el = document.activeElement;
        const typing =
          el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || (el as HTMLElement).isContentEditable);
        if (!typing) {
          e.preventDefault();
          setOpen(true);
        }
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('materia:open-search', onOpen as EventListener);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('materia:open-search', onOpen as EventListener);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 20);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  // Analítica: búsqueda realizada (con debounce para no duplicar por tecla).
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const t = setTimeout(() => {
      trackEvent('busqueda_realizada', { query: q, resultados: flat.length });
    }, 800);
    return () => clearTimeout(t);
  }, [query, flat.length]);

  function go(item: SearchItem) {
    setOpen(false);
    router.push(item.href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(flat.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && flat[active]) {
      e.preventDefault();
      go(flat[active]);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[7vh]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            className="absolute inset-0 bg-ink/50 backdrop-blur-md"
            aria-label="Cerrar búsqueda"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Buscador"
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
            initial={reduce ? false : { opacity: 0, y: -28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* acento superior, muy sutil */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-50"
              style={{ background: 'radial-gradient(120% 100% at 50% 0%, oklch(0.8 0.09 150 / 0.16), transparent 75%)' }}
              aria-hidden
            />

            <div className="relative flex items-center gap-3 border-b border-line px-5">
              <span className="text-brand">
                <Icon name="MagnifyingGlass" size={22} />
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Buscá un producto, receta o necesidad"
                aria-label="Buscar en el sitio"
                className="search-input w-full min-w-0 bg-transparent py-5 text-lg text-ink outline-none placeholder:text-muted"
              />
              <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
                ESC
              </kbd>
            </div>

            <div className="relative max-h-[58vh] overflow-y-auto p-2">
              {query.trim() === '' ? (
                <div className="p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Búsquedas frecuentes</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {searchSuggestions().map((s) => (
                      <button key={s} type="button" className="chip" onClick={() => setQuery(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : flat.length === 0 ? (
                <div className="grid place-items-center px-6 py-14 text-center">
                  <span className="text-brand">
                    <Icon name="Leaf" size={30} weight="duotone" />
                  </span>
                  <p className="mt-3 font-display text-xl text-ink">Sin resultados para “{query}”</p>
                  <p className="mt-1 max-w-xs text-sm text-ink-soft">
                    Probá con una necesidad como energía, dormir o digestión, o el nombre de un producto.
                  </p>
                </div>
              ) : (
                ORDER.map((t) => {
                  const group = results.filter((r) => r.type === t);
                  if (group.length === 0) return null;
                  return (
                    <div key={t} className="mb-1">
                      <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                        {typeLabel[t]}
                      </p>
                      <ul>
                        {group.map((item) => {
                          const idx = flat.indexOf(item);
                          const isActive = idx === active;
                          return (
                            <li key={item.id}>
                              <button
                                type="button"
                                onMouseEnter={() => setActive(idx)}
                                onClick={() => go(item)}
                                className={`flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-left transition-colors ${
                                  isActive ? 'bg-surface-2' : ''
                                }`}
                              >
                                <Thumb item={item} />
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate font-display text-lg text-ink">{item.title}</span>
                                  <span className="block truncate text-sm text-muted">{item.subtitle}</span>
                                </span>
                                <span
                                  className={`shrink-0 text-brand transition-transform duration-200 ${
                                    isActive ? 'translate-x-0' : '-translate-x-1 opacity-0'
                                  }`}
                                >
                                  <Icon name="ArrowRight" size={18} />
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-line px-5 py-2.5 text-[11px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-line px-1 font-mono">↑</kbd>
                <kbd className="rounded border border-line px-1 font-mono">↓</kbd>
                navegar
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-line px-1 font-mono">Enter</kbd>
                abrir
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
