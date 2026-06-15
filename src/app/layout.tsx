import type { Metadata } from 'next';
import './globals.css';
import { display, sans, mono } from '@/lib/fonts';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlobalSearch } from '@/components/GlobalSearch';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: 'website',
    locale: 'es_ES',
  },
  robots: { index: true, follow: true },
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="grain min-h-[100dvh] antialiased">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-deep focus:px-4 focus:py-2 focus:text-on-brand"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido">{children}</main>
        <Footer />
        <GlobalSearch />
        <WhatsAppFab />
      </body>
    </html>
  );
}
