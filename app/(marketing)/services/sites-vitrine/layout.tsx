// Source   : REFONTE-VITRINE.md
// URL      : /services/sites-vitrine
// SEO      : metadata — Schema.org géré dans page.tsx via <script dangerouslySetInnerHTML>

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Création Site Vitrine Professionnel | Connect Web Dakar',
  description:
    'Création site vitrine à Dakar. Design sur mesure, SEO, mobile-first, Lighthouse 95+. Livré en 1-2 semaines. À partir de 350 000 FCFA. Devis gratuit.',
  keywords: [
    'site vitrine dakar',
    'création site vitrine',
    'site web professionnel dakar',
    'prix site vitrine sénégal',
    'site internet entreprise dakar',
  ],
  alternates: {
    canonical: 'https://connect-web.tech/services/sites-vitrine',
  },
  openGraph: {
    title: 'Création Site Vitrine Professionnel | Connect Web Dakar',
    description:
      'Site vitrine sur mesure à Dakar. Design unique, SEO inclus, CMS intégré, Lighthouse 95+. Livraison en 1-2 semaines.',
    url:      'https://connect-web.tech/services/sites-vitrine',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Création Site Vitrine Professionnel | Connect Web Dakar',
    description: 'Site vitrine à Dakar. Design sur mesure, SEO, mobile-first, Lighthouse 95+. Livré en 1-2 semaines.',
  },
  robots: { index: true, follow: true },
}

export default function SitesVitrineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
