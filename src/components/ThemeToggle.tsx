'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Icon } from './Icon';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-line text-ink-soft transition-colors duration-200 hover:border-brand hover:text-brand active:scale-[0.97]"
      aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={dark ? 'Modo claro' : 'Modo oscuro'}
    >
      <span className={mounted ? '' : 'opacity-0'}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={dark ? 'sun' : 'moon'}
            className="grid place-items-center"
            initial={reduce ? false : { rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={reduce ? undefined : { rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <Icon name={dark ? 'Sun' : 'Moon'} size={18} weight="duotone" />
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
