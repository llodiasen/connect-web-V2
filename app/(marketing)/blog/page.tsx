// Server Component — ISR 30min
// Source  : CONTENU-BLOG.md
// URL     : /blog

import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogIndexClient } from '@/components/sections/blog/BlogIndexClient'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Blog Agence Web Dakar | Conseils Digital Sénégal - Connect Web',
  description:
    'Conseils création de site, e-commerce, SEO pour entreprises sénégalaises. Guides pratiques, tendances digital Afrique. Blog Connect Web Dakar.',
  alternates: {
    canonical: 'https://connect-web.tech/blog',
  },
  keywords: 'blog agence web Dakar, actualités digital Sénégal, conseils création site Sénégal, e-commerce Afrique tendances',
}

export const revalidate = 1800 // ISR 30min

/* ─────────────────────────────────────────────────────────────────
   SCHEMA.ORG — Blog
   ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Blog Connect Web',
  description: 'Conseils création de site, e-commerce, SEO pour entreprises sénégalaises',
  url: 'https://connect-web.tech/blog',
  publisher: {
    '@type': 'Organization',
    name: 'Connect Web',
    logo: {
      '@type': 'ImageObject',
      url: 'https://connect-web.tech/logo.png',
    },
  },
  author: {
    '@type': 'Person',
    name: 'Amadou W. Diallo',
    url: 'https://connect-web.tech/a-propos/equipe',
  },
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function BlogPage() {
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
              Blog
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
              Le Blog Connect Web
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
              Conseils pratiques, guides techniques et tendances du digital en Afrique.
              Tout ce qu&apos;il faut savoir pour réussir votre présence en ligne au Sénégal.
            </p>
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
        </section>

        {/* ── FILTRES + ARTICLES + NEWSLETTER (Client) ─────────── */}
        <BlogIndexClient />

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
              Un projet en tête&nbsp;?
            </h2>
            <p style={{
              fontFamily:   'var(--font-body)',
              fontSize:     '17px',
              color:        '#CBD5E0',
              lineHeight:   1.6,
              maxWidth:     '500px',
              margin:       '0 auto 36px',
            }}>
              Nos articles vous ont inspiré&nbsp;? Discutons de votre projet digital.
              Premier échange gratuit et sans engagement.
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
                Contactez-nous
              </Link>
              <Link
                href="/portfolio"
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
                Voir nos réalisations →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
