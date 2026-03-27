// Source   : CONTENU-NOTRE-HISTOIRE.md
// Render   : SSG statique
// Schema   : Organization

import type { Metadata } from 'next'
import { AProposPageClient } from '@/components/sections/a-propos/AProposPageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Agence Web Dakar | Connect Web — Notre Histoire & Mission',
  description:
    'Découvrez Connect Web, agence digitale fondée à Dakar en 2025. Création de sites web, e-commerce et applications pour PME sénégalaises. Mobile-first, Wave & Orange Money intégrés.',
  alternates: { canonical: 'https://connect-web.tech/a-propos' },
  keywords: 'agence web Dakar, agence digitale Sénégal, création site web Dakar, transformation digitale Sénégal',
  openGraph: {
    title: 'Connect Web — Agence digitale fondée à Dakar',
    description: 'Notre histoire, nos valeurs, notre vision pour les entreprises sénégalaises.',
    url: 'https://connect-web.tech/a-propos',
    siteName: 'Connect Web',
    locale: 'fr_FR',
    type: 'website',
  },
}

export const revalidate = false // SSG statique

/* ─────────────────────────────────────────────────────────────────
   SCHEMA.ORG — Organization
   ─────────────────────────────────────────────────────────────── */
const schemaOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Connect Web',
  url: 'https://connect-web.tech',
  logo: 'https://connect-web.tech/logo.webp',
  foundingDate: '2025',
  founder: {
    '@type': 'Person',
    name: 'Amadou W. Diallo',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'G49 Scat Urbam',
    addressLocality: 'Dakar',
    addressCountry: 'SN',
  },
  email: 'contact@connect-web.tech',
  telephone: '+221779006282',
  description:
    'Agence de développement web basée à Dakar, spécialisée dans la création de sites internet, e-commerce et applications pour les entreprises sénégalaises.',
  areaServed: {
    '@type': 'Place',
    name: 'Sénégal',
  },
  sameAs: [
    'https://www.linkedin.com/company/connect-web-tech/',
    'https://www.facebook.com/share/1CRzjeUSYM/',
    'https://www.instagram.com/connect_web_agency',
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function AProposPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
      />
      <AProposPageClient />
    </>
  )
}
