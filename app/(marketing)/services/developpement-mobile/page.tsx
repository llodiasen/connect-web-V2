// Server Component — metadata + Schema.org + SSG statique
// Source  : REFONTE-MOBILE.md — 12 sections
// URL     : /services/developpement-mobile

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DeveloppementMobilePageClient } from '@/components/sections/developpement-mobile/DeveloppementMobilePageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Développement Application Mobile iOS & Android | Connect Web Dakar',
  description:
    'Agence développement application mobile à Dakar. React Native, Flutter, Swift, Kotlin. Wave & Orange Money intégrés. Offline-first. +50 projets. Devis gratuit.',
  alternates: {
    canonical: 'https://connect-web.tech/services/developpement-mobile',
  },
  openGraph: {
    title: 'Développement Application Mobile | Connect Web Dakar',
    description:
      'Applications mobiles iOS & Android pensées pour l\'utilisateur africain. React Native, Flutter, paiement mobile natif.',
    url:      'https://connect-web.tech/services/developpement-mobile',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Développement Application Mobile | Connect Web Dakar',
    description: 'Apps iOS & Android. React Native, Flutter. Wave & Orange Money. Offline-first. Devis gratuit.',
  },
  keywords:
    'développement application mobile, créer application mobile, agence développement mobile dakar, développeur react native dakar, développeur flutter sénégal, coût application mobile, application mobile sur mesure',
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
  name:        'Développement Application Mobile',
  description: 'Développement d\'applications mobiles iOS et Android sur mesure à Dakar. React Native, Flutter, Wave & Orange Money intégrés.',
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
  serviceType: 'Développement Application Mobile sur mesure',
  url:         'https://connect-web.tech/services/developpement-mobile',
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
      name:    'Combien co\u00fbte une application mobile au S\u00e9n\u00e9gal\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '\u00c0 partir de 600\u202f000\u00a0FCFA pour un MVP. Application mobile compl\u00e8te\u00a0: 1,5M \u00e0 5M FCFA. Le co\u00fbt d\u00e9pend des fonctionnalit\u00e9s et de la complexit\u00e9. Devis gratuit apr\u00e8s premier \u00e9change. Consultez nos tarifs sur https://connect-web.tech/tarifs',
      },
    },
    {
      '@type': 'Question',
      name:    'React Native ou Flutter\u00a0: comment choisir\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'React Native si votre \u00e9quipe conna\u00eet JavaScript ou pour un MVP rapide. Flutter pour des interfaces visuellement riches et des animations complexes. En tant que d\u00e9veloppeur React Native et Flutter \u00e0 Dakar, on vous conseille selon votre contexte.',
      },
    },
    {
      '@type': 'Question',
      name:    'Mon application mobile fonctionnera-t-elle sans internet\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. On d\u00e9veloppe en offline-first \u2014 adapt\u00e9 aux zones \u00e0 connectivit\u00e9 limit\u00e9e en Afrique de l\u2019Ouest. Synchronisation automatique au retour du r\u00e9seau.',
      },
    },
    {
      '@type': 'Question',
      name:    'Peut-on int\u00e9grer Wave et Orange Money\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui, c\u2019est notre sp\u00e9cialit\u00e9. Wave, Orange Money, Free Money int\u00e9gr\u00e9s en standard sur chaque application mobile sur mesure que nous d\u00e9veloppons.',
      },
    },
    {
      '@type': 'Question',
      name:    'Combien de temps pour publier sur les stores\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Apple App Store\u00a0: 1-3 jours de validation. Google Play\u00a0: 2-7 jours. On g\u00e8re toute la soumission pour vous.',
      },
    },
    {
      '@type': 'Question',
      name:    'Le code source m\u2019appartient\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. 100\u00a0% du code de votre application mobile vous appartient d\u00e8s le jour\u00a01. H\u00e9berg\u00e9 sur votre repo GitHub ou GitLab.',
      },
    },
    {
      '@type': 'Question',
      name:    'Proposez-vous un support apr\u00e8s livraison\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. 30 jours de support inclus. Contrats de maintenance disponibles pour le long terme \u2014 mises \u00e0 jour, corrections, nouvelles features.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function DeveloppementMobilePage() {
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

      {/* Contenu — Client Component (12 sections) */}
      <Suspense fallback={null}>
        <DeveloppementMobilePageClient />
      </Suspense>
    </>
  )
}
