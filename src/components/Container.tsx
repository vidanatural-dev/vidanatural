import type { ReactNode } from 'react';

export function Container({
  children,
  className = '',
  width = 'content',
}: {
  children: ReactNode;
  className?: string;
  width?: 'content' | 'wide' | 'prose';
}) {
  const max =
    width === 'wide' ? 'max-w-wide' : width === 'prose' ? 'max-w-prose' : 'max-w-content';
  return <div className={`${max} mx-auto px-5 sm:px-8 ${className}`}>{children}</div>;
}
