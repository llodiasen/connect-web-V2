'use client'

// Client Component — filtres catégories blog
// Source  : CONTENU-BLOG.md
// RÈGLE N°0 CLAUDE.md — Tout spacing via style{{}} inline

import { useState } from 'react'
import Link from 'next/link'
import { BLOG_ARTICLES, CATEGORIES, type BlogArticle } from '@/lib/blog-articles'

/* ─────────────────────────────────────────────────────────────────
   ARTICLE CARD
   ─────────────────────────────────────────────────────────────── */
function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        style={{
          background:    '#FFFFFF',
          border:        '1px solid #DDE3EE',
          borderRadius:  '12px',
          padding:       '28px',
          height:        '100%',
          display:       'flex',
          flexDirection: 'column',
          cursor:        'pointer',
          transition:    'border-color 200ms ease, box-shadow 200ms ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = '#1B2A4A'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(27,42,74,0.08)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = '#DDE3EE'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        }}
      >
        {/* Badge catégorie */}
        <span style={{
          display:       'inline-block',
          alignSelf:     'flex-start',
          fontFamily:    'var(--font-body)',
          fontSize:      '11px',
          fontWeight:    600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color:         'var(--color-orange-500)',
          background:    'rgba(232,97,26,0.08)',
          borderRadius:  '4px',
          padding:       '4px 10px',
          marginBottom:  '16px',
        }}>
          {article.category}
        </span>

        {/* Titre */}
        <h3
          className="font-heading font-bold"
          style={{
            fontSize:     'var(--card-title-size)',
            color:        '#1B2A4A',
            lineHeight:   1.3,
            letterSpacing:'-0.01em',
            marginBottom: '12px',
          }}
        >
          {article.title}
        </h3>

        {/* Extrait */}
        <p style={{
          fontFamily:  'var(--font-body)',
          fontSize:    'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)',
          color:       '#4A5568',
          lineHeight:  1.65,
          flexGrow:    1,
          marginBottom:'20px',
        }}>
          {article.excerpt}
        </p>

        {/* Meta */}
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '16px',
          borderTop:  '1px solid #EEF2F7',
          paddingTop: '16px',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '13px',
            color:      '#718096',
          }}>
            {article.readTime} de lecture
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '13px',
            color:      '#A0AEC0',
          }}>
            {article.date}
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ─────────────────────────────────────────────────────────────────
   BLOG INDEX CLIENT — filtres + grille
   ─────────────────────────────────────────────────────────────── */
export function BlogIndexClient() {
  const [activeCategory, setActiveCategory] = useState('Tous')

  const filtered = activeCategory === 'Tous'
    ? BLOG_ARTICLES
    : BLOG_ARTICLES.filter(a => a.category === activeCategory)

  return (
    <>
      {/* ── FILTRES CATÉGORIES ───────────────────────────────── */}
      <section className="section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--color-orange-500)',
              marginBottom:  '16px',
            }}>
              Explorer par thème
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
              Derniers articles
            </h2>

            {/* Boutons filtres */}
            <div style={{
              display:        'flex',
              flexWrap:       'wrap',
              gap:            '8px',
              justifyContent: 'center',
            }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    height:        '36px',
                    padding:       '0 16px',
                    borderRadius:  '6px',
                    fontFamily:    'var(--font-body)',
                    fontSize:      'var(--filter-text-size)',
                    fontWeight:    activeCategory === cat ? 600 : 500,
                    cursor:        'pointer',
                    transition:    'all 150ms ease',
                    background:    activeCategory === cat ? '#1B2A4A' : 'transparent',
                    color:         activeCategory === cat ? '#FFFFFF' : '#4A5568',
                    border:        activeCategory === cat ? '1px solid #1B2A4A' : '1px solid #DDE3EE',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grille articles */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap:                 '24px',
          }}>
            {filtered.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '16px',
              color:      '#718096',
              textAlign:  'center',
              padding:    '48px 0',
            }}>
              Aucun article dans cette catégorie pour l&apos;instant.
            </p>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────────── */}
      <section className="section-base">
        <div className="container">
          <div style={{
            maxWidth:     '560px',
            margin:       '0 auto',
            textAlign:    'center',
          }}>
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--color-orange-500)',
              marginBottom:  '16px',
            }}>
              Restez informé
            </p>
            <h2
              className="font-heading font-bold"
              style={{
                fontSize:      'clamp(1.25rem, 2.5vw, 1.75rem)',
                lineHeight:    1.2,
                letterSpacing: '-0.02em',
                color:         '#1B2A4A',
                marginBottom:  '12px',
              }}
            >
              Une newsletter par mois. Pas de spam.
            </h2>
            <p style={{
              fontFamily:   'var(--font-body)',
              fontSize:     '16px',
              color:        '#4A5568',
              lineHeight:   1.6,
              marginBottom: '28px',
            }}>
              Recevez nos meilleurs articles et conseils directement dans votre boîte mail.
            </p>

            <form
              onSubmit={e => e.preventDefault()}
              style={{
                display:  'flex',
                gap:      '8px',
                flexWrap: 'wrap',
              }}
            >
              <input
                type="email"
                placeholder="Votre adresse email"
                style={{
                  flex:        '1 1 220px',
                  height:      '48px',
                  padding:     '0 16px',
                  border:      '1px solid #DDE3EE',
                  borderRadius:'8px',
                  fontFamily:  'var(--font-body)',
                  fontSize:    '15px',
                  color:       '#1B2A4A',
                  background:  '#FFFFFF',
                  outline:     'none',
                }}
              />
              <button
                type="submit"
                style={{
                  height:        '48px',
                  padding:       '0 24px',
                  background:    '#E8622A',
                  color:         '#FFFFFF',
                  fontFamily:    'var(--font-body)',
                  fontSize:      '15px',
                  fontWeight:    600,
                  borderRadius:  '8px',
                  border:        'none',
                  cursor:        'pointer',
                  whiteSpace:    'nowrap',
                  letterSpacing: '-0.01em',
                  transition:    'all 0.2s ease',
                }}
              >
                S&apos;inscrire
              </button>
            </form>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '12px',
              color:      '#A0AEC0',
              marginTop:  '12px',
              lineHeight: 1.5,
            }}>
              En vous inscrivant, vous acceptez notre{' '}
              <Link
                href="/confidentialite"
                style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
              >
                politique de confidentialité
              </Link>
              . Désinscription possible à tout moment.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
