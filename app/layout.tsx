import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

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
  },
  metadataBase: new URL('https://vais.co'),
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32' },
      { url: '/images/logo.png', sizes: '16x16' },
    ],
    apple: '/images/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 md:pt-18">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
