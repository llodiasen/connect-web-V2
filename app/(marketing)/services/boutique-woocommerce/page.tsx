// Server Component — metadata + Schema.org + SSG statique
// Source  : REFONTE-WOOCOMMERCE.md — 11 sections
// URL     : /services/boutique-woocommerce

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { WoocommercePageClient } from '@/components/sections/woocommerce/WoocommercePageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Boutique WooCommerce sur mesure | Connect Web Dakar',
  description:
    'Création boutique WooCommerce à Dakar. 100% propriétaire, Wave & Orange Money, catalogue illimité. 0 abonnement. Devis gratuit.',
  alternates: {
    canonical: 'https://connect-web.tech/services/boutique-woocommerce',
  },
  openGraph: {
    title: 'Boutique WooCommerce sur mesure | Connect Web Dakar',
    description:
      'Boutique WooCommerce à Dakar. 100% propriétaire, Wave et Orange Money intégrés, catalogue illimité. 0 abonnement mensuel.',
    url:      'https://connect-web.tech/services/boutique-woocommerce',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Boutique WooCommerce sur mesure | Connect Web Dakar',
    description: 'WooCommerce à Dakar. 100% propriétaire, Wave + Orange Money, 0 abonnement. Devis gratuit.',
  },
  keywords:
    'woocommerce dakar, boutique woocommerce, woocommerce sénégal, woocommerce wave orange money, e-commerce wordpress, woocommerce vs shopify',
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
  name:        'Création Boutique WooCommerce',
  description: 'Développement boutique WooCommerce à Dakar. 100% propriétaire, Wave & Orange Money intégrés nativement. Catalogue illimité, 0 abonnement.',
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
  serviceType: 'Création Boutique WooCommerce sur mesure',
  url:         'https://connect-web.tech/services/boutique-woocommerce',
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
      name:    'WooCommerce ou Shopify\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'WooCommerce\u00a0=\u00a0propri\u00e9taire, flexible, 0\u00a0abonnement. Shopify\u00a0=\u00a0plus simple mais abonnement mensuel et donn\u00e9es chez eux. On conseille selon votre volume.',
      },
    },
    {
      '@type': 'Question',
      name:    'Budget boutique WooCommerce\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '\u00c0 partir de 450\u202f000\u00a0FCFA avec th\u00e8me custom et paiements locaux int\u00e9gr\u00e9s.',
      },
    },
    {
      '@type': 'Question',
      name:    "L\u2019h\u00e9bergement est-il inclus\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. 1\u00e8re ann\u00e9e incluse sur VPS Linux ou Vercel selon l\u2019architecture.',
      },
    },
    {
      '@type': 'Question',
      name:    'Peut-on migrer depuis Shopify\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Produits, clients, commandes\u00a0\u2014 migration compl\u00e8te sans perte.',
      },
    },
    {
      '@type': 'Question',
      name:    'D\u00e9lai de livraison\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '2 \u00e0 4 semaines selon la complexit\u00e9 et le nombre de produits.',
      },
    },
    {
      '@type': 'Question',
      name:    "C\u2019est quoi WooCommerce headless\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Front moderne en Next.js connect\u00e9 \u00e0 WooCommerce via API. Performances \u00d73, UX moderne, SEO optimal. On le recommande pour les projets ambitieux.',
      },
    },
    {
      '@type': 'Question',
      name:    'Le code m\u2019appartient\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. 100\u00a0% du code, des plugins et des donn\u00e9es d\u00e8s le jour\u00a01.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function BoutiqueWoocommercePage() {
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
        <WoocommercePageClient />
      </Suspense>
    </>
  )
}
