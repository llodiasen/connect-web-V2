// Server Component — metadata + Schema.org + SSG statique
// Source  : REFONTE-CRM.md > PAGE : Intégration CRM
// URL     : /services/integration-crm

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { IntegrationCrmPageClient } from '@/components/sections/integration-crm/IntegrationCrmPageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Intégration CRM HubSpot Salesforce | Connect Web Dakar',
  description:
    'Intégration CRM à Dakar. HubSpot, Salesforce, Zoho. Leads capturés automatiquement, workflows de relance, vue 360° client. Audit offert.',
  alternates: {
    canonical: 'https://connect-web.tech/services/integration-crm',
  },
  openGraph: {
    title: 'Intégration CRM HubSpot Salesforce | Connect Web Dakar',
    description:
      'HubSpot, Salesforce, Zoho — leads capturés automatiquement, workflows de relance, vue 360° client. Intégration CRM sur mesure à Dakar.',
    url:      'https://connect-web.tech/services/integration-crm',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Intégration CRM HubSpot Salesforce | Connect Web Dakar',
    description: 'HubSpot, Salesforce, Zoho. Leads auto, workflows de relance. Audit CRM offert.',
  },
  keywords:
    'intégration crm dakar, hubspot sénégal, salesforce intégration, zoho crm, crm pme afrique, automatisation commerciale',
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
  name:        'Intégration CRM',
  description: 'Intégration CRM à Dakar. HubSpot, Salesforce, Zoho. Leads capturés automatiquement, workflows de relance, vue 360° client. Audit commercial offert.',
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
  serviceType: 'Intégration CRM',
  url:         'https://connect-web.tech/services/integration-crm',
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
      name:    "On n\u2019a pas encore de CRM. Lequel choisir\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'HubSpot (gratuit au d\u00e9part) pour les PME. Zoho CRM pour un bon rapport qualit\u00e9/prix. Salesforce pour les besoins avanc\u00e9s. On conseille et impl\u00e9mente le CRM adapt\u00e9 \u00e0 votre entreprise s\u00e9n\u00e9galaise.',
      },
    },
    {
      '@type': 'Question',
      name:    'Combien co\u00fbte une int\u00e9gration CRM\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '\u00c0 partir de 300\u202f000\u00a0FCFA pour une int\u00e9gration CRM basique (formulaires \u2192 CRM). Projets complets avec workflows\u00a0: sur devis. Voir les tarifs sur https://connect-web.tech/tarifs',
      },
    },
    {
      '@type': 'Question',
      name:    'Peut-on connecter notre site web au CRM\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    "Oui, c'est notre int\u00e9gration CRM la plus fr\u00e9quente. Chaque formulaire alimente automatiquement le CRM avec le contact et la source.",
      },
    },
    {
      '@type': 'Question',
      name:    'Le CRM fonctionne avec Wave et Orange Money\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. On connecte les donn\u00e9es de paiement Wave/OM \u00e0 votre fiche client CRM pour un suivi complet.',
      },
    },
    {
      '@type': 'Question',
      name:    'Peut-on connecter le CRM \u00e0 notre ERP\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Synchronisation CRM \u2194 ERP bidirectionnelle. Contacts, commandes, factures unifi\u00e9s.',
      },
    },
    {
      '@type': 'Question',
      name:    "D\u00e9lai d\u2019int\u00e9gration CRM\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '1 \u00e0 3 semaines selon la complexit\u00e9. Configuration CRM simple\u00a0: 1 semaine.',
      },
    },
    {
      '@type': 'Question',
      name:    "Formation de l\u2019\u00e9quipe incluse\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. 2h de formation pour vos commerciaux. Documentation incluse. Adoption CRM garantie.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function IntegrationCrmPage() {
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
        <IntegrationCrmPageClient />
      </Suspense>
    </>
  )
}
