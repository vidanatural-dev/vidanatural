'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icon';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

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
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-200 hover:border-brand hover:text-brand"
      aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={dark ? 'Modo claro' : 'Modo oscuro'}
    >
      {/* evita parpadeo de icono antes de montar */}
      <span className={mounted ? '' : 'opacity-0'}>
        <Icon name={dark ? 'Sun' : 'Moon'} size={18} weight="duotone" />
      </span>
    </button>
  );
}
