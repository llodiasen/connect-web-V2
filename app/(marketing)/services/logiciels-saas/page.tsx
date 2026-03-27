// Server Component — metadata + Schema.org + SSG statique
// Source  : CONTENT.md > PAGE : Logiciels SaaS
// URL     : /services/logiciels-saas
// REFONTE : REFONTE-SAAS.md — 11 sections

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LogicielsSaasPageClient } from '@/components/sections/logiciels-saas/LogicielsSaasPageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Développement SaaS sur mesure | Connect Web Dakar',
  description:
    'Développement logiciel SaaS à Dakar. Architecture multi-tenant, billing Wave + Stripe, onboarding. MVP en 6-10 semaines. +50 projets. Devis gratuit.',
  alternates: {
    canonical: 'https://connect-web.tech/services/logiciels-saas',
  },
  openGraph: {
    title: 'Développement SaaS sur mesure | Connect Web Dakar',
    description:
      'Architecture multi-tenant, billing Wave + Stripe, onboarding automatisé. MVP SaaS en 6-10 semaines depuis Dakar.',
    url:      'https://connect-web.tech/services/logiciels-saas',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Développement SaaS sur mesure | Connect Web Dakar',
    description: 'Multi-tenant, billing Wave + Stripe, onboarding. MVP SaaS en 6-10 semaines à Dakar.',
  },
  keywords:
    'développement saas, créer un saas, plateforme saas sur mesure, mvp saas, architecture multi-tenant, développement logiciel saas dakar, billing stripe wave, saas afrique',
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
  name:        'Développement Logiciel SaaS',
  description: 'Développement logiciel SaaS à Dakar. Architecture multi-tenant, billing Wave + Stripe, onboarding automatisé. MVP en 6-10 semaines.',
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
  serviceType: 'Développement Logiciel SaaS',
  url:         'https://connect-web.tech/services/logiciels-saas',
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
      name:    'Combien co\u00fbte le d\u00e9veloppement d\u2019un SaaS\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '\u00c0 partir de 2\u202f000\u202f000\u00a0FCFA pour un MVP SaaS fonctionnel. Le co\u00fbt de d\u00e9veloppement SaaS d\u00e9pend du nombre de features et des int\u00e9grations. Voir les tarifs sur https://connect-web.tech/tarifs',
      },
    },
    {
      '@type': 'Question',
      name:    'Combien de temps pour un MVP SaaS\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '6 \u00e0 10 semaines pour un MVP bien d\u00e9fini. Notre approche agile de d\u00e9veloppement SaaS permet de lancer t\u00f4t et d\u2019it\u00e9rer.',
      },
    },
    {
      '@type': 'Question',
      name:    'Vous g\u00e9rez l\u2019h\u00e9bergement du SaaS\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. D\u00e9ploiement Vercel/Railway/AWS + monitoring + CI/CD. On vous forme au pilotage de votre plateforme SaaS.',
      },
    },
    {
      '@type': 'Question',
      name:    'Wave et Stripe en m\u00eame temps sur un SaaS\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Double billing configur\u00e9 d\u00e8s le d\u00e9part. March\u00e9 africain + international couvert pour votre logiciel SaaS.',
      },
    },
    {
      '@type': 'Question',
      name:    'Et si je veux pivoter\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    "L\u2019architecture multi-tenant est modulaire. On peut changer de direction sans tout reconstruire.",
      },
    },
    {
      '@type': 'Question',
      name:    "C\u2019est quoi l\u2019architecture multi-tenant\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Chaque client de votre SaaS a son espace isol\u00e9, mais tout tourne sur la m\u00eame infrastructure. Scalable et \u00e9conomique.',
      },
    },
    {
      '@type': 'Question',
      name:    'Le code m\u2019appartient\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. 100\u00a0% du code source, de l\u2019architecture et des donn\u00e9es de votre plateforme SaaS d\u00e8s le jour\u00a01.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function LogicielsSaasPage() {
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
        <LogicielsSaasPageClient />
      </Suspense>
    </>
  )
}
