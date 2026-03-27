// Server Component — SSG statique
// Source  : CONTENU-EQUIPE.md
// URL     : /a-propos/equipe

import type { Metadata } from 'next'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Notre Équipe | Développeurs Web Dakar - Connect Web',
  description:
    "Rencontrez l'équipe Connect Web : développeurs et designers basés à Dakar. Experts Next.js, Shopify, WooCommerce au service des entreprises sénégalaises.",
  alternates: {
    canonical: 'https://connect-web.tech/a-propos/equipe',
  },
  keywords: 'développeur web Dakar, équipe agence web Sénégal, expert digital Dakar, développeur Sénégal',
}

export const revalidate = false

/* ─────────────────────────────────────────────────────────────────
   SCHEMA.ORG — Organization + employees
   ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Connect Web',
  url: 'https://connect-web.tech',
  employee: [
    {
      '@type': 'Person',
      name: 'Amadou W. Diallo',
      jobTitle: 'Fondateur, Développeur Full Stack & Product Designer',
      description: 'Fondateur de Connect Web, expert Next.js, React, Shopify et WooCommerce',
      sameAs: '[PLACEHOLDER_LINKEDIN_AMADOU]',
    },
  ],
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
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 2,
    maxValue: 5,
  },
}

/* ─────────────────────────────────────────────────────────────────
   DATA
   ─────────────────────────────────────────────────────────────── */
const FOUNDER_SKILLS = [
  'Next.js, React, TypeScript',
  'Shopify, WooCommerce',
  'UX/UI Design',
  'Intégration Wave & Orange Money',
]

const TEAM_MEMBERS = [
  { name: '[PLACEHOLDER_NOM]', role: '[PLACEHOLDER_ROLE]', expertise: '[PLACEHOLDER_EXPERTISE]' },
  { name: '[PLACEHOLDER_NOM]', role: '[PLACEHOLDER_ROLE]', expertise: '[PLACEHOLDER_EXPERTISE]' },
  { name: '[PLACEHOLDER_NOM]', role: '[PLACEHOLDER_ROLE]', expertise: '[PLACEHOLDER_EXPERTISE]' },
]

const VALUES = [
  {
    title: 'Écoute active',
    body: "Avant de coder, nous écoutons. Comprendre votre activité, vos clients, vos objectifs. Cette phase d'écoute conditionne la réussite du projet. Nous posons les bonnes questions pour construire la bonne solution.",
  },
  {
    title: 'Pédagogie',
    body: "Le web ne devrait pas être réservé aux initiés. Nous expliquons nos choix techniques en termes simples. Nous formons nos clients à gérer leur site. Nous répondons à toutes les questions, même les plus basiques.",
  },
  {
    title: 'Engagement',
    body: "Un projet accepté est un projet livré. Nous nous engageons sur des délais réalistes et nous les tenons. En cas d'imprévu, nous communiquons immédiatement. Pas de mauvaises surprises.",
  },
  {
    title: 'Flexibilité',
    body: "Chaque entreprise est unique. Nous adaptons nos méthodes à vos contraintes. Réunions en présentiel à Dakar ou en visio. Paiement Wave, Orange Money ou virement. Planning ajusté à vos disponibilités.",
  },
]

const PROFILES_WANTED = [
  'Développeur(se) Front-end React/Next.js',
  'Développeur(se) Shopify/WooCommerce',
  'Designer UI/UX',
  "Chef(fe) de projet digital",
]

