import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        brand: 'var(--brand)',
        'brand-deep': 'var(--brand-deep)',
        'brand-soft': 'var(--brand-soft)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        'on-brand': 'var(--on-brand)',
        'on-brand-soft': 'var(--on-brand-soft)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Escala fluida única (ratio ~1.3). Usar en lugar de tamaños inline dispares.
        display: ['clamp(2.75rem, 1.5rem + 4.4vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        h1: ['clamp(2.25rem, 1.6rem + 2.6vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '-0.024em' }],
        h2: ['clamp(1.75rem, 1.3rem + 1.7vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        h3: ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.014em' }],
        lead: ['1.1875rem', { lineHeight: '1.6' }],
      },
      borderRadius: {
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
        xl: 'var(--r-xl)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
      },
      maxWidth: {
        prose: '68ch',
        content: '1200px',
        wide: '1320px',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        expo: 'var(--ease-expo)',
        'in-out': 'var(--ease-in-out)',
      },
    },
  },
  plugins: [],
};

export default config;
