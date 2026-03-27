// Source   : CONTENU-EQUIPE.md + design system CLAUDE.md
// Render   : SSG (formulaire via Client Component CTASection)
// Schema   : LocalBusiness contact

import type { Metadata } from 'next'
import { CTASection } from '@/components/sections/CTASection'

/* ─────────────────────────────────────────────────────────────────
   METADATA
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Contact | Connect Web — Devis Gratuit Sous 24h',
  description:
    "Contactez Connect Web pour votre projet web. Agence digitale à Dakar, Sénégal. Devis gratuit, réponse sous 24h. Wave & Orange Money acceptés.",
  alternates: { canonical: 'https://connect-web.tech/contact' },
  keywords: 'contact agence web Dakar, devis site web Sénégal, créer site web Dakar',
  openGraph: {
    title: 'Contactez Connect Web — Devis Gratuit',
    description: 'Démarrez votre projet digital. Devis gratuit, réponse sous 24h depuis Dakar.',
    url: 'https://connect-web.tech/contact',
    siteName: 'Connect Web',
    locale: 'fr_FR',
    type: 'website',
  },
}

export const revalidate = false

/* ─────────────────────────────────────────────────────────────────
   SCHEMA.ORG — LocalBusiness avec contactPoint
   ─────────────────────────────────────────────────────────────── */
const schemaContact = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Connect Web',
  url: 'https://connect-web.tech',
  telephone: '+221779006282',
  email: 'contact@connect-web.tech',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'G49 Scat Urbam',
    addressLocality: 'Dakar',
    addressCountry: 'SN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+221779006282',
    contactType: 'customer service',
    availableLanguage: ['French'],
  },
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaContact) }}
      />

      {/* Hero minimaliste */}
      <section
        className="section-brand"
        style={{ paddingTop: 'clamp(5rem, 10vw, 8rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}
      >
        <div className="container">
          <span
            className="text-eyebrow"
            style={{ color: 'var(--color-orange-500)', marginBottom: '16px', display: 'block' }}
          >
            Parlons de votre projet
          </span>
          <h1
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              marginBottom: '16px',
              maxWidth: '640px',
            }}
          >
            Démarrez votre projet digital
          </h1>
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.70)',
              maxWidth: '520px',
            }}
          >
            Devis gratuit sous 24h. Premier échange sans engagement.
            Paiement Wave &amp; Orange Money acceptés.
          </p>
        </div>
      </section>

      {/* Formulaire de contact — CTASection (Client Component) */}
      <CTASection
        service="contact"
        titre="On vous répond sous 24h"
        sousTitre="Décrivez votre projet et recevez une proposition adaptée."
        titreCarte="Démarrons votre projet"
        sousTitreCarte="Devis gratuit · Réponse sous 24h"
        placeholder="Décrivez votre projet : type de site, fonctionnalités souhaitées, délai, budget..."
        intentionDefaut="Obtenir un devis"
      />
    </>
  )
}
