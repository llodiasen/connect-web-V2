// Source   : CONTENT.md > PAGE : Applications Mobile
// URL      : /services/applications-mobile
// SEO      : metadata + Schema.org Service + FAQPage

import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Applications Mobile Cross-Platform iOS & Android | Connect Web Dakar',
  description:
    'Applications mobiles cross-platform à Dakar. React Native, Flutter. Un code, deux stores, -40% budget. Wave & Orange Money intégrés. Devis gratuit.',
  keywords: [
    'application mobile cross-platform',
    'react native vs flutter',
    'développement cross-platform dakar',
    'application ios android un seul code',
    'agence react native sénégal',
    'application mobile entreprise afrique',
    'coût application mobile cross-platform',
  ],
  alternates: {
    canonical: 'https://connect-web.tech/services/applications-mobile',
  },
  openGraph: {
    title: 'Applications Mobile Cross-Platform iOS & Android | Connect Web Dakar',
    description:
      'Applications mobiles cross-platform à Dakar. React Native, Flutter. Un code, deux stores, -40% budget. Wave & Orange Money intégrés.',
    url: 'https://connect-web.tech/services/applications-mobile',
    siteName: 'Connect Web',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Applications Mobile Cross-Platform | Connect Web Dakar',
    description:
      'React Native ou Flutter. iOS et Android depuis une seule base de code. -40% vs natif. Wave & Orange Money intégrés.',
  },
  robots: { index: true, follow: true },
}

const schemaService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Développement Application Mobile Cross-Platform',
  description:
    "Développement d'applications mobiles cross-platform iOS et Android avec React Native ou Flutter. Intégration Wave, Orange Money, mode offline-first. -40% vs natif.",
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
  serviceType: 'Développement application mobile',
  url: 'https://connect-web.tech/services/applications-mobile',
  offers: {
    '@type': 'Offer',
    description: 'Application mobile cross-platform iOS & Android',
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
      name: 'React Native ou Flutter : comment choisir ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "React Native si votre équipe connaît JavaScript ou pour un MVP rapide. Flutter pour des interfaces visuellement riches et animations complexes. En tant qu'agence React Native et Flutter à Dakar, on conseille selon votre contexte.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte une application mobile cross-platform ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "À partir de 600 000 FCFA pour un MVP. Application mobile complète : 1,5M à 5M FCFA. C'est 40% moins cher que le développement natif séparé iOS + Android.",
      },
    },
    {
      '@type': 'Question',
      name: 'Les performances sont aussi bonnes que le natif ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pour 90% des cas d'usage, oui. React Native et Flutter offrent des animations fluides et un accès hardware complet. La différence est imperceptible pour l'utilisateur.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on publier sur les deux stores ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. On gère la soumission App Store (1-3 jours) et Google Play (2-7 jours) pour votre application mobile.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wave et Orange Money fonctionnent en cross-platform ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Intégrés en standard, pas un plugin. Intégration native Wave et Orange Money dans chaque application mobile.',
      },
    },
    {
      '@type': 'Question',
      name: "L'app fonctionne sans internet ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui si c'est un besoin. Mode offline-first avec synchronisation automatique au retour du réseau. Essentiel pour le marché africain.",
      },
    },
    {
      '@type': 'Question',
      name: "Le code source m'appartient ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. 100% du code de votre application mobile cross-platform dès le jour 1.',
      },
    },
  ],
}

export default function ApplicationsMobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script
        id="schema-applications-mobile-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }}
      />
      <Script
        id="schema-applications-mobile-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
      {children}
    </>
  )
}
