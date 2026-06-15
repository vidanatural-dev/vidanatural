'use client';

import { Icon } from './Icon';

function openSearch() {
  window.dispatchEvent(new CustomEvent('materia:open-search'));
}

export function SearchTrigger({ variant = 'navbar' }: { variant?: 'navbar' | 'icon' | 'hero' }) {
  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={openSearch}
        aria-label="Buscar"
        className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-200 hover:border-brand hover:text-brand"
      >
        <Icon name="MagnifyingGlass" size={18} />
      </button>
    );
  }

  if (variant === 'hero') {
    return (
      <button
        type="button"
        onClick={openSearch}
        className="group flex w-full max-w-md items-center gap-3 rounded-full border border-line-strong bg-surface px-5 py-3.5 text-left text-muted shadow-soft transition-colors duration-200 hover:border-brand"
      >
        <Icon name="MagnifyingGlass" size={18} className="text-brand" />
        <span className="flex-1 text-sm">Buscá productos, recetas o una necesidad...</span>
        <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] sm:block">⌘K</kbd>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Buscar"
      className="flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3.5 py-2 text-sm text-muted transition-colors duration-200 hover:border-brand hover:text-ink"
    >
      <Icon name="MagnifyingGlass" size={16} />
      <span className="hidden lg:inline">Buscar</span>
      <kbd className="hidden rounded border border-line px-1 font-mono text-[10px] lg:inline">⌘K</kbd>
    </button>
  );
}
