// Server Component — metadata + Schema.org + SSG statique
// Source  : CONTENT.md > PAGE : Développement Web
// URL     : /services/developpement-web

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DeveloppementWebPageClient } from '@/components/sections/developpement-web/DeveloppementWebPageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Création Site Web sur mesure | Connect Web Dakar',
  description:
    'Agence création site web à Dakar. Next.js, Lighthouse 95+, SEO, mobile-first. Livré en 1-3 semaines. +50 projets. Devis gratuit.',
  alternates: {
    canonical: 'https://connect-web.tech/services/developpement-web',
  },
  openGraph: {
    title: 'Création Site Web sur mesure | Connect Web Dakar',
    description:
      'Sites web rapides, beaux et trouvables. Next.js · Lighthouse 95+ · Livré en 1-3 semaines depuis Dakar.',
    url: 'https://connect-web.tech/services/developpement-web',
    siteName: 'Connect Web',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Création Site Web sur mesure | Connect Web Dakar',
    description: 'Sites web rapides, beaux et trouvables. Next.js · Lighthouse 95+ · Livré en 1-3 semaines.',
  },
  keywords:
    'création site web dakar, agence développement web dakar, site web professionnel dakar, prix site web dakar, refonte site web, next.js dakar',
}

/* ─────────────────────────────────────────────────────────────────
   ROUTE SEGMENT CONFIG — SSG statique
   ─────────────────────────────────────────────────────────────── */
export const revalidate = false

/* ─────────────────────────────────────────────────────────────────
   SCHEMA.ORG — Service + FAQPage
   ─────────────────────────────────────────────────────────────── */
const schemaService = {
  '@context': 'https://schema.org',
  '@type':    'Service',
  name:        'Création Site Web',
  description: 'Création de sites web sur mesure à Dakar : Next.js, Lighthouse 95+, SEO mobile-first, CMS intégré. Livraison 1-3 semaines.',
  provider: {
    '@type': 'LocalBusiness',
    name:    'Connect Web',
    url:     'https://connect-web.tech',
    address: {
      '@type':           'PostalAddress',
      addressLocality:   'Dakar',
      addressCountry:    'SN',
    },
  },
  areaServed:       ['Sénégal', "Afrique de l'Ouest"],
  serviceType:      'Développement Web',
  url:              'https://connect-web.tech/services/developpement-web',
}

const schemaFAQPage = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name:    'Combien co\u00fbte un site web \u00e0 Dakar\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '\u00c0 partir de 350\u202f000\u00a0FCFA pour un site vitrine. Le prix d\u2019un site web \u00e0 Dakar d\u00e9pend du nombre de pages et des fonctionnalit\u00e9s. Consultez nos tarifs sur https://connect-web.tech/tarifs pour les fourchettes compl\u00e8tes.',
      },
    },
    {
      '@type': 'Question',
      name:    'Quel est le d\u00e9lai pour un site vitrine\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '1 \u00e0 2 semaines si le contenu est fourni. La cr\u00e9ation de site web \u00e0 Dakar est notre sp\u00e9cialit\u00e9 — on accompagne aussi la r\u00e9daction si besoin.',
      },
    },
    {
      '@type': 'Question',
      name:    'L\u2019h\u00e9bergement est-il inclus\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. H\u00e9bergement Vercel + domaine + SSL tout inclus premi\u00e8re ann\u00e9e.',
      },
    },
    {
      '@type': 'Question',
      name:    'Pourrai-je mettre \u00e0 jour le site seul\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. CMS int\u00e9gr\u00e9 (Sanity ou Strapi) + formation 1h incluse. Z\u00e9ro comp\u00e9tence technique requise.',
      },
    },
    {
      '@type': 'Question',
      name:    'Pourquoi Next.js et pas WordPress\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Next.js est plus rapide (Lighthouse 95+), plus s\u00e9curis\u00e9 et mieux r\u00e9f\u00e9renc\u00e9. WordPress convient pour un blog. Pour un site web professionnel \u00e0 Dakar, Next.js est le bon choix.',
      },
    },
    {
      '@type': 'Question',
      name:    'Proposez-vous la maintenance de site web\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. 30 jours inclus. Contrats maintenance longue dur\u00e9e disponibles — mises \u00e0 jour, sauvegardes, monitoring.',
      },
    },
    {
      '@type': 'Question',
      name:    'Le code source m\u2019appartient\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. 100\u00a0% du code source de votre site web d\u00e8s le jour\u00a01.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function DeveloppementWebPage() {
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

      {/* Contenu de la page — Client Component (11 sections) */}
      <Suspense fallback={null}>
        <DeveloppementWebPageClient />
      </Suspense>
    </>
  )
}
