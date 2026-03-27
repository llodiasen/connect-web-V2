// Server Component — metadata + Schema.org + SSG statique
// Source  : CONTENT.md > PAGE : Sites Vitrine
// URL     : /services/sites-vitrine
// REFONTE : REFONTE-VITRINE.md — 11 sections

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SitesVitrinePageClient } from '@/components/sections/sites-vitrine/SitesVitrinePageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Création Site Vitrine Professionnel | Connect Web Dakar',
  description:
    'Création site vitrine à Dakar. Design sur mesure, SEO, mobile-first, Lighthouse 95+. Livré en 1-2 semaines. À partir de 350 000 FCFA. Devis gratuit.',
  alternates: {
    canonical: 'https://connect-web.tech/services/sites-vitrine',
  },
  openGraph: {
    title: 'Création Site Vitrine Professionnel | Connect Web Dakar',
    description:
      'Design sur mesure, Lighthouse 95+, SEO optimisé, CMS intégré. Site vitrine professionnel livré en 1-2 semaines depuis Dakar.',
    url:      'https://connect-web.tech/services/sites-vitrine',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Création Site Vitrine Professionnel | Connect Web Dakar',
    description: 'Design sur mesure, SEO, Lighthouse 95+. Site vitrine livré en 1-2 semaines. À partir de 350 000 FCFA.',
  },
  keywords:
    'site vitrine dakar, création site vitrine, site web professionnel dakar, prix site vitrine sénégal, site internet entreprise dakar',
}

/* ─────────────────────────────────────────────────────────────────
   ROUTE SEGMENT CONFIG — SSG statique
   ─────────────────────────────────────────────────────────────── */
export const revalidate = false

/* ─────────────────────────────────────────────────────────────────
   SCHEMA.ORG — Service
   ─────────────────────────────────────────────────────────────── */
const schemaService = {
  '@context': 'https://schema.org',
  '@type':    'Service',
  name:        'Création Site Vitrine Professionnel',
  description: 'Création site vitrine à Dakar. Design sur mesure, SEO optimisé, mobile-first, Lighthouse 95+. Livré en 1-2 semaines. À partir de 350 000 FCFA.',
  provider: {
    '@type': 'LocalBusiness',
    name:    'Connect Web',
    url:     'https://connect-web.tech',
    address: {
      '@type':         'PostalAddress',
      addressLocality: 'Dakar',
      addressCountry:  'SN',
    },
  },
  areaServed:  ['Sénégal', "Afrique de l'Ouest"],
  serviceType: 'Création Site Vitrine',
  url:         'https://connect-web.tech/services/sites-vitrine',
  offers: {
    '@type':         'Offer',
    priceCurrency:   'XOF',
    price:           '350000',
    priceSpecification: {
      '@type':         'PriceSpecification',
      minPrice:        '350000',
      maxPrice:        '1200000',
      priceCurrency:   'XOF',
    },
  },
}

/* ─────────────────────────────────────────────────────────────────
   SCHEMA.ORG — FAQPage (7 questions)
   ─────────────────────────────────────────────────────────────── */
const schemaFAQPage = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name:    'Combien co\u00fbte un site vitrine \u00e0 Dakar\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '\u00c0 partir de 350\u202f000\u00a0FCFA. Le prix du site vitrine d\u00e9pend du nombre de pages et des fonctionnalit\u00e9s. Voir les tarifs sur https://connect-web.tech/tarifs',
      },
    },
    {
      '@type': 'Question',
      name:    'Puis-je avoir mon site vitrine en 1\u00a0semaine\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui, si vous fournissez rapidement textes et images. Plus vous \u00eates r\u00e9actif, plus on livre vite. Record\u00a0: 3 jours pour 5 pages.',
      },
    },
    {
      '@type': 'Question',
      name:    "En quoi c\u2019est diff\u00e9rent d\u2019un template\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    "Un template est utilis\u00e9 par des milliers de sites. Votre site vitrine professionnel est con\u00e7u \u00e0 partir de votre identit\u00e9 visuelle. Il vous ressemble.",
      },
    },
    {
      '@type': 'Question',
      name:    'Pourrai-je modifier le site seul\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. CMS int\u00e9gr\u00e9 (Sanity ou Strapi) + formation 1h incluse. Z\u00e9ro comp\u00e9tence technique pour votre site web.',
      },
    },
    {
      '@type': 'Question',
      name:    "L\u2019h\u00e9bergement est-il inclus\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. H\u00e9bergement Vercel + domaine + SSL inclus premi\u00e8re ann\u00e9e pour votre site vitrine.',
      },
    },
    {
      '@type': 'Question',
      name:    'Et si je veux ajouter une boutique plus tard\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Architecture \u00e9volutive. Vous pouvez ajouter un blog, une boutique en ligne ou un espace client \u00e0 tout moment.',
      },
    },
    {
      '@type': 'Question',
      name:    'Le SEO est-il inclus\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Meta tags, sitemap, schema.org, Core Web Vitals \u2014 SEO de base inclus dans chaque site vitrine.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function SitesVitrinePage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQPage) }}
      />

      {/* Contenu — Client Component (11 sections) */}
      <Suspense fallback={null}>
        <SitesVitrinePageClient />
      </Suspense>
    </>
  )
}
