// Server Component — metadata + Schema.org + revalidate ISR 24h
// Contenu : CONTENT.md > HOME
// SEO     : LocalBusiness + WebSite schema · OG · canonical

import type { Metadata } from 'next'
import { HomePageClient } from '@/components/sections/home/HomePageClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — page d'accueil
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Connect-Web — Agence digitale pour entrepreneurs, PME et startups | Sites web, e-commerce, automatisation',
  description:
    "Entrepreneurs, commerçants et PME : Connect-Web conçoit vos sites web, boutiques en ligne et solutions d'automatisation pour accélérer votre croissance digitale. Estimation gratuite sous 48h.",
  alternates: {
    canonical: 'https://connect-web.tech',
  },
  openGraph: {
    title: 'Connect-Web — Agence digitale pour entrepreneurs, PME et startups',
    description:
      "Entrepreneurs, commerçants et PME : Connect-Web conçoit vos sites web, boutiques en ligne et solutions d'automatisation pour accélérer votre croissance digitale.",
    url: 'https://connect-web.tech',
    siteName: 'Connect Web',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://connect-web.tech/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Connect Web — Agence digitale à Dakar, Sénégal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connect Web — Agence Digitale à Dakar',
    description: 'Sites web, apps mobiles, SaaS — livrés en 2 à 8 semaines. Wave & Orange Money intégrés.',
    images: ['https://connect-web.tech/images/og-home.jpg'],
  },
  keywords: 'agence digitale dakar, entrepreneur digital sénégal, boutique en ligne dakar, e-commerce sénégal, automatisation PME afrique, création site web dakar, croissance digitale',
}

/* ─────────────────────────────────────────────────────────────────
   ROUTE SEGMENT CONFIG — ISR 24h
   ─────────────────────────────────────────────────────────────── */
export const revalidate = 86400

/* ─────────────────────────────────────────────────────────────────
   SCHEMA.ORG — LocalBusiness + WebSite
   Injecté en <script type="application/ld+json"> dans le <head>
   via generateMetadata ne suffit pas pour structured data → on
   l'injecte directement dans le JSX du Server Component.
   ─────────────────────────────────────────────────────────────── */
const schemaLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Connect Web',
  description: 'Agence digitale à Dakar. Sites web, applications mobiles, logiciels SaaS. Next.js, React Native, Flutter. Wave & Orange Money intégrés.',
  url: 'https://connect-web.tech',
  email: 'contact@connect-web.tech',
  telephone: '+221779006282',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dakar',
    addressCountry: 'SN',
  },
  areaServed: ['Sénégal', "Afrique de l'Ouest"],
  sameAs: [
    'https://www.linkedin.com/company/connect-web-tech/',
    'https://www.facebook.com/share/1CRzjeUSYM/',
    'https://www.instagram.com/connect_web_agency',
  ],
}

const schemaFAQPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '\u00cates-vous vraiment bas\u00e9s \u00e0 Dakar\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Toute l\u2019\u00e9quipe Connect Web est \u00e0 Dakar, S\u00e9n\u00e9gal. On int\u00e8gre Wave, Orange Money et les usages mobiles africains nativement. Vous parlez \u00e0 une agence digitale qui conna\u00eet votre march\u00e9.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien co\u00fbte un site web \u00e0 Dakar\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un site vitrine d\u00e9marre \u00e0 350\u202f000 FCFA. Une application mobile \u00e0 partir de 600\u202f000 FCFA. Chaque devis est gratuit et d\u00e9taill\u00e9 — consultez notre page tarifs sur https://connect-web.tech/tarifs pour les fourchettes compl\u00e8tes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quels sont vos d\u00e9lais de livraison\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Site vitrine\u00a0: 1-2 semaines. Application mobile\u00a0: 4-8 semaines. 98\u00a0% de nos projets livr\u00e9s \u00e0 la date convenue.',
      },
    },
    {
      '@type': 'Question',
      name: 'Proposez-vous un support apr\u00e8s livraison\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. 30 jours de support inclus \u00e0 la livraison. Contrats de maintenance longue dur\u00e9e disponibles.',
      },
    },
    {
      '@type': 'Question',
      name: 'Travaillez-vous avec des clients hors du S\u00e9n\u00e9gal\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. S\u00e9n\u00e9gal, Afrique de l\u2019Ouest et diaspora africaine (Europe, Am\u00e9rique du Nord). Suivi de projet \u00e0 distance sans friction.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi Next.js et pas WordPress\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WordPress convient pour un blog. Pour un site performant ou une application web, Next.js est plus rapide (Lighthouse 95+), plus s\u00e9curis\u00e9 et mieux r\u00e9f\u00e9renc\u00e9. C\u2019est le choix de notre agence de d\u00e9veloppement web \u00e0 Dakar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Le code source m\u2019appartient\u00a0?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. 100\u00a0% du code vous appartient d\u00e8s le jour\u00a01. H\u00e9berg\u00e9 sur votre repo GitHub ou GitLab.',
      },
    },
  ],
}

const schemaWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Connect Web',
  url: 'https://connect-web.tech',
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
      />

      {/* Contenu de la page — Client Component */}
      <HomePageClient />
    </>
  )
}
