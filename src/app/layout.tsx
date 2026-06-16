import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { display, sans, mono } from '@/lib/fonts';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlobalSearch } from '@/components/GlobalSearch';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { PostHogProvider } from '@/components/PostHogProvider';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'dietética',
    'productos naturales',
    'recetas saludables',
    'suplementos',
    'hierbas',
    'semillas',
    'frutos secos',
    'superalimentos',
    'sin TACC',
    'vegano',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: 'website',
    locale: 'es_AR',
    url: site.url,
    siteName: site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      description: site.description,
    },
    {
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
      inLanguage: 'es',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="grain min-h-[100dvh] antialiased">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-deep focus:px-4 focus:py-2 focus:text-on-brand"
        >
          Saltar al contenido
        </a>
        <PostHogProvider>
          <Navbar />
          <main id="contenido">{children}</main>
          <Footer />
          <GlobalSearch />
          <WhatsAppFab />
        </PostHogProvider>

        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