const WHAT_WE_OFFER = [
  'Projets variés et stimulants',
  'Équipe bienveillante et collaborative',
  'Flexibilité (télétravail partiel possible)',
  'Formation continue',
]

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function EquipePage() {
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
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--color-orange-500)',
              marginBottom:  '20px',
            }}>
              L&apos;équipe
            </p>
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
              L&apos;équipe derrière vos projets digitaux
            </h1>
            <p
              className="font-body"
              style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.65, maxWidth: '580px', marginBottom: '36px' }}
            >
              Des experts du web basés à Dakar, passionnés par la réussite de vos projets.
              Proximité, réactivité et expertise locale au service de votre transformation digitale.
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
                Travaillons ensemble
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
                Découvrir nos services →
              </Link>
            </div>
          </div>
        </section>

        {/* ── LE FONDATEUR ────────────────────────────────────── */}
        <section className="section-base">
          <div className="container">
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--color-orange-500)',
              marginBottom:  '16px',
            }}>
              Le fondateur
            </p>
            <h2
              className="font-heading font-bold"
              style={{
                fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                lineHeight:    1.15,
                letterSpacing: '-0.025em',
                color:         '#1B2A4A',
                marginBottom:  '48px',
              }}
            >
              Amadou W. Diallo, Fondateur
            </h2>

            <div
              className="founder-grid"
              style={{ display: 'grid', gap: '48px', alignItems: 'start' }}
            >
              <style>{`
                @media (min-width: 768px) {
                  .founder-grid { grid-template-columns: 280px 1fr !important; }
                }
              `}</style>

              {/* Photo placeholder */}
              <div>
                <div style={{
                  width:          '100%',
                  aspectRatio:    '1',
                  background:     '#EEF1F7',
                  borderRadius:   '12px',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  border:         '1px solid #DDE3EE',
                  maxWidth:       '280px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '13px',
                    color:      '#A0AEC0',
                    textAlign:  'center',
                    padding:    '16px',
                  }}>
                    [PLACEHOLDER_PHOTO_AMADOU]
                  </span>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <span style={{
                    display:      'inline-block',
                    fontFamily:   'var(--font-body)',
                    fontSize:     '13px',
                    color:        '#4A5568',
                    padding:      '6px 12px',
                    border:       '1px solid #DDE3EE',
                    borderRadius: '6px',
                    background:   '#F4F6FA',
                  }}>
                    LinkedIn : [PLACEHOLDER_LINKEDIN_AMADOU]
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div>
                <p style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '14px',
                  fontWeight:    600,
                  color:         'var(--color-orange-500)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom:  '16px',
                }}>
                  Fondateur, Développeur Full Stack &amp; Product Designer
                </p>

                <div style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75 }}>
                  <p style={{ marginBottom: '18px' }}>
                    Amadou a fondé Connect Web en 2025 avec une conviction : les entreprises
                    sénégalaises méritent une agence web qui comprend leurs enjeux.
                  </p>
                  <p style={{ marginBottom: '18px' }}>
                    Son parcours combine expertise technique internationale et ancrage local.
                    Maîtrise de Next.js, React, TypeScript côté développement. Expérience Shopify
                    et WooCommerce pour le{' '}
                    <Link href="/services/sites-ecommerce" style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                      e-commerce
                    </Link>
                    . Compétences UX/UI pour des interfaces qui convertissent.
                  </p>
                  <p style={{ marginBottom: '18px' }}>
                    Cette double casquette développeur-designer lui permet de piloter les projets
                    de A à Z. De la conception à la mise en ligne, en passant par le développement
                    et l&apos;optimisation.
                  </p>
                  <p style={{ marginBottom: '24px' }}>
                    Sa philosophie : livrer des{' '}
                    <Link href="/services/site-vitrine" style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                      sites
                    </Link>{' '}
                    qui génèrent des résultats, pas des vitrines abandonnées. Chaque projet
                    bénéficie d&apos;un suivi personnalisé et d&apos;une formation client pour
                    garantir l&apos;autonomie.
                  </p>
                </div>

                <p style={{
                  fontFamily:   'var(--font-body)',
                  fontSize:     '14px',
                  fontWeight:   600,
                  color:        '#1B2A4A',
                  marginBottom: '12px',
                }}>
                  Expertise technique
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {FOUNDER_SKILLS.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily:   'var(--font-body)',
                        fontSize:     '13px',
                        color:        '#1B2A4A',
                        background:   '#EEF1F7',
                        padding:      '5px 12px',
                        borderRadius: '6px',
                        fontWeight:   500,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── L'ÉQUIPE ────────────────────────────────────────── */}
        <section className="section-alt">
          <div className="container">
            <div style={{ marginBottom: '48px' }}>
              <p style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         'var(--color-orange-500)',
                marginBottom:  '16px',
              }}>
                L&apos;équipe
              </p>
              <h2
                className="font-heading font-bold"
                style={{
                  fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                  lineHeight:    1.15,
                  letterSpacing: '-0.025em',
                  color:         '#1B2A4A',
                  marginBottom:  '16px',
                }}
              >
                Une équipe agile et engagée
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '16px',
                color:      '#4A5568',
                lineHeight: 1.7,
                maxWidth:   '600px',
              }}>
                Connect Web fonctionne avec une équipe resserrée de 2 à 5 personnes selon les
                projets. Ce format agile garantit réactivité et cohérence sur chaque mission.
              </p>
            </div>

            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap:                 '24px',
            }}>
              {TEAM_MEMBERS.map(({ name, role, expertise }, i) => (
                <div
                  key={i}
                  style={{
                    background:   '#FFFFFF',
                    border:       '1px solid #DDE3EE',
                    borderRadius: '12px',
                    padding:      '28px',
                  }}
                >
                  <div style={{
                    width:          '72px',
                    height:         '72px',
                    background:     '#EEF1F7',
                    borderRadius:   '50%',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    marginBottom:   '16px',
                  }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#A0AEC0' }}>
                      Photo
                    </span>
                  </div>
                  <h3
                    className="font-heading font-bold"
                    style={{ fontSize: 'var(--card-title-size)', color: '#1B2A4A', marginBottom: '6px' }}
                  >
                    {name}
                  </h3>
                  <p style={{
                    fontFamily:   'var(--font-body)',
                    fontSize:     '13px',
                    fontWeight:   600,
                    color:        'var(--color-orange-500)',
                    marginBottom: '10px',
                    letterSpacing:'0.02em',
                  }}>
                    {role}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)',
                    color:      '#4A5568',
                    lineHeight: 1.6,
                  }}>
                    {expertise}
                  </p>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#718096', marginTop: '32px' }}>
              Chaque membre partage les mêmes valeurs : livraison dans les délais, communication
              transparente, satisfaction client avant tout. Découvrez{' '}
              <Link href="/a-propos/notre-histoire" style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                notre histoire
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ── NOS VALEURS HUMAINES ────────────────────────────── */}
        <section className="section-base">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         'var(--color-orange-500)',
                marginBottom:  '16px',
              }}>
                Nos valeurs humaines
              </p>
              <h2
                className="font-heading font-bold"
                style={{
                  fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                  lineHeight:    1.15,
                  letterSpacing: '-0.025em',
                  color:         '#1B2A4A',
                }}
              >
                Ce qui nous anime
              </h2>
            </div>

            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap:                 '32px',
            }}>
              {VALUES.map(({ title, body }) => (
                <div
                  key={title}
                  style={{ borderLeft: '3px solid var(--color-orange-500)', paddingLeft: '20px' }}
                >
                  <h3
                    className="font-heading font-bold"
                    style={{ fontSize: 'var(--card-title-size)', color: '#1B2A4A', marginBottom: '10px' }}
                  >
                    {title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)',
                    color:      '#4A5568',
                    lineHeight: 1.7,
                    textAlign:  'justify',
                  }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ON RECRUTE ──────────────────────────────────────── */}
        <section className="section-brand">
          <div className="container">
            <div
              className="recruit-grid"
              style={{ display: 'grid', gap: '48px', alignItems: 'start' }}
            >
              <style>{`
                @media (min-width: 768px) {
                  .recruit-grid { grid-template-columns: 1fr 1fr !important; }
                }
              `}</style>

              <div>
                <p style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '11px',
                  fontWeight:    600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color:         'var(--color-orange-500)',
                  marginBottom:  '16px',
                }}>
                  On recrute
                </p>
                <h2
                  className="font-heading font-bold"
                  style={{
                    fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                    lineHeight:    1.15,
                    letterSpacing: '-0.025em',
                    color:         '#F9FAFB',
                    marginBottom:  '20px',
                  }}
                >
                  Rejoignez l&apos;aventure Connect Web
                </h2>
                <p style={{
                  fontFamily:   'var(--font-body)',
                  fontSize:     '16px',
                  color:        '#CBD5E0',
                  lineHeight:   1.7,
                  marginBottom: '28px',
                }}>
                  Connect Web grandit et recherche des talents passionnés par le web et
                  l&apos;Afrique digitale.
                </p>
                <div style={{
                  padding:      '20px 24px',
                  background:   'rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  border:       '1px solid rgba(255,255,255,0.1)',
                }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#CBD5E0', marginBottom: '6px' }}>
                    Postuler :
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: '#F9FAFB' }}>
                    [PLACEHOLDER_EMAIL_RECRUTEMENT]
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '32px' }}>
                <div>
                  <p style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      '13px',
                    fontWeight:    600,
                    color:         '#CBD5E0',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    marginBottom:  '12px',
                  }}>
                    Profils recherchés
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {PROFILES_WANTED.map((p) => (
                      <li key={p} style={{
                        fontFamily:   'var(--font-body)',
                        fontSize:     '15px',
                        color:        '#F9FAFB',
                        padding:      '8px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.07)',
                        display:      'flex',
                        alignItems:   'center',
                        gap:          '10px',
                      }}>
                        <span style={{ color: 'var(--color-orange-500)', fontWeight: 700 }}>→</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      '13px',
                    fontWeight:    600,
                    color:         '#CBD5E0',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    marginBottom:  '12px',
                  }}>
                    Ce que nous offrons
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {WHAT_WE_OFFER.map((o) => (
                      <li key={o} style={{
                        fontFamily:   'var(--font-body)',
                        fontSize:     '15px',
                        color:        '#CBD5E0',
                        padding:      '8px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.07)',
                        display:      'flex',
                        alignItems:   'center',
                        gap:          '10px',
                      }}>
                        <span style={{ color: 'var(--color-orange-500)', fontWeight: 700 }}>✓</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ───────────────────────────────────────── */}
        <section className="section-alt">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2
              className="font-heading font-bold"
              style={{
                fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                lineHeight:    1.15,
                letterSpacing: '-0.025em',
                color:         '#1B2A4A',
                marginBottom:  '16px',
              }}
            >
              Travaillons ensemble
            </h2>
            <p style={{
              fontFamily:   'var(--font-body)',
              fontSize:     '17px',
              color:        '#4A5568',
              lineHeight:   1.6,
              maxWidth:     '520px',
              margin:       '0 auto 36px',
            }}>
              Vous avez un projet digital&nbsp;? Notre équipe est prête à l&apos;étudier.
              Premier échange gratuit pour comprendre vos besoins et vous proposer la meilleure approche.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Link
                href="/contact"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  height:         '52px',
                  padding:        '0 32px',
                  background:     '#1B2A4A',
                  color:          '#FFFFFF',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '15px',
                  fontWeight:     600,
                  borderRadius:   '8px',
                  textDecoration: 'none',
                  letterSpacing:  '-0.01em',
                }}
              >
                Contactez-nous
              </Link>
              <Link
                href="/realisations"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  height:         '52px',
                  padding:        '0 32px',
                  background:     'transparent',
                  color:          '#1B2A4A',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '15px',
                  fontWeight:     600,
                  borderRadius:   '8px',
                  textDecoration: 'none',
                  border:         '1px solid #DDE3EE',
                }}
              >
                Voir nos réalisations →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
