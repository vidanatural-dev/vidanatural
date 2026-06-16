'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from 'motion/react';
import { Container } from './Container';
import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';
import { SearchTrigger } from './SearchTrigger';
import { site } from '@/lib/site';

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12));

  useEffect(() => {
    setScrolled(window.scrollY > 12);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? 'border-b border-line bg-bg/80 backdrop-blur-md'
          : 'border-b border-transparent bg-bg/30 backdrop-blur-[2px]'
      }`}
    >
      <Container width="wide">
        <nav className="flex h-[68px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/15 text-brand ring-1 ring-brand/20">
              <Icon name="Leaf" size={19} weight="fill" />
            </span>
            <span className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold tracking-tight text-ink">
                {site.name}
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:inline">
                natural
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                      active
                        ? 'font-semibold text-brand-deep dark:text-brand'
                        : 'font-medium text-ink-soft hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="ml-2">
              <SearchTrigger />
            </li>
            <li>
              <ThemeToggle />
            </li>
            <li>
              <a
                href={site.whatsappCta}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center gap-2 rounded-full bg-[#1b8c4e] px-3.5 py-2 text-sm font-semibold text-white transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] motion-reduce:hover:translate-y-0"
              >
                <Icon name="WhatsappLogo" size={16} weight="fill" />
                WhatsApp
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-2 md:hidden">
            <SearchTrigger variant="icon" />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
            >
              <Icon name={open ? 'X' : 'List'} size={20} />
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-line bg-bg md:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <Container>
              <ul className="flex flex-col gap-1 py-4">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link href="/productos" className="btn btn-primary w-full">
                    Ver productos
                  </Link>
                </li>
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
