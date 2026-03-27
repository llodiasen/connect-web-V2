// Server Component — SSG statique
// Source  : CONTENU-TEMOIGNAGES.md
// URL     : /temoignages

import type { Metadata } from 'next'
import Link from 'next/link'
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Avis Clients | Témoignages Agence Web Dakar - Connect Web',
  description:
    'Découvrez les avis de nos clients à Dakar. 98% de satisfaction, projets livrés dans les délais. Témoignages e-commerce, sites vitrine, applications.',
  alternates: {
    canonical: 'https://connect-web.tech/temoignages',
  },
  keywords: 'avis agence web Dakar, témoignages clients Sénégal, agence web fiable Dakar, meilleure agence web Sénégal',
}

export const revalidate = false

/* ─────────────────────────────────────────────────────────────────
   SCHEMA.ORG — Organization + AggregateRating
   ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Connect Web',
  url: 'https://connect-web.tech',
  logo: 'https://connect-web.tech/logo.png',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '50',
    reviewCount: '50',
  },
}

/* ─────────────────────────────────────────────────────────────────
   DATA
   ─────────────────────────────────────────────────────────────── */
const STATS = [
  { figure: '50+',   label: 'Projets livrés',    sub: 'Sites, boutiques, applications' },
  { figure: '98%',   label: 'Clients satisfaits', sub: 'Enquête post-livraison' },
  { figure: '95%',   label: 'Délais respectés',   sub: 'Engagement tenu' },
  { figure: '4.9/5', label: 'Note moyenne',        sub: 'Évaluation globale' },
]

const RESULTS = [
  {
    title: 'Délais respectés',
    body:  '95% de nos projets sont livrés à la date prévue ou avant. Nous établissons des plannings réalistes et les tenons. En cas d\'imprévu, nous communiquons immédiatement.',
    href:  '/a-propos/notre-histoire',
    cta:   'Notre histoire',
  },
  {
    title: 'ROI mesurable',
    body:  'Nos clients e-commerce constatent une augmentation de leurs ventes dans les 3 mois suivant la mise en ligne. L\'intégration Wave et Orange Money réduit les abandons de panier.',
    href:  '/services/sites-ecommerce',
    cta:   'Voir nos services e-commerce',
  },
  {
    title: 'Autonomie acquise',
    body:  'À la fin de chaque projet, nos clients savent gérer leur site. Modifier un texte, ajouter un produit, consulter les statistiques. Plus besoin de nous appeler pour chaque mise à jour.',
    href:  '/services',
    cta:   'Comment ça marche',
  },
]

/* ─────────────────────────────────────────────────────────────────
   COMPOSANTS LOCAUX — réutilisés dans la page
   ─────────────────────────────────────────────────────────────── */
