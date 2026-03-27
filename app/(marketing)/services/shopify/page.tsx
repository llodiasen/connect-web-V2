// Server Component — metadata + Schema.org + SSG statique
// Source  : REFONTE-SHOPIFY.md
// URL     : /services/shopify
// REFONTE : REFONTE-SHOPIFY.md — 11 sections

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ShopifyPageClient } from '@/components/sections/shopify/ShopifyPageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Boutique Shopify sur mesure | Connect Web Dakar',
  description:
    'Création boutique Shopify à Dakar. Thème Liquid custom, Wave & Orange Money intégrés. Opérationnelle en 2 semaines. Devis gratuit.',
  alternates: {
    canonical: 'https://connect-web.tech/services/shopify',
  },
  openGraph: {
    title: 'Boutique Shopify sur mesure | Connect Web Dakar',
    description:
      'Boutique Shopify à Dakar. Thème Liquid custom, Wave et Orange Money intégrés, SEO optimisé. Opérationnelle en 2 semaines.',
    url:      'https://connect-web.tech/services/shopify',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Boutique Shopify sur mesure | Connect Web Dakar',
    description: 'Boutique Shopify à Dakar. Thème custom, Wave + Orange Money, 2 semaines. Devis gratuit.',
  },
  keywords:
    'boutique shopify dakar, shopify sénégal, thème shopify custom, shopify wave orange money, création shopify, e-commerce shopify afrique',
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
  name:        'Création Boutique Shopify',
  description: 'Création boutique Shopify à Dakar. Thème Liquid custom, Wave & Orange Money intégrés. Opérationnelle en 2 semaines.',
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
  serviceType: 'Création Boutique Shopify sur mesure',
  url:         'https://connect-web.tech/services/shopify',
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
      name:    'Quel est le budget pour une boutique Shopify\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '\u00c0 partir de 500\u202f000\u00a0FCFA avec th\u00e8me custom et paiements locaux int\u00e9gr\u00e9s.',
      },
    },
    {
      '@type': 'Question',
      name:    'Shopify ou WooCommerce pour le S\u00e9n\u00e9gal\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Shopify est plus simple \u00e0 g\u00e9rer au quotidien. WooCommerce est plus flexible et sans abonnement. On conseille selon votre volume et votre niveau technique.',
      },
    },
    {
      '@type': 'Question',
      name:    "L\u2019abonnement Shopify est-il inclus\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Non. Shopify Basic \u00e0 29\u00a0$/mois est \u00e0 votre charge. On vous aide \u00e0 choisir le bon plan.',
      },
    },
    {
      '@type': 'Question',
      name:    'Peut-on vendre en boutique physique aussi\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Shopify POS connecte boutique en ligne et physique\u00a0\u2014 stock unifi\u00e9 en temps r\u00e9el.',
      },
    },
    {
      '@type': 'Question',
      name:    'Quel est le d\u00e9lai de livraison\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '2 \u00e0 3 semaines selon complexit\u00e9 du th\u00e8me et nombre de produits.',
      },
    },
    {
      '@type': 'Question',
      name:    'Peut-on migrer depuis WooCommerce\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Produits, clients, commandes\u00a0\u2014 migration compl\u00e8te sans perte de donn\u00e9es.',
      },
    },
    {
      '@type': 'Question',
      name:    'Wave et Orange Money fonctionnent sur Shopify\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. On int\u00e8gre Wave CI et Orange Money nativement. Vos clients s\u00e9n\u00e9galais paient en 2\u00a0taps.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function ShopifyPage() {
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
        <ShopifyPageClient />
      </Suspense>
    </>
  )
}
