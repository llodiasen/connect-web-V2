// Server Component — SSG statique
// Source  : CONTENU-NOTRE-HISTOIRE.md
// URL     : /a-propos/notre-histoire

import type { Metadata } from 'next'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Agence Web Dakar | Connect Web - Notre Histoire & Mission',
  description:
    'Découvrez Connect Web, agence digitale fondée à Dakar en 2025. Création de sites web, e-commerce et applications pour PME sénégalaises.',
  alternates: {
    canonical: 'https://connect-web.tech/a-propos/notre-histoire',
  },
  keywords: 'agence web Dakar, agence digitale Sénégal, création site web Dakar, transformation digitale Sénégal',
}

export const revalidate = false

/* ─────────────────────────────────────────────────────────────────
   SCHEMA.ORG — Organization
   ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Connect Web',
  url: 'https://connect-web.tech',
  logo: 'https://connect-web.tech/logo.png',
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
  description:
    'Agence de développement web basée à Dakar, spécialisée dans la création de sites internet, e-commerce et applications pour les entreprises sénégalaises.',
  areaServed: {
    '@type': 'Place',
    name: 'Sénégal',
  },
  sameAs: [
    '[PLACEHOLDER_LINKEDIN]',
    '[PLACEHOLDER_FACEBOOK]',
    '[PLACEHOLDER_INSTAGRAM]',
  ],
}

/* ─────────────────────────────────────────────────────────────────
   DATA
   ─────────────────────────────────────────────────────────────── */
const VALUES = [
  {
    title: 'Livraison réelle',
    body: "Pas de projets fantômes chez Connect Web. Chaque site démarre et se termine dans les délais annoncés. Vous suivez l'avancement en temps réel. Vous recevez un livrable fonctionnel, pas une maquette abandonnée.",
  },
  {
    title: 'Transparence totale',
    body: "Nos devis détaillent chaque prestation et son coût. Pas de frais cachés en cours de projet. Pas de mauvaises surprises à la livraison. Vous savez exactement ce que vous payez et pourquoi.",
  },
  {
    title: 'Autonomie client',
    body: "Votre site vous appartient vraiment. Nous incluons une formation complète pour que vous puissiez modifier vos contenus, ajouter des produits, gérer vos commandes. Sans rappeler l'agence à chaque mise à jour.",
  },
  {
    title: 'Ancrage local',
    body: "Basés à Dakar, nous comprenons le marché sénégalais. Paiement Wave et Orange Money acceptés. Support en français et wolof. Prix adaptés aux réalités locales. Nous construisons avec vous, pas depuis l'étranger.",
  },
]

