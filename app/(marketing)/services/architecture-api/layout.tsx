// Source   : REFONTE-ARCHITECTURE-API.md
// URL      : /services/architecture-api
// SEO      : metadata + Schema.org Service + FAQPage (7 questions)

import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Architecture & API REST/GraphQL | Connect Web Dakar',
  description:
    'Développement API REST et GraphQL à Dakar. Architecture microservices, documentation OpenAPI, tests automatisés. Audit offert. +50 projets.',
  keywords: [
    'développement api rest',
    'api graphql',
    'architecture microservices',
    'développement api dakar',
    'documentation api openapi',
    'intégration api erp crm',
  ],
  alternates: {
    canonical: 'https://connect-web.tech/services/architecture-api',
  },
  openGraph: {
    title: 'Architecture & API REST/GraphQL | Connect Web Dakar',
    description:
      'Développement API REST et GraphQL à Dakar. Architecture microservices, documentation OpenAPI, tests automatisés. Audit offert.',
    url:      'https://connect-web.tech/services/architecture-api',
    siteName: 'Connect Web',
    locale:   'fr_FR',
    type:     'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Architecture & API REST/GraphQL | Connect Web Dakar',
    description: 'REST, GraphQL, microservices — développement API sur mesure à Dakar. Documentation OpenAPI complète, tests automatisés. Audit offert.',
  },
  robots: { index: true, follow: true },
}

const schemaService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Architecture & Développement API',
  description:
    "Développement d'API REST et GraphQL sur mesure à Dakar. Architecture microservices, documentation OpenAPI/Swagger, tests automatisés Jest + Supertest, CI/CD GitHub Actions. Audit architecture offert.",
  provider: {
    '@type': 'LocalBusiness',
    name: 'Connect Web',
    url: 'https://connect-web.tech',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dakar',
      addressCountry: 'SN',
    },
    telephone: '+221-XX-XXX-XX-XX',
    email: 'contact@connect-web.tech',
  },
  areaServed: ['Dakar', 'Sénégal', "Afrique de l'Ouest"],
  serviceType: 'Développement API REST et GraphQL',
  url: 'https://connect-web.tech/services/architecture-api',
  offers: {
    '@type': 'Offer',
    description: 'Développement API REST sur mesure avec auth, CRUD et documentation OpenAPI',
    priceCurrency: 'XOF',
    price: '600000',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '600000',
      maxPrice: '5000000',
      priceCurrency: 'XOF',
    },
  },
}

const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Combien coûte le développement d'une API sur mesure ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "À partir de 600 000 FCFA pour une API REST avec auth, CRUD et documentation OpenAPI complète. Le budget final dépend du nombre d'endpoints et de la complexité de l'architecture.",
      },
    },
    {
      '@type': 'Question',
      name: 'API REST ou GraphQL : comment choisir ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'REST pour les API simples et intégrations tierces. GraphQL pour les frontends complexes avec besoins flexibles. On conseille selon votre contexte de développement API.',
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on connecter l'API à nos outils existants ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Connecteurs ERP (SAP, Odoo), CRM (Salesforce, HubSpot), paiements (Wave, Stripe) ou toute intégration API tierce sur mesure.',
      },
    },
    {
      '@type': 'Question',
      name: 'La documentation API est-elle incluse ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Documentation OpenAPI/Swagger complète livrée avec chaque projet. Playground interactif pour vos intégrateurs.',
      },
    },
    {
      '@type': 'Question',
      name: "Quel est le délai de développement d'une API ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: '2 à 6 semaines selon la complexité. Audit architecture offert avant tout devis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Microservices ou monolithe ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On recommande un monolithe modulaire pour démarrer votre architecture. Migration microservices quand le besoin se fait sentir. Pas avant.',
      },
    },
    {
      '@type': 'Question',
      name: "Le code m'appartient ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. 100% du code, de la documentation API et des tests dès le jour 1.",
      },
    },
  ],
}

export default function ArchitectureApiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script
        id="schema-architecture-api-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }}
      />
      <Script
        id="schema-architecture-api-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
      {children}
    </>
  )
}
