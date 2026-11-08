import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageTransition from "@/components/layout/PageTransition";
import "@/styles/globals.css";
import "@/styles/studio.css";
import "@/styles/gallery.css";
import "@/styles/instrument.css";
import "@/styles/signal-accents.css";
import "@/styles/dimensional.css";
import "@/styles/inquiry.css";

const display = localFont({
  src: "../public/fonts/archivo-latin.woff2",
  weight: "100 900",
  variable: "--font-archivo",
  display: "swap",
});
const body = localFont({
  src: "../public/fonts/source-serif-4-latin.woff2",
  weight: "200 900",
  variable: "--font-source-serif",
  display: "swap",
});
const mono = localFont({
  src: [
    { path: "../public/fonts/ibm-plex-mono-400-latin.woff2", weight: "400" },
    { path: "../public/fonts/ibm-plex-mono-500-latin.woff2", weight: "500" },
    { path: "../public/fonts/ibm-plex-mono-600-latin.woff2", weight: "600" },
  ],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VAIS - Applied Intelligence Systems",
    template: "%s | VAIS",
  },
  description:
    "VAIS designs and deploys applied intelligence systems for government, institutions, and enterprise in Uganda and across East Africa.",
  keywords: [
    "VAIS",
    "Applied Intelligence Systems",
    "Uganda",
    "Government Technology",
    "AI Systems",
    "Kampala",
  ],
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: "https://vais.co",
    siteName: "VAIS - Applied Intelligence Systems",
    title: "VAIS - Applied Intelligence Systems",
    description:
      "Applied intelligence systems for government, institutions, and enterprise in Uganda.",
    images: [
      {
        url: "/images/design/intelligence-strata.webp",
        width: 1536,
        height: 1024,
        alt: "VAIS. The intelligence beneath.",
      },
    ],
  },
  metadataBase: new URL("https://vais.co"),
  robots: { index: true, follow: true },
  icons: {
    icon: "/brand/png/favicon-32.png",
    apple: "/brand/png/vais-app-icon-dark-180.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-bond text-ink">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main-content" className="flex-1 pt-18" tabIndex={-1}>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
