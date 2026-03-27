// Server Component — metadata + Schema.org + SSG statique
// Source  : CONTENT.md > PAGE : Email Marketing
// URL     : /services/email-marketing
// REFONTE : REFONTE-EMAIL-MARKETING.md — 11 sections

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EmailMarketingPageClient } from '@/components/sections/email-marketing/EmailMarketingPageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Email Marketing & Automatisation | Connect Web Dakar',
  description:
    'Configuration Mailchimp, Klaviyo, Brevo à Dakar. Séquences email automatisées, templates sur mesure, connexion CRM. RGPD conforme. Audit offert.',
  alternates: {
    canonical: 'https://connect-web.tech/services/email-marketing',
  },
  openGraph: {
    title: 'Email Marketing & Automatisation | Connect Web Dakar',
    description:
      'Mailchimp, Klaviyo, Brevo configurés à Dakar. Séquences abandon panier, nurturing, templates HTML sur mesure. Audit email offert.',
    url:      'https://connect-web.tech/services/email-marketing',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Email Marketing & Automatisation | Connect Web Dakar',
    description: 'Configuration Mailchimp, Klaviyo, Brevo. Séquences email automatisées, RGPD conforme. Audit offert à Dakar.',
  },
  keywords:
    'email marketing dakar, automatisation email, configuration mailchimp, klaviyo shopify, brevo sénégal, séquence abandon panier, template email sur mesure',
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
  name:        'Email Marketing & Automatisation',
  description: 'Configuration Mailchimp, Klaviyo, Brevo à Dakar. Séquences email automatisées, templates sur mesure, connexion CRM. RGPD conforme.',
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
  serviceType: 'Email Marketing & Automatisation',
  url:         'https://connect-web.tech/services/email-marketing',
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
      name:    'Quel outil email recommandez-vous au S\u00e9n\u00e9gal\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    "Klaviyo pour l\u2019email marketing e-commerce. Brevo pour les PME s\u00e9n\u00e9galaises (facturation en FCFA, support fran\u00e7ais). Mailchimp pour d\u00e9buter. On conseille selon usage et budget.",
      },
    },
    {
      '@type': 'Question',
      name:    'Combien co\u00fbte la configuration email marketing\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    '\u00c0 partir de 200\u202f000\u00a0FCFA avec 3 s\u00e9quences email automatis\u00e9es et templates sur mesure. Audit offert. Voir les tarifs sur https://connect-web.tech/tarifs',
      },
    },
    {
      '@type': 'Question',
      name:    'Peut-on reprendre notre liste email existante\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Import, nettoyage et segmentation inclus. Nettoyage obligatoire pour \u00e9viter le spam.',
      },
    },
    {
      '@type': 'Question',
      name:    "Combien d\u2019emails par mois\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Brevo\u00a0: 9\u202f000 emails/mois gratuits. Klaviyo facture selon les contacts actifs. On optimise le co\u00fbt de votre email marketing.',
      },
    },
    {
      '@type': 'Question',
      name:    'La s\u00e9quence abandon panier fonctionne avec Shopify\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Klaviyo + Shopify \u2014 connexion native, s\u00e9quence email abandon panier pr\u00e9configur\u00e9e et optimis\u00e9e.',
      },
    },
    {
      '@type': 'Question',
      name:    "Comment mesurer le ROI de l\u2019email marketing\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    "Dashboard revenus par email, taux conversion, co\u00fbt par acquisition \u2014 tout configur\u00e9 dans votre outil d\u2019email marketing.",
      },
    },
    {
      '@type': 'Question',
      name:    "C\u2019est RGPD conforme\u00a0?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Oui. Opt-in, consentement, lien d\u00e9sabonnement \u2014 tout est configur\u00e9 d\u00e8s le d\u00e9part. Votre email marketing est l\u00e9gal.',
      },
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function EmailMarketingPage() {
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
        <EmailMarketingPageClient />
      </Suspense>
    </>
  )
}