function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{
      fontFamily:    'var(--font-body)',
      fontSize:      '11px',
      fontWeight:    600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color:         'var(--color-orange-500)',
      marginBottom:  '16px',
    }}>
      {children}
    </p>
  )
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function TemoignagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          className="section-brand"
          style={{ paddingBlock: 'clamp(4rem, 8vw, 6rem)' }}
        >
          <div className="container">
            <Eyebrow>Ils nous font confiance</Eyebrow>
            <h1
              className="font-heading font-bold"
              style={{
                fontSize:      'clamp(2rem, 4.5vw, 3rem)',
                lineHeight:    1.1,
                letterSpacing: '-0.03em',
                color:         '#F9FAFB',
                marginBottom:  '24px',
                maxWidth:      '700px',
              }}
            >
              Ils nous ont fait confiance
            </h1>
            <p
              className="font-body"
              style={{
                fontSize:     '17px',
                color:        '#CBD5E0',
                lineHeight:   1.65,
                maxWidth:     '580px',
                marginBottom: '36px',
              }}
            >
              Plus de 50 entreprises sénégalaises ont choisi Connect Web pour leur présence
              digitale. Découvrez leurs retours d&apos;expérience et les résultats obtenus.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                href="/contact"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  height:         '48px',
                  padding:        '0 24px',
                  background:     '#F9FAFB',
                  color:          '#1B2A4A',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '15px',
                  fontWeight:     600,
                  borderRadius:   '8px',
                  textDecoration: 'none',
                  letterSpacing:  '-0.01em',
                }}
              >
                Rejoignez-les
              </Link>
              <Link
                href="/services"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  height:         '48px',
                  padding:        '0 24px',
                  background:     'transparent',
                  color:          '#CBD5E0',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '15px',
                  fontWeight:     500,
                  borderRadius:   '8px',
                  textDecoration: 'none',
                  border:         '1px solid rgba(255,255,255,0.15)',
                }}
              >
                Voir nos services →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ───────────────────────────────────── */}
        <section className="section-base">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <Eyebrow>La satisfaction client en chiffres</Eyebrow>
              <h2
                className="font-heading font-bold"
                style={{
                  fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                  lineHeight:    1.15,
                  letterSpacing: '-0.025em',
                  color:         '#1B2A4A',
                }}
              >
                Des résultats qui parlent
              </h2>
            </div>

            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap:                 '2px',
              background:          '#DDE3EE',
              borderRadius:        '12px',
              overflow:            'hidden',
            }}>
              {STATS.map(({ figure, label, sub }) => (
                <div
                  key={label}
                  style={{
                    padding:    '36px 28px',
                    background: '#FFFFFF',
                    textAlign:  'center',
                  }}
                >
                  <p style={{
                    fontFamily:    'var(--font-heading)',
                    fontSize:      'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight:    700,
                    color:         '#1B2A4A',
                    letterSpacing: '-0.03em',
                    lineHeight:    1,
                    marginBottom:  '10px',
                  }}>
                    {figure}
                  </p>
                  <p style={{
                    fontFamily:   'var(--font-body)',
                    fontSize:     '15px',
                    fontWeight:   600,
                    color:        '#1B2A4A',
                    marginBottom: '6px',
                  }}>
                    {label}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '13px',
                    color:      '#718096',
                  }}>
                    {sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGES — carousel existant ─────────────────── */}
        <section className="section-alt">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <Eyebrow>Ce que disent nos clients</Eyebrow>
              <h2
                className="font-heading font-bold"
                style={{
                  fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                  lineHeight:    1.15,
                  letterSpacing: '-0.025em',
                  color:         '#1B2A4A',
                }}
              >
                Témoignages clients
              </h2>
            </div>
            <TestimonialsCarousel />
          </div>
        </section>

        {/* ── RÉSULTATS CONCRETS ───────────────────────────────── */}
        <section className="section-base">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <Eyebrow>Des résultats mesurables</Eyebrow>
              <h2
                className="font-heading font-bold"
                style={{
                  fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                  lineHeight:    1.15,
                  letterSpacing: '-0.025em',
                  color:         '#1B2A4A',
                }}
              >
                Ce que vous obtenez
              </h2>
            </div>

            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap:                 '24px',
            }}>
              {RESULTS.map(({ title, body, href, cta }) => (
                <div
                  key={title}
                  style={{
                    background:   '#FFFFFF',
                    border:       '1px solid #DDE3EE',
                    borderRadius: '12px',
                    padding:      '28px',
                  }}
                >
                  <h3
                    className="font-heading font-bold"
                    style={{
                      fontSize:      'var(--card-title-size)',
                      color:         '#1B2A4A',
                      marginBottom:  '12px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{
                    fontFamily:   'var(--font-body)',
                    fontSize:     'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)',
                    color:        '#4A5568',
                    lineHeight:   1.7,
                    textAlign:    'justify',
                    marginBottom: '16px',
                  }}>
                    {body}
                  </p>
                  <Link
                    href={href}
                    style={{
                      fontFamily:          'var(--font-body)',
                      fontSize:            '14px',
                      fontWeight:          600,
                      color:               'var(--color-orange-500)',
                      textDecoration:      'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    {cta} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ───────────────────────────────────────── */}
        <section
          className="section-brand"
          style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <div className="container" style={{ textAlign: 'center' }}>
            <h2
              className="font-heading font-bold"
              style={{
                fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                lineHeight:    1.15,
                letterSpacing: '-0.025em',
                color:         '#F9FAFB',
                marginBottom:  '16px',
              }}
            >
              Rejoignez nos clients satisfaits
            </h2>
            <p style={{
              fontFamily:   'var(--font-body)',
              fontSize:     '17px',
              color:        '#CBD5E0',
              lineHeight:   1.6,
              maxWidth:     '500px',
              margin:       '0 auto 36px',
            }}>
              Votre entreprise mérite une présence digitale professionnelle. Discutons
              de votre projet et voyons comment Connect Web peut vous accompagner.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Link
                href="/contact"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  height:         '52px',
                  padding:        '0 32px',
                  background:     '#F9FAFB',
                  color:          '#1B2A4A',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '15px',
                  fontWeight:     600,
                  borderRadius:   '8px',
                  textDecoration: 'none',
                  letterSpacing:  '-0.01em',
                }}
              >
                Demander un devis
              </Link>
              <Link
                href="/services"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  height:         '52px',
                  padding:        '0 32px',
                  background:     'transparent',
                  color:          '#CBD5E0',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '15px',
                  fontWeight:     600,
                  borderRadius:   '8px',
                  textDecoration: 'none',
                  border:         '1px solid rgba(255,255,255,0.15)',
                }}
              >
                Voir nos services →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
