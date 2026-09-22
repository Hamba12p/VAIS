import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, Source_Serif_4 } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import PageTransition from '@/components/layout/PageTransition';
import '@/styles/globals.css';

const display = Archivo({ subsets: ['latin'], variable: '--font-archivo', display: 'swap' });
const body = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-ibm-mono', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'VAIS - Applied Intelligence Systems',
    template: '%s | VAIS',
  },
  description:
    'VAIS designs and deploys applied intelligence systems for government, institutions, and enterprise in Uganda and across East Africa.',
  keywords: ['VAIS', 'Applied Intelligence Systems', 'Uganda', 'Government Technology', 'AI Systems', 'Kampala'],
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: 'https://vais.co',
    siteName: 'VAIS - Applied Intelligence Systems',
    title: 'VAIS - Applied Intelligence Systems',
    description:
      'Applied intelligence systems for government, institutions, and enterprise in Uganda.',
    images: [{ url: '/images/contour/open-graph.png', width: 1200, height: 630, alt: 'VAIS — intelligence shaped by the ground it serves' }],
  },
  metadataBase: new URL('https://vais.co'),
  robots: { index: true, follow: true },
  icons: {
    icon: '/images/contour/terrain-glyph.svg',
    apple: '/images/contour/terrain-glyph.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-bond text-ink">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ScrollProgress />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 pt-16 md:pt-18"><PageTransition>{children}</PageTransition></main>
        <Footer />
      </body>
    </html>
  );
}
