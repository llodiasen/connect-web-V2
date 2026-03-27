// Server Component — metadata + Schema.org + SSG statique
// Source  : REFONTE-ERP.md + CONTENT.md > PAGE : Intégration ERP
// URL     : /services/integration-erp

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { IntegrationErpPageClient } from '@/components/sections/integration-erp/IntegrationErpPageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Intégration ERP Odoo SAP | Connect Web Dakar',
  description:
    'Intégration ERP à Dakar. Odoo, SAP, Dynamics 365. Synchronisation automatique, zéro ressaisie. Audit gratuit. +50 projets livrés.',
  alternates: {
    canonical: 'https://connect-web.tech/services/integration-erp',
  },
  openGraph: {
    title: 'Intégration ERP Odoo SAP | Connect Web Dakar',
    description:
      'Odoo, SAP, Dynamics 365 — synchronisation automatique, zéro ressaisie. Intégration ERP sur mesure à Dakar.',
    url:      'https://connect-web.tech/services/integration-erp',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Intégration ERP Odoo SAP | Connect Web Dakar',
    description: 'Odoo, SAP, Dynamics 365. Sync temps réel, zéro ressaisie. Audit gratuit.',
  },
  keywords:
    'intégration erp dakar, odoo sénégal, connecteur erp api, synchronisation erp site web, implémentation odoo, erp pme afrique',
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
  name:        'Intégration ERP',
  description: 'Intégration ERP à Dakar. Odoo, SAP, Dynamics 365. Synchronisation automatique, zéro ressaisie. Audit infrastructure gratuit.',
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
  serviceType: 'Intégration ERP',
  url:         'https://connect-web.tech/services/integration-erp',
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
      name:    'On utilise déjà un ERP ancien. Peut-on l\u2019intégrer\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Dans la grande majorité des cas, oui. Si votre ERP dispose d\u2019une API, on le connecte. Pour les ERP legacy, on développe des connecteurs sur mesure ou une intégration par fichiers.',
      },
    },
    {
      '@type': 'Question',
      name:    'Combien co\u00fbte une intégration ERP\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '\u00c0 partir de 500\u202f000\u00a0FCFA pour une intégration simple. Projets complexes (multi-systèmes, Odoo complet)\u00a0: sur devis. Audit gratuit. Voir les tarifs sur https://connect-web.tech/tarifs',
      },
    },
    {
      '@type': 'Question',
      name:    'L\u2019intégration va-t-elle perturber notre activité\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Non. On travaille en environnement de test, puis bascule planifiée hors heures de pointe avec accompagnement temps réel.',
      },
    },
    {
      '@type': 'Question',
      name:    'Proposez-vous l\u2019implémentation complète d\u2019Odoo\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Au-delà de l\u2019intégration ERP, on implémente et configure Odoo de A à Z\u00a0: comptabilité, stock, ventes, RH. Partenaire Odoo au Sénégal.',
      },
    },
    {
      '@type': 'Question',
      name:    'Peut-on connecter l\u2019ERP à notre boutique en ligne\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Stock, commandes, facturation synchronisés en temps réel entre votre ERP et votre site e-commerce.',
      },
    },
    {
      '@type': 'Question',
      name:    'Délai d\u2019intégration ERP\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '2 à 6 semaines selon la complexité et le nombre de systèmes à connecter.',
      },
    },
    {
      '@type': 'Question',
      name:    'Le support est-il inclus\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Monitoring des flux et support inclus. Contrats maintenance longue durée disponibles.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function IntegrationErpPage() {
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
        <IntegrationErpPageClient />
      </Suspense>
    </>
  )
}
