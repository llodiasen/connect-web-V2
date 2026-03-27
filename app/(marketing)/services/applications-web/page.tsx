// Server Component — metadata + Schema.org + SSG statique
// Source  : CONTENT.md > PAGE : Applications Web
// URL     : /services/applications-web
// REFONTE : REFONTE-APPS-WEB.md — 11 sections

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ApplicationsWebPageClient } from '@/components/sections/applications-web/ApplicationsWebPageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — CONTENT.md > Applications Web > SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Applications Web sur mesure | Connect Web Dakar',
  description:
    'Développement applications web à Dakar. Dashboards, portails clients, outils métier. React, Next.js, API REST. +50 projets. Devis gratuit.',
  alternates: {
    canonical: 'https://connect-web.tech/services/applications-web',
  },
  openGraph: {
    title: 'Applications Web sur mesure | Connect Web Dakar',
    description:
      'Dashboards, portails clients, plateformes métier — applications web sur mesure à Dakar. MVP en 4-6 semaines.',
    url:      'https://connect-web.tech/services/applications-web',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Applications Web sur mesure | Connect Web Dakar',
    description: 'Dashboards, portails clients, outils métier. React, Next.js, API REST. MVP en 4-6 semaines depuis Dakar.',
  },
  keywords:
    'application web sur mesure, développement application web dakar, tableau de bord sur mesure, portail client web, outil métier sur mesure, prix application web, application web entreprise, développement web sénégal',
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
  name:        'Développement Application Web sur mesure',
  description: 'Développement d\'applications web sur mesure à Dakar : dashboards, portails clients, outils métier. React, Next.js, API REST. MVP en 4-6 semaines.',
  provider: {
    '@type': 'LocalBusiness',
    name:    'Connect Web',
    url:     'https://connect-web.tech',
    address: {
      '@type':          'PostalAddress',
      addressLocality:  'Dakar',
      addressCountry:   'SN',
    },
  },
  areaServed:  ['Sénégal', "Afrique de l'Ouest"],
  serviceType: 'Développement Application Web',
  url:         'https://connect-web.tech/services/applications-web',
}

const schemaFAQPage = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name:    'Quelle différence entre un site web et une application web\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Un site présente de l\'information. Une application web permet d\'agir\u00a0: gérer commandes, suivre stocks, analyser données. C\'est un outil de travail, pas une vitrine.',
      },
    },
    {
      '@type': 'Question',
      name:    'Combien co\u00fbte une application web sur mesure\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '\u00c0 partir de 800\u202f000\u00a0FCFA pour un MVP. Application web complète\u00a0: 2M à 8M FCFA selon la complexité. Devis gratuit après premier échange. Voir les tarifs sur https://connect-web.tech/tarifs',
      },
    },
    {
      '@type': 'Question',
      name:    "L'application web sera accessible sur mobile\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui, responsive par défaut. Si vous avez besoin d\'offline ou de push natif, on recommande une application mobile dédiée.',
      },
    },
    {
      '@type': 'Question',
      name:    "Peut-on connecter l'app à notre ERP ou CRM\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Intégrations API sur mesure vers SAP, Odoo, Salesforce, HubSpot ou tout outil avec une API.',
      },
    },
    {
      '@type': 'Question',
      name:    'Quel est le délai de développement\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'MVP application web en 4-6 semaines. App complète\u00a0: 2-4 mois. Sprints validés ensemble.',
      },
    },
    {
      '@type': 'Question',
      name:    'Formation des utilisateurs incluse\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. 1-2h de formation incluse + documentation utilisateur complète.',
      },
    },
    {
      '@type': 'Question',
      name:    "Le code m'appartient\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. 100\u00a0% du code de votre application web sur mesure dès le jour\u00a01.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function ApplicationsWebPage() {
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
        <ApplicationsWebPageClient />
      </Suspense>
    </>
  )
}
