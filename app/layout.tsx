import type { Metadata } from 'next'
import { Montserrat, Jost, DM_Sans, Geist, Fraunces } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { TopBar } from '@/components/layout/TopBar'
import './globals.css'

export const viewport = {
  themeColor: '#1B2A4A',
}

/* ── Polices — chargées via next/font (zéro FOUT, self-hosted) ── */

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['italic'],
  weight: ['400'],
})

/* ── Métadonnées globales (SEO — ARCHITECTURE.md §4.1) ────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://connect-web.tech'),
  title: {
    default: 'Connect-Web | Agence Web & E-commerce — Création de Sites Performants',
    template: '%s | Connect-Web Agence',
  },
  description:
    'Agence web spécialisée en création de sites vitrines, refontes et boutiques e-commerce. Solutions digitales performantes, optimisées SEO. Devis gratuit sous 24h.',
  keywords: [
    'agence web',
    'création site web',
    'refonte site',
    'e-commerce',
    'développement web',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://connect-web.tech',
    siteName: 'Connect-Web Agence',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@connectweb',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://connect-web.tech',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      /* Injecte les variables CSS des polices sur <html>
         → Tailwind et globals.css les consomment via var(--font-heading/body) */
      className={`${montserrat.variable} ${jost.variable} ${dmSans.variable} ${geist.variable} ${fraunces.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />
      </head>
      <body>
        <TopBar />
        <Header />
        <div style={{ paddingTop: 'calc(var(--nav-height) + var(--topbar-height))' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
