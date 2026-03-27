// Server Component — metadata + Schema.org + SSG statique
// Source  : REFONTE-MARKETPLACE.md — 11 sections
// URL     : /services/marketplace

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { MarketplacePageClient } from '@/components/sections/marketplace/MarketplacePageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Marketplace Multi-vendeurs | Connect Web Dakar',
  description:
    'Création marketplace multi-vendeurs à Dakar. Commissions auto, Wave & Orange Money, dashboard vendeur. MVP en 6 semaines. Devis gratuit.',
  alternates: {
    canonical: 'https://connect-web.tech/services/marketplace',
  },
  openGraph: {
    title: 'Marketplace Multi-vendeurs | Connect Web Dakar',
    description:
      'Marketplace multi-vendeurs à Dakar : commissions automatiques, Wave & Orange Money, dashboard vendeur et admin. MVP livré en 6 semaines.',
    url:      'https://connect-web.tech/services/marketplace',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Marketplace Multi-vendeurs | Connect Web Dakar',
    description: 'Marketplace multi-vendeurs à Dakar. Wave + OM, commissions auto, dashboard vendeur. MVP en 6 semaines.',
  },
  keywords:
    'marketplace multi-vendeurs, création marketplace dakar, plateforme multi-vendeurs, marketplace afrique, commissions automatiques, marketplace wave orange money',
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
  name:        'Création Marketplace Multi-vendeurs',
  description: 'Développement marketplace multi-vendeurs à Dakar. Commissions auto, Wave & Orange Money natifs, dashboard vendeur et admin inclus. MVP en 6 semaines.',
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
  serviceType: 'Développement Marketplace Multi-vendeurs',
  url:         'https://connect-web.tech/services/marketplace',
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
      name:    'Quel est le budget pour une marketplace\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '\u00c0 partir de 3\u202f000\u202f000\u00a0FCFA pour le MVP (auth, catalogue, commissions, paiements). Devis pr\u00e9cis apr\u00e8s atelier cadrage gratuit.',
      },
    },
    {
      '@type': 'Question',
      name:    'Comment fonctionnent les commissions\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Taux configurable (fixe ou\u00a0%) par cat\u00e9gorie ou vendeur. Calcul et r\u00e9partition automatiques \u00e0 chaque commande. Export comptable inclus.',
      },
    },
    {
      '@type': 'Question',
      name:    'Les vendeurs g\u00e8rent leur boutique seuls\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Dashboard vendeur complet\u00a0: catalogue, commandes, revenus, profil. Z\u00e9ro intervention technique de votre part.',
      },
    },
    {
      '@type': 'Question',
      name:    'Wave et Orange Money pour les vendeurs\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Paiements vendeurs via Wave et Orange Money en standard. Pas besoin de compte bancaire.',
      },
    },
    {
      '@type': 'Question',
      name:    'Combien de vendeurs peut supporter la plateforme\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    "L\u2019architecture est con\u00e7ue pour scaler. 10, 100, 10\u202f000 vendeurs\u00a0\u2014 m\u00eame infrastructure, m\u00eames performances.",
      },
    },
    {
      '@type': 'Question',
      name:    'Quel est le d\u00e9lai de d\u00e9veloppement\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '6 \u00e0 10 semaines selon la complexit\u00e9. MVP fonctionnel en 4\u20136 semaines. On livre en sprints valid\u00e9s ensemble.',
      },
    },
    {
      '@type': 'Question',
      name:    'Le code m\u2019appartient\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. 100\u00a0% du code source d\u00e8s le jour\u00a01. H\u00e9berg\u00e9 sur votre repo GitHub/GitLab.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function MarketplacePage() {
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
        <MarketplacePageClient />
      </Suspense>
    </>
  )
}
