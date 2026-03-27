// Server Component — metadata + Schema.org + SSG statique
// Source  : CONTENT.md > PAGE : Architecture & API
// URL     : /services/architecture-api
// REFONTE : REFONTE-ARCHITECTURE-API.md — 11 sections

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ArchitectureApiPageClient } from '@/components/sections/architecture-api/ArchitectureApiPageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Architecture & API REST/GraphQL | Connect Web Dakar',
  description:
    'Développement API REST et GraphQL à Dakar. Architecture microservices, documentation OpenAPI, tests automatisés. Audit offert. +50 projets.',
  alternates: {
    canonical: 'https://connect-web.tech/services/architecture-api',
  },
  openGraph: {
    title: 'Architecture & API REST/GraphQL | Connect Web Dakar',
    description:
      'API REST/GraphQL sur mesure à Dakar. Microservices, documentation OpenAPI, tests automatisés, CI/CD. Audit architecture offert.',
    url:      'https://connect-web.tech/services/architecture-api',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Architecture & API REST/GraphQL | Connect Web Dakar',
    description: 'API REST/GraphQL à Dakar. Microservices, OpenAPI, tests. Audit offert. +50 projets.',
  },
  keywords:
    'développement api rest, api graphql, architecture microservices, développement api dakar, documentation api openapi, intégration api erp crm',
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
  name:        'Architecture & Développement API',
  description: 'Développement API REST et GraphQL à Dakar. Architecture microservices, documentation OpenAPI, tests automatisés. Audit offert.',
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
  serviceType: 'Développement API REST et GraphQL',
  url:         'https://connect-web.tech/services/architecture-api',
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
      name:    'Combien coûte le développement d\u2019une API sur mesure\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'À partir de 600\u202f000\u00a0FCFA pour une API REST avec auth, CRUD et documentation OpenAPI complète. Voir les tarifs sur https://connect-web.tech/tarifs',
      },
    },
    {
      '@type': 'Question',
      name:    'API REST ou GraphQL\u00a0: comment choisir\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'REST pour les API simples et intégrations tierces. GraphQL pour les frontends complexes avec besoins flexibles. On conseille selon votre contexte de développement API.',
      },
    },
    {
      '@type': 'Question',
      name:    'Peut-on connecter l\u2019API à nos outils existants\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Connecteurs ERP (SAP, Odoo), CRM (Salesforce, HubSpot), paiements (Wave, Stripe) ou toute intégration API tierce sur mesure.',
      },
    },
    {
      '@type': 'Question',
      name:    'La documentation API est-elle incluse\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Documentation OpenAPI/Swagger complète livrée avec chaque projet. Playground interactif pour vos intégrateurs.',
      },
    },
    {
      '@type': 'Question',
      name:    'Quel est le délai de développement d\u2019une API\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '2 à 6 semaines selon la complexité. Audit architecture offert avant tout devis.',
      },
    },
    {
      '@type': 'Question',
      name:    'Microservices ou monolithe\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'On recommande un monolithe modulaire pour démarrer votre architecture. Migration microservices quand le besoin se fait sentir. Pas avant.',
      },
    },
    {
      '@type': 'Question',
      name:    'Le code m\u2019appartient\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. 100\u00a0% du code, de la documentation API et des tests dès le jour\u00a01.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function ArchitectureApiPage() {
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
        <ArchitectureApiPageClient />
      </Suspense>
    </>
  )
}
