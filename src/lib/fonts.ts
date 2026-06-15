import { Newsreader, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';

// Display: serif editorial (compendio herbario). Italic disponible para énfasis.
export const display = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

// Body: grotesca limpia, contraste de eje con la serif.
export const sans = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// Mono: etiquetas pequeñas y datos (dosis, científico).
export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});
