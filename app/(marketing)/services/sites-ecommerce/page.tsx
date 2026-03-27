// Server Component — metadata + Schema.org + SSG statique
// Source  : REFONTE-ECOMMERCE.md — 11 sections
// URL     : /services/sites-ecommerce

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EcommercePageClient } from '@/components/sections/ecommerce/EcommercePageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Création Boutique en ligne | Connect Web Dakar',
  description:
    'Création site e-commerce à Dakar. Wave, Orange Money, Stripe intégrés. WooCommerce, Shopify ou sur mesure. Mobile-first. +50 projets. Devis gratuit.',
  alternates: {
    canonical: 'https://connect-web.tech/services/sites-ecommerce',
  },
  openGraph: {
    title: 'Création Boutique en ligne | Connect Web Dakar',
    description:
      'Création site e-commerce à Dakar. Wave, Orange Money, Stripe intégrés. WooCommerce, Shopify ou sur mesure. Mobile-first. +50 projets livrés.',
    url:      'https://connect-web.tech/services/sites-ecommerce',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Création Boutique en ligne | Connect Web Dakar',
    description: 'Site e-commerce à Dakar. Wave, Orange Money, Stripe. WooCommerce, Shopify ou sur mesure. +50 projets. Devis gratuit.',
  },
  keywords:
    'site e-commerce dakar, boutique en ligne sénégal, création boutique en ligne, wave orange money e-commerce, e-commerce afrique, vente en ligne dakar',
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
  name:        'Création Site E-commerce',
  description: 'Développement boutique en ligne à Dakar. Wave, Orange Money et Stripe intégrés. WooCommerce, Shopify ou Next.js headless. Mobile-first, SEO e-commerce inclus.',
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
  serviceType: 'Création Site E-commerce',
  url:         'https://connect-web.tech/services/sites-ecommerce',
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
      name:    'Shopify ou WooCommerce pour le S\u00e9n\u00e9gal\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Shopify est plus simple mais abonnement mensuel. WooCommerce est plus flexible et 100\u00a0% propri\u00e9taire. On conseille selon votre volume de vente en ligne et votre budget.',
      },
    },
    {
      '@type': 'Question',
      name:    'Combien co\u00fbte un site e-commerce \u00e0 Dakar\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '\u00c0 partir de 450\u202f000\u00a0FCFA pour une boutique en ligne simple. E-commerce complet avec paiement Wave/OM\u00a0: 800k \u00e0 3M FCFA.',
      },
    },
    {
      '@type': 'Question',
      name:    'Peut-on vendre \u00e0 l\u2019international depuis le S\u00e9n\u00e9gal\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Stripe pour les paiements internationaux + Wave/Orange Money pour les clients locaux. Votre site e-commerce adresse les deux march\u00e9s.',
      },
    },
    {
      '@type': 'Question',
      name:    'Le stock est-il synchronis\u00e9 avec ma boutique physique\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. On connecte votre boutique en ligne et votre point de vente pour un stock unifi\u00e9 en temps r\u00e9el.',
      },
    },
    {
      '@type': 'Question',
      name:    'Pourrai-je g\u00e9rer la boutique seul\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Dashboard intuitif + formation 1h incluse. Ajout produits, gestion commandes, promos \u2014 vous faites tout.',
      },
    },
    {
      '@type': 'Question',
      name:    'Le SEO est-il inclus\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Schema Product, URLs optimis\u00e9es, sitemap, meta \u2014 SEO e-commerce complet pour que vos produits apparaissent sur Google.',
      },
    },
    {
      '@type': 'Question',
      name:    'D\u00e9lai de cr\u00e9ation\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '2 \u00e0 4 semaines selon la complexit\u00e9 et le nombre de produits de votre boutique en ligne.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function SitesEcommercePage() {
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
        <EcommercePageClient />
      </Suspense>
    </>
  )
}