const STATS = [
  { figure: '2025', label: 'Année de fondation', sub: 'Une agence nouvelle génération' },
  { figure: '50+',  label: 'Projets livrés',      sub: 'Sites, e-commerces, applications' },
  { figure: '98%',  label: 'Clients satisfaits',  sub: 'Mesure post-projet' },
  { figure: '24h',  label: 'Temps de réponse',    sub: 'Support réactif garanti' },
]

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function NotreHistoirePage() {
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
              Notre histoire
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
              L&apos;agence web qui comprend le Sénégal
            </h1>
            <p
              className="font-body"
              style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.65, maxWidth: '580px', marginBottom: '36px' }}
            >
              Fondée à Dakar en 2025, Connect Web accompagne les entreprises sénégalaises dans
              leur transformation digitale. Des sites qui fonctionnent, des résultats concrets.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                href="/contact"
                style={{
                  display:         'inline-flex',
                  alignItems:      'center',
                  height:          '48px',
                  padding:         '0 24px',
                  background:      '#F9FAFB',
                  color:           '#1B2A4A',
                  fontFamily:      'var(--font-body)',
                  fontSize:        '15px',
                  fontWeight:      600,
                  borderRadius:    '8px',
                  textDecoration:  'none',
                  letterSpacing:   '-0.01em',
                }}
              >
                Discutons de votre projet
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

        {/* ── ORIGINE & MISSION ───────────────────────────────── */}
        <section className="section-base">
          <div
            className="container"
            style={{ maxWidth: '780px', margin: '0 auto', paddingInline: 'clamp(1rem, 4vw, 2rem)' }}
          >
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--color-orange-500)',
              marginBottom:  '16px',
            }}>
              Nos origines
            </p>
            <h2
              className="font-heading font-bold"
              style={{
                fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                lineHeight:    1.15,
                letterSpacing: '-0.025em',
                color:         '#1B2A4A',
                marginBottom:  '32px',
              }}
            >
              Pourquoi Connect Web existe
            </h2>

            <div style={{
              fontFamily:  'var(--font-body)',
              fontSize:    '17px',
              color:       '#4A5568',
              lineHeight:  1.8,
            }}>
              <p style={{ marginBottom: '24px' }}>
                Connect Web est née d&apos;un constat simple : trop d&apos;entreprises sénégalaises
                peinent à trouver une agence web qui comprend leurs réalités.
              </p>
              <p style={{ marginBottom: '24px' }}>
                En 2025, Amadou W. Diallo fonde Connect Web à Dakar avec une mission claire :
                rendre le web professionnel accessible aux PME et startups locales. Pas de jargon
                technique inutile. Pas de projets qui traînent. Des{' '}
                <Link href="/services/site-vitrine" style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  sites
                </Link>{' '}
                livrés dans les délais, optimisés pour le mobile, prêts à générer des résultats.
              </p>
              <p style={{ marginBottom: '24px' }}>
                Notre approche diffère des agences traditionnelles. Nous intégrons nativement
                Wave et Orange Money. Nous concevons pour le mobile d&apos;abord, car 80&nbsp;%
                du trafic au Sénégal vient des smartphones. Nous formons nos clients à gérer
                leur site en autonomie.
              </p>
              <p>
                Chaque projet livré renforce notre conviction : les entreprises sénégalaises
                méritent des partenaires digitaux à la hauteur de leurs ambitions.
              </p>
            </div>
          </div>
        </section>

        {/* ── NOS VALEURS ─────────────────────────────────────── */}
        <section className="section-alt">
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
                Nos valeurs
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
                Ce qui nous guide au quotidien
              </h2>
            </div>

            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap:                 '24px',
            }}>
              {VALUES.map(({ title, body }) => (
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
                      fontSize:     'var(--card-title-size)',
                      color:        '#1B2A4A',
                      marginBottom: '12px',
                      letterSpacing: '-0.01em',
                    }}
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

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '15px',
              color:      '#718096',
              textAlign:  'center',
              marginTop:  '32px',
            }}>
              Découvrez{' '}
              <Link href="/a-propos/equipe" style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                notre équipe
              </Link>{' '}
              qui porte ces valeurs au quotidien.
            </p>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ───────────────────────────────────── */}
        <section className="section-brand">
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
                En chiffres
              </p>
              <h2
                className="font-heading font-bold"
                style={{
                  fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                  lineHeight:    1.15,
                  letterSpacing: '-0.025em',
                  color:         '#F9FAFB',
                }}
              >
                Connect Web en chiffres
              </h2>
            </div>

            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap:                 '2px',
              background:         'rgba(255,255,255,0.06)',
              borderRadius:       '12px',
              overflow:           'hidden',
            }}>
              {STATS.map(({ figure, label, sub }) => (
                <div
                  key={label}
                  style={{
                    padding:    '36px 28px',
                    background: 'rgba(255,255,255,0.03)',
                    textAlign:  'center',
                  }}
                >
                  <p style={{
                    fontFamily:    'var(--font-heading)',
                    fontSize:      'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight:    700,
                    color:         '#F9FAFB',
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
                    color:        '#CBD5E0',
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

        {/* ── NOTRE VISION ────────────────────────────────────── */}
        <section className="section-base">
          <div
            className="container"
            style={{ maxWidth: '780px', margin: '0 auto', paddingInline: 'clamp(1rem, 4vw, 2rem)' }}
          >
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--color-orange-500)',
              marginBottom:  '16px',
            }}>
              Notre vision
            </p>
            <h2
              className="font-heading font-bold"
              style={{
                fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                lineHeight:    1.15,
                letterSpacing: '-0.025em',
                color:         '#1B2A4A',
                marginBottom:  '32px',
              }}
            >
              Où nous allons
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                {
                  horizon: 'Court terme',
                  text: "Devenir la référence à Dakar pour les PME qui veulent un site professionnel sans compromis sur la qualité.",
                },
                {
                  horizon: 'Moyen terme',
                  text: "Étendre notre expertise à l'Afrique de l'Ouest francophone. Le Sénégal, la Côte d'Ivoire, le Mali, le Burkina Faso partagent des réalités similaires. Les solutions que nous développons ici fonctionnent là-bas.",
                },
                {
                  horizon: 'Horizon 2030',
                  text: "Devenir un acteur majeur du développement web en Afrique de l'Ouest. Une agence qui prouve que l'excellence technique peut naître et prospérer sur le continent.",
                },
              ].map(({ horizon, text }) => (
                <div
                  key={horizon}
                  style={{
                    display:    'flex',
                    gap:        '20px',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{
                    flexShrink:   0,
                    width:        '120px',
                    paddingTop:   '3px',
                  }}>
                    <span style={{
                      display:       'inline-block',
                      fontFamily:    'var(--font-body)',
                      fontSize:      '12px',
                      fontWeight:    600,
                      color:         'var(--color-orange-500)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}>
                      {horizon}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '16px',
                    color:      '#4A5568',
                    lineHeight: 1.75,
                    margin:     0,
                  }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <p style={{
              fontFamily:  'var(--font-body)',
              fontSize:    '16px',
              color:       '#4A5568',
              lineHeight:  1.75,
              marginTop:   '32px',
              paddingTop:  '32px',
              borderTop:   '1px solid #DDE3EE',
            }}>
              Cette vision guide chaque projet que nous acceptons. Chaque site livré nous
              rapproche de cet objectif.
            </p>
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
              Prêt à digitaliser votre entreprise&nbsp;?
            </h2>
            <p style={{
              fontFamily:   'var(--font-body)',
              fontSize:     '17px',
              color:        '#4A5568',
              lineHeight:   1.6,
              marginBottom: '36px',
              maxWidth:     '500px',
              margin:       '0 auto 36px',
            }}>
              Rejoignez les entreprises sénégalaises qui ont choisi Connect Web pour leur
              présence en ligne. Premier échange sans engagement.
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
